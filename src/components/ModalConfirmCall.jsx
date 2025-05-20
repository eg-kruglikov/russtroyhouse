import { useState } from "react";

const ModalConfirmCall = ({
  showModal,
  onClose,
  setShowModal,
  setHidenTel,
}) => {
  if (!showModal) return null;
  const isMobile = window.innerWidth <= 768;
  const confirmCall = () => {
    ym(101296472, "reachGoal", "call_confirmed");
    if (isMobile) {
      window.location.href = "tel:+79264081811";
      setShowModal(false);
      return;
    }
    setHidenTel(false);
    setShowModal(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.4)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          padding: "28px 24px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          textAlign: "center",
          maxWidth: "320px",
          width: "90%",
        }}
      >
        <p
          style={{
            fontSize: "17px",
            fontWeight: "500",
            color: "#1d2d3c",
            marginBottom: "24px",
          }}
        >
          {isMobile
            ? 'Нажмите "Да", чтобы позвонить.'
            : 'Нажмите "Да", чтобы показать номер.'}
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
          <button
            onClick={confirmCall}
            style={{
              backgroundColor: "#ff6a00",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Да
          </button>
          <button
            onClick={() => {
              setShowModal(false);
            }}
            style={{
              backgroundColor: "#f0f0f0",
              color: "#1d2d3c",
              border: "1px solid #ccc",
              padding: "10px 20px",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Нет
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmCall;
