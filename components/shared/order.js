import React, { useState } from "react";
import { categories, orderTypes } from "../../utils/data";
import CardOrder from "../cardOrder";

import ListaBox from "../listaBox";

const Order = ({ showOrder }) => {
  const [selected, setSelected] = useState(
    orderTypes.find((typeOrder) => typeOrder.available)
  );

  return (
    <div
      className={`transition-all z-10 w-full ${
        showOrder
          ? "right-0 bottom-[5.5rem] containe text-center sm:w-7/12 md:w-5/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12"
          : "-right-full bottom-[5.5rem] lg:hidden"
      } bg-white top-0 dark:bg-[#1F1D2B]  lg:min-h-screen fixed rounded-xl shadow-md lg:static text-center lg:text-start`}
    >
      <div className="relative pt-4 h-full flex flex-col">
        <div className="flex justify-between items-center px-4">
          {/* <h3 className="text-section text-lg">Order type:</h3> */}
          <h2 className="text-xl text-title text-start">Order #423</h2>
          <ListaBox
            selected={selected}
            setSelected={setSelected}
            lists={orderTypes}
          />
        </div>

        <div className="flex gap-7 pt-3 pb-2 rounded-xl px-7 text-start">
          <p className="flex-auto text-section text-sm">Item</p>
          <p className="text-section text-sm">Qty</p>
          <p className="text-section text-sm">Price</p>
        </div>

        {/* Pedidos */}
        <div className="flex-auto overflow-y-scroll scrollbar-hide px-4 pt-2">
          {categories.broaster.map((dishe) => (
            <CardOrder key={dishe.id} dishe={dishe} />
          ))}
        </div>
        {/* Submit payment */}
        <div className="rounded-xl px-4 py-4 w-full bg-white dark:bg-[#1F1D2B] shadow-[0px_-10px_15px_-3px_rgba(0,0,0,0.1)]">
          <div className="flex items-center justify-between px-1 pb-2 text-sm sm:text-base">
            <p className="font-medium">Discount</p>
            <span className="text-title">$0</span>
          </div>
          <div className="flex items-center justify-between px-1 pb-2 text-sm sm:text-base">
            <p className="font-medium">Total</p>
            <span className="text-title">$120.99</span>
          </div>
          <button
            aria-label="sendOrder"
            aria-labelledby="sendOrder"
            role="button"
            className="btn-primary w-full uppercase"
          >
            Send Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
