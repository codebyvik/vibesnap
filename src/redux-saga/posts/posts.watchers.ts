import { takeLatest } from "redux-saga/effects";

import { uploadFilesSaga } from "./posts.workers";
import { postRedux } from "@/redux/post.redux";

function* postSagas() {
  yield takeLatest(postRedux.actions.createPost, uploadFilesSaga);
}

export default postSagas;
