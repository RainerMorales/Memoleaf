import {  ReactNode, useEffect, useState } from "react";
import { auth } from "@/firebase"; // Adjust path according to your project
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
interface PrivateRouteProps{
    children:ReactNode
}
function PrivateRoute({ children }: PrivateRouteProps) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return user ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
