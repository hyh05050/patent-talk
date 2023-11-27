import React, { useEffect } from "react";
import Modal from "react-modal";
import { modalSelector, useAppDispatch, useAppSelector } from "../../store";
import { setLoadingModal } from "../../store/slice/modal";

const LoadingModal = () => {
  const { loading: modal } = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 모달이 열릴 때 이벤트 처리
    if (modal.modalState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modal.modalState]);

  const closeModal = () => {
    dispatch(setLoadingModal());
  };

  return (
    <Modal
      className={"loading-modal"}
      isOpen={modal.modalState}
      onRequestClose={closeModal}
      contentLabel="Loading..."
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
      <div className="loading">
        <div className="loading-icon">
          <div></div>
        </div>
      </div>
    </Modal>
  );
};

export default LoadingModal;
