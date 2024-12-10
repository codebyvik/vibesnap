import { takeLatest } from "redux-saga/effects";

import {
  fetchAllMyPostsSaga,
  fetchAllPostsSaga,
  likePostSaga,
  unlikePostSaga,
  uploadFilesSaga,
} from "./posts.workers";
import { postRedux } from "@/redux/post.redux";

function* postSagas() {
  yield takeLatest(postRedux.actions.createPost, uploadFilesSaga);
  yield takeLatest(postRedux.actions.fetchAllMyPosts, fetchAllMyPostsSaga);
  yield takeLatest(postRedux.actions.fetchAllPosts, fetchAllPostsSaga);
  yield takeLatest(postRedux.actions.likePost, likePostSaga);
  yield takeLatest(postRedux.actions.unlikePost, unlikePostSaga);
}

export default postSagas;
