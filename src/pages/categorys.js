import { useState, useEffect } from "react";
import { RiEdit2Line, RiDeleteBin6Line, RiAddLine } from "react-icons/ri";
import { Dialog } from "@headlessui/react";
import Layout from "../../components/shared/layout";
import withAuth from "../../components/withAuth";

// Función para obtener datos iniciales (desde localStorage o datos por defecto)
const getInitialCategories = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("categoriesData");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, name: "Entradas", status: "ENABLED" },
          { id: 2, name: "Platos Principales", status: "ENABLED" },
          { id: 3, name: "Postres", status: "ENABLED" },
          { id: 4, name: "Bebidas", status: "DISABLED" },
        ];
  }
  return [];
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    status: "ENABLED",
  });

  // Cargar datos al montar el componente
  useEffect(() => {
    setCategories(getInitialCategories());
  }, []);

  // Guardar datos cuando cambian
  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem("categoriesData", JSON.stringify(categories));
    }
  }, [categories]);

  const openModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        status: category.status,
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: "",
        status: "ENABLED",
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
    if (!formData.name.trim()) {
      alert("Por favor ingrese un nombre para la categoría");
      return;
    }

    if (editingCategory) {
      // Editar categoría existente
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id
            ? {
                ...cat,
                name: formData.name,
                status: formData.status,
              }
            : cat
        )
      );
    } else {
      // Crear nueva categoría
      const newCategory = {
        id: Math.max(...categories.map((c) => c.id), 0) + 1,
        name: formData.name,
        status: formData.status,
      };
      setCategories([...categories, newCategory]);
    }
    setIsOpen(false);
  };

  const handleDelete = (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta categoría?")) return;
    const updatedCategories = categories.filter(
      (category) => category.id !== id
    );
    setCategories(updatedCategories);
    localStorage.setItem("categoriesData", JSON.stringify(updatedCategories));
  };

  return (
    <>
      <Layout title="Categorías" description="Gestión de categorías">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-[#012970] dark:text-[#ec7c6a]">
              Categorías
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
                  <th className="px-4 py-2 text-left">Estado</th>
                  <th className="px-4 py-2 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <tr
                      key={category.id}
                      className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-4 py-2 text-[#012970] dark:text-white">
                        {category.name}
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            category.status === "ENABLED"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {category.status === "ENABLED"
                            ? "Activo"
                            : "Inactivo"}
                        </span>
                      </td>
                      <td className="px-4 py-2 flex gap-2">
                        <button
                          onClick={() => openModal(category)}
                          className="p-2 text-[#012970] dark:text-[#ec7c6a] hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                        >
                          <RiEdit2Line />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="p-2 text-red-600 dark:text-red-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                        >
                          <RiDeleteBin6Line />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      No hay categorías registradas
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
            {editingCategory ? "Editar Categoría" : "Nueva Categoría"}
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
              placeholder="Nombre de la categoría"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Estado:
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg bg-[#f6f9ff] dark:bg-[#252837] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#012970] dark:focus:ring-[#ec7c6a]"
            >
              <option value="ENABLED">Activo</option>
              <option value="DISABLED">Inactivo</option>
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
              {editingCategory ? "Actualizar" : "Crear"}
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default withAuth(Categories);
