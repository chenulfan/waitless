import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import axios from "axios";

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
      const response = await axios.get(
        `http://localhost:3030/api/reservations/${id}`,
        {
          withCredentials: true,
        }
      );
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
        `http://localhost:3030/api/reservations/buy/${reservationId}`,
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
        <div className="text-gray-500 text-xs">{formattedDate}</div>
        {type === "offer" ? (
          <>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded-md ml-2"
              onClick={() => handleBuy(reservation._id)}
            >
              Buy
            </button>
            <p>Owner: {reservation.owner.username}</p>
          </>
        ) : (
          <button
            className="bg-green-500 text-white px-2 py-1 rounded-md ml-2"
            onClick={() => handleSell(reservation._id)}
          >
            Sell
          </button>
        )}
      </>
    );
  };

  const { requests, offers } = reservationDetails;

  return (
    <>
      <Accordion open={open === 1} icon={<ArrowIcon id={1} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(1)}>
          Click to view available reservations
        </AccordionHeader>
        <AccordionBody>
          <div className="bg-white p-3 shadow-sm rounded-sm">
            <div className="grid grid-cols-2">
              <div>
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
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
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide">Available Requests</span>
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
              <div>
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                  <span clas="text-green-500">
                    <svg
                      className="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path
                        fill="#fff"
                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide">Available Offers</span>
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
