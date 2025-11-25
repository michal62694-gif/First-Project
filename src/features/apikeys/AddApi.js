import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addApi } from "./ApiSlice";

export const AddApi = ({ onClose }) => {
  const [apiName, setApiName] = useState("");
  const [apiAddress, setApiAddress] = useState(null);
  const [apiKey, setApiKey] = useState(null);
  const [copied, setCopied] = useState(false); // מצב האם הועתק
  const dispatch = useDispatch();

  function generateRandomKey() {
    return Math.random().toString(36).substring(2, 15) + "-" + Math.random().toString(36).substring(2, 15);
  }

  const handleCreate = () => {
    if (!apiName.trim()) {
      alert("אנא הכנס שם API");
      return;
    }

    const newApiAddress = `https://myapi.com/${apiName.toLowerCase().replace(/\s+/g, "-")}`;
    const newApiKey = generateRandomKey();
    const newApi = {
      name: apiName,
      key: newApiKey,
      apiAddress: newApiAddress,
      userId: 1,
    };

    dispatch(addApi(newApi));
    setApiAddress(newApiAddress);
    setApiKey(newApiKey);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey)
      .then(() => {
        setCopied(true);
      })
      .catch(() => {
        alert("העתקה נכשלה, אנא העתקי ידנית");
      });
  };

  if (apiAddress) {
    return (
      <div style={modalStyle}>
        <h3>ה-API שלך נוצר בהצלחה!</h3>
        <p>המפתח שלך:</p>
        <div style={apiBoxStyle}>
          {apiKey}
        </div>

        <button onClick={copyToClipboard}>
          {copied ? "הועתק!" : "העתק כתובת"}
        </button>

        {!copied && (
          <p style={{ color: "red", marginTop: "10px" }}>
            חשוב! יש להעתיק את המפתח כעת, אחרת הוא יימחק לאחר סגירת החלון.
          </p>
        )}

        <button 
          onClick={() => {
            if (!copied) {
              alert("אנא העתקי את המפתח לפני הסגירה!");
            } else {
              onClose();
            }
          }} 
          style={{ marginTop: "10px" }}
        >
          סגור
        </button>
      </div>
    );
  }

  return (
    <div style={modalStyle}>
      <h3>צור API חדשה</h3>
      <input
        placeholder="הכנס שם API"
        value={apiName}
        onChange={(e) => setApiName(e.target.value)}
      />
      <div style={{ marginTop: "10px" }}>
        <button onClick={handleCreate}>המשך</button>
        <button onClick={onClose} style={{ marginLeft: "10px" }}>בטל</button>
      </div>
    </div>
  );
};

const modalStyle = {
  position: "fixed",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -30%)",
  backgroundColor: "white",
  padding: "20px",
  boxShadow: "0 0 10px rgba(0,0,0,0.25)",
  zIndex: 1000,
  borderRadius: "8px",
  minWidth: "300px",
};

const apiBoxStyle = {
  backgroundColor: "#f5f5f5",
  border: "2px solid #007bff",
  borderRadius: "6px",
  padding: "15px",
  wordBreak: "break-all",
  fontFamily: "monospace",
  fontSize: "14px",
  marginBottom: "15px",
  userSelect: "all",
    display: "flex",
};
