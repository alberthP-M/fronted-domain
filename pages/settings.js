import React from "react";
import Layout from "../components/shared/layout";
import withAuth from "../components/withAuth";

const Calendar = () => {
  return (
    <Layout
      title="Configuración"
      description="Explore the meals that will be prepared each day"
    >
      {/* Inicio del contenido dashboard */}
      <h2 className="text-xl text-center text-[#012970] dark:text-white text-title">
        Configuración
      </h2>
      <p className="mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
        inventore aperiam optio natus, non labore necessitatibus beatae totam
        tempore delectus exercitationem. Consequatur sint dignissimos voluptatem
        eligendi dolorem odit distinctio officiis.
      </p>
    </Layout>
  );
};

export default withAuth(Calendar);
