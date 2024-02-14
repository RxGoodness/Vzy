export const genCode = (length = 6) => {
  return Math.random()
    .toString()
    .substring(2, length + 2);
};
