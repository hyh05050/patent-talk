import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Storage } from "../../../modules/Storage";
import HeaderLogo from "../../../assets/images/header-logo.png";
import MobileMenu from "./mobile";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(Storage.get("accountKey") ? true : false);
    const header = document.querySelector(".fixed-navbar");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      if (window.pageYOffset > sticky) {
        header.classList.add("animated");
        header.classList.add("fadeInDown");
        header.classList.add("active");
      } else {
        header.classList.remove("animated");
        header.classList.remove("fadeInDown");
        header.classList.remove("active");
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);

  const onClickMenuBtn = () => {};

  return (
    <div className="fixed-navbar">
      <header id="header" className="fixed_header">
        <div className={`wpo-site-header`}>
          <nav className="navigation navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-lg-3 col-md-3 col-3 d-lg-none dl-block">
                  <div className="mobail-menu">
                    <MobileMenu />
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-6">
                  <div className="navbar-header">
                    <Link className="navbar-brand" to="/home">
                      <img src={HeaderLogo} alt="" />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-6 col-md-1 col-1">
                  <div id="navbar" className="collapse navbar-collapse navigation-holder">
                    <button className="menu-close">
                      <i className="ti-close"></i>
                    </button>
                    <ul className="nav navbar-nav mb-2 mb-lg-0">
                      <li>
                        <Link to="/home">HOME</Link>
                      </li>

                      {isLogin ? (
                        <>
                          <li>
                            <Link to="/home">마이페이지</Link>
                          </li>
                        </>
                      ) : (
                        <li>
                          <Link to="/login">로그인&가입</Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-2 col-2 header-right-btn">
                  <div className="header-right">
                    <div className="close-form">
                      <Link className="theme-btn" to="/attorney">
                        변리사 찾기
                      </Link>
                      <Link className="theme-btn mobile" to="/attorney">
                        신청
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
