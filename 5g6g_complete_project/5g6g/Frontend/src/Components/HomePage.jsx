import React from 'react';

const HomePage = () => {
  return (
    <div className="bg-gray-900 w-screen text-white">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">AI-Powered Network Failure Prediction</h1>
          <p className="text-lg font-medium text-gray-300">Proactively monitor and maintain your network to reduce downtime and optimize performance.</p>
        </div>
      </header>

      {/* About Project Section */}
      <section className="container mx-auto py-16 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-100">About Our Project</h2>
          <p className="text-gray-400 text-lg mt-4">
            Our web application leverages cutting-edge AI and blockchain technology to predict network failures, optimize maintenance schedules, and reduce downtime. It is specifically designed to handle the unique demands of 5G networks and ensure continuous operation for mission-critical systems.
          </p>
        </div>

        {/* Project Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Feature 1 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYudbNdMbA0AH4JBlIaN0VlzHDBrzcVfrzFQ&s" alt="Network Analysis" className="mb-6 w-full h-40 object-cover rounded" />
            <h3 className="text-xl font-semibold text-gray-200 mb-2">AI-Powered Network Analysis</h3>
            <p className="text-gray-400">
              Our system continuously monitors key network metrics such as latency, signal strength, and traffic congestion to detect potential failures in real time.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <img src="https://wind.app/_next/image?url=http%3A%2F%2Fwind-web-s3-public.s3.ap-south-1.amazonaws.com%2Flearn%2Fmedia%2Fimage-10.png&w=1920&q=75" alt="Blockchain Security" className="mb-6 w-full h-40 object-cover rounded" />
            <h3 className="text-xl font-semibold text-gray-200 mb-2">Blockchain Security</h3>
            <p className="text-gray-400">
              We use blockchain technology to ensure tamper-proof logging of network anomalies and to enhance data integrity for industries like healthcare and autonomous transport.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIW8Z9gEyXo4MeAsQh9RsIppRQOpE8Tb5aNA&s" alt="Automated Maintenance" className="mb-6 w-full h-40 object-cover rounded" />
            <h3 className="text-xl font-semibold text-gray-200 mb-2">Automated Maintenance</h3>
            <p className="text-gray-400">
              The AI-based system forecasts potential network issues and optimizes maintenance schedules to prevent failures, thus minimizing downtime.
            </p>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="bg-gray-800 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-100 mb-12">Our Technology in Action</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-n9p5d631Q41a4PeJSeJ_4b5WH_Oa7eVtxQ&s" alt="Real-time Monitoring" className="rounded-lg w-full h-64 object-cover" />
            <img src="https://5ghub.us/wp-content/uploads/2023/03/AdobeStock_252154977-1024x683-1-jpg.webp" alt="5G Network" className="rounded-lg w-full h-64 object-cover" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjp6Umz6VeRq_9yj_8Ula8vp9YuF3ijutFmw&s" alt="AI Analysis" className="rounded-lg w-full h-64 object-cover" />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-gray-700 to-gray-800 text-white text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6">Start Optimizing Your Network Today</h2>
          <p className="text-lg font-medium mb-8 text-gray-300">Leverage AI and blockchain to enhance network reliability, reduce failures, and optimize your operations.</p>
          <button className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
