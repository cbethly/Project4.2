import { useDispatch } from "react-redux";
import { deleteReviews } from "../../reducers/reviewSlice";
import "./reviewItem.css";

function ReviewItem({ review }) {
  const dispatch = useDispatch();
  const { user, text, createdAt } = review;

  return (
    <div className="review-item">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
        alt="Avatar"
        className="review-avatar"
      />

      <div>
        <div>
          <span className="review-username">{user.username}</span>
          <span className="review-timestamp">{createdAt}</span>
        </div>
        <div className="review-comment">{text}</div>
        <div>
          <button
            onClick={() => dispatch(deleteReviews(review._id))}
            className="review-delete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewItem;
