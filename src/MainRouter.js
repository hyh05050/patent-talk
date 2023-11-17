import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Attorney from "./pages/Attorney";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/attorney" element={<Attorney />} />
      <Route path="/attorney/:field" element={<Attorney />} />
    </Routes>
  );
};

export default MainRouter;
