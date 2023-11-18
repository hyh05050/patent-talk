import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { categoryList, trademarkList, subCategoryList } from "./Category";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useAppDispatch } from "../../../store";
import { setAlertModal } from "../../../store/slice/modal";
import { useAddPreMatchingMutation } from "../../../api/preMatching";

const FieldTitle = styled.h2`
  color: #000000;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  will-change: transform, opacity;
  transform: translate3d(0px, 40px, 0px);
  opacity: 0;
  transition: transform 1000ms ease 300ms, opacity 1000ms ease;

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

  margin-bottom: 16px;
`;

const Field = styled.div`
  position: relative;
  border-radius: 8px;
  background-color: transparent;
  border: 1px solid #e9ecef;
  margin-top: 16px;
  margin-right: 20px;
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

  @media screen and (min-width: 961px) {
    &:nth-child(4n) {
      margin-right: 0;
    }
  }

  @media screen and (max-width: 960px) {
    height: 74px;
    padding: 16px 10px 16px;
    margin-right: 16px;
    flex: 0 1 calc((100% - 16px) / 2);

    &:nth-child(2n) {
      margin-right: 0;
    }
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

const PatentField = styled.div`
  position: relative;
  border-radius: 8px;
  background-color: transparent;
  border: 1px solid #e9ecef;
  margin-top: 16px;
  margin-right: 20px;
  padding: 20px;
  height: 100px;
  flex: 0 1 calc((100% - 80px) / 5);

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

  @media screen and (min-width: 961px) {
    &:nth-child(5n) {
      margin-right: 0;
    }
  }

  @media screen and (max-width: 960px) {
    height: 74px;
    padding: 16px 10px 16px;
    margin-right: 16px;
    flex: 0 1 calc((100% - 16px) / 2);

    &:nth-child(2n) {
      margin-right: 0;
    }
  }

  p {
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;

    @media screen and (max-width: 960px) {
      color: #17181a;
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

const InputField = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 10px;
  margin-bottom: 10px;

  label {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #000000;
    margin-bottom: 8px;
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
  margin-top: 10px;

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
  const [category, setCategory] = useState([false, false, false, false]);
  const [subCategory, setSubCategory] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [preMatchingAPI] = useAddPreMatchingMutation();
  const dispatch = useAppDispatch();

  const {
    register: patentReg,
    control,
    setValue: setPatentValue,
    handleSubmit: patentSubmit,
    setError: setPatentError,
    clearErrors: clearPatentErrors,
    reset: resetPatent,
    formState: { errors: patentErrors },
  } = useForm({
    defaultValues: {
      subCategory: "",
    },
  });

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
    clearErrors: clearDesignErrors,
    reset: resetDesign,
    formState: { errors: designErrors },
  } = useForm();

  const {
    register: etcReg,
    handleSubmit: etcSubmit,
    setError: setEtcError,
    clearErrors: clearEtcErrors,
    reset: resetEtc,
    formState: { errors: etcErrors },
  } = useForm();

  useEffect(() => {
    if (field) {
      if (categoryList.find((item) => item.name === field)) {
        const categoryFlag = Array.from(
          { length: 4 },
          (_, index) => index === categoryList.findIndex((item) => item.name === field)
        );
        setCategory(categoryFlag);
      } else {
        setSubCategory(field);
        setCategory([true, false, false, false]);
      }
    }
  }, [field]);

  const matching = (params) => {
    console.log(params);
    preMatchingAPI({
      ...params,
    })
      .unwrap()
      .then(({ status }) => {
        if (status === "success") {
          navigate("/home");
        } else {
          dispatch(
            setAlertModal({
              modalState: true,
              modalData: { title: "변리사 찾기", message: "변리사 매칭정보 등록에 실패하였습니다." },
            })
          );
        }
      })
      .then((err) => {
        if (err) console.log(`error:${err}`);
      });
  };

  const resetFormData = () => {
    resetPatent();
    resetTrademark();
    resetDesign();
    resetEtc();
  };

  const clearErrors = () => {
    if (category === "patent") clearPatentErrors("subCategory");
    if (category === "trademark") clearTrademarkErrors("subCategory");
  };

  const onClickCategory = (trueIndex) => {
    if (category[trueIndex]) return;
    const categoryFlag = Array.from({ length: 4 }, (_, index) => index === trueIndex);
    setFileList([]);
    setSubCategory(null);
    resetFormData();
    setCategory(categoryFlag);
  };

  const onClickSubCategory = (paramCategory) => {
    if (subCategory === paramCategory) return;
    clearErrors();
    setSubCategory(paramCategory);
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
    console.log(files);
    setFileList([...fileList, ...files]);
  };

  const onClickRemoveFile = (index) => {
    const newFileList = fileList.filter((_, fileIndex) => fileIndex !== index);
    setFileList(newFileList);
  };

  const onSubmit = (data, type) => {
    const params = { type: "", subType: "", name: "", keyword: "", detail: "" };

    if (type === "patent") {
      if (subCategory === null) {
        setPatentError("subCategory", {
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

      params.type = "patent";
      params.subType = subCategory;
      params.detail = data.patentDetail;
    }

    if (type === "trademark") {
      if (subCategory === null) {
        setTrademarkError("subCategory", {
          type: "manual",
          message: "상표 분류를 선택해주세요.",
        });
        return;
      }

      params.type = "trademark";
      params.subType = subCategory;
      params.name = data.trademarkName;
      params.keyword = data.keyword;
      params.detail = data.trademarkDetail;
    }

    if (type === "design") {
      if (fileList.length === 0) {
        setDesignError("designFile", {
          type: "manual",
          message: "물품 자료를 등록해주세요.",
        });
        return;
      }

      params.type = "design";
      params.name = data.designName;
      params.detail = data.designDetail;
    }

    if (type === "etc") {
      if (fileList.length === 0) {
        setEtcError("etcFile", {
          type: "manual",
          message: "기타 자료를 등록해주세요.",
        });
        return;
      }

      params.type = "etc";
      params.detail = data.etcDetail;
    }

    matching(params);
  };

  return (
    <main>
      <section>
        <div className="container mb-32 main_category">
          <FieldTitle className="animate">간편 신청</FieldTitle>

          <FieldBox>
            {categoryList.map((item, index) => (
              <Field key={index} className={category[index] && "active"} onClick={() => onClickCategory(index)}>
                <p>{item.title}</p>
                <img src={item.icon} alt="icon" />
              </Field>
            ))}
          </FieldBox>
        </div>
      </section>

      <section>
        {category[0] && (
          <form onSubmit={patentSubmit((e) => onSubmit(e, "patent"))}>
            <div className="container mb-32 sub_category">
              <FieldTitle className="animate">특허 상세 분류(선택)</FieldTitle>

              <FieldBox>
                {subCategoryList.map((category, index) => (
                  <PatentField
                    key={index}
                    className={subCategory === category.name && "active"}
                    onClick={() => onClickSubCategory(category.name)}
                  >
                    <p>{category.title}</p>
                    <img src={category.icon} alt="icon" />
                  </PatentField>
                ))}

                {patentErrors?.subCategory && (
                  <WarningMessageBox>
                    <WarningMessage>{patentErrors.subCategory.message}</WarningMessage>
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
                      </label>
                    </InputFileBox>
                  )}
                />
                {patentErrors?.patentFile && <WarningMessage>{patentErrors.patentFile.message}</WarningMessage>}
                <FileListBox>
                  {fileList.map((file, index) => (
                    <div key={"patent_" + index}>
                      <span>{file.name}</span>
                      <button onClick={() => onClickRemoveFile(index)}>X</button>
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
        {category[1] && (
          <form onSubmit={trademarkSubmit((e) => onSubmit(e, "trademark"))}>
            <div className="container mb-32 sub_category">
              <FieldTitle className="animate">상표 분류(선택)</FieldTitle>

              <FieldBox>
                {trademarkList.map((category, index) => (
                  <Field
                    key={index}
                    className={subCategory === category.name && "active"}
                    onClick={() => onClickSubCategory(category.name)}
                  >
                    <p>{category.title}</p>
                    <img src={category.icon} alt="icon" />
                  </Field>
                ))}
                {trademarkErrors?.subCategory && (
                  <WarningMessageBox>
                    <WarningMessage>{trademarkErrors.subCategory.message}</WarningMessage>
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

              <MatchingButton type="submit">매칭 신청하기</MatchingButton>
            </div>
          </form>
        )}
      </section>

      <section>
        {category[2] && (
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
                    <div key={"design_" + index}>
                      <span>{file.name}</span>
                      <button onClick={() => onClickRemoveFile(index)}>X</button>
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
        {category[3] && (
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
                    <div key={"etc_" + index}>
                      <span>{file.name}</span>
                      <button onClick={() => onClickRemoveFile(index)}>X</button>
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
