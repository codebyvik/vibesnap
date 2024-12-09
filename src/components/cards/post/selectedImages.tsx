import { useState } from "react";
import ReactSwipe from "react-swipe";
import "./post.style.css";
const SelectedImages = ({ images }: any) => {
  let reactSwipeEl: any;

  const RenderImages = ({ imageFile }: any) => {
    const [imagePreview, setImagePreview] = useState<any>(null);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(imageFile);

    return <img className="selected-image" src={imagePreview} alt="selected-Image" />;
  };

  return (
    <div>
      <ReactSwipe
        className="carousel "
        swipeOptions={{ continuous: false }}
        ref={(el) => (reactSwipeEl = el)}
        childCount={images?.length}
      >
        {images?.length &&
          images?.map((item: any, idx: any) => <RenderImages key={idx} imageFile={item} />)}
      </ReactSwipe>
      <button onClick={() => reactSwipeEl.next()}>Next</button>
      <button onClick={() => reactSwipeEl.prev()}>Previous</button>
    </div>
  );
};

export default SelectedImages;
