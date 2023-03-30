import { useState, useEffect } from "react";
import { useAuth } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [currentUser]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleClick = async () => {
    console.log(currentUser);
  };

  return (
    <div>
      <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-sky-800">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <a href="/home" className="flex items-center lg:justify-start">
              <img
                src="https://openmoji.org/data/color/svg/1F372.svg"
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Waitless
              </span>
            </a>
            <div className="flex items-center lg:order-2 ">
              {isLoggedIn ? (
                <>
                  <a
                    href="/profile"
                    className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                  >
                    Profile
                  </a>
                  <button
                    onClick={handleLogout}
                    className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                  >
                    Logout
                  </button>
                  <button
                    onClick={handleClick}
                    className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                  >
                    getUserInfo
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="/login"
                    className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                  >
                    Log in
                  </a>
                  <a
                    href="/register"
                    className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                  >
                    Sign Up
                  </a>
                </>
              )}
            </div>
            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            ></div>
          </div>
        </nav>
      </header>
      {children}
    </div>
  );
};

export default Header;
