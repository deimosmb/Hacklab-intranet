export const allFilters = (payload) => {
  return {
    type: "ALL_FILTERS",
    payload,
  };
};

export const addFilter = (payload) => ({
  type: "ADD_FILTER",
  payload,
});

export const changeFilter = (filterType, payload) => ({
  type: "CHANGE_FILTER",
  filterType,
  payload,
});
