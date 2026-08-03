import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {

  const [stats, setStats] = useState({
    total_patients: 0,
    total_appointments: 0,
    waiting_patients: 0,
    completed_patients: 0
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/admin/dashboard"
      );

      setStats(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <nav className="bg-indigo-700 text-white p-5">
        <h1 className="text-3xl font-bold">
          🛠️ Admin Dashboard
        </h1>
      </nav>

      <div className="p-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white rounded-xl shadow-2xl border rounded-2xl hover:scale-105 transition duration-300 p-6">
            <h3 className="text-5xl font-extrabold-lg font-bold text-gray-600">
              Total Patients
            </h3>

            <p className="text-5xl font-extrabold font-bold text-blue-700 mt-3">
              {stats.total_patients}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-bold text-gray-600">
              Total Appointments
            </h3>

            <p className="text-5xl font-extrabold font-bold text-green-700 mt-3">
              {stats.total_appointments}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-2xl border rounded-2xl hover:scale-105 transition duration-300-2xl border rounded-2xl hover:scale-105 transition duration-300 p-6">
            <h3 className="text-lg font-bold text-gray-600">
              Waiting Patients
            </h3>

            <p className="text-5xl font-extrabold font-bold text-yellow-600 mt-3">
              {stats.waiting_patients}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-2xl border rounded-2xl hover:scale-105 transition duration-300 p-6">
            <h3 className="text-lg font-bold text-gray-600">
              Completed Patients
            </h3>

            <p className="text-5xl font-extrabold font-bold text-purple-700 mt-3">
              {stats.completed_patients}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}