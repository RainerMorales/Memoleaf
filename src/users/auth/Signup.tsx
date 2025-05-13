import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(userCredential.user);
      alert("Please check your email!");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="bg-black text-white h-screen flex justify-center lg:items-center md:items-center">
        <form
          onSubmit={create}
          className="p-10 rounded shadow-xl w-full max-w-md space-y-4"
        >
          <h1 className="text-2xl text-center">Sign Up</h1>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="bg-zinc-800 text-white border border-zinc-700 w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Email"
            type="email"
            value={email}
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="bg-zinc-800 text-white border border-zinc-700 w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Password"
            type="password"
            value={password}
          />
          <button
            type="submit"
            className="w-full p-2 bg-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            Create Account
          </button>
          <div className="text-center text-sm opacity-80">
            Already have an account? Log in{" "}
            <Link
              className="hover:underline opacity-60 hover:text-zinc-600"
              to={"/Login"}
            >
              here
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
export default Signup;
