export default function FilterSkeleton() {
  return (
    <div
      style={{
        width: "250px",
        padding: "16px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        background: "#fff",
      }}
    >
      {/* Category */}
      <div
        className="skeleton"
        style={{
          width: "80px",
          height: "22px",
          borderRadius: "6px",
          marginBottom: "12px",
        }}
      />

      <div
        className="skeleton"
        style={{
          width: "100%",
          height: "40px",
          borderRadius: "8px",
          marginBottom: "24px",
        }}
      />

      {/* Price Range */}
      <div
        className="skeleton"
        style={{
          width: "100px",
          height: "22px",
          borderRadius: "6px",
          marginBottom: "12px",
        }}
      />

      <div
        className="skeleton"
        style={{
          width: "100%",
          height: "40px",
          borderRadius: "8px",
          marginBottom: "10px",
        }}
      />

      <div
        className="skeleton"
        style={{
          width: "100%",
          height: "40px",
          borderRadius: "8px",
          marginBottom: "24px",
        }}
      />

      {/* Brands */}
      <div
        className="skeleton"
        style={{
          width: "70px",
          height: "22px",
          borderRadius: "6px",
          marginBottom: "16px",
        }}
      />

      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "12px",
          }}
        >
          <div
            className="skeleton"
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "4px",
            }}
          />

          <div
            className="skeleton"
            style={{
              width: "120px",
              height: "18px",
              borderRadius: "4px",
            }}
          />
        </div>
      ))}

      {/* Reset Button */}
      <div
        className="skeleton"
        style={{
          width: "100%",
          height: "42px",
          borderRadius: "8px",
          marginTop: "16px",
        }}
      />
    </div>
  );
}