import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {

  const [formData, setFormData] = useState({
    full_name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://127.0.0.1:5000/register",
        formData
      );

      setMessage(response.data.message);

      setFormData({
        full_name: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        password: "",
      });

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

    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-cyan-50 to-slate-200 py-10">

      <form
        onSubmit={handleSubmit}
        className="bg-white w-[450px] rounded-3xl shadow-2xl border p-10"
      >

        <div className="text-center mb-8">

          <div className="text-6xl mb-3">
            🏥
          </div>

          <h1 className="text-3xl font-bold text-blue-700">
            MedFlow AI
          </h1>

          <p className="text-gray-500 mt-2">
            Create Your Patient Account
          </p>

        </div>

        <div className="space-y-4">

          <div>

            <label className="font-semibold text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              name="full_name"
              placeholder="Enter your full name"
              value={formData.full_name}
              onChange={handleChange}
              className="mt-2 w-full border-2 border-gray-200 rounded-xl p-3 focus:border-blue-600 focus:outline-none transition"
            />

          </div>

          <div>

            <label className="font-semibold text-gray-700">
              Age
            </label>

            <input
              type="number"
              name="age"
              placeholder="Enter your age"
              value={formData.age}
              onChange={handleChange}
              className="mt-2 w-full border-2 border-gray-200 rounded-xl p-3 focus:border-blue-600 focus:outline-none transition"
            />

          </div>

          <div>

            <label className="font-semibold text-gray-700">
              Gender
            </label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-2 w-full border-2 border-gray-200 rounded-xl p-3 focus:border-blue-600 focus:outline-none transition"
            >
              <option value="">
                Select Gender
              </option>

              <option>
                Male
              </option>

              <option>
                Female
              </option>

              <option>
                Other
              </option>

            </select>

          </div>

          <div>

            <label className="font-semibold text-gray-700">
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              className="mt-2 w-full border-2 border-gray-200 rounded-xl p-3 focus:border-blue-600 focus:outline-none transition"
            />

          </div>

          <div>

            <label className="font-semibold text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 w-full border-2 border-gray-200 rounded-xl p-3 focus:border-blue-600 focus:outline-none transition"
            />

          </div>

          <div>

            <label className="font-semibold text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              className="mt-2 w-full border-2 border-gray-200 rounded-xl p-3 focus:border-blue-600 focus:outline-none transition"
            />

          </div>

        </div>

        <button
          type="submit"
          className="mt-7 w-full bg-blue-700 hover:bg-blue-800 text-white p-3 rounded-xl font-bold text-lg transition duration-300 shadow-lg hover:shadow-xl"
        >
          Register
        </button>

        {message && (

          <div
            className={`mt-5 p-3 rounded-xl text-center font-semibold ${
              message.includes("Successfully")
                ? "bg-green-100 border border-green-400 text-green-700"
                : "bg-red-100 border border-red-400 text-red-700"
            }`}
          >
            {message}
          </div>

        )}

        <div className="mt-6 text-center">

          <p className="text-gray-600">

            Already have an account?

            <Link
              to="/login"
              className="text-blue-700 font-bold ml-2 hover:underline"
            >
              Login
            </Link>

          </p>

        </div>

      </form>

    </div>

  );

}