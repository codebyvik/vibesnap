import { put, call } from "redux-saga/effects";
import { db, postsCollectionref } from "../../configs/firebase";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { SagaIterator } from "redux-saga";
import {
  createPostSuccess,
  fetchAllMyPostsSuccess,
  fetchAllPostsFailed,
  fetchAllPostsSuccess,
  likePostSuccess,
  postActionError,
  postFailed,
  unlikePostSuccess,
} from "@/redux/post.redux";

export function* uploadFilesSaga(action: any): SagaIterator {
  const { text, files, uid, likes } = action.payload;
  try {
    const userRef = doc(db, "users", uid);

    const data = {
      text,
      files,
      userRef,
      likes,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
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

export function* fetchAllPostsSaga(): SagaIterator {
  try {
    const querySnapshot: any = yield call(getDocs, postsCollectionref);

    console.log({ querySnapshot });

    const posts = yield call(async () => {
      const postsWithUserDetails = [];

      for (const docSnapshot of querySnapshot.docs) {
        const postData = docSnapshot.data();

        // Access the userRef (reference to the user document)
        const userRef = postData.userRef;

        if (userRef) {
          // Fetch the user document using the userRef
          const userSnapshot = await getDoc(userRef);
          const userData: any = userSnapshot.data();

          // Extract specific fields (name, profilePicture) from user document
          const { name, profilePicture } = userData || {};

          // Add user fields to the post data
          postsWithUserDetails.push({
            id: docSnapshot.id, // Document ID
            ...postData, // Post data
            userName: name, // Add user name
            userProfilePicture: profilePicture, // Add user profile picture
          });
        } else {
          // If no userRef, just return the post data without user details
          postsWithUserDetails.push({
            id: docSnapshot.id,
            ...postData,
          });
        }
      }

      return postsWithUserDetails;
    });

    console.log("Fetched Posts:", posts);

    // Dispatch the success action with the posts
    yield put(fetchAllPostsSuccess(posts));
  } catch (error) {
    console.log("post error", error);

    yield put(fetchAllPostsFailed(error));
  }
}

export function* likePostSaga(action: any): SagaIterator {
  const { postId, uid } = action.payload; // Assuming postId and uid are passed in the action payload
  try {
    // Get a reference to the post document
    const postRef = doc(db, "posts", postId);

    // Update the likes array in Firestore
    yield call(() =>
      updateDoc(postRef, {
        likes: arrayUnion(uid), // Adds the uid to the likes array
      })
    );

    // Dispatch success action with the updated post ID
    yield put(likePostSuccess({ postId, uid }));
  } catch (error) {
    console.error("Error liking post:", error);
    yield put(postActionError(error));
  }
}

export function* unlikePostSaga(action: any): SagaIterator {
  const { postId, uid } = action.payload; // Assuming postId and uid are passed in the action payload
  try {
    // Get a reference to the post document
    const postRef = doc(db, "posts", postId);

    // Update the likes array in Firestore by removing the uid
    yield call(() =>
      updateDoc(postRef, {
        likes: arrayRemove(uid), // Adds the uid to the likes array
      })
    );

    // Dispatch success action with the updated post ID
    yield put(unlikePostSuccess({ postId, uid }));
  } catch (error) {
    console.error("Error unliking post:", error);
    yield put(postActionError(error));
  }
}
