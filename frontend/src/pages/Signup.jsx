import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/api";

function Signup() {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Signup Successful");

      navigate("/login");
    } catch (error) {
      alert("Signup Failed");
    }
  };

  return (
    <div className="card">
      <h2>Signup</h2>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;