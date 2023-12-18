import React from "react";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import AttorneyContents from "../components/pages/mypage/AttorneyContents";
import Contents from "../components/pages/mypage/Contents";
import { Storage } from "../modules/Storage";

const Mypage = () => {
  const role = Storage.get("role");
  return (
    <>
      <Header />
      {role?.includes("attorney") ? <AttorneyContents /> : <Contents />}
      <Footer />
    </>
  );
};

export default Mypage;
