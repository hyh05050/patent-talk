import React from "react";
import LoadingModal from "../modals/LoadingModal";
import RightMenuModal from "../modals/RightMenuModal";
import SimpleRightModal from "../modals/SimpleRightModal";
import AlertModal from "../modals/AlertModal";
import PreMatchingModal from "../modals/PreMatchingModal";
import AgentInformationModal from "../modals/AgentInformationModal";
import "../../assets/scss/modal.scss";

const ModalProvider = () => {
  return (
    <>
      <AlertModal />
      <LoadingModal />
      <RightMenuModal />
      <SimpleRightModal />
      <PreMatchingModal />
      <AgentInformationModal />
    </>
  );
};

export default ModalProvider;
