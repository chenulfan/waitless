import { useEffect, useState } from "react";
import Card from "../shared/components/card";
import SearchInput from "../shared/components/searchInput";
import axios from "axios";
import NewForm from "../shared/components/NewForm";
import addSvg from "../shared/svgs/add";
import Select from "react-select";
import { DUMMY_ARR, REST_CAT } from "../shared/constants";

const Home = () => {
  const [currRestaurantArray, setCurrRestaurantArray] = useState(DUMMY_ARR);
  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("https://restaurant-api.dicoding.dev/list")
  //     .then((res) => console.log(res.data.restaurants));
  // }, []);

  const onChangeSearchInput = (inputValue) => {
    inputValue = inputValue.toLowerCase();
    setSearchValue(inputValue);
  };

  useEffect(() => {
    const filtered = DUMMY_ARR.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchValue.toLowerCase());

      const matchesCategories = selectedCategories.every((category) =>
        item.tags.includes(category.value)
      );
      return matchesSearch && matchesCategories;
    });
    setCurrRestaurantArray(filtered);
  }, [selectedCategories, searchValue]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex">
        <div className="flex-initial w-64 ml-4">
          <SearchInput
            label="MY LABEL"
            placeholder="Search For a Restaurant"
            handleInputChangeCB={onChangeSearchInput}
          />
        </div>
        <div className="flex-initial w-64 ml-4 mt-7">
          <Select
            isSearchable={true}
            onChange={(value) => {
              setSelectedCategories(value);
            }}
            isMulti
            name="categories"
            placeholder="Select Categories"
            options={REST_CAT}
          />
        </div>
        <button
          onClick={handleShowModal}
          data-modal-target="authentication-modal"
          data-modal-toggle="authentication-modal"
          className="flex-none w-14 h-14 mt-5 ml-3 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-full"
          type="button"
        >
          {addSvg}
        </button>

        {showModal && <NewForm handleCloseModal={handleCloseModal} />}
      </div>
      <div className="flex justify-between flex-wrap">
        {currRestaurantArray.map((x) => {
          return (
            <Card
              img={x.img}
              imgAlt={x.imgAlt}
              title={x.title}
              content={x.content}
              tags={x.tags}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
