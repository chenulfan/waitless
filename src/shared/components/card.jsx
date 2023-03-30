import Tag from "./tag";
import axios from "axios";
import { useState, useEffect } from "react";

const Card = ({ img, imgAlt, title, content, tags }) => {
  return (
    <div className="m-1 xl:w-1/4 lg:w-1/3 md:w-1/2 sm:w-1/2 rounded overflow-hidden shadow-lg">
      <img className="w-full object-fit:cover h-80" src={img} alt={imgAlt} />

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
