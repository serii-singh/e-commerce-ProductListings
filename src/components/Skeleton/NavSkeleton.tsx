export default function NavbarSkeleton() {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow:
          "0 2px 10px rgba(0,0,0,0.08)",
        borderRadius: "12px",
        marginBottom: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          className="skeleton"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "8px",
          }}
        />

        <div
          className="skeleton"
          style={{
            width: "180px",
            height: "28px",
            borderRadius: "6px",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: "16px",
        }}
      >
        <div
          className="skeleton"
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
          }}
        />

        <div
          className="skeleton"
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
          }}
        />
      </div>
    </div>
  );
}