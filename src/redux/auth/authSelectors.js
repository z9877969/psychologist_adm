export const selectIsAuth = (state) => Boolean(state.auth.token);
export const selectIsRefresh = (state) => state.auth.isRefresh;
