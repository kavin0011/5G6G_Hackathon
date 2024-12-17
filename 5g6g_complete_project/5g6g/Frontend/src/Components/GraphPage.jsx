import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const ForecastPage = () => {
  const [selectedTab, setSelectedTab] = useState('Speed');
  const [showHistory, setShowHistory] = useState(false);

  const data = {
    labels: ['21 Sep', '22 Sep', '23 Sep', '24 Sep', '25 Sep', '26 Sep', '27 Sep', '28 Sep'],
    datasets: [
      // First segment (up to 26th Sep)
      
      {
        label: 'OUT (Before 27th)',
        data: [24, 25, 17, 19, 15, null, null, null], // Break after 26th Sep
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 2,
        fill: false,
        tension: 0.1,
      },
      // Second segment (from 27th Sep onward with different color)
      
      {
        label: 'OUT (From 27th)',
        data: [null, null, null, null, null, 9, 5, 8], // Start from 27th Sep
        borderColor: 'rgba(153, 102, 255, 1)', // Different color
        borderWidth: 2,
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        display: true,
      },
      y: {
        display: true,
      },
    },
  };

  const tableData = [
    { time: 'Mar-17-23 12:00', in: '19.051 bps', out: '24.560 bps' },
    { time: 'Mar-17-23 13:00', in: '30.544 bps', out: '25.398 bps' },
    { time: 'Mar-17-23 14:00', in: '20.904 bps', out: '17.449 bps' },
    { time: 'Mar-17-23 15:00', in: '18.329 bps', out: '19.313 bps' },
    { time: 'Mar-17-23 16:00', in: '29.713 bps', out: '15.367 bps' },
    { time: 'Mar-17-23 17:00', in: '5.769 bps', out: '4.880 bps' },
    { time: 'Mar-17-23 18:00', in: '23.750 bps', out: '19.140 bps' },
    { time: 'Mar-17-23 19:00', in: '22.460 bps', out: '17.160 bps' },
    { time: 'Mar-17-23 20:00', in: '22.250 bps', out: '17.850 bps' },
  ];

  return (
    <div className="w-screen h-screen p-8 ">
      <h1 className="text-2xl font-bold mb-4">Forecast</h1>

      {/* Tab navigation */}
      <div className="flex border-b mb-4">
        {['Volume', 'Speed', 'Utilization'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`p-2 border-b-2 ${selectedTab === tab ? 'border-blue-500' : 'border-transparent'}`}
          >
            {tab}
          </button>
        ))}
        <div className="ml-auto flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <span>Show History</span>
            <input
              type="checkbox"
              className="toggle-checkbox"
              checked={showHistory}
              onChange={() => setShowHistory(!showHistory)}
            />
          </label>
          <select className="p-2 border rounded">
            <option>7 Days</option>
            <option>30 Days</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white shadow rounded-lg mb-6 w-full h-[70vh]">
        {/* Full width and height chart */}
        <Line data={data} options={options} />
      </div>

      {/* Table */}
      <div className="bg-white p-4 shadow rounded-lg w-full">
        <div className="overflow-x-auto..">
          <table className="w-full table-auto border-collapse text-black">
            <thead>
              <tr>
                <th className="text-left py-2 border-b">Time</th>
                <th className="text-left py-2 border-b">IN</th>
                <th className="text-left py-2 border-b">OUT</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td className="py-2 border-b">{row.time}</td>
                  <td className="py-2 border-b">{row.in}</td>
                  <td className="py-2 border-b">{row.out}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ForecastPage;
