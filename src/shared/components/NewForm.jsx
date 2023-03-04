import React from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const NewForm = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [price, setPrice] = useState(0);
  const [isSelling, setIsSelling] = useState(true);
  const [restaurant, setRestaurant] = useState(undefined);

  const handleSubmit = () => {
    console.log("submitted");
    console.log(isSelling);
    console.log(restaurant);
    console.log(startDate);
    console.log(price);
    alert("submitted");
  };

  const handleToggleAsk = () => {
    setIsSelling(false);
  };

  const handleToggleSell = () => {
    setIsSelling(true);
  };

  const restaurantOptions = [
    { value: "ocd", label: "OCD" },
    { value: "taizu", label: "Taizu" },
    { value: "vitrina", label: "Vitrina" },
  ];

  return (
    <>
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div
        id="authentication-modal"
        tabindex="-1"
        aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
      >
        <div
          class="relative w-full h-full max-w-md md:h-auto"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="authentication-modal"
              onClick={props.handleCloseModal}
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="px-6 py-6 lg:px-8">
              <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Wait Less!
              </h3>

              <form class="space-y-6" onSubmit={handleSubmit}>
                <ul class="grid w-full gap-6 md:grid-cols-2">
                  <li>
                    <input
                      type="radio"
                      id="hosting-small"
                      name="hosting"
                      value="hosting-small"
                      class="hidden peer"
                      require
                      onClick={handleToggleSell}

                    />
                    <label
                      for="hosting-small"
                      class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <div class="block">
                        <div class="w-full text-lg font-semibold">
                          Sell Reservation
                        </div>
                      </div>
                      <svg
                        aria-hidden="true"
                        class="w-6 h-6 ml-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="hosting-big"
                      name="hosting"
                      value="hosting-big"
                      class="hidden peer"
                      onClick={handleToggleAsk}
                    />
                    <label
                      for="hosting-big"
                      class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <div class="block">
                        <div class="w-full text-lg font-semibold">
                          Ask For a Reservation
                        </div>
                      </div>
                      <svg
                        aria-hidden="true"
                        class="w-6 h-6 ml-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </label>
                  </li>
                </ul>
                <div>
                  <label
                    for="restaurant"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Choose Restaurant
                  </label>
                  {/* need AsyncSelect? */}
                  <Select
                    isSearchable={true}
                    options={restaurantOptions}
                    name="select"
                    id="select"
                    onChange={(value) => {
                      setRestaurant(value.value);
                    }}
                  />
                </div>
                <div>
                  <label
                    for="date"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Date
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
                <div>
                  <label
                    for="date"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Set Your Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    onChange={(event) => {
                      setPrice(event.target.value);
                    }}
                  />
                </div>

                <button
                  type="submit"
                  class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewForm;
