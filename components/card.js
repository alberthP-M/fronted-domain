import Image from "next/image";

const Card = ({ dishe }) => {
  return (
    // <div className="px-4 pt-10 w-full md:w-6/12 xl:w-4/12 2xl:w-3/12"> otra opcion con flex
    <div className="px-4 pt-10">
      <div className="bg-card px-3 pt-6 pb-8 rounded-xl flex flex-col items-center mt-16">
        <div className="overflow-hidden -mt-24 rounded-full shadow-2xl mb-5">
          <Image
            src={dishe.img}
            alt={dishe.title}
            width={500}
            height={500}
            className="w-56 h-56 object-cover scale-125 bg-transparent"
          />
        </div>
        <h2 className="text-section text-lg">{dishe.title}</h2>
        <span className="font-semibold mt-1 text-md">$ {dishe.price}</span>
        <p className="text-gray-500 mt-1">{dishe.stock} Bowls available</p>
      </div>
    </div>
  );
};
export default Card;
