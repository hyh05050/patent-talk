import React from "react";
import "../../assets/scss/modal.scss";
import AgentInformationModal from "../modals/AgentInformationModal";
import AlertModal from "../modals/AlertModal";
import LoadingModal from "../modals/LoadingModal";
import PreMatchingModal from "../modals/PreMatchingModal";
import QuotationDetailModal from "../modals/QuotationDetailModal";
import QuotationModal from "../modals/QuotationModal";
import RightMenuModal from "../modals/RightMenuModal";
import SimpleRightModal from "../modals/SimpleRightModal";

const ModalProvider = () => {
  return (
    <>
      <AlertModal />
      <LoadingModal />
      <RightMenuModal />
      <SimpleRightModal />
      <PreMatchingModal />
      <AgentInformationModal />
      <QuotationModal />
      <QuotationDetailModal />
    </>
  );
};

export default ModalProvider;
