import React, { createContext, useContext, useRef } from "react";
import { Toast } from "primereact/toast";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const toastRef = useRef(null);

  const showToast = (
    severity = "info",
    summary = "Info",
    detail = "Message",
  ) => {
    toastRef.current.show({
      severity, // "success" | "info" | "warn" | "error"
      summary, // Short title
      detail, // Message body
      life: 3000, // Duration in ms
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* ✅ PrimeReact Toast container */}
      <Toast ref={toastRef} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
