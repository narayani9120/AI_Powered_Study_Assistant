import React from 'react'

const LandingPage = () => {
  return (
    <div>
      <div className="w-full py-6 px-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span className="mr-2">👋</span>
          <h1 className="text-xl font-semibold">Welcome, Merna!</h1>
        </div>
        <div className="text-sm text-gray-600">
          12 Jan 2023, Friday
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 flex justify-between">
        <div className="w-1/2">
          <h2 className="text-lg font-bold mb-3">Get Involved - Join a Club Today!</h2>
          <p className="text-gray-700 mb-4">
            Explore your interests and meet like-minded students by joining one of our many clubs. 
            Whether you're into sports, arts, or academics, there's a club for you. Find your community!
          </p>
          <button className="bg-blue-900 text-white px-4 py-2 rounded flex items-center">
            Learn More
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
        <div className="w-1/3">
          <img src="/api/placeholder/300/200" alt="Students in club activities" className="w-full h-auto" />
        </div>
      </div>
    </div>
    </div>
  )
}

export default LandingPage
