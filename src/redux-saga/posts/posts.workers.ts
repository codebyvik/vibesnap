import { put, call } from "redux-saga/effects";
import { postsCollectionref } from "../../configs/firebase";
import { addDoc } from "firebase/firestore";
import { SagaIterator } from "redux-saga";
import { createPostSuccess, postFailed } from "@/redux/post.redux";

export function* uploadFilesSaga(action: any): SagaIterator {
  const { text, files, uid } = action.payload;
  try {
    const data = {
      text,
      files,
      uid,
    };

    const response = yield call(() => addDoc(postsCollectionref, data));

    yield put(createPostSuccess(response));
  } catch (error) {
    console.log("post error", error);

    yield put(postFailed(error));
  }
}
