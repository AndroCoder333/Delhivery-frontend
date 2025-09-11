import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Header from "../../components/Header";

const ExpanseProfitList = () => {
  const navigate = useNavigate();
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState("all"); // 'all', 'profit', 'loose'

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
    controlsSection: {
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
    addExpenseButton: {
      display: "flex",
      alignItems: "center",
      padding: "14px 28px",
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      color: "#ffffff",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "600",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: "0 8px 25px rgba(16, 185, 129, 0.3)",
    },
    addExpenseButtonIcon: {
      marginRight: "8px",
      fontSize: "18px",
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
    profitCard: {
      borderLeft: "4px solid #10b981",
    },
    lossCard: {
      borderLeft: "4px solid #ef4444",
    },
    netCard: {
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
    profitIcon: {
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      color: "#ffffff",
    },
    lossIcon: {
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
    profitAmount: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#10b981",
    },
    lossAmount: {
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
    fetchExpenseData();
  }, [filterType]);

  const fetchExpenseData = async () => {
    try {
      setLoading(true);
      setError(null);

      let requestBody = {};
      if (filterType !== "all") {
        requestBody.type = filterType;
      }

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/company/expence`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: Object.keys(requestBody).length > 0 ? requestBody : undefined,
        }
      );

      // Extract data from the response structure
      if (response.data.status && response.data.data) {
        setExpenseData(response.data.data);
      } else {
        setExpenseData([]);
      }
    } catch (err) {
      console.error("Error fetching expense data:", err);
      if (err.response?.status === 404) {
        setError("No expense records found.");
      } else {
        setError("Failed to load expense data. Please try again.");
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

  const handleAddExpense = () => {
    console.log("Add Expense button clicked");
    navigate("/add-expence-profit");
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleButtonHover = (e, isEnter, buttonType) => {
    if (isEnter) {
      if (buttonType === "filter") {
        e.target.style.transform = "scale(1.05)";
      } else if (buttonType === "back") {
        e.target.style.background = "rgba(148, 163, 184, 0.2)";
        e.target.style.color = "#e2e8f0";
      } else if (buttonType === "add") {
        e.target.style.transform = "translateY(-2px) scale(1.05)";
        e.target.style.boxShadow = "0 12px 30px rgba(16, 185, 129, 0.4)";
      }
    } else {
      if (buttonType === "filter") {
        e.target.style.transform = "scale(1)";
      } else if (buttonType === "back") {
        e.target.style.background = "rgba(148, 163, 184, 0.1)";
        e.target.style.color = "#94a3b8";
      } else if (buttonType === "add") {
        e.target.style.transform = "translateY(0) scale(1)";
        e.target.style.boxShadow = "0 8px 25px rgba(16, 185, 129, 0.3)";
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
    if (expenseData.length === 0) return null;

    const summary = expenseData.reduce(
      (acc, record) => {
        if (record.type === "profit") {
          acc.totalProfit += record.amount;
        } else if (record.type === "loose") {
          acc.totalLoss += record.amount;
        }
        return acc;
      },
      { totalProfit: 0, totalLoss: 0 }
    );

    summary.netAmount = summary.totalProfit - summary.totalLoss;
    return summary;
  };

  const getFilteredData = () => {
    if (filterType === "all") {
      return expenseData;
    }
    return expenseData.filter((item) => item.type === filterType);
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <Header />
        <main style={styles.main}>
          <div style={styles.loadingContainer}>
            <SpinnerComponent />
            <div style={styles.loadingText}>Loading expense data...</div>
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
            <h3 style={styles.errorTitle}>⚠️ Error Loading Expense Data</h3>
            <p style={styles.errorMessage}>{error}</p>
            <button
              style={styles.retryButton}
              onClick={fetchExpenseData}
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
          ← Back to Dashboard
        </button>

        <div style={styles.headerSection}>
          <div style={styles.titleSection}>
            <h1 style={styles.mainTitle}>Expense Management</h1>
            <p style={styles.subtitle}>
              Track company expenses, profits and financial records
            </p>
          </div>
          <div style={styles.controlsSection}>
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
              All Records
            </button>
            <button
              style={{
                ...styles.filterButton,
                ...(filterType === "profit"
                  ? styles.activeFilter
                  : styles.inactiveFilter),
              }}
              onClick={() => handleFilterChange("profit")}
              onMouseEnter={(e) => handleButtonHover(e, true, "filter")}
              onMouseLeave={(e) => handleButtonHover(e, false, "filter")}
            >
              Profits
            </button>
            <button
              style={{
                ...styles.filterButton,
                ...(filterType === "loose"
                  ? styles.activeFilter
                  : styles.inactiveFilter),
              }}
              onClick={() => handleFilterChange("loose")}
              onMouseEnter={(e) => handleButtonHover(e, true, "filter")}
              onMouseLeave={(e) => handleButtonHover(e, false, "filter")}
            >
              Expenses
            </button>
            <button
              style={styles.addExpenseButton}
              onClick={handleAddExpense}
              onMouseEnter={(e) => handleButtonHover(e, true, "add")}
              onMouseLeave={(e) => handleButtonHover(e, false, "add")}
            >
              <span style={styles.addExpenseButtonIcon}>+</span>
              Add Expense
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        {summary && (
          <div style={styles.summaryCards}>
            <div style={{ ...styles.summaryCard, ...styles.profitCard }}>
              <div style={{ ...styles.summaryNumber, color: "#10b981" }}>
                {formatCurrency(summary.totalProfit)}
              </div>
              <div style={styles.summaryLabel}>Total Profits</div>
            </div>
            <div style={{ ...styles.summaryCard, ...styles.lossCard }}>
              <div style={{ ...styles.summaryNumber, color: "#ef4444" }}>
                {formatCurrency(summary.totalLoss)}
              </div>
              <div style={styles.summaryLabel}>Total Expenses</div>
            </div>
            <div style={{ ...styles.summaryCard, ...styles.netCard }}>
              <div
                style={{
                  ...styles.summaryNumber,
                  color: summary.netAmount >= 0 ? "#10b981" : "#ef4444",
                }}
              >
                {formatCurrency(summary.netAmount)}
              </div>
              <div style={styles.summaryLabel}>Net Amount</div>
            </div>
          </div>
        )}

        {/* Transaction List */}
        {filteredData.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📊</div>
            <h3 style={styles.emptyTitle}>No Expense Records Found</h3>
            <p style={styles.emptyDescription}>
              No {filterType === "all" ? "" : filterType} records available. Add
              your first expense record to get started.
            </p>
          </div>
        ) : (
          <div style={styles.transactionContainer}>
            <div style={styles.transactionBefore}></div>
            <div style={styles.transactionList}>
              {filteredData
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((expense) => (
                  <div
                    key={expense._id}
                    style={styles.transactionItem}
                    onMouseEnter={(e) => handleTransactionHover(e, true)}
                    onMouseLeave={(e) => handleTransactionHover(e, false)}
                  >
                    <div style={styles.transactionLeft}>
                      <div
                        style={{
                          ...styles.transactionIcon,
                          ...(expense.type === "profit"
                            ? styles.profitIcon
                            : styles.lossIcon),
                        }}
                      >
                        {expense.type === "profit" ? "💰" : "💸"}
                      </div>
                      <div style={styles.transactionInfo}>
                        <div style={styles.transactionType}>
                          {expense.type === "profit" ? "Profit" : "Expense"}{" "}
                          Record
                        </div>
                        <div style={styles.transactionNote}>{expense.Note}</div>
                        <div style={styles.transactionDate}>
                          {formatDate(expense.createdAt)}
                        </div>
                      </div>
                    </div>
                    <div style={styles.transactionAmount}>
                      <div
                        style={
                          expense.type === "profit"
                            ? styles.profitAmount
                            : styles.lossAmount
                        }
                      >
                        {expense.type === "profit" ? "+" : "-"}{" "}
                        {formatCurrency(expense.amount)}
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

export default ExpanseProfitList;
