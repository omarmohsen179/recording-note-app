import React, { useState } from "react";
import { login, register } from "../services/api";
import axios from "axios";
function Auth({ onAuthSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = isRegister ? await register(form) : await login(form);
      axios.defaults.headers.common.Authorization = `Bearer ${response.access}`;
      localStorage.setItem("token", response.access);
      onAuthSuccess();
    } catch (error) {
      alert("Authentication failed.");
    }
  };

  return (
    <div style={{ margin: "auto" }}>
      <h2>{isRegister ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Switch to Login" : "Switch to Register"}
      </button>
    </div>
  );
}

export default Auth;
