import { takeLatest } from "redux-saga/effects";

import { authRedux } from "../../redux/auth.redux";
import { fetchUserSaga, LoginSaga, signOutSaga, updateProfileSaga } from "./auth.workers";

function* authSagas() {
  yield takeLatest(authRedux.actions.loginUser, LoginSaga);
  yield takeLatest(authRedux.actions.fetchUserData, fetchUserSaga);
  yield takeLatest(authRedux.actions.signOutUser, signOutSaga);
  yield takeLatest(authRedux.actions.updateProfile, updateProfileSaga);
}

export default authSagas;
