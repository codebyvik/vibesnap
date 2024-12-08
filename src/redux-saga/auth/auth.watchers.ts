import { takeLatest } from "redux-saga/effects";

import { authRedux } from "../../redux/auth.redux";
import { fetchUserSaga, LoginSaga } from "./auth.workers";

function* authSagas() {
  yield takeLatest(authRedux.actions.loginUser, LoginSaga);
  yield takeLatest(authRedux.actions.fetchUserData, fetchUserSaga);
}

export default authSagas;
