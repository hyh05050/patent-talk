import React from "react";
import styled from "styled-components";
import PatentIcon from "../../../assets/images/patent.png";
import { useParams } from "react-router-dom";

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

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.07) 8px 8px 24px 0px;
  }

  @media (min-width: 961px) {
    &:nth-child(4n) {
      margin-right: 0;
    }
  }

  @media (max-width: 960px) {
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

    @media (max-width: 960px) {
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

    @media (max-width: 960px) {
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

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.07) 8px 8px 24px 0px;
  }

  @media (min-width: 961px) {
    &:nth-child(5n) {
      margin-right: 0;
    }
  }

  @media (max-width: 960px) {
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

    @media (max-width: 960px) {
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

    @media (max-width: 960px) {
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
    cursor: pointer;
  }

  label.file_label {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

const Contents = () => {
  const { field } = useParams();

  return (
    <main>
      <section>
        <div className="container mb-32">
          <FieldTitle className="animate">간편 신청</FieldTitle>

          <FieldBox>
            <Field>
              <p>특허</p>
              <img src={PatentIcon} alt="icon" />
            </Field>
            <Field>
              <p>디자인</p>
              <img src={PatentIcon} alt="icon" />
            </Field>
            <Field>
              <p>상표</p>
              <img src={PatentIcon} alt="icon" />
            </Field>
            <Field>
              <p>기타</p>
              <img src={PatentIcon} alt="icon" />
            </Field>
          </FieldBox>
        </div>
      </section>

      <section>
        <div className="container mb-32">
          <FieldTitle className="animate">특허 상세 분류(선택)</FieldTitle>

          <FieldBox>
            <PatentField>
              <p>전기전자</p>
              <img src={PatentIcon} alt="icon" />
            </PatentField>
            <PatentField>
              <p>기계</p>
              <img src={PatentIcon} alt="icon" />
            </PatentField>
            <PatentField>
              <p>화학</p>
              <img src={PatentIcon} alt="icon" />
            </PatentField>
            <PatentField>
              <p>물리</p>
              <img src={PatentIcon} alt="icon" />
            </PatentField>
            <PatentField>
              <p>IT</p>
              <img src={PatentIcon} alt="icon" />
            </PatentField>
            <PatentField>
              <p>생활</p>
              <img src={PatentIcon} alt="icon" />
            </PatentField>
            <PatentField>
              <p>BM</p>
              <img src={PatentIcon} alt="icon" />
            </PatentField>
            <PatentField>
              <p>기타</p>
              <img src={PatentIcon} alt="icon" />
            </PatentField>
          </FieldBox>

          <InputField>
            <label>특허 상세 정보</label>
            <textarea placeholder="특허 정보를 입력해주세요."></textarea>
          </InputField>

          <InputField>
            <label>추가 자료</label>
            <input type="file" placeholder="특허명을 입력해주세요."></input>
          </InputField>
        </div>
      </section>

      <section>
        <div className="container mb-32">
          <FieldTitle className="animate">상표 (선택)</FieldTitle>

          <FieldBox>
            <Field>
              <p>문자 상표</p>
              <img src={PatentIcon} alt="icon" />
            </Field>
            <Field>
              <p>도형 상표</p>
              <img src={PatentIcon} alt="icon" />
            </Field>
            <Field>
              <p>결합 상표</p>
              <img src={PatentIcon} alt="icon" />
            </Field>
            <Field>
              <p>기타</p>
              <img src={PatentIcon} alt="icon" />
            </Field>
          </FieldBox>

          <InputField>
            <label>상표명</label>
            <input type="text" placeholder="상표명을 입력해주세요."></input>
          </InputField>

          <InputField>
            <label>키워드 입력</label>
            <input type="file" placeholder="상표명을 입력해주세요."></input>
          </InputField>

          <InputField>
            <label>상표 상세 정보</label>
            <textarea placeholder="상표 정보를 입력해주세요."></textarea>
          </InputField>
        </div>
      </section>

      <section>
        <div className="container mb-32">
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
            <label>물품 사진 또는 도면</label>
            <InputFileBox>
              <input type="file" id="designFile" placeholder="특허명을 입력해주세요."></input>
              <label className="file_label" htmlFor="designFile">
                파일 선택
              </label>
            </InputFileBox>
          </InputField>
        </div>
      </section>
    </main>
  );
};

export default Contents;
