const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  return `${year}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date}`;
};

const getTime = () => {
  const today = new Date();
  const hour = today.getHours();
  const minute = today.getMinutes();

  return `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`;
};

export const getTodayTime = () => {
  return `${getToday()} ${getTime()}`;
};

export const writedAtFormat = (date) => {
  //date가 오늘날짜면 시간만 표시, 아니면 날짜만 표시
  const targetDate = new Date(date);
  const today = new Date();
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth() + 1;
  const day = targetDate.getDate();

  if (today.getFullYear() === year && today.getMonth() + 1 === month && today.getDate() === day) {
    //오늘날짜 일때 시간만 표시 ex) 02:30 pm
    return timeFormat(date);
  } else {
    return `${year}.${month}.${day}`;
  }
};

export const dateFormat = (date) => {
  const targetDate = new Date(date);
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth() + 1;
  const day = targetDate.getDate();

  //요일 구하기
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = week[targetDate.getDay()];

  return `${year}년 ${month}월 ${day}일 ${dayOfWeek}요일`;
};

export const timeFormat = (date) => {
  const targetDate = new Date(date);
  const hour = targetDate.getHours();
  const minute = targetDate.getMinutes();

  const ampm = hour >= 12 ? "pm" : "am";
  const hour12 = hour % 12 ? hour % 12 : 12;
  const hour12Format = hour12 < 10 ? "0" + hour12 : hour12;
  const minuteFormat = minute < 10 ? "0" + minute : minute;
  return `${hour12Format}:${minuteFormat} ${ampm}`;
};

export const compareDate = (prev, next) => {
  const prevDate = new Date(prev);
  const nextDate = new Date(next);

  if (
    prevDate.getFullYear() === nextDate.getFullYear() &&
    prevDate.getMonth() === nextDate.getMonth() &&
    prevDate.getDate() === nextDate.getDate()
  ) {
    return true;
  } else {
    return false;
  }
};
