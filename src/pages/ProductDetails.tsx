import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Product } from "../types/productsType";
import { getProductById } from "../services/products";
import { renderStars } from "../utils/common";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      setLoading(true);

      const data = await getProductById(productId);

      setProduct(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "100px",
          fontSize: "24px",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!product) {
    return <h2>Product not found</h2>;
  }

  const reviews = product.reviews ?? [];

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "24px",
          border: "none",
          background: "#f3f4f6",
          padding: "10px 16px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        ← Back
      </button>

      {/* Product Section */}
     <div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    background: "#fff",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  }}
>
        {/* Image */}
       <div
  style={{
    flex: "1 1 350px",
    // minWidth: "280px",
    background: "#f9fafb",
    borderRadius: "16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  }}
>
         <img
  src={product.thumbnail}
  alt={product.title}
  style={{
    width: "100%",
    maxWidth: "450px",
    maxHeight: "450px",
    objectFit: "contain",
  }}
/>
        </div>

        {/* Product Details */}
      <div
  style={{
    flex: "1 1 350px",
    minWidth: "280px",
  }}
>
          <h1
            style={{
              fontSize: "clamp(24px, 5vw, 36px)",
              marginBottom: "12px",
            }}
          >
            {product.title}
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#f59e0b",
              fontSize: "22px",
              marginBottom: "20px",
            }}
          >
            {renderStars(product.rating)}

            <span
              style={{
                color: "#6b7280",
                fontSize: "16px",
              }}
            >
              ({product.rating})
            </span>
          </div>

          <h2
            style={{
              color: "#2563eb",
             fontSize: "clamp(28px, 6vw, 42px)",
              marginBottom: "20px",
            }}
          >
            ${product.price}
          </h2>

          <p
            style={{
              color: "#4b5563",
              lineHeight: 1.8,
              marginBottom: "30px",
              fontSize: "17px",
            }}
          >
            {product.description}
          </p>

      <div
  style={{
    display: "flex",
    gap: "12px",
    marginBottom: "30px",
    flexWrap: "wrap",
  }}
>
  {product.category && (
    <span
      style={{
        background: "#e0f2fe",
        color: "#0369a1",
        padding: "8px 14px",
        borderRadius: "999px",
        fontSize: "14px",
      }}
    >
      {product.category}
    </span>
  )}

  {product.brand && (
    <span
      style={{
        background: "#ede9fe",
        color: "#6d28d9",
        padding: "8px 14px",
        borderRadius: "999px",
        fontSize: "14px",
      }}
    >
      {product.brand}
    </span>
  )}
</div>

          <button
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              padding: "14px 28px",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <div
          style={{
            marginTop: "30px",
            background: "#fff",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              marginBottom: "24px",
            }}
          >
            Reviews
          </h2>

          {reviews.map((review, index) => (
            <div
              key={index}
              style={{
                paddingBottom: "20px",
                marginBottom: "20px",
                borderBottom:
                  index !== reviews.length - 1
                    ? "1px solid #e5e7eb"
                    : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "10px",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  {review.reviewerName}
                </h3>

                <span
                  style={{
                    color: "#f59e0b",
                    fontSize: "18px",
                  }}
                >
                  {renderStars(review.rating)}
                </span>

                <span
                  style={{
                    color: "#6b7280",
                  }}
                >
                  ({review.rating})
                </span>
              </div>

              <p
                style={{
                  color: "#4b5563",
                  lineHeight: 1.7,
                  marginBottom: "8px",
                }}
              >
                {review.comment}
              </p>

              <small
                style={{
                  color: "#9ca3af",
                }}
              >
                {new Date(review.date).toLocaleDateString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

