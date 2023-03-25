export const toJson = (data: any): object => {
  if (typeof data !== "string") return {};
  try {
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
};

export const isValidToJson = (data: any) => {
  try {
    JSON.parse(data);
    return true;
  } catch (error) {
    return false;
  }
}

export const jsonToString = (data: any) => {
  if (typeof data !== "object") return "";
  return JSON.stringify(data, null, 2);
}
