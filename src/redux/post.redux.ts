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
    postArray: null,
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

    fetchAllPosts: (state) => {
      state.allPosts.isfetching = true;
    },
    fetchAllPostsSuccess: (state, action) => {
      state.allPosts.isfetching = false;
      state.allPosts.postArray = action?.payload;
    },
    fetchAllPostsFailed: (state, action) => {
      state.allPosts.isfetching = false;
      state.allPosts.error = action?.payload;
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
  resetPostsState,
} = postRedux.actions;

export default postRedux.reducer;
