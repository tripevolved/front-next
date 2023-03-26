export const toJson = <T = object>(data: any): T | null => {
  if (typeof data !== "string") return null;
  try {
    return JSON.parse(data);
  } catch (error) {
    return null;
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
