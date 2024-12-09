import { put, call, all } from "redux-saga/effects";
import { db, uploadFileToStorage } from "../../configs/firebase";
import { doc, setDoc } from "firebase/firestore";
import { SagaIterator } from "redux-saga";
import { createPostSuccess, postFailed } from "@/redux/post.redux";

export function* uploadFilesSaga(action: any): SagaIterator {
  try {
    const { text, files, uid } = action.payload;
    const fileUrls = yield all(files.map((file: any) => call(uploadFileToStorage, file)));

    const userDocRef = doc(db, "posts", uid);
    const data = {
      text,
      fileUrls,
      uid,
    };

    const response = yield call(() => setDoc(userDocRef, data));

    yield put(createPostSuccess(response));
  } catch (error) {
    yield put(postFailed(error));
  }
}
