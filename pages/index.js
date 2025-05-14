import { useEffect, useState } from "react";
import { RiEdit2Line, RiDeleteBin6Line, RiAddLine } from "react-icons/ri";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import Layout from "../components/shared/layout";
import CardComida from "../components/cardComida";
import withAuth from "../components/withAuth";

const Home = () => {
  const [foods, setFoods] = useState([]);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : "";

  const fetchFoods = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/foods/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFoods(response.data);
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [token]);

  return (
    <>
      <Layout title="Comidas" description="Gestión de comidas">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-title ">ComiFast</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {foods.map((food) => (
              <CardComida key={food.id} food={food} />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default withAuth(Home);
