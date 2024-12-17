import React, { useState } from 'react';
import Alert from './Components/Alert';
import ForecastPage from './Components/GraphPage';
import HomePage from './Components/HomePage';
import FaultRecording from './web3/FaultRecording';

const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [faultRecordingData, setFaultRecordingData] = useState({ currentInput: '', risk: '' });

  const handlePageChange = (page, data) => {
    setActivePage(page);
    if (data) setFaultRecordingData(data); // Set fault recording data if provided
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'next1':
        return <Alert onFaultRecording={handlePageChange} />; // Pass the function as a prop
      case 'Forecast':
        return <ForecastPage />;
      case 'next3':
        return <FaultRecording currentInput={faultRecordingData.currentInput} risk={faultRecordingData.risk} onBack={() => setActivePage('next1')} />;
      default:
        return <Alert onFaultRecording={handlePageChange} />;
    }
  };

  return (
    <div>
      {/* Fixed Navbar */}
      <nav className="bg-gray-800  text-white p-2 fixed top-0 w-full z-10">
        <ul className="flex justify-center space-x-4">
          <li>
            <button onClick={() => setActivePage('home')} className="hover:bg-gray-700 px-4 py-2  rounded-sm">Home</button>
          </li>
          <li>
            <button onClick={() => setActivePage('next1')} className="hover:bg-gray-700 px-2 py-2 rounded-sm">Attacks</button>
          </li>
          <li>
            <button onClick={() => setActivePage('Forecast')} className="hover:bg-gray-700 px-4 py-2 rounded-sm">Forecast</button>
          </li>
          <li>
            <button onClick={() => setActivePage('next3')} className="hover:bg-gray-700 px-4 py-2 rounded-sm">D_Storage</button>
          </li>
        </ul>
      </nav>

      {/* Content Below Navbar */}
      <div className="pt-20 p-4">
        {renderPage()}
      </div>
    </div>
  );
};

export default App;
