import React, { useState } from "react";
import { Collapse, CardBody, Card } from "./Collapse";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import "./style.css";

const menus = [
  {
    id: 1,
    title: "비용안내",
    link: "/home",
  },

  {
    id: 2,
    title: "회사소개",
    link: "/home",
  },

  {
    id: 3,
    title: "Q&A",
    link: "/home",
  },
  {
    id: 4,
    title: "로그인&가입",
    link: "/home",
    loginFlag: undefined,
  },
  {
    id: 5,
    title: "마이페이지",
    link: "/home",
    loginFlag: true,
  },
];

const MobileMenu = () => {
  const [isMenuShow, setIsMenuShow] = useState(false);
  const [isOpen, setIsOpen] = useState(0);
  const [isLogin, setIsLogin] = useState(false);

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
                    {item.id < 4 || item.loginFlag === isLogin ? (
                      <Link onClick={ClickHandler} to={item.link}>
                        {item.title}
                      </Link>
                    ) : (
                      ""
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