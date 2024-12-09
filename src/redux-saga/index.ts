import { all } from "redux-saga/effects";
import authSagas from "./auth/auth.watchers";
import postSagas from "./posts/posts.watchers";

export default function* root() {
  yield all([authSagas(), postSagas()]);
}
