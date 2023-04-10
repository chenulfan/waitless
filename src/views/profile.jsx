import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import axios from "axios";
import HistoryAccordion from "../shared/components/HistoryAccordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPointUp,
  faBellConcierge,
} from "@fortawesome/free-solid-svg-icons";
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [userOffers, setUserOffers] = useState([]);
  const [userRequests, setUserRequests] = useState([]);
  const [userSold, setUserSold] = useState([]);
  const [userBought, setUserBought] = useState([]);
  const [userTotalTransacted, setUserTotalTransacted] =
    useState("Loading...");

  const { currentUser, logout } = useAuth();

  const fetchUserData = async (username) => {
    try {
      const response = await axios.get(
        `http://localhost:3030/api/users/${username}`,
        { withCredentials: true }
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchUserReservations = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3030/api/users/me`, {
        withCredentials: true,
      });
      setUserOffers(response.data.reservations.offers);
      setUserRequests(response.data.reservations.requests);
      setUserSold(response.data.reservations.sold);
      setUserBought(response.data.reservations.bought);
      const totalTransacted = new Set([
        ...response.data.reservations.bought,
        ...response.data.reservations.sold,
      ]);
      setUserTotalTransacted(totalTransacted.size);
      console.log(response.data.reservations);
    } catch (error) {
      console.error("Error fetching user reservations:", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchUserData(currentUser.username);
      fetchUserReservations(currentUser.userId);
    } else {
      console.error("No logged-in user found");
    }
  }, [currentUser]);

  const renderReservationItem = (reservation) => {
    const date = new Date(reservation.date);
    const formattedDate = date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    return (
      <>
        <div className="text-teal-600">{reservation.restaurant.name}</div>
        <div className="text-gray-500 text-xs">{formattedDate}</div>
      </>
    );
  };

  return (
    <div className="container mx-auto my-5 p-5">
      {" "}
      <div className="md:flex no-wrap md:-mx-2 ">
        {/* <!-- Left Side --> */}
        <div className="w-full md:w-3/12 md:mx-2">
          {/* <!-- Profile Card --> */}
          <div className="bg-white p-3 border-t-4 border-green-400">
            <div className="image overflow-hidden">
              <img
                className="h-auto w-full mx-auto"
                //src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                alt=""
              />
            </div>
            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
              {userData ? userData.fullname : "Loading..."}
            </h1>
            <h3 className="text-gray-600 font-lg text-semibold leading-6">
              Welcome to your profile!
            </h3>
            <p className=" text-sm text-gray-500 hover:text-gray-600 leading-6 mt-1">
              Here you can view active reservation offers/requests, as well as
              your history of your reservations.
            </p>
          </div>
          {/* <!-- End of profile card --> */}
          <div className="my-4"></div>
        </div>
        {/* <!-- Right Side --> */}
        <div className="w-full md:w-9/12 mx-2 h-64">
          {/* <!-- Profile tab -->
                <!-- About Section --> */}
          <div className="bg-white p-3 shadow-sm rounded-sm">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
              <span clas="text-green-500">
                <svg
                  className="h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <span className="tracking-wide">About</span>
            </div>
            <div className="text-gray-700">
              <div className="grid md:grid-cols-2 text-sm">
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Name</div>
                  <div className="px-4 py-2">
                    {userData ? userData.fullname : "Loading..."}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Contact No.</div>
                  <div className="px-4 py-2">
                    {userData ? userData.phone : "Loading..."}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Email</div>
                  <div className="px-4 py-2">
                    {userData ? userData.email : "Loading..."}
                  </div>
                </div>{" "}
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">
                    Total Transacted
                  </div>
                  <div className="px-4 py-2">
                    {userData ? userTotalTransacted : "Loading..."}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- End of about section --> */}

          <div className="my-4"></div>

          {/* <!-- Reservations --> */}
          <div className="bg-white p-3 shadow-sm rounded-sm">
            <div className="grid grid-cols-2 divide-x divide-gray-300">
              <div className="pr-4">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                  <span clas="text-green-500">
                    <FontAwesomeIcon icon={faHandPointUp} />
                  </span>
                  <span className="tracking-wide">Requests</span>
                </div>
                {userRequests.length > 0 ? (
                  <ul className="list-inside space-y-2">
                    {userRequests.map((reservation) => (
                      <li key={reservation._id}>
                        {renderReservationItem(reservation)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No Active Requests</p>
                )}
              </div>
              <div className="pl-4">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                  <span clas="text-green-500">
                    <FontAwesomeIcon icon={faBellConcierge} />
                  </span>
                  <span className="tracking-wide">Offers</span>
                </div>
                {userOffers.length > 0 ? (
                  <ul className="list-inside space-y-2">
                    {userOffers.map((reservation) => (
                      <li key={reservation._id}>
                        {renderReservationItem(reservation)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No Active Offers</p>
                )}
              </div>
            </div>

            <HistoryAccordion
              userOffers={userOffers}
              userRequests={userRequests}
              userSold={userSold}
              userBought={userBought}
            />
          </div>
          {/* <!-- End of Reservations grid --> */}
          {/* <!-- End of profile tab --> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
