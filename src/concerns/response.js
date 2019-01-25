const _ = require('lodash');

module.exports = (res) => {
  const statuses = require('./statuses');

  /**
   * Returns a json response with the given input
   *
   * @param response (string || object)
   * @returns {*}
   */
  const json = (response) => {
    if (res) {
      return res.status(response.status).json(response);
    } else {
      return response;
    }
  };

  /**
   * Returns a json positive response, which respects a default format.
   * Receives data and code
   *
   * @param data (string || object)
   * @param code (int)
   * @returns {*}
   */
  const respond = (data, code) => {
    return json({
      errors: null,
      data: data,
      status: code,
      statusText: statuses[code]
    });
  };

  /**
   * Returns a json errors response, respecting a default format.
   * Receives errors and code
   *
   * @param errors (object || array)
   * @param code (int)
   * @returns {*}
   */
  const errors = (errors, code) => {
    return json({
      errors: errors,
      data: null,
      status: code,
      statusText: statuses[code]
    });
  };

  /**
   * Returns a json single error response, respecting a default format.
   * Receives error and code
   *
   * @param error (string || object with message)
   * @param code (int)
   * @returns {*}
   */
  const singleError = (error, code) => {
    if (typeof(error) !== 'string') {
      return errors(error, code ? code : 422);
    } else {
      return errors({
        general: [
          error
        ]
      }, code ? code : 422);
    }
  };

  /**
   * Returns an OK response
   *
   * @param code (int)
   * @returns {*}
   */
  const ok = (code) => {
    return respond(null, code ? code : 200);
  };

  /**
   * Returns an unauthorized response
   *
   * @param error (string || object with message)
   * @param code (int)
   * @returns {*}
   */
  const unauthorized = (error, code) => {
    return singleError(error, code ? code : 401);
  };

  /**
   * Returns an forbidden response
   *
   * @param error (string || object with message)
   * @param code (int)
   * @returns {*}
   */
  const forbidden = (error, code) => {
    return singleError(error, code ? code : 403);
  };

  /**
   * Returns a not found response
   *
   * @param error (string || object with message)
   * @param code (int)
   * @returns {*}
   */
  const notFound = (error, code) => {
    return singleError(error, code ? code : 404);
  };

  /**
   * Returns an internal server error response
   *
   * @param error (string || object with message)
   * @param code (int)
   * @returns {*}
   */
  const internalError = (error, code) => {
    return singleError(error, code ? code : 500);
  };

  /**
   * Returns a response with the data collection, respecting a default format
   *
   * @param data
   * @param transformer (optional)
   * @param code (optional)
   * @returns {*}
   */
  const collection = (data, transformer, code) => {
    return respond(transformer ? _.map(data, transformer) : data, code ? code : 200);
  };

  /**
   * Returns a response with an item, respecting a default format
   *
   * @param data
   * @param transformer (optional)
   * @param code (optional)
   * @param extraData
   * @returns {*}
   */
  const item = (data, transformer, code, extraData) => {
    let responseData = {};
    if (transformer) {
      responseData = { ...transformer(data), ...extraData };
    } else {
      responseData = data;
    }
    return respond(responseData, code ? code : 200);
  };

  return {
    collection,
    item,
    ok,
    error: singleError,
    unauthorized,
    forbidden,
    notFound,
    internalError
  };
};
