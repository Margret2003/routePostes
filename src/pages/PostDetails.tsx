import axios from "axios";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { createdContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import PostSkeleton from "../components/loders/PostSkeleton";
import PostCard from "../components/posts/PostCard";
import Comment from "../components/Comment";

export default function PostDetails() {
  const { token } = useContext(createdContext);
  const { id } = useParams();

  function getSinglePost() {
    return axios.get(`https://route-posts.routemisr.com/posts/${id}`, {
      headers: { token: token },
    });
  }
  function getPostComments() {
    return axios.get(
      `https://route-posts.routemisr.com/posts/${id}/comments?page=1&limit=10`,
      {
        headers: { token: token },
      },
    );
  }

  const {
    data: commentData,
    isLoading: commentIsLoading,
    isError: commentIsError,
  } = useQuery({
    queryFn: getPostComments,
    queryKey: ["comment", id],
  });

  console.log(commentData);

  const { data, isFetching, isLoading, isError } = useQuery({
    queryFn: getSinglePost,
    queryKey: ["post", id],
    gcTime: 1000 * 60 * 3,
  });

  if (isLoading) {
    return <PostSkeleton />;
  }
  if (isError) {
    return <h1>errrror</h1>;
  }

  return (
    // انا لما برندر البوست هنا ببعتلة الكومنتات لو موجوده لكن في الهوم بعرض البوست بس
    <>
      <PostCard
        post={data?.data.data.post} 
        comments={commentData?.data.data.comments}
      />
      {/* {commentData?.data.data.comments.map((comment, index) => (
        <Comment comment={comment} />
      ))} */}
    </>
  );
}
