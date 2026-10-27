import React from "react";

export default function PostSkeleton() {
  return (
    <article className="rounded-3xl bg-white p-5 shadow-sm animate-pulse w-full">
      {/* Header */}
      <div className="flex items-center gap-3">
        {/* Avatar Placeholder */}
        <div className="h-11 w-11 rounded-full bg-slate-200 shrink-0" />

        {/* User Info Placeholder */}
        <div className="leading-tight space-y-2 flex-1">
          <div className="h-4 bg-slate-200 rounded w-1/3" />
          <div className="h-3 bg-slate-200 rounded w-1/4" />
        </div>
      </div>

      {/* Content Placeholder */}
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-slate-200 rounded w-full" />
        <div className="h-4 bg-slate-200 rounded w-5/6" />
      </div>

      {/* Image Placeholder (Matches max-h-96 w-full rounded-2xl) */}
      <div className="mt-4 h-64 w-full rounded-2xl bg-slate-200" />

      {/* Actions Placeholder */}
      <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3">
        <div className="h-9 w-16 bg-slate-200 rounded-xl" />
        <div className="h-9 w-16 bg-slate-200 rounded-xl" />
        <div className="ml-auto h-9 w-9 bg-slate-200 rounded-xl" />
      </div>
    </article>
  );
}
