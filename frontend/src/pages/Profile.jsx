import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {

  const [profile, setProfile] = useState({});

  useEffect(() => {

    const patient_id = localStorage.getItem("patient_id");

    axios
      .get("http://127.0.0.1:5000/profile", {
        params: {
          patient_id: patient_id
        }
      })
      .then((res) => setProfile(res.data))
      .catch((err) => console.log(err));

  }, []);

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-100 flex flex-col items-center justify-center p-10">

      <h1 className="text-5xl font-bold text-blue-800 mb-10">
        👤 My Profile
      </h1>

      <div className="bg-white rounded-2xl shadow-2xl border p-10 w-full max-w-2xl">

        <div className="space-y-7">

          <div>
            <h3 className="font-semibold text-xl text-gray-700">
              Full Name
            </h3>
            <p className="text-2xl font-bold text-blue-700">
              {profile.full_name}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl text-gray-700">
              Age
            </h3>
            <p className="text-xl">
              {profile.age}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl text-gray-700">
              Gender
            </h3>
            <p className="text-xl">
              {profile.gender}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl text-gray-700">
              Phone
            </h3>
            <p className="text-xl">
              {profile.phone}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl text-gray-700">
              Email
            </h3>
            <p className="text-xl break-all">
              {profile.email}
            </p>
          </div>

        </div>

      </div>

    </div>

  );

}