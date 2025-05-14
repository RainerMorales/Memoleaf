import { ModeToggle } from "../../components/mode-toggle";
import { auth } from "@/firebase";
function Header() {
  console.log(auth.currentUser);
    const username = auth.currentUser?.email
  return (
    <header className="bg-black fixed p-6 top-0 shadow-md  w-full flex justify-between items-center">
      <div className=" text-white font-bold">Welcome {username}</div>
      <ModeToggle></ModeToggle>
    </header>
  );
}
export default Header;
