import { useEffect, useState } from "react";
import axios from "axios";

export default function Doctor() {
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");

  const loadAppointments = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/doctor/dashboard");
      setAppointments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const callNext = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/doctor/call-next"
      );

      setMessage(res.data.message);
      loadAppointments();

    } catch (err) {
      setMessage("Unable to call next patient.");
    }
  };

  const completePatient = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/doctor/complete"
      );

      setMessage(res.data.message);
      loadAppointments();

    } catch (err) {
      setMessage("Unable to complete consultation.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <nav className="bg-blue-700 text-white px-8 py-5">
        <h1 className="text-3xl font-bold">
          👨‍⚕️ Doctor Dashboard
        </h1>
      </nav>

      <div className="p-10">

        <div className="bg-white rounded-xl shadow-2xl border rounded-2xl-lg p-8">

          <div className="flex justify-between mb-8">

            <button
              onClick={callNext}
              className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition duration-300"
            >
              📢 Call Next Patient
            </button>

            <button
              onClick={completePatient}
              className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800"
            >
              ✅ Complete Consultation
            </button>

          </div>

          {message && (
            <div className="mb-6 bg-green-100 border border-green-400 text-green-800 p-3 rounded">
              {message}
            </div>
          )}

          <table className="w-full border">

            <thead className="bg-gray-100">

              <tr>

                <th className="border p-3">Token</th>
                <th className="border p-3">Patient</th>
                <th className="border p-3">Status</th>
                <th className="border p-3">Emergency</th>

              </tr>

            </thead>

            <tbody>

              {appointments.length === 0 ? (

                <tr>

                  <td
                    colSpan="4"
                    className="text-center p-6"
                  >
                    No Appointments
                  </td>

                </tr>

              ) : (

                appointments.map((a) => (

                  <tr key={a.id}>

                    <td className="border p-3 text-center">
                      {a.token}
                    </td>

                    <td className="border p-3">
                      {a.patient}
                    </td>

                    <td className="border p-3">
                      {a.status}
                    </td>

                    <td className="border p-3 text-center">
                      {a.emergency ? "🚨 Yes" : "No"}
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}