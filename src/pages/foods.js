import { useState, useEffect } from "react";
import { RiEdit2Line, RiDeleteBin6Line, RiAddLine } from "react-icons/ri";
import { Dialog } from "@headlessui/react";
import Layout from "../../components/shared/layout";
import withAuth from "../../components/withAuth";

// Datos ficticios iniciales (ahora se guardan en localStorage)
const getInitialFoods = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("foodsData");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: "Lomo Saltado",
            description: "Clásico peruano con carne, papas y arroz",
            price: 35,
            category: "2",
          },
          {
            id: 2,
            name: "Ceviche Mixto",
            description: "Pescado y mariscos marinados en limón",
            price: 28,
            category: "1",
          },
          {
            id: 3,
            name: "Suspiro Limeño",
            description: "Postre tradicional de manjar blanco y merengue",
            price: 15,
            category: "3",
          },
        ];
  }
  return [];
};

const initialCategories = [
  { id: "1", name: "Entradas" },
  { id: "2", name: "Platos Principales" },
  { id: "3", name: "Postres" },
  { id: "4", name: "Bebidas" },
];

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  // Cargar y guardar datos en localStorage
  useEffect(() => {
    setFoods(getInitialFoods());
    setCategories(initialCategories);
  }, []);

  useEffect(() => {
    if (foods.length > 0) {
      localStorage.setItem("foodsData", JSON.stringify(foods));
    }
  }, [foods]);

  const openModal = (food = null) => {
    if (food) {
      setEditingFood(food);
      setFormData({
        name: food.name,
        description: food.description,
        price: food.price.toString(),
        category: food.category,
      });
    } else {
      setEditingFood(null);
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
      });
    }
    setIsOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.price || !formData.category) {
      alert("Por favor complete los campos obligatorios");
      return;
    }

    const priceNumber = parseFloat(formData.price);
    if (isNaN(priceNumber)) {
      alert("Por favor ingrese un precio válido");
      return;
    }

    if (editingFood) {
      // Editar comida existente
      setFoods(
        foods.map((f) =>
          f.id === editingFood.id
            ? {
                ...f,
                name: formData.name,
                description: formData.description,
                price: priceNumber,
                category: formData.category,
              }
            : f
        )
      );
    } else {
      // Crear nueva comida
      const newFood = {
        id: Math.max(...foods.map((f) => f.id), 0) + 1,
        name: formData.name,
        description: formData.description,
        price: priceNumber,
        category: formData.category,
      };
      setFoods([...foods, newFood]);
    }
    setIsOpen(false);
  };

  const handleDelete = (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta comida?")) return;
    const updatedFoods = foods.filter((food) => food.id !== id);
    setFoods(updatedFoods);
    localStorage.setItem("foodsData", JSON.stringify(updatedFoods));
  };

  return (
    <>
      <Layout title="Comidas" description="Gestión de comidas">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-[#012970] dark:text-[#ec7c6a]">
              Comidas
            </h2>
            <button
              onClick={() => openModal()}
              className="flex items-center gap-2 bg-[#012970] dark:bg-[#ec7c6a] text-white px-4 py-2 rounded-lg shadow-md hover:opacity-90 transition-opacity"
            >
              <RiAddLine /> Crear
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  <th className="px-4 py-2 text-left">Nombre</th>
                  <th className="px-4 py-2 text-left">Descripción</th>
                  <th className="px-4 py-2 text-left">Precio</th>
                  <th className="px-4 py-2 text-left">Categoría</th>
                  <th className="px-4 py-2 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {foods.length > 0 ? (
                  foods.map((food) => {
                    const foodCategory = categories.find(
                      (cat) => cat.id === food.category
                    );
                    return (
                      <tr
                        key={food.id}
                        className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="px-4 py-2 text-[#012970] dark:text-white">
                          {food.name}
                        </td>
                        <td className="px-4 py-2 text-gray-600 dark:text-gray-300">
                          {food.description}
                        </td>
                        <td className="px-4 py-2 font-semibold text-green-600 dark:text-green-400">
                          {food.price.toFixed(2)} Bs.
                        </td>
                        <td className="px-4 py-2">
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                            {foodCategory?.name || "Sin categoría"}
                          </span>
                        </td>
                        <td className="px-4 py-2 flex gap-2">
                          <button
                            onClick={() => openModal(food)}
                            className="p-2 text-[#012970] dark:text-[#ec7c6a] hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                          >
                            <RiEdit2Line />
                          </button>
                          <button
                            onClick={() => handleDelete(food.id)}
                            className="p-2 text-red-600 dark:text-red-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                          >
                            <RiDeleteBin6Line />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      No hay comidas registradas
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>

      {/* Modal para crear/editar */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 z-50"
      >
        <Dialog.Panel className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
          <Dialog.Title className="text-lg font-semibold text-[#012970] dark:text-[#ec7c6a]">
            {editingFood ? "Editar Comida" : "Nueva Comida"}
          </Dialog.Title>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg bg-[#f6f9ff] dark:bg-[#252837] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#012970] dark:focus:ring-[#ec7c6a]"
              placeholder="Nombre de la comida"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Descripción:
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg bg-[#f6f9ff] dark:bg-[#252837] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#012970] dark:focus:ring-[#ec7c6a]"
              rows="3"
              placeholder="Descripción detallada"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Precio (Bs.) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg bg-[#f6f9ff] dark:bg-[#252837] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#012970] dark:focus:ring-[#ec7c6a]"
              placeholder="Precio en bolivianos"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Categoría <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg bg-[#f6f9ff] dark:bg-[#252837] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#012970] dark:focus:ring-[#ec7c6a]"
              required
            >
              <option value="">Seleccione una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:opacity-90 transition-opacity"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#012970] dark:bg-[#ec7c6a] text-white rounded-md hover:opacity-90 transition-opacity"
            >
              {editingFood ? "Actualizar" : "Crear"}
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default withAuth(Foods);
