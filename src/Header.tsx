import { ModeToggle } from "./components/mode-toggle";


function Header(){
    return (
      <header className="bg-black fixed p-6 top-0 shadow-md  w-full flex justify-between items-center">
        <div className="text-2xl text-white font-bold">📑 TODO-LIST APP</div>
        <ModeToggle></ModeToggle>
      </header>
    );
}
export default Header