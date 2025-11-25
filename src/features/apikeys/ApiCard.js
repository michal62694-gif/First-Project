import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateApi, deleteApi } from "./ApiSlice";

export const ApiCard = ({ api }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [name, setName] = useState(api.name);
  const [key, setKey] = useState(api.key);
  const [apiAddress, setApiAddress] = useState(api.apiAddress || "");

  // פתיחה וסגירת מודל עריכה
  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => {
    setName(api.name);
    setKey(api.key);
    setApiAddress(api.apiAddress || "");
    setIsEditModalOpen(false);
  };

  // שמירת עריכה
  const saveChanges = () => {
    if (!name.trim()) {
      alert("שם API לא יכול להיות ריק");
      return;
    }

    dispatch(updateApi({ id: api.id, name, key, apiAddress, userId: api.userId }));
    setIsEditModalOpen(false);
  };

  // פתיחה וסגירת מודל מחיקה
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const deleteApiClick = () => {
    dispatch(deleteApi(api.id));
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      {/* כרטיס ה־API */}
      <div
        style={{
          border: "1px solid #ccc",
          marginBottom: "10px",
          padding: "10px",
          display: "flex",
          flexDirection: "row",
          gap: "5px"
        }}
      >
        <h4>{api.name}</h4>
        <p>Key: {api.key}</p>

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={openEditModal}>ערוך</button>
          <button onClick={() => navigate(`/api-details/${api.id}`)}>פרטי שימוש</button>
          <button onClick={openDeleteModal}>מחק API</button>
        </div>
      </div>

      {/* חלון עריכה */}
      {isEditModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "350px",
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            }}
          >
            <h3>עריכת API</h3>

            <label>שם API:</label>
            <input
              style={{ width: "100%", marginBottom: "10px" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* <label>Key:</label>
            <input
              style={{ width: "100%", marginBottom: "10px" }}
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />

            <label>כתובת API:</label>
            <input
              style={{ width: "100%", marginBottom: "10px" }}
              value={apiAddress}
              onChange={(e) => setApiAddress(e.target.value)}
            /> */}

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={closeEditModal} style={{ width: "45%" }}>
                ביטול
              </button>
              <button onClick={saveChanges} style={{ width: "45%" }}>
                שמור
              </button>
            </div>
          </div>
        </div>
      )}

      {/* חלון מחיקה */}
      {isDeleteModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "350px",
              textAlign: "center",
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            }}
          >
            <h3>אזהרה!</h3>
            <p>אתה עומד למחוק את ה־API הזה. פעולה זו בלתי הפיכה.</p>

            <p style={{ fontWeight: "bold" }}>Key:</p>
            <div
              style={{
                border: "1px solid #ccc",
                padding: "8px",
                borderRadius: "5px",
                background: "#f8f8f8",
                wordBreak: "break-all",
              }}
            >
              {api.key}
            </div>

            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
              <button onClick={closeDeleteModal} style={{ width: "45%" }}>
                ביטול
              </button>
              <button
                onClick={deleteApiClick}
                style={{ width: "45%", background: "red", color: "white" }}
              >
                מחק
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
