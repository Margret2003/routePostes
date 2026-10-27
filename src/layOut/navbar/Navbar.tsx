import { useContext, useState } from "react";
import {
  FiHome,
  FiSearch,
  FiBell,
  FiMessageCircle,
  FiUser,
  FiMenu,
  FiX,
  
} from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { IoAddCircleSharp } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { createdContext } from "../../context/AuthContext";

const links = [
  { name: "Home", path: "/home", icon: FiHome },
  { name: "Profile", path: "/profile", icon: CgProfile },
  { name: "Add Post", path: "/addPost", icon: IoAddCircleSharp },
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { removeToken } = useContext(createdContext);
  const nav  = useNavigate()
  function handelLogout() {
    removeToken()
    nav("signin");
   }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-sky-700">
          Social
        </NavLink>

        {/* Search (hidden on small screens) */}
        <div className="relative hidden flex-1 max-w-md md:block">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-3 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-200"
          />
        </div>

        {/* Desktop links */}
        <ul className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                aria-label={link.name}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-sky-50 hover:text-sky-700"
              >
                <link.icon className="text-lg" />
                <span className="hidden lg:inline">{link.name}</span>
              </NavLink>
            </li>
          ))}

          <li>
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-sky-50 hover:text-sky-700"
              onClick={handelLogout}
            >
              <CiLogout className="text-lg" />
              <span className="hidden lg:inline">LogOut</span>
            </button>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="rounded-xl p-2 text-2xl text-slate-600 hover:bg-sky-50 md:hidden"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-slate-100 bg-white px-4 py-3 md:hidden">
          <div className="relative mb-3">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-3 text-sm outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-200"
            />
          </div>

          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-sky-50 hover:text-sky-700"
                >
                  <link.icon className="text-lg" />
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
