import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Appointment() {

  const navigate = useNavigate();

  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [emergency, setEmergency] = useState(false);
  const [message, setMessage] = useState("");

  const handleBook = async () => {

    if (doctor === "" || date === "") {
      setMessage("Please fill all fields.");
      return;
    }

    const patient_id = Number(localStorage.getItem("patient_id"));

    if (!patient_id) {
      setMessage("Please login again.");
      return;
    }

    try {

      const response = await axios.post(
        "http://127.0.0.1:5000/appointment",
        {
          patient_id,
          doctor_id: 1,
          date,
          emergency
        }
      );

      setMessage(
`✅ Appointment Booked Successfully!

🎫 Token Number: ${response.data.token}

You will be redirected to Queue...`
      );

      setTimeout(() => {
        navigate("/queue");
      }, 1500);

    } catch (error) {

      if (error.response) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Booking Failed");
      }

    }

  };

  return (

    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-10">

      <h1 className="text-5xl font-bold text-blue-700 mb-10 text-center">
        📅 Book Appointment
      </h1>

      <div className="bg-white rounded-2xl shadow-2xl border p-10 w-full max-w-xl">

        <select
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
          className="w-full border rounded-lg p-4 mb-5"
        >
          <option value="">Select Doctor</option>
          <option value="Cardiology">
            Dr. Sharma - Cardiology
          </option>
          <option value="Neurology">
            Dr. Gupta - Neurology
          </option>
          <option value="General Medicine">
            Dr. Mehta - General Medicine
          </option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded-lg p-4 mb-5"
        />

        <label className="flex items-center gap-3 text-lg mb-8">

          <input
            type="checkbox"
            checked={emergency}
            onChange={(e) => setEmergency(e.target.checked)}
            className="w-5 h-5"
          />

          Emergency Patient 🚨

        </label>

        <button
          onClick={handleBook}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition"
        >
          Book Appointment
        </button>

        {message && (

          <div className="mt-8 bg-green-50 border border-green-400 rounded-xl p-5 text-green-700 whitespace-pre-line text-center font-semibold">
            {message}
          </div>

        )}

      </div>

    </div>

  );

}