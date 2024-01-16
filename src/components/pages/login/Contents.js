import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLoginMutation } from "../../../api/account";
import { Storage } from "../../../modules/Storage";
import { useAppDispatch } from "../../../store";
import { setAlertModal } from "../../../store/slice/modal";

const LoginPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 auto;

  width: 100%;
  min-height: calc(100vh - 84px);
  background-color: #f6f6f6;

  @media screen and (min-width: 1500px) {
    min-height: calc(100vh - 94px);
  }
`;

const LoginPageDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
    width: 440px;
    background-color: #fff;
    margin-top: 48px;

    padding: 40px 20px;
    margin: 40px 0 24px;

    @media screen and (max-width: 440px) {
      width: 100%;
    }
  }

  .lawyer-login {
    font-size: 16px;
    font-weight: 400;
    color: #242526;
    letter-spacing: 0px;
    line-height: 24px;
    text-align: center;

    span {
      margin-right: 8px;
    }
  }
`;

const LoginTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #242526;
  letter-spacing: 0px;
  line-height: 34px;
  white-space: pre-line;
  text-align: center;
  margin-bottom: 32px;
`;

const LoginInputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 16px;

  label {
    font-size: 14px;
    font-weight: 500;
    color: #28282d;
    letter-spacing: 0px;
    line-height: 20px;
    display: block;
    margin-bottom: 8px;
  }

  input {
    font-size: 16px;
    font-weight: 400;
    color: #3b3b42;
    letter-spacing: 0px;
    line-height: 20px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 46px;
    border: 1px solid #a2b4ad;
    padding: 0 18px;
  }
`;

const WarningMessage = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #ff0000;
  letter-spacing: 0px;
  line-height: 20px;
  display: block;
  margin-top: 7px;
`;

// const LoginCheckBox = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: flex-start;
//   flex-direction: row;
//   flex-wrap: wrap;
//   width: 100%;
//   padding-left: 8px;
//   margin-bottom: 48px;

//   input[type="checkbox"] {
//     width: 16px;
//     height: 16px;
//   }

//   label {
//     font-size: 14px;
//     font-weight: 700;
//     color: #89898e;
//     letter-spacing: 0px;
//     line-height: 18px;
//     margin-left: 8px;
//   }
// `;

const LoginButton = styled.button`
  font-size: 16px;
  font-weight: 700;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  letter-spacing: 0px;
  line-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 52px;
  background-color: #202d90;
  margin-bottom: 12px;
`;

const GoogleLoginBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 12px;
`;

const LoginLinkBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;

  a {
    font-size: 16px;
    font-weight: 700;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #89898e;
    letter-spacing: 0px;
    line-height: 24px;
    margin-right: 16px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const Contents = () => {
  const [loginAPI] = useLoginMutation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = (accountInfo) => {
    dispatch(
      setLoadingModal({
        modalState: true,
      })
    );
    loginAPI(accountInfo)
      .unwrap()
      .then(({ status, data: account, refreshToken, authToken }) => {
        if (status === "success") {
          Storage.login(account, refreshToken, authToken);

          dispatch(
            setAlertModal({
              modalState: true,
              modalData: { title: "로그인", message: "로그인에 성공하였습니다." },
              callback: () => {
                window.location.href = "/";
              },
            })
          );
        } else {
          dispatch(
            setAlertModal({
              modalState: true,
              modalData: { title: "로그인", message: "로그인에 실패하였습니다." },
            })
          );
        }
      })
      .then((err) => {
        if (err) console.log(`error:${err}`);
      }).finally(()=>{
        dispatch(
          setLoadingModal({
            modalState: false,
          })
        );
      });
  };

  const onGoogleLoginSuccess = (res) => {
    const userData = jwtDecode(res.credential);
    login({
      accountKey: userData.email,
      email: userData.email,
      password: userData.sub,
      humanName: userData.name,
      joinType: "google",
    });
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (res) => onGoogleLoginSuccess(res),
    onFailure: (error) => console.log(error),
  });

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <main>
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LoginPage>
            <LoginPageDiv>
              <div className="container">
                <LoginTitle>이메일 로그인</LoginTitle>
                <LoginInputBox>
                  <label htmlFor="email">이메일</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="이메일 아이디"
                    {...register("accountKey", {
                      required: "이메일을 입력해주세요.",
                      pattern: {
                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "유효한 이메일 주소를 입력하세요.",
                      },
                    })}
                    autoComplete="on"
                  />
                  {errors?.accountKey && <WarningMessage>{errors.accountKey.message}</WarningMessage>}
                </LoginInputBox>
                <LoginInputBox>
                  <label htmlFor="password">비밀번호</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="비밀번호"
                    {...register("password", {
                      required: "비밀번호를 입력해주세요.",
                      pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&+-^])[A-Za-z\d@$!%*#?&+-^]{8,}$/,
                        message: "영문, 숫자, 특수문자 조합 및 최소 8자 이상이어야 합니다.",
                      },
                    })}
                    autoComplete="off"
                  />
                  {errors?.password && <WarningMessage>{errors.password.message}</WarningMessage>}
                </LoginInputBox>
                {/* <LoginCheckBox>
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">로그인 상태 유지</label>
                </LoginCheckBox> */}
                <LoginButton type="submit">로그인</LoginButton>
                <GoogleLoginBox>
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      onGoogleLoginSuccess(credentialResponse);
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                    width={100}
                  />
                </GoogleLoginBox>
                <LoginLinkBox>
                  <Link to={"/join"}>회원가입</Link>
                  {/* <Link to={"#"}>아이디 찾기</Link> */}
                  {/* <Link to={"#"}>비밀번호 찾기</Link> */}
                </LoginLinkBox>
                <LoginLinkBox>
                  <Link to={"/joinAttorney"}>변리사 회원가입</Link>
                  {/* <Link to={"#"}>아이디 찾기</Link> */}
                  {/* <Link to={"#"}>비밀번호 찾기</Link> */}
                </LoginLinkBox>
                <LoginLinkBox>
                  <Link to={"/findPassword"}>비밀번호를 잊으셨나요?</Link>
                  {/* <Link to={"#"}>아이디 찾기</Link> */}
                  {/* <Link to={"#"}>비밀번호 찾기</Link> */}
                  </LoginLinkBox>
              </div>
              {/* <div className="lawyer-login">
                <span>혹시 변리사님이신가요?</span>
                <Link to={"#"}>변리사 로그인</Link>
              </div> */}
            </LoginPageDiv>
          </LoginPage>
        </form>
      </section>
    </main>
  );
};

export default Contents;
