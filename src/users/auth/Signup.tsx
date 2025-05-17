import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile
} from "firebase/auth";
import { auth,db } from "@/firebase";
import { doc,setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[name,setName]=useState("")
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
      const user=userCredential.user
      await setDoc(doc(db,"users",user.uid),{
        name,
        email,
        createdAt:new Date()
      })
      await updateProfile(userCredential.user,{
        displayName:name
      })
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
      console.log(err)
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
      <div className="text-white h-screen flex flex-col pt-10 items-center space-y-4">
        <div className="space-y-4">
          <div>
            <img className="w-40" src="write.png" alt="" />
          </div>
          <div className="text-center font-extrabold text-3xl">Todo-Now</div>
        </div>
        <div className="">
          <form
            onSubmit={createUser}
            className="p-10 rounded shadow-xl w-full max-w-md space-y-4"
          >
            <h1 className="text-lg text-center">Sign Up</h1>
            <input
              onChange={(e) => setName(e.target.value)}
              className=" text-white border border-zinc-700 w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="Username"
              type="text"
              value={name}
              required
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              className=" text-white border border-zinc-700 w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="Email"
              type="email"
              value={email}
              required
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className=" text-white border border-zinc-700 w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="Password"
              type="password"
              value={password}
            />
            {!loading ? (
              <button
                type="submit"
                className="w-full p-2 bg-teal-500 hover:bg-teal-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                Create Account
              </button>
            ) : (
              <button
                disabled={loading}
                type="submit"
                className=" disabled:bg-teal-500 cursor-not-allowed  w-full p-2 bg-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <span className="loading loading-dots loading-success loading-md"></span>
              </button>
            )}
            <div className="text-center text-sm opacity-80">
              Already have an account? Log in{" "}
              <Link
                className="underline text-teal-400 hover:opacity-60"
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
