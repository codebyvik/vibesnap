import { takeLatest } from "redux-saga/effects";

import { authRedux } from "../../redux/auth.redux";
import { fetchUserSaga, LoginSaga, signOutSaga } from "./auth.workers";

function* authSagas() {
  yield takeLatest(authRedux.actions.loginUser, LoginSaga);
  yield takeLatest(authRedux.actions.fetchUserData, fetchUserSaga);
  yield takeLatest(authRedux.actions.signOutUser, signOutSaga);
}

export default authSagas;
