import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:3000/api/users", {
        fullName,
        email,
        password,
        cellPhone,
        address,
        rol: "admin", // Asignado por defecto
      });

      router.push("/login"); // Redirigir al login tras el registro
    } catch (err) {
      setError("Error al registrarse. Inténtalo nuevamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f9ff] dark:bg-[#252837]">
      <Head>
        <title>Registro - ComiFast</title>
      </Head>
      <div className="w-full max-w-md bg-white dark:bg-[#1e1f2b] shadow-lg rounded-lg p-6">
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" width={80} height={80} alt="Logo" />
        </div>
        <h2 className="text-2xl font-bold text-[#012970] dark:text-[#ec7c6a] text-center">
          Registrarse
        </h2>
        <form className="mt-4" onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-300 mb-2">
              Nombre Completo
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="Tu Nombre"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-300 mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="input-field"
              placeholder="usuario@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-300 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              className="input-field"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-300 mb-2">
              Teléfono
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="123456789"
              value={cellPhone}
              onChange={(e) => setCellPhone(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-300 mb-2">
              Dirección
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="Tu Dirección"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#012970] dark:bg-[#ec7c6a] text-white py-2 rounded-lg mt-4 hover:opacity-90"
          >
            Registrarse
          </button>
          <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
            ¿Ya tienes una cuenta?{" "}
            <a
              href="/login"
              className="text-[#012970] dark:text-[#ec7c6a] font-semibold"
            >
              Inicia Sesión
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
