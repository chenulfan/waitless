import React, { useEffect, useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { DB_URL } from "../../constants";

const NewForm = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState("12:00");
  const [restaurantOptions, setRestaurantOptions] = useState([]);

  useEffect(() => {
    const formattedRestaurants = props.restaurants.map((restaurant) => ({
      value: restaurant._id,
      label: restaurant.name,
    }));
    setRestaurantOptions(formattedRestaurants);
  }, [props.restaurants]);

  const formik = useFormik({
    initialValues: {
      type: null,
      restaurant: "",
      guests: "",
      date: startDate,
      price: "",
      phone: "",
    },
    validationSchema: Yup.object({
      type: Yup.string().required("Please select either Sell or Ask"),
      restaurant: Yup.string().required("Please choose a restaurant"),
      guests: Yup.number()
        .required("Please set the number of guests")
        .positive("Number of guests must be a positive number")
        .integer("Number of guests must be a number"),
      date: Yup.date()
        .min(new Date(), "Date must be later than today")
        .required("Please select a date"),
      time: Yup.string().required("Please select a time"),
      price: Yup.number()
        .required("Please set your price")
        .moreThan(-1, "Price can not be negative"),
      phone: Yup.string()
        .required("Please enter your phone number")
        .matches(
          /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
          "Please enter a valid phone number"
        ),
    }),
    onSubmit: async (values) => {
      const [hours, minutes] = values.time.split(":");
      values.date.setHours(hours, minutes);
      const reservationData = {
        owner: props.currentUser.userId,
        type: values.type,
        restaurant: values.restaurant,
        guests: values.guests,
        date: values.date,
        price: values.price,
        phone: values.phone,
        confirmationCode: "123456",
      };
      console.log(reservationData);
      await submitReservation(reservationData);

      alert("Your request has been submitted!");
      window.location.reload();
    },
  });

  const submitReservation = async (reservationData) => {
    try {
      const response = await axios.post(
        `${DB_URL}/api/reservations`,
        reservationData,
        {
          withCredentials: true,
        }
      );
      console.log("Reservation submitted:", response.data);
    } catch (error) {
      console.error(
        "Error submitting reservation:",
        error.response?.data || error.message
      );
    }
  };

  const renderLoggedInContent = () => {
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
            class="relative w-full h-auto max-w-md"
            style={{
              position: "fixed",
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

                <form class="space-y-6" onSubmit={formik.handleSubmit}>
                  <ul class="grid w-full gap-6 md:grid-cols-2">
                    <li>
                      <input
                        type="radio"
                        id="type-offer"
                        name="type"
                        value="offer"
                        class="hidden peer"
                        checked={formik.values.type === "offer"}
                        onChange={formik.handleChange}
                      />
                      <label
                        htmlFor="type-offer"
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
                        id="type-request"
                        name="type"
                        value="request"
                        class="hidden peer"
                        checked={formik.values.type === "request"}
                        onChange={formik.handleChange}
                      />

                      <label
                        htmlFor="type-request"
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
                  {formik.touched.type && formik.errors.type ? (
                    <div class="text-red-500 text-sm -mb-8">
                      {formik.errors.type}
                    </div>
                  ) : null}
                  <div>
                    <label
                      htmlFor="restaurant"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Choose Restaurant
                    </label>
                    <Select
                      isSearchable={true}
                      options={restaurantOptions}
                      name="restaurant"
                      id="restaurant"
                      value={restaurantOptions.find(
                        (option) => option.value === formik.values.restaurant
                      )}
                      onChange={(value) => {
                        formik.setFieldValue("restaurant", value.value);
                      }}
                    />
                    {formik.touched.restaurant && formik.errors.restaurant ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.restaurant}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="date"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select Date
                    </label>
                    <DatePicker
                      selected={formik.values.date}
                      onChange={(date) => {
                        formik.setFieldValue("date", date);
                      }}
                    />
                    {formik.touched.date && formik.errors.date ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.date}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="time"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select Time
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formik.values.time}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.time && formik.errors.time ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.time}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      pattern="(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}"
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.phone}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="guests"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Set Number of Guests
                    </label>
                    <input
                      type="number"
                      id="guests"
                      name="guests"
                      value={formik.values.guests}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.guests && formik.errors.guests ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.guests}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="price"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Set Your Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.price && formik.errors.price ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.price}
                      </div>
                    ) : null}
                  </div>{" "}
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

  const renderLoggedOutContent = () => {
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
            class="relative w-full h-auto max-w-md"
            style={{
              position: "fixed",
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
                <p class="mb-4 text-l font-small text-gray-900 dark:text-stone-200">
                  Welcome to Waitless! to submit a new reservation request,
                  please Login or Register!
                </p>
                <div>
                  <Link
                    type="submit"
                    class="w-5/12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
                    font-medium rounded-lg text-sm my-2.5 mx-2.5 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
                     dark:focus:ring-blue-800"
                    to="/login"
                  >
                    Login
                  </Link>
                  <Link
                    type="submit"
                    class="w-5/12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
                     font-medium rounded-lg text-sm my-2.5 mx-2.5 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
                      dark:focus:ring-blue-800"
                    to="/register"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      {props.currentUser ? renderLoggedInContent() : renderLoggedOutContent()}
    </div>
  );
};

export default NewForm;
