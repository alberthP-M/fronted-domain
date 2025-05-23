import { useEffect } from "react";
import { useRouter } from "next/router";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        router.replace("/login"); // Redirige al login si no hay token
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
