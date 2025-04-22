import React, { useEffect, useState } from "react";
import axios from "axios";

const AllResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Declare setError state

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Assuming you're storing JWT here
        const res = await axios.get("http://localhost:4000/user-results", {
          headers: { Authorization: `Bearer ${token}` },
        });


        console.log("Fetched results:", res.data.results); // Debugging log
        if (res.data.success) {
          setResults(res.data.results);
        } else {
          setError(res.data.message);
        }
      } catch (err) {
        console.error("Error fetching results:", err);
        setError("Failed to fetch results");
      } finally {
        setLoading(false); // Ensure loading is set to false after the request
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="px-4 mb-6">
      <h2 className="text-lg font-bold mb-4">Quiz Results</h2>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center gap-2 text-gray-500 mt-4">
          <svg className="animate-spin h-5 w-5 text-blue-500" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          Fetching your latest test results...
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-red-500 text-center mt-4">
          <p>{error}</p>
        </div>
      )}

      {/* No Results UI */}
      {!loading && !error && results.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow p-8 text-center mt-6">
          <div className="bg-orange-100 text-orange-500 p-3 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L4.5 12.75m0 0L9.75 8.5M4.5 12.75H19.5"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">No Quiz Results Yet</h3>
          <p className="text-gray-500">
            Once you complete a quiz, your results will appear here.
          </p>
        </div>
      ) : (
        // Quiz Results Table
        <div className="bg-white rounded-lg overflow-hidden shadow">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                  Difficulty
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                  Correct
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                  Wrong
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                  Total
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                  Score
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((res, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-3 text-sm text-gray-700 capitalize">
                    {res.type}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {res.difficulty}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {new Date(res.date).toDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-green-600">
                    {res.correctAnswers}
                  </td>
                  <td className="px-4 py-3 text-sm text-red-500">
                    {res.wrongAnswers}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {res.totalQuestions}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold">
                    {res.percentage}%
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        res.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {res.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllResults;