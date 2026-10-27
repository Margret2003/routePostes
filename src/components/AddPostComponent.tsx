import axios from "axios";
import React, { useContext, useRef ,useState  } from "react";
import { FaRegImage } from "react-icons/fa6";
import { createdContext } from "../context/AuthContext";
import { ImCancelCircle } from "react-icons/im";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@heroui/react";
import { useNavigate } from "react-router-dom";

export default function AddPostComponent() {
  let imageFile = useRef<HTMLInputElement>(null);
  let postbody = useRef<HTMLTextAreaElement>(null);
  const [imgUrl, setImgUrl] = useState("");
    const {token}=  useContext(createdContext);
    const nav = useNavigate()
  function previewImage() {
    if (imageFile.current?.files?.[0]) {
       
      
      setImgUrl( URL.createObjectURL(imageFile.current?.files[0]));
    }
  }

  function createPost() {
    console.log(postbody.current);
    console.log(imageFile.current);

    const postData = new FormData()
    if (postbody.current?.value) {
       postData.append("body", postbody.current?.value)
     }
    if (imageFile.current?.files?.[0]) {
       postData.append("image", imageFile.current.files[0])
     }
    return axios.post(
      "https://route-posts.routemisr.com/posts" , postData,
      {
        headers: { token: token },
      },
    );
  }
  
    const{mutate} = useMutation({
    mutationFn: createPost,
    onSuccess() {
      toast.success("post created sucessfully")
      nav("/home")
    },
    onError() {
      toast.danger("error")
    }
 })

  function deleteImgPrv() {
    setImgUrl(""),
    imageFile.current.value = ""
  }

  return (
    <>
      <div className="p-15 ">
        <label className="p-4">What's on your mind?</label>
        <textarea
          ref={postbody}
          className="w-4xl h-60 rounded-3xl p-4 border-2 border-cyan-500 m-auto "
        />

        <input
          ref={imageFile}
          onChange={previewImage}
          type="file"
          className="hidden"
          id="fileInput"
        />

        <label htmlFor="fileInput" className="px-4  text-2xl">
          <FaRegImage />
        </label>
        {imgUrl && (
          <div className="relative ">
            <img src={imgUrl} alt="" />
            <button
              onClick={deleteImgPrv}
              className=" text-red-500  cursor-pointer absolute top-2 left-2"
            >
              <ImCancelCircle />
            </button>
          </div>
        )}

        <button
          onClick={mutate}
          className="rounded-full bg-sky-400 w-full p-4 mt-8"
        >
          add comment
        </button>
      </div>
    </>
  );
}


