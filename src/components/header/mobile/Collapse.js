import styled, { keyframes } from "styled-components";

export const Card = styled.div`
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  background-color: #fff;
  width: 100%;
`;

// Styled CardBody 컴포넌트
export const CardBody = styled.div`
  padding: 1.25rem; /* Bootstrap 기본 값 참고 */
`;

// Collapse 애니메이션 효과 정의
const collapseAnimation = keyframes`
  from {
    height: auto;
    opacity: 1;
  }

  to {
    height: 0;
    opacity: 0;
  }
`;

// Styled Collapse 컴포넌트 정의
const StyledCollapse = styled.div`
  overflow: hidden;
  height: ${({ isOpen }) => (isOpen ? "auto" : "0")};
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  transition: height 0.3s ease, opacity 0.3s ease;

  /* 추가적인 스타일을 필요에 따라 여기에 추가할 수 있습니다. */
`;

// Collapse 컴포넌트 내용을 감싸는 Wrapper
const CollapseWrapper = styled.div`
  animation: ${({ isOpen }) => (isOpen ? collapseAnimation : "none")};
  animation-duration: 0.3s;
  animation-timing-function: ease;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

// Collapse 컴포넌트
export const Collapse = ({ isOpen, children }) => {
  return (
    <CollapseWrapper isOpen={isOpen}>
      <StyledCollapse isOpen={isOpen}>{children}</StyledCollapse>
    </CollapseWrapper>
  );
};
