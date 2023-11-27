import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useAddPreMatchingMutation } from "../../../api/preMatching";
import arrowIcon from "../../../assets/images/arrow-up.png";
import attachFileIcon from "../../../assets/images/attach-file.png";
import closeIcon from "../../../assets/images/close.png";
import fileIcon from "../../../assets/images/file.png";
import { Storage } from "../../../modules/Storage";
import { base64String } from "../../../modules/fileEncoder";
import { useAppDispatch } from "../../../store";
import { setAlertModal, setLoadingModal } from "../../../store/slice/modal";
import { categoryList } from "./Category";

const FieldTitle = styled.h2`
  color: #000000;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  will-change: transform, opacity;
  transform: translate3d(0px, 40px, 0px);
  opacity: 0;
  transition: transform 1000ms ease 300ms, opacity 1000ms ease;
  margin-bottom: 16px;

  &.animate {
    opacity: 1;
    transform: translate3d(0px, 0px, 0px);
  }
`;

const FieldBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;

  margin-bottom: 16px;

  @media screen and (max-width: 960px) {
    gap: 16px;
  }
`;

const Field = styled.div`
  position: relative;
  border-radius: 8px;
  background-color: transparent;
  border: 1px solid #e9ecef;
  padding: 20px;
  height: 100px;
  flex: 0 1 calc((100% - 60px) / 4);

  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;

  &.active {
    transition: background-color 0.3s ease, color 0.3s ease;
    background-color: #202d90;
    color: #fff;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.07) 8px 8px 24px 0px;
  }

  @media screen and (max-width: 960px) {
    height: 74px;
    padding: 16px 10px;
    flex: 0 1 calc((100% - 16px) / 2);
  }

  p {
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;

    @media screen and (max-width: 960px) {
      text-align: initial;
      white-space: nowrap;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
    }
  }

  img {
    width: 56px;
    height: 56px;

    @media screen and (max-width: 960px) {
      width: 42px;
      height: 42px;
    }
  }
`;

const ToggleListBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const ToggleBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  div.field {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding: 10px;
    margin-bottom: 6px;
    background: #fff;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    cursor: pointer;

    div.title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;

      img {
        width: 48px;
        height: 48px;
        margin-right: 16px;
      }

      p {
        font-weight: 700;
        font-size: 18px;
        line-height: 26px;
      }
    }

    div.icon {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin-right: 10px;

      img {
        width: 24px;
        height: 24px;
        transform: rotate(180deg);
        transition: transform 0.5s ease;
      }
    }
  }

  div.item_box {
    width: 100%;
    min-height: 4px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;

    row-gap: 0px;
    column-gap: 16px;

    div.item {
      display: flex;
      justify-items: center;
      flex-direction: row;
      flex-wrap: nowrap;
      min-width: 100px;

      cursor: pointer;
      border: 1px solid #e9ecef;
      border-radius: 8px;

      visibility: hidden;
      opacity: 0;
      height: 0px;
      padding: 0px 10px;
      transition: all 0.5s ease;

      &.active {
        background-color: #202d90;
        color: #fff;
      }

      div.title {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        width: 100%;
        p {
          font-weight: 700;
          font-size: 16px;
          line-height: 26px;
        }
      }
    }
  }

  &.active {
    div.field {
      &.no_item {
        background-color: #202d90;
        color: #fff;
      }

      div.icon {
        img {
          transform: rotate(0deg);
          transition: transform 0.5s ease;
        }
      }
    }

    div.item_box {
      row-gap: 8px;
      column-gap: 16px;
      transition: all 0.5s ease;
      div.item {
        visibility: visible;
        opacity: 1;
        height: 56px;
        padding: 10px;
        transition: all 0.5s ease;
      }
    }
  }
`;

const InputField = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 10px;
  margin-bottom: 20px;

  label {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #000000;
    margin-bottom: 16px;
  }

  input[type="text"] {
    width: 100%;
    height: 56px;
    border-radius: 8px;
    border: 1px solid #e9ecef;
    padding: 0px 16px;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #000000;
  }

  textarea {
    width: 100%;
    height: 160px;
    border-radius: 8px;
    border: 1px solid #e9ecef;
    padding: 16px;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #000000;
  }
`;

const InputFileBox = styled.div`
  position: relative;
  width: 100%;
  height: 56px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  padding: 0px 16px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #000000;

  input[type="file"] {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  label.file_label {
    display: flex;
    align-items: center;
    width: calc(100% - 32px);
    height: 100%;
    position: absolute;
    cursor: pointer;
    color: #757575;
    margin: 0;

    img {
      width: 24px;
      height: 24px;
      margin-left: auto;
    }
  }
`;

const FileListBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;

  div {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: #e9ecef;
    border-radius: 8px;
    padding: 8px 16px;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #000;

    img.file_icon {
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }

    span {
      display: inline-block;
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    button {
      margin-left: 8px;
      background-color: transparent;
      border: none;
      cursor: pointer;

      img {
        width: 16px;
        height: 16px;
      }
    }
  }
`;

const MatchingButton = styled.button`
  width: 100%;
  height: 56px;
  border-radius: 8px;
  background-color: #202d90;
  border: none;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  margin-top: 48px;
  cursor: pointer;
`;

const WarningMessageBox = styled.div`
  display: block;
  width: 100%;
`;

const WarningMessage = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #ff0000;
  letter-spacing: 0px;
  line-height: 20px;
  display: block;
  margin-top: 7px;
`;

const Contents = () => {
  const { field } = useParams();
  const navigate = useNavigate();
  const [type, setType] = useState(null);
  const [subType, setSubType] = useState(null);
  const [detailType, setDetailType] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [preMatchingAPI] = useAddPreMatchingMutation();
  const dispatch = useAppDispatch();

  const [isLogin] = useState(Storage.get("accountKey") ? true : false);

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
    }
  }, []);

  useEffect(() => {
    if (field) {
      if (categoryList.some((item) => item.name === field)) {
        setType(field);
      } else {
        setSubType(field);
        setType("patent");
      }
    }
  }, [field]);

  const {
    register: patentReg,
    control,
    handleSubmit: patentSubmit,
    setError: setPatentError,
    clearErrors: clearPatentErrors,
    reset: resetPatent,
    formState: { errors: patentErrors },
  } = useForm();

  const {
    register: trademarkReg,
    handleSubmit: trademarkSubmit,
    setError: setTrademarkError,
    clearErrors: clearTrademarkErrors,
    reset: resetTrademark,
    formState: { errors: trademarkErrors },
  } = useForm();

  const {
    register: designReg,
    handleSubmit: designSubmit,
    setError: setDesignError,
    // clearErrors: clearDesignErrors,
    reset: resetDesign,
    formState: { errors: designErrors },
  } = useForm();

  const {
    register: etcReg,
    handleSubmit: etcSubmit,
    setError: setEtcError,
    // clearErrors: clearEtcErrors,
    reset: resetEtc,
    formState: { errors: etcErrors },
  } = useForm();

  const matching = (params) => {
    dispatch(setLoadingModal({ modalState: true }));

    preMatchingAPI(params)
      .unwrap()
      .then(({ status }) => {
        dispatch(setLoadingModal());
        if (status === "success") {
          navigate("/mypage");
        } else {
          dispatch(
            setAlertModal({
              modalState: true,
              modalData: { title: "변리사 찾기", message: "변리사 매칭정보 등록에 실패하였습니다." },
            })
          );
        }
      })
      .catch((err) => {
        if (err) console.log(`error:${err}`);
      });
  };

  const resetFormData = () => {
    resetPatent();
    resetTrademark();
    resetDesign();
    resetEtc();
  };

  const typeInit = (depth) => {
    if (depth === 0) {
      setFileList([]);
      setSubType(null);
      setDetailType(null);
    }
    if (depth === 1) {
      setDetailType(null);
    }
    clearErrors();
  };

  const clearErrors = () => {
    clearPatentErrors("subType");
    clearPatentErrors("detailType");
    clearTrademarkErrors("subType");
  };

  const onClickType = (paramType) => {
    if (type === paramType) return;

    resetFormData();
    typeInit(0);
    setType(paramType);
  };

  const onClickSubType = (paramType) => {
    if (subType === paramType) {
      setSubType(null);
      return false;
    }
    typeInit(1);
    setSubType(paramType);
  };

  const onClickDetailType = (paramType) => {
    if (detailType === paramType) return false;

    typeInit(2);
    setDetailType(paramType);
  };

  const onChangeFile = (e) => {
    const files = e.target.files;
    if (fileList.length + files.length > 5) {
      dispatch(
        setAlertModal({
          modalState: true,
          modalData: { title: "파일 업로드", message: "파일은 5개까지만 업로드 가능합니다." },
        })
      );
      return;
    }
    setFileList([...fileList, ...files]);
  };

  const onClickRemoveFile = (index) => {
    const newFileList = fileList.filter((_, fileIndex) => fileIndex !== index);
    setFileList(newFileList);
  };

  const onSubmit = (data, paramType) => {
    let params = {
      type: "",
      subType: "",
      detailType: "",
      name: "",
      keyword: "",
      detail: "",
      orderId: "",
      fileList: [],
    };

    if (paramType === "patent") {
      if (subType === null) {
        setPatentError("subType", {
          type: "manual",
          message: "특허 상세 분류를 선택해주세요.",
        });
        return;
      }

      if (subType !== "others" && subType !== "BM" && detailType === null) {
        setPatentError("detailType", {
          type: "manual",
          message: "특허 상세 분류를 선택해주세요.",
        });
        return;
      }

      if (fileList.length === 0) {
        setPatentError("patentFile", {
          type: "manual",
          message: "특허 파일을 등록해주세요.",
        });
        return;
      }

      params.detail = data.patentDetail;
    }

    if (paramType === "trademark") {
      if (subType === null) {
        setTrademarkError("subType", {
          type: "manual",
          message: "상표 분류를 선택해주세요.",
        });
        return;
      }

      if (fileList.length === 0) {
        setTrademarkError("trademarkFile", {
          type: "manual",
          message: "상표 파일을 등록해주세요.",
        });
        return;
      }

      params.name = data.trademarkName;
      params.keyword = data.keyword;
      params.detail = data.trademarkDetail;
    }

    if (paramType === "design") {
      if (fileList.length === 0) {
        setDesignError("designFile", {
          type: "manual",
          message: "물품 자료를 등록해주세요.",
        });
        return;
      }

      params.name = data.designName;
      params.detail = data.designDetail;
    }

    if (paramType === "etc") {
      if (fileList.length === 0) {
        setEtcError("etcFile", {
          type: "manual",
          message: "기타 자료를 등록해주세요.",
        });
        return;
      }

      params.detail = data.etcDetail;
    }

    params.type = paramType;
    params.subType = subType;
    params.detailType = detailType;
    params.orderId = Storage.get("accountKey");

    if (fileList.length > 0) {
      const bs64FileList = fileList.map((file) => base64String(file));
      Promise.all(bs64FileList).then((res) => {
        let fileData = [];
        res.forEach((file, index) => {
          fileData.push({
            realName: fileList[index].name,
            base64String: file,
          });
        });
        params.fileList = fileData;
        console.log(params);
        matching(params);
      });
    } else {
      console.log(params);
      matching(params);
    }
  };

  return (
    <main style={{ minHeight: "700px" }}>
      <section>
        <div className="container mb-32 main_category">
          <FieldTitle className="animate">간편 신청</FieldTitle>

          <FieldBox>
            {categoryList.map((category, index) => (
              <Field
                key={index}
                className={type === category.name && "active"}
                onClick={() => onClickType(category.name)}
              >
                <p>{category.title}</p>
                <img src={category.icon} alt="icon" />
              </Field>
            ))}
          </FieldBox>
        </div>
      </section>

      <section>
        {type === categoryList[0].name && (
          <form onSubmit={patentSubmit((e) => onSubmit(e, "patent"))}>
            <div className="container mb-32 sub_category">
              <FieldTitle className="animate">특허 상세 분류(선택)</FieldTitle>

              <ToggleListBox>
                {categoryList[0].typeList.map((patent, index) => (
                  <ToggleBox key={"subType_" + index} className={subType === patent.name && "active"}>
                    <div
                      className={patent.typeList.length === 0 ? "field no_item" : "field"}
                      onClick={() => onClickSubType(patent.name)}
                    >
                      <div className="title">
                        <img src={patent.icon} alt="icon" />
                        <p>{patent.title}</p>
                      </div>
                      <div className="icon">
                        <img src={arrowIcon} alt="arrow_icon" />
                      </div>
                    </div>
                    <div className="item_box">
                      {patent.typeList.map((item, index) => (
                        <div
                          key={patent.name + "_" + index}
                          className={detailType === item ? "item active" : "item"}
                          onClick={() => onClickDetailType(item)}
                        >
                          <div className="title">
                            <p>{item}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ToggleBox>
                ))}
              </ToggleListBox>

              <FieldBox>
                {patentErrors?.subType && (
                  <WarningMessageBox>
                    <WarningMessage>{patentErrors.subType.message}</WarningMessage>
                  </WarningMessageBox>
                )}

                {patentErrors?.detailType && (
                  <WarningMessageBox>
                    <WarningMessage>{patentErrors.detailType.message}</WarningMessage>
                  </WarningMessageBox>
                )}
              </FieldBox>

              <InputField>
                <label>특허 상세 정보</label>
                <textarea
                  placeholder="특허 정보를 입력해주세요."
                  {...patentReg("patentDetail", {
                    required: "상세 정보를 입력해주세요.",
                  })}
                ></textarea>
                {patentErrors?.patentDetail && <WarningMessage>{patentErrors.patentDetail.message}</WarningMessage>}
              </InputField>

              <InputField>
                <label>추가 자료 (최대 5개)</label>

                <Controller
                  control={control}
                  name="patentFile"
                  defaultValue={[]}
                  render={({ field }) => (
                    <InputFileBox>
                      <input
                        type="file"
                        id="patentFile"
                        placeholder="특허 파일을 등록해주세요."
                        multiple
                        {...field}
                        onChange={(e) => {
                          field.onChange(e); // default onChange from Controller
                          onChangeFile(e); // your onChange function
                        }}
                      />
                      <label className="file_label" htmlFor="patentFile">
                        특허 파일을 등록해주세요.
                        <img src={attachFileIcon} alt="file_icon" />
                      </label>
                    </InputFileBox>
                  )}
                />
                {patentErrors?.patentFile && <WarningMessage>{patentErrors.patentFile.message}</WarningMessage>}
                <FileListBox>
                  {fileList.map((file, index) => (
                    <div key={"patent_file_" + index}>
                      <img src={fileIcon} className="file_icon" alt="file_icon" />
                      <span>{file.name}</span>
                      <button onClick={() => onClickRemoveFile(index)}>
                        <img src={closeIcon} alt="closeIcon" />
                      </button>
                    </div>
                  ))}
                </FileListBox>
              </InputField>

              <MatchingButton type="submit">매칭 신청하기</MatchingButton>
            </div>
          </form>
        )}
      </section>

      <section>
        {type === categoryList[1].name && (
          <form onSubmit={trademarkSubmit((e) => onSubmit(e, "trademark"))}>
            <div className="container mb-32 sub_category">
              <FieldTitle className="animate">상표 분류(선택)</FieldTitle>

              <FieldBox>
                {categoryList[1].typeList.map((trademark, index) => (
                  <Field
                    key={index}
                    className={subType === trademark.name && "active"}
                    onClick={() => onClickSubType(trademark.name)}
                  >
                    <p>{trademark.title}</p>
                    <img src={trademark.icon} alt="icon" />
                  </Field>
                ))}
                {trademarkErrors?.subType && (
                  <WarningMessageBox>
                    <WarningMessage>{trademarkErrors.subType.message}</WarningMessage>
                  </WarningMessageBox>
                )}
              </FieldBox>

              <InputField>
                <label>상표명</label>
                <input
                  type="text"
                  placeholder="상표명을 입력해주세요."
                  {...trademarkReg("trademarkName", {
                    required: "상표 이름을 입력해주세요.",
                  })}
                ></input>
                {trademarkErrors?.trademarkName && (
                  <WarningMessage>{trademarkErrors.trademarkName.message}</WarningMessage>
                )}
              </InputField>

              <InputField>
                <label>키워드 입력 (최대 5개)</label>
                <input
                  type="text"
                  placeholder="','로 키워드를 구분해서 입력해주세요."
                  {...trademarkReg("keyword", {
                    required: "키워드를 입력해주세요.",
                  })}
                />
                {trademarkErrors?.keyword && <WarningMessage>{trademarkErrors.keyword.message}</WarningMessage>}
              </InputField>

              <InputField>
                <label>상표 상세 정보</label>
                <textarea
                  placeholder="상표 정보를 입력해주세요."
                  {...trademarkReg("trademarkDetail", {
                    required: "상세 정보를 입력해주세요.",
                  })}
                ></textarea>
                {trademarkErrors?.trademarkDetail && (
                  <WarningMessage>{trademarkErrors.trademarkDetail.message}</WarningMessage>
                )}
              </InputField>

              <InputField>
                <label>추가 자료 (최대 5개)</label>
                <Controller
                  control={control}
                  name="trademarkFile"
                  defaultValue={[]}
                  render={({ field }) => (
                    <InputFileBox>
                      <input
                        type="file"
                        id="trademarkFile"
                        placeholder="상표 파일을 등록해주세요."
                        multiple
                        {...field}
                        onChange={(e) => {
                          field.onChange(e); // default onChange from Controller
                          onChangeFile(e); // your onChange function
                        }}
                      />
                      <label className="file_label" htmlFor="trademarkFile">
                        상표 파일을 등록해주세요.
                        <img src={attachFileIcon} alt="file_icon" />
                      </label>
                    </InputFileBox>
                  )}
                />
                {trademarkErrors?.trademarkFile && (
                  <WarningMessage>{trademarkErrors.trademarkFile.message}</WarningMessage>
                )}
                <FileListBox>
                  {fileList.map((file, index) => (
                    <div key={"trademark_file_" + index}>
                      <img src={fileIcon} className="file_icon" alt="file_icon" />
                      <span>{file.name}</span>
                      <button onClick={() => onClickRemoveFile(index)}>
                        <img src={closeIcon} alt="closeIcon" />
                      </button>
                    </div>
                  ))}
                </FileListBox>
              </InputField>

              <MatchingButton type="submit">매칭 신청하기</MatchingButton>
            </div>
          </form>
        )}
      </section>

      <section>
        {type === categoryList[2].name && (
          <form onSubmit={designSubmit((e) => onSubmit(e, "design"))}>
            <div className="container mb-32 sub_category">
              <FieldTitle className="animate">디자인 (선택)</FieldTitle>

              <InputField>
                <label>물품 명칭</label>
                <input
                  type="text"
                  placeholder="물품명을 입력해주세요."
                  {...designReg("designName", {
                    required: "물품 이름을 입력해주세요.",
                  })}
                />
                {designErrors?.designName && <WarningMessage>{designErrors.designName.message}</WarningMessage>}
              </InputField>

              <InputField>
                <label>물품 상세 정보</label>
                <textarea
                  placeholder="물품 정보를 입력해주세요."
                  {...designReg("designDetail", {
                    required: "상세 정보를 입력해주세요.",
                  })}
                ></textarea>
                {designErrors?.designDetail && <WarningMessage>{designErrors.designDetail.message}</WarningMessage>}
              </InputField>

              <InputField>
                <label>물품 사진 또는 도면 (최대 5개)</label>

                <Controller
                  control={control}
                  name="designFile"
                  defaultValue={[]}
                  render={({ field }) => (
                    <InputFileBox>
                      <input
                        type="file"
                        id="designFile"
                        placeholder="물품 자료를 등록해주세요."
                        multiple
                        {...field}
                        onChange={(e) => {
                          field.onChange(e); // default onChange from Controller
                          onChangeFile(e); // your onChange function
                        }}
                      />
                      <label className="file_label" htmlFor="designFile">
                        물품 자료를 등록해주세요.
                      </label>
                    </InputFileBox>
                  )}
                />

                {designErrors?.designFile && <WarningMessage>{designErrors.designFile.message}</WarningMessage>}

                <FileListBox>
                  {fileList.map((file, index) => (
                    <div key={"design_file_" + index}>
                      <span>{file.name}</span>
                      <button onClick={() => onClickRemoveFile(index)}>
                        <img src={closeIcon} alt="closeIcon" />
                      </button>
                    </div>
                  ))}
                </FileListBox>
              </InputField>

              <MatchingButton type="submit">매칭 신청하기</MatchingButton>
            </div>
          </form>
        )}
      </section>

      <section>
        {type === categoryList[3].name && (
          <form onSubmit={etcSubmit((e) => onSubmit(e, "etc"))}>
            <div className="container mb-32 sub_category">
              <FieldTitle className="animate">기타</FieldTitle>

              <InputField>
                <label>기타 상세 정보</label>
                <textarea
                  placeholder="기타 정보를 입력해주세요."
                  {...etcReg("etcDetail", {
                    required: "상세 정보를 입력해주세요.",
                  })}
                ></textarea>
                {etcErrors?.etcDetail && <WarningMessage>{etcErrors.etcDetail.message}</WarningMessage>}
              </InputField>

              <InputField>
                <label>추가 자료 (최대 5개)</label>

                <Controller
                  control={control}
                  name="etcFile"
                  defaultValue={[]}
                  render={({ field }) => (
                    <InputFileBox>
                      <input
                        type="file"
                        id="etcFile"
                        placeholder="기타 자료를 등록해주세요."
                        multiple
                        {...field}
                        onChange={(e) => {
                          field.onChange(e); // default onChange from Controller
                          onChangeFile(e); // your onChange function
                        }}
                      />
                      <label className="file_label" htmlFor="etcFile">
                        기타 자료를 등록해주세요.
                      </label>
                    </InputFileBox>
                  )}
                />

                {etcErrors?.etcFile && <WarningMessage>{etcErrors.etcFile.message}</WarningMessage>}

                <FileListBox>
                  {fileList.map((file, index) => (
                    <div key={"etc_file_" + index}>
                      <span>{file.name}</span>
                      <button onClick={() => onClickRemoveFile(index)}>
                        <img src={closeIcon} alt="closeIcon" />
                      </button>
                    </div>
                  ))}
                </FileListBox>
              </InputField>

              <MatchingButton type="submit">매칭 신청하기</MatchingButton>
            </div>
          </form>
        )}
      </section>
    </main>
  );
};

export default Contents;
