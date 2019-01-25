const changeCase = require('change-case');

const prepareFieldName = (message) => {
  const elements = message.split('"');
  return `${changeCase.titleCase(elements[1])}${elements[2]}`;
};

const formatValidationErrors = (errors) => {
  const errorsObj = {};
  for (const error of errors) {
    if (error['field'].length === 1) {
      errorsObj[error['field'][0]] = [prepareFieldName(error['messages'][0])];
    } else {
      const fieldName = error['field'].join('.');
      errorsObj[fieldName] = [prepareFieldName(error['messages'][0])];
    }
  }
  return errorsObj;
};

module.exports = {
  formatValidationErrors
};
