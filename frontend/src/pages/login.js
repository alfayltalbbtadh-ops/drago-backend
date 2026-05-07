import React, { useState } from "react";
import { navigate } from "gatsby";
import Layout from "../components/Layout/Layout";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://drago-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/control-panel-92x");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        <div style={styles.box}>
          <h1 style={styles.title}>DRAGO</h1>
          <p style={styles.subtitle}>Admin Access</p>

          {error && <p style={styles.error}>{error}</p>}

          <form onSubmit={handleLogin} style={styles.form}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />

            <button type="submit" style={styles.button}>
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

const styles = {
  container: {
    background: "#000",
    color: "#fff",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    background: "#111",
    padding: "40px",
    borderRadius: "12px",
    width: "300px",
    textAlign: "center",
  },
  title: {
    letterSpacing: "3px",
    marginBottom: "10px",
  },
  subtitle: {
    color: "#aaa",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: "15px",
    padding: "10px",
    background: "#000",
    border: "1px solid #333",
    color: "#fff",
  },
  button: {
    background: "#fff",
    color: "#000",
    padding: "12px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
};

export default LoginPage;