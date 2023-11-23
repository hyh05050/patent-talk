import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Join from "./pages/Join";
import PreMatching from "./pages/PreMatching";
import Matching from "./pages/Matching";
import Mypage from "./pages/Mypage";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/preMatching" element={<PreMatching />} />
      <Route path="/preMatching/:field" element={<PreMatching />} />
      <Route path="/matching" element={<Matching />} />
      <Route path="/mypage" element={<Mypage />} />
    </Routes>
  );
};

export default MainRouter;
