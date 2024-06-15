import LabelInput from "@/components/LabelInput";
import { handleLogin, fetchUserRole } from "@/utils/api";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) return;

    console.log("Form submitted:", formData);

    try {
      const response = await handleLogin(formData.username, formData.password);
      localStorage.setItem("accessToken", response.access);

      const user = await fetchUserRole(response.access);
      localStorage.setItem("role", user.role);

      if (user.role === "owner") {
        router.replace("/dashboard/profile");
      } else {
        router.replace("/dashboard/users");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }

    setFormData({ username: "", password: "" });
  };

  return (
    <form
      className="flex flex-col justify-center items-center h-svh"
      onSubmit={handleSubmit}
    >
      <LabelInput
        labelName="Username"
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <LabelInput
        labelName="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="py-4 p-24 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-500 transition-all duration-300 ease-linear"
      >
        Sign In
      </button>
    </form>
  );
}
