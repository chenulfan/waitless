import { useEffect, useState } from "react";
import Card from "../shared/components/card";
import SearchInput from "../shared/components/searchInput";
import axios from "axios";
import NewForm from "../shared/components/NewForm";
import addSvg from "../shared/svgs/add";

const DUMMY_DATA = {
  img: "https://v1.tailwindcss.com/img/card-top.jpg",
  imgAlt: "My alt",
  title: "my title",
  content: "my content",
  tags: ["tag1", "tag2", "tag3"],
};

const DUMMY_ARR = Array(20).fill(DUMMY_DATA);

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [currRestaurantArray, setCurrRestaurantArray] = useState(DUMMY_ARR);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get("https://restaurant-api.dicoding.dev/list")
      .then((res) => console.log(res.data.restaurants));
  }, []);

  const onChangeSearchInput = (inputValue) => {
    inputValue = inputValue.toLowerCase();
    setSearchInput(inputValue);
    console.log(inputValue);
    const filtered = DUMMY_ARR.filter((item) =>
      item.title.toLowerCase().includes(inputValue)
    );
    setCurrRestaurantArray(filtered);
  };

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
            placeholder="MY PLACE HOLDER"
            handleInputChangeCB={onChangeSearchInput}
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
              img={DUMMY_DATA.img}
              imgAlt={DUMMY_DATA.imgAlt}
              title={DUMMY_DATA.title}
              content={DUMMY_DATA.content}
              tags={DUMMY_DATA.tags}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
