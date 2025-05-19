import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
function Sidebar() {
  const userEmail = auth.currentUser?.email;
  const navigate =useNavigate()
  const logout = async () => {
      try {
        await signOut(auth);
        navigate("/login")
  
      } catch (err) {
        console.log(err);
      }
    };
  return (
    <>
      <div className="drawer-end z-50">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="hover:opacity-80 drawer-content ">
          {/* Page content here */}
          <label htmlFor="my-drawer-4" className="drawer-button cursor-pointer">
            <GiHamburgerMenu size={20} />
          </label>
        </div>
        <div className="drawer-side bg-black">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu  border-l-1  text-center pt-12 bg-black text-base-content min-h-full w-50 p-4">
            {/* Sidebar content here */}
            <li className="h-10 opacity-60 text-xs">{userEmail}</li>
            <li className="h-10">Menu</li>
            <li>
              <button
                className="text-white flex justify-center rounded-2xl bg-teal-600 hover:opacity-80"
                onClick={logout}
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
export default Sidebar;
