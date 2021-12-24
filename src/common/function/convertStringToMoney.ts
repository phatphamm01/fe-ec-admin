export const numberToMoneyVer2 = (num: any) => {
  if (num === 0) {
    return 0;
  }
  if (num) {
    return (((num as number).toFixed(0) + "") as string).replace(
      /(\d)(?=(\d{3})+(?!\d))/g,
      "$1,"
    );
  }
};

const numberToMoney = (num: number & { c?: number }): string => {
  const checkNaN = !num?.c || num === 0;

  return checkNaN ? "" : String(num).replace(/(.)(?=(\d{3})+$)/g, "$1,");
};
