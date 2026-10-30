import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { createdContext } from '../../context/AuthContext';
import type { PostType } from '../../types/PostType';

import PostCard from '../../components/posts/PostCard';
import PostSkeleton from '../../components/loders/PostSkeleton';
import { useQuery } from '@tanstack/react-query';
import AddPostComponent from '../../components/AddPostComponent';






export default function Home() {
  const { token } = useContext(createdContext)
  //  const [posts, setposts] = useState(null)
  // const [Loding, setLoding] = useState(true)
   
     




   function getPosts() {
   
    return axios.get("https://route-posts.routemisr.com/posts", {
      headers: {
        token: token,
      }
    })
    
    //  setposts(data.data.posts)
    //  console.log(data.data.posts);
    // console.log(error.message)
  }
   

    const {data , isFetching , isLoading , isError} =  useQuery({queryFn: getPosts, queryKey : ["allPosts"] });
    
    
  
  if (isLoading) {
      return <PostSkeleton />;
  }
  if (isError) {
    return <h1>errorrrrrrrr</h1>
  }

  // useEffect(function () {
  //   getPosts()
  // } , [])

  return (
    <>
      {/* {posts && posts.map(function(post){ return <h1> hellooo</h1>}  )} */}
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 p-4">
        
        <div className="mx-auto max-w-2xl space-y-4">
          {
            data?.data.data.posts.map((post) => (
              <PostCard post={post} id={post.id } />
            ))}
        </div>
      </div>
    </>
  );
}