import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Join from "./pages/Join";
import PreMatching from "./pages/PreMatching";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/preMatching" element={<PreMatching />} />
      <Route path="/preMatching/:field" element={<PreMatching />} />
    </Routes>
  );
};

export default MainRouter;
