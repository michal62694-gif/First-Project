import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ApiDetailsPage = () => {
  const { apiId } = useParams();
  const navigate = useNavigate();
  const api = useSelector((state) =>
    state.api.api.find((p) => p.id === parseInt(apiId))
  );

  if (!api) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>API לא נמצאה</h2>
        <button onClick={() => navigate(-1)}>חזור</button>
      </div>
    );
  }

  const maxTokens = Math.max(
    ...api.useDitails.map((day) => day.tokensUsed),
    100
  );

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "20px" }}>
        ← חזור
      </button>

      <h1>פרטי שימוש - {api.name}</h1>
      <p>
        <strong>Key:</strong> {api.key}
      </p>

      <div style={{ marginTop: "30px" }}>
        <h2>שימוש השבועי</h2>

        {/* גרף עמודות */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-around",
            height: "300px",
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            gap: "15px",
          }}
        >
          {api.useDitails.map((day, index) => {
            const percentage = (day.tokensUsed / maxTokens) * 100;
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  flex: 1,
                }}
              >
                {/* עמודה */}
                <div
                  style={{
                    width: "100%",
                    backgroundColor: "#007bff",
                    height: `${percentage}%`,
                    borderRadius: "4px",
                    transition: "background-color 0.3s",
                    minHeight: "10px",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#0056b3")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#007bff")
                  }
                  title={`${day.day}: ${day.tokensUsed} tokens`}
                ></div>

                {/* מספר */}
                <div style={{ fontSize: "12px", fontWeight: "bold" }}>
                  {day.tokensUsed}
                </div>

                {/* יום */}
                <div style={{ fontSize: "14px", textAlign: "center" }}>
                  {day.day}
                </div>
              </div>
            );
          })}
        </div>

        {/* טבלה עם פרטים */}
        <div style={{ marginTop: "30px" }}>
          <h3>טבלת פרטים</h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid #ccc",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f0f0f0" }}>
                <th style={{ border: "1px solid #ccc", padding: "10px" }}>
                  יום
                </th>
                <th style={{ border: "1px solid #ccc", padding: "10px" }}>
                  טוקנים ששומשו
                </th>
              </tr>
            </thead>
            <tbody>
              {api.useDitails.map((day, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                    {day.day}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                    {day.tokensUsed}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* סיכום */}
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#e3f2fd",
            borderRadius: "8px",
            border: "1px solid #2196F3",
          }}
        >
          <h3>סיכום שבועי</h3>
          <p>
            <strong>סה"כ שימוש:</strong>{" "}
            {api.useDitails.reduce((sum, day) => sum + day.tokensUsed, 0)}{" "}
            tokens
          </p>
          <p>
            <strong>ממוצע ליום:</strong>{" "}
            {(
              api.useDitails.reduce((sum, day) => sum + day.tokensUsed, 0) / 7
            ).toFixed(2)}{" "}
            tokens
          </p>
          <p>
            <strong>יום עם השימוש המרבי:</strong>{" "}
            {
              api.useDitails.reduce((max, day) =>
                day.tokensUsed > max.tokensUsed ? day : max
              ).day
            }{" "}
            (
            {
              api.useDitails.reduce((max, day) =>
                day.tokensUsed > max.tokensUsed ? day : max
              ).tokensUsed
            }{" "}
            tokens)
          </p>
        </div>
      </div>
    </div>
  );
};
