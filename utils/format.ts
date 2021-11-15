import dayjs from "dayjs";

/**
 * @example
 * () => ""
 * (2021/11/11) => "11 Nov 2021"
 * (2021-11-11T00:00:00.000Z) => "11 Nov 2021"
 */
const formatTime = (time?: Date | string | number) => {
  if (!time) return "";

  return dayjs(time).format("DD MMM YYYY");
};

export { formatTime };
