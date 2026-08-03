import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://127.0.0.1:5000/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "patient_id",
        response.data.patient_id
      );

      localStorage.setItem(
        "patient_name",
        response.data.patient_name
      );

      setMessage(
        `Welcome ${response.data.patient_name}`
      );

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    }

    catch (error) {

      if (error.response) {
        setMessage(error.response.data.error);
      }

      else {
        setMessage("Server Error");
      }

    }

  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-cyan-50 to-slate-200">

      <form
        onSubmit={handleLogin}
        className="bg-white w-[420px] rounded-3xl shadow-2xl p-10 border"
      >

        <div className="text-center mb-8">

          <div className="text-6xl mb-3">
            🏥
          </div>

          <h1 className="text-3xl font-bold text-blue-700">
            MedFlow AI
          </h1>

          <p className="text-gray-500 mt-2">
            Smart Hospital Queue Management
          </p>

        </div>

        <div className="mb-5">

          <label className="font-semibold text-gray-700">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full border-2 border-gray-200 rounded-xl p-3 focus:border-blue-600 focus:outline-none transition"
          />

        </div>

        <div className="mb-6">

          <label className="font-semibold text-gray-700">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full border-2 border-gray-200 rounded-xl p-3 focus:border-blue-600 focus:outline-none transition"
          />

        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white p-3 rounded-xl font-bold text-lg transition duration-300 shadow-lg hover:shadow-xl"
        >
          Login
        </button>

        {message && (

          <div
            className={`mt-5 p-3 rounded-xl text-center font-semibold ${
              message.startsWith("Welcome")
                ? "bg-green-100 text-green-700 border border-green-400"
                : "bg-red-100 text-red-700 border border-red-400"
            }`}
          >
            {message}
          </div>

        )}

        <div className="mt-6 text-center">

          <p className="text-gray-600">

            Don't have an account?

            <Link
              to="/register"
              className="text-blue-700 font-bold ml-2 hover:underline"
            >
              Register
            </Link>

          </p>

        </div>

      </form>

    </div>

  );

}