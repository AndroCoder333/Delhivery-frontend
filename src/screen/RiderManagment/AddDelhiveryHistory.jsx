import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import Header from "../../components/Header";

const AddDeliveryHistory = () => {
  const { riderId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    riderId: riderId || "",
    assignedParcels: "",
    successfulDelivered: "",
    canceledByCode: "",
    amountPerParcelToCompany: "19", // Set default value since field is removed
    successfulRVP: "",
    cashedDeposited: "",
    canceledCompensationPerParcel: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#0f172a",
      fontFamily:
        '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    },
    main: {
      maxWidth: "900px",
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
    formGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "24px",
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
      justifyContent: "flex-end",
      marginTop: "32px",
      gridColumn: "1 / -1",
    },
    submitButton: {
      padding: "16px 32px",
      fontSize: "16px",
      fontWeight: "600",
      color: "#ffffff",
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: "0 8px 25px rgba(16, 185, 129, 0.3)",
      position: "relative",
      overflow: "hidden",
      minWidth: "160px",
    },
    submitButtonDisabled: {
      background: "rgba(148, 163, 184, 0.3)",
      cursor: "not-allowed",
      boxShadow: "none",
    },
    cancelButton: {
      padding: "16px 32px",
      fontSize: "16px",
      fontWeight: "600",
      color: "#94a3b8",
      background: "transparent",
      border: "1px solid rgba(148, 163, 184, 0.3)",
      borderRadius: "12px",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    loadingSpinner: {
      width: "20px",
      height: "20px",
      border: "2px solid rgba(255, 255, 255, 0.3)",
      borderTop: "2px solid #ffffff",
      borderRadius: "50%",
      display: "inline-block",
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

    // Assigned parcels validation
    if (!formData.assignedParcels) {
      newErrors.assignedParcels = "Assigned parcels count is required";
    } else if (
      isNaN(formData.assignedParcels) ||
      Number(formData.assignedParcels) <= 0
    ) {
      newErrors.assignedParcels = "Please enter a valid number greater than 0";
    }

    // Successful delivered validation
    if (!formData.successfulDelivered) {
      newErrors.successfulDelivered = "Successful delivered count is required";
    } else if (
      isNaN(formData.successfulDelivered) ||
      Number(formData.successfulDelivered) < 0
    ) {
      newErrors.successfulDelivered =
        "Please enter a valid number (0 or greater)";
    } else if (
      Number(formData.successfulDelivered) > Number(formData.assignedParcels)
    ) {
      newErrors.successfulDelivered = "Cannot exceed assigned parcels count";
    }

    // Canceled by code validation
    if (!formData.canceledByCode) {
      newErrors.canceledByCode = "Canceled by code count is required";
    } else if (
      isNaN(formData.canceledByCode) ||
      Number(formData.canceledByCode) < 0
    ) {
      newErrors.canceledByCode = "Please enter a valid number (0 or greater)";
    } else if (
      Number(formData.canceledByCode) > Number(formData.assignedParcels)
    ) {
      newErrors.canceledByCode = "Cannot exceed assigned parcels count";
    }

    // Successful RVP validation
    if (!formData.successfulRVP) {
      newErrors.successfulRVP = "Successful RVP count is required";
    } else if (
      isNaN(formData.successfulRVP) ||
      Number(formData.successfulRVP) < 0
    ) {
      newErrors.successfulRVP = "Please enter a valid number (0 or greater)";
    }

    // Cash deposited validation
    if (!formData.cashedDeposited) {
      newErrors.cashedDeposited = "Cash deposited amount is required";
    } else if (
      isNaN(formData.cashedDeposited) ||
      Number(formData.cashedDeposited) < 0
    ) {
      newErrors.cashedDeposited = "Please enter a valid amount (0 or greater)";
    }

    // Canceled compensation validation
    if (!formData.canceledCompensationPerParcel) {
      newErrors.canceledCompensationPerParcel =
        "Canceled compensation per parcel is required";
    } else if (
      isNaN(formData.canceledCompensationPerParcel) ||
      Number(formData.canceledCompensationPerParcel) < 0
    ) {
      newErrors.canceledCompensationPerParcel =
        "Please enter a valid amount (0 or greater)";
    }

    // Cross-validation: total delivered + canceled should not exceed assigned
    const totalDelivered = Number(formData.successfulDelivered) || 0;
    const totalCanceled = Number(formData.canceledByCode) || 0;
    const totalAssigned = Number(formData.assignedParcels) || 0;

    if (totalDelivered + totalCanceled > totalAssigned) {
      newErrors.general =
        "Total of successful delivered and canceled cannot exceed assigned parcels";
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
      setSuccess(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const payload = {
        riderId: formData.riderId.trim(),
        assignedParcels: Number(formData.assignedParcels),
        successfulDelivered: Number(formData.successfulDelivered),
        canceledByCode: Number(formData.canceledByCode),
        amountPerParcelToCompany: Number(formData.amountPerParcelToCompany),
        successfulRVP: Number(formData.successfulRVP),
        cashedDeposited: Number(formData.cashedDeposited),
        canceledCompensationPerParcel: Number(
          formData.canceledCompensationPerParcel
        ),
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/rider/delivery-payment-history`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Delivery history added successfully:", response.data);
      setSuccess(true);
      setErrors({});

      // Reset form
      setFormData({
        riderId: riderId || "",
        assignedParcels: "",
        successfulDelivered: "",
        canceledByCode: "",
        amountPerParcelToCompany: "19",
        successfulRVP: "",
        cashedDeposited: "",
        canceledCompensationPerParcel: "",
      });

      // Auto-hide success message and redirect after 3 seconds
      setTimeout(() => {
        setSuccess(false);
        navigate(`/delivery-history/${riderId}`);
      }, 3000);
    } catch (error) {
      console.error("Error adding delivery history:", error);

      if (error.response?.data?.message) {
        setErrors({ submit: error.response.data.message });
      } else if (error.response?.status === 400) {
        setErrors({
          submit: "Invalid data provided. Please check your inputs.",
        });
      } else {
        setErrors({
          submit: "Failed to add delivery history. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      riderId: riderId || "",
      assignedParcels: "",
      successfulDelivered: "",
      canceledByCode: "",
      amountPerParcelToCompany: "19",
      successfulRVP: "",
      cashedDeposited: "",
      canceledCompensationPerParcel: "",
    });
    setErrors({});
    setSuccess(false);
  };

  const handleBack = () => {
    navigate(`/delivery-history/${riderId}`);
  };

  const handleInputFocus = (e) => {
    e.target.style.borderColor = "#10b981";
    e.target.style.boxShadow = "0 0 0 3px rgba(16, 185, 129, 0.1)";
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
    if (loading) return;

    if (isEnter) {
      if (buttonType === "submit") {
        e.target.style.transform = "translateY(-2px) scale(1.02)";
        e.target.style.boxShadow = "0 12px 30px rgba(16, 185, 129, 0.4)";
      } else if (buttonType === "cancel") {
        e.target.style.borderColor = "rgba(148, 163, 184, 0.6)";
        e.target.style.color = "#e2e8f0";
      } else if (buttonType === "back") {
        e.target.style.background = "rgba(148, 163, 184, 0.2)";
        e.target.style.color = "#e2e8f0";
      }
    } else {
      if (buttonType === "submit") {
        e.target.style.transform = "translateY(0) scale(1)";
        e.target.style.boxShadow = "0 8px 25px rgba(16, 185, 129, 0.3)";
      } else if (buttonType === "cancel") {
        e.target.style.borderColor = "rgba(148, 163, 184, 0.3)";
        e.target.style.color = "#94a3b8";
      } else if (buttonType === "back") {
        e.target.style.background = "rgba(148, 163, 184, 0.1)";
        e.target.style.color = "#94a3b8";
      }
    }
  };

  const isFormValid = () => {
    // Only validate the visible fields
    const requiredFields = [
      "assignedParcels",
      "successfulDelivered",
      "canceledByCode",
      "successfulRVP",
      "cashedDeposited",
      "canceledCompensationPerParcel",
    ];

    return (
      requiredFields.every((field) => formData[field] !== "") &&
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
          onMouseEnter={(e) => handleButtonHover(e, true, "back")}
          onMouseLeave={(e) => handleButtonHover(e, false, "back")}
        >
          ← Back to Delivery History
        </button>

        <div style={styles.headerSection}>
          <h1 style={styles.mainTitle}>Add Delivery History</h1>
          <p style={styles.subtitle}>
            Record new delivery and payment history for the rider
          </p>
        </div>

        {/* Rider ID Display */}
        <div style={styles.riderInfo}>
          <div style={styles.riderIdText}>{formData.riderId}</div>
          <div style={styles.riderIdLabel}>Rider ID</div>
        </div>

        <div style={styles.formContainer}>
          <div style={styles.formBefore}></div>

          {success && (
            <div style={styles.successMessage}>
              <span>✅</span>
              <span>Delivery history added successfully! Redirecting...</span>
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

          {errors.general && (
            <div
              style={{
                ...styles.successMessage,
                background: "rgba(239, 68, 68, 0.1)",
                borderColor: "rgba(239, 68, 68, 0.3)",
                color: "#ef4444",
              }}
            >
              <span>⚠️</span>
              <span>{errors.general}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={styles.formGrid}>
              {/* Assigned Parcels Field */}
              <div style={styles.formGroup}>
                <label htmlFor="assignedParcels" style={styles.label}>
                  Assigned Parcels *
                </label>
                <div style={styles.inputWrapper}>
                  <input
                    type="number"
                    id="assignedParcels"
                    name="assignedParcels"
                    value={formData.assignedParcels}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    style={styles.input}
                    placeholder="Enter assigned parcels count"
                    min="1"
                    disabled={loading}
                  />
                  <div style={styles.inputIcon}>📦</div>
                </div>
                {errors.assignedParcels && (
                  <div style={styles.errorMessage}>
                    <span>⚠️</span>
                    {errors.assignedParcels}
                  </div>
                )}
              </div>

              {/* Successful Delivered Field */}
              <div style={styles.formGroup}>
                <label htmlFor="successfulDelivered" style={styles.label}>
                  Successful Delivered *
                </label>
                <div style={styles.inputWrapper}>
                  <input
                    type="number"
                    id="successfulDelivered"
                    name="successfulDelivered"
                    value={formData.successfulDelivered}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    style={styles.input}
                    placeholder="Enter successful deliveries"
                    min="0"
                    disabled={loading}
                  />
                  <div style={styles.inputIcon}>✅</div>
                </div>
                {errors.successfulDelivered && (
                  <div style={styles.errorMessage}>
                    <span>⚠️</span>
                    {errors.successfulDelivered}
                  </div>
                )}
              </div>

              {/* Canceled By Code Field */}
              <div style={styles.formGroup}>
                <label htmlFor="canceledByCode" style={styles.label}>
                  Canceled By Code *
                </label>
                <div style={styles.inputWrapper}>
                  <input
                    type="number"
                    id="canceledByCode"
                    name="canceledByCode"
                    value={formData.canceledByCode}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    style={styles.input}
                    placeholder="Enter canceled count"
                    min="0"
                    disabled={loading}
                  />
                  <div style={styles.inputIcon}>❌</div>
                </div>
                {errors.canceledByCode && (
                  <div style={styles.errorMessage}>
                    <span>⚠️</span>
                    {errors.canceledByCode}
                  </div>
                )}
              </div>

              {/* Successful RVP Field */}
              <div style={styles.formGroup}>
                <label htmlFor="successfulRVP" style={styles.label}>
                  Successful RVP *
                </label>
                <div style={styles.inputWrapper}>
                  <input
                    type="number"
                    id="successfulRVP"
                    name="successfulRVP"
                    value={formData.successfulRVP}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    style={styles.input}
                    placeholder="Enter successful RVP count"
                    min="0"
                    disabled={loading}
                  />
                  <div style={styles.inputIcon}>🔄</div>
                </div>
                {errors.successfulRVP && (
                  <div style={styles.errorMessage}>
                    <span>⚠️</span>
                    {errors.successfulRVP}
                  </div>
                )}
              </div>

              {/* Cash Deposited Field */}
              <div style={styles.formGroup}>
                <label htmlFor="cashedDeposited" style={styles.label}>
                  Cash Deposited (₹) *
                </label>
                <div style={styles.inputWrapper}>
                  <input
                    type="number"
                    id="cashedDeposited"
                    name="cashedDeposited"
                    value={formData.cashedDeposited}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    style={styles.input}
                    placeholder="Enter cash deposited amount"
                    min="0"
                    step="0.01"
                    disabled={loading}
                  />
                  <div style={styles.inputIcon}>💵</div>
                </div>
                {errors.cashedDeposited && (
                  <div style={styles.errorMessage}>
                    <span>⚠️</span>
                    {errors.cashedDeposited}
                  </div>
                )}
              </div>

              {/* Canceled Compensation Field */}
              <div style={styles.formGroup}>
                <label
                  htmlFor="canceledCompensationPerParcel"
                  style={styles.label}
                >
                  Canceled Compensation (₹) *
                </label>
                <div style={styles.inputWrapper}>
                  <input
                    type="number"
                    id="canceledCompensationPerParcel"
                    name="canceledCompensationPerParcel"
                    value={formData.canceledCompensationPerParcel}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    style={styles.input}
                    placeholder="Enter compensation per canceled parcel"
                    min="0"
                    step="0.01"
                    disabled={loading}
                  />
                  <div style={styles.inputIcon}>💳</div>
                </div>
                {errors.canceledCompensationPerParcel && (
                  <div style={styles.errorMessage}>
                    <span>⚠️</span>
                    {errors.canceledCompensationPerParcel}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={styles.buttonGroup}>
                <button
                  type="button"
                  onClick={handleCancel}
                  style={styles.cancelButton}
                  onMouseEnter={(e) => handleButtonHover(e, true, "cancel")}
                  onMouseLeave={(e) => handleButtonHover(e, false, "cancel")}
                  disabled={loading}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={{
                    ...styles.submitButton,
                    ...(loading || !isFormValid()
                      ? styles.submitButtonDisabled
                      : {}),
                  }}
                  onMouseEnter={(e) => handleButtonHover(e, true, "submit")}
                  onMouseLeave={(e) => handleButtonHover(e, false, "submit")}
                  disabled={loading || !isFormValid()}
                >
                  {loading ? (
                    <>
                      <SpinnerComponent />
                      Adding History...
                    </>
                  ) : (
                    <>
                      <span style={{ marginRight: "8px" }}>💾</span>
                      Add History
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddDeliveryHistory;
