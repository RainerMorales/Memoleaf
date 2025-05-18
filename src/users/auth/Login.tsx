import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster,toast } from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser?.emailVerified;
      if(!user){
        navigate("/login");
        setLoading(false);
        toast.dismiss("w");
        toast.error("Email not verified!", {
          id: "w",
          duration: 4000,
        });
      }else{
        navigate("/");

      }
      setPassword("");
    } catch (err) {
    
      setLoading(false);
      toast.dismiss("w");
      toast.error("Invalid Credentials!", {
        id: "w",
        duration: 4000,
      });
      setPassword("");
    }
  };





  return (
    <>
      <Toaster></Toaster>
      <div className="h-screen flex flex-col pt-10 lg:justify-center md:justify-center items-center space-y-4 ">
        <div className="text-center font-bold text-5xl">
          Todo<span className="text-teal-400">Now</span>
        </div>
        <div className="">
          <form
            onSubmit={login}
            className="p-10 rounded w-full max-w-md space-y-4"
          >
            <h1 className="text-lg opacity-80 text-center">Log In</h1>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" border border-zinc-700 w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Email"
              type="email"
              required
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" border border-zinc-700 w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Password"
              type="password"
              required
            />
            {!loading ? (
              <button
                type="submit"
                className="w-full p-2 bg-teal-500 hover:bg-teal-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                Log In
              </button>
            ) : (
              <button
                disabled={loading}
                type="submit"
                className=" disabled:bg-teal-700 cursor-not-allowed w-full p-2 bg-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <span className="loading  loading-dots loading-sm"></span>
              </button>
            )}
            <div className="text-center text-sm opacity-80">
              No account yet? Create one{" "}
              <Link
                className="underline text-teal-400 hover:opacity-60"
                to={"/Signup"}
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
export default Login;
{
  /* <button onClick={signup} className="p-2 bg-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-400">
              Sign in with google
            </button>
            <button onClick={logout}>
              logout
            </button> */
}
