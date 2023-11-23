"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";

export const LogoutButton = () => {
  const [isPending, setIsPending] = useState(false);

  const handleLogout = async () => {
    if (isPending) return;
    setIsPending(true);

    try {
      await signOut();
      setIsPending(false);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      disabled={isPending}
      onClick={handleLogout}
      className="btn-primary btn"
    >
      {isPending ? (
        <span className="loading loading-ring loading-md"></span>
      ) : (
        <>
          Wyloguj
          <RiLogoutBoxRLine />
        </>
      )}
    </button>
  );
};
