import { useEffect, useState } from "react";
import axios from "axios";

export default function Queue() {

  const [queue, setQueue] = useState(null);

  useEffect(() => {

    const patient_id = localStorage.getItem("patient_id");

    axios
      .get("http://127.0.0.1:5000/queue", {
        params: {
          patient_id: patient_id
        }
      })
      .then((res) => {
        setQueue(res.data);
      })
      .catch((err) => console.log(err));

  }, []);

  if (!queue) {
    return (
      <div className="min-h-screen flex justify-center items-center text-3xl font-bold">
        ⏳ Loading Queue...
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-slate-100 p-10">

      <h1 className="text-5xl font-bold text-center mb-10">
        ⏳ Queue Status
      </h1>

      <div className="bg-white rounded-2xl shadow-2xl border p-10 max-w-2xl mx-auto">

        {/* Token */}

        <div className="text-center mb-10">

          <p className="text-2xl text-gray-600">
            Your Token Number
          </p>

          <h1 className="text-8xl font-extrabold text-blue-700 mt-3">
            {queue.token}
          </h1>

        </div>

        {/* Patients Ahead */}

        <div className="flex justify-between items-center border-b pb-5 mb-5">

          <h2 className="text-2xl font-semibold">
            👥 Patients Ahead
          </h2>

          <span className="text-4xl font-bold text-red-600">
            {queue.ahead}
          </span>

        </div>

        {/* AI Waiting Time */}

        <div className="flex justify-between items-center">

          <h2 className="text-2xl font-semibold">
            🤖 AI Estimated Wait Time
          </h2>

          <span className="text-4xl font-bold text-green-700">
            {queue.wait_time} mins
          </span>

        </div>

      </div>

    </div>

  );

}