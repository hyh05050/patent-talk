import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Storage } from "../../../modules/Storage";
import { Card, CardBody, Collapse } from "./Collapse";
import "./style.css";

const menus = [
  {
    id: 1,
    title: "HOME",
    link: "/home",
    loginFlag: Storage.get("accountKey") ? true : false,
  },
  {
    id: 2,
    title: "로그인&가입",
    link: "/login",
    loginFlag: false,
  },
  {
    id: 3,
    title: "마이페이지",
    link: "/mypage",
    loginFlag: true,
  },
  {
    id: 4,
    title: "회원정보 수정",
    link: "/mypage/modify",
    loginFlag: true,
  },
];

const MobileMenu = () => {
  const [isMenuShow, setIsMenuShow] = useState(false);
  const [isOpen, setIsOpen] = useState(0);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(Storage.get("accountKey") ? true : false);
  }, []);

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  return (
    <div>
      <div className={`mobileMenu ${isMenuShow ? "show" : ""}`}>
        <div className="menu-close">
          <div className="clox" onClick={() => setIsMenuShow(!isMenuShow)}>
            <CloseIcon />
          </div>
        </div>

        <ul className="responsivemenu">
          {menus.map((item) => {
            return (
              <li key={item.id}>
                {item.submenu ? (
                  <p onClick={() => setIsOpen(item.id)}>
                    {item.title}
                    {item.submenu ? <i className="fa fa-angle-right" aria-hidden="true"></i> : ""}
                  </p>
                ) : (
                  <>
                    {item.loginFlag === isLogin && (
                      <Link onClick={ClickHandler} to={item.link}>
                        {item.title}
                      </Link>
                    )}
                  </>
                )}

                {item.submenu ? (
                  <Collapse isOpen={item.id === isOpen}>
                    <Card>
                      <CardBody>
                        <ul>
                          {item.submenu.map((submenu) => (
                            <li key={submenu.id}>
                              <Link onClick={ClickHandler} className="active" to={submenu.link}>
                                {submenu.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </CardBody>
                    </Card>
                  </Collapse>
                ) : (
                  ""
                )}
              </li>
            );
          })}
          {isLogin && (
            <li>
              <Link onClick={() => Storage.logout()}>로그아웃</Link>
            </li>
          )}
        </ul>
      </div>

      <div className="showmenu" onClick={() => setIsMenuShow(!isMenuShow)}>
        <button type="button" className="navbar-toggler open-btn">
          <span className="icon-bar first-angle"></span>
          <span className="icon-bar middle-angle"></span>
          <span className="icon-bar last-angle"></span>
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
