

import axios from "axios";
import React, { useContext, useRef, useState, useEffect } from "react";
import { FaRegImage } from "react-icons/fa6";
import { createdContext } from "../context/AuthContext";
import { ImCancelCircle } from "react-icons/im";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@heroui/react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddPostComponent() {
  let imageFile = useRef<HTMLInputElement>(null);
  let postbody = useRef<HTMLTextAreaElement>(null);
  const [imgUrl, setImgUrl] = useState("");
  const { token } = useContext(createdContext);
  const nav = useNavigate();
  const location = useLocation();

  // استقبال الأكشن اللي جاي من الـ state (لو وجد يبقى احنا في وضع التعديل)
  const myActionFn = location.state?.action;
  const isEditMode = Boolean(myActionFn);

  function previewImage() {
    if (imageFile.current?.files?.[0]) {
      setImgUrl(URL.createObjectURL(imageFile.current.files[0]));
    }
  }

  // دالة الإضافة (Create)
  function createPost() {
    const postData = new FormData();
    if (postbody.current?.value) {
      postData.append("body", postbody.current.value);
    }
    if (imageFile.current?.files?.[0]) {
      postData.append("image", imageFile.current.files[0]);
    }
    return axios.post("https://route-posts.routemisr.com/posts", postData, {
      headers: { token: token },
    });
  }

  // Mutation خاصة بالإنشاء
  const { mutate: createMutate } = useMutation({
    mutationFn: createPost,
    onSuccess() {
      toast.success("Post created successfully");
      nav("/home");
    },
    onError() {
      toast.danger("Error creating post");
    },
  });
  
  // لو الـ myActionFn هي عبارة عن Mutation جاهزة تم تمريرها من صفحة البوستات
  const { mutate: updateMutate, isPending: isUpdating } = useMutation({
    mutationFn: myActionFn, // أو ممكن تمرري الدالة هنا مباشرة لو عاملة لها define في مكان تاني
    onSuccess() {
      toast.success("Post updated successfully");
      nav("/home");
    },
    onError() {
      toast.danger("Error updating post");
    },
  });

  function deleteImgPrv() {
    setImgUrl("");
    if (imageFile.current) {
      imageFile.current.value = "";
    }
  }

  return (
    <>
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-3xl p-6 sm:p-8 my-8 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {isEditMode ? "Edit Post" : "Create a Post"}
        </h2>

        <div className="flex flex-col gap-4">
          {/* Textarea Section */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">
              What's on your mind?
            </label>
            <textarea
              ref={postbody}
              placeholder="Share your thoughts..."
              className="w-full h-40 rounded-2xl p-4 border-2 border-cyan-500/50 focus:border-cyan-500 focus:outline-none resize-none transition-all shadow-sm text-gray-700"
            />
          </div>

          {/* Image Upload Button & Preview */}
          <div className="flex items-center gap-3">
            <input
              ref={imageFile}
              onChange={previewImage}
              type="file"
              accept="image/*"
              className="hidden"
              id="fileInput"
            />

            <label
              htmlFor="fileInput"
              className="flex items-center gap-2 px-4 py-2 bg-cyan-50 hover:bg-cyan-100 text-cyan-600 rounded-xl cursor-pointer transition-colors border border-cyan-200 text-sm font-medium"
            >
              <FaRegImage className="text-lg" />
              <span>Add Photo</span>
            </label>
          </div>

          {/* Image Preview Container */}
          {imgUrl && (
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 max-h-72 bg-gray-50 flex justify-center">
              <img
                src={imgUrl}
                alt="Preview"
                className="object-cover max-h-72 w-full"
              />
              <button
                onClick={deleteImgPrv}
                className="absolute top-3 right-3 bg-white/80 hover:bg-white text-red-500 p-2 rounded-full shadow-md cursor-pointer transition-transform hover:scale-105"
                title="Remove image"
              >
                <ImCancelCircle className="text-lg" />
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={isEditMode ? updateMutate : createMutate}
            className="rounded-full bg-sky-500 hover:bg-sky-600 text-white font-medium w-full py-3.5 mt-4 transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            {isEditMode ? "Update Post" : "Post"}
          </button>
        </div>
      </div>
    </>
  );
}





















// =============================================





// import axios from "axios";

// import React, { useContext, useRef ,useState  } from "react";
// import { FaRegImage } from "react-icons/fa6";
// import { createdContext } from "../context/AuthContext";
// import { ImCancelCircle } from "react-icons/im";
// import { useMutation } from "@tanstack/react-query";
// import { toast } from "@heroui/react";
// import { useLocation, useNavigate } from "react-router-dom";

// export default function AddPostComponent() {
//   let imageFile = useRef<HTMLInputElement>(null);
//   let postbody = useRef<HTMLTextAreaElement>(null); 
//   const [imgUrl, setImgUrl] = useState("");
//     const {token}=  useContext(createdContext);
//   const nav = useNavigate()
//   const location = useLocation()
  
//    const myActionFn = location.state?.action



//   function previewImage() {
//     if (imageFile.current?.files?.[0]) {
       
      
//       setImgUrl( URL.createObjectURL(imageFile.current?.files[0]));
//     }
//   }

//   function createPost() {
//     console.log(postbody.current);
//     console.log(imageFile.current);

//     const postData = new FormData()
//     if (postbody.current?.value) {
//        postData.append("body", postbody.current?.value)
//      }
//     if (imageFile.current?.files?.[0]) {
//        postData.append("image", imageFile.current.files[0])
//      }
//     return axios.post(
//       "https://route-posts.routemisr.com/posts" , postData,
//       {
//         headers: { token: token },
//       },
//     );
//   }
  
//     const{mutate} = useMutation({
//     mutationFn: createPost,
//     onSuccess() {
//       toast.success("post created sucessfully")
//       nav("/home")
//     },
//     onError() {
//       toast.danger("error")
//     }
//  })

//   function deleteImgPrv() {
//     setImgUrl(""),
//     imageFile.current.value = ""
//   }

//   return (
//     <>
//       <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-3xl p-6 sm:p-8 my-8 border border-gray-100">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">
//           Create a Post
//         </h2>

//         <div className="flex flex-col gap-4">
//           {/* Textarea Section */}
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-medium text-gray-600">
//               What's on your mind?
//             </label>
//             <textarea
//               ref={postbody}
//               placeholder="Share your thoughts..."
//               className="w-full h-40 rounded-2xl p-4 border-2 border-cyan-500/50 focus:border-cyan-500 focus:outline-none resize-none transition-all shadow-sm text-gray-700"
//             />
//           </div>

//           {/* Image Upload Button & Preview */}
//           <div className="flex items-center gap-3">
//             <input
//               ref={imageFile}
//               onChange={previewImage}
//               type="file"
//               accept="image/*"
//               className="hidden"
//               id="fileInput"
//             />

//             <label
//               htmlFor="fileInput"
//               className="flex items-center gap-2 px-4 py-2 bg-cyan-50 hover:bg-cyan-100 text-cyan-600 rounded-xl cursor-pointer transition-colors border border-cyan-200 text-sm font-medium"
//             >
//               <FaRegImage className="text-lg" />
//               <span>Add Photo</span>
//             </label>
//           </div>

//           {/* Image Preview Container */}
//           {imgUrl && (
//             <div className="relative rounded-2xl overflow-hidden border border-gray-200 max-h-72 bg-gray-50 flex justify-center">
//               <img
//                 src={imgUrl}
//                 alt="Preview"
//                 className="object-cover max-h-72 w-full"
//               />
//               <button
//                 onClick={deleteImgPrv}
//                 className="absolute top-3 right-3 bg-white/80 hover:bg-white text-red-500 p-2 rounded-full shadow-md cursor-pointer transition-transform hover:scale-105"
//                 title="Remove image"
//               >
//                 <ImCancelCircle className="text-lg" />
//               </button>
//             </div>
//           )}

//           {/* Submit Button */}
//           <button
//             onClick={myActionFn?  myActionFn : mutate}
//             className="rounded-full bg-sky-500 hover:bg-sky-600 text-white font-medium w-full py-3.5 mt-4 transition-all shadow-md hover:shadow-lg cursor-pointer"
//           >
//             Post
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }


