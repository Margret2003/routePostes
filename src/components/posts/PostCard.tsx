import React, { useContext, useState } from 'react'

import { FiHeart, FiMessageCircle, FiShare2, FiUser } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import { date } from "zod/v4";
import type { PostType } from '../../types/PostType';
import Comment from "../Comment"
import { IoIosSend } from "react-icons/io";
import axios from 'axios';
import { createdContext } from '../../context/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Spinner, toast } from "@heroui/react";
import { Button, Dropdown, Label } from "@heroui/react";
import { BsThreeDots } from "react-icons/bs";

interface postCardProps {
  post: PostType;
  comments?: any[];
}

export default function PostCard({ post, comments }: postCardProps) {
  const { token, userId } = useContext(createdContext);
  const [commentInput, setcommentInput] = useState("");
  const queryClient = useQueryClient();
  const nav = useNavigate()
  

  
  
  //   const {mutate : mutateUpdate}= useMutation({
  //     mutationFn: updatePost, 
  //     onSuccess: function () {
  //       toast.success("post updated sucessfully")
  //     }
     
  //  })

  function sendComment() {
    let commentData = {
      content: commentInput,
    };

    return axios.post(
      `https://route-posts.routemisr.com/posts/${post.id}/comments`,
      commentData,
      { headers: { token: token } },
    );
  }
  const [isLiked, setisLiked] = useState(false)

  console.log(post)
  function likePost() {
    
    return axios.put(`https://route-posts.routemisr.com/posts/${post.id}/like`,{}, {
      headers : {token : token}
    });
  }
  const { mutate: mutateLikePost } = useMutation({
    mutationFn: likePost, 
    
    onSuccess: function () {
          
      queryClient.invalidateQueries({ queryKey: ["allPosts"] });
      setisLiked(true)
    }

    })

  const { isPending, isError, mutate } = useMutation({
    mutationFn: sendComment,
    onSuccess: function () {
      setcommentInput("");

      queryClient.invalidateQueries({ queryKey: ["comment", post.id] });
    },
  });
  
  function updatePostAcrion() {
   const postId = post._id
 }


  function deletePost() {
    return axios.delete(`https://route-posts.routemisr.com/posts/${post._id}`, {
      headers: { token :token}
    });  

    }
     
  
  const { mutate: deleteMutate } = useMutation({
    mutationFn: deletePost, 
    onSuccess: function () {
      toast("post deleted")
       queryClient.invalidateQueries({ queryKey: ["allPosts"] });
     }
   });
  



  return (
    <>
      <article key={post.id} className="rounded-3xl bg-white p-5 shadow-sm">
        {/* Header & Dropdown Row */}
        <div className="flex items-center justify-between gap-3">
          <Link
            to={`/postDetails/${post.id}`}
            className="flex items-center gap-3 flex-1 min-w-0"
          >
            {post.user.photo ? (
              <img
                src={post.user.photo}
                alt={post.user.name}
                className="h-11 w-11 rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-100 text-sky-700 flex-shrink-0">
                <FiUser />
              </div>
            )}

            {/* Name and Date Container */}
            <div className="flex flex-col justify-center leading-tight min-w-0">
              <p className="font-semibold text-slate-900 truncate">
                {post.name}
              </p>
              <p className="text-sm text-slate-500 truncate flex items-center gap-1.5 mt-0.5">
                <span>@{post.user.name}</span>
                <span>•</span>
                <span>
                  {new Date(post.createdAt).toLocaleDateString("en-us")}
                </span>
              </p>
            </div>
          </Link>

          <Dropdown>
            <Button
              aria-label="Menu"
              variant="secondary"
              className="p-2 rounded-xl hover:bg-slate-100 transition"
            >
              <BsThreeDots />
            </Button>
            <Dropdown.Popover>
              <Dropdown.Menu>
                {userId === post.user._id ? (
                  <>
                    <Dropdown.Item id="edit-file" textValue="Edit file">
                      <button
                        onClick={() => nav("/addPost", { state: { action: updatePostAcrion } })
                        }
                      >
                        Edit post
                      </button>
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="delete-file"
                      textValue="Delete file"
                      variant="danger"
                    >
                      <button onClick={deleteMutate}>Delete post</button>
                    </Dropdown.Item>
                  </>
                ) : (
                  <Dropdown.Item id="copy-link" textValue="Copy link">
                    <Label>save post</Label>
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </div>

        {/* Main Post Link Content */}
        <Link to={`/postDetails/${post.id}`} className="my-5 block">
          {/* Content */}
          <p className="text-slate-700">{post.body}</p>

          {post.image && (
            <img
              src={post.image}
              alt=""
              className="mt-4 max-h-96 w-full rounded-2xl object-cover"
            />
          )}
        </Link>

        {/* Actions (Likes, Comments, Share) */}
        <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 text-sm text-slate-500">
          <button
            onClick={() => mutateLikePost()}
            type="button"
            className="flex items-center gap-2 rounded-xl px-3 py-2 transition hover:bg-red-50 hover:text-red-500"
          >
            <FiHeart className="text-lg" />
            <span>{post.likes.length}</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl px-3 py-2 transition hover:bg-sky-50 hover:text-sky-700"
          >
            <FiMessageCircle className="text-lg" />
            <span>{post.commentsCount}</span>
          </button>

          <button
            type="button"
            aria-label="Share"
            className="ml-auto rounded-xl px-3 py-2 transition hover:bg-sky-50 hover:text-sky-700"
          >
            <FiShare2 className="text-lg" />
          </button>
        </div>

        {/* Comment Input Section with Send Icon */}
        <div className="mt-4 flex gap-3 items-center">
          <input
            className="flex-1 px-4 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition text-slate-700"
            placeholder="comment"
            value={commentInput}
            onChange={(e) => setcommentInput(e.target.value)}
          />
          <button
            onClick={mutate}
            disabled={isPending}
            type="button"
            className="p-2.5 rounded-xl hover:bg-sky-50 transition disabled:opacity-50 flex items-center justify-center"
          >
            {isPending ? (
              <Spinner />
            ) : (
              <IoIosSend className="text-2xl text-blue-500" />
            )}
          </button>
        </div>

        {/* Comments List */}
        <div className="my-5">
          {comments && comments.length > 0
            ? comments.map((comment) => (
                <Comment key={comment.id || comment._id} comment={comment} />
              ))
            : post.topComment && (
                <p className="text-slate-600 text-sm">
                  {post.topComment?.content}
                </p>
              )}
        </div>
      </article>
    </>
  );
}

