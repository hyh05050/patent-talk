import React, { useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import HeaderLogo from "../../assets/images/header-logo.png";

const SimpleRightModal = () => {
  const [modal, setModal] = useState({
    modalState: false,
  });

  const closeModal = () => {
    setModal({
      modalState: false,
    });
  };

  return (
    <Modal
      className={"simple-right-modal"}
      isOpen={modal.modalState}
      onRequestClose={closeModal}
      contentLabel="RightMenu"
      style={{
        overlay: {
          background: "transparent",
          zIndex: "9999",
        },
        content: {
          // 추가된 스타일로 가운데 정렬
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
        },
      }}
    >
      <div className="simple-menu">
        <Link to="/">
          <img src={HeaderLogo} alt="Logo" />
        </Link>
        <Link to="/">
          <p>로그인</p>
        </Link>
        <Link to="/">
          <p>회원가입</p>
        </Link>

        <div className="hr"></div>

        <button type="button">로그인/회원가입</button>
      </div>
    </Modal>
  );
};

export default SimpleRightModal;
