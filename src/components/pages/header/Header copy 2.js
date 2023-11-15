import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import HeaderLogo from "../../../assets/images/header-logo.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";

const HeaderDiv = styled.div`
  position: relative;
  background-color: #fff;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 0 40px;
  height: 80px;
  background-color: transparent;
  transition: background-color 0.3s;
`;

const LeftMenuDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: nowrap;
  position: relative;
`;

const RightMenuDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  flex-wrap: nowrap;
  position: relative;
`;

const LogoImg = styled.img`
  width: 140px;
  margin-right: 50px;

  @media (max-width: 1200px) {
    margin-right: 20px;
  }
`;

const LeftMenuItemDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: nowrap;

  &:not(:last-child) {
    margin-right: 24px;

    @media (max-width: 1200px) {
      margin-right: 10px;
    }
  }

  @media (max-width: 960px) {
    display: none;
  }
`;

const MenuButton = styled.button`
  user-select: none;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 10px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: nowrap;
  }
`;

const RightMenuItemDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: nowrap;
  position: relative;
`;

const SearchInput = styled.input`
  font-size: 16px;
  color: #484f54;
  letter-spacing: 0;
  line-height: 24px;
  width: 376px;
  height: 40px;
  padding: 8px 48px;
  border-radius: 4px;
  border: 1px solid #ccd2d8;

  &:hover,
  &:focus {
    border: 1px solid #004744;
  }

  @media (max-width: 1200px) {
    width: 250px;
    padding-right: 10px;
  }

  @media (max-width: 760px) {
    display: none;
  }
`;

const SearchSVG = styled(SearchIcon)`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
`;

const MenuSVG = styled(MenuIcon)`
  cursor: pointer;
  margin-left: 12px;
  font-size: 30px;
`;

const Header = () => {
  useEffect(() => {
    const header = document.querySelector(".fixed_header");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);

  const onClickMenuBtn = () => {};

  return (
    <header className="fixed_header">
      <HeaderDiv>
        <LeftMenuDiv>
          <Link to="/">
            <LogoImg src={HeaderLogo} alt="Logo" />
          </Link>
          <LeftMenuItemDiv>
            <MenuButton type="button">
              <div>
                <p>변리사 상담받기</p>
                <KeyboardArrowDownIcon />
              </div>
            </MenuButton>
          </LeftMenuItemDiv>
          <LeftMenuItemDiv>
            <MenuButton type="button">
              <div>
                <p>법률문제인지 모르겠다면</p>
                <KeyboardArrowDownIcon />
              </div>
            </MenuButton>
          </LeftMenuItemDiv>
          <LeftMenuItemDiv>
            <MenuButton type="button">
              <div>
                <p>회사소개</p>
              </div>
            </MenuButton>
          </LeftMenuItemDiv>
        </LeftMenuDiv>

        <RightMenuDiv>
          <RightMenuItemDiv>
            <SearchInput type="text" autoComplete="off" placeholder="어떤 문제를 겪고 계시나요?" defaultValue={""} />
            <SearchSVG />
          </RightMenuItemDiv>
          <RightMenuItemDiv>
            <MenuSVG onClick={onClickMenuBtn} />
          </RightMenuItemDiv>
        </RightMenuDiv>
      </HeaderDiv>
    </header>
  );
};

export default Header;
