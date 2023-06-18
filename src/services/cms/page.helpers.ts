export const isEmptyChildren = (children?: any) => {
  if (!children) return true;
  if (Array.isArray(children) && children.length === 0) return true;
  if (typeof children === "string") return false;
  if (typeof children !== "object") return true;
  return Object.keys(children).length === 0;
}
