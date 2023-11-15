import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import HeaderLogo from "../../assets/images/header-logo.png";
import CloseIcon from "@mui/icons-material/Close";

const RightMenuModal = () => {
  const [modal, setModal] = useState({
    modalState: false,
  });

  useEffect(() => {
    // 모달이 열릴 때 이벤트 처리
    if (modal.modalState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modal.modalState]);

  const closeModal = () => {
    setModal({
      modalState: false,
    });
  };

  return (
    <Modal
      className={"right-menu-modal"}
      isOpen={modal.modalState}
      onRequestClose={closeModal}
      contentLabel="RightMenu"
      style={{
        overlay: {
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          zIndex: 9999, // 원하는 z-index 값
          overflow: "auto",
        },
        content: {
          // 추가된 스타일로 가운데 정렬
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
          height: "100%", // 화면 높이에 따라 가운데 정렬},
        },
      }}
    >
      <div className="right-menu">
        <div className="header">
          <Link to="/">
            <img src={HeaderLogo} alt="Logo" />
          </Link>
          <CloseIcon onClick={closeModal} />
        </div>

        <div className="contents">
          <div className="menu-item">
            <p className="title">변호사를 찾고 있다면</p>
            <Link to="/lawyer-search">
              <p className="text">변리사 상담받기</p>
            </Link>
            <Link to="/lawyer-search">
              <p className="text">변리사 지원 신청</p>
            </Link>
          </div>
          <div className="menu-item">
            <p className="title">특허가 가능한지 아직 모르겠다면</p>
            <Link to="/lawyer-search">
              <p className="text">나와 유사한 사례 찾기</p>
            </Link>
          </div>
          <div className="menu-item">
            <p className="title">특허 진행 중이라면</p>
            <Link to="/lawyer-search">
              <p className="text">특허 진행 중인 내 사건</p>
            </Link>
          </div>
        </div>

        <div className="footer">
          <div className="login-button">
            <button type="button">로그인/회원가입</button>
          </div>
          <div className="sub-menu">
            <div className="menu">
              <Link to="/lawyer-search">
                <p className="text">로그인</p>
              </Link>
              <Link to="/lawyer-search">
                <p className="text">회원가입</p>
              </Link>
            </div>

            <div className="menu">
              <Link to="/lawyer-search">
                <p className="text">회사 소개</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RightMenuModal;
