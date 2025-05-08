import React, { useState, useEffect } from 'react';

const Calendar = () => {
  const [workouts, setWorkouts] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const monthKey = ${currentYear}-${currentMonth};

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('workoutData');
    if (saved) {
      setWorkouts(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever workouts change
  useEffect(() => {
    localStorage.setItem('workoutData', JSON.stringify(workouts));
  }, [workouts]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handleDayClick = (day) => {
    const workout = prompt('Enter workout type (e.g., Cardio, Strength, Rest):');
    if (workout) {
      setWorkouts((prev) => ({
        ...prev,
        [monthKey]: {
          ...prev[monthKey],
          [day]: workout,
        },
      }));
    }
  };

  const changeMonth = (offset) => {
    const newDate = new Date(currentYear, currentMonth + offset);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
  };

  const currentMonthWorkouts = workouts[monthKey] || {};

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)}>Previous</button>
        <h2>{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}</h2>
        <button onClick={() => changeMonth(1)}>Next</button>
      </div>

      <div className="calendar-grid">
        {[...Array(daysInMonth)].map((_, index) => {
          const day = index + 1;
          const workoutType = currentMonthWorkouts[day];

          return (
            <div
              key={day}
              className={day ${workoutType ? 'active' : ''}}
              onClick={() => handleDayClick(day)}
              title={workoutType || 'Click to add workout'}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;