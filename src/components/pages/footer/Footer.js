import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import HeaderLogo from "../../../assets/images/header-logo.png";

const FooterDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  flex-wrap: nowrap;
  padding-top: 60px;
  padding-bottom: 70px;
`;

const MenuDiv = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  width: auto;

  @media (max-width: 960px) {
    align-items: center;
    width: 100%;
  }
`;

const MenuItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: nowrap;
  margin-right: 40px;

  &:last-child {
    margin-right: 0;
  }

  @media (max-width: 960px) {
    width: 50%;
    margin-right: 0;
    margin-bottom: 16px;
  }
`;

const MenuTitle = styled.span`
  color: #e9ecef;
  font-weight: 400;
  font-size: 16px;
  line-height: 28px;
  letter-spacing: -0.1px;
`;

const InfoDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100%;
  padding-top: 16px;
  padding-bottom: 16px;
`;

const InfoTitle = styled.p`
  color: #e9ecef;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.1px;
  margin-bottom: 8px;
`;

const InfoDetail = styled.p`
  color: #888e94;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.1px;
`;

const InfoLine = styled.div`
  flex: none;
  background-color: #888e94;
  width: 100%;
  height: 1px;
  margin-bottom: 16px;
`;

const SNSDiv = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  width: auto;
  margin-bottom: 8px;
`;

const SNSItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: nowrap;
  margin-right: 24px;

  &:last-child {
    margin-right: 0;
  }
`;

const SNSTitle = styled.span`
  color: #888e94;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.1px;
`;

const CorpDiv = styled(SNSDiv)``;
const CorpItem = styled(SNSItem)``;
const CorpTitle = styled(SNSTitle)``;
const CorpPrivacyTitle = styled.p`
  color: #e9ecef;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.1px;
`;

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <FooterDiv>
          <MenuDiv>
            <MenuItem>
              <Link to="/about">
                <MenuTitle>회사소개</MenuTitle>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/about">
                <MenuTitle>언론보도</MenuTitle>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/about">
                <MenuTitle>이용가이드</MenuTitle>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/about">
                <MenuTitle>이용후기</MenuTitle>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/about">
                <MenuTitle>공지사항</MenuTitle>
              </Link>
            </MenuItem>
          </MenuDiv>

          <InfoDiv>
            <InfoTitle>인디프 | 변리사 특허의뢰는, 인디프</InfoTitle>
            <InfoDetail>특허를 신청하고, 임시 출원을 하세요.</InfoDetail>
          </InfoDiv>

          <InfoDiv>
            <InfoTitle>(주) 인디프로</InfoTitle>
            <InfoDetail className="mb-16">
              사업자등록번호: 507-53-00884 | 대표이사: 손보남 | 주소: 서울 용산구 서빙고로 17 용산센트럴파크 공공시설동
              4층 청년창업지원센터 17실
            </InfoDetail>
            <InfoDetail>
              본 웹사이트는 일반적인 정보 제공의 목적으로 제작된 것으로 법률적 자문이나 해석을 위하여 제공되는 것이
              아닙니다. 본 웹사이트에서 취득한 정보로 인해 문제가 발생하여 직·간접적인 손해를 입었다 하더라도
              (주)인디프로는 어떠한 법적 책임을 지지 않습니다. 본 웹사이트에서 취득한 정보를 바탕으로 하여 어떠한 조치를
              취하시기에 앞서 반드시 법률전문가와 충분한 상담을 진행하시기 바랍니다.
              <br />
              (주)인디프로은 공정한 수임질서를 지키기 위해 노력하며 변리사법 및 기타 관련 규정을 준수하고 있습니다. 모든
              특허상담은 인디프로에 가입한 변리사 회원이 직접 진행합니다. 인디프로에 표시된 변리사 회원의 정보는 해당
              변리사 회원이 직접 제공한 것이며, 모든 변리사 회원은 독립적으로 업무를 수행합니다.
            </InfoDetail>
          </InfoDiv>

          <InfoLine />

          <SNSDiv>
            <SNSItem>
              <Link to="/home">
                <SNSTitle>네이버 블로그</SNSTitle>
              </Link>
            </SNSItem>
            <SNSItem>
              <Link to="/home">
                <SNSTitle>인스타그램</SNSTitle>
              </Link>
            </SNSItem>
            <SNSItem>
              <Link to="/home">
                <SNSTitle>링크드인</SNSTitle>
              </Link>
            </SNSItem>
            <SNSItem>
              <Link to="/home">
                <SNSTitle>카카오톡 채널</SNSTitle>
              </Link>
            </SNSItem>
          </SNSDiv>

          <CorpDiv>
            <CorpItem>
              <CorpTitle>© 2023 Indieip</CorpTitle>
            </CorpItem>
            <CorpItem>
              <Link to="/about">
                <CorpPrivacyTitle>개인정보처리방침</CorpPrivacyTitle>
              </Link>
            </CorpItem>
            <CorpItem>
              <Link to="/about">
                <CorpPrivacyTitle>이용약관</CorpPrivacyTitle>
              </Link>
            </CorpItem>
            <CorpItem>
              <CorpTitle>문의 메일 : indieip@indieip.co.kr</CorpTitle>
            </CorpItem>
            <CorpItem>
              <CorpTitle>문의 전화 : +0507-1304-6037</CorpTitle>
            </CorpItem>
          </CorpDiv>
        </FooterDiv>
      </div>
    </footer>
  );
};

export default Footer;
