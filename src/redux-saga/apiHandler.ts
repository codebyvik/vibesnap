import { call, put } from "redux-saga/effects";
import { RESPONSE_STATUS_CODE } from "../constants/api.constants";
// import { logoutUser } from "../redux/auth-redux/authRedux";

import { SagaIterator } from "redux-saga";

/**
 * Generic handler for API calls in sagas.
 * @param apiFn - The API function to call.
 * @param payload - The payload for the API call.
 * @param successAction - The success action creator.
 * @param errorAction - The error action.
 */

export function* handleApiCall(
  apiFn: (payload: any) => Promise<any>,
  payload: any,
  successAction: (data: any) => any,
  errorAction: (data?: any) => any
): SagaIterator {
  try {
    const response = yield call(apiFn, payload);
    console.log({ response });

    if (
      response.status === RESPONSE_STATUS_CODE.success ||
      response.status === RESPONSE_STATUS_CODE.createdSuccessfully
    ) {
      yield put(successAction(response.data));
    } else if (
      response.status === RESPONSE_STATUS_CODE.accessDenied ||
      response.status === RESPONSE_STATUS_CODE.unAuthorized ||
      !response.status
    ) {
      // yield put(logoutUser({ message: "Token Expired! Please login again" }));
    } else {
      // const errorMessage = response?.data?.message || "An error occurred!";

      yield put(errorAction());
    }
  } catch (error: any) {
    console.log({ error });
    if (!error?.response) {
      // yield put(logoutUser({ message: "Token Expired! Please login again" }));
    } else {
      // const errorMessage = error?.response?.data?.message || error?.message || "An error occurred!";
    }

    yield put(errorAction(error));
  }
}
