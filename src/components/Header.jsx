import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { AuthContext } from "../Auth/AuthContext";
import ApplicationLogo from "../config/ApplicationLogo";
import ApplicationUser from "../config/ApplicationUser";
import { useProfileUserDataQuery } from "../store/services/Dashboard/dashboardApi";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/register";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";

const Header = () => {
  const [isOpenDrop, setIsOpenDrop] = useState(false);
  const { logout } = useContext(AuthContext);
  const location = useLocation();

  const [name, setUserData] = useState("");
  // RTk Query Fetch user /GetUserData 🔥🔥
  const { data } = useProfileUserDataQuery();

  useEffect(() => {
    if (data) {
      const userName = data.profile?.user ?? "";
      setUserData(userName);
    }
  }, [data]);

  const toggleDropdown = () => {
    setIsOpenDrop((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdownMenu = document.querySelector(".dropdown-menu");
      if (dropdownMenu && !dropdownMenu.contains(event.target)) {
        setIsOpenDrop(false);
      }
    };

    if (isOpenDrop) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenDrop]);

  // Check if the current route is login or register
  const isAuth =
    location.pathname === "/consultation-form/" ||
    location.pathname === "/register/" ||
    location.pathname === "/forgot-password/" ||
    location.pathname === "/change-forgot-password/";

  const handleLogout = () => {
    setIsOpenDrop(false);
    logout();
    // navigate("/");
  };
  const handleRemovePid = () => {
    localStorage.removeItem("previous_id");
  };
  const [openModal, setOpenModal] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const openModalLoginOrRegister = () => {
    console.log("open");
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const tabClasses = (tab) =>
    `px-4 py-2 font-medium text-sm border-b-2 ${
      activeTab === tab
        ? "border-blue-600 text-blue-600"
        : "border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-600"
    }`
  return (
    <>


      <div
        className={`md:mx-auto px-4 flex justify-center w-full items-center 2xl:w-[calc(1366px+16px)] 
      ${isAuth ? "py-4 px-2 rounded-b-lg" : "p-4"}
    `}
      >
        {/* Logo - Centered, Only visible on non-login/register pages */}
        {/* {!isAuth && (
        <a className="text-base items-center space-x-1 hidden lg:flex reg-font text-black" href="mailto:contact@londonslimmingclinic.co.uk">
          <MdEmail size="30" className="me-2 mb-0 text-primary" />
          contact@londonslimmingclinic.co.uk{" "}
        </a>
      )}

      {isAuth && (
        <a className="text-base items-center space-x-1 hidden lg:flex reg-font text-black" href="mailto:contact@londonslimmingclinic.co.uk">
          <MdEmail size="25" className="me-1 mb-0 text-primary" />
          contact@londonslimmingclinic.co.uk{" "}
        </a>
      )} */}

        <div className="sm:absolute sm:left-1/2 transform sm:-translate-x-1/2">
          <Link to="/consultation-form/" onClick={handleRemovePid}>
            <ApplicationLogo className="w-36 sm:w-36" />
          </Link>
        </div>

        {/* User Info (Dropdown) - Aligned to the right, Only visible on non-login/register pages */}
        {!isAuth && (
          <div className="relative ml-auto">
            {/* Dropdown Trigger */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleDropdown}>
              {/* <img src="/images/user.png" alt="User Avatar" className="w-10 h-10 rounded-full" /> */}
              <ApplicationUser className="w-10 h-10 rounded-full" />
              <span className="reg-font text-[#1C1C29] truncate">{name && name.fname && name.lname ? `${name.fname} ${name.lname}` : ""}</span>
            </div>

            {/* Dropdown Menu */}
            {isOpenDrop && (
              <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <ul className="py-1 list-none">
                  {/* <Link to="/consultation-form/" onClick={toggleDropdown}>
                    <li className="ligt-font px-4 py-2 text-[#1C1C29] hover:bg-gray-100 cursor-pointer">My Account</li>
                  </Link>
                  <Link to="/profile/" onClick={toggleDropdown}>
                    <li className="ligt-font px-4 py-2 text-[#1C1C29] hover:bg-gray-100 cursor-pointer">My Profile</li>
                  </Link> */}
                  <li className="reg-font px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}

        {isAuth && (
          <>
            <div class="w-1/2 items-center justify-end lg:w-[100%] sm:flex hidden">
              <p class="hidden md:block">Already have an account?</p>
              <button
                class="inline-flex items-center px-6 py-2 bg-primary border border-transparent rounded-full font-semibold text-xs text-white uppercase tracking-widest hover:bg-primary focus:bg-bg-primary active:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150 false ml-4 "
                onClick={openModalLoginOrRegister}
              >
                Login
              </button>
            </div>
          </>
        )}
      </div>
      {openModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeModal}></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  <div className="flex border-b mb-4">
                    <button
                      className={tabClasses("login")}
                      onClick={() => setActiveTab("login")}
                    >
                      Login
                    </button>
                    <button
                      className={tabClasses("register")}
                      onClick={() => setActiveTab("register")}
                    >
                      Register
                    </button>
                  </div>
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  &times;
                </button>
              </div>

              {/* Toggle Switch */}


              {/* Form Area */}
              {activeTab === "login" ? <Login /> : <Register />}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
