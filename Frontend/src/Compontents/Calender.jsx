import React, { useState } from 'react';

const Calender = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    // Returns 0 (Sunday) to 6 (Saturday)
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year);

  const calendarDays = [];
  // Add padding for days from the previous month
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const isToday = (day) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow p-4 m-4">
        <div className="flex justify-between items-center mb-4">
          <button onClick={handlePrevMonth} className="p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <h2 className="font-medium text-lg">{monthNames[month]} {year}</h2>
          <button onClick={handleNextMonth} className="p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-xs text-center mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className={`font-medium ${day === 'Su' || day === 'Sa' ? 'text-blue-500' : ''}`}>
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-xs text-center">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`py-1 rounded-md ${day === null ? 'text-gray-300' : isToday(day) ? 'bg-purple-200 font-semibold' : ''}`}
            >
              {day ?? ''}
            </div>
          ))}
        </div>

        <div className="mt-2 pt-2 border-t flex justify-between items-center">
          <div className="text-sm">Semester: 3 of 8</div>
          <div className="bg-gray-200 w-32 h-2 rounded-full">
            <div className="bg-blue-600 h-2 rounded-full w-1/3"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calender;