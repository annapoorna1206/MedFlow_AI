import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-100">

      {/* Navbar */}
      <nav className="bg-blue-700 text-white shadow-lg">

        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide">
            🏥 MedFlow AI
          </h1>

          <p className="hidden md:block text-lg font-medium text-blue-100">
            AI-Powered Hospital Queue Management
          </p>

        </div>

      </nav>

      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center text-center px-6 py-24">

        <h2 className="text-5xl md:text-7xl font-extrabold text-gray-800 leading-tight">
          AI-Powered Smart
          <br />
          Hospital Queue Management
        </h2>

        <p className="mt-8 text-xl md:text-2xl text-gray-600 max-w-4xl">
          Reduce waiting time, book appointments effortlessly, and get
          <span className="font-semibold text-blue-700">
            {" "}AI-powered waiting time predictions
          </span>
          {" "}before you even reach the hospital.
        </p>

        {/* Buttons */}
        <div className="mt-14 flex flex-wrap justify-center gap-6">

          <Link to="/login">
            <button className="bg-blue-700 hover:bg-blue-800 text-white text-xl px-10 py-4 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="bg-green-600 hover:bg-green-700 text-white text-xl px-10 py-4 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
              Register
            </button>
          </Link>

        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-6xl w-full">

          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="text-2xl font-bold mb-3">
              Easy Appointment Booking
            </h3>
            <p className="text-gray-600">
              Book appointments online in seconds without standing in long
              hospital queues.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition">
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-2xl font-bold mb-3">
              AI Waiting Time Prediction
            </h3>
            <p className="text-gray-600">
              Predict waiting time using AI based on queue length, consultation
              duration and emergencies.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-2xl font-bold mb-3">
              Live Hospital Analytics
            </h3>
            <p className="text-gray-600">
              Monitor queue status, appointments and hospital performance in
              real time.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}