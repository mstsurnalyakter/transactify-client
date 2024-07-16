import { useEffect, useState } from "react";
import logo from "/logo.png";
// import { Tooltip } from "react-tooltip";

import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const NavBar = () => {
  const [openNav, setOpenNav] = useState(false);

  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => toast.error(error.message));
  };

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "system");
  const element = document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const options = [
    {
      icon: "sunny",
      text: "light",
    },
    {
      icon: "moon",
      text: "dark",
    },
    {
      icon: "desktop-outline",
      text: "system",
    },
  ];

  const onWindowMatch = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && darkQuery.matches)
    ) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  };

  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;
      default:
        localStorage.removeItem("theme");
        onWindowMatch();
        break;
    }
  }, [theme]);

  darkQuery.addEventListener("change", (e) => {
    if (!("theme" in localStorage)) {
      if (e.matches) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    }
  });

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <div className="shadow-lg sticky bg-[#20A1A9] top-0 z-50 dark:bg-slate-900 duration-100">
      <Navbar
        color="#20A1A9"
        className="mx-auto bg-[#20A1A9]  max-w-7xl  shadow-none rounded-none px-3 lg:px-2 pt-4  mb-6 lg:py-5"
      >
        <div className="flex items-center justify-between">
          <Typography className="mr-4 cursor-pointer py-1.5 lg:ml-2 flex items-center">
            <Link to={"/"} className="flex items-center justify-center gap-1">
              <img
                className="w-12 rounded-full bg-white border-2 border-[#20A1A9] p-1  "
                src={logo}
                alt=""
              />
              <span className="text-black mt-3  font-extrabold text-xl">
                Transactify
              </span>
            </Link>
          </Typography>
          <div className="hidden gap-4 lg:flex items-center">
            <div>
              <div className="flex gap-2">
                <>
                  <NavLink
                    to={"/"}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#4D95EA] px-3 py-1  text-white flex items-center justify-center  rounded-lg"
                        : "p-2 text-[#131313CC]"
                    }
                  >
                    Home
                  </NavLink>
                  {user && (
                    <>
                      <NavLink
                        to={"/dashboard"}
                        className={({ isActive }) =>
                          isActive
                            ? "bg-[#4D95EA] px-3 py-1 flex items-center justify-center  text-white  rounded-lg"
                            : "p-2 text-[#131313CC]"
                        }
                      >
                        Dashboard
                      </NavLink>
                      <img
                        className="rounded-full w-10 h-10 border-2 border-[#4D95EA]"
                        src={user?.photoURL}
                        alt="profile image"
                        id="profile"
                      />
                      <Tooltip
                        anchorSelect="#profile"
                        content={user?.displayName}
                      />
                      <button
                        onClick={() => handleLogOut()}
                        className="bg-[#E3B342] px-3 py-1 flex items-center justify-center  text-black font-medium  rounded-lg"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </>
                {!user && (
                  <>
                    <NavLink
                      to={"/login"}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-[#4D95EA] px-3 py-1 flex items-center justify-center  text-white  rounded-lg"
                          : "text-[#131313CC] border border-[#4D95EA] px-3 py-1 rounded-lg"
                      }
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to={"/registration"}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-[#4D95EA] px-3 py-1 flex items-center justify-center  text-white  rounded-lg"
                          : "text-[#131313CC] border border-[#4D95EA] px-3 py-1 rounded-lg"
                      }
                    >
                      Registration
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Theme Toggle Buttons */}
            <div className=" bg-[#4D95EA] items-center justify-center flex flex-wrap rounded">
              {options?.map((opt) => (
                <button
                  onClick={() => setTheme(opt.text)}
                  key={opt.text}
                  className={`w-8 h-8 leading-9 text-xl rounded-full mr-1 ${
                    theme === opt.text ? "text-[#fdbf2dfe]" : ""
                  }`}
                >
                  <ion-icon name={opt.icon}></ion-icon>
                </button>
              ))}
            </div>
            <IconButton
              variant="text"
              color="blue-gray"
              className="lg:hidden"
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <div className="flex gap-5">
                  <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                </div>
              ) : (
                <Bars3Icon className="h-6 w-6" strokeWidth={2} />
              )}
            </IconButton>
          </div>
        </div>

        <Collapse open={openNav}>
          <div className="flex items-center justify-center"></div>
          <div className="">
            <div className="flex items-center justify-center gap-4  flex-col">
              <>
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#4D95EA] px-3 py-1  text-white  rounded-lg"
                      : "p-2 text-[#131313CC]"
                  }
                >
                  Home
                </NavLink>
                {/* {user && (
                  <>
                    <NavLink
                      to={"/dashboard"}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-[#4D95EA] px-3 py-1 flex items-center justify-center  text-white  rounded-lg"
                          : "p-2 text-[#131313CC]"
                      }
                    >
                      Dashboard
                    </NavLink>
                    <img
                      id="profile"
                      className="rounded-full w-10 h-10 border-2 border-[#4D95EA]"
                      src={user?.photoURL}
                      alt="profile image"
                    />
                    <Tooltip
                      anchorSelect="#profile"
                      content={user?.displayName}
                    />
                    <button
                      onClick={() => handleLogOut()}
                      className="bg-[#E3B342] px-3 py-1 flex items-center justify-center  text-white  rounded-lg"
                    >
                      Logout
                    </button>
                  </>
                )} */}
              </>
              {/* {!user && (
                <>
                  <NavLink
                    to={"/login"}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#4D95EA] px-3 py-1  text-white  rounded-lg"
                        : "text-[#131313CC] border border-[#4D95EA] px-3 py-1 rounded-lg"
                    }
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to={"/signup"}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#4D95EA] px-3 py-1  text-white  rounded-lg"
                        : "text-[#131313CC] border border-[#4D95EA] px-3 py-1 rounded-lg"
                    }
                  >
                    SignUp
                  </NavLink>
                </>
              )} */}
            </div>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
