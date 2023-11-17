import React from "react";
import styled from "styled-components";
import BannerImg from "../../../assets/images/banner.webp";

const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

const BannerBox = styled(RowDiv)`
  display: none;
  width: calc(100% - 40px);
  margin: 0 auto;
  max-width: 1120px;
  justify-content: space-between;
  min-height: 340px;

  @media screen and (min-width: 960px) {
    width: 100%;
    display: flex;
  }
`;

const LeftBanner = styled(ColumnDiv)`
  flex: 3;
  justify-content: flex-start;
  min-width: unset;
  margin-right: 27px;
`;

const LBContent = styled.div`
  border-radius: 8px;
  background-color: #008f7f;
  border-width: 1px;
  padding-top: 21px;
  padding-bottom: 0;
  padding-left: 0;
  height: 220px;
  overflow: hidden;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.04);
  position: relative;

  @media screen and (min-width: 960px) {
    padding-top: 86px;
    padding-bottom: 107px;
    padding-left: 48px;
    height: 380px;
  }
`;

const LBContentBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: nowrap;

  @media screen and (min-width: 960px) {
    justify-content: space-between;
    flex-direction: row;
    height: 100%;
  }
`;

const LBTextBox = styled(ColumnDiv)`
  justify-content: flex-start;
  align-items: flex-start;
`;

const MatchingButton = styled.div`
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

  @media screen and (min-width: 960px) {
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 6px;
    padding-bottom: 6px;
    margin-bottom: 16px;
  }

  p {
    text-align: center;
    color: #005a54;
    white-space: nowrap;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    margin-bottom: 0;
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

  @media screen and (min-width: 960px) {
    font-size: 33px;
    line-height: 50px;
    text-align: initial;
    margin-bottom: 4px;
  }
`;

const LBSubTitle = styled.div`
  display: none;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;

  @media screen and (min-width: 960px) {
    display: flex;
    justify-content: center;
  }

  p {
    white-space: pre-line;
    word-break: keep-all;
    color: #ffffff;
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    opacity: 0.5;
  }
`;

const AttorneyBox = styled.div`
  display: none;
  flex-direction: row;
  align-items: center;
  width: 545px;
  height: 219px;
  position: absolute;
  right: -31px;
  z-index: 1;

  @media screen and (min-width: 960px) {
    display: flex;
    justify-content: center;
  }
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
    object-fit: contain;
    overflow: auto;
  }
`;

const RightBanner = styled.div`
  display: flex;
  min-width: 350px;
  width: 100%;
  height: 100%;
  flex: 0;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: flex-start;

  @media screen and (min-width: 960px) {
    flex: 1;
    height: 380px;
    width: auto;
    min-width: unset;
  }
`;

const RBContent = styled.div`
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

  @media screen and (min-width: 960px) {
    height: 380px;
    padding-left: 13px;
    padding-right: 13px;
    padding-bottom: 28px;
    padding-top: 48px;
  }
`;

const RBContentBox = styled(ColumnDiv)`
  align-items: center;
  width: 100%;
`;

const RBMatchingButton = styled.div`
  border-radius: 4px;
  background-color: transparent;
  border-width: 1px;
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 4px;
  padding-bottom: 4px;
  opacity: 0.5;
  background: var(--gray-gray-200, #e9ecef);
  margin-bottom: 12px;

  @media screen and (min-width: 960px) {
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 6px;
    padding-bottom: 6px;
  }

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

  @media screen and (min-width: 960px) {
    font-size: 22px;
    line-height: 32px;
    margin-bottom: 8px;
  }
`;

const RBSubTitle = styled.div`
  display: none;
  justify-content: center;
  flex-direction: row;
  align-items: center;

  @media screen and (min-width: 960px) {
    display: flex;
  }

  p {
    color: #32363a;
    white-space: pre-line;
    word-break: keep-all;
    font-weight: 400;
    font-size: 13px;
    line-height: 18px;
  }
`;

const MainBanner = () => {
  return (
    <BannerBox>
      <LeftBanner>
        <LBContent>
          <LBContentBox>
            <LBTextBox>
              <MatchingButton>
                <p>변리사 찾기</p>
              </MatchingButton>
              <LBTitle>
                여러 변리사 답변을 <br /> 5분 만에 확인해보세요
              </LBTitle>
              <LBSubTitle>
                <p>
                  앉은 자리에서 여러 변리사 답변을 확인하고 <br /> 내게 꼭 맞는 변리사를 찾아보세요
                </p>
              </LBSubTitle>
            </LBTextBox>
            <AttorneyBox>
              <AttorneyImgBox>
                <img src={BannerImg} alt="banner img" draggable="false" />
              </AttorneyImgBox>
            </AttorneyBox>
          </LBContentBox>
        </LBContent>
      </LeftBanner>
      <RightBanner>
        <RBContent>
          <RBContentBox>
            <RBMatchingButton>
              <p>변리사 찾기</p>
            </RBMatchingButton>
            <RBTitle>변리사 비용이 부담된다면 전액 지원받으세요</RBTitle>
            <RBSubTitle>
              <p>비용 부담 없이 특허 진행할 수 있어요</p>
            </RBSubTitle>
          </RBContentBox>
        </RBContent>
      </RightBanner>
    </BannerBox>
  );
};

export default MainBanner;
