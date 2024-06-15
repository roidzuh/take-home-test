import MainLayout from "@/components/MainLayout";
import { useState, useEffect } from "react";
import { fetchUserRole } from "@/utils/api";

export default function ProfilePage() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    async function fetchData() {
      try {
        const data = await fetchUserRole(accessToken);
        setUser(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <MainLayout>
      <div className="flex flex-col gap-4 p-6">
        <p className="text-lg font-bold">First Name: {user.first_name}</p>
        <p className="text-lg font-bold">Last Name: {user.last_name}</p>
        <p className="text-lg font-bold">Username: {user.username}</p>
        <p className="text-lg font-bold">Role: {user.role}</p>
      </div>
    </MainLayout>
  );
}
