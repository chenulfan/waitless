import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "../shared/components/button";
import Card from "../shared/components/card";
import SearchInput from "../shared/components/searchInput";
import NewForm from "../shared/components/NewForm";

const Home = () => {
  const [restaurantFilter, setRestaurantFilter] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log("hey");
    axios
      .get("https://restaurant-api.dicoding.dev/list")
      .then((res) => console.log(res.data.restaurants));
  }, []);

  const onChangeSearchInput = (inputVal) => {
    setRestaurantFilter(inputVal);
    console.log(inputVal);
  };

  const handleShowModal = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }


  return (
    <div>
      <button
        onClick={handleShowModal}
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-full"
        type="button"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
          <path
            fillRule="evenodd"
            d="M11 9V6a1 1 0 00-2 0v3H6a1 1 0 000 2h3v3a1 1 0 102 0v-3h3a1 1 0 100-2h-3z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {showModal && <NewForm handleCloseModal={handleCloseModal} />}

      <div className="w-1/4">
        <SearchInput
          label="MY LABEL"
          placeholder="MY PLACE HOLDER"
          handleInputCahngeCB={onChangeSearchInput}
        />
      </div>

      <Card
        img="https://v1.tailwindcss.com/img/card-top.jpg"
        imgAlt="My alt"
        title="my title"
        content="my contnet"
        tags={["tag1", "tag2", "tag3"]}
      />
    </div>
  );
};

export default Home;
