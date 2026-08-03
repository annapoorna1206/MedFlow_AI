import { useEffect, useState } from "react";
import axios from "axios";

export default function Analytics() {

  const [data, setData] = useState(null);

  useEffect(() => {

    axios
      .get("http://127.0.0.1:5000/admin/dashboard")
      .then((res) => {
        setData(res.data);
      });

  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-slate-100 p-10">

      <h1 className="text-4xl font-bold mb-8">
        📊 Hospital Analytics
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg">👨‍⚕️ Total Patients</h2>
          <p className="text-4xl font-bold mt-4">
            {data.total_patients}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg">📅 Appointments</h2>
          <p className="text-4xl font-bold mt-4">
            {data.total_appointments}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg">⏳ Waiting</h2>
          <p className="text-4xl font-bold mt-4 text-yellow-600">
            {data.waiting_patients}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg">✅ Completed</h2>
          <p className="text-4xl font-bold mt-4 text-green-600">
            {data.completed_patients}
          </p>
        </div>

      </div>

    </div>

  );

}