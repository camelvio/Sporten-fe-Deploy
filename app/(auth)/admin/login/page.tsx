"use client";

import Button from "@/app/(landing)/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { login } from "@/app/services/auth.service";

const LoginPage = () => {
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      push("/admin/products");
    }
  }, [push]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Email dan password harus diisi.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await login({ email, password });
      const token = res.token || res.access_token || res.data?.token;

      if (token) {
        localStorage.setItem("token", token);
        push("/admin/products");
      } else {
        setErrorMessage("Token tidak ditemukan dari respon server.");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setErrorMessage(
        error.message || "Gagal melakukan login. Silakan periksa email dan password Anda."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-[#F7F9FA] w-full min-h-screen flex justify-center items-center">
      <div className="max-w-136 w-full bg-white rounded-xl border-t-4 border-primary py-12 px-[72px]">
        <Image
          src="/images/logo-admin.svg"
          alt="logo admin"
          width={304}
          height={51}
          className="mx-auto mb-4"
        />
        <p className="opacity-50 text-sm text-center mb-9">
          Enter your credentials to access the dashboard
        </p>

        {errorMessage && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="input-group-admin mb-5 flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@store.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
              required
            />
          </div>

          <div className="input-group-admin mb-12 flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-primary text-sm"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg! mb-8 disabled:opacity-50"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;