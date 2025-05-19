import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  RiHome5Line,
  RiPieChart2Line,
  RiMailLine,
  RiNotification3Line,
  RiSettings3Line,
  RiLogoutCircleRLine,
  RiMenu2Fill,
  RiUserLine,
  RiCalendarTodoLine,
  RiCloseLine,
  RiPassExpiredFill,
  RiBrush3Fill,
  RiMailSettingsLine,
  RiSettings2Line,
  RiUserSettingsLine,
} from "react-icons/ri";
import Header from "./header";

const Sidebar = ({ toggleOrder, showOrder }) => {
  const [opennav, setOpennav] = useState(false);

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Eliminar el token
    router.replace("/login"); // Redirigir al login
  };

  const toggle = () => {
    setOpennav(!opennav);
    // console.log(opennav);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`bg-white z-50 dark:bg-[#1F1D2B] fixed overflow-y-scroll scrollbar-hide transition-all ${
          opennav ? "left-0 bottom-[5.5rem]" : "-left-full bottom-[5.5rem]"
        } w-20 sm:w-28 top-0 lg:bottom-0 lg:left-0 py-5 flex flex-col shadow-md justify-between rounded-r-2xl`}
      >
        <ul className="pl-2 sm:pl-4">
          <li>
            <Link aria-label="home" href="/">
              <span>
                <Image
                  className="text-center mx-auto mb-4 w-10 md:w-12 lg:w-14"
                  src="/logo.png"
                  width={50}
                  height={50}
                  priority
                  alt="logo de ComiFast"
                />
              </span>
            </Link>
          </li>
          <li className={router.pathname === "/" ? "listaActiva" : "lista"}>
            <Link href="/" legacyBehavior>
              <a aria-label="home">
                <RiHome5Line className="icon" />
              </a>
            </Link>
          </li>
          <li
            className={router.pathname === "/foods" ? "listaActiva" : "lista"}
          >
            <Link href="/foods" legacyBehavior>
              <a aria-label="foods">
                <RiPieChart2Line className="icon" />
              </a>
            </Link>
          </li>
          <li
            className={
              router.pathname === "/categorys" ? "listaActiva" : "lista"
            }
          >
            <Link href="/categorys" legacyBehavior>
              <a aria-label="categorys">
                <RiBrush3Fill className="icon" />
              </a>
            </Link>
          </li>
          <li
            className={
              router.pathname === "/messages" ? "listaActiva" : "lista"
            }
          >
            <Link href="/messages" legacyBehavior>
              <a aria-label="messages">
                <RiMailLine className="icon" />
              </a>
            </Link>
          </li>
          <li
            className={
              router.pathname === "/personal" ? "listaActiva" : "lista"
            }
          >
            <Link href="/personal" legacyBehavior>
              <a aria-label="personal">
                <RiUserSettingsLine className="icon" />
              </a>
            </Link>
          </li>
          <li
            className={
              router.pathname === "/settings" ? "listaActiva" : "lista"
            }
          >
            <Link href="/settings" legacyBehavior>
              <a aria-label="settings">
                <RiSettings2Line className="icon" />
              </a>
            </Link>
          </li>
        </ul>
        <ul className="pl-2 sm:pl-4">
          <li className="lista">
            <button
              onClick={handleLogout}
              aria-label="Logout"
              className="flex items-center"
            >
              <RiLogoutCircleRLine className="icon" />
            </button>
          </li>
        </ul>
      </div>
      {/* Sidebar collapse nav mobile */}
      <nav className="bg-white dark:bg-[#282637] mx-4 fixed z-50 bottom-3 right-0 left-0 px-4 py-3 rounded-3xl flex justify-around shadow-lg dark:shadow-gray-900 dark:border-t-[1px] dark:border-[#242231] lg:hidden">
        {/* reutilzidando coidog del sidebar */}
        <button
          aria-labelledby="menu"
          aria-label="menu"
          role="button"
          onClick={toggle}
          className={`navLink ${
            opennav ? "shadow-blue-100 dark:shadow-[#ec7b6a3a]" : ""
          }`}
        >
          {opennav ? (
            <RiCloseLine className="text-xl text-[#012970] dark:text-[#ec7c6a]" />
          ) : (
            <RiMenu2Fill className="text-xl text-[#012970] dark:text-[#ec7c6a]" />
          )}
        </button>

        <button
          aria-labelledby="profile"
          aria-label="profile"
          role="button"
          className="navLink"
        >
          <RiUserLine className="text-xl text-[#012970] dark:text-[#ec7c6a]" />
        </button>
        <button
          aria-labelledby="profile"
          aria-label="profile"
          role="button"
          className="navLink"
        >
          <RiUserLine className="text-xl text-[#012970] dark:text-[#ec7c6a]" />
        </button>
        {/* boton para abrir la orden */}
        <button
          aria-labelledby="order"
          aria-label="order"
          role="button"
          onClick={toggleOrder}
          className={`navLink ${
            showOrder ? "shadow-blue-100 dark:shadow-[#ec7b6a3a]" : ""
          }`}
        >
          {showOrder ? (
            <RiCloseLine className="text-xl text-[#012970] dark:text-[#ec7c6a]" />
          ) : (
            <RiPieChart2Line className="text-xl text-[#012970] dark:text-[#ec7c6a]" />
          )}
        </button>
      </nav>
    </>
  );
};

export default Sidebar;
