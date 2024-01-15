import { Warning } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { sendQuotation } from "../../api/axiosApi";
import { modalSelector, useAppDispatch, useAppSelector } from "../../store";
import { setLoadingModal, setQuotationModal } from "../../store/slice/modal";
import { useSetQuotationMutation } from "../../api/preMatching";

const QuotationModal = () => {
  const { quotation: modal } = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();
  const [openClass, setOpenClass] = useState(false);
  const [setQuotationApi] = useSetQuotationMutation();
  const [offerPrice, setOfferPrice] = useState(0);

  useEffect(() => {
    // 모달이 열릴 때 이벤트 처리
    if (modal?.modalState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modal?.modalState]);

  const openModal = () => {
    console.log("open");
    setOpenClass(true);
  };

  const closeModal = () => {
    console.log("close");
    dispatch(setQuotationModal());
  };

  const sendOffer = (data) => {
    const param = {
      offerPrice: Number(data.offerPrice),
      agentNo: modal?.modalData?.agentNo,
      preMatchingId: modal?.modalData?.preMatchingId,
    };

    dispatch(
      setLoadingModal({
        modalState: true,
      })
    );

    setQuotationApi(param)
      .unwrap()
      .then(({ status }) => {
        closeModal();
      })
      .then((err) => {
        if (err) console.log(`error:${err}`);
      }).finally(()=>{
        dispatch(
          setLoadingModal({
            modalState: false,
          })
        );
      });
  };

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  return (
    <Modal
      isOpen={modal?.modalState}
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
      <div className="modal-header">
        <h2>견적서</h2>
        <button className="modal-close" onClick={closeModal}>
          <i className="xi-close-thin"></i>
        </button>
      </div>
      <form onSubmit={handleSubmit(sendOffer)}>
        <div >
          <div >
            <div>
              <h3>제안 가격</h3>

              <input
                style={
                  {
                    paddingRight: "10px",
                    paddingLeft: "10px",
                    width: "100%",
                  }
                }
                type="text"
                placeholder="제안 가격을 입력하세요."
                id="offerPrice"
                {...register("offerPrice", {
                  required: true,
                  pattern: /^[0-9]*$/,
                })}
                onChange={(e) => {
                  if(e.target.value === "") setOfferPrice(0);
                  else setOfferPrice(parseInt(e.target.value));
                }}
              />
              {errors?.offerPrice && <Warning>제안 가격을 입력하세요.</Warning>}
            </div>
            <label style={
                {
                  alignContent: "flex-end",
                  marginTop: "10px",
                  marginBottom: "10px",
                  fontSize: "20px",
                  fontWeight: "bold",
                }
              } htmlFor="offerPrice">{offerPrice.toLocaleString()}원</label>
            <div className="modal-body__content__text">
              <p>제안 가격을 전송 할까요?</p>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button style={
            {
              marginLeft: "12px",
              marginRight: "12px",
            }
          } className="modal-footer__button" onClick={closeModal}>
            취소
          </button>
          <button style={
            {
              marginLeft: "12px",
              marginRight: "12px",
            }
          } className="modal-footer__button" type="submit">
            확인
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default QuotationModal;
