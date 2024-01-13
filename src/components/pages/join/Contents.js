import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useJoinMutation } from "../../../api/account";
import { requestVerifyCode, verifyCode } from "../../../api/axiosApi";
import { useAppDispatch } from "../../../store";
import { setAlertModal } from "../../../store/slice/modal";

const JoinPage = styled.div`
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

const JoinPageDiv = styled.div`
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

    padding: 30px 20px;
    margin: 20px 0 0;

    @media screen and (max-width: 440px) {
      width: 100%;
    }
  }

  .lawyer-Join {
    font-size: 16px;
    font-weight: 400;
    color: #242526;
    letter-spacing: 0px;
    line-height: 24px;
    text-align: center;
  }
`;

const JoinTitle = styled.h2`
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

const JoinInputBox = styled.div`
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

const JoinPolicyBox = styled.div`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #f1f3f5;
  background-color: #f8f9fa;
  margin-top: 28px;
`;

const PolicyAllCheckBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    margin: 4px;
    margin-right: 8px;
  }

  label {
    font-size: 14px;
    font-weight: 700;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #212529;
    letter-spacing: 0px;
    line-height: 20px;
  }
`;

const PolicyCheckBox = styled.ul`
  list-style: none;
  li {
    display: flex;
    align-items: center;
    padding-left: 20px;
    margin-bottom: 6px;
    user-select: none;

    input[type="checkbox"] {
      width: 16px;
      height: 16px;
      margin: 4px;
      margin-right: 8px;
    }

    label {
      font-size: 14px;
      font-weight: 400;
      color: #212529;
      letter-spacing: 0px;
      line-height: 20px;
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

const JoinLinkBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 12px;

  a {
    font-weight: 700;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #89898e;
    letter-spacing: 0px;
    line-height: 24px;
    margin-right: 0;
    font-size: 15px;
    text-decoration: underline;
  }
`;

const JoinButton = styled.button`
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
  margin-top: 12px;

  &.disabled {
    background-color: #adb5bd;
  }
`;

const CheckInformationBtn = styled.button`
  font-size: 14px;
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
  height: 40px;
  background-color: #202d90;
  margin-top: 12px;
  margin-bottom: 0px;

  &.disabled {
    background-color: #adb5bd;
  }

`;

const Contents = () => {
  const navigate = useNavigate();
  const [joinAPI] = useJoinMutation();
  const requiredPolicy = ["policy1", "policy2", "policy3"];
  const policyList = requiredPolicy.concat(["policy4"]);
  const [isChecked, setChecked] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isEmailVerify, setIsEmailVerify] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const join = (accountInfo) => {
    joinAPI({
      ...accountInfo,
      roles: "client",
    })
      .unwrap()
      .then(({ status }) => {
        if (status === "success") {
          dispatch(
            setAlertModal({
              modalState: true,
              modalData: { title: "회원가입", message: "회원가입에 성공하였습니다." },
              callback: () => {
                navigate("/login");
              },
            })
          );
        } else {
          dispatch(
            setAlertModal({
              modalState: true,
              modalData: { title: "회원가입", message: "회원가입에 실패하였습니다." },
            })
          );
        }
      })
      .then((err) => {
        if (err) console.log(`error:${err}`);
      });
  };

  const handleSelectAll = (e) => {
    if (e.currentTarget.checked) {
      policyList.map((policy) => setValue(`${policy}`, true));
      setChecked(true);
    } else {
      policyList.map((policy) => setValue(`${policy}`, false));
      setChecked(false);
    }
  };

  const handleSelect = (e) => {
    setValue(`${e.currentTarget.id}`, e.currentTarget.checked);
    if (e.currentTarget.checked) {
      const isAllValuesTrue = policyList.every((policy) => getValues(`${policy}`) === true);
      setValue(`policyAll`, isAllValuesTrue);
    } else {
      setValue(`policyAll`, false);
    }

    const isRequiredPolicy = requiredPolicy.every((policy) => getValues(`${policy}`) === true);
    setChecked(isRequiredPolicy);
  };

  const onSubmit = (data) => {
    console.log("onSubmit");
    if (getValues("password") !== getValues("password_check")) {
      setError(
        "password_check",
        {
          message: "비밀번호가 일치하지 않습니다.",
        },
        { shouldFocus: true }
      );
      return;
    } else if (!isEmailVerify) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }

    try {
      join(data);
    } catch (error) {}
  };

  const requestVerifyEmail = () => {
    console.log("requestVerifyEmail");
    const emailParam = document.getElementById("email").value;
    setIsCodeSent(true);
    requestVerifyCode(emailParam, 0).then((res) => {
      if(res.data.status === "success") {
        console.log("코드 발송 성공");
        alert("이메일로 인증번호가 발송되었습니다.");
      } else {
        console.log("코드 발송 실패");
        if(res.data.reason === "AlreadyAccountExist"){
          alert("이미 가입된 이메일입니다.");
        } else {
          alert("이메일로 인증번호 발송에 실패하였습니다.\n잠시 후 다시 시도해주세요.");
        }
        setIsCodeSent(false);
      }
    }).catch((err) => {
      setIsCodeSent(false);
      alert("이메일로 인증번호 발송에 실패하였습니다.\n잠시 후 다시 시도해주세요.");
      console.log(err);
    });
  }

  const confirmCode = () => {
    console.log("confirmCode");
    console.log(document.getElementById("email_check").value);
    const emailParam = document.getElementById("email").value;
    const codeParam = document.getElementById("email_check").value;
    verifyCode({email: emailParam, code: codeParam}).then((res) => {
      if(res.data.status === "success") {
        console.log("코드 확인 성공");
        alert("이메일 인증이 완료되었습니다.");
        setIsEmailVerify(true);
      } else {
        alert("인증번호가 일치하지 않습니다.");
        console.log("코드 확인 실패");
      }
    } ).catch((err) => {
      console.log(err);
    } );
  }

  return (
    <main>
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <JoinPage>
            <JoinPageDiv>
              <div className="container">
                <JoinTitle>이메일 회원가입</JoinTitle>
                <JoinInputBox>
                  <label htmlFor="email">이메일</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="이메일 아이디"
                    disabled={isEmailVerify}
                    {...register("accountKey", {
                      required: "이메일을 입력해주세요.",
                      pattern: {
                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "유효한 이메일 주소를 입력하세요.",
                      },
                    })}
                  />
                  {errors?.accountKey && <WarningMessage>{errors.accountKey.message}</WarningMessage>}
                </JoinInputBox>

                <JoinInputBox>
                  <label htmlFor="email">이메일 확인</label>
                  <input
                    type="text"
                    id="email_check"
                    placeholder="인증번호"
                    disabled={isEmailVerify}
                    />
                    <CheckInformationBtn type="button" disabled={isCodeSent} className={isCodeSent && "disabled"} onClick={requestVerifyEmail}>인증번호 받기</CheckInformationBtn>
                    <CheckInformationBtn type="button" disabled={isEmailVerify} className={isEmailVerify && "disabled"} onClick={confirmCode}>인증번호 확인</CheckInformationBtn>
                </JoinInputBox>

                <JoinInputBox>
                  <label htmlFor="email">이름</label>
                  <input
                    type="text"
                    id="humanName"
                    placeholder="사용자 이름"
                    maxLength={10}
                    {...register("humanName", {
                      required: "이름을 입력해주세요.",
                    })}
                  />
                  {errors?.humanName && <WarningMessage>{errors.humanName.message}</WarningMessage>}
                </JoinInputBox>
                <JoinInputBox>
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
                  />
                  {errors?.password && <WarningMessage>{errors.password.message}</WarningMessage>}
                </JoinInputBox>
                <JoinInputBox>
                  <label htmlFor="password_check">비밀번호 확인</label>
                  <input
                    type="password"
                    id="password_check"
                    placeholder="비밀번호 확인"
                    {...register("password_check")}
                  />
                  {errors?.password_check && <WarningMessage>{errors.password_check.message}</WarningMessage>}
                </JoinInputBox>
                <JoinPolicyBox>
                  <PolicyAllCheckBox>
                    <input type="checkbox" id="policy" {...register("policyAll")} onChange={handleSelectAll} />
                    <label htmlFor="policy">전체동의</label>
                  </PolicyAllCheckBox>
                  <PolicyCheckBox>
                    <li>
                      <input
                        type="checkbox"
                        id={policyList[0]}
                        {...register(`${policyList[0]}`, { required: "필수 항목입니다." })}
                        onChange={handleSelect}
                      />
                      <label htmlFor={policyList[0]}>[필수] 이용약관 동의</label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        id={policyList[1]}
                        {...register(`${policyList[1]}`, { required: "필수 항목입니다." })}
                        onChange={handleSelect}
                      />
                      <label htmlFor={policyList[1]}>[필수] 개인정보 수집 및 이용 동의</label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        id={policyList[2]}
                        {...register(`${policyList[2]}`, { required: "필수 항목입니다." })}
                        onChange={handleSelect}
                      />
                      <label htmlFor={policyList[2]}>[필수] 만 14세 이상입니다.</label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        id={policyList[3]}
                        {...register(`${policyList[3]}`)}
                        onChange={handleSelect}
                      />
                      <label htmlFor={policyList[3]}>[선택] 마케팅 정보 수신 동의</label>
                    </li>
                  </PolicyCheckBox>
                  {policyList.some((policy) => errors[`${policy}`]) && (
                    <WarningMessage>
                      {errors[`${policyList.find((policy) => errors[`${policy}`])}`].message}
                    </WarningMessage>
                  )}
                </JoinPolicyBox>
                <JoinLinkBox>
                  <Link to={"/login"}>이미 가입했다면?</Link>
                </JoinLinkBox>
                <JoinLinkBox>
                  <Link to={"/joinAttorney"}>변리사 이신가요?</Link>
                </JoinLinkBox>
                <JoinButton type="submit" disabled={!isChecked} className={!isChecked && "disabled"}>
                  회원가입
                </JoinButton>
              </div>
            </JoinPageDiv>
          </JoinPage>
        </form>
      </section>
    </main>
  );
};

export default Contents;
