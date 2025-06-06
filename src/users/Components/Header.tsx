import Sidebar from "./Sidebar";
import { auth } from "@/firebase";
import { BlurFade } from "@/components/magicui/blur-fade";
import { CgProfile } from "react-icons/cg";
function Header() {
  const user = auth.currentUser?.displayName;
  return (
    <BlurFade className="bg-green-800 p-6 sticky backdrop-blur-lg top-0   w-full flex justify-between items-center border-b z-50">
      <div className="flex items-center text-white font-bold gap-2"><CgProfile size={30}/>{user}</div>
      <div>
        <Sidebar />
      </div>
    </BlurFade>
  );
}
export default Header;
