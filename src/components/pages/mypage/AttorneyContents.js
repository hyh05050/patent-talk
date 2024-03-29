import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getQuotationByPreMatchingNoAndAgentNo } from "../../../api/axiosApi";
import { useGetPreMatchingListAIDQuery } from "../../../api/preMatching";
import { Storage } from "../../../modules/Storage";
import { useAppDispatch } from "../../../store";
import {
  setAlertModal,
  setPreMatchingModal,
  setQuotationDetailModal,
  setQuotationModal,
} from "../../../store/slice/modal";
import { convertCodeToText as CTT } from "../preMatching/Category";

const Container = styled.div`
  padding: 40px 0;

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

const MatchingMenuBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #fff;
  padding: 0;
`;

const MatchingMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-right: 1px solid #e5e5e5;
  padding: 20px;

  @media screen and (max-width: 480px) {
    padding: 10px 0px;
  }

  &.no_content {
    height: 100%;
  }

  &.active {
    color: #fff;
    background-color: #1b267b;
  }

  p.title {
    font-size: 16px;
    margin-bottom: 10px;

    @media screen and (max-width: 374px) {
      font-size: 14px;
    }
  }

  p.info {
    font-size: 50px;
    line-height: 0.9;
    font-weight: 700;

    span {
      font-size: 14px;
    }
  }
`;

const MatchingContents = styled.div`
  position: relative;
  padding: 0;
  margin-top: 60px;
  width: 100%;

  @media (max-width: 991px) {
    margin-top: 20px;
  }
`;

const MatchingTable = styled.table`
  display: table;
  border-collapse: collapse;
  background-color: #fff;
  width: 100%;

  @media screen and (max-width: 767px) {
    display: none;
  }

  tr {
    text-align: center;
    &:not(:last-child) {
      border-bottom: 1px solid #e9ecef;
    }

    th {
      height: 80px;
      border-bottom: 1px solid #e9ecef;
    }

    td {
      height: 60px;
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  tbody {
    tr {
      &:hover {
        background-color: #1b267b;
        color: #fff;
        cursor: pointer;
      }
    }
  }
`;

const MatchingBox = styled.div`
  position: relative;
  display: none;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
  box-sizing: border-box;

  @media screen and (max-width: 767px) {
    display: flex;
  }

  div.item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    flex: 1 0 50%;
    max-width: calc(50% - 10px);
    background-color: #fff;
    padding: 20px;

    @media screen and (max-width: 600px) {
      flex: 1 0 100%; /* 한 줄에 한 개씩 표시 */
      max-width: 100%;
    }

    p {
      font-size: 16px;
      margin-bottom: 10px;

      span {
        font-size: 14px;
      }
    }

    div.button {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;

      div {
        flex: 1;
        button {
          width: 100%;
          font-size: 18px;
          padding: 5px 10px;
          transition: all 0.3s ease-in-out;

          &:hover {
            color: #fff;
            background-color: #1b267b;
          }
        }
      }
    }
  }
`;

const AttorneyContents = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [activeStatus, setActiveStatus] = useState("Not Matched Yet");
  const [isLogin] = useState(Storage.get("accountKey") ? true : false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const role = Storage.get("role");
  const myAttorneyNo = Storage.get("agentNo");
  const { data: matchings, isLoading } = useGetPreMatchingListAIDQuery({ agentNo: myAttorneyNo });

  useEffect(() => {
    if (!isLogin) {
      dispatch(
        setAlertModal({
          modalState: true,
          modalData: { title: "로그인이 필요합니다.", message: "로그인 페이지로 이동합니다." },
          callback: () => {
            navigate("/login");
          },
        })
      );
    } else {
      setUserName(Storage.get("humanName"));
      setEmail(Storage.get("accountKey"));
    }
  }, []);

  const onClickMenu = (status) => {
    setActiveStatus(status);
  };

  const onClickMatchingRow = (e, data) => {
    if (!e.target.classList.contains("download-btn")) {
      dispatch(
        setPreMatchingModal({
          modalState: true,
          modalData: { preMatchingId: data.preMatchingId },
        })
      );
    }
  };

  const onClickSendQuotation = (data) => {
    if (data.preMatchingId) {
      if (data.applicantIds.includes(myAttorneyNo)) {
        // 견적서가 이미 제출되었을 경우
        // 견적서 확인 모달을 띄운다.
        getQuotationByPreMatchingNoAndAgentNo(data.preMatchingId, myAttorneyNo).then((res) => {
          if (res.data.status == "fail") {
            //견적서가 없다
            dispatch(
              setQuotationModal({
                modalState: true,
                modalData: { preMatchingId: data.preMatchingId, agentNo: myAttorneyNo },
              })
            );
          } else {
            //견적서가 있다
          }
        });
        dispatch(
          setQuotationDetailModal({
            modalState: true,
            modalData: { preMatchingId: data.preMatchingId },
          })
        );
      }
    }
  };

  const onClickAttorneyButton = (preMatchingId) => {
    navigate("/chat", { state: { preMatchingId: preMatchingId } });
  };

  if (isLoading) return <div>loading...</div>;

  var displayedData =
    matchings?.data
      ?.filter((matching) => matching.status == activeStatus)
      .slice(0)
      .reverse() || [];
  if(activeStatus == "Matched") {
    displayedData = displayedData.filter((matching) => matching.managerId == myAttorneyNo);
  }

  return (
    <main style={{ minHeight: "800px", background: "#e5ecef" }}>
      <section>
        <Container className="container">
          <div className="row">
            <div className="col-lg-3 col-12">
              <UserInfo className="d-none d-lg-block">
                <p className="user_name">{userName} 변리사</p>
                <p className="user_email">{email}</p>
              </UserInfo>

              <MyPageMenu className="d-none d-lg-block">
                <p className="title">마이페이지</p>
                <ul>
                  <li>
                    <Link to={"/mypage"} className="active">
                      매칭 정보
                    </Link>
                  </li>
                  <li>
                    <Link to={"/mypage/modify"}>회원정보 수정</Link>
                  </li>
                  <li onClick={() => Storage.logout()}>
                    <Link>로그아웃</Link>
                  </li>
                </ul>
              </MyPageMenu>
            </div>

            <div className="col-lg-9 col-12">
              <div className="row">
                <MatchingMenuBox>
                  <MatchingMenu
                    className={`col ${activeStatus === "Not Matched Yet" ? "active" : ""}`}
                    onClick={() => onClickMenu("Not Matched Yet")}
                  >
                    <p className="title">발송한 제안 내역</p>
                    <p className="info">
                      {matchings?.data?.filter(
                        (matching) => matching.status == "Not Matched Yet" && matching.managerId == null
                      ).length || 0}
                      <span>건</span>
                    </p>
                  </MatchingMenu>
                  <MatchingMenu
                    className={`col ${activeStatus === "Matched" ? "active" : ""}`}
                    onClick={() => onClickMenu("Matched")}
                  >
                    <p className="title">진행 중 내역</p>
                    <p className="info">
                      {matchings?.data?.filter(
                        (matching) => matching.status == "Matched" && matching.managerId == myAttorneyNo
                      ).length || 0}
                      <span>건</span>
                    </p>
                  </MatchingMenu>
                  <MatchingMenu
                    className={`col ${activeStatus === "Done" ? "active" : ""}`}
                    onClick={() => onClickMenu("Done")}
                  >
                    <p className="title">완료 내역</p>
                    <p className="info">
                      {matchings?.data?.filter((matching) => matching.status == "Done").length || 0}
                      <span>건</span>
                    </p>
                  </MatchingMenu>
                  <MatchingMenu className="col no_content d-none d-md-block" />
                </MatchingMenuBox>
              </div>

              <div className="row">
                <MatchingContents>
                  <MatchingTable className="table-responsive">
                    <thead>
                      <tr>
                        <th>NO</th>
                        <th>신청일</th>
                        <th>특허 유형</th>
                        <th>분류</th>
                        <th>상세 정보</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedData?.map((matching, index) => {
                        if (activeStatus == "Matched" && matching.managerId != myAttorneyNo) return;
                        return (
                          <tr
                            key={"matching_" + matching.preMatchingId}
                            onClick={(e) => onClickMatchingRow(e, matching)}
                          >
                            <td>{displayedData.length - index}</td>
                            <td>{matching.createdAt?.substring(0, 10)}</td>
                            <td>{CTT(matching.type, "main")}</td>
                            <td>
                              {matching.detailType
                                ? CTT(matching.subType, "sub") + "-" + matching.detailType
                                : CTT(matching.subType, "sub")}
                            </td>
                            <td>{matching.detail}</td>
                            <td>
                              {matching.managerId ? (
                                <button type="button" className="download-btn" onClick={() => onClickAttorneyButton(matching.preMatchingId)}>
                                  {matching?.managerName} 대화방으로 이동
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className="download-btn"
                                  onClick={() => onClickSendQuotation(matching)}
                                >
                                  견적 제안
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}

                      {displayedData?.length == 0 && (
                        <tr>
                          <td colSpan="6">조회된 내역이 없습니다.</td>
                        </tr>
                      )}
                    </tbody>
                  </MatchingTable>

                  <MatchingBox>
                    {displayedData?.map((matching, index) => (
                      <div key={"matching_" + index} className="item" onClick={(e) => onClickMatchingRow(e, matching)}>
                        <p>
                          신청일 : <span>{matching.createdAt?.substring(0, 10)}</span>
                        </p>
                        <p>
                          특허 유형 : <span>{CTT(matching.type, "main")}</span>
                        </p>
                        <p>
                          분류 :{" "}
                          <span>
                            {matching.detailType
                              ? CTT(matching.subType, "sub") + "-" + matching.detailType
                              : CTT(matching.subType, "sub")}
                          </span>
                        </p>
                        <p>
                          상세 정보 : <span>{matching.detail}</span>
                        </p>
                        <div className="button">
                          <div>
                            {matching.managerId ? (
                              <button type="button" className="download-btn" onClick={() => onClickAttorneyButton(matching.preMatchingId)}>
                                {matching?.managerName} 채팅방
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="download-btn"
                                onClick={() => onClickSendQuotation(matching)}
                              >
                                매칭 확인
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {displayedData?.length == 0 && (
                      <div className="item">
                        <p>조회된 내역이 없습니다.</p>
                      </div>
                    )}
                  </MatchingBox>
                </MatchingContents>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default AttorneyContents;
