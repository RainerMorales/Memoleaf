import Sidebar from "./Sidebar";
import { auth } from "@/firebase";
import { BlurFade } from "@/components/magicui/blur-fade";
function Header() {
  const user = auth.currentUser?.displayName;
  return (
    <BlurFade className="bg-teal-600 p-6 sticky backdrop-blur-lg top-0   w-full flex justify-between items-center border-b z-50">
      <div className=" text-white font-bold">
        Hi <span className="">{user}!</span>
      </div>
      <div>
        <Sidebar />
      </div>
    </BlurFade>
  );
}
export default Header;
