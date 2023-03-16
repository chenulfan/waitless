import Tag from "./tag";
import axios from "axios";
import { useState,useEffect } from "react";

const Card = ({ img, imgAlt, title, content, tags }) => {
  const [imageUrl, setImageUrl] = useState("");

  const getRandomImageUrl = async () => {
    const response = await axios.get(
      "https://api.pexels.com/v1/search?query="+tags.join("+")+"+restaurant+food&per_page=50",
      {
        headers: {
          Authorization: "xRg2VlzNMpo4RaB50omLIecp9TPNLi1fRd0Ujf3ZiwubxYddk047XP4v",
        },
      }
    );
    const images = response.data.photos;
    const randomIndex = Math.floor(Math.random() * images.length);
    setImageUrl(images[randomIndex].src.large);
  };

  useEffect(() => {
    getRandomImageUrl();
  }, [])
  

  return (
    <div className="m-4 xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2 rounded overflow-hidden shadow-lg">
      <img className="w-full object-fit:cover h-80" src={imageUrl} alt={imgAlt} />

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{content}</p>
      </div>

      <div className="px-6 pt-4 pb-2">
        {tags.map((tagTitle, i) => (
          <Tag key={i} title={tagTitle} />
        ))}
      </div>
    </div>
  );
};

export default Card;
