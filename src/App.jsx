import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar'; // Make sure file name is correct

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  return (
    <div className="app-container">
      <header>
        <h1>TrackFit</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>

      <main>
        <Calendar />
      </main>
    </div>
  );
};

export default App;