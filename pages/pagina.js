import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import {
  RiEyeLine,
  RiEyeOffLine,
  RiCalendarLine,
  RiUserLine,
  RiPhoneLine,
  RiRestaurantLine,
} from "react-icons/ri";

const Pagina = () => {
  // Estados para el formulario de reserva
  const [reserva, setReserva] = useState({
    nombre: "",
    personas: 2,
    fecha: "",
    hora: "",
    telefono: "",
  });

  // Datos ficticios
  const [platosDestacados] = useState([
    {
      id: 1,
      nombre: "Lomo Saltado",
      descripcion: "Clásico peruano con carne, papas y arroz",
      precio: 35,
      categoria: "Platos Principales",
      imagen: "https://via.placeholder.com/300x200?text=Lomo+Saltado",
    },
    {
      id: 2,
      nombre: "Ceviche Mixto",
      descripcion: "Pescado y mariscos marinados en limón",
      precio: 28,
      categoria: "Entradas",
      imagen: "https://via.placeholder.com/300x200?text=Ceviche+Mixto",
    },
    {
      id: 3,
      nombre: "Suspiro Limeño",
      descripcion: "Postre tradicional de manjar blanco y merengue",
      precio: 15,
      categoria: "Postres",
      imagen: "https://via.placeholder.com/300x200?text=Suspiro+Limeño",
    },
  ]);

  const [categorias] = useState([
    "Entradas",
    "Platos Principales",
    "Postres",
    "Bebidas",
  ]);
  const [publicaciones] = useState([
    {
      id: 1,
      titulo: "Nuevo Menú de Temporada",
      contenido:
        "Presentamos nuestro nuevo menú con ingredientes de temporada.",
      autor: "Chef Principal",
      createdAt: "2023-06-15",
    },
    {
      id: 2,
      titulo: "Horario Especial de Verano",
      contenido:
        "Durante julio y agosto extendemos nuestro horario hasta la medianoche.",
      autor: "Gerencia",
      createdAt: "2023-05-20",
    },
  ]);

  const socialLinks = [
    { icon: "facebook", url: "https://facebook.com" },
    { icon: "instagram", url: "https://instagram.com" },
    { icon: "whatsapp", url: "https://wa.me/123456789" },
  ];

  const handleReservaChange = (e) => {
    const { name, value } = e.target;
    setReserva((prev) => ({ ...prev, [name]: value }));
  };

  const submitReserva = (e) => {
    e.preventDefault();
    alert(`Reserva confirmada para ${reserva.nombre}`);
    setReserva({
      nombre: "",
      personas: 2,
      fecha: "",
      hora: "",
      telefono: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#252837]">
      <Head>
        <title>Restaurante ComiFast</title>
      </Head>

      {/* Hero Section */}
      <section className="relative bg-[#012970] dark:bg-[#1e1f2b] text-white h-96 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl font-bold mb-4">Restaurante ComiFast</h1>
          <p className="text-xl mb-8">Sabores auténticos que enamoran</p>
          <div className="flex justify-center gap-4">
            <button
              className="p-3 bg-[#ec7c6a] hover:bg-[#e56955] text-white font-bold rounded-lg transition-colors"
              onClick={() =>
                document.getElementById("reservas")?.scrollIntoView()
              }
            >
              Reserva Ahora
            </button>
            <button
              className="p-3 bg-[#012970] hover:bg-[#001a4d] text-white font-bold rounded-lg transition-colors"
              onClick={() => (window.location.href = "/login")}
            >
              Administrar
            </button>
          </div>
        </div>
      </section>

      {/* Sección de Platos Destacados */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#012970] dark:text-[#ec7c6a] mb-12">
          Nuestros Platos Destacados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {platosDestacados.map((plato) => (
            <div
              key={plato.id}
              className="bg-white dark:bg-[#1e1f2b] shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#012970] dark:text-[#ec7c6a] mb-2">
                  {plato.nombre}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {plato.descripcion}
                </p>
                <p className="text-amber-600 font-bold">
                  S/ {plato.precio.toFixed(2)}
                </p>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300 mt-2">
                  {plato.categoria}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección de Categorías */}
      <section className="py-12 bg-gray-100 dark:bg-[#252837]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#012970] dark:text-[#ec7c6a] mb-12">
            Nuestro Menú
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categorias.map((categoria, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#1e1f2b] p-6 rounded-lg shadow-md text-center hover:bg-amber-50 dark:hover:bg-[#2a2b3a] cursor-pointer transition-colors"
              >
                <RiRestaurantLine className="mx-auto text-4xl text-amber-600 mb-3" />
                <h3 className="text-xl font-semibold text-[#012970] dark:text-[#ec7c6a]">
                  {categoria}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Reservas */}
      <section id="reservas" className="py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#012970] dark:text-[#ec7c6a] mb-8">
          Reserva una Mesa
        </h2>
        <div className="bg-white dark:bg-[#1e1f2b] shadow-lg p-6 rounded-lg">
          <form onSubmit={submitReserva}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-600 dark:text-gray-300 mb-2">
                  Nombre
                </label>
                <div className="relative">
                  <RiUserLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="nombre"
                    value={reserva.nombre}
                    onChange={handleReservaChange}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg bg-[#f6f9ff] dark:bg-[#252837] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#012970] dark:focus:ring-[#ec7c6a]"
                    placeholder="Tu nombre"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-600 dark:text-gray-300 mb-2">
                  Número de Personas
                </label>
                <input
                  type="number"
                  name="personas"
                  min="1"
                  max="10"
                  value={reserva.personas}
                  onChange={handleReservaChange}
                  className="w-full px-4 py-2 border rounded-lg bg-[#f6f9ff] dark:bg-[#252837] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#012970] dark:focus:ring-[#ec7c6a]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 dark:text-gray-300 mb-2">
                  Fecha
                </label>
                <div className="relative">
                  <RiCalendarLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    name="fecha"
                    value={reserva.fecha}
                    onChange={handleReservaChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg bg-[#f6f9ff] dark:bg-[#252837] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#012970] dark:focus:ring-[#ec7c6a]"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-600 dark:text-gray-300 mb-2">
                  Hora
                </label>
                <select
                  name="hora"
                  value={reserva.hora}
                  onChange={handleReservaChange}
                  className="w-full px-4 py-2 border rounded-lg bg-[#f6f9ff] dark:bg-[#252837] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#012970] dark:focus:ring-[#ec7c6a]"
                  required
                >
                  <option value="">Selecciona una hora</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="7:00 PM">7:00 PM</option>
                  <option value="8:00 PM">8:00 PM</option>
                  <option value="9:00 PM">9:00 PM</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-600 dark:text-gray-300 mb-2">
                  Teléfono
                </label>
                <div className="relative">
                  <RiPhoneLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    name="telefono"
                    value={reserva.telefono}
                    onChange={handleReservaChange}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg bg-[#f6f9ff] dark:bg-[#252837] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#012970] dark:focus:ring-[#ec7c6a]"
                    placeholder="Tu teléfono"
                    required
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#012970] dark:bg-[#ec7c6a] text-white py-3 rounded-lg mt-6 hover:opacity-90 transition-opacity"
            >
              Confirmar Reserva
            </button>
          </form>
        </div>
      </section>

      {/* Sección de Noticias/Eventos */}
      {publicaciones.length > 0 && (
        <section className="py-12 px-4 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#012970] dark:text-[#ec7c6a] mb-12">
            Eventos y Noticias
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicaciones.map((publicacion) => (
              <div
                key={publicacion.id}
                className="bg-white dark:bg-[#1e1f2b] shadow-lg rounded-lg hover:shadow-xl transition-shadow p-6"
              >
                <h3 className="text-xl font-bold text-[#012970] dark:text-[#ec7c6a] mb-2">
                  {publicacion.titulo}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {publicacion.contenido}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>Autor: {publicacion.autor}</span>
                  <span>
                    {new Date(publicacion.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-[#012970] dark:bg-[#1e1f2b] text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Restaurante ComiFast</h3>
              <p className="mb-4">Dirección: Av. Principal 123, Bolivia</p>
              <p>Teléfono: 63354864</p>
              <p>Email: info@comifast.com</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Horario</h3>
              <p className="mb-2">Lunes a Viernes: 12:00 PM - 10:00 PM</p>
              <p>Sábado y Domingo: 11:00 AM - 11:00 PM</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl hover:text-amber-400 transition-colors"
                  ></a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Restaurante ComiFast. Todos los
              derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Pagina;
