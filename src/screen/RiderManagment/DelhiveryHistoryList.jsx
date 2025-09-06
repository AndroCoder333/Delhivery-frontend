import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router";
import Header from "../../components/Header";

const DeliveryHistoryList = () => {
    const navigate = useNavigate();
  const { riderId } = useParams(); // Get riderId from URL if routing is set up
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterPaid, setFilterPaid] = useState(false); // Filter for paid/unpaid records

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
    // Add History Button Styles
    addHistorySection: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px",
      flexWrap: "wrap",
      gap: "16px",
    },
    addHistoryButton: {
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
    addHistoryButtonIcon: {
      marginRight: "8px",
      fontSize: "18px",
    },
    tableContainer: {
      background:
        "linear-gradient(145deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(148, 163, 184, 0.1)",
      borderRadius: "20px",
      padding: "32px",
      position: "relative",
      overflow: "hidden",
    },
    tableBefore: {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "1px",
      background:
        "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "transparent",
    },
    tableHeader: {
      backgroundColor: "rgba(15, 23, 42, 0.5)",
    },
    th: {
      padding: "16px 12px",
      textAlign: "left",
      fontSize: "12px",
      fontWeight: "600",
      color: "#e2e8f0",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      borderBottom: "1px solid rgba(148, 163, 184, 0.1)",
      position: "sticky",
      top: 0,
      background: "rgba(15, 23, 42, 0.8)",
      backdropFilter: "blur(10px)",
    },
    td: {
      padding: "16px 12px",
      fontSize: "14px",
      color: "#ffffff",
      borderBottom: "1px solid rgba(148, 163, 184, 0.05)",
      fontWeight: "500",
    },
    tableRow: {
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    evenRow: {
      backgroundColor: "rgba(15, 23, 42, 0.2)",
    },
    oddRow: {
      backgroundColor: "rgba(30, 41, 59, 0.1)",
    },
    successValue: {
      color: "#10b981",
      fontWeight: "600",
    },
    cancelValue: {
      color: "#f59e0b",
      fontWeight: "600",
    },
    earningsValue: {
      color: "#3b82f6",
      fontWeight: "600",
    },
    companyValue: {
      color: "#8b5cf6",
      fontWeight: "600",
    },
    paidStatus: {
      padding: "4px 8px",
      borderRadius: "12px",
      fontSize: "11px",
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
    paidTrue: {
      background: "rgba(16, 185, 129, 0.2)",
      color: "#10b981",
    },
    paidFalse: {
      background: "rgba(239, 68, 68, 0.2)",
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
    fetchDeliveryHistory();
  }, [riderId, filterPaid]);

  const fetchDeliveryHistory = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use riderId from params or default
      const riderIdToUse = riderId || "68bc868f1047a6cb37490661";

      // Build query parameters
      const queryParams = new URLSearchParams({
        isPaid: filterPaid.toString(),
        riderId: riderIdToUse,
      });

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/rider/get-all-delivery-payment-history?${queryParams}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Extract data from the response structure
      if (response.data.status && response.data.data) {
        setHistoryData(response.data.data);
      } else {
        setHistoryData([]);
      }
    } catch (err) {
      console.error("Error fetching delivery history:", err);
      if (err.response?.status === 404) {
        setError("No delivery history found for this rider.");
      } else {
        setError("Failed to load delivery history. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRowHover = (e, isEnter) => {
    if (isEnter) {
      e.currentTarget.style.backgroundColor = "rgba(59, 130, 246, 0.1)";
      e.currentTarget.style.transform = "scale(1.01)";
    } else {
      const isEven = e.currentTarget.dataset.index % 2 === 0;
      e.currentTarget.style.backgroundColor = isEven
        ? "rgba(15, 23, 42, 0.2)"
        : "rgba(30, 41, 59, 0.1)";
      e.currentTarget.style.transform = "scale(1)";
    }
  };

  const handleFilterChange = (isPaid) => {
    setFilterPaid(isPaid);
  };

  const handleBack = () => {
    window.history.back();
  };

  // Add History Button Handler
  const handleAddHistory = () => {
    console.log("Add History button clicked for rider:", riderId);
    navigate(`/add-delhivery-history/${riderId}`);
    // Add your navigation logic here
    // Example: navigate(`/rider/add-history/${riderId}`) or open modal
  };

  const handleAddHistoryHover = (e, isEnter) => {
    if (isEnter) {
      e.target.style.transform = "translateY(-2px) scale(1.05)";
      e.target.style.boxShadow = "0 12px 30px rgba(16, 185, 129, 0.4)";
    } else {
      e.target.style.transform = "translateY(0) scale(1)";
      e.target.style.boxShadow = "0 8px 25px rgba(16, 185, 129, 0.3)";
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

    const totals = historyData.reduce(
      (acc, record) => ({
        totalAssigned: acc.totalAssigned + record.assignedParcels,
        totalDelivered: acc.totalDelivered + record.successfulDelivered,
        totalRVP: acc.totalRVP + record.successfulRVP,
        totalCanceled: acc.totalCanceled + record.canceledByCode,
        totalRiderEarnings: acc.totalRiderEarnings + record.riderEarning,
        totalCompanyMargin: acc.totalCompanyMargin + record.companyMargin,
        totalCashDeposited: acc.totalCashDeposited + record.cashedDeposited,
      }),
      {
        totalAssigned: 0,
        totalDelivered: 0,
        totalRVP: 0,
        totalCanceled: 0,
        totalRiderEarnings: 0,
        totalCompanyMargin: 0,
        totalCashDeposited: 0,
      }
    );

    return totals;
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <Header />
        <main style={styles.main}>
          <div style={styles.loadingContainer}>
            <SpinnerComponent />
            <div style={styles.loadingText}>Loading delivery history...</div>
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
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(148, 163, 184, 0.2)";
              e.target.style.color = "#e2e8f0";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(148, 163, 184, 0.1)";
              e.target.style.color = "#94a3b8";
            }}
          >
            ← Back
          </button>
          <div style={styles.errorContainer}>
            <h3 style={styles.errorTitle}>⚠️ Error Loading History</h3>
            <p style={styles.errorMessage}>{error}</p>
            <button
              style={styles.retryButton}
              onClick={fetchDeliveryHistory}
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

  return (
    <div style={styles.container}>
      <Header />

      <main style={styles.main}>
        <button
          style={styles.backButton}
          onClick={handleBack}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(148, 163, 184, 0.2)";
            e.target.style.color = "#e2e8f0";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(148, 163, 184, 0.1)";
            e.target.style.color = "#94a3b8";
          }}
        >
          ← Back
        </button>

        <div style={styles.headerSection}>
          <div style={styles.titleSection}>
            <h1 style={styles.mainTitle}>Delivery History</h1>
            <p style={styles.subtitle}>
              Complete delivery and payment history records
            </p>
          </div>
          <div style={styles.filterSection}>
            <button
              style={{
                ...styles.filterButton,
                ...(filterPaid === false
                  ? styles.activeFilter
                  : styles.inactiveFilter),
              }}
              onClick={() => handleFilterChange(false)}
            >
              Unpaid
            </button>
            <button
              style={{
                ...styles.filterButton,
                ...(filterPaid === true
                  ? styles.activeFilter
                  : styles.inactiveFilter),
              }}
              onClick={() => handleFilterChange(true)}
            >
              Paid
            </button>
          </div>
        </div>

        {/* Add History Button Section */}
        <div style={styles.addHistorySection}>
          <button
            style={styles.addHistoryButton}
            onClick={handleAddHistory}
            onMouseEnter={(e) => handleAddHistoryHover(e, true)}
            onMouseLeave={(e) => handleAddHistoryHover(e, false)}
          >
            <span style={styles.addHistoryButtonIcon}>+</span>
            Add History
          </button>
        </div>

        {/* Summary Cards */}
        {summary && (
          <div style={styles.summaryCards}>
            <div style={styles.summaryCard}>
              <div style={styles.summaryNumber}>{summary.totalAssigned}</div>
              <div style={styles.summaryLabel}>Total Assigned</div>
            </div>
            <div style={styles.summaryCard}>
              <div style={styles.summaryNumber}>{summary.totalDelivered}</div>
              <div style={styles.summaryLabel}>Successful Delivered</div>
            </div>
            <div style={styles.summaryCard}>
              <div style={styles.summaryNumber}>{summary.totalRVP}</div>
              <div style={styles.summaryLabel}>Successful RVP</div>
            </div>
            <div style={styles.summaryCard}>
              <div style={styles.summaryNumber}>
                {formatCurrency(summary.totalRiderEarnings)}
              </div>
              <div style={styles.summaryLabel}>Total Rider Earnings</div>
            </div>
            <div style={styles.summaryCard}>
              <div style={styles.summaryNumber}>
                {formatCurrency(summary.totalCompanyMargin)}
              </div>
              {/* <div style={styles.summaryLabel}>Company Margin</div> */}
            </div>
          </div>
        )}

        {/* History Table */}
        {historyData.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📦</div>
            <h3 style={styles.emptyTitle}>No Delivery History Found</h3>
            <p style={styles.emptyDescription}>
              No {filterPaid ? "paid" : "unpaid"} delivery records available for
              this rider
            </p>
          </div>
        ) : (
          <div style={styles.tableContainer}>
            <div style={styles.tableBefore}></div>
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead style={styles.tableHeader}>
                  <tr>
                    <th style={styles.th}>Date Created</th>
                    <th style={styles.th}>Assigned Parcels</th>
                    <th style={styles.th}>Successful Delivered</th>
                    <th style={styles.th}>Successful RVP</th>
                    <th style={styles.th}>Canceled by Code</th>
                    <th style={styles.th}>Cash Deposited</th>
                    <th style={styles.th}>Rider Earning</th>
                    <th style={styles.th}>Payment Status</th>
                  </tr>
                </thead>
                <tbody>
                  {historyData.map((record, index) => (
                    <tr
                      key={record._id || index}
                      style={{
                        ...styles.tableRow,
                        ...(index % 2 === 0 ? styles.evenRow : styles.oddRow),
                      }}
                      data-index={index}
                      onMouseEnter={(e) => handleRowHover(e, true)}
                      onMouseLeave={(e) => handleRowHover(e, false)}
                    >
                      <td style={styles.td}>{formatDate(record.createdAt)}</td>
                      <td style={styles.td}>{record.assignedParcels}</td>
                      <td style={{ ...styles.td, ...styles.successValue }}>
                        {record.successfulDelivered}
                      </td>
                      <td style={{ ...styles.td, ...styles.successValue }}>
                        {record.successfulRVP}
                      </td>
                      <td style={{ ...styles.td, ...styles.cancelValue }}>
                        {record.canceledByCode}
                      </td>
                      <td style={{ ...styles.td, ...styles.earningsValue }}>
                        {formatCurrency(record.cashedDeposited)}
                      </td>
                      <td style={{ ...styles.td, ...styles.earningsValue }}>
                        {formatCurrency(record.riderEarning)}
                      </td>
                      <td style={styles.td}>
                        <span
                          style={{
                            ...styles.paidStatus,
                            ...(record.isPaid
                              ? styles.paidTrue
                              : styles.paidFalse),
                          }}
                        >
                          {record.isPaid ? "PAID" : "UNPAID"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DeliveryHistoryList;
