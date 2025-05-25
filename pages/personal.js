import { useState, useEffect } from "react";
import {
  RiEdit2Line,
  RiDeleteBin6Line,
  RiAddLine,
  RiUserLine,
  RiMailLine,
  RiPhoneLine,
} from "react-icons/ri";
import { Dialog } from "@headlessui/react";
import Layout from "../components/shared/layout";
import withAuth from "../components/withAuth";

// Tipos de usuario disponibles
const USER_TYPES = {
  NORMAL: "normal",
  EMPLOYEE: "empleado",
  CHEF: "cocinero",
};

// Función para obtener datos iniciales
const getInitialUsers = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("usersData");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: "Juan Pérez",
            email: "juan@example.com",
            phone: "12345678",
            type: USER_TYPES.EMPLOYEE,
          },
          {
            id: 2,
            name: "María García",
            email: "maria@example.com",
            phone: "87654321",
            type: USER_TYPES.CHEF,
          },
          {
            id: 3,
            name: "Carlos López",
            email: "carlos@example.com",
            phone: "55555555",
            type: USER_TYPES.NORMAL,
          },
        ];
  }
  return [];
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: USER_TYPES.NORMAL,
  });

  // Cargar datos al montar el componente
  useEffect(() => {
    setUsers(getInitialUsers());
  }, []);

  // Guardar datos cuando cambian
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("usersData", JSON.stringify(users));
    }
  }, [users]);

  const openModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        type: user.type,
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        type: USER_TYPES.NORMAL,
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

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSave = () => {
    // Validaciones
    if (!formData.name.trim()) {
      alert("Por favor ingrese el nombre del usuario");
      return;
    }

    if (!formData.email.trim()) {
      alert("Por favor ingrese el correo electrónico");
      return;
    }

    if (!validateEmail(formData.email)) {
      alert("Por favor ingrese un correo electrónico válido");
      return;
    }

    if (!formData.phone.trim()) {
      alert("Por favor ingrese el número de teléfono");
      return;
    }

    if (editingUser) {
      // Editar usuario existente
      setUsers(
        users.map((u) =>
          u.id === editingUser.id
            ? {
                ...u,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                type: formData.type,
              }
            : u
        )
      );
    } else {
      // Crear nuevo usuario
      const newUser = {
        id: Math.max(...users.map((u) => u.id), 0) + 1,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        type: formData.type,
      };
      setUsers([...users, newUser]);
    }
    setIsOpen(false);
  };

  const handleDelete = (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("usersData", JSON.stringify(updatedUsers));
  };

  const getUserTypeLabel = (type) => {
    switch (type) {
      case USER_TYPES.NORMAL:
        return "Persona Normal";
      case USER_TYPES.EMPLOYEE:
        return "Empleado";
      case USER_TYPES.CHEF:
        return "Cocinero";
      default:
        return type;
    }
  };

  return (
    <>
      <Layout title="Usuarios" description="Gestión de usuarios">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-[#012970] dark:text-[#ec7c6a]">
              Usuarios
            </h2>
            <button
              onClick={() => openModal()}
              className="flex items-center gap-2 bg-[#012970] dark:bg-[#ec7c6a] text-white px-4 py-2 rounded-lg shadow-md hover:opacity-90 transition-opacity"
            >
              <RiAddLine /> Nuevo Usuario
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  <th className="px-4 py-2 text-left">Nombre</th>
                  <th className="px-4 py-2 text-left">Correo</th>
                  <th className="px-4 py-2 text-left">Teléfono</th>
                  <th className="px-4 py-2 text-left">Tipo</th>
                  <th className="px-4 py-2 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-4 py-2 text-[#012970] dark:text-white">
                        {user.name}
                      </td>
                      <td className="px-4 py-2 text-gray-600 dark:text-gray-300">
                        {user.email}
                      </td>
                      <td className="px-4 py-2 text-gray-600 dark:text-gray-300">
                        {user.phone}
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            user.type === USER_TYPES.NORMAL
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : user.type === USER_TYPES.EMPLOYEE
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                          }`}
                        >
                          {getUserTypeLabel(user.type)}
                        </span>
                      </td>
                      <td className="px-4 py-2 flex gap-2">
                        <button
                          onClick={() => openModal(user)}
                          className="p-2 text-[#012970] dark:text-[#ec7c6a] hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                        >
                          <RiEdit2Line />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
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
                      colSpan="5"
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      No hay usuarios registrados
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
            {editingUser ? "Editar Usuario" : "Nuevo Usuario"}
          </Dialog.Title>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nombre <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <RiUserLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 border rounded-lg bg-[#f6f9ff] dark:bg-[#252837] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#012970] dark:focus:ring-[#ec7c6a]"
                placeholder="Nombre completo"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Correo electrónico <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <RiMailLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 border rounded-lg bg-[#f6f9ff] dark:bg-[#252837] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#012970] dark:focus:ring-[#ec7c6a]"
                placeholder="correo@ejemplo.com"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Teléfono <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <RiPhoneLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 border rounded-lg bg-[#f6f9ff] dark:bg-[#252837] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#012970] dark:focus:ring-[#ec7c6a]"
                placeholder="Número de teléfono"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tipo de usuario <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg bg-[#f6f9ff] dark:bg-[#252837] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#012970] dark:focus:ring-[#ec7c6a]"
              required
            >
              <option value={USER_TYPES.NORMAL}>Persona Normal</option>
              <option value={USER_TYPES.EMPLOYEE}>Empleado</option>
              <option value={USER_TYPES.CHEF}>Cocinero</option>
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
              {editingUser ? "Actualizar" : "Crear"}
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default withAuth(Users);
