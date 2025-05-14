import { useState } from "react";
import { useTheme } from "next-themes";
import Head from "next/head";
import Image from "next/image";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { useRouter } from "next/router";
import axios from "axios";

const Login = () => {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );

      const { token } = response.data;
      localStorage.setItem("authToken", token);
      router.push("/");
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f9ff] dark:bg-[#252837]">
      <Head>
        <title>Login - ComiFast</title>
      </Head>
      <div className="w-full max-w-md bg-white dark:bg-[#1e1f2b] shadow-lg rounded-lg p-6">
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" width={80} height={80} alt="Logo" />
        </div>
        <h2 className="text-2xl font-bold text-[#012970] dark:text-[#ec7c6a] text-center">
          Iniciar Sesión
        </h2>
        <form className="mt-4" onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-300 mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg bg-[#f6f9ff] dark:bg-[#252837] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#012970] dark:focus:ring-[#ec7c6a]"
              placeholder="usuario@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-600 dark:text-gray-300 mb-2">
              Contraseña
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 border rounded-lg bg-[#f6f9ff] dark:bg-[#252837] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#012970] dark:focus:ring-[#ec7c6a]"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute top-9 right-4 text-gray-600 dark:text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-[#012970] dark:bg-[#ec7c6a] text-white py-2 rounded-lg mt-4 hover:opacity-90"
          >
            Iniciar Sesión
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          ¿No tienes una cuenta?{" "}
          <span
            className="text-[#012970] dark:text-[#ec7c6a] font-semibold cursor-pointer hover:underline"
            onClick={() => router.push("/register")}
          >
            Regístrate
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
