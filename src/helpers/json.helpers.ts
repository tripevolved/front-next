export const toJson = (data: any) => {
  if (typeof data !== "string") return {};
  try {
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
};
