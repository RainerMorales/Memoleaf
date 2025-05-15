import Sidebar from "./Sidebar";

function Header() {
  // console.log(auth.currentUser);
  return (
    <header className="p-6 top-0 shadow-md  w-full flex justify-between items-center border-b">
      <div className=" text-white font-bold">Welcome</div>
      <div>
        <Sidebar />
      </div>
    </header>
  );
}
export default Header;
