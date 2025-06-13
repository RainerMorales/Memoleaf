import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        createdAt: new Date(),
      });
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      await sendEmailVerification(userCredential.user);
      toast.dismiss("w");
      toast.success("Please check your email! ", {
        id: "w",
        duration: 4000,
      });
      setLoading(false);
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.dismiss("w");
      toast.error("Password should be at least 6 characters!", {
        id: "w",
        duration: 4000,
      });
      setLoading(false);
      setPassword("");
    }
  };

  return (
    <>
      <Toaster></Toaster>
      <div className="h-screen flex flex-col justify-center items-center space-y-4">
        <div className="flex justify-center items-center gap-2">
          <img className="w-10" src="leaf.png" alt="" />
          <div className="text-center font-bold text-5xl">
            Memo<span className="text-green-600">Leaf</span>
          </div>
        </div>
        <div className="">
          <form
            onSubmit={createUser}
            className="p-10 rounded w-full max-w-md space-y-4"
          >
            <h1 className="text-lg opacity-80 text-center">Sign Up</h1>
            <input
              name="name"
              onChange={(e) => setName(e.target.value)}
              className="border border-green-700 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="Username"
              type="text"
              value={name}
              autoComplete="on"
              required
            />
            <input
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="border border-green-700 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="Email"
              type="email"
              value={email}
              autoComplete="on"
              required
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="border border-green-700 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="Password"
              type="password"
              value={password}
            />
            {!loading ? (
              <button
                type="submit"
                className="text-white w-full p-2 bg-green-500 hover:bg-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Create Account
              </button>
            ) : (
              <button
                disabled={loading}
                type="submit"
                className="text-white disabled:bg-green-700 cursor-not-allowed  w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <span className="loading loading-success loading-md"></span>
              </button>
            )}
            <div className="text-center text-sm opacity-80">
              Already have an account? Log in{" "}
              <Link
                className="underline text-green-400 hover:opacity-60"
                to={"/Login"}
              >
                here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Signup;
