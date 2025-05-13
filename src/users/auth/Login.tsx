import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const[loading,setLoading]=useState(false)
  const navigate = useNavigate();
  const login = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(true)
      navigate("/");
      setEmail("");
      setPassword("");
    } catch (err) {
      setMessage("Invalid Credentials!");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      console.log(err);
      setEmail("");
      setPassword("");
    }
  };
  // const signup = async () => {
  //   const provider = new GoogleAuthProvider();
  //   await signInWithPopup(auth, provider);
  // };

  return (
    <>
      <div className="bg-black text-white h-screen flex justify-center items-center">
        <form
          onSubmit={login}
          className="bg-zinc-900 border  border-zinc-700 p-10 rounded shadow-xl w-full max-w-md space-y-4"
        >
          <h1 className="text-xl text-center">Log In</h1>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-zinc-800 text-white border border-zinc-700 w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Email"
            type="email"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-zinc-800 text-white border border-zinc-700 w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Password"
            type="password"
            required
          />
          {!loading ? (
            <button
              type="submit"
              className="w-full p-2 bg-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              Log In
            </button>
          ) : (
            <button
              disabled={loading}
              type="submit"
              className=" disabled:opacity-50 w-full p-2 bg-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <span className="loading loading-dots loading-md"></span>
            </button>
          )}
          <div className="text-center text-zinc-400">
            No account yet? Create one{" "}
            <Link className="underline hover:text-zinc-600" to={"/Signup"}>
              here
            </Link>
          </div>
          {message && <div className="text-red-700 text-center">{message}</div>}
        </form>
      </div>
    </>
  );
}
export default Login;
{
  /* <button onClick={signup} className="p-2 bg-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400">
              Sign in with google
            </button>
            <button onClick={logout}>
              logout
            </button> */
}
