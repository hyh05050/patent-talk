import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import userIcon from "../../../assets/images/user.png";
import { useAppDispatch } from "../../../store";
import { setAlertModal } from "../../../store/slice/modal";
import { useAddMatchingMutation, useGetMatchingQuery } from "../../../api/matching";
import { Storage } from "../../../modules/Storage";

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

const matchingList = [
  {
    id: 1,
    name: "김특허 변리사",
    img: userIcon,
    company: "좋은특허법률사무소",
    typeList: ["특허", "상표", "디자인", "실용신안"],
    careerList: ["변리사", "특허전문변리사", "특허심판전문변리사"],
    expList: ["특허 10년", "특허 100건 이상", "특허심판 10건 이상"],
    price: "100만원",
  },
  {
    id: 2,
    name: "김특허 변리사",
    img: userIcon,
    company: "좋은특허법률사무소",
    typeList: ["특허", "상표", "디자인", "실용신안"],
    careerList: ["변리사", "특허전문변리사", "특허심판전문변리사"],
    expList: ["특허 10년", "특허 100건 이상", "특허심판 10건 이상"],
    price: "100만원",
  },
  {
    id: 3,
    name: "김특허 변리사",
    img: userIcon,
    company: "좋은특허법률사무소",
    typeList: ["특허", "상표", "디자인", "실용신안"],
    careerList: ["변리사", "특허전문변리사", "특허심판전문변리사"],
    expList: ["특허 10년", "특허 100건 이상", "특허심판 10건 이상"],
    price: "100만원",
  },
];

const Contents = () => {
  const navigate = useNavigate();
  const [proposal, setProposal] = useState("");
  // const { data: matchings, isLoading } = useGetMatchingQuery({ order_id: Storage.get("accountKey") });
  const [matchingAPI] = useAddMatchingMutation();
  const dispatch = useAppDispatch();

  const matching = (params) => {
    matchingAPI({
      ...params,
    })
      .unwrap()
      .then(({ status }) => {
        if (status === "success") {
          navigate("/mypage");
        } else {
          dispatch(
            setAlertModal({
              modalState: true,
              modalData: { title: "변리사 선택", message: "변리사 선택에 실패하였습니다." },
            })
          );
        }
      })
      .then((err) => {
        if (err) console.log(`error:${err}`);
      });
  };

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

    matching(proposal);
  };

  return (
    <main style={{ background: "#e5ecef" }}>
      <section>
        <Container className="container">
          <FieldTitle className="animate">제안 선택</FieldTitle>

          <FieldBox>
            {matchingList.map((matching, index) => (
              <Field key={index} className={proposal?.id === matching.id && "active"}>
                <div className="contents">
                  <div className="attorney_img">
                    <img src={matching.img} alt="user" />
                  </div>
                  <div className="attorney_info">
                    <p className="name">{matching.name}</p>
                    <p className="company">{matching.company}</p>
                    <p className="type">{matching.typeList.join(", ")}</p>
                  </div>
                  <div className="careers">
                    {matching.careerList.map((career, index) => (
                      <p className="career" key={index}>
                        {career}
                      </p>
                    ))}
                  </div>
                  <div className="experience">
                    {matching.expList.map((exp, index) => (
                      <p className="exp" key={index}>
                        {exp}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="footer">
                  <div className="estimate">
                    <p className="price">
                      견적가:<span>{matching.price}</span>
                    </p>
                  </div>
                  <div className="buttonBox">
                    <button>상세보기</button>
                  </div>
                  <div className="buttonBox">
                    <button onClick={() => onClickProposal(matching)}>선택</button>
                  </div>
                </div>
              </Field>
            ))}
          </FieldBox>

          <MatchingButton onClick={onClickMatching}>제안 선택</MatchingButton>
        </Container>
      </section>
    </main>
  );
};

export default Contents;
