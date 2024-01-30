import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useLazyGetchatRoomFileBoxQuery } from "../../api/chat";
import closeIcon from "../../assets/images/close.png";
import { modalSelector, useAppDispatch, useAppSelector } from "../../store";
import { setSimpleListModal } from "../../store/slice/modal";

const SimpleListModal = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { simpleListModal: modal } = useAppSelector(modalSelector);
    const [trigger, {data : listData, isLoading}] = useLazyGetchatRoomFileBoxQuery();
    const [listItems, setListItems] = useState([]);

    const closeModal = () => {
        dispatch(setSimpleListModal({ open: false, modalData: {} }));
    };

    useEffect(() => {
        // console.log("modal", modal);
        if (modal?.modalState && modal?.modalData?.roomId) {
            trigger(modal.modalData.roomId);
        }
    }, [modal?.modalState]);

    useEffect(() => {
        if(listData?.data && listData?.data?.length > 0) {
            setListItems(listData.data);
        }
    }, [listData]);

    const onClickItemDownload = (fileUrl) => {
        if (!fileUrl) {
            alert("파일이 존재하지 않습니다.");
            return;
        }
        const newWindow = window.open();
        newWindow.document.title = "인디프 추가자료 다운로드";
        newWindow.location.href = fileUrl;
    };

    // console.log("listitems", listItems);

    if (isLoading) {
        return <></>;
    }

    return (
        <Modal
            className={"prematching-modal"}
            isOpen={modal?.modalState}
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
            <div className="header-title">추가자료</div>
            <div className="header-close">
                <button onClick={closeModal}>
                    <img src={closeIcon} alt="close" />
                </button>
            </div>
        </ModalHeader>
        <ModalContents>
            <div>
                <p className="contents-subtitle">파일 목록</p>
                    {listItems?.map((file, index) => (
                    <p key={"file_" + file.fileId} className="contents-info">
                        <a href="" onClick={() => onClickItemDownload(file?.fileUrl)}>
                        {file?.realName}
                        </a>
                    </p>
                    ))}
            </div>
        </ModalContents>
        </Modal>
    );
};

export default SimpleListModal;

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