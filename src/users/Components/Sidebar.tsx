import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
function Sidebar() {
  // const username = auth.currentUser?.email;
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
      <div className="drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content z-50">
          {/* Page content here */}
          <label htmlFor="my-drawer-4" className="drawer-button">
            <GiHamburgerMenu size={20} />
          </label>
        </div>
        <div className="drawer-side   bg-black">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu  border-l-1  text-center pt-20 bg-black text-base-content min-h-full w-50 p-4">
            {/* Sidebar content here */}
            <li className="h-10">
             Menu
            </li>
            <li>
              <button className="text-white bg-teal-600" onClick={logout}>
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
