
import Home from "./users/page/Home";
import Login from "./users/auth/Login";
import Notfound from "./users/page/Notfound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/Login" element={<Login></Login>}></Route>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="*" element={<Notfound></Notfound>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
