import React from "react";
import LoadingModal from "../modals/LoadingModal";
import RightMenuModal from "../modals/RightMenuModal";
import SimpleRightModal from "../modals/SimpleRightModal";
import "../../assets/scss/modal.scss";

const ModalProvider = () => {
  return (
    <>
      <LoadingModal />
      <RightMenuModal />
      <SimpleRightModal />
    </>
  );
};

export default ModalProvider;
