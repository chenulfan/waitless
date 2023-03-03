import axios from 'axios';
import { useEffect } from 'react';
import { useState } from "react";
import Card from '../shared/components/card';
import SearchInput from "../shared/components/searchInput";

const Home = () => {

  const [restaurantFilter, setRestaurantFilter] = useState('');

  useEffect(() => {
    axios.get('https://restaurant-api.dicoding.dev/list').then(res => console.log(res.data.restaurants))
  }, [])

  const onChangeSearchInput = (inputVal) => {
    setRestaurantFilter(inputVal)
    console.log(inputVal)
  }

  const DUMMY_DATA = {
    img: "https://v1.tailwindcss.com/img/card-top.jpg",
    imgAlt: "My alt",
    title: "my title",
    content: "my contnet",
    tags: ['tag1', 'tag2', 'tag3']
  }

  const DUMMY_ARR = Array(20).fill(DUMMY_DATA)

  return (
    <div>
      <div>
        <SearchInput label="MY LABEL" placeholder="MY PLACE HOLDER" handleInputCahngeCB={onChangeSearchInput} />
      </div>

      <div className='flex justify-between flex-wrap'>

        {DUMMY_ARR.map(x => {
          return (
            <Card
              img={DUMMY_DATA.img}
              imgAlt={DUMMY_DATA.imgAlt}
              title={DUMMY_DATA.title}
              content={DUMMY_DATA.content}
              tags={DUMMY_DATA.tags}
            />
          )}
          )
        }
      </div>

    </div>
  );
};

export default Home;
