import Sidebar from "./Sidebar";
import { auth } from "@/firebase";
import { BlurFade } from "@/components/magicui/blur-fade";
function Header() {
  const user = auth.currentUser?.displayName;
  return (
    <BlurFade  className="p-6 sticky backdrop-blur-lg top-0   w-full flex justify-between items-center border-b z-50">
      <div className=" text-white font-bold opacity-80 ">
        Hi <span className="text-teal-400">{user}!</span>
      </div>
      <div>
        <Sidebar />
      </div>
    </BlurFade >
  );
}
export default Header;
