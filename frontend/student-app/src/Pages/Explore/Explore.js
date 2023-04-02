import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Reviews from "../Reviews/Reviews";
import ReviewItem from "../Reviews/reviewItem";
import { useSelector, useDispatch } from "react-redux";
import { getUserReviews, reset } from "../../reducers/reviewSlice";
import "./explore.css";

const Explore = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { reviews, isError, message } = useSelector((state) => state.reviews);

  const [projectDetails, setProjectDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getUserReviews());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const params = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:8000/api/project/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setProjectDetails(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
      });
  }, [params.id]);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1 className="title">{projectDetails.title}</h1>
          <p className="description">{projectDetails.description}</p>
          <a href={projectDetails.link} className="link">
            <p>{projectDetails.link}</p>
          </a>

          <p>{projectDetails.githubLink}</p>

          <iframe
            src={projectDetails.link}
            title={projectDetails.title}
          ></iframe>

          <Reviews />
          <section className="content">
            {reviews.length > 0 ? (
              <div className="reviews">
                {reviews.map((review) => (
                  <ReviewItem key={review._id} review={review} />
                ))}
              </div>
            ) : (
              <h3>You have not made any comments</h3>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default Explore;
