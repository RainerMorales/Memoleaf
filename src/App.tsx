
import Home from "./users/page/Home";
import Login from "./users/auth/Login";
import Signup from "./users/auth/Signup";
import Notfound from "./users/page/Notfound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./users/auth/PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/Login" element={<Login></Login>}></Route>
          <Route path="/Signup" element={<Signup></Signup>}></Route>
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
    </>
  );
}

export default App;
