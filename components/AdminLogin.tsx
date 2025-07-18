"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = () => {
    localStorage.setItem("sadhana_admin_username", username);
    localStorage.setItem("sadhana_admin_password", password);

    if (
      username === process.env.NEXT_PUBLIC_ADMIN_USERNAME &&
      password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    ) {
      alert("login successfull");
    } else {
      alert("Wrong username or password");
    }
  };

  return (
    <div className=" flex justify-center items-center w-full min-h-[calc(100vh-200px)] bg-white">
      <div className="max-w-5xl flex flex-col gap-4">
        <h2 className="w-full font-semibold text-2xl text-center">
          Login to Admin Dashboard
        </h2>
        <Input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="w-full"
        />
        <Input
          type="text"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full"
        />
        <Button className="w-full" onClick={loginHandler}>
          LOGIN
        </Button>
      </div>
    </div>
  );
}
