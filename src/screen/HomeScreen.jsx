import React from "react";
import Header from "../components/Header";

const HomeScreen = () => {
  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#0f172a",
      fontFamily:
        '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    },
    main: {
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "48px 32px",
    },
    titleSection: {
      textAlign: "center",
      marginBottom: "56px",
    },
    mainTitle: {
      fontSize: "48px",
      fontWeight: "800",
      background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: "16px",
      letterSpacing: "-0.02em",
    },
    subtitle: {
      fontSize: "18px",
      color: "#94a3b8",
      maxWidth: "500px",
      margin: "0 auto",
      lineHeight: "1.6",
    },
    menuGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
      gap: "32px",
      maxWidth: "1000px",
      margin: "0 auto",
    },
    menuCard: {
      background:
        "linear-gradient(145deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(148, 163, 184, 0.1)",
      borderRadius: "16px",
      padding: "40px 32px",
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      overflow: "hidden",
    },
    menuCardBefore: {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "1px",
      background:
        "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
    },
    iconSection: {
      display: "flex",
      alignItems: "center",
      marginBottom: "24px",
    },
    iconContainer: {
      width: "56px",
      height: "56px",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: "16px",
      transition: "transform 0.3s ease",
    },
    riderIcon: {
      background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)",
    },
    expenseIcon: {
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      boxShadow: "0 8px 25px rgba(16, 185, 129, 0.3)",
    },
    cardContent: {
      flex: 1,
    },
    cardTitle: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#ffffff",
      marginBottom: "8px",
      letterSpacing: "-0.025em",
    },
    cardDescription: {
      fontSize: "15px",
      color: "#94a3b8",
      lineHeight: "1.6",
      marginBottom: "20px",
    },
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
    e.currentTarget.style.boxShadow = "0 25px 50px rgba(0, 0, 0, 0.25)";
    e.currentTarget.style.borderColor = "rgba(148, 163, 184, 0.2)";

    const icon = e.currentTarget.querySelector(".icon-container");
    if (icon) icon.style.transform = "scale(1.1) rotate(5deg)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0) scale(1)";
    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    e.currentTarget.style.borderColor = "rgba(148, 163, 184, 0.1)";

    const icon = e.currentTarget.querySelector(".icon-container");
    if (icon) icon.style.transform = "scale(1) rotate(0deg)";
  };

  const handleRiderManagement = () => {
    console.log("Navigate to Rider Management");
    // Add your navigation logic here
  };

  const handleExpenseManagement = () => {
    console.log("Navigate to Expense Management");
    // Add your navigation logic here
  };

  return (
    <div style={styles.container}>
      <Header />

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.titleSection}>
          <h2 style={styles.mainTitle}>Operations Center</h2>
          <p style={styles.subtitle}>
            Streamline your delivery operations with comprehensive management
            tools
          </p>
        </div>

        {/* Menu Cards */}
        <div style={styles.menuGrid}>
          {/* Rider Management Card */}
          <div
            style={styles.menuCard}
            onClick={handleRiderManagement}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div style={styles.menuCardBefore}></div>
            <div style={styles.iconSection}>
              <div
                className="icon-container"
                style={{ ...styles.iconContainer, ...styles.riderIcon }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="m22 2-5 10-5-5z" />
                </svg>
              </div>
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>Rider Management</h3>
                <p style={styles.cardDescription}>
                  Comprehensive rider oversight, route optimization, and
                  performance analytics
                </p>
              </div>
            </div>
          </div>

          {/* Expense Management Card */}
          <div
            style={styles.menuCard}
            onClick={handleExpenseManagement}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div style={styles.menuCardBefore}></div>
            <div style={styles.iconSection}>
              <div
                className="icon-container"
                style={{ ...styles.iconContainer, ...styles.expenseIcon }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2v20m8-9H4m15.5-5L16 12l3.5 4M8.5 8L5 12l3.5 4" />
                </svg>
              </div>
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>Expense Management</h3>
                <p style={styles.cardDescription}>
                  Advanced financial tracking, budget control, and detailed
                  expense reporting
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeScreen;
