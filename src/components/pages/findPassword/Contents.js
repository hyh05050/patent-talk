import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { requestVerifyCode, resetPassword, verifyCode } from "../../../api/axiosApi";

const Contents = () => {
    const navigate = useNavigate();
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isEmailVerify, setIsEmailVerify] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        getValues,
        setValues,
        formState: {errors},
    } = useForm();
    
    const onSubmit = (data) => {
        console.log(data);
    }
    
    const requestVerifyEmail = () => {
        const emailParam = document.getElementById("email").value;
        setIsCodeSent(true);
        requestVerifyCode(emailParam, 1).then((res) => {
            console.log(res);
            if(res.data.status === "success") {
                console.log("코드 발송 성공");
                alert("이메일로 인증번호가 발송되었습니다.");
            } else {
                console.log("코드 발송 실패");
                if(res.data.reason === "AlreadySent"){
                    alert("이미 인증번호가 발송되었습니다.\n이메일을 확인해주세요.");
                } else {
                    alert("이메일로 인증번호 발송에 실패하였습니다.\n잠시 후 다시 시도해주세요.");
                    setIsCodeSent(false);
                }
            }
        }).catch((error) => {
            setIsCodeSent(false);
            alert("이메일 발송에 실패했습니다.");
            console.log(error);
        });
    }

    const confirmCode = () => {
        console.log("confirmCode");
        const emailParam = document.getElementById("email").value;
        const codeParam = document.getElementById("email_check").value;
        verifyCode({email: emailParam, code: codeParam}).then((res) => {
            console.log(res);
            if(res.data.status === "success") {
                console.log("코드 확인 성공");
                alert("이메일 인증이 완료되었습니다.");
                setIsEmailVerify(true);
            } else {
                alert("인증번호가 일치하지 않습니다.");
                console.log("코드 확인 실패");
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    const requestResetPassword = () => {
        const emailParam = document.getElementById("email").value;
        resetPassword({accountKey: emailParam}).then((res) => {
            console.log(res);
            if(res.data.status === "success") {
                console.log("비밀번호 재설정 성공");
                alert("비밀번호 재설정이 완료되었습니다.\n이메일을 확인해주세요.");
                navigate("/login");
            } else {
                alert("비밀번호 재설정에 실패했습니다.\n잠시 후 다시 시도해주세요.");
                console.log("비밀번호 재설정 실패");
                navigate("/findPassword")
            }
        }).catch((error) => {
            console.log(error);
            alert("비밀번호 재설정에 실패했습니다.\n잠시 후 다시 시도해주세요.");
            navigate("/findPassword")
        });
    }

    return (
        <main>
            <section>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FindPasswordPage>
                        <FindPasswordPageDiv>
                            <div className="container">
                                <FPTitle>비밀번호 찾기</FPTitle>
                                <FPInputBox>
                                    <label htmlFor="email">이메일</label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="이메일을 입력하세요."
                                        disabled={isEmailVerify}
                                        {...register("accountKey", {
                                            required: true,
                                            pattern: {
                                                value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
                                                message: "유효한 이메일 주소를 입력하세요.",
                                            },
                                            })
                                        }
                                    />
                                    {errors?.accountKey && <WarningMessage>{errors.accountKey.message}</WarningMessage>}
                                </FPInputBox>
                                <FPInputBox>
                                    <label htmlFor="email_check">이메일 확인</label>
                                    <input
                                        type="text"
                                        id="email_check"
                                        placeholder="인증번호를 입력하세요."
                                        disabled={isEmailVerify}
                                        />
                                    <button type="button" onClick={requestVerifyEmail} disabled={isCodeSent}>인증번호 발송</button>
                                    <button type="button" onClick={confirmCode} disabled={isEmailVerify}>인증번호 확인</button>
                                    <button type="button" onClick={requestResetPassword} disabled={!isCodeSent || !isEmailVerify} >비밀번호 재설정</button>
                                </FPInputBox>
                            </div>
                        </FindPasswordPageDiv>
                    </FindPasswordPage>
                </form>
            </section>
        </main>
    );
};

const FindPasswordPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 0 auto;

    width: 100%;
    min-height: calc(100vh - 84px);
    background-color: #f6f6f6;

    @media screen and (max-width: 1500px) {
        min-height: calc(100vh - 94px);
    }
`;

const FindPasswordPageDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
`;

const FPTitle = styled.h2`
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

const FPInputBox = styled.div`
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

export default Contents;