import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateApi, deleteApi } from "./ApiSlice";

export const ApiCard = ({ api }) => {
  const dispatch = useDispatch();
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(api.name);
  const [key, setKey] = useState(api.key);
  const [apiAddress, setApiAddress] = useState(api.apiAddress || "");

  const deleteApiClick = () => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק?")) {
      dispatch(deleteApi(api.id));
    }
  };

  const saveChanges = () => {
    if (!name.trim()) {
      alert("שם API לא יכול להיות ריק");
      return;
    }
    dispatch(updateApi({ id: api.id, name, key, apiAddress, userId: api.userId }));
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setName(api.name);
    setKey(api.key);
    setApiAddress(api.apiAddress || "");
    setIsEditing(false);
  };

  return (
    <div style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
      {isEditing ? (
        <>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="שם API"
          />
          <input
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Key"
          />
          <input
            value={apiAddress}
            onChange={(e) => setApiAddress(e.target.value)}
            placeholder="כתובת API"
          />
          <button onClick={saveChanges}>שמור</button>
          <button onClick={cancelEdit} style={{ marginLeft: "10px" }}>בטל</button>
        </>
      ) : (
        <>
          <h4>{api.name}</h4>
          <p>Key: {api.key}</p>
          <p>כתובת API: {api.apiAddress || "לא זמין"}</p>
          <button onClick={() => setIsEditing(true)}>ערוך</button>
          <button onClick={deleteApiClick} style={{ marginLeft: "10px" }}>מחק API</button>
        </>
      )}
    </div>
  );
};
