import Home from "./users/page/Home";
import Footer from "./users/Components/Footer";
import Login from "./users/auth/Login";
import Signup from "./users/auth/Signup";
import Notfound from "./users/page/Notfound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./users/auth/PrivateRoute";
import RedirectIfLoggedIn from "./users/auth/RedirectIfLoggedIn";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/Login"
            element={
              <RedirectIfLoggedIn>
                <Login></Login>
              </RedirectIfLoggedIn>
            }
          ></Route>
          <Route
            path="/Signup"
            element={
              <RedirectIfLoggedIn>
                <Signup></Signup>
              </RedirectIfLoggedIn>
            }
          ></Route>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home></Home>
              </PrivateRoute>
            }
          ></Route>
          <Route path="*" element={<Notfound></Notfound>}></Route>
        </Routes>
      </Router>
      <Footer></Footer>
    </>
  );
}

export default App;
