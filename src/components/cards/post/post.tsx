interface iPostProps {
  postDetails: any;
}

const Post = ({ postDetails }: iPostProps) => {
  return (
    <div className="">
      <div>
        <img src={`${postDetails?.userProfilePicture?.public_url}`} alt="" />
        <h6>Hello</h6>
      </div>
    </div>
  );
};

export default Post;
