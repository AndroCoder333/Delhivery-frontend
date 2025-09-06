import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";

const RiderListing = () => {
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    headerSection: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "56px",
      flexWrap: "wrap",
      gap: "24px",
    },
    titleSection: {
      flex: 1,
      textAlign: "left",
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
      lineHeight: "1.6",
      maxWidth: "500px",
    },
    addButton: {
      display: "flex",
      alignItems: "center",
      padding: "16px 32px",
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      color: "#ffffff",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "600",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: "0 8px 25px rgba(16, 185, 129, 0.3)",
      position: "relative",
      overflow: "hidden",
    },
    addButtonIcon: {
      marginRight: "12px",
      fontSize: "18px",
    },
    ridersGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
      gap: "24px",
    },
    riderCard: {
      background:
        "linear-gradient(145deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(148, 163, 184, 0.1)",
      borderRadius: "16px",
      padding: "32px",
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      overflow: "hidden",
    },
    riderCardBefore: {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "1px",
      background:
        "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
    },
    riderHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "0px",
    },
    riderMainInfo: {
      display: "flex",
      alignItems: "center",
      flex: 1,
    },
    riderAvatar: {
      width: "48px",
      height: "48px",
      borderRadius: "12px",
      background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#ffffff",
      fontWeight: "700",
      fontSize: "18px",
      marginRight: "16px",
      boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)",
    },
    riderInfo: {
      flex: 1,
    },
    riderName: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#ffffff",
      marginBottom: "4px",
      letterSpacing: "-0.025em",
    },
    riderMobile: {
      fontSize: "14px",
      color: "#94a3b8",
    },
    riderStatItem: {
      textAlign: "center",
      padding: "12px 16px",
      background: "rgba(15, 23, 42, 0.5)",
      borderRadius: "8px",
      border: "1px solid rgba(148, 163, 184, 0.05)",
      minWidth: "120px",
    },
    riderStatNumber: {
      fontSize: "16px",
      fontWeight: "700",
      color: "#ffffff",
      display: "block",
    },
    riderStatLabel: {
      fontSize: "11px",
      color: "#64748b",
      marginTop: "4px",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
    loadingContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "300px",
    },
    loadingSpinner: {
      width: "40px",
      height: "40px",
      border: "3px solid rgba(59, 130, 246, 0.3)",
      borderTop: "3px solid #3b82f6",
      borderRadius: "50%",
      marginBottom: "16px",
    },
    loadingText: {
      color: "#94a3b8",
      fontSize: "16px",
    },
    errorContainer: {
      textAlign: "center",
      padding: "40px",
      color: "#ef4444",
      background: "rgba(239, 68, 68, 0.1)",
      borderRadius: "12px",
      border: "1px solid rgba(239, 68, 68, 0.2)",
    },
    errorTitle: {
      fontSize: "20px",
      fontWeight: "600",
      marginBottom: "8px",
    },
    errorMessage: {
      fontSize: "14px",
      marginBottom: "16px",
    },
    retryButton: {
      marginTop: "16px",
      padding: "12px 24px",
      background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      color: "#ffffff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
      transition: "all 0.3s ease",
    },
    emptyState: {
      textAlign: "center",
      padding: "60px 40px",
      color: "#94a3b8",
    },
    emptyIcon: {
      fontSize: "48px",
      marginBottom: "16px",
    },
    emptyTitle: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#e2e8f0",
      marginBottom: "8px",
    },
    emptyDescription: {
      fontSize: "14px",
      color: "#64748b",
      marginBottom: "24px",
    },
    emptyAddButton: {
      display: "inline-flex",
      alignItems: "center",
      padding: "12px 24px",
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      color: "#ffffff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
      transition: "all 0.3s ease",
      textDecoration: "none",
    },
  };

  // Simple spinner component without keyframe animations
  const SpinnerComponent = () => {
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setRotation((prev) => (prev + 10) % 360);
      }, 50);

      return () => clearInterval(interval);
    }, []);

    return (
      <div
        style={{
          ...styles.loadingSpinner,
          transform: `rotate(${rotation}deg)`,
        }}
      />
    );
  };

  useEffect(() => {
    fetchRiders();
  }, []);

  const fetchRiders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/rider`
      );
      setRiders(response.data);
    } catch (err) {
      setError(
        "Failed to fetch riders. Please check your connection and try again."
      );
      console.error("Error fetching riders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "translateY(-4px) scale(1.02)";
    e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.2)";
    e.currentTarget.style.borderColor = "rgba(148, 163, 184, 0.2)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0) scale(1)";
    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    e.currentTarget.style.borderColor = "rgba(148, 163, 184, 0.1)";
  };

  const handleRetryClick = (e) => {
    e.target.style.transform = "scale(0.95)";
    setTimeout(() => {
      e.target.style.transform = "scale(1)";
    }, 150);
    fetchRiders();
  };

  const handleAddRiderClick = () => {
    console.log("Navigate to Add Rider form");
    window.location.href = "add-new-rider";
  };

  const handleAddButtonHover = (e, isEnter) => {
    if (isEnter) {
      e.target.style.transform = "translateY(-2px) scale(1.05)";
      e.target.style.boxShadow = "0 12px 30px rgba(16, 185, 129, 0.4)";
    } else {
      e.target.style.transform = "translateY(0) scale(1)";
      e.target.style.boxShadow = "0 8px 25px rgba(16, 185, 129, 0.3)";
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <Header />
        <main style={styles.main}>
          <div style={styles.loadingContainer}>
            <SpinnerComponent />
            <div style={styles.loadingText}>Loading riders...</div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <Header />
        <main style={styles.main}>
          <div style={styles.errorContainer}>
            <h3 style={styles.errorTitle}>⚠️ Error Loading Riders</h3>
            <p style={styles.errorMessage}>{error}</p>
            <button
              style={styles.retryButton}
              onClick={handleRetryClick}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow = "0 8px 25px rgba(59, 130, 246, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "none";
              }}
            >
              🔄 Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Header />

      <main style={styles.main}>
        {/* Header Section with Title and Add Button */}
        <div style={styles.headerSection}>
          <div style={styles.titleSection}>
            <h2 style={styles.mainTitle}>Rider Management</h2>
            <p style={styles.subtitle}>
              View all registered riders in your delivery team
            </p>
          </div>
          <button
            style={styles.addButton}
            onClick={handleAddRiderClick}
            onMouseEnter={(e) => handleAddButtonHover(e, true)}
            onMouseLeave={(e) => handleAddButtonHover(e, false)}
          >
            <span style={styles.addButtonIcon}>+</span>
            Add New Rider
          </button>
        </div>

        {/* Riders Grid */}
        {riders.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>👥</div>
            <h3 style={styles.emptyTitle}>No Riders Found</h3>
            <p style={styles.emptyDescription}>
              Start by adding riders to your delivery team
            </p>
            <button
              style={styles.emptyAddButton}
              onClick={handleAddRiderClick}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow = "0 8px 20px rgba(16, 185, 129, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "none";
              }}
            >
              <span style={{ marginRight: "8px" }}>+</span>
              Add Your First Rider
            </button>
          </div>
        ) : (
          <div style={styles.ridersGrid}>
            {riders.map((rider) => (
              <div
                key={rider._id}
                style={styles.riderCard}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => (window.location.href = `/rider-details/${rider._id}`)}
              >
                <div style={styles.riderCardBefore}></div>
                <div style={styles.riderHeader}>
                  <div style={styles.riderMainInfo}>
                    <div style={styles.riderAvatar}>
                      {getInitials(rider.name)}
                    </div>
                    <div style={styles.riderInfo}>
                      <h3 style={styles.riderName}>{rider.name}</h3>
                      <p style={styles.riderMobile}>{rider.mobileNumber}</p>
                    </div>
                  </div>
                  <div style={styles.riderStatItem}>
                    <span style={styles.riderStatNumber}>
                      {formatCurrency(rider.totalEarnings)}
                    </span>
                    <div style={styles.riderStatLabel}>Total Earnings</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default RiderListing;
