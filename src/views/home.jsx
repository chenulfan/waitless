import { useEffect, useState } from "react";
import Card from "../shared/components/card";
import SearchInput from "../shared/components/searchInput";
import axios from "axios";
import NewForm from "../shared/components/NewForm";
import addSvg from "../shared/svgs/add";
import Select from "react-select";
import { DUMMY_ARR, REST_CAT, DB_URL } from "../constants";
import { useAuth } from "../utils/AuthContext";

const Home = () => {
  const [currRestaurantArray, setCurrRestaurantArray] = useState(DUMMY_ARR);
  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [restaurants, setRestaurants] = useState(DUMMY_ARR);

  const { currentUser, logout } = useAuth();

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(`${DB_URL}/api/restaurants`, {
        withCredentials: true,
      });
      setRestaurants(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  const checkHealth = async () => {
    try {
      const response = await axios.get(
        "https://waitless.up.railway.app/health",
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error check health:", error);
    }
  };

  useEffect(() => {
    checkHealth();
    fetchRestaurants();
  }, []);

  useEffect(() => {
    if (currentUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [currentUser]);

  const onChangeSearchInput = (inputValue) => {
    inputValue = inputValue.toLowerCase();
    setSearchValue(inputValue);
  };

  useEffect(() => {
    const filtered = restaurants.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchValue.toLowerCase());

      const matchesCategories = selectedCategories.every((category) =>
        item.tags.includes(category.value)
      );
      return matchesSearch && matchesCategories;
    });
    setCurrRestaurantArray(filtered);
  }, [selectedCategories, searchValue, restaurants]);

  // useEffect(() => {
  //   const filtered = DUMMY_ARR.filter((item) => {
  //     const matchesSearch = item.title
  //       .toLowerCase()
  //       .includes(searchValue.toLowerCase());

  //     const matchesCategories = selectedCategories.every((category) =>
  //       item.tags.includes(category.value)
  //     );
  //     return matchesSearch && matchesCategories;
  //   });
  //   setCurrRestaurantArray(filtered);
  // }, [selectedCategories, searchValue]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex items-center ">
        <div className="flex-initial ml-4 w-5/12">
          <SearchInput
            label="MY LABEL"
            placeholder="Search For a Restaurant"
            handleInputChangeCB={onChangeSearchInput}
          />
        </div>
        <div className=" ml-4 w-4/12">
          <Select
            className="border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
            isSearchable={true}
            onChange={(value) => {
              setSelectedCategories(value);
            }}
            isMulti
            name="categories"
            placeholder="Filter"
            options={REST_CAT}
            styles={{
              control: (provided, state) => ({
                ...provided,
                //height:"43px",
                marginTop: "5px",
              }),
            }}
          />
        </div>
        <div className="flex-initial ml-4 w-2/12">
          {" "}
          <button
            onClick={handleShowModal}
            data-modal-target="authentication-modal"
            data-modal-toggle="authentication-modal"
            className="w-14 h-14 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-full"
            type="button"
          >
            {addSvg}
          </button>
        </div>

        {showModal && (
          <NewForm
            handleCloseModal={handleCloseModal}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            restaurants={restaurants}
          />
        )}
      </div>
      <div className="flex justify-between flex-wrap">
        {currRestaurantArray.map((restaurant) => {
          return (
            <Card
              img={restaurant.img}
              imgAlt={restaurant.imgAlt}
              title={restaurant.name}
              description={restaurant.description}
              tags={restaurant.tags}
              reservations={restaurant.reservations}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
