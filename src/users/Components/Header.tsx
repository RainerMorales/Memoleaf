import Sidebar from "./Sidebar";
import { auth } from "@/firebase";
import { BlurFade } from "@/components/magicui/blur-fade";
import { WordRotate } from "@/components/magicui/word-rotate";
function Header() {
  const user = auth.currentUser?.displayName || "User";
  const hour = new Date().getHours();
  let greeting = "Good evening! 😊";
  if (hour < 12) greeting = "Good morning! 😊";
  else if (hour < 18) greeting = "Good afternoon! 😊";
  return (
    <BlurFade className="bg-green-800 p-4 sticky backdrop-blur-lg top-0   w-full flex justify-between items-center border-b z-50">
      <div className="flex items-center  text-white font-bold gap-2">
        <img className="w-6" src="/profile-user.png" alt="s" />
        <WordRotate duration={9000} className="text-sm" words={[`${user}`,`${greeting}`,"MemoLeaf" ]} />
      </div>
      <div>
        <Sidebar />
      </div>
    </BlurFade>
  );
}
export default Header;
