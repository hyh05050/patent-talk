import PatentIcon from "../../../assets/images/patent.png";

export const categoryList = [
  {
    name: "patent",
    title: "특허/실용신안",
    icon: PatentIcon,
  },
  {
    name: "trademark",
    title: "상표",
    icon: PatentIcon,
  },
  {
    name: "design",
    title: "디자인",
    icon: PatentIcon,
  },
  {
    name: "etc",
    title: "기타",
    icon: PatentIcon,
  },
];

export const subCategoryList = [
  {
    name: "elec",
    title: "전기전자",
    icon: PatentIcon,
    items: ["전기소자", "전자회로", "전기통신 기술", "기타"],
  },
  {
    name: "machine",
    title: "기계",
    icon: PatentIcon,
    items: ["기관/펌프", "로봇", "조명/가열", "무기/폭파", "기타"],
  },
  {
    name: "chemistry",
    title: "화학",
    icon: PatentIcon,
    items: ["무기화학", "금속", "비료", "염료/페인트", "세제/왁스", "조합화학", "기타"],
  },
  {
    name: "physics",
    title: "물리",
    icon: PatentIcon,
    items: ["측정/시험", "광학", "신호/호출 시스템", "기타"],
  },
  {
    name: "it",
    title: "IT",
    icon: PatentIcon,
    items: ["인공지능", "빅데이터", "클라우드컴퓨팅", "사물인터넷", "블록체인", "융합서비스", "기타"],
  },
  {
    name: "life",
    title: "생활",
    icon: PatentIcon,
    items: ["농업", "식품", "개인/가정용품", "건강/놀이", "기타"],
  },
  {
    name: "bm",
    title: "BM",
    icon: PatentIcon,
    items: [],
  },
  {
    name: "others",
    title: "기타",
    icon: PatentIcon,
    items: [],
  },
];

export const trademarkList = [
  {
    name: "text",
    title: "문자 상표",
    icon: PatentIcon,
  },
  {
    name: "shape",
    title: "도형 상표",
    icon: PatentIcon,
  },
  {
    name: "unit",
    title: "결합 상표",
    icon: PatentIcon,
  },
  {
    name: "others",
    title: "기타",
    icon: PatentIcon,
  },
];
