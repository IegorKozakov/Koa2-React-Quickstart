/**
 * Error handler is a global middleware, which we use for error handling.
 * Every error will be send to the frontend as:
 * {
 *     status: StatusCode,
 *     message: errorMessage
 * }
 * @param error
 * @param ctx
 * @returns {Promise.<void>}
 */
const errorHandler = async (error, ctx) => {
  ctx.status = error._statusCode || 400;

  ctx.body = {
    status: error._statusCode || 400,
    message: error.message
  }
};

export default errorHandler