import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getChatRoomDetail, getChatRoomListByAttorneyId, getChatRoomListByClientId } from "../../../api/axiosApi";
import fileIcon from "../../../assets/images/file.png";
import userImg from "../../../assets/images/user.png";
import { Storage } from "../../../modules/Storage";
import { ChatContentsData } from "./DummyList";

const Container = styled.div`
  padding: 120px 0;
  max-width: 1600px;

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

const ChatBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;

  padding: 0;

  & > div {
    width: 100%;
    height: 800px;
    background-color: #fff;
  }
`;

const ChatListBox = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: transparent;
  padding: 20px;

  div.searchBox {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: var(--service-easytask-co-kr-client-chats-1920-x-1080-default-athens-gray, #fafafb);
    border: 1px solid #e5ecef;
    border-radius: 8px;
    padding: 8px 16px;
    margin: 20px 0;

    input {
      background: transparent;
      width: 100%;
      height: 20px;
      border: none;
      margin-left: 10px;
    }
  }

  div.chatInfo {
    margin-bottom: 30px;
    p {
      color: var(--service-easytask-co-kr-client-chats-1920-x-1080-default-pale-sky, #6c737c);
      font-size: 14px;
      font-weight: 500;
      line-height: 21px;
      padding: 0;

      span {
        color: var(--service-easytask-co-kr-client-chats-1920-x-1080-default-cornflower-blue, #4886eb);
      }
    }
  }
`;

const ChatList = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;

  max-height: fit-content;
  overflow-y: scroll;

  &.existScroll {
    padding-top: 50px;
  }
`;

const ChatItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;

  & + div {
    margin-top: 20px;
  }

  div.userImg {
    display: flex;
    margin-right: 10px;
    img {
      min-width: 56px;
      width: 56px;
    }
  }

  div.userInfo {
    width: 260px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    .title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      .name {
        font-size: 14px;
        color: var(--service-easytask-co-kr-client-chats-1920-x-1080-default-tuna, #313441);
        font-weight: 500;
      }

      .writedAt {
        font-size: 10px;
        line-height: 15px;
        color: var(--service-easytask-co-kr-client-chats-1920-x-1080-default-iron, #d3d7dc);
      }
    }

    .contents {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;

      div {
        font-size: 12px;
        line-height: 18px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .msg {
        width: 80%;
        color: var(--service-easytask-co-kr-client-chats-1920-x-1080-default-pale-sky, #6c737c);
      }

      .file {
        width: 95%;
        color: var(--service-easytask-co-kr-client-chats-1920-x-1080-default-cornflower-blue, #4886eb);
      }
    }
  }
`;

const ChatContentsBox = styled.div`
  position: relative;
  display: flex;
  flex: 2;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 10px;

  & > div.title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: #ededed;
    padding: 6px 24px 6px 28px;

    div.chatPartner {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;
      }

      span {
        font-size: 20px;
        color: var(--service-easytask-co-kr-client-chats-1920-x-1080-default-tuna, #313441);
        font-weight: 600;
        line-height: 30px;
      }
    }

    div.fileDoc {
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
      }
    }
  }

  & > div.contents {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    background: #fff;
  }

  & > div.inputBox {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: #fff;
    padding: 20px;
    border-top: 1px solid #e5ecef;

    div.chat {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      width: 80%;
      background: #f2f2f2;
      border-radius: 24px;
      padding: 10px 20px;

      img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }

      input {
        background: transparent;
        width: 100%;
        height: 20px;
        border: none;
      }
    }

    div.sendButton {
      width: 20%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      button {
        width: 100px;
        padding: 5px 20px;
        border-radius: 8px;
        background: var(--service-easytask-co-kr-client-chats-1920-x-1080-default-cornflower-blue, #4886eb);
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        color: #fff;
      }
    }
  }
`;

const ChatContents = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  width: 100%;
  padding: 30px;

  height: 666px;
  overflow-y: scroll;

  & > div.date {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: var(--service-easytask-co-kr-client-chats-1920-x-1080-default-pale-sky, #6c737c);
    font-size: 14px;
    line-height: 21px;
    margin-bottom: 20px;
  }
`;

const MyMessage = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  margin-top: 20px;

  &.minutes {
    margin-top: 8px;
  }

  .message {
    .title {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      background: transparent;

      .writedAt {
        font-size: 12px;
        line-height: 18px;
        color: var(--service-easytask-co-kr-client-chats-1920-x-1080-default-iron, #d3d7dc);
      }

      .name {
        font-size: 14px;
        line-height: 21px;
        color: var(--service-easytask-co-kr-client-chats-1920-x-1080-default-tuna, #313441);
        margin-left: 8px;
      }
    }

    .contents {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;

      .msgBox {
        font-size: 16px;
        max-width: 320px;
        padding: 12px 17px;
        color: #fff;
        font-weight: 500;
        border-radius: 24px;
        background: var(--service-easytask-co-kr-client-chats-1920-x-1080-default-tuna, #313441);

        & + .msgBox {
          margin-top: 8px;
        }
      }
    }
  }
`;

const YourMessage = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 20px;

  &.minutes {
    margin-top: 8px;
  }

  .userImage {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .message {
    .title {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      width: 100%;

      .name {
        font-size: 14px;
        line-height: 21px;
        font-weight: 500;
        margin-right: 8px;
      }

      .writedAt {
        font-size: 12px;
        color: var(--service-easytask-co-kr-client-chats-1920-x-1080-default-iron, #d3d7dc);
        font-weight: 500;
        line-height: 18px;
      }
    }

    .contents {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      .msgBox {
        max-width: 320px;
        padding: 12px 18px;
        color: var(--service-easytask-co-kr-client-chats-1920-x-1080-default-tuna, #313441);
        font-size: 16px;
        font-weight: 500;
        line-height: 24px; /* 150% */
        border-radius: 24px;
        background: var(--service-easytask-co-kr-client-chats-1920-x-1080-default-athens-gray, #eff1f3);

        & + .msgBox {
          margin-top: 8px;
        }
      }
    }
  }
`;

const socket = new WebSocket("ws://112.175.18.230:8084/socket/chat");
const Contents = () => {
  const [userName, setUserName] = useState(Storage.get("humanName"));
  const [email, setEmail] = useState(Storage.get("accountKey"));
  const [searchTerm, setSearchTerm] = useState("");
  const [chatListArr, setChatListArr] = useState(null);
  const [socketId, setSocketId] = useState(null);
  //   ChatListData.filter((item) => item.userName.toLowerCase().includes(searchTerm.toLowerCase()))
  // );
  const [chatArr, setChatArr] = useState(ChatContentsData);
  const inputRef = useRef(null);
  const accountId = Storage.get("accountId");
  const role = Storage.get("role") === "client" ? "client" : "attorney";
  const [currentChatRoomId, setCurrentChatRoomId] = useState(null);
  const [currentChatDetail, setCurrentChatDetail] = useState(null);
  useEffect(() => {
    socket.onopen = () => {
      console.log("connected to " + socket.url);
      // updateSocketId(2, accountId, socketId);  //chatRoomId : 2 for test
    };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // console.log(data);
      if(data.type === "session"){
        console.log("session id : " + data.sessionId);
        setSocketId(data.sessionId);
      } else if(data.type === "chat") {
        console.log("chat message : " + JSON.stringify(data));
        setChatArr((prev) => [...prev, data]);
      } else {
        console.log("got some message: ", data);
      }
    };
    socket.onclose = () => {
      console.log("disconnected");
    };

  }, []);

  useEffect(() => {
    if(role === "client"){
      getChatRoomListByClientId(accountId).then((res) => {
        console.log(res.data);
        setChatListArr(res.data.data);
      });
    } else {
      getChatRoomListByAttorneyId(accountId).then((res) => {
        console.log(res.data);
        setChatListArr(res.data.data);
      });
    }
    return () => {
      socket.close();
    };

  }, []);

  useEffect(() => {
    console.log(chatListArr);
    if(chatListArr != null && chatListArr.length > 0){
      updateSocketId(chatListArr[0].id, accountId, socketId);
      setCurrentChatRoomId(chatListArr[0].id);
    }
  }, [chatListArr]);

  useEffect(() => {
    if(currentChatRoomId != null){
      getChatRoomDetail(currentChatRoomId, 10, 0).then((res) => {
        console.log(res.data);
        setCurrentChatDetail(res.data.data);
      });
    }
  }, [currentChatRoomId]);

  const handleSend = () => {
    const message = {
      msgContents: inputRef.current.value,
      chatRoomId: currentChatRoomId, //for test
      msgFrom: accountId,//for test
      role: role,
      socketId : socketId,
      type: "chat",
    };

    console.log("send message : ", message);

    socket.send(JSON.stringify(message));

    // Send the message
    // socket.current.emit("send", message);

    // Clear the input field
    inputRef.current.value = "";
  };

  const updateSocketId = (chatRoomId, myAccountId, mySocketId) => {
    const message = {
      type: "updateSocketId",
      chatRoomId: chatRoomId,
      accountId: myAccountId,
      socketId: mySocketId,
      role: role,
    };

    socket.send(JSON.stringify(message));
  }

  return (
    <main style={{ background: "#e5ecef" }}>
      <section>
        <Container className="container">
          <div className="row">
            <div className="col-lg-3 col-12">
              <UserInfo className="d-none d-lg-block">
                <p className="user_name">{userName}</p>
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
                  <li onClick={() => Storage.logout()}>
                    <Link>로그아웃</Link>
                  </li>
                </ul>
              </MyPageMenu>
            </div>

            <ChatBox className="col-lg-9 col-12">
              <ChatListBox>
                <div className="searchBox">
                  <SearchIcon />
                  <input
                    type="text"
                    placeholder="변리사 이름을 검색하세요"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="chatInfo">
                  <p>
                    채팅 <span>{chatListArr?.length}</span>
                  </p>
                </div>

                <ChatList className={chatListArr?.length > 8 ? "existScroll" : ""}>
                  {/* {chatListArr.map((item, index) => (
                    <ChatItem key={index}>
                      <div className="userImg">
                        <img src={item.userImg} alt="변리사이미지" />
                      </div>
                      <div className="userInfo">
                        <div className="title">
                          <div className="name">{item.userName}</div>
                          <div className="writedAt">{writedAtFormat(item.writedAt)}</div>
                        </div>
                        <div className="contents">
                          <div className="msg">{item.msg}</div>
                          <div className="file">{item.file}</div>
                        </div>
                      </div>
                    </ChatItem>
                  ))} */}
                </ChatList>
              </ChatListBox>

              <ChatContentsBox>
                <div className="title">
                  <div className="chatPartner">
                    <img src={userImg} alt="" />
                    <span>김특허 변리사</span>
                  </div>
                  <div className="fileDoc">
                    <img src={userImg} alt="" />
                  </div>
                </div>

                <div className="contents">
                  <ChatContents>
                    {/* {chatArr.map((item, index) => {
                      const prevItem = chatArr[index - 1];
                      const prevCheck = prevItem && prevItem.userName === item.userName;
                      const isSameTime = prevCheck && prevItem.writedAt === item.writedAt;
                      const isSameDate = compareDate(prevItem?.writedAt, item.writedAt);

                      return (
                        <>
                          {!isSameDate && <div className="date">{dateFormat(item.writedAt)}</div>}
                          {item.userName === "나" ? (
                            <MyMessage className={isSameTime ? "minutes" : ""} key={index}>
                              <div className="message">
                                {!isSameTime && (
                                  <div className="title">
                                    <div className="writedAt">{timeFormat(item.writedAt)}</div>
                                    <div className="name">{item.userName}</div>
                                  </div>
                                )}
                                <div className="contents">
                                  <div className="msgBox">{item.msg}</div>
                                </div>
                              </div>
                            </MyMessage>
                          ) : (
                            <YourMessage className={isSameTime ? "minutes" : ""} key={index}>
                              <div className="userImage">{!isSameTime && <img src={item.userImg} alt="" />}</div>
                              <div className="message">
                                {!isSameTime && (
                                  <div className="title">
                                    <div className="name">{item.userName}</div>
                                    <div className="writedAt">{timeFormat(item.writedAt)}</div>
                                  </div>
                                )}
                                <div className="contents">
                                  <div className="msgBox">{item.msg}</div>
                                </div>
                              </div>
                            </YourMessage>
                          )}
                        </>
                      );
                    })} */}
                  </ChatContents>
                </div>

                <div className="inputBox">
                  <div className="chat">
                    <img src={fileIcon} alt="파일 등록" />
                    <input type="text" placeholder="메시지를 입력하세요" ref={inputRef} />
                  </div>
                  <div className="sendButton">
                    <button onClick={handleSend}>보내기</button>
                  </div>
                </div>
              </ChatContentsBox>
            </ChatBox>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default Contents;
