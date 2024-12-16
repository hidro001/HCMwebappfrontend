import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();

  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    return (
      <nav className="text-sm dark:text-white">
        <Link to="/" className=" hover:underline">
          Dashboard
        </Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          return (
            <span key={to}>
              {" / "}
              <Link to={to} className="text-blue-500 hover:underline">
                {value}
              </Link>
            </span>
          );
        })}
      </nav>
    );
  };

  return (
    <div className="flex justify-between dark:bg-gray-800 dark:text-white items-center p-4 bg-gray-100 border-b">
      <div className="text-sm">
        Welcome,{" "}
        <span className="font-semibold">user</span>
      </div>
      <div>{generateBreadcrumbs()}</div>
    </div>
  );
};

export default Breadcrumb;
