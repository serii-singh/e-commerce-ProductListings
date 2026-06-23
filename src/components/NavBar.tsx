
interface NavbarProps {
  onToggleFilters: () => void;
}

export default function Navbar({
  onToggleFilters,
}: NavbarProps) {
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
        <button
          onClick={onToggleFilters}
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            fontSize: "24px",
            padding: "4px 8px",
          }}
        >
          ☰
        </button>

        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: 700,
              color: "#0f172a",
            }}
          >
            Product Store
          </h1>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
       <button
  style={{
    border: "none",
    background: "none",
    cursor: "pointer",
    fontSize: "22px",
  }}
>
  🛒
</button>

<button
  style={{
    border: "none",
    background: "none",
    cursor: "pointer",
    fontSize: "22px",
  }}
>
  ⚙️
</button>
      </div>
    </div>
  );
}