export default function ProductSkeleton() {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#fff",
        padding: "12px",
      }}
    >
      <div
        className="skeleton"
        style={{
          height: "180px",
          borderRadius: "8px",
          marginBottom: "16px",
        }}
      />


      <div
        className="skeleton"
        style={{
          height: "20px",
          width: "60%",
          borderRadius: "6px",
          marginBottom: "16px",
        }}
      />

      <div
        className="skeleton"
        style={{
          height: "24px",
          width: "70px",
          borderRadius: "6px",
          marginBottom: "12px",
        }}
      />

      <div
        className="skeleton"
        style={{
          height: "18px",
          width: "100px",
          borderRadius: "6px",
        }}
      />
    </div>
  );
}