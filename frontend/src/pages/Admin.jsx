import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {

  const [stats, setStats] = useState({
    total_patients: 0,
    total_appointments: 0,
    waiting_patients: 0,
    completed_patients: 0,
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/admin/dashboard")
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-10">

      <h1 className="text-4xl font-bold mb-8">
        📊 Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg text-gray-600">Total Patients</h2>
          <p className="text-4xl font-bold text-blue-700 mt-3">
            {stats.total_patients}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg text-gray-600">Appointments</h2>
          <p className="text-4xl font-bold text-green-700 mt-3">
            {stats.total_appointments}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg text-gray-600">Waiting</h2>
          <p className="text-4xl font-bold text-yellow-500 mt-3">
            {stats.waiting_patients}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg text-gray-600">Completed</h2>
          <p className="text-4xl font-bold text-red-600 mt-3">
            {stats.completed_patients}
          </p>
        </div>

      </div>

      <div className="mt-10 bg-white rounded-xl shadow p-8">

        <h2 className="text-2xl font-bold mb-6">
          📈 Hospital Analytics
        </h2>

        <div className="space-y-5">

          <div>
            <p className="font-semibold">
              Patient Load
            </p>

            <div className="w-full bg-gray-200 rounded-full h-5 mt-2">

              <div
                className="bg-blue-600 h-5 rounded-full"
                style={{
                  width: `${Math.min(
                    stats.total_patients * 10,
                    100
                  )}%`,
                }}
              ></div>

            </div>

          </div>

          <div>
            <p className="font-semibold">
              Completed Consultations
            </p>

            <div className="w-full bg-gray-200 rounded-full h-5 mt-2">

              <div
                className="bg-green-600 h-5 rounded-full"
                style={{
                  width:
                    stats.total_appointments > 0
                      ? `${
                          (stats.completed_patients /
                            stats.total_appointments) *
                          100
                        }%`
                      : "0%",
                }}
              ></div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}