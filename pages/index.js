import Layout from "../components/shared/layout";
import { Listbox, Tab, Transition } from "@headlessui/react";
import { categories, tables } from "../utils/data";
import Card from "../components/card";
import { Fragment, useState } from "react";
import ListaBox from "../components/listaBox";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  // estado del valor seleccionado para las mesas
  const [selected, setSelected] = useState(
    tables.find((table) => table.available)
  );
  return (
    <>
      <Layout title="Order" description="ComiFast for order section">
        {/* Inicio del contenido dashboard */}
        {/* Nav para los tipos de comida usando tabs */}
        <nav className="w-full pb-3 rounded-md">
          {/* usando headlessui */}
          <Tab.Group>
            <Tab.List className="flex gap-3 justify-center overflow-x-scroll scrollbar-hide">
              {/* llamamos a los nombres de las posiciones del json */}
              {Object.keys(categories).map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      "capitalize navLink font-semibold text-sm md:text-base py-1 px-4 mb-5 focus-visible:outline-none",
                      selected
                        ? "text-[#012970] dark:text-[#ec7c6a] text-title shadow-blue-100 dark:shadow-[#ec7b6a3a]"
                        : ""
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            {/* Seccion de contenido de tabs */}
            <Tab.Panels>
              <div className="flex items-center justify-between pt-5 pb-2">
                <h2 className=" text-xl md:text-2xl text-title">
                  Choose Dishes
                </h2>
                {/* Lista de mesas */}
                <ListaBox
                  selected={selected}
                  setSelected={setSelected}
                  lists={tables}
                />
              </div>
              {Object.values(categories).map((dishes, index) => (
                <Tab.Panel
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                >
                  {/* Contenido del tab */}
                  {dishes.map((dishe) => (
                    // item
                    <Card key={dishe.id} dishe={dishe} />
                  ))}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </nav>
      </Layout>
    </>
  );
}
