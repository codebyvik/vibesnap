import { put, call, take } from "redux-saga/effects";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../../configs/firebase";
import {
  loginFailure,
  loginSuccess,
  resetAuthState,
  signOutUserSuccess,
} from "../../redux/auth.redux";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { SagaIterator, eventChannel } from "redux-saga";
import { setLocalStorageItem } from "@/utils/localstorage";

export function* LoginSaga(): SagaIterator {
  try {
    const response = yield call(signInWithPopup, auth, provider);

    const user = response?.user;

    const userData = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      profilePicture: user.photoURL,
    };

    const userDocRef = doc(db, "users", user.uid);

    yield call(() => setDoc(userDocRef, userData));

    setLocalStorageItem("welcomeMessageShowed", false);

    yield put(loginSuccess(userData));
  } catch (error) {
    // const errorMessage = error?.response?.data?.message || "An error occurred!";
    console.error("Google Login Error:", error);
    yield put(loginFailure(error));
  }
}

// Helper function
function onAuthStateChangedChannel(auth: any) {
  return eventChannel((emit) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      emit(user);
    });

    return unsubscribe;
  });
}

export function* fetchUserSaga(): SagaIterator {
  try {
    const userChannel = yield call(onAuthStateChangedChannel, auth);

    const user = yield take(userChannel);

    if (user) {
      // Fetch user data from Firestore
      const userDoc = yield call(getDoc, doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        // Save the user data in Redux
        yield put(loginSuccess(userData));
      }
    } else {
      // Reset Redux state if no user is signed in
      yield put(resetAuthState());
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

export function* signOutSaga(): SagaIterator {
  try {
    yield call(signOut, auth);
    localStorage.clear();
    yield put(signOutUserSuccess());
  } catch (error) {
    console.error("Error signing out :", error);
  }
}
