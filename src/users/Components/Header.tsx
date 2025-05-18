import Sidebar from "./Sidebar";
import { auth } from "@/firebase";
function Header() {
  const user = auth.currentUser?.displayName;
  return (
    <header className="p-6 top-0 shadow-md  w-full flex justify-between items-center border-b">
      <div className=" text-white font-bold">
        Welcome <span className="font-medium text-sm opacity-70">{user}!</span>
      </div>
      <div>
        <Sidebar />
      </div>
    </header>
  );
}
export default Header;
