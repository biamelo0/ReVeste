export default function Loading() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "50vh",
      width: "100%",
      flexDirection: "column",
      gap: 16
    }}>
      <div className="spinner"></div>
      <p style={{ color: "var(--forest)", fontWeight: 500, fontFamily: "var(--font-display)" }}>
        Carregando...
      </p>
      <style>{`
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid var(--sage);
          border-top-color: var(--forest);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
