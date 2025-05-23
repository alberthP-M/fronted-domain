import Image from "next/image";
import React from "react";
import { RiEditLine, RiDeleteBin6Line } from "react-icons/ri";

const CardOrder = ({ dishe }) => {
  return (
    <div className="bg-card3 hover:translate-y-0 rounded-lg py-4 px-3 mb-4 shadow-lg">
      <div className="flex gap-2 items-center">
        <div className="flex-auto overflow-ellipsis flex gap-2 items-center">
          <div className="overflow-hidden rounded-full">
            <Image
              src={dishe.img}
              alt="Imagen de comida"
              width={60}
              height={60}
              className="w-10 h-10 scale-125 object-cover"
            />
          </div>
          <div className="flex flex-col w-36 md:w-32 lg:w-36 xl:w-40 2xl:w-44">
            <h3 className="truncate text-start font-semibold text-sm">
              {dishe.title}
            </h3>
            <p className="text-section text-start text-xs">$ {dishe.price}</p>
          </div>
        </div>
        <p className="card-form px-4 text-sm">2</p>
        <p className="text-section text-sm">$15.99</p>
      </div>
      {/* seccion de notas y actions */}
      <div className="flex pt-3 gap-3 items-center">
        <button
          aria-labelledby="editOrder"
          aria-label="editOrder"
          role="button"
          className="btn-edit"
        >
          <RiEditLine className="text-base sm:text-lg md:text-xl" />
        </button>
        <div className="flex-auto">
          <input
            type="text"
            placeholder="Order Note"
            className="card-form placeholder:text-sm text-sm w-full"
          />
        </div>
        <button
          aria-labelledby="deleteOrder"
          aria-label="deleteOrder"
          role="button"
          className="btn-delete"
        >
          <RiDeleteBin6Line className="text-base sm:text-lg md:text-xl" />
        </button>
      </div>
    </div>
  );
};

export default CardOrder;
