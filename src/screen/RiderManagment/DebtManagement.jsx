import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import Header from "../../components/Header";

const DebtManagement = () => {
  const { riderId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#0f172a",
      fontFamily:
        '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    },
    main: {
      maxWidth: "800px",
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
      textAlign: "center",
      marginBottom: "48px",
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
    riderInfo: {
      background: "rgba(59, 130, 246, 0.1)",
      border: "1px solid rgba(59, 130, 246, 0.2)",
      borderRadius: "12px",
      padding: "16px 20px",
      marginBottom: "32px",
      textAlign: "center",
    },
    riderIdText: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#ffffff",
      marginBottom: "4px",
    },
    riderIdLabel: {
      fontSize: "12px",
      color: "#94a3b8",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
    formContainer: {
      background:
        "linear-gradient(145deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(148, 163, 184, 0.1)",
      borderRadius: "20px",
      padding: "40px",
      position: "relative",
      overflow: "hidden",
    },
    formBefore: {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "1px",
      background:
        "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
    },
    formGroup: {
      marginBottom: "24px",
    },
    label: {
      display: "block",
      fontSize: "14px",
      fontWeight: "600",
      color: "#e2e8f0",
      marginBottom: "8px",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
    input: {
      width: "100%",
      padding: "16px 20px",
      fontSize: "16px",
      fontWeight: "500",
      color: "#ffffff",
      backgroundColor: "rgba(15, 23, 42, 0.6)",
      border: "1px solid rgba(148, 163, 184, 0.2)",
      borderRadius: "12px",
      outline: "none",
      transition: "all 0.3s ease",
      boxSizing: "border-box",
    },
    textarea: {
      width: "100%",
      minHeight: "100px",
      padding: "16px 20px",
      fontSize: "16px",
      fontWeight: "500",
      color: "#ffffff",
      backgroundColor: "rgba(15, 23, 42, 0.6)",
      border: "1px solid rgba(148, 163, 184, 0.2)",
      borderRadius: "12px",
      outline: "none",
      transition: "all 0.3s ease",
      boxSizing: "border-box",
      resize: "vertical",
      fontFamily: "inherit",
    },
    inputWrapper: {
      position: "relative",
    },
    inputIcon: {
      position: "absolute",
      right: "16px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#64748b",
      fontSize: "18px",
    },
    errorMessage: {
      color: "#ef4444",
      fontSize: "13px",
      marginTop: "6px",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    buttonGroup: {
      display: "flex",
      gap: "16px",
      justifyContent: "space-between",
      marginTop: "32px",
    },
    actionButton: {
      flex: 1,
      padding: "16px 32px",
      fontSize: "16px",
      fontWeight: "600",
      color: "#ffffff",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      overflow: "hidden",
      minHeight: "56px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    debitButton: {
      background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      boxShadow: "0 8px 25px rgba(239, 68, 68, 0.3)",
    },
    creditButton: {
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      boxShadow: "0 8px 25px rgba(16, 185, 129, 0.3)",
    },
    buttonDisabled: {
      background: "rgba(148, 163, 184, 0.3)",
      cursor: "not-allowed",
      boxShadow: "none",
    },
    loadingSpinner: {
      width: "20px",
      height: "20px",
      border: "2px solid rgba(255, 255, 255, 0.3)",
      borderTop: "2px solid #ffffff",
      borderRadius: "50%",
      marginRight: "8px",
    },
    successMessage: {
      background: "rgba(16, 185, 129, 0.1)",
      border: "1px solid rgba(16, 185, 129, 0.3)",
      borderRadius: "12px",
      padding: "16px 20px",
      marginBottom: "24px",
      color: "#10b981",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
  };

  // Spinner component
  const SpinnerComponent = () => {
    const [rotation, setRotation] = useState(0);

    React.useEffect(() => {
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

  const validateForm = () => {
    const newErrors = {};

    // Amount validation
    if (!formData.amount) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(formData.amount) || Number(formData.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount greater than 0";
    } else if (Number(formData.amount) > 50000) {
      newErrors.amount = "Amount cannot exceed ₹50,000";
    }

    // Note validation
    if (!formData.note.trim()) {
      newErrors.note = "Note is required";
    } else if (formData.note.trim().length < 5) {
      newErrors.note = "Note must be at least 5 characters long";
    } else if (formData.note.trim().length > 200) {
      newErrors.note = "Note cannot exceed 200 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Clear success message when user starts editing
    if (success) {
      setSuccess("");
    }
  };

  const handleDebtAction = async (actionType) => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const endpoint = actionType === "debit" ? "debt-borrow" : "debt-repay";
      const payload = {
        amount: Number(formData.amount),
        note: formData.note.trim(),
      };

      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/rider/${endpoint}/${riderId}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.status) {
        const actionText = actionType === "debit" ? "debited" : "credited";
        setSuccess(
          `Amount ${actionText} successfully! ${response.data.message}`
        );
        setErrors({});

        // Reset form
        setFormData({
          amount: "",
          note: "",
        });

        // Auto-hide success message and redirect after 3 seconds
        setTimeout(() => {
          setSuccess("");
          navigate(`/rider-details/${riderId}`);
        }, 3000);
      } else {
        setErrors({
          submit: "Unexpected response from server. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error processing debt action:", error);

      if (error.response?.data?.message) {
        setErrors({ submit: error.response.data.message });
      } else if (error.response?.status === 404) {
        setErrors({ submit: "Rider not found. Please check and try again." });
      } else if (error.response?.status === 400) {
        setErrors({
          submit: "Invalid data provided. Please check your inputs.",
        });
      } else {
        setErrors({
          submit: "Failed to process debt action. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(`/rider-details/${riderId}`);
  };

  const handleInputFocus = (e) => {
    e.target.style.borderColor = "#8b5cf6";
    e.target.style.boxShadow = "0 0 0 3px rgba(139, 92, 246, 0.1)";
    e.target.style.backgroundColor = "rgba(15, 23, 42, 0.8)";
  };

  const handleInputBlur = (e) => {
    const hasError = errors[e.target.name];
    e.target.style.borderColor = hasError
      ? "#ef4444"
      : "rgba(148, 163, 184, 0.2)";
    e.target.style.boxShadow = hasError
      ? "0 0 0 3px rgba(239, 68, 68, 0.1)"
      : "none";
    e.target.style.backgroundColor = "rgba(15, 23, 42, 0.6)";
  };

  const handleButtonHover = (e, isEnter, buttonType) => {
    if (loading || !isFormValid()) return;

    if (isEnter) {
      e.target.style.transform = "translateY(-2px) scale(1.05)";
      if (buttonType === "debit") {
        e.target.style.boxShadow = "0 12px 30px rgba(239, 68, 68, 0.4)";
      } else {
        e.target.style.boxShadow = "0 12px 30px rgba(16, 185, 129, 0.4)";
      }
    } else {
      e.target.style.transform = "translateY(0) scale(1)";
      if (buttonType === "debit") {
        e.target.style.boxShadow = "0 8px 25px rgba(239, 68, 68, 0.3)";
      } else {
        e.target.style.boxShadow = "0 8px 25px rgba(16, 185, 129, 0.3)";
      }
    }
  };

  const handleBackHover = (e, isEnter) => {
    if (isEnter) {
      e.target.style.background = "rgba(148, 163, 184, 0.2)";
      e.target.style.color = "#e2e8f0";
    } else {
      e.target.style.background = "rgba(148, 163, 184, 0.1)";
      e.target.style.color = "#94a3b8";
    }
  };

  const isFormValid = () => {
    return (
      formData.amount &&
      formData.note.trim() &&
      Object.keys(errors).length === 0
    );
  };

  return (
    <div style={styles.container}>
      <Header />

      <main style={styles.main}>
        <button
          style={styles.backButton}
          onClick={handleBack}
          onMouseEnter={(e) => handleBackHover(e, true)}
          onMouseLeave={(e) => handleBackHover(e, false)}
        >
          ← Back to Rider Details
        </button>

        <div style={styles.headerSection}>
          <h1 style={styles.mainTitle}>Debt Management</h1>
          <p style={styles.subtitle}>
            Manage rider debt transactions - borrow or repay amounts
          </p>
        </div>

        {/* Rider ID Display */}
        <div style={styles.riderInfo}>
          <div style={styles.riderIdText}>{riderId}</div>
          <div style={styles.riderIdLabel}>Rider ID</div>
        </div>

        <div style={styles.formContainer}>
          <div style={styles.formBefore}></div>

          {success && (
            <div style={styles.successMessage}>
              <span>✅</span>
              <span>{success}</span>
            </div>
          )}

          {errors.submit && (
            <div
              style={{
                ...styles.successMessage,
                background: "rgba(239, 68, 68, 0.1)",
                borderColor: "rgba(239, 68, 68, 0.3)",
                color: "#ef4444",
              }}
            >
              <span>⚠️</span>
              <span>{errors.submit}</span>
            </div>
          )}

          {/* Amount Field */}
          <div style={styles.formGroup}>
            <label htmlFor="amount" style={styles.label}>
              Amount (₹) *
            </label>
            <div style={styles.inputWrapper}>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                style={styles.input}
                placeholder="Enter amount"
                min="0.01"
                step="0.01"
                max="50000"
                disabled={loading}
              />
              <div style={styles.inputIcon}>💰</div>
            </div>
            {errors.amount && (
              <div style={styles.errorMessage}>
                <span>⚠️</span>
                {errors.amount}
              </div>
            )}
          </div>

          {/* Note Field */}
          <div style={styles.formGroup}>
            <label htmlFor="note" style={styles.label}>
              Note *
            </label>
            <textarea
              id="note"
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              style={styles.textarea}
              placeholder="Enter reason for this debt transaction..."
              maxLength="200"
              disabled={loading}
            />
            <div
              style={{
                fontSize: "12px",
                color: "#64748b",
                textAlign: "right",
                marginTop: "4px",
              }}
            >
              {formData.note.length}/200 characters
            </div>
            {errors.note && (
              <div style={styles.errorMessage}>
                <span>⚠️</span>
                {errors.note}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={styles.buttonGroup}>
            <button
              type="button"
              onClick={() => handleDebtAction("debit")}
              style={{
                ...styles.actionButton,
                ...styles.debitButton,
                ...(loading || !isFormValid() ? styles.buttonDisabled : {}),
              }}
              onMouseEnter={(e) => handleButtonHover(e, true, "debit")}
              onMouseLeave={(e) => handleButtonHover(e, false, "debit")}
              disabled={loading || !isFormValid()}
            >
              {loading ? (
                <>
                  <SpinnerComponent />
                  Processing...
                </>
              ) : (
                <>
                  <span style={{ marginRight: "8px" }}>💳</span>
                  Borrow Amount (Debit)
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleDebtAction("credit")}
              style={{
                ...styles.actionButton,
                ...styles.creditButton,
                ...(loading || !isFormValid() ? styles.buttonDisabled : {}),
              }}
              onMouseEnter={(e) => handleButtonHover(e, true, "credit")}
              onMouseLeave={(e) => handleButtonHover(e, false, "credit")}
              disabled={loading || !isFormValid()}
            >
              {loading ? (
                <>
                  <SpinnerComponent />
                  Processing...
                </>
              ) : (
                <>
                  <span style={{ marginRight: "8px" }}>💵</span>
                  Repay Amount (Credit)
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DebtManagement;
