import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import Header from "../../components/Header";

const RiderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rider, setRider] = useState(null);
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
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "48px 32px",
    },
    headerSection: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "40px",
      flexWrap: "wrap",
      gap: "24px",
    },
    titleSection: {
      flex: 1,
    },
    backButton: {
      display: "flex",
      alignItems: "center",
      padding: "12px 20px",
      background: "rgba(148, 163, 184, 0.1)",
      color: "#94a3b8",
      border: "1px solid rgba(148, 163, 184, 0.2)",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      transition: "all 0.3s ease",
      textDecoration: "none",
      marginBottom: "24px",
    },
    mainTitle: {
      fontSize: "42px",
      fontWeight: "800",
      background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: "8px",
      letterSpacing: "-0.02em",
    },
    subtitle: {
      fontSize: "16px",
      color: "#64748b",
      lineHeight: "1.6",
    },
    actionButtons: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
    },
    updateButton: {
      display: "flex",
      alignItems: "center",
      padding: "14px 24px",
      background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      color: "#ffffff",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: "0 6px 20px rgba(59, 130, 246, 0.3)",
    },
    debtButton: {
      display: "flex",
      alignItems: "center",
      padding: "14px 24px",
      background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      color: "#ffffff",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: "0 6px 20px rgba(245, 158, 11, 0.3)",
    },
    detailsContainer: {
      background:
        "linear-gradient(145deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(148, 163, 184, 0.1)",
      borderRadius: "20px",
      padding: "40px",
      position: "relative",
      overflow: "hidden",
    },
    detailsBefore: {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "1px",
      background:
        "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
    },
    riderProfile: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "32px",
      padding: "32px",
      background: "rgba(15, 23, 42, 0.5)",
      borderRadius: "16px",
      border: "1px solid rgba(148, 163, 184, 0.05)",
      flexWrap: "wrap",
      gap: "24px",
    },
    riderMainInfo: {
      display: "flex",
      alignItems: "center",
      flex: 1,
      minWidth: "300px",
    },
    riderAvatar: {
      width: "80px",
      height: "80px",
      borderRadius: "20px",
      background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#ffffff",
      fontWeight: "700",
      fontSize: "28px",
      marginRight: "24px",
      boxShadow: "0 12px 30px rgba(59, 130, 246, 0.4)",
    },
    riderInfo: {
      flex: 1,
    },
    riderName: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#ffffff",
      marginBottom: "8px",
      letterSpacing: "-0.025em",
    },
    riderMobile: {
      fontSize: "16px",
      color: "#94a3b8",
      marginBottom: "8px",
    },
    riderEarnings: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#10b981",
    },
    profileButtons: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
    },
    profileButton: {
      display: "flex",
      alignItems: "center",
      padding: "12px 20px",
      background: "rgba(59, 130, 246, 0.1)",
      color: "#3b82f6",
      border: "1px solid rgba(59, 130, 246, 0.2)",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: "600",
      transition: "all 0.3s ease",
      textDecoration: "none",
    },
    historyButton: {
      background: "rgba(16, 185, 129, 0.1)",
      color: "#10b981",
      border: "1px solid rgba(16, 185, 129, 0.2)",
    },
    paidButton: {
      background: "rgba(245, 158, 11, 0.1)",
      color: "#f59e0b",
      border: "1px solid rgba(245, 158, 11, 0.2)",
    },
    riderDetails: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "24px",
    },
    detailCard: {
      padding: "24px",
      background: "rgba(15, 23, 42, 0.3)",
      borderRadius: "12px",
      border: "1px solid rgba(148, 163, 184, 0.05)",
      textAlign: "center",
    },
    detailLabel: {
      fontSize: "12px",
      color: "#64748b",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      marginBottom: "8px",
    },
    detailValue: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#ffffff",
    },
    loadingContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "400px",
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
      padding: "60px 40px",
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
      marginBottom: "20px",
    },
    retryButton: {
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
  };

  // Simple spinner component
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
    fetchRiderDetails();
  }, [id]);

  const fetchRiderDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/rider/${id}`
      );

       const totalAmount = await axios.get(
         `${process.env.REACT_APP_BASE_URL}/rider/total-amount/${id}`
       );

      setRider({ ...response.data, totalEarnings: totalAmount.data.data.balance });
    } catch (err) {
      console.error("Error fetching rider details:", err);
      if (err.response?.status === 404) {
        setError("Rider not found. The rider may have been deleted.");
      } else {
        setError("Failed to load rider details. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = () => {
    console.log("Navigate to update rider:", id);
    navigate(`/update-details/${id}`);
  };

  const handleDebt = () => {
    console.log("Navigate to debt management for rider:", id);
    navigate(`/debt-management/${id}`);
  };

  const handleDeliveryHistory = () => {
    console.log("Navigate to delivery history for rider:", id);
    navigate(`/delhivery-history/${id}`);
  };

  const handlePaidHistory = () => {
    console.log("Navigate to paid amount history for rider:", id);
    // navigate(`/rider/paid-history/${id}`);
  };

  const handleBack = () => {
    navigate("/rider-listing");
  };

  const handleButtonHover = (e, isEnter, buttonType) => {
    if (isEnter) {
      if (buttonType === "update") {
        e.target.style.transform = "translateY(-2px) scale(1.05)";
        e.target.style.boxShadow = "0 10px 25px rgba(59, 130, 246, 0.4)";
      } else if (buttonType === "debt") {
        e.target.style.transform = "translateY(-2px) scale(1.05)";
        e.target.style.boxShadow = "0 10px 25px rgba(245, 158, 11, 0.4)";
      } else if (buttonType === "back") {
        e.target.style.background = "rgba(148, 163, 184, 0.2)";
        e.target.style.color = "#e2e8f0";
      } else if (buttonType === "profile") {
        e.target.style.background = "rgba(59, 130, 246, 0.2)";
        e.target.style.transform = "scale(1.05)";
      } else if (buttonType === "history") {
        e.target.style.background = "rgba(16, 185, 129, 0.2)";
        e.target.style.transform = "scale(1.05)";
      } else if (buttonType === "paid") {
        e.target.style.background = "rgba(245, 158, 11, 0.2)";
        e.target.style.transform = "scale(1.05)";
      }
    } else {
      if (buttonType === "update") {
        e.target.style.transform = "translateY(0) scale(1)";
        e.target.style.boxShadow = "0 6px 20px rgba(59, 130, 246, 0.3)";
      } else if (buttonType === "debt") {
        e.target.style.transform = "translateY(0) scale(1)";
        e.target.style.boxShadow = "0 6px 20px rgba(245, 158, 11, 0.3)";
      } else if (buttonType === "back") {
        e.target.style.background = "rgba(148, 163, 184, 0.1)";
        e.target.style.color = "#94a3b8";
      } else if (buttonType === "profile") {
        e.target.style.background = "rgba(59, 130, 246, 0.1)";
        e.target.style.transform = "scale(1)";
      } else if (buttonType === "history") {
        e.target.style.background = "rgba(16, 185, 129, 0.1)";
        e.target.style.transform = "scale(1)";
      } else if (buttonType === "paid") {
        e.target.style.background = "rgba(245, 158, 11, 0.1)";
        e.target.style.transform = "scale(1)";
      }
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <Header />
        <main style={styles.main}>
          <div style={styles.loadingContainer}>
            <SpinnerComponent />
            <div style={styles.loadingText}>Loading rider details...</div>
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
          <button
            style={styles.backButton}
            onClick={handleBack}
            onMouseEnter={(e) => handleButtonHover(e, true, "back")}
            onMouseLeave={(e) => handleButtonHover(e, false, "back")}
          >
            ← Back to Riders
          </button>
          <div style={styles.errorContainer}>
            <h3 style={styles.errorTitle}>⚠️ Error Loading Rider</h3>
            <p style={styles.errorMessage}>{error}</p>
            <button
              style={styles.retryButton}
              onClick={fetchRiderDetails}
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

  if (!rider) {
    return null;
  }

  return (
    <div style={styles.container}>
      <Header />

      <main style={styles.main}>
        <button
          style={styles.backButton}
          onClick={handleBack}
          onMouseEnter={(e) => handleButtonHover(e, true, "back")}
          onMouseLeave={(e) => handleButtonHover(e, false, "back")}
        >
          ← Back to Riders
        </button>

        <div style={styles.headerSection}>
          <div style={styles.titleSection}>
            <h1 style={styles.mainTitle}>Rider Details</h1>
            <p style={styles.subtitle}>
              Complete information and management options
            </p>
          </div>
          <div style={styles.actionButtons}>
            <button
              style={styles.updateButton}
              onClick={handleUpdate}
              onMouseEnter={(e) => handleButtonHover(e, true, "update")}
              onMouseLeave={(e) => handleButtonHover(e, false, "update")}
            >
              <span style={{ marginRight: "8px" }}>✏️</span>
              Update Details
            </button>
            <button
              style={styles.debtButton}
              onClick={handleDebt}
              onMouseEnter={(e) => handleButtonHover(e, true, "debt")}
              onMouseLeave={(e) => handleButtonHover(e, false, "debt")}
            >
              <span style={{ marginRight: "8px" }}>💳</span>
              Manage Debt
            </button>
          </div>
        </div>

        <div style={styles.detailsContainer}>
          <div style={styles.detailsBefore}></div>

          {/* Rider Profile Section */}
          <div style={styles.riderProfile}>
            <div style={styles.riderMainInfo}>
              <div style={styles.riderAvatar}>{getInitials(rider.name)}</div>
              <div style={styles.riderInfo}>
                <h2 style={styles.riderName}>{rider.name}</h2>
                <p style={styles.riderMobile}>📱 {rider.mobileNumber}</p>
                <p style={styles.riderEarnings}>
                  💰 {formatCurrency(rider.totalEarnings)} (Payable Amount)
                </p>
              </div>
            </div>
            <div style={styles.profileButtons}>
              <button
                style={styles.profileButton}
                onClick={handleDeliveryHistory}
                onMouseEnter={(e) => handleButtonHover(e, true, "history")}
                onMouseLeave={(e) => handleButtonHover(e, false, "history")}
              >
                <span style={{ marginRight: "6px" }}>📦</span>
                Delivery History
              </button>
              <button
                style={{ ...styles.profileButton, ...styles.paidButton }}
                onClick={handlePaidHistory}
                onMouseEnter={(e) => handleButtonHover(e, true, "paid")}
                onMouseLeave={(e) => handleButtonHover(e, false, "paid")}
              >
                <span style={{ marginRight: "6px" }}>💰</span>
                Paid History
              </button>
            </div>
          </div>

          {/* Rider Details Grid */}
          <div style={styles.riderDetails}>
            <div style={styles.detailCard}>
              <div style={styles.detailLabel}>Per Parcel Rate</div>
              <div style={styles.detailValue}>₹{rider.perParcelRate}</div>
            </div>
            <div style={styles.detailCard}>
              <div style={styles.detailLabel}>Joined Date</div>
              <div style={styles.detailValue}>
                {formatDate(rider.createdAt)}
              </div>
            </div>
            <div style={styles.detailCard}>
              <div style={styles.detailLabel}>Last Updated</div>
              <div style={styles.detailValue}>
                {formatDate(rider.updatedAt)}
              </div>
            </div>
            <div style={styles.detailCard}>
              <div style={styles.detailLabel}>Rider ID</div>
              <div style={{ ...styles.detailValue, fontSize: "14px" }}>{rider._id}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RiderDetails;
