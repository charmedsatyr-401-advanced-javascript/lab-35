export const updateFormData = payload => dispatch => dispatch(updateFormDataSync(payload));

const updateFormDataSync = payload => ({ type: 'UPDATE-FORM-DATA', payload });
