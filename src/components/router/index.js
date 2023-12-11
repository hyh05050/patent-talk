import { Route, Routes } from "react-router-dom";
import { Storage } from "../../modules/Storage";
import Chat from "../../pages/Chat";
import Home from "../../pages/Home";
import Join from "../../pages/Join";
import JoinAttorney from "../../pages/JoinAttorney";
import Login from "../../pages/Login";
import Matching from "../../pages/Matching";
import Mypage from "../../pages/Mypage";
import PreMatching from "../../pages/PreMatching";

const MainRouter = () => {
  const isLogin = Storage.get("accountKey") ? true : false;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/joinAttorney" element={<JoinAttorney />} />
      <Route path="/preMatching" element={<PreMatching />} />
      <Route path="/preMatching/:field" element={<PreMatching />} />
      <Route path="/matching/:preMatchingId" element={isLogin ? <Matching /> : <Login />} />
      <Route path="/mypage" element={isLogin ? <Mypage /> : <Login />} />
      <Route path="/chat" element={isLogin ? <Chat /> : <Login />} />
    </Routes>
  );
};

export default MainRouter;
