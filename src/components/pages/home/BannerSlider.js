import React from "react";
import Slider from "react-slick";
import "../../../assets/scss/slick.scss";
import "../../../assets/scss/slick-theme.scss";
import styled from "styled-components";
import BannerImg from "../../../assets/images/banner_slider.webp";
import { Link } from "react-router-dom";

const SliderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: nowrap;

  @media screen and (min-width: 960px) {
    display: none;
  }
`;

const SliderDiv = styled.div`
  background-color: transparent;
  border-width: 1px;
  overflow: hidden;
  width: 350px;
  position: relative;
`;

const SliderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: nowrap;

  div.slick-slider {
    width: 100%;
    height: 100%;
  }

  div.slick-slide {
    margin-right: 0;
  }
`;

const SliderItemBox = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 0;
  min-width: 350px;
  flex-direction: column;
`;

const SliderItem1 = styled.div`
  border-radius: 8px;
  background-color: #202d90;
  border-width: 1px;
  padding-top: 21px;
  padding-bottom: 0;
  padding-left: 0;
  height: 220px;
  overflow: hidden;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.04);
  position: relative;
`;

const SliderItem1Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: unset;
  align-items: center;
  width: 100%;
  height: auto;
`;

const LBTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const LBMatchingButton = styled.div`
  border-radius: 4px;
  background-color: transparent;
  border-width: 1px;
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 4px;
  padding-bottom: 4px;
  opacity: 0.5;
  background: var(--gray-gray-200, #e9ecef);
  box-shadow: 0px 0px 4px 0px rgba(0, 108, 99, 0.25);
  margin-bottom: 8px;

  p {
    text-align: center;
    color: #005a54;
    white-space: nowrap;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const LBTitle = styled.p`
  color: #ffffff;
  word-break: keep-all;
  white-space: pre-line;
  text-align: center;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const AttorneyBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 377px;
  height: 175.5px;
  position: relative;
  bottom: 52px;
  z-index: 1;
`;

const AttorneyImgBox = styled.span`
  box-sizing: border-box;
  display: inline-block;
  overflow: hidden;
  width: initial;
  height: initial;
  background: none;
  opacity: 1;
  border: 0;
  margin: 0;
  padding: 0;
  position: relative;
  max-width: 100%;

  img {
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    box-sizing: border-box;
    padding: 0;
    border: none;
    margin: auto;
    display: block;
    width: 100%;
    height: auto;
    min-width: 100%;
    min-height: 100%;
    object-fit: cover;
    overflow: auto;
  }
`;

const SliderItem2 = styled.div`
  border-radius: 8px;
  background-color: #ebfaf8;
  border-width: 1px;
  height: 220px;
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 0;
  padding-top: 16px;
  overflow: hidden;
  position: relative;
`;

const SliderItem2Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const RBMatchingButton = styled.div`
  border-radius: 4px;
  border-width: 1px;
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 4px;
  padding-bottom: 4px;
  opacity: 0.5;
  background: var(--gray-gray-200, #e9ecef);
  margin-bottom: 12px;

  p {
    text-align: center;
    color: #3a3e43;
    white-space: nowrap;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const RBTitle = styled.p`
  color: #26282b;
  white-space: pre-line;
  word-break: keep-all;
  text-align: center;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const BannerSlider = () => {
  const settings = {
    customPaging: function (i) {
      return <p>{i + 1} / 2</p>;
    },
    dots: true,
    dotsClass: "slick-pagination",
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    draggable: true,
  };

  return (
    <SliderBox>
      <SliderDiv>
        <SliderContent>
          <Slider {...settings}>
            <SliderItemBox>
              <SliderItem1>
                <SliderItem1Content>
                  <LBTextBox>
                    <LBMatchingButton>
                      <Link to="/preMatching">
                        <p>변리사 상담받기</p>
                      </Link>
                    </LBMatchingButton>
                    <LBTitle>
                      여러 변리사 답변을 <br /> 5분만에 확인해보세요
                    </LBTitle>
                  </LBTextBox>
                  <AttorneyBox>
                    <AttorneyImgBox>
                      <img src={BannerImg} alt="banner img" draggable="false" />
                    </AttorneyImgBox>
                  </AttorneyBox>
                </SliderItem1Content>
              </SliderItem1>
            </SliderItemBox>

            <SliderItemBox>
              <SliderItem2>
                <SliderItem2Content>
                  <RBMatchingButton>
                    <p>변리사 지원 신청하기</p>
                  </RBMatchingButton>
                  <RBTitle>
                    변리사 비용이 부담된다면 <br /> 전액 지원받으세요
                  </RBTitle>
                </SliderItem2Content>
              </SliderItem2>
            </SliderItemBox>
          </Slider>
        </SliderContent>
      </SliderDiv>
    </SliderBox>
  );
};

export default BannerSlider;
