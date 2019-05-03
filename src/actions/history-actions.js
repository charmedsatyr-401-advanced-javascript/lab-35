export const setHistory = payload => dispatch => dispatch(setHistorySync(payload));
const setHistorySync = payload => ({ type: 'SET-HISTORY', payload });

export const resetHistory = payload => dispatch => dispatch(resetHistorySync(payload));
const resetHistorySync = payload => ({type: 'RESET-HISTORY', payload});