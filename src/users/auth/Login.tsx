function Login() {
  return (
    <>
      <div className="bg-black text-white h-screen flex justify-center items-center">
        <div className="bg-zinc-900 p-10 rounded shadow-xl w-full max-w-md space-y-4">
          <h1 className="text-xl">Log In</h1>
          <input
            className="bg-zinc-800 text-white border border-zinc-700 w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Email"
            type="email"
            required
          />
          <input
            className="bg-zinc-800 text-white border border-zinc-700 w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Password"
            type="password"
          />
          <div className="flex items-center justify-center gap-4">
            <button className="p-2 bg-zinc-700 rounded">Login</button>
            <button className="p-2 bg-zinc-700 rounded">Sign up</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
