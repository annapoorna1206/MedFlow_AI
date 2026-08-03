import { useEffect, useState } from "react";
import axios from "axios";

export default function History() {

  const [history, setHistory] = useState([]);

  useEffect(() => {

    const patient_id = localStorage.getItem("patient_id");

    axios
      .get("http://127.0.0.1:5000/history", {
        params: {
          patient_id: patient_id
        }
      })
      .then((res) => setHistory(res.data))
      .catch((err) => console.log(err));

  }, []);

  return (

    <div className="min-h-screen bg-slate-100 p-10">

      <h1 className="text-4xl font-bold mb-8">
        📜 Appointment History
      </h1>

      <div className="bg-white rounded-2xl shadow-2xl border p-8">

        <table className="w-full">

          <thead>

            <tr className="border-b bg-blue-100">

              <th className="p-3">Token</th>
              <th className="p-3">Doctor</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>

            </tr>

          </thead>

          <tbody>

            {history.length === 0 ? (

              <tr>

                <td
                  colSpan="4"
                  className="text-center p-8"
                >
                  📅 No Appointment History Yet.
                  Book your first appointment.
                </td>

              </tr>

            ) : (

              history.map((item) => (

                <tr
                  key={item.id}
                  className="border-b"
                >

                  <td className="p-3 text-center">
                    {item.token}
                  </td>

                  <td className="p-3 text-center">
                    {item.doctor}
                  </td>

                  <td className="p-3 text-center">
                    {item.date}
                  </td>

                  <td className="p-3 text-center">

                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        item.status === "Completed"
                          ? "bg-green-600"
                          : item.status === "In Consultation"
                          ? "bg-blue-600"
                          : "bg-yellow-500"
                      }`}
                    >
                      {item.status}
                    </span>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}