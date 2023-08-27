import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Switch from "../Switch";

export default () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    return navigate("/login", { replace: true });
  };

  useEffect(() => {
    const storage = localStorage.getItem("login");
    if (!storage) return navigate("/login", { replace: true });
  }, []);

  return (
    <div style={{ padding: "20px " }}>
      <span>Home Entry</span>
      <Switch />
      <button type="button" onClick={handleLogout}>
        登出
      </button>
    </div>
  );
};
