import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate();

  const patientName =
    localStorage.getItem("patient_name") || "Patient";

  const handleLogout = () => {

    localStorage.removeItem("patient_id");
    localStorage.removeItem("patient_name");

    navigate("/login");

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-100">

      {/* Header */}

      <nav className="bg-blue-700 text-white px-10 py-5 shadow-lg flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          🏥 MedFlow AI Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-xl font-semibold transition duration-300"
        >
          Logout
        </button>

      </nav>

      <div className="max-w-7xl mx-auto px-8 py-10">

        <h2 className="text-5xl font-bold text-center text-blue-900">
          Welcome, {patientName} 👋
        </h2>

        <p className="text-center text-gray-600 text-lg mt-3 mb-12">
          Manage your appointments and monitor your hospital queue in real time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">

          {/* Book Appointment */}

          <Link to="/appointment" className="w-full max-w-sm">
            <div className="bg-white h-52 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 p-8 flex flex-col justify-center">

              <h3 className="text-2xl font-bold mb-3 text-blue-700">
                📅 Book Appointment
              </h3>

              <p className="text-gray-600">
                Schedule an appointment with a doctor.
              </p>

            </div>
          </Link>

          {/* Queue */}

          <Link to="/queue" className="w-full max-w-sm">
            <div className="bg-white h-52 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 p-8 flex flex-col justify-center">

              <h3 className="text-2xl font-bold mb-3 text-blue-700">
                ⏳ Queue Status
              </h3>

              <p className="text-gray-600">
                Check your live token and estimated waiting time.
              </p>

            </div>
          </Link>

          {/* Profile */}

          <Link to="/profile" className="w-full max-w-sm">
            <div className="bg-white h-52 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 p-8 flex flex-col justify-center">

              <h3 className="text-2xl font-bold mb-3 text-blue-700">
                👤 My Profile
              </h3>

              <p className="text-gray-600">
                View your personal information.
              </p>

            </div>
          </Link>

          {/* History */}

          <Link to="/history" className="w-full max-w-sm">
            <div className="bg-white h-52 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 p-8 flex flex-col justify-center">

              <h3 className="text-2xl font-bold mb-3 text-blue-700">
                📋 Appointment History
              </h3>

              <p className="text-gray-600">
                View all your previous appointments.
              </p>

            </div>
          </Link>

          {/* AI Recommendation */}

          <Link to="/recommend" className="w-full max-w-sm">
            <div className="bg-white h-52 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 p-8 flex flex-col justify-center">

              <h3 className="text-2xl font-bold mb-3 text-blue-700">
                🤖 AI Recommendation
              </h3>

              <p className="text-gray-600">
                Get the best appointment time using AI predictions.
              </p>

            </div>
          </Link>

          {/* Doctor */}

          <Link to="/doctor" className="w-full max-w-sm">
            <div className="bg-white h-52 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 p-8 flex flex-col justify-center">

              <h3 className="text-2xl font-bold mb-3 text-blue-700">
                👨‍⚕️ Doctor Dashboard
              </h3>

              <p className="text-gray-600">
                View patient queue and appointment status.
              </p>

            </div>
          </Link>

          {/* Analytics */}

          <Link to="/analytics" className="w-full max-w-sm">
            <div className="bg-white h-52 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 p-8 flex flex-col justify-center">

              <h3 className="text-2xl font-bold mb-3 text-blue-700">
                📊 Hospital Analytics
              </h3>

              <p className="text-gray-600">
                View live hospital statistics and performance metrics.
              </p>

            </div>
          </Link>

          {/* Admin */}

          <Link to="/admin" className="w-full max-w-sm">
            <div className="bg-white h-52 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 p-8 flex flex-col justify-center">

              <h3 className="text-2xl font-bold mb-3 text-blue-700">
                📊 Admin Dashboard
              </h3>

              <p className="text-gray-600">
                Monitor hospital statistics and analytics.
              </p>

            </div>
          </Link>

        </div>

      </div>

    </div>

  );

}