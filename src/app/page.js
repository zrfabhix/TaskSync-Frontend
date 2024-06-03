"use client";
import { useContext, useEffect } from "react";
import Home from "../components/Home/Home";
import authService from "@/api/auth";
import Context from "@/contextApi/Context";

function App() {
  const { user, setuser } = useContext(Context);

  async function getMe() {
    const response = await authService.me();
    if (response.statusCode === 200) {
      setuser(response.data);
    }
  }
  useEffect(() => {
    getMe();
  }, []);

  return (
    <>
      <Home />
    </>
  );
}

export default App;
