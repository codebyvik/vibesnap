export const RESPONSE_STATUS_CODE = {
  success: 200, // success
  createdSuccessfully: 201, // create success
  badRequest: 400, // if any field is missing , mismatch dataType etc
  unAuthorized: 401, // access based module
  accessDenied: 403, // if token is expired
  serverError: 500, // when backend crashes
};
