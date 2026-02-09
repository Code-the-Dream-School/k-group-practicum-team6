import React from "react";

function Layout({ children }) {
  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
      </div>
    </>
  );
}

export default Layout;
