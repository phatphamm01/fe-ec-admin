const checkNullObject = (object: any) => {
  if (object) {
    let isCheck = Object.keys(object).length === 0;
    return isCheck;
  }
  return true;
};

export default checkNullObject;
