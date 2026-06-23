import { useNavigate } from "react-router-dom";
import type { Product } from "../types/productsType";
import { renderStars } from "../utils/common";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const navigate = useNavigate();


  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer",
        backgroundColor: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow =
          "0 12px 24px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 2px 10px rgba(0,0,0,0.08)";
      }}
    >
      <div
        style={{
          height: "220px",
          backgroundColor: "#f9fafb",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "16px",
        }}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      <div style={{ padding: "16px" }}>
        <h3
          style={{
            fontSize: "16px",
            fontWeight: 600,
            margin: "0 0 12px",
            lineHeight: 1.4,
            minHeight: "44px",
          }}
        >
          {product.title}
        </h3>

        <p
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: "#2563eb",
            margin: "0 0 10px",
          }}
        >
          ${product.price}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              color: "#f59e0b",
              fontSize: "18px",
            }}
          >
            {renderStars(product.rating)}
          </span>

          <span
            style={{
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            ({product.rating})
          </span>
        </div>
      </div>
    </div>
  );
}