import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { modalSelector, useAppDispatch, useAppSelector } from "../../store";
import { setAlertModal } from "../../store/slice/modal";
import styled from "styled-components";
import closeIcon from "../../assets/images/close.png";

const ModalBox = styled.div`
  min-width: 200px;
  min-height: 200px;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  transition: opacity 0.2s ease-in-out;

  &.open {
    opacity: 1;
  }

  &.close {
    opacity: 0;
  }

  @media screen and (max-width: 400px) {
    width: 100%;
    margin: 10px;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      font-size: 1.2rem;
      font-weight: 700;
      margin: 0;
    }

    button {
      background: none;
      border: none;

      img {
        width: 20px;
        height: 20px;
      }
    }
  }

  .modal-body {
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
    margin-bottom: 15px;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    button {
      //theme color
      background: #202d90;
      color: #fff;
      border: none;
      border-radius: 5px;
      padding: 10px 20px;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;

      &:hover {
        background: #1b2565;
      }
    }
  }
`;

const AlertModal = () => {
  const { alert: modal } = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();
  const [openClass, setOpenClass] = useState(false);

  useEffect(() => {
    // 모달이 열릴 때 이벤트 처리
    if (modal.modalState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modal.modalState]);

  const openModal = () => {
    setOpenClass(true);
  };

  const closeModal = () => {
    setOpenClass(false);
    setTimeout(() => {
      dispatch(setAlertModal());
      if (modal.callback) modal.callback();
    }, 200);
  };

  return (
    <Modal
      className={"alert-modal"}
      isOpen={modal.modalState}
      onAfterOpen={openModal}
      onRequestClose={closeModal}
      contentLabel="Alert Modal"
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
          justifyContent: "center",
          alignItems: "center",
          height: "100%", // 화면 높이에 따라 가운데 정렬},
        },
      }}
    >
      <ModalBox className={openClass ? "open" : "close"}>
        <div className="modal-header">
          <h2>{modal.modalData?.title}</h2>
          <button onClick={closeModal}>
            <img src={closeIcon} alt="close modal" />
          </button>
        </div>
        <div className="modal-body">
          <p>{modal.modalData?.message}</p>
        </div>
        <div className="modal-footer">
          <button onClick={closeModal}>확인</button>
        </div>
      </ModalBox>
    </Modal>
  );
};

export default AlertModal;
