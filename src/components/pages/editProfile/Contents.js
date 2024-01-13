import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../../../store";
import { Storage } from "../../../modules/Storage";
import { setAlertModal } from "../../../store/slice/modal";
import { useGetAccountInfoQuery, useUpdateInfoMutation, useUpdatePasswordMutation } from "../../../api/account";
import { useForm } from "react-hook-form";
const Contents = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [accountKey] = useState(Storage.get("accountKey"));
  const [accountId] = useState(Storage.get("accountId"));
  const [isLogin] = useState(accountKey ? true : false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { data: accountInfo, isLoading, refetch } = useGetAccountInfoQuery(accountId);
  const [updateInfoAPI] = useUpdateInfoMutation();
  const [updatePasswordAPI] = useUpdatePasswordMutation();


  const { register, handleSubmit, getValues, setError, formState: { errors } } = useForm();

  useEffect(() => {
    if (!isLogin) {
      dispatch(
        setAlertModal({
          modalState: true,
          modalData: { title: "로그인이 필요합니다.", message: "로그인 페이지로 이동합니다." },
          callback: () => {
            navigate("/login");
          }
        })
      );
    } else {
      //setUsername(Storage.get("humanName"));
      //setEmail(Storage.get("accountKey"));
      // if(accountInfo) console.log(accountInfo.data);
      if(accountInfo?.data?.humanName)  setUsername(accountInfo.data.humanName);
      if(accountInfo?.data?.accountKey) setEmail(accountInfo.data.accountKey);
      if(accountInfo?.data?.phone)      setPhone(accountInfo.data.phone);

    }
  }, [accountInfo]);

  const onSubmit = (data) => {
    // console.log("submit data : ", data);
    updateInfo(data);
  };

  const updateInfo = (accountInfo) => {
    updateInfoAPI({ accountId: accountId, accountKey: accountInfo.accountKey, phone: accountInfo.phone})
      .unwrap()
      .then(({ status, data }) => {
        if (status === "success") {
          dispatch(
            setAlertModal({
              modalState: true,
              modalData: { title: "회원정보 수정", message: "회원정보 수정에 성공하였습니다." },
              callback: () => {
                window.location.href = "/mypage";
              },
            })
          );
        } else {
          dispatch(
            setAlertModal({
              modalState: true,
              modalData: { title: "회원정보 수정", message: "회원정보 수정에 실패하였습니다." },
            })
          );
        }
      })
      .then((err) => {
        if (err) console.log(`error:${err}`);
      });
  };


  const onPasswordSubmit = (data) => {
    // console.log("password submit data : ", data);
    updatePassword(data);
  };

  const updatePassword = (passwordInfo) => {
    // console.log("passwordInfo : accountId : ", accountId);
    // console.log("passwordInfo currentpassword : ", passwordInfo.password);
    // console.log("passwordInfo newpassword : ", passwordInfo.newPassword);
    if(!passwordInfo.password) {
      setError(
        "password",
        {
          message: "현재 비밀번호를 입력하세요.",
        },
        { shouldFocus: true }
      );
      return;
    }
    if(!passwordInfo.newPassword) {
      setError(
        "newPassword",
        {
          message: "새 비밀번호를 입력하세요.",
        },
        { shouldFocus: true }
      );
      return;
    }
    if(passwordInfo.password === passwordInfo.newPassword) {
      setError(
        "passwordConfirm",
        {
          message: "현재 비밀번호와 새 비밀번호가 동일합니다.",
        },
        { shouldFocus: true }
      );
      return;
    }
    if(getValues("newPassword") !== getValues("passwordConfirm")) {
      setError(
        "passwordConfirm",
        {
          message: "비밀번호가 일치하지 않습니다.",
        },
        { shouldFocus: true }
      );
      return;
    }
    updatePasswordAPI({ accountKey: passwordInfo.accountKey, password: passwordInfo.password, newPassword: passwordInfo.newPassword})
      .unwrap()
      .then(({ status, data }) => {
        if (status === "success") {
          dispatch(
            setAlertModal({
              modalState: true,
              modalData: { title: "비밀번호 수정", message: "비밀번호 수정에 성공하였습니다." },
              callback: () => {
                window.location.href = "/mypage";
              },
            })
          );
        } else {
          dispatch(
            setAlertModal({
              modalState: true,
              modalData: { title: "비밀번호 수정", message: "비밀번호 수정에 실패하였습니다." },
            })
          );
        }
      })
  };

  return (
    <main style={{ minHeight: "800px", background: "#e5ecef" }}>
      <section>
        <Container className="container">
          <div className="row">
            {/* left navigator START */}
            <div className="col-lg-3 col-12">
              <UserInfo className="d-none d-lg-block">
                <p className="user_name">{username}</p>
                <p className="user_email">{email}</p>
              </UserInfo>

              <MyPageMenu className="d-none d-lg-block">
                <p className="title">회원정보 수정</p>
                <ul>
                  <li>
                    <Link to={"/mypage"}>
                      매칭 정보
                    </Link>
                  </li>
                  <li>
                    <Link to={"/mypage/modify"} className="active">회원정보 수정</Link>
                  </li>
                  <li onClick={() => Storage.logout()}>
                    <Link>로그아웃</Link>
                  </li>
                </ul>
              </MyPageMenu>
            </div>
            {/* left navigator END */}

            {/* right contents START */}
            <div className="col-lg-9 col-12">
              <div className="row">
                <div className="col-12">
                  <h2>회원정보 수정</h2>
                  <hr />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="col-lg-6 col-12">
                        <div className="mb-3">
                          <label htmlFor="username" className="form-label">이름</label>
                          <input type="text" className="form-control" id="username" placeholder="이름을 입력하세요." defaultValue={username} disabled={true}
                          />
                          {errors?.humanName && <WarningMessage>{errors.humanName.message}</WarningMessage>}
                        </div>
                      </div>
                      <div className="col-lg-6 col-12" />
                      <div className="col-lg-6 col-12">
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">이메일</label>
                          <input type="email" className="form-control" id="email" placeholder="이메일을 입력하세요." defaultValue={accountKey}
                          {
                            ...register(
                              "accountKey", {
                                required: "이메일을 입력해주세요.",
                                pattern: {
                                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                  message: "유효한 이메일 주소를 입력하세요.",
                                },
                              }
                            )
                          }
                          />
                          {errors?.accountKey && <WarningMessage>{errors.accountKey.message}</WarningMessage>}
                        </div>
                      </div>
                      <div className="col-lg-6 col-12" />
                      <div className="col-lg-6 col-12">
                        <div className="mb-3">
                          <label htmlFor="phone" className="form-label">휴대폰 번호</label>
                          <input type="tel" className="form-control" id="phone" placeholder="휴대폰 번호를 입력하세요." defaultValue={phone}
                          {
                            ...register(
                              "phone", {
                                required: "휴대폰 번호를 입력해주세요.",
                                pattern: {
                                  value: /^\d{10,11}$/,
                                  message: "유효한 휴대폰 번호를 입력하세요.",
                                },
                              }
                            )
                          }
                          />
                          {errors?.phone && <WarningMessage>{errors.phone.message}</WarningMessage>}
                        </div>
                      </div>
                      <div className="col-lg-6 col-12" />
                      <div className="col-lg-6 col-12">
                        <div className="mb-3">
                          <button type="submit" className="btn btn-primary">회원정보 수정</button>
                        </div>
                      </div>
                      <div className="col-lg-6 col-12" />
                    </div>
                  </form>
                  <form onSubmit={handleSubmit(onPasswordSubmit)}>
                    <div className="row">
                      <div className="col-lg-6 col-12">
                        <div className="mb-3">
                          <label htmlFor="password" className="form-label">현재 비밀번호</label>
                          <input type="password" className="form-control" id="password" placeholder="비밀번호를 입력하세요."
                          {
                            ...register("password", {
                              pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&+-^])[A-Za-z\d@$!%*#?&+-^]{8,}$/,
                                message: "영문, 숫자, 특수문자 조합 및 최소 8자 이상이어야 합니다.",
                              },
                            })
                          }
                          />
                          {errors?.password && <WarningMessage>{errors.password.message}</WarningMessage>}
                        </div>
                      </div>
                      <div className="col-lg-6 col-12" />
                      <div className="col-lg-6 col-12">
                        <div className="mb-3">
                          <label htmlFor="newPassword" className="form-label">비밀번호</label>
                          <input type="password" className="form-control" id="newPassword" placeholder="새 비밀번호를 입력하세요."
                          {
                            ...register("newPassword", {
                              pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&+-^])[A-Za-z\d@$!%*#?&+-^]{8,}$/,
                                message: "영문, 숫자, 특수문자 조합 및 최소 8자 이상이어야 합니다.",
                              },
                            })
                          }
                          />
                          {errors?.newPassword && <WarningMessage>{errors.newPassword.message}</WarningMessage>}
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="mb-3">
                          <label htmlFor="passwordConfirm" className="form-label">비밀번호 확인</label>
                          <input type="password" className="form-control" id="passwordConfirm" placeholder="새 비밀번호를 다시 입력하세요."
                          {
                            ...register("passwordConfirm")
                          }
                          />
                          {errors?.passwordConfirm && <WarningMessage>{errors.passwordConfirm.message}</WarningMessage>}
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="mb-3">
                          <button type="submit" className="btn btn-danger">비밀번호 수정</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* right contents END */}
        </Container>
      </section>
    </main>
  );
}

const Container = styled.div`
  padding: 120px 0;

  @media (max-width: 991px) {
    padding: 40px 0;
  }
`;

const UserInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fafbfe;
  padding: 20px;

  p.user_name {
    color: #070143;
    font-size: 25px;
    font-weight: 700;
    line-height: 1.2;
    padding: 3.4px 10px;
  }
  p.user_email {
    color: #687693;
    font-size: 15px;
    padding: 10px;
  }
`;

const MyPageMenu = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: transparent;
  margin-top: 65px;

  p.title {
    color: #070143;
    font-size: 23px;
    padding-bottom: 10px;
    position: relative;
    margin-bottom: 30px;
    width: 100%;

    &::before {
      position: absolute;
      width: 55px;
      height: 4px;
      left: 0;
      bottom: 0;
      background-color: #202d90;
      border-radius: 10px;
      content: "";
    }

    &::after {
      position: absolute;
      width: calc(80% - calc(var(--bs-gutter-x) * 0.5));
      height: 4px;
      left: 65px;
      bottom: 0;
      background-color: #f2f2f2;
      border-radius: 10px;
      content: "";
    }
  }

  ul {
    li {
      font-size: 19px;
      position: relative;

      & + li {
        margin-top: 12px;
      }

      a {
        color: #687693;
        display: block;
        width: 100%;
        transition: color 0.3s ease-in-out;

        &:hover {
          color: #1b267b;
        }

        &.active {
          color: #1b267b;
        }
      }
    }
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

export default Contents;