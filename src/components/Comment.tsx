import React from "react";
import { FiHeart, FiMessageCircle, FiMoreHorizontal } from "react-icons/fi";

export default function Comment({ comment }) {
  // بيانات تجريبية في حال لم تقومي بتمرير الـ props بعد
  
  return (
    <div className="flex gap-3 rounded-2xl bg-slate-50 p-4 transition hover:bg-slate-100/80 my-5">
      {/* صورة المستخدم أو أيقونة افتراضية */}
      <div className="flex-shrink-0">
        {comment.commentCreator.photo ? (
          <img
            src={comment.commentCreator.photo}
            alt={comment.commentCreator.name}
            className="h-10 w-10 rounded-full object-cover shadow-sm"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 font-semibold text-sky-700 shadow-sm">
            {/* {currentComment.user.name.charAt(0)} */}
          </div>
        )}
      </div>

      {/* محتوى التعليق */}
      <div className="flex-1 text-sm">
        {/* رأس التعليق (الاسم + الوقت + قائمة خيارات) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900">
              {comment.commentCreator.name}
            </span>
            <span className="text-xs text-slate-400">
              {new Date(comment.createdAt).toLocaleDateString("en-us", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          <button type="button" className="text-slate-400 hover:text-slate-600">
            <FiMoreHorizontal />
          </button>
        </div>

        {/* نص التعليق */}
        <p className="mt-1.5 text-slate-700 leading-relaxed">
          {comment.content}
        </p>

        {/* أزرار التفاعل (إعجاب، رد) */}
        <div className="mt-3 flex items-center gap-4 text-xs font-medium text-slate-500">
          <button
            type="button"
            className="flex items-center gap-1.5 transition hover:text-red-500"
          >
            <FiHeart className="text-base" />
            <span>{comment.likes.length}</span>
          </button>

          <button type="button" className="transition hover:text-sky-600">
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}
