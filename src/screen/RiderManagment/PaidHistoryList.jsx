import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import Header from "../../components/Header";

const PaidHistoryList = () => {
  const { riderId } = useParams();
  const navigate = useNavigate();
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState("all"); // 'all', 'credit', 'debit'

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
      marginBottom: "32px",
    },
    headerSection: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "48px",
      flexWrap: "wrap",
      gap: "24px",
    },
    titleSection: {
      flex: 1,
    },
    mainTitle: {
      fontSize: "42px",
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
    },
    filterSection: {
      display: "flex",
      gap: "12px",
      alignItems: "center",
      flexWrap: "wrap",
    },
    filterButton: {
      padding: "12px 20px",
      fontSize: "14px",
      fontWeight: "600",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    activeFilter: {
      background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      color: "#ffffff",
      boxShadow: "0 6px 20px rgba(59, 130, 246, 0.3)",
    },
    inactiveFilter: {
      background: "rgba(148, 163, 184, 0.1)",
      color: "#94a3b8",
      border: "1px solid rgba(148, 163, 184, 0.2)",
    },
    summaryCards: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "20px",
      marginBottom: "32px",
    },
    summaryCard: {
      background: "rgba(15, 23, 42, 0.3)",
      border: "1px solid rgba(148, 163, 184, 0.05)",
      borderRadius: "12px",
      padding: "20px",
      textAlign: "center",
    },
    summaryNumber: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#ffffff",
      marginBottom: "8px",
    },
    summaryLabel: {
      fontSize: "12px",
      color: "#64748b",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
    creditCard: {
      borderLeft: "4px solid #10b981",
    },
    debitCard: {
      borderLeft: "4px solid #ef4444",
    },
    balanceCard: {
      borderLeft: "4px solid #3b82f6",
    },
    transactionContainer: {
      background:
        "linear-gradient(145deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(148, 163, 184, 0.1)",
      borderRadius: "20px",
      padding: "32px",
      position: "relative",
      overflow: "hidden",
    },
    transactionBefore: {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "1px",
      background:
        "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
    },
    transactionList: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    transactionItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px",
      background: "rgba(15, 23, 42, 0.3)",
      borderRadius: "12px",
      border: "1px solid rgba(148, 163, 184, 0.05)",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    transactionLeft: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      flex: 1,
    },
    transactionIcon: {
      width: "48px",
      height: "48px",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "20px",
      fontWeight: "700",
    },
    creditIcon: {
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      color: "#ffffff",
    },
    debitIcon: {
      background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      color: "#ffffff",
    },
    transactionInfo: {
      flex: 1,
    },
    transactionType: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#ffffff",
      marginBottom: "4px",
    },
    transactionNote: {
      fontSize: "14px",
      color: "#94a3b8",
      lineHeight: "1.4",
      marginBottom: "4px",
    },
    transactionDate: {
      fontSize: "12px",
      color: "#64748b",
    },
    transactionAmount: {
      textAlign: "right",
    },
    creditAmount: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#10b981",
    },
    debitAmount: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#ef4444",
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
    },
  };

  // Spinner component
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
    fetchPaidHistory();
  }, [riderId, filterType]);

  const fetchPaidHistory = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use riderId from params
      const riderIdToUse = riderId || "68bdce297d06247fe2bd85fa";

      let requestBody = {};
      if (filterType !== "all") {
        requestBody.type = filterType;
      }

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/rider/paid-history/${riderIdToUse}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: Object.keys(requestBody).length > 0 ? requestBody : undefined,
        }
      );

      // Extract data from the response structure
      if (response.data.status && response.data.data) {
        setHistoryData(response.data.data);
      } else {
        setHistoryData([]);
      }
    } catch (err) {
      console.error("Error fetching paid history:", err);
      if (err.response?.status === 404) {
        setError("No payment history found for this rider.");
      } else {
        setError("Failed to load payment history. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTransactionHover = (e, isEnter) => {
    if (isEnter) {
      e.currentTarget.style.backgroundColor = "rgba(59, 130, 246, 0.1)";
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.2)";
    } else {
      e.currentTarget.style.backgroundColor = "rgba(15, 23, 42, 0.3)";
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "none";
    }
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  const handleBack = () => {
    navigate(`/rider-details/${riderId}`);
  };

  const handleButtonHover = (e, isEnter, buttonType) => {
    if (isEnter) {
      if (buttonType === "filter") {
        e.target.style.transform = "scale(1.05)";
      } else if (buttonType === "back") {
        e.target.style.background = "rgba(148, 163, 184, 0.2)";
        e.target.style.color = "#e2e8f0";
      }
    } else {
      if (buttonType === "filter") {
        e.target.style.transform = "scale(1)";
      } else if (buttonType === "back") {
        e.target.style.background = "rgba(148, 163, 184, 0.1)";
        e.target.style.color = "#94a3b8";
      }
    }
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
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const calculateSummary = () => {
    if (historyData.length === 0) return null;

    const summary = historyData.reduce(
      (acc, record) => {
        if (record.type === "credit") {
          acc.totalCredit += record.amount;
        } else if (record.type === "debit") {
          acc.totalDebit += record.amount;
        }
        return acc;
      },
      { totalCredit: 0, totalDebit: 0 }
    );

    summary.balance = summary.totalCredit - summary.totalDebit;
    return summary;
  };

  const getFilteredData = () => {
    if (filterType === "all") {
      return historyData;
    }
    return historyData.filter((item) => item.type === filterType);
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <Header />
        <main style={styles.main}>
          <div style={styles.loadingContainer}>
            <SpinnerComponent />
            <div style={styles.loadingText}>Loading payment history...</div>
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
            ← Back
          </button>
          <div style={styles.errorContainer}>
            <h3 style={styles.errorTitle}>⚠️ Error Loading Payment History</h3>
            <p style={styles.errorMessage}>{error}</p>
            <button
              style={styles.retryButton}
              onClick={fetchPaidHistory}
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

  const summary = calculateSummary();
  const filteredData = getFilteredData();

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
          ← Back
        </button>

        <div style={styles.headerSection}>
          <div style={styles.titleSection}>
            <h1 style={styles.mainTitle}>Payment History</h1>
            <p style={styles.subtitle}>
              Complete payment and transaction history records
            </p>
          </div>
          <div style={styles.filterSection}>
            <button
              style={{
                ...styles.filterButton,
                ...(filterType === "all"
                  ? styles.activeFilter
                  : styles.inactiveFilter),
              }}
              onClick={() => handleFilterChange("all")}
              onMouseEnter={(e) => handleButtonHover(e, true, "filter")}
              onMouseLeave={(e) => handleButtonHover(e, false, "filter")}
            >
              All Transactions
            </button>
            <button
              style={{
                ...styles.filterButton,
                ...(filterType === "credit"
                  ? styles.activeFilter
                  : styles.inactiveFilter),
              }}
              onClick={() => handleFilterChange("credit")}
              onMouseEnter={(e) => handleButtonHover(e, true, "filter")}
              onMouseLeave={(e) => handleButtonHover(e, false, "filter")}
            >
              Credits
            </button>
            <button
              style={{
                ...styles.filterButton,
                ...(filterType === "debit"
                  ? styles.activeFilter
                  : styles.inactiveFilter),
              }}
              onClick={() => handleFilterChange("debit")}
              onMouseEnter={(e) => handleButtonHover(e, true, "filter")}
              onMouseLeave={(e) => handleButtonHover(e, false, "filter")}
            >
              Debits
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        {summary && (
          <div style={styles.summaryCards}>
            <div style={{ ...styles.summaryCard, ...styles.creditCard }}>
              <div style={{ ...styles.summaryNumber, color: "#10b981" }}>
                {formatCurrency(summary.totalCredit)}
              </div>
              <div style={styles.summaryLabel}>Total Credits</div>
            </div>
            <div style={{ ...styles.summaryCard, ...styles.debitCard }}>
              <div style={{ ...styles.summaryNumber, color: "#ef4444" }}>
                {formatCurrency(summary.totalDebit)}
              </div>
              <div style={styles.summaryLabel}>Total Debits</div>
            </div>
            <div style={{ ...styles.summaryCard, ...styles.balanceCard }}>
              <div
                style={{
                  ...styles.summaryNumber,
                  color: summary.balance >= 0 ? "#10b981" : "#ef4444",
                }}
              >
                {formatCurrency(summary.balance)}
              </div>
              <div style={styles.summaryLabel}>Current Balance</div>
            </div>
          </div>
        )}

        {/* Transaction List */}
        {filteredData.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>💳</div>
            <h3 style={styles.emptyTitle}>No Payment History Found</h3>
            <p style={styles.emptyDescription}>
              No {filterType === "all" ? "" : filterType} transaction records
              available for this rider
            </p>
          </div>
        ) : (
          <div style={styles.transactionContainer}>
            <div style={styles.transactionBefore}></div>
            <div style={styles.transactionList}>
              {filteredData
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((transaction) => (
                  <div
                    key={transaction._id}
                    style={styles.transactionItem}
                    onMouseEnter={(e) => handleTransactionHover(e, true)}
                    onMouseLeave={(e) => handleTransactionHover(e, false)}
                  >
                    <div style={styles.transactionLeft}>
                      <div
                        style={{
                          ...styles.transactionIcon,
                          ...(transaction.type === "credit"
                            ? styles.creditIcon
                            : styles.debitIcon),
                        }}
                      >
                        {transaction.type === "credit" ? "↗️" : "↙️"}
                      </div>
                      <div style={styles.transactionInfo}>
                        <div style={styles.transactionType}>
                          {transaction.type === "credit" ? "Credit" : "Debit"}{" "}
                          Transaction
                        </div>
                        <div style={styles.transactionNote}>
                          {transaction.note}
                        </div>
                        <div style={styles.transactionDate}>
                          {formatDate(transaction.createdAt)}
                        </div>
                      </div>
                    </div>
                    <div style={styles.transactionAmount}>
                      <div
                        style={
                          transaction.type === "credit"
                            ? styles.creditAmount
                            : styles.debitAmount
                        }
                      >
                        {transaction.type === "credit" ? "+" : "-"}{" "}
                        {formatCurrency(transaction.amount)}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PaidHistoryList;
