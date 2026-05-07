import React, { useEffect, useState } from "react";

export default function ControlPanel92x() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetch("https://drago-backend.onrender.com/api/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.status === 403) {
          window.location.href = "/login";
        }
        return res.json();
      })
      .then(data => {
        setOrders(data);
        setLoading(false);
      });
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  if (loading) {
    return (
      <div style={styles.container}>
        <h2 style={{ color: "#777" }}>Loading DRAGO system...</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>DRAGO CONTROL</h1>
        <button
          style={styles.logout}
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>

      {/* STATS */}
      <div style={styles.stats}>
        <div style={styles.card}>
          <p style={styles.label}>Orders</p>
          <h2 style={styles.number}>{orders.length}</h2>
        </div>

        <div style={styles.card}>
          <p style={styles.label}>Revenue</p>
          <h2 style={styles.number}>${totalRevenue}</h2>
        </div>
      </div>

      {/* ORDERS */}
      <h2 style={styles.sectionTitle}>Recent Orders</h2>

      {orders.length === 0 ? (
        <p style={{ color: "#777" }}>No orders yet</p>
      ) : (
        orders.map((order, i) => (
          <div key={i} style={styles.orderCard}>
            <div style={styles.orderTop}>
              <span>Order #{i + 1}</span>
              <span style={{ color: "#0f0" }}>${order.total}</span>
            </div>

            <div style={styles.items}>
              {order.items.map((item, idx) => (
                <p key={idx} style={styles.item}>
                  {item.name} × {item.quantity}
                </p>
              ))}
            </div>

            {order.email && (
              <p style={styles.email}>{order.email}</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    background: "#000",
    color: "#fff",
    minHeight: "100vh",
    padding: "40px",
    fontFamily: "Arial",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  title: {
    letterSpacing: "3px",
  },

  logout: {
    background: "#fff",
    color: "#000",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  stats: {
    display: "flex",
    gap: "20px",
    marginBottom: "40px",
  },

  card: {
    background: "#111",
    padding: "20px",
    borderRadius: "12px",
    flex: 1,
  },

  label: {
    color: "#777",
  },

  number: {
    fontSize: "28px",
    marginTop: "10px",
  },

  sectionTitle: {
    marginBottom: "20px",
    letterSpacing: "2px",
  },

  orderCard: {
    background: "#111",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "15px",
  },

  orderTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },

  items: {
    color: "#ccc",
  },

  item: {
    margin: "5px 0",
  },

  email: {
    marginTop: "10px",
    color: "#555",
    fontSize: "12px",
  },
};