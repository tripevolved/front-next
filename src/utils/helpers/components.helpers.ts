const isValidObject = (obj: any) => {
  return obj && typeof obj === "object" && !Array.isArray(obj);
};

export const areChildrenLikeProperty = (children: any, ...property: string[]) => {
  if (!isValidObject(children)) return false;
  if (property.length === 0) return Boolean(children.children);
  for (const prop of property) {
    if (children[prop]) return true;
  }
  return false;
};
