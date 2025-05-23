import { Listbox, Transition } from "@headlessui/react";
import { RiArrowDownSLine, RiTableLine } from "react-icons/ri";
import React, { Fragment } from "react";

const ListaBox = ({ selected, setSelected, lists }) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative z-10">
        <Listbox.Button className="relative button items-center gap-2 w-28 justify-center">
          <span className="text-title text-sm md:text-base">
            {selected.name}
          </span>
          <RiArrowDownSLine className="text-title h-4 w-4" aria-hidden="true" />
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Listbox.Options className="absolute mt-2 bg-card2 w-full rounded-lg p-2">
            {lists.map((list) =>
              list.available ? (
                <Listbox.Option
                  key={list.id}
                  // marcando el elemento activo
                  className="cursor-pointer pl-8 relative rounded-lg hover:bg-[#F6F9FF] dark:hover:bg-[#1F1D2B] p-2"
                  value={list}
                >
                  {/* lista de opciones */}
                  {({ selected }) => (
                    <>
                      {selected ? (
                        <span className="text-title absolute left-3 md:left-2 inset-y-0 flex items-center">
                          <RiTableLine />
                        </span>
                      ) : null}
                      <span
                        className={`truncate ${
                          selected
                            ? "text-title text-sm md:text-base"
                            : "font-normal text-sm md:text-base"
                        }`}
                      >
                        {list.name}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ) : null
            )}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default ListaBox;
