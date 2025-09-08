import React, { useState } from "react";
import axios from "axios";
import Header from "../../components/Header";

const AddNewRider = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    perParcelRate: "",
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
      maxWidth: "800px",
      margin: "0 auto",
      padding: "48px 32px",
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
    inputFocus: {
      borderColor: "#3b82f6",
      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
      backgroundColor: "rgba(15, 23, 42, 0.8)",
    },
    inputError: {
      borderColor: "#ef4444",
      boxShadow: "0 0 0 3px rgba(239, 68, 68, 0.1)",
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
      minWidth: "140px",
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
    inputIcon: {
      position: "absolute",
      right: "16px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#64748b",
      fontSize: "18px",
    },
    inputWrapper: {
      position: "relative",
    },
  };

  // Spinner component for loading state
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

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    // Mobile number validation
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber.trim())) {
      newErrors.mobileNumber = "Please enter a valid 10-digit mobile number";
    }

    // Per parcel rate validation
    if (!formData.perParcelRate) {
      newErrors.perParcelRate = "Per parcel rate is required";
    } else if (
      isNaN(formData.perParcelRate) ||
      Number(formData.perParcelRate) <= 0
    ) {
      newErrors.perParcelRate = "Please enter a valid rate greater than 0";
    } else if (Number(formData.perParcelRate) > 1000) {
      newErrors.perParcelRate = "Rate cannot exceed ₹1000 per parcel";
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
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/rider`,
        {
          name: formData.name.trim(),
          mobileNumber: formData.mobileNumber.trim(),
          perParcelRate: Number(formData.perParcelRate),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Rider added successfully:", response.data);
      setSuccess(true);

      // Reset form
      setFormData({
        name: "",
        mobileNumber: "",
        perParcelRate: "",
      });
      setErrors({});

      window.location.href = "rider-listing";
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error adding rider:", error);

      if (error.response?.data?.message) {
        setErrors({ submit: error.response.data.message });
      } else if (error.response?.status === 409) {
        setErrors({ submit: "A rider with this mobile number already exists" });
      } else {
        setErrors({ submit: "Failed to add rider. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      mobileNumber: "",
      perParcelRate: "",
    });
    setErrors({});
    setSuccess(false);
    // Add navigation back to rider list
    console.log("Navigate back to rider list");
  };

  const handleInputFocus = (e) => {
    e.target.style.borderColor = "#3b82f6";
    e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
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

    if (buttonType === "submit" && !isFormValid()) return;

    if (isEnter) {
      if (buttonType === "submit") {
        e.target.style.transform = "translateY(-2px) scale(1.02)";
        e.target.style.boxShadow = "0 12px 30px rgba(16, 185, 129, 0.4)";
      } else {
        e.target.style.borderColor = "rgba(148, 163, 184, 0.6)";
        e.target.style.color = "#e2e8f0";
      }
    } else {
      if (buttonType === "submit") {
        e.target.style.transform = "translateY(0) scale(1)";
        e.target.style.boxShadow = "0 8px 25px rgba(16, 185, 129, 0.3)";
      } else {
        e.target.style.borderColor = "rgba(148, 163, 184, 0.3)";
        e.target.style.color = "#94a3b8";
      }
    }
  };

  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.mobileNumber.trim() &&
      formData.perParcelRate &&
      Object.keys(errors).length === 0
    );
  };

  return (
    <div style={styles.container}>
      <Header />

      <main style={styles.main}>
        <div style={styles.headerSection}>
          <h1 style={styles.mainTitle}>Add New Rider</h1>
          <p style={styles.subtitle}>
            Register a new delivery rider to your team
          </p>
        </div>

        <div style={styles.formContainer}>
          <div style={styles.formBefore}></div>

          {success && (
            <div style={styles.successMessage}>
              <span>✅</span>
              <span>
                Rider added successfully! You can add another rider or go back
                to the list.
              </span>
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

          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div style={styles.formGroup}>
              <label htmlFor="name" style={styles.label}>
                Rider Name *
              </label>
              <div style={styles.inputWrapper}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  style={styles.input}
                  placeholder="Enter rider full name"
                  disabled={loading}
                />
                <div style={styles.inputIcon}>👤</div>
              </div>
              {errors.name && (
                <div style={styles.errorMessage}>
                  <span>⚠️</span>
                  {errors.name}
                </div>
              )}
            </div>

            {/* Mobile Number Field */}
            <div style={styles.formGroup}>
              <label htmlFor="mobileNumber" style={styles.label}>
                Mobile Number *
              </label>
              <div style={styles.inputWrapper}>
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  style={styles.input}
                  placeholder="Enter 10-digit mobile number"
                  maxLength="10"
                  disabled={loading}
                />
                <div style={styles.inputIcon}>📱</div>
              </div>
              {errors.mobileNumber && (
                <div style={styles.errorMessage}>
                  <span>⚠️</span>
                  {errors.mobileNumber}
                </div>
              )}
            </div>

            {/* Per Parcel Rate Field */}
            <div style={styles.formGroup}>
              <label htmlFor="perParcelRate" style={styles.label}>
                Per Parcel Rate (₹) *
              </label>
              <div style={styles.inputWrapper}>
                <input
                  type="number"
                  id="perParcelRate"
                  name="perParcelRate"
                  value={formData.perParcelRate}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  style={styles.input}
                  placeholder="Enter rate per parcel delivery"
                  min="1"
                  max="1000"
                  disabled={loading}
                />
                <div style={styles.inputIcon}>💰</div>
              </div>
              {errors.perParcelRate && (
                <div style={styles.errorMessage}>
                  <span>⚠️</span>
                  {errors.perParcelRate}
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
                    Adding Rider...
                  </>
                ) : (
                  <>
                    <span style={{ marginRight: "8px" }}>✅</span>
                    Add Rider
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddNewRider;
