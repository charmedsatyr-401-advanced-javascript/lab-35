export const setHistory = payload => dispatch => dispatch(setHistorySync(payload));
const setHistorySync = payload => ({ type: 'SET-HISTORY', payload });
