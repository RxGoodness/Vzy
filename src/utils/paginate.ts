export const paginateArray = (
  main_array: any[],
  page: number,
  limit: number
) => {
  const startIndex = (page - 1) * limit;

  const paginatedData = main_array.slice(startIndex, startIndex + limit);

  return paginatedData;
};
