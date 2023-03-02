import axios from 'axios';
import { useEffect } from 'react';
import { useState } from "react";
import { Button } from "../shared/components/button";
import Card from '../shared/components/card';
import SearchInput from "../shared/components/searchInput";

const Home = () => {

  const [restaurantFilter, setRestaurantFilter] = useState('');  

  useEffect(()=>{
    console.log("hey")
    axios.get('https://restaurant-api.dicoding.dev/list').then(res => console.log(res.data.restaurants))
  }, [])

  const onChangeSearchInput = (inputVal) => {
    setRestaurantFilter(inputVal)
    console.log(inputVal)
  }

  return (
    <div>
      <div className="w-1/4">
        <SearchInput label="MY LABEL" placeholder="MY PLACE HOLDER" handleInputCahngeCB={onChangeSearchInput} />
      </div>

      <Card 
        img="https://v1.tailwindcss.com/img/card-top.jpg"
        imgAlt="My alt"
        title="my title"
        content="my contnet"
        tags={['tag1', 'tag2','tag3']}

      />
        

    </div>
  );
};

export default Home;
