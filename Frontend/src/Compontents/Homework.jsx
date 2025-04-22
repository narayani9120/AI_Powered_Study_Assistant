import React from 'react'

const Homework = () => {
    const assignments = [
        {
          course: "Graphic Fundamentals",
          title: "Assignment: Design Project 1",
          dueDate: "February 10, 2024",
          status: "due-soon" // Styling status
        },
        {
          course: "Advanced Web Design",
          title: "Assignment: Responsive Website Project",
          dueDate: "March 5, 2024",
          status: "normal" // Styling status
        },
        {
          course: "User Experience Research",
          title: "Assignment: Usability Testing Report",
          dueDate: "April 15, 2024",
          status: "progress" // Styling status
        },
        {
          course: "Digital Photography",
          title: "Assignment: Photojournalism Project",
          dueDate: "April 8, 2024",
          status: "normal" // Styling status
        },
        {
          course: "3D Animation",
          title: "Assignment: Character Animation Project",
          dueDate: "May 20, 2024",
          status: "upcoming" // Styling status
        }
      ];
    
      return (
        <div className="bg-white rounded-lg shadow p-4 m-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              <h2 className="font-bold">Homeworks</h2>
            </div>
            <a href="#" className="text-blue-600 text-sm flex items-center">
              View all
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
    
          <div className="space-y-4">
            {assignments.map((assignment, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <div className={`p-3 ${
                  assignment.status === 'due-soon' ? 'bg-orange-100' : 
                  assignment.status === 'progress' ? 'bg-purple-100' :
                  assignment.status === 'upcoming' ? 'bg-yellow-100' : 'bg-green-100'
                }`}>
                  <h3 className="text-sm font-medium">{assignment.course}</h3>
                  <p className="text-xs text-gray-500">{assignment.title}</p>
                </div>
                <div className="p-3 bg-white">
                  <p className="text-xs text-gray-600">Due Date: {assignment.dueDate}</p>
                  {assignment.status === 'progress' && (
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-1">
                      <div className="bg-purple-600 h-1 rounded-full w-2/3"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>)
}
export default Homework;
