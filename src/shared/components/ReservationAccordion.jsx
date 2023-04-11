import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPointUp,
  faBellConcierge,
} from "@fortawesome/free-solid-svg-icons";
import { DB_URL } from "../../constants";

const ArrowIcon = ({ id, open }) => (
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

const ReservationAccordion = (props) => {
  const [open, setOpen] = useState(0);
  const [reservationDetails, setReservationDetails] = useState({
    requests: [],
    offers: [],
  });

  const fetchReservation = async (id) => {
    try {
      const response = await axios.get(`${DB_URL}/api/reservations/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching reservation:", error);
    }
  };

  const fetchReservations = async () => {
    const requests = await Promise.all(
      props.reservations?.requests?.map(fetchReservation) || []
    );
    const offers = await Promise.all(
      props.reservations?.offers?.map(fetchReservation) || []
    );
    setReservationDetails({ requests, offers });
  };

  useEffect(() => {
    fetchReservations();
  }, [props.reservations]);

  const handleOpen = (value) => {
    setOpen((prevOpen) => (prevOpen === value ? 0 : value));
  };

  const handleBuy = async (reservationId) => {
    try {
      await axios.put(
        `${DB_URL}/api/reservations/buy/${reservationId}`,
        {},
        { withCredentials: true }
      );
      alert("Successfully bought the reservation!");
      // update the reservations list
      fetchReservations();
    } catch (error) {
      console.error("Error buying the reservation:", error);
      alert("Error buying the reservation");
    }
  };

  const handleSell = async (reservationId) => {
    // //add logic
    // try {
    //   await axios.put(
    //     `http://localhost:3030/api/reservations/sell/${reservationId}`,
    //     {},
    //     { withCredentials: true }
    //   );
    //   alert("Successfully sold the reservation!");
    //   // update the reservations list
    //   fetchReservations();
    // } catch (error) {
    //   console.error("Error selling the reservation:", error);
    //   alert("Error selling the reservation");
    // }
  };

  const renderReservationItem = (reservation, type) => {
    const date = new Date(reservation.date);
    const formattedDate = date.toLocaleString("en-GB").substring(0, 17);
    return (
      <>
        <div className="flex items-center justify-between">
          <div className="text-gray-500 text-xs">{formattedDate}</div>
          {type === "offer" ? (
            <>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded-md"
                onClick={() => handleBuy(reservation._id)}
              >
                Buy
              </button>
            </>
          ) : (
            <button
              className="bg-green-500 text-white px-2 py-1 rounded-md"
              onClick={() => handleSell(reservation._id)}
            >
              Sell
            </button>
          )}
        </div>
      </>
    );
  };

  const { requests, offers } = reservationDetails;

  return (
    <>
      <Accordion open={open === 1} icon={<ArrowIcon id={1} open={open} />}>
        <AccordionHeader
          className="text-base ml-6 w-11/12"
          onClick={() => handleOpen(1)}
        >
          Click to view available reservations
        </AccordionHeader>
        <AccordionBody>
          <div className="bg-white p-3 shadow-sm rounded-sm">
            <div className="grid grid-cols-2 divide-x divide-gray-300">
              <div className="pr-4">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                  <span clas="text-green-500">
                    <FontAwesomeIcon icon={faHandPointUp} />
                  </span>
                  <span className="tracking-wide">Requests</span>
                </div>
                {requests.length > 0 ? (
                  <ul className="list-inside space-y-2">
                    {requests.map((reservation) => (
                      <li key={reservation._id}>
                        {renderReservationItem(reservation, "request")}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No Available Requests</p>
                )}
              </div>
              <div className="pl-4">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                  <span clas="text-green-500">
                    <FontAwesomeIcon icon={faBellConcierge} />
                  </span>
                  <span className="tracking-wide">Offers</span>
                </div>
                {offers.length > 0 ? (
                  <ul className="list-inside space-y-2">
                    {offers.map((reservation) => (
                      <li key={reservation._id}>
                        {renderReservationItem(reservation, "offer")}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No Available Offers</p>
                )}
              </div>
            </div>
          </div>
        </AccordionBody>
      </Accordion>
    </>
  );
};

export default ReservationAccordion;
