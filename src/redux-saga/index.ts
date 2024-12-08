import { all } from "redux-saga/effects";
import authSagas from "./auth/auth.watchers";

export default function* root() {
  yield all([authSagas()]);
}
