import Tag from "./tag";
import ReservationAccordion from "./ReservationAccordion";

const Card = ({ img, imgAlt, title, description, tags, reservations }) => {
  return (
    <div className="m-1 xl:w-1/4 lg:w-1/3 md:w-1/2 sm:w-1/2 rounded overflow-hidden shadow-lg">
      <img className="w-full object-fit:cover h-80" src={img} alt={imgAlt} />

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>

      <div className="px-6 pt-4 pb-2">
        {tags.map((tagTitle, i) => (
          <Tag key={i} title={tagTitle} />
        ))}
      </div>
      <ReservationAccordion reservations={reservations} />
    </div>
  );
};

export default Card;
