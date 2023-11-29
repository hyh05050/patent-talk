import React, { useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { useGetPreMatchingQuery } from "../../api/preMatching";
import closeIcon from "../../assets/images/close.png";
import { modalSelector, useAppDispatch, useAppSelector } from "../../store";
import { setPreMatchingModal } from "../../store/slice/modal";
import { convertCodeToText as CTT } from "../pages/preMatching/Category";

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header-title {
    width: calc(100% - 32px);
    font-size: 30px;
    font-weight: 600;
    color: #333;
    text-align: center;
  }

  .header-close {
    font-size: 20px;
    cursor: pointer;

    button {
      background-color: transparent;
      border: none;
      outline: none;

      img {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const ModalContents = styled.div`
  .contents-title {
    font-size: 20px;
    font-weight: 500;
    color: #333;
    margin-top: 25px;
    margin-bottom: 10px;
  }

  .contents-box {
    padding: 20px;
    background-color: #cdcdcd;

    p.contents-subtitle {
      font-size: 16px;
      font-weight: 500;
      color: #333;
      margin-bottom: 5px;
    }

    p.contents-info {
      font-size: 15px;
      font-weight: 400;
      margin-left: 17px;
      margin-bottom: 10px;
      color: #1b267b;
    }

    ul {
      line-height: 1.8;
      padding-left: 20px;
      li {
        list-style-type: square;
      }
    }
  }
`;

const PreMatchingModal = () => {
  const { matching: modal } = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();
  const { data: matching, isLoading, refetch } = useGetPreMatchingQuery(modal.modalData?.preMatchingId || "0");
  useEffect(() => {
    // 모달이 열릴 때 이벤트 처리
    if (modal.modalState) {
      document.body.style.overflow = "hidden";
      refetch();
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modal.modalState]);

  const closeModal = () => {
    dispatch(setPreMatchingModal());
  };

  const onClickDownload = (fileUrl) => {
    if (!fileUrl) {
      alert("파일이 존재하지 않습니다.");
      return;
    }
    const newWindow = window.open();
    newWindow.document.title = "인디프 추가자료 다운로드";
    newWindow.location.href = fileUrl;
  };

  if (isLoading) return <></>;

  return (
    <Modal
      className={"prematching-modal"}
      isOpen={modal.modalState}
      onRequestClose={closeModal}
      contentLabel="Loading..."
      style={{
        overlay: {
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          zIndex: 9998, // 원하는 z-index 값
          overflow: "auto",
        },
        content: {
          position: "absolute",
          top: "100px",
          left: "50%",
          transform: "translateX(-50%)",
          maxWidth: "600px",
          minWidth: "350px",
          border: "1px solid rgb(204, 204, 204)",
          background: "rgb(255, 255, 255)",
          overflow: "auto",
          borderRadius: "4px",
          outline: "none",
          padding: "20px",
        },
      }}
    >
      <ModalHeader>
        <div className="header-title">
          <span>매칭 신청 정보</span>
        </div>
        <div className="header-close">
          <button onClick={closeModal}>
            <img src={closeIcon} alt="close" />
          </button>
        </div>
      </ModalHeader>

      <ModalContents>
        <p className="contents-title">&nbsp;</p>
        <div className="contents-box">
          <div>
            <p className="contents-subtitle">1. 특허 유형</p>
            <p className="contents-info">{CTT(matching?.data?.type, "main")}</p>
          </div>

          <div>
            <p className="contents-subtitle">2. 분류</p>
            <p className="contents-info">
              {matching?.data?.detailType
                ? CTT(matching?.data?.subType, "sub") + "-" + matching?.data?.detailType
                : CTT(matching?.data?.subType, "sub")}
            </p>
          </div>

          <div>
            <p className="contents-subtitle">3. 상세 정보</p>
            <p className="contents-info">{matching?.data?.detail}</p>
          </div>

          <div>
            <p className="contents-subtitle">4. 추가 자료</p>
            {matching?.data?.fileList?.map((file, index) => (
              <p key={"file_" + file.fileId} className="contents-info">
                <a href="#" onClick={() => onClickDownload(file?.fileUrl)}>
                  {file?.realName}
                </a>
              </p>
            ))}
          </div>

          <div>
            <p className="contents-subtitle">5. 매칭 확인</p>
            <p className="contents-info">
              <a href={"/matching?preMatchingId="+modal?.modalData?.preMatchingId}>확인</a>
            </p>
          </div>
        </div>
      </ModalContents>
    </Modal>
  );
};

export default PreMatchingModal;
