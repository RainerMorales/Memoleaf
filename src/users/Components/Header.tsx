import Sidebar from "./Sidebar";
import { auth } from "@/firebase";
function Header() {
  const user = auth.currentUser?.displayName;
  return (
    <header className="p-6 sticky backdrop-blur-lg top-0   w-full flex justify-between items-center border-b">
      <div className=" text-white font-bold opacity-80 ">
        Hi <span className="text-teal-400">{user}!</span>
      </div>
      <div>
        <Sidebar />
      </div>
    </header>
  );
}
export default Header;
