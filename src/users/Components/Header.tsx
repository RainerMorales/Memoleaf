import Sidebar from "./Sidebar";
import { auth } from "@/firebase";
function Header() {
  const user = auth.currentUser?.displayName;
  return (
    <header className="p-6 sticky backdrop-blur-2xl top-0 shadow-md  w-full flex justify-between items-center border-b">
      <div className=" text-white font-bold opacity-80">
       Hi {user} !
      </div>
      <div>
        <Sidebar />
      </div>
    </header>
  );
}
export default Header;
