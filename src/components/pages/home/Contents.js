import React from "react";
import styled from "styled-components";
import dummyImg from "../../../assets/images/funding_img_pc.webp";
import AttorneySlider from "./AttorneySlider";
import MainBanner from "./MainBanner";
import BannerSlider from "./BannerSlider";
import { useNavigate } from "react-router-dom";
import { categoryList, subCategoryList } from "../preMatching/Category";

const FieldTitle = styled.h2`
  color: #000000;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  will-change: transform, opacity;
  transform: translate3d(0px, 40px, 0px);
  opacity: 0;
  transition: transform 1000ms ease 300ms, opacity 1000ms ease;

  &.animate {
    opacity: 1;
    transform: translate3d(0px, 0px, 0px);
  }
`;

const FieldDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;

const Field = styled.div`
  position: relative;
  border-radius: 8px;
  background-color: transparent;
  border: 1px solid #e9ecef;
  margin-top: 16px;
  margin-right: 20px;
  padding: 20px;
  height: 100px;
  flex: 0 1 calc((100% - 60px) / 4);

  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;

  &.active_category {
    transition: background-color 0.3s ease, color 0.3s ease;
    background-color: #202d90;
    color: #fff;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.07) 8px 8px 24px 0px;
  }

  @media screen and (min-width: 961px) {
    &:nth-child(4n) {
      margin-right: 0;
    }
  }

  @media screen and (max-width: 960px) {
    height: 74px;
    padding: 16px 10px 16px;
    margin-right: 16px;
    flex: 0 1 calc((100% - 16px) / 2);

    &:nth-child(2n) {
      margin-right: 0;
    }
  }

  p {
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;

    @media screen and (max-width: 960px) {
      color: #17181a;
      text-align: initial;
      white-space: nowrap;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
    }
  }

  img {
    width: 56px;
    height: 56px;

    @media screen and (max-width: 960px) {
      width: 42px;
      height: 42px;
    }
  }
`;

const PatentFieldTitle = styled(FieldTitle)``;

const PatentFieldDiv = styled(FieldDiv)``;

const PatentField = styled.div`
  position: relative;
  border-radius: 8px;
  background-color: transparent;
  border: 1px solid #e9ecef;
  margin-top: 16px;
  margin-right: 20px;
  padding: 20px;
  height: 100px;
  flex: 0 1 calc((100% - 80px) / 5);

  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;

  &.active_category {
    transition: background-color 0.3s ease, color 0.3s ease;
    background-color: #202d90;
    color: #fff;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.07) 8px 8px 24px 0px;
  }

  @media screen and (min-width: 961px) {
    &:nth-child(5n) {
      margin-right: 0;
    }
  }

  @media screen and (max-width: 960px) {
    height: 74px;
    padding: 16px 10px 16px;
    margin-right: 16px;
    flex: 0 1 calc((100% - 16px) / 2);

    &:nth-child(2n) {
      margin-right: 0;
    }
  }

  p {
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;

    @media screen and (max-width: 960px) {
      color: #17181a;
      text-align: initial;
      white-space: nowrap;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
    }
  }

  img {
    width: 56px;
    height: 56px;

    @media screen and (max-width: 960px) {
      width: 42px;
      height: 42px;
    }
  }
`;

const Section2Div = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  flex-wrap: nowrap;
  padding: 80px 0px;
  color: white;
  text-align: center;

  div {
    p {
      font-weight: 700;
      font-size: 18px;
      line-height: 26px;
      margin-bottom: 16px;
    }

    h2 {
      font-weight: 700;
      font-size: 28px;
      line-height: 40px;
      color: white;

      @media screen and (min-width: 960px) {
        font-size: 44px;
        line-height: 60px;
      }
    }

    button {
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      white-space: nowrap;
      flex-shrink: 0;
      color: #ffffff;
      background-color: #09ad97;
      max-height: 56px;
      padding: 16px 20px;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
    }
  }
`;

const Contents = () => {
  const navigate = useNavigate();

  const onClickCategory = (e, params) => {
    const target = e.target.closest("div");
    const active = document.querySelector(".active_category");

    if (active) {
      active.classList.remove("active_category");
    }
    target.classList.add("active_category");

    //딜레이 1초

    setTimeout(() => {
      navigate("/preMatching/" + params);
    }, 500);
  };

  return (
    <main>
      <section>
        <MainBanner />
        <BannerSlider />
      </section>

      <section>
        <div className="container mb-32">
          <FieldTitle className="animate">특허별 견적</FieldTitle>

          <FieldDiv>
            {categoryList.map((item, index) => (
              <Field key={index} onClick={(e) => onClickCategory(e, item.name)}>
                <p>{item.title}</p>
                <img src={item.icon} alt="icon" />
              </Field>
            ))}
          </FieldDiv>
        </div>
      </section>

      <section>
        <div className="container mb-32">
          <PatentFieldTitle className="animate">분야별 견적</PatentFieldTitle>

          <PatentFieldDiv>
            {subCategoryList.map((item, index) => (
              <PatentField key={index} onClick={(e) => onClickCategory(e, item.name)}>
                <p>{item.title}</p>
                <img src={item.icon} alt="icon" />
              </PatentField>
            ))}
          </PatentFieldDiv>
        </div>
      </section>

      <section className="main_section_02">
        <div className="container">
          <Section2Div>
            <div>
              <p>인디프로 변리사비 지원 서비스</p>
              <h2>부담스러운 특허비용을 지원해드려요</h2>
            </div>
            <div>
              <img src={dummyImg} alt="이미지" style={{ maxWidth: "140px", margin: "32px", width: "100%" }} />
            </div>
            <div>
              <p>변리사비 지원도 신청하고</p>
              <button type="button">인디프로에서 특허 신청하기</button>
            </div>
          </Section2Div>
        </div>
      </section>

      <section style={{ background: "#f8f9fa" }}>
        <AttorneySlider />
      </section>
    </main>
  );
};

export default Contents;
