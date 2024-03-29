import { useState, useEffect } from "react";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-sky-500 bg-slate-900 text-white min-w-[420px] p-8 mx-auto rounded-xl">
      <h1 className="text-3xl text-gray-200 font-semibold mb-6">
        Create an account
      </h1>
      <form action="" className="flex flex-col gap-4 text-gray-900">
        <input
          className="px-3 py-3 rounded-md outline-slate-800"
          type="text"
          placeholder="Enter Your Name"
        />
        <input
          className="px-3 py-3 rounded-md outline-slate-800"
          type="email"
          placeholder="Enter Your Email"
        />
        <input
          className="px-3 py-3 rounded-md outline-slate-800"
          type="password"
          placeholder="Enter Your Password"
        />
        <button className="bg-sky-500 font-medium px-3 py-3 rounded-md w-1/3 mt-6">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
