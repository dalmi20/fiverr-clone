import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import newRequest from "../../utils/newRequest";
import Review from "../review/review"
import "./reviews.scss";
import Spinner from "../spinner/spinner";
const Reviews = ({ gigId }) => {

  const queryClient = useQueryClient()
  const { isLoading, error, data } = useQuery({
    queryKey: ["review"],
    queryFn: () =>
      newRequest.get(`/review/get/${gigId}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({// use mutation used to create,update,delete data in the db (cud)
    mutationFn: (review) => {
      return newRequest.post("/review/add", review);
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["review"])//Waiting for queries to become stale before they are fetched again doesn't always work, especially when you know for a fact that a query's data is out of date because of something the user has done. For that purpose, the QueryClient has an invalidateQueries method that lets you intelligently mark queries as stale and potentially refetch them too!
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ gigId, desc, star });
  };

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? <Spinner  />
        : error
        ? "Something went wrong!"
        : data.map((review) => <Review key={review._id} review={review} />)}
      <div className="add">
        <h3>Add a review</h3>
        <form action="" className="addForm" onSubmit={handleSubmit}>
          <input type="text" placeholder="write your opinion" />
          <select name="" id="">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;