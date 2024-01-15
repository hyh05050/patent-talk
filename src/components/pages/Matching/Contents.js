import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import userIcon from "../../../assets/images/user.png";
import { preMatchingSelector, useAppDispatch } from "../../../store";
import { setAlertModal, setLoadingModal } from "../../../store/slice/modal";
import { useGetAgentListMutation, useGetQuotationListMutation } from "../../../api/preMatching";
import { useAppSelector } from "./../../../store/index";
import { useAddMatchingMutation } from "../../../api/preMatching";

const Container = styled.div`
  max-width: 768px;
  padding: 60px 0;
`;

const FieldTitle = styled.h2`
  color: #000000;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  will-change: transform, opacity;
  transform: translate3d(0px, 40px, 0px);
  opacity: 0;
  transition: transform 1000ms ease 300ms, opacity 1000ms ease;
  margin-bottom: 16px;

  &.animate {
    opacity: 1;
    transform: translate3d(0px, 0px, 0px);
  }
`;

const FieldBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 767px) {
    display: none;
  }
`;

const Field = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 45px;

  &.active {
    transition: background-color 0.3s ease, color 0.3s ease;
    background-color: #202d90;
    color: #fff;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.07) 8px 8px 24px 0px;
  }

  div.contents {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    div.attorney_img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    div.attorney_info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 8px;

      p.name {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 5px;
      }

      p.company {
        font-size: 14px;
        font-weight: 400;
        margin-bottom: 5px;
      }

      p.type {
        font-size: 14px;
        font-weight: 400;
      }
    }

    div.careers {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 10px;

      p.career {
        font-size: 14px;
        font-weight: 400;
      }
    }

    div.experience {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 10px;

      p.exp {
        font-size: 14px;
        font-weight: 400;
      }
    }
  }

  div.footer {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;

    div.estimate {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      p.price {
        font-size: 20px;
        line-height: 1.2;

        span {
          font-size: 25px;
          font-weight: 700;
        }
      }
    }

    div.buttonBox {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      button {
        width: 80px;
        height: 40px;
        border: 1px solid #000;
        border-radius: 5px;
        background: #fff;
        color: #000;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;

        &.disabled {
          background: #e5ecef;
          color: #a1a1a1;
          border: 1px solid #a1a1a1;
          cursor: not-allowed;
          pointer-events: none;
        }
      }
    }
  }
`;

const CardBox = styled.div`
  width: 100%;
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 767px) {
    display: flex;
  }
`;

const Card = styled.div`
  width: 100%;
  background: #fff;
  padding: 20px;

  &.active {
    transition: background-color 0.3s ease, color 0.3s ease;
    background-color: #202d90;
    color: #fff;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.07) 8px 8px 24px 0px;
  }

  div.attorney_info {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    margin-bottom: 15px;

    div.attorney_img {
      min-width: 100px;
      width: 100px;
      height: 100px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 8px;

      p.name {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 5px;
      }

      p.company {
        font-size: 14px;
        font-weight: 400;
        margin-bottom: 5px;
      }

      p.type {
        font-size: 14px;
        font-weight: 400;
      }
    }
  }

  div.attorney_detail {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    padding: 10px;

    div.careers {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 10px;

      p.career {
        font-size: 14px;
        font-weight: 400;
      }
    }

    div.experience {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 10px;

      p.exp {
        font-size: 14px;
        font-weight: 400;
      }
    }
  }

  div.footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: end;
    gap: 20px;

    div.estimate {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      margin: 20px 0;

      p.price {
        font-size: 20px;
        line-height: 1.2;

        span {
          font-size: 25px;
          font-weight: 700;
        }
      }
    }

    div.buttonBox {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      gap: 20px;

      div {
        flex: 1 0;

        button {
          width: 100%;
          height: 40px;
          border: 1px solid #000;
          border-radius: 5px;
          background: #fff;
          color: #000;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;

          &.disabled {
            background: #e5ecef;
            color: #a1a1a1;
            border: 1px solid #a1a1a1;
            cursor: not-allowed;
            pointer-events: none;
          }
        }
      }
    }
  }
`;

const MatchingButton = styled.button`
  width: 100%;
  height: 56px;
  border-radius: 8px;
  background-color: #202d90;
  border: none;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  margin-top: 48px;
  cursor: pointer;
`;

const Contents = () => {
  const navigate = useNavigate();
  const { preMatchingId } = useParams();
  const [proposal, setProposal] = useState("");
  const { agentList, quotationList } = useAppSelector(preMatchingSelector);
  const [agentAPI] = useGetAgentListMutation();
  const [quotationAPI] = useGetQuotationListMutation();
  const [addMatchingAPI] = useAddMatchingMutation();
  const dispatch = useAppDispatch();

  const getAgentList = () => {
    agentAPI({
      preMatchingId: preMatchingId,
    })
      .unwrap()
      .then(({ status, data }) => {
        if (status === "success") {
          // console.log(data);
        } else {
          dispatch(
            setAlertModal({
              modalState: true,
              modalData: { title: "제안 선택", message: "매칭 변리사 검색에 실패하였습니다." },
            })
          );
        }
      })
      .then((err) => {
        if (err) console.log(`error:${err}`);
      });
  };

  const getQuotationList = () => {
    quotationAPI({
      preMatchingId: parseInt(preMatchingId),
    })
      .unwrap()
      .then(({ status, data }) => {
        if (status === "success") {
          // console.log(data);
        } else {
          dispatch(
            setAlertModal({
              modalState: true,
              modalData: { title: "제안 선택", message: "매칭 견적 검색에 실패하였습니다." },
            })
          );
        }
      })
      .then((err) => {
        if (err) console.log(`error:${err}`);
      });
  };

  const addMatching = () => {
    const quotationId = quotationList?.find((quotation) => quotation.agentNo === proposal.agentNo)?.quotationId;
    dispatch(
      setLoadingModal({
        modalState: true,
      })
    );

    addMatchingAPI({
      quotationId: quotationId,
    })
      .unwrap()
      .then(({ status, data }) => {
        if (status === "success") {
          dispatch(
            setAlertModal({
              modalState: true,
              modalData: { title: "제안 선택", message: "제안을 선택하셨습니다." },
              callback: () => {
                navigate("/mypage");
              },
            })
          );
        } else {
          dispatch(
            setAlertModal({
              modalState: true,
              modalData: { title: "제안 선택", message: "매칭 선택에 실패하였습니다." },
            })
          );
        }
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

  useEffect(() => {
    if (preMatchingId) {
      getQuotationList();
      getAgentList();
    }
  }, [preMatchingId]);

  const onClickProposal = (matching) => {
    setProposal(matching);
  };

  const onClickMatching = () => {
    if (!proposal) {
      dispatch(
        setAlertModal({
          modalState: true,
          modalData: { title: "변리사 선택", message: "변리사를 선택해주세요." },
        })
      );
      return;
    }

    addMatching();
  };

  return (
    <main style={{ background: "#e5ecef" }}>
      <section>
        <Container className="container">
          <FieldTitle className="animate">제안 선택</FieldTitle>

          <FieldBox>
            {agentList?.map((agent, index) => (
              <Field key={index} className={proposal?.agentNo === agent.agentNo && "active"}>
                <div className="contents">
                  <div className="attorney_img">
                    <img src={userIcon} alt="user" />
                  </div>
                  <div className="attorney_info">
                    <p className="name">{agent.name}</p>
                    <p className="type">{agent.mainArea}</p>
                    <p className="company">{agent.email || "-"}</p>
                  </div>
                  <div className="careers">
                    <p className="career">{agent.qualification}</p>
                    <p className="career">{agent.businessStatus}</p>
                    <p className="career">-</p>
                  </div>
                  <div className="experience">
                    <p className="exp">{agent.subArea1}</p>
                    <p className="exp">{agent.subArea2}</p>
                    <p className="exp">{agent.subArea3}</p>
                  </div>
                </div>
                <div className="footer">
                  <div className="estimate">
                    <p className="price">
                      견적가 : &nbsp;
                      <span>
                        {quotationList
                          ?.find((quotation) => quotation.agentNo === agent.agentNo)
                          ?.offerPrice.toLocaleString() || "미정"}
                      </span>
                    </p>
                  </div>
                  <div className="buttonBox">
                    <button>상세보기</button>
                  </div>
                  <div className="buttonBox">
                    <button
                      className={
                        quotationList?.some((quotation) => quotation.agentNo === agent.agentNo) ? "" : "disabled"
                      }
                      onClick={() => onClickProposal(agent)}
                    >
                      선택
                    </button>
                  </div>
                </div>
              </Field>
            ))}
          </FieldBox>

          <CardBox>
            {agentList.map((agent, index) => (
              <Card key={"matching_" + index} className={proposal?.agentNo === agent.agentNo && "active"}>
                <div className="attorney_info">
                  <div className="attorney_img">
                    <img src={userIcon} alt="user" />
                  </div>
                  <div>
                    <p className="name">{agent.name}</p>
                    <p className="type">{agent.mainArea}</p>
                    <p className="company">{agent.email || "-"}</p>
                  </div>
                </div>
                <div className="attorney_detail">
                  <div className="careers">
                    <p className="career">{agent.qualification}</p>
                    <p className="career">{agent.businessStatus}</p>
                    <p className="career">-</p>
                  </div>
                  <div className="experience">
                    <p className="exp">{agent.subArea1}</p>
                    <p className="exp">{agent.subArea2}</p>
                    <p className="exp">{agent.subArea3}</p>
                  </div>
                </div>
                <div className="footer">
                  <div className="estimate">
                    <p className="price">
                      견적가 : &nbsp;
                      <span>
                        {quotationList
                          ?.find((quotation) => quotation.agentNo === agent.agentNo)
                          ?.offerPrice.toLocaleString() || "미정"}
                      </span>
                    </p>
                  </div>
                  <div className="buttonBox">
                    <div>
                      <button>상세보기</button>
                    </div>
                    <div>
                      <button
                        className={
                          quotationList?.some((quotation) => quotation.agentNo === agent.agentNo) ? "" : "disabled"
                        }
                        onClick={() => onClickProposal(agent)}
                      >
                        선택
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </CardBox>

          <MatchingButton onClick={onClickMatching}>제안 선택</MatchingButton>
        </Container>
      </section>
    </main>
  );
};

export default Contents;
