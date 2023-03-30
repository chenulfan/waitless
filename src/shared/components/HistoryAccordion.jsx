import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

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

const HistoryAccordion = (props) => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen((prevOpen) => (prevOpen === value ? 0 : value));
  };

  const renderReservationItem = (reservation) => {
    const date = new Date(reservation.date);
    const formattedDate = date.toLocaleString("en-GB");
    return (
      <>
        <div className="text-teal-600">{reservation.restaurant.name}</div>
        <div className="text-gray-500 text-xs">{formattedDate}</div>
      </>
    );
  };

  const filterReservationByDate = (reservation) => {
    const today = new Date();
    const reservationDate = new Date(reservation.date);
    return reservationDate < today;
  };

  // Filter active requests
  const activeRequests = props.userReservations.filter(
    (reservation) =>
      reservation.type === "request" && filterReservationByDate(reservation)
    //add active status to db instead of filtering by date
  );

  // Filter active offers
  const activeOffers = props.userReservations.filter(
    (reservation) =>
      reservation.type === "offer" && filterReservationByDate(reservation)
    //add active status to db instead of filtering by date
  );

  return (
    <>
      <Accordion open={open === 1} icon={<ArrowIcon id={1} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(1)}>
          View reservation history
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
                  <span className="tracking-wide">Past Requests</span>
                </div>
                <ul className="list-inside space-y-2">
                  {activeRequests.map((reservation) => (
                    <li key={reservation._id}>
                      {renderReservationItem(reservation)}
                    </li>
                  ))}
                </ul>
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
                  <span className="tracking-wide">Past Offers</span>
                </div>
                <ul className="list-inside space-y-2">
                  {activeOffers.map((reservation) => (
                    <li key={reservation._id}>
                      {renderReservationItem(reservation)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </AccordionBody>
      </Accordion>
    </>
  );
};

export default HistoryAccordion;
