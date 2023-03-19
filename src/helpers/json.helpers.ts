export const toJson = (data: any): object => {
  if (typeof data !== "string") return {};
  try {
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
};

export const jsonToString = (data: any) => {
  if (typeof data !== "object") return "";
  return JSON.stringify(data);
}
