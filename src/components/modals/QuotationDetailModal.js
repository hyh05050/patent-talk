import { useEffect, useState } from "react";
import Modal from "react-modal";
import { modalSelector, useAppDispatch, useAppSelector } from "../../store";

const QuotationDetailModal = () => {
    const { quotation: modal } = useAppSelector(modalSelector);
    const dispatch = useAppDispatch();
    const [openClass, setOpenClass] = useState(false);

    useEffect(() => {
        // 모달이 열릴 때 이벤트 처리
        if (modal?.modalState) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [modal?.modalState]);

    const openModal = () => {
        setOpenClass(true);
    };

    const closeModal = () => {
        setOpenClass(false);
    };

    return (
        <Modal />
    );

}

export default QuotationDetailModal;