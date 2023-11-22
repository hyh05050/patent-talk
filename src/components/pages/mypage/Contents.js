import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Storage } from "../../../modules/Storage";
import { useAppDispatch } from "../../../store";
import { setAlertModal } from "../../../store/slice/modal";

const Contents = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLogin, setIsLogin] = useState(Storage.get("accountKey") ? true : false);

  useEffect(() => {
    console.log("isLogin", isLogin);
    if(!isLogin) {
      dispatch(setAlertModal({
        modalState: true,
        modalData: { title: "로그인이 필요합니다.", content: "로그인 페이지로 이동합니다." },
        callback: () => { navigate("/login"); },
      }));
    }
  } ,[]);
  return (
    <main>
      <section>
        <div className="container mb-32"></div>
      </section>
    </main>
  );
};

export default Contents;
