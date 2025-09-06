import React from "react";

const Header = () => {
  const styles = {
    header: {
      backgroundColor: "rgba(15, 23, 42, 0.95)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid rgba(148, 163, 184, 0.1)",
      position: "sticky",
      top: 0,
      zIndex: 100,
    },
    headerContent: {
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "0 32px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "72px",
    },
    headerTitle: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#ffffff",
      margin: 0,
      letterSpacing: "-0.025em",
    },
    headerSubtitle: {
      fontSize: "14px",
      color: "#64748b",
      marginTop: "2px",
    },
    userSection: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    userAvatar: {
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      backgroundColor: "#3b82f6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#ffffff",
      fontWeight: "600",
      fontSize: "14px",
    },
    welcomeText: {
      fontSize: "14px",
      color: "#e2e8f0",
      fontWeight: "500",
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        <div>
          <h1 style={styles.headerTitle}>DeliveryPro</h1>
          <div style={styles.headerSubtitle}>Management Console</div>
        </div>
        <div style={styles.userSection}>
          <div>
            <div style={styles.welcomeText}>Admin Dashboard</div>
          </div>
          <div style={styles.userAvatar}>AD</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
