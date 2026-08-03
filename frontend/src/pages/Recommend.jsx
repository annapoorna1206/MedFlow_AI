import { useEffect, useState } from "react";
import axios from "axios";

export default function Recommend() {

  const [data, setData] = useState(null);

  useEffect(() => {

    axios
      .get("http://127.0.0.1:5000/recommend-slot")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));

  }, []);

  if (!data) {

    return (
      <div className="min-h-screen flex justify-center items-center text-3xl font-bold">
        🤖 Loading Recommendation...
      </div>
    );

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-100 flex flex-col justify-center items-center p-10">

      <h1 className="text-5xl font-bold text-blue-800 mb-10 text-center">
        🤖 AI Smart Appointment Recommendation
      </h1>

      <div className="bg-white rounded-2xl shadow-2xl border p-10 w-full max-w-2xl text-center">

        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Best Time to Visit
        </h2>

        <div className="mb-8">

          <p className="text-2xl text-gray-600 mb-3">
            🕒 Recommended Time
          </p>

          <h1 className="text-5xl font-extrabold text-blue-700">
            {data.recommended_time}
          </h1>

        </div>

        <div>

          <p className="text-2xl text-gray-600 mb-3">
            ⏳ Estimated Waiting Time
          </p>

          <h1 className="text-5xl font-extrabold text-green-700">
            {data.estimated_wait} mins
          </h1>

        </div>

      </div>

    </div>

  );

}