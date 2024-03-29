import BmIcon from "../../../assets/images/ic_bm.jpeg";
import DesignIcon from "../../../assets/images/ic_design.jpeg";
import EtcIcon from "../../../assets/images/ic_etc.jpeg";
import MarkIcon from "../../../assets/images/ic_mark.jpeg";
import PatentIcon from "../../../assets/images/ic_patent.jpeg";

const patentList = [
  {
    name: "elec",
    title: "전기전자",
    icon: PatentIcon,
    typeList: ["전기소자", "전자회로", "전기통신 기술", "기타"],
  },
  {
    name: "machine",
    title: "기계",
    icon: PatentIcon,
    typeList: ["기관/펌프", "로봇", "조명/가열", "무기/폭파", "기타"],
  },
  {
    name: "chemistry",
    title: "화학",
    icon: PatentIcon,
    typeList: ["무기화학", "금속", "비료", "염료/페인트", "세제/왁스", "조합화학", "기타"],
  },
  {
    name: "physics",
    title: "물리",
    icon: PatentIcon,
    typeList: ["측정/시험", "광학", "신호/호출 시스템", "기타"],
  },
  {
    name: "it",
    title: "IT",
    icon: PatentIcon,
    typeList: ["인공지능", "빅데이터", "클라우드컴퓨팅", "사물인터넷", "블록체인", "융합서비스", "기타"],
  },
  {
    name: "life",
    title: "생활",
    icon: PatentIcon,
    typeList: ["농업", "식품", "개인/가정용품", "건강/놀이", "기타"],
  },
  {
    name: "bm",
    title: "BM",
    icon: BmIcon,
    typeList: ["중개업", "광고", "제휴", "커뮤니티", "O2O", "지식서비스", "게임", "플랫폼"],
  },
  {
    name: "others",
    title: "기타",
    icon: PatentIcon,
    typeList: [],
  },
];

const trademarkList = [
  {
    name: "text",
    title: "문자 상표",
    icon: MarkIcon,
  },
  {
    name: "shape",
    title: "도형 상표",
    icon: DesignIcon,
  },
  {
    name: "unit",
    title: "결합 상표",
    icon: MarkIcon,
  },
  {
    name: "others",
    title: "기타",
    icon: DesignIcon,
  },
];

export const categoryList = [
  {
    name: "patent",
    title: "특허/실용신안",
    icon: PatentIcon,
    typeList: patentList,
  },
  {
    name: "trademark",
    title: "상표",
    icon: MarkIcon,
    typeList: trademarkList,
  },
  {
    name: "design",
    title: "디자인",
    icon: DesignIcon,
    typeList: [],
  },
  {
    name: "etc",
    title: "기타",
    icon: EtcIcon,
    typeList: [],
  },
];

export const convertCodeToText = (type, depth) => {
  let result = "기타";
  if (depth === "main") {
    const item = categoryList.find((item) => item.name === type);
    result = item ? item.title : result;
  } else if (depth === "sub") {
    const item = patentList.find((item) => item.name === type);
    result = item ? item.title : result;
  }

  return result;
};
