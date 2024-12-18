import { createSlice } from "@reduxjs/toolkit";

const initialPostsState = {
  post: {
    isLoading: false,
    isfetching: false,
    postDetails: null,
    error: null,
    success: false,
  },
  allPosts: {
    isLoading: false,
    isfetching: false,
    postArray: [],
    error: null,
    success: false,
    myPostsArray: null,
    lastVisible: 0,
    hasMore: false,
  },
  postActions: {
    isLoading: false,
    isfetching: false,
    error: null,
    success: false,
  },
};

export const postRedux = createSlice({
  name: "postRedux",
  initialState: initialPostsState,
  reducers: {
    createPost: (state, _action) => {
      state.post.isLoading = true;
    },
    createPostSuccess: (state, action) => {
      state.post.isLoading = false;
      state.post.isfetching = false;
      state.post.postDetails = action?.payload;
      state.post.success = true;
    },
    postFailed: (state, action) => {
      state.post.isLoading = false;
      state.post.error = action?.payload?.data;
    },

    fetchPostByID: (state) => {
      state.post.isfetching = true;
    },
    fetchPostByIDSuccess: (state, action) => {
      state.post.isfetching = true;
      state.post.postDetails = action?.payload;
    },

    fetchAllMyPosts: (state, _action) => {
      state.allPosts.isfetching = true;
      state.allPosts.postArray = [];
    },
    fetchAllMyPostsSuccess: (state, action) => {
      state.allPosts.isfetching = false;
      state.allPosts.myPostsArray = action?.payload;
    },
    fetchAllPosts: (state, _action) => {
      state.allPosts.isfetching = true;
    },
    fetchAllPostsSuccess: (state: any, action) => {
      state.allPosts.isfetching = false;
      state.allPosts.postArray = [...state.allPosts.postArray, ...action?.payload?.posts];
      state.allPosts.lastVisible = action?.payload?.lastVisible;
      state.allPosts.hasMore = action?.payload?.hasMore;
    },
    fetchAllPostsFailed: (state, action) => {
      state.allPosts.isfetching = false;
      state.allPosts.error = action?.payload;
    },

    likePost: (state, _action) => {
      state.postActions.isLoading = true;
      state.postActions.success = false;
    },
    likePostSuccess: (state, _action) => {
      state.postActions.isLoading = false;
      state.postActions.success = true;
    },

    unlikePost: (state, _action) => {
      state.postActions.isLoading = true;
      state.postActions.success = false;
    },
    unlikePostSuccess: (state, _action) => {
      state.postActions.isLoading = false;
      state.postActions.success = true;
    },

    postActionError: (state, action) => {
      state.postActions.error = action?.payload;
      state.postActions.isfetching = false;
      state.postActions.isLoading = false;
    },

    resetPostsState: () => initialPostsState,
  },
});

export const {
  createPost,
  createPostSuccess,
  postFailed,
  fetchPostByID,
  fetchPostByIDSuccess,
  fetchAllPosts,
  fetchAllPostsSuccess,
  fetchAllPostsFailed,
  fetchAllMyPosts,
  fetchAllMyPostsSuccess,
  resetPostsState,
  likePost,
  likePostSuccess,
  unlikePost,
  unlikePostSuccess,
  postActionError,
} = postRedux.actions;

export default postRedux.reducer;
