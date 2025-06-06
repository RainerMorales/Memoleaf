import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

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
      const verified = auth.currentUser?.emailVerified;
      const users = auth.currentUser?.displayName;

      if (!verified) {
        navigate("/login");
        setLoading(false);
        toast.dismiss("w");
        toast.error("Email not verified!", {
          id: "w",
          duration: 4000,
        });
      } else {
        navigate("/");
        toast.dismiss("s");
        toast(`Welcome ${users}!`, {
          id: "s",
          duration: 10000,
        });
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
      <div className="h-screen flex flex-col  justify-center items-center space-y-4 ">
        <div className="">
          <div className="flex justify-center items-center gap-2">
            <img className="w-10" src="leaf.png" alt="" />
            <div className="text-center font-bold text-5xl">
              Memo<span className="text-green-600">Leaf</span>
            </div>
          </div>
          <form
            onSubmit={login}
            className="p-10 rounded w-full max-w-md space-y-4"
          >
            <div className="text-center text-lg opacity-80">Log In</div>
            <input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" border border-green-700 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Email"
              type="email"
              autoComplete="on"
              required
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" border border-green-700 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Password"
              type="password"
              required
            />
            {!loading ? (
              <button
                type="submit"
                className="w-full p-2 text-white bg-green-500 hover:bg-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Log In
              </button>
            ) : (
              <button
                disabled={loading}
                type="submit"
                className=" text-white disabled:bg-green-700 cursor-not-allowed w-full p-2 bg-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <span className="loading  loading-dots loading-sm"></span>
              </button>
            )}
            <div className="text-center text-sm opacity-80">
              No account yet? Create one{" "}
              <Link
                className="underline text-green-600 hover:opacity-60"
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
