import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";

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

  const soldRequests = props.userSold.filter(
    (reservation) => reservation.type === "request"
  );

  const boughtOffers = props.userBought.filter(
    (reservation) => reservation.type === "offer"
  );

  return (
    <>
      <Accordion open={open === 1} icon={<ArrowIcon id={1} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(1)}>
          View reservation history
        </AccordionHeader>
        <AccordionBody>
          <div className="bg-white p-3 shadow-sm rounded-sm">
            <div className="grid grid-cols-2 divide-x divide-gray-300">
              <div className="pr-4">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                  <span clas="text-green-500">
                    <FontAwesomeIcon icon={faShoppingBasket} />
                  </span>
                  <span className="tracking-wide">Bought Reservations</span>
                </div>
                {boughtOffers.length > 0 ? (
                  <ul className="list-inside space-y-2">
                    {boughtOffers.map((reservation) => (
                      <li key={reservation._id}>
                        {renderReservationItem(reservation)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No Active Offers</p>
                )}
              </div>
              <div className="pl-4">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                  <span clas="text-green-500">
                    <FontAwesomeIcon icon={faMoneyCheckDollar} />
                  </span>
                  <span className="tracking-wide">Sold Reservations</span>
                </div>

                {soldRequests.length > 0 ? (
                  <ul className="list-inside space-y-2">
                    {soldRequests.map((reservation) => (
                      <li key={reservation._id}>
                        {renderReservationItem(reservation)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No Active Requests</p>
                )}
              </div>
            </div>
          </div>
        </AccordionBody>
      </Accordion>
    </>
  );
};

export default HistoryAccordion;
