import type { Category } from "../../types/productsType";

interface FiltersProps {
  categories: Category[];
  brands: string[];

  selectedCategory: string;
  selectedBrands: string[];

  minPrice: string;
  maxPrice: string;

  onCategoryChange: (value: string) => void;
  onBrandChange: (brand: string) => void;

  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onReset: () => void;
}

export default function Filters({
  categories,
  brands,
  selectedCategory,
  selectedBrands,
  minPrice,
  maxPrice,
  onCategoryChange,
  onBrandChange,
  onMinPriceChange,
  onMaxPriceChange,
  onReset,
}: FiltersProps) {
  const min = Number(minPrice);
  const max = Number(maxPrice);

  const priceError =
    minPrice &&
    maxPrice &&
    !Number.isNaN(min) &&
    !Number.isNaN(max) &&
    min > max;

  return (
    <div
      style={{
        width: "250px",
        padding: "16px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        height: "fit-content",
        backgroundColor: "#fff",
      }}
    >
      <h3>Category</h3>

      <select
        value={selectedCategory}
        onChange={(e) =>
          onCategoryChange(e.target.value)
        }
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "20px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      >
        <option value="">All Categories</option>

        {categories.map((category) => (
          <option
            key={category.slug}
            value={category.slug}
          >
            {category.name}
          </option>
        ))}
      </select>

      <h3>Price Range</h3>

      <input
        type="number"
        min="0"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) =>
          onMinPriceChange(e.target.value)
        }
        style={{
          width: "93%",
          padding: "8px",
          marginBottom: "10px",
          borderRadius: "6px",
          border: priceError
            ? "1px solid #dc2626"
            : "1px solid #ccc",
        }}
      />

      <input
        type="number"
        min="0"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) =>
          onMaxPriceChange(e.target.value)
        }
        style={{
          width: "93%",
          padding: "8px",
          marginBottom: "10px",
          borderRadius: "6px",
          border: priceError
            ? "1px solid #dc2626"
            : "1px solid #ccc",
        }}
      />

      {priceError && (
        <p
          style={{
            color: "#dc2626",
            fontSize: "13px",
            marginTop: "0",
            marginBottom: "16px",
          }}
        >
          Min price must be less than or equal to Max
          price.
        </p>
      )}

      <h3>Brands</h3>

      <div
        style={{
          maxHeight: "200px",
          overflowY: "auto",
          marginBottom: "16px",
        }}
      >
        {brands.map((brand) => (
          <label
            key={brand}
            style={{
              display: "block",
              marginBottom: "8px",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={selectedBrands.includes(
                brand
              )}
              onChange={() =>
                onBrandChange(brand)
              }
            />

            <span style={{ marginLeft: "8px" }}>
              {brand}
            </span>
          </label>
        ))}
      </div>

      <button
        type="button"
        onClick={onReset}
        style={{
          marginTop: "8px",
          width: "100%",
          padding: "10px",
          border: "none",
          borderRadius: "6px",
          backgroundColor: "#2563eb",
          color: "#fff",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Reset Filters
      </button>
    </div>
  );
}