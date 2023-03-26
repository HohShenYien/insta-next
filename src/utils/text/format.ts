export const formatReadMoreText = (text: string) => {
  return text.slice(0, 40) + (text.length > 40 ? "..." : "");
};
