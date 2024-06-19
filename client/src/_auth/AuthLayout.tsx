import { Navigate,Outlet } from "react-router-dom";
import Cookies from 'js-cookie';

const AuthLayout = () => {
  const isAuthenticated = Cookies.get('auth') === 'true';

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <div className="flex h-screen">
          <img
            src="/assets/images/side-img.png"
            alt="logo"
            className="hidden xl:block h-full w-60% object-cover bg-no-repeat rounded-lg border-4 border-white shadow-lg"
          />
          <section className="flex flex-1 justify-center items-center flex-col py-10 pl-40">
              <Outlet/>
          </section>
        </div>
      )}
    </>
  );
}

export default AuthLayout;