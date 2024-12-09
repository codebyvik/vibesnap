import { put, call } from "redux-saga/effects";
import { db, postsCollectionref } from "../../configs/firebase";
import { addDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { SagaIterator } from "redux-saga";
import {
  createPostSuccess,
  fetchAllMyPostsSuccess,
  fetchAllPostsFailed,
  postFailed,
} from "@/redux/post.redux";

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

export function* fetchAllMyPostsSaga(action: any): SagaIterator {
  const { uid } = action?.payload;
  try {
    const postsQuery = query(postsCollectionref, where("uid", "==", uid));
    const querySnapshot: any = yield call(getDocs, postsQuery);

    console.log({ querySnapshot });

    const posts = querySnapshot.docs.map((doc: any) => ({
      id: doc.id, // Document ID
      ...doc.data(), // Document data
    }));

    console.log("Fetched Posts:", posts);

    // Dispatch the success action with the posts
    yield put(fetchAllMyPostsSuccess(posts));
  } catch (error) {
    console.log("post error", error);

    yield put(fetchAllPostsFailed(error));
  }
}
