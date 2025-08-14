export const responseHandler = (res, data = null, message = "", success = true) => {
  res.json({
    success,
    message,
    data,
  });
};
