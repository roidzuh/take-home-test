import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Sidebar() {
  const [role, setRole] = useState("");
  const router = useRouter();
  const currentPath = router.pathname;

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    router.push("/login");
  };

  return (
    <aside className="flex flex-col items-center gap-4 mx-4 mb-4 mt-11 relative min-h-[500px]">
      {role === "admin" ? (
        <Link
          href="/dashboard/users"
          className={`${currentPath === "/dashboard/users" ? "underline" : ""}`}
        >
          Users
        </Link>
      ) : (
        <Link
          href="/dashboard/profile"
          className={`${
            currentPath === "/dashboard/profile" ? "underline" : ""
          }`}
        >
          Profile
        </Link>
      )}
      <Link
        href="/dashboard/articles"
        className={` ${
          currentPath === "/dashboard/articles" ? "underline" : ""
        }`}
      >
        Articles
      </Link>
      <button onClick={handleLogout} className="text-red-500 absolute bottom-0">
        Logout
      </button>
    </aside>
  );
}
