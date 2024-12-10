import { takeLatest } from "redux-saga/effects";

import { fetchAllMyPostsSaga, fetchAllPostsSaga, uploadFilesSaga } from "./posts.workers";
import { postRedux } from "@/redux/post.redux";

function* postSagas() {
  yield takeLatest(postRedux.actions.createPost, uploadFilesSaga);
  yield takeLatest(postRedux.actions.fetchAllMyPosts, fetchAllMyPostsSaga);
  yield takeLatest(postRedux.actions.fetchAllPosts, fetchAllPostsSaga);
}

export default postSagas;
