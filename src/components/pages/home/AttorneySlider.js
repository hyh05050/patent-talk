import React from "react";
import Slider from "react-slick";
import "../../../assets/scss/slick.scss";
import "../../../assets/scss/slick-theme.scss";
import styled from "styled-components";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import attorney from "../../../assets/images/user.png";
import { dummyAttorney } from "./DummyAttorney";

const SliderDiv = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 40px 0;
`;

const SliderItem = styled.div`
  width: 436px;
  padding: 40px 28px 40px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
  background-color: #ffffff;
  border-width: 1px;

  @media (max-width: 960px) {
    width: 318px;
    padding: 36px 24px 36px;
  }
`;

const AttorneyInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  margin-bottom: 44px;
`;

const AttorneyTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const AttorneyImgBox = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 14px;

  img {
    width: 100%;
  }
`;

const AttorneyNameBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  p {
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;

    @media (max-width: 960px) {
      color: #17181a;
      font-weight: 600;
      font-size: 13px;
      line-height: 18px;
    }
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 20px;
      height: 20px;
      margin-right: 4px;
    }
  }
`;

const AttorneyMark = styled.div`
  border-radius: 2px;
  border: 1px solid #e9ecef;
  padding: 4px;
  height: fit-content;

  p {
    color: #888e94;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
  }
`;

const PriceBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 36px;
`;

const PriceTitle = styled.div`
  p {
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 6px;

    &:nth-child(1) {
      margin-right: 32px;
    }

    @media (max-width: 960px) {
      color: #1f2022;
      font-weight: 700;
      font-size: 10px;
      line-height: 16px;
    }
  }
`;

const Hr = styled.hr`
  width: 100%;
  margin-bottom: 14px;

  @media (max-width: 960px) {
    margin-bottom: 10px;
  }
`;

const PriceItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

const SolutionBox = styled(PriceBox)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 36px;
`;

const SolutionTitle = styled(PriceTitle)`
  p {
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 6px;

    &:nth-child(1) {
      margin-right: 32px;
    }

    @media (max-width: 960px) {
      color: #1f2022;
      font-weight: 700;
      font-size: 10px;
      line-height: 16px;
    }
  }
`;

const SolutionItem = styled(PriceItem)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 6px;
`;

const SolutionItemTitle = styled.div`
  margin-right: 32px;
  white-space: nowrap;

  p {
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;

    @media (max-width: 960px) {
      color: #1f2022;
      font-weight: 700;
      font-size: 10px;
      line-height: 16px;
    }
  }
`;

const SolutionItemContent = styled.div`
  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.1px;

    @media (max-width: 960px) {
      color: #484f54;
      font-weight: 400;
      font-size: 10px;
      line-height: 17px;
      letter-spacing: -0.1px;
    }
  }
`;

const AttorneySlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 8000,
    autoplaySpeed: 0,
    cssEase: "linear",
    rows: 1,
    draggable: false,
  };

  return (
    <SliderDiv>
      <Slider {...settings}>
        {dummyAttorney.map((item, index) => (
          <SliderItem key={`slide-${index}`}>
            <AttorneyInfo>
              <AttorneyTitle>
                <AttorneyImgBox>
                  <img src={attorney} alt="attorney1" />
                </AttorneyImgBox>
                <AttorneyNameBox>
                  <p>
                    <b>{item.attorneyName} 변리사 </b>
                    님의 제안서
                  </p>
                  <div>
                    <LocationOnIcon />
                    <span>{item.attorneyLocation}</span>
                  </div>
                </AttorneyNameBox>
              </AttorneyTitle>
              <AttorneyMark>
                <p>샘플</p>
              </AttorneyMark>
            </AttorneyInfo>

            <PriceBox>
              <PriceTitle>
                <p>가격 제안</p>
              </PriceTitle>
              <Hr />
              {item.priceContent.map((priceItem, index) => (
                <PriceItem key={`price-${index}`}>
                  <div>
                    <p>{priceItem.title}</p>
                  </div>
                  <div>
                    <p>{priceItem.price}</p>
                  </div>
                </PriceItem>
              ))}
            </PriceBox>

            <SolutionBox>
              <SolutionTitle>
                <p>해결책</p>
              </SolutionTitle>
              <Hr />
              {item.solutionContent.map((solutionItem, index) => (
                <SolutionItem key={`solution-${index}`}>
                  <SolutionItemTitle>
                    <p>{solutionItem.title}</p>
                  </SolutionItemTitle>
                  <SolutionItemContent>
                    <p>{solutionItem.content}</p>
                  </SolutionItemContent>
                </SolutionItem>
              ))}
            </SolutionBox>
          </SliderItem>
        ))}
      </Slider>
    </SliderDiv>
  );
};

export default AttorneySlider;
