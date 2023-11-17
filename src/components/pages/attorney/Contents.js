import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { categoryList, trademarkList, subCategoryList } from "./Category";
import { useEffect } from "react";

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
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #757575;
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

const Contents = () => {
  const { field } = useParams();
  const [category, setCategory] = useState([false, false, false, false]);
  const [subCategory, setSubCategory] = useState(null);
  const [fileList, setFileList] = useState([]);

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

  const onClickCategory = (trueIndex) => {
    const categoryFlag = Array.from({ length: 4 }, (_, index) => index === trueIndex);
    setFileList([]);
    setSubCategory(null);
    setCategory(categoryFlag);
  };

  const onClickSubCategory = (category) => {
    setSubCategory(category);
  };

  const onChangeFile = (e) => {
    if (fileList.length + e.target.files.length > 5) {
      alert("파일은 5개까지만 업로드 가능합니다.");
      return;
    }
    const files = e.target.files;
    setFileList([...fileList, ...files]);
  };

  const onClickRemoveFile = (index) => {
    const newFileList = fileList.filter((_, fileIndex) => fileIndex !== index);
    setFileList(newFileList);
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
            </FieldBox>

            <InputField>
              <label>특허 상세 정보</label>
              <textarea placeholder="특허 정보를 입력해주세요."></textarea>
            </InputField>

            <InputField>
              <label>추가 자료 (최대 5개)</label>

              <InputFileBox>
                <input
                  type="file"
                  id="patentFile"
                  placeholder="특허 파일을 등록해주세요."
                  onChange={onChangeFile}
                  multiple
                />
                <label className="file_label" htmlFor="patentFile">
                  특허 파일을 등록해주세요.
                </label>
              </InputFileBox>
              <FileListBox>
                {fileList.map((file, index) => (
                  <div key={"patent_" + index}>
                    <span>{file.name}</span>
                    <button onClick={() => onClickRemoveFile(index)}>X</button>
                  </div>
                ))}
              </FileListBox>
            </InputField>
          </div>
        )}
      </section>

      <section>
        {category[1] && (
          <div className="container mb-32 sub_category">
            <FieldTitle className="animate">상표 (선택)</FieldTitle>

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
            </FieldBox>

            <InputField>
              <label>상표명</label>
              <input type="text" placeholder="상표명을 입력해주세요."></input>
            </InputField>

            <InputField>
              <label>키워드 입력 (최대 5개)</label>
              <input type="text" placeholder="','로 키워드를 구분해서 입력해주세요."></input>
            </InputField>

            <InputField>
              <label>상표 상세 정보</label>
              <textarea placeholder="상표 정보를 입력해주세요."></textarea>
            </InputField>
          </div>
        )}
      </section>

      <section>
        {category[2] && (
          <div className="container mb-32 sub_category">
            <FieldTitle className="animate">디자인 (선택)</FieldTitle>

            <InputField>
              <label>물품 명칭</label>
              <input type="text" placeholder="물품명을 입력해주세요."></input>
            </InputField>

            <InputField>
              <label>물품 상세 정보</label>
              <textarea placeholder="물품 정보를 입력해주세요."></textarea>
            </InputField>

            <InputField>
              <label>물품 사진 또는 도면 (최대 5개)</label>
              <InputFileBox>
                <input
                  type="file"
                  id="designFile"
                  placeholder="물품 자료를 등록해주세요."
                  onChange={onChangeFile}
                  multiple
                />
                <label className="file_label" htmlFor="designFile">
                  물품 자료를 등록해주세요.
                </label>
              </InputFileBox>
              <FileListBox>
                {fileList.map((file, index) => (
                  <div key={"design_" + index}>
                    <span>{file.name}</span>
                    <button onClick={() => onClickRemoveFile(index)}>X</button>
                  </div>
                ))}
              </FileListBox>
            </InputField>
          </div>
        )}
      </section>

      <section>
        {category[3] && (
          <div className="container mb-32 sub_category">
            <FieldTitle className="animate">기타</FieldTitle>

            <InputField>
              <label>기타 상세 정보</label>
              <textarea placeholder="기타 정보를 입력해주세요."></textarea>
            </InputField>

            <InputField>
              <label>추가 자료 (최대 5개)</label>

              <InputFileBox>
                <input
                  type="file"
                  id="etcFile"
                  placeholder="기타 자료를 등록해주세요."
                  onChange={onChangeFile}
                  multiple
                ></input>
                <label className="file_label" htmlFor="etcFile">
                  기타 자료를 등록해주세요.
                </label>
              </InputFileBox>
              <FileListBox>
                {fileList.map((file, index) => (
                  <div key={"etc_" + index}>
                    <span>{file.name}</span>
                    <button onClick={() => onClickRemoveFile(index)}>X</button>
                  </div>
                ))}
              </FileListBox>
            </InputField>
          </div>
        )}
      </section>
    </main>
  );
};

export default Contents;
