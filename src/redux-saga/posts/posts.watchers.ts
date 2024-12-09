import { takeLatest } from "redux-saga/effects";

import { fetchAllMyPostsSaga, uploadFilesSaga } from "./posts.workers";
import { postRedux } from "@/redux/post.redux";

function* postSagas() {
  yield takeLatest(postRedux.actions.createPost, uploadFilesSaga);
  yield takeLatest(postRedux.actions.fetchAllMyPosts, fetchAllMyPostsSaga);
}

export default postSagas;
