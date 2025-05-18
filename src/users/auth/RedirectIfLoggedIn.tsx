import { useEffect,ReactNode} from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
interface PrivateRouteProps{
    children:ReactNode
}
const RedirectIfLoggedIn = ({ children }: PrivateRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.emailVerified) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);
  

  return children;
};

export default RedirectIfLoggedIn;
