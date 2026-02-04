import React from "react";

function Layout({ children }) {
  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
      </div>
    </>
  );
}

export default Layout;
