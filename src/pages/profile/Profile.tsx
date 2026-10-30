
import React from "react";
import {
  FiMail,
  FiCalendar,
  FiUser,
  FiClock,
  FiCamera,
  FiEdit2,
  FiBookmark,
} from "react-icons/fi";

// داتا ثابتة بنفس شكل الـ API (من غير أي logic)
const user = {
  _id: "6ace933419a0341482392f5e",
  name: "osama",
  username: "osamahanna",
  email: "osama@gmail.com",
  dateOfBirth: "1990-01-31T00:00:00.000Z",
  gender: "male",
  photo:
    "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png",
  cover: "",
  followersCount: 0,
  followingCount: 0,
  bookmarksCount: 0,
  createdAt: "2026-10-13T20:23:16.692Z",
};

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function Profile() {
  const stats = [
    { label: "Followers", value: user.followersCount },
    { label: "Following", value: user.followingCount },
    { label: "Bookmarks", value: user.bookmarksCount },
  ];

  const details = [
    { icon: <FiMail />, label: "Email", value: user.email },
    {
      icon: <FiCalendar />,
      label: "Birthday",
      value: formatDate(user.dateOfBirth),
    },
    {
      icon: <FiUser />,
      label: "Gender",
      value: user.gender.charAt(0).toUpperCase() + user.gender.slice(1),
    },
    {
      icon: <FiClock />,
      label: "Joined",
      value: formatDate(user.createdAt),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto my-8 px-4 flex flex-col gap-5">
      {/* Header card: cover + avatar + name */}
      <section className="overflow-hidden rounded-3xl bg-white shadow-sm border border-slate-100">
        {/* Cover */}
        <div className="relative h-44 sm:h-56 bg-gradient-to-br from-sky-400 via-cyan-400 to-sky-600">
          {user.cover && (
            <img
              src={user.cover}
              alt="Cover"
              className="h-full w-full object-cover"
            />
          )}
          <button
            type="button"
            className="absolute bottom-3 right-3 flex items-center gap-2 rounded-xl bg-white/85 hover:bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition cursor-pointer"
          >
            <FiCamera />
            <span>Change cover</span>
          </button>
        </div>

        {/* Avatar + info */}
        <div className="px-6 pb-6">
          <div className="-mt-14 flex items-end justify-between gap-4">
            <div className="relative">
              <img
                src={user.photo}
                alt={user.name}
                className="h-28 w-28 rounded-full border-4 border-white object-cover bg-slate-100 shadow-md"
              />
              <button
                type="button"
                aria-label="Change photo"
                className="absolute bottom-1 right-1 rounded-full bg-sky-500 hover:bg-sky-600 p-2 text-white shadow-md transition cursor-pointer"
              >
                <FiCamera className="text-sm" />
              </button>
            </div>

            <button
              type="button"
              className="mb-2 flex items-center gap-2 rounded-full bg-sky-500 hover:bg-sky-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition cursor-pointer"
            >
              <FiEdit2 />
              <span>Edit profile</span>
            </button>
          </div>

          <div className="mt-4">
            <h1 className="text-2xl font-bold text-slate-900 capitalize">
              {user.name}
            </h1>
            <p className="text-slate-500">@{user.username}</p>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 divide-x divide-slate-100 rounded-2xl border border-slate-100 bg-slate-50/60">
            {stats.map((s) => (
              <div key={s.label} className="py-4 text-center">
                <p className="text-xl font-bold text-slate-900">{s.value}</p>
                <p className="text-sm text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About card */}
      <section className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">About</h2>
        <ul className="flex flex-col gap-3">
          {details.map((d) => (
            <li key={d.label} className="flex items-center gap-4">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 text-lg">
                {d.icon}
              </span>
              <div className="min-w-0">
                <p className="text-xs text-slate-500">{d.label}</p>
                <p className="truncate font-medium text-slate-800">{d.value}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Posts section (empty state) */}
      <section className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">My posts</h2>
        <div className="flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 py-10 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-50 text-sky-500 text-xl">
            <FiBookmark />
          </span>
          <p className="font-medium text-slate-700">No posts yet</p>
          <p className="text-sm text-slate-500">
            Posts you share will show up here.
          </p>
          <button
            type="button"
            className="mt-1 rounded-full bg-sky-500 hover:bg-sky-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition cursor-pointer"
          >
            Create a post
          </button>
        </div>
      </section>
    </div>
  );
}
