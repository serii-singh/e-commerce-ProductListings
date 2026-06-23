import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import ProductCard from "../components/ProductCard";
import Filters from "../components/Filter/Filter";

import {
  getProducts,
  getCategories,
} from "../services/products";

import type {
  Product,
  Category,
} from "../types/productsType";
import NavBar from "../components/NavBar";
import ProductSkeleton from "../components/Skeleton/ProductSkeleton";
import FilterSkeleton from "../components/Skeleton/FilterSkeleton";
import NavbarSkeleton from "../components/Skeleton/NavSkeleton";

const ITEMS_PER_PAGE = 12;

export default function ProductListing() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(true); 

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "";
  const selectedBrands = searchParams.get("brands")?.split(",").filter(Boolean) || [];
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const currentPage = Number(searchParams.get("page") || "1");

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // Auto-close filters when switching to mobile
      if (mobile) {
        setShowFilters(false);
        document.body.style.overflow = "auto";
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Clean up body overflow
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const productsData = await getProducts();
      const categoriesData = await getCategories();

      setProducts(productsData.products);
      setCategories(categoriesData);

      const uniqueBrands = [
        ...new Set(
          productsData.products
            .map((product: Product) => product.brand)
            .filter(Boolean)
        ),
      ] as string[];

      setBrands(uniqueBrands);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateSearchParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    setSearchParams(params);
  };

  const handleCategoryChange = (category: string) => {
    updateSearchParams({ category, page: "1" });
  };

  const handleBrandChange = (brand: string) => {
    const updatedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((item) => item !== brand)
      : [...selectedBrands, brand];

    updateSearchParams({
      brands: updatedBrands.join(","),
      page: "1",
    });
  };

  const handleMinPriceChange = (value: string) => {
    updateSearchParams({ minPrice: value, page: "1" });
  };

  const handleMaxPriceChange = (value: string) => {
    updateSearchParams({ maxPrice: value, page: "1" });
  };

  const handlePageChange = (page: number) => {
    updateSearchParams({ page: String(page) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetFilters = () => {
    setSearchParams({});
    if (isMobile) {
      setShowFilters(false);
      document.body.style.overflow = "auto";
    }
  };

  const toggleFilters = () => {
    const newState = !showFilters;
    setShowFilters(newState);
    if (isMobile) {
      document.body.style.overflow = newState ? "hidden" : "auto";
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = !selectedCategory || product.category === selectedCategory;
      const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const priceMatch = (!minPrice || product.price >= Number(minPrice)) &&
        (!maxPrice || product.price <= Number(maxPrice));

      return categoryMatch && brandMatch && priceMatch;
    });
  }, [products, selectedCategory, selectedBrands, minPrice, maxPrice]);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // Count active filters
  const activeFilterCount = (() => {
    let count = 0;
    if (selectedCategory) count++;
    if (selectedBrands.length > 0) count++;
    if (minPrice) count++;
    if (maxPrice) count++;
    return count;
  })();

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #e2daeb 0%, #8cb2db 100%)",
          padding: isMobile ? "12px" : "24px",
        }}
      >
        <NavbarSkeleton />
        <div
          style={{
            maxWidth: "1600px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "320px minmax(0,1fr)",
            gap: "32px",
            alignItems: "start",
          }}
        >
          {!isMobile && <FilterSkeleton />}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill,minmax(280px,1fr))",
              gap: isMobile ? "16px" : "24px",
            }}
          >
            {Array.from({ length: isMobile ? 6 : 9 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e2daeb 0%, #8cb2db 100%)",
        padding: isMobile ? "12px" : "24px",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <NavBar onToggleFilters={toggleFilters} />

      <div
        style={{
          maxWidth: "1600px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : showFilters
            ? "320px minmax(0,1fr)"
            : "1fr",
          gap: isMobile ? "0" : "32px",
          alignItems: "start",
          position: "relative",
        }}
      >
        {/* Desktop Filters - Only show on desktop */}
        {!isMobile && showFilters && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              width: "320px",
              position: "sticky",
              top: "20px",
            }}
          >
            <Filters
              categories={categories}
              brands={brands}
              selectedCategory={selectedCategory}
              selectedBrands={selectedBrands}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onCategoryChange={handleCategoryChange}
              onBrandChange={handleBrandChange}
              onMinPriceChange={handleMinPriceChange}
              onMaxPriceChange={handleMaxPriceChange}
              onReset={handleResetFilters}
            />
          </motion.div>
        )}

        {/* Products Grid */}
        <div style={{ width: "100%" }}>
          {/* Results Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: isMobile ? "16px" : "32px",
              paddingBottom: isMobile ? "12px" : "16px",
              borderBottom: "1px solid rgba(0,0,0,0.06)",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: isMobile ? "20px" : "32px",
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  color: "#1a1a1a",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                <span style={{ fontWeight: 600 }}>Luxury</span> Collection
              </h1>
              <p
                style={{
                  margin: "4px 0 0 0",
                  fontSize: isMobile ? "12px" : "14px",
                  color: "#666",
                  letterSpacing: "0.3px",
                }}
              >
                {filteredProducts.length} exquisite pieces
              </p>
            </div>
            <button
              onClick={toggleFilters}
              style={{
                padding: isMobile ? "8px 16px" : "10px 20px",
                background: "rgba(255,255,255,0.8)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "50px",
                fontSize: isMobile ? "12px" : "13px",
                fontWeight: 500,
                color: "#1a1a1a",
                cursor: "pointer",
                transition: "all 0.3s ease",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0,0,0,0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.8)";
              }}
            >
              <span>☰</span>
              {isMobile ? "Filters" : showFilters ? "Hide Filters" : "Show Filters"}
              {activeFilterCount > 0 && (
                <span
                  style={{
                    background: "#1a1a1a",
                    color: "white",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    fontSize: "10px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 600,
                  }}
                >
                  {activeFilterCount}
                </span>
              )}
            </button>
          </motion.div>

          {/* Products Grid */}
          <motion.div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fill,minmax(280px,1fr))",
              gap: isMobile ? "16px" : "24px",
            }}
          >
            <AnimatePresence mode="wait">
              {paginatedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(index * 0.05, 0.3),
                    ease: "easeOut",
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                textAlign: "center",
                marginTop: isMobile ? "40px" : "80px",
                padding: isMobile ? "40px 20px" : "60px 40px",
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ fontSize: isMobile ? "36px" : "48px", marginBottom: "16px" }}>✨</div>
              <h3
                style={{
                  margin: 0,
                  fontSize: isMobile ? "20px" : "24px",
                  fontWeight: 300,
                  color: "#1a1a1a",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                No products found
              </h3>
              <p
                style={{
                  margin: "8px 0 0 0",
                  color: "#666",
                  fontSize: isMobile ? "13px" : "14px",
                }}
              >
                Try adjusting your filters to discover more pieces
              </p>
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: isMobile ? "4px" : "8px",
                marginTop: isMobile ? "40px" : "60px",
                padding: "20px 0",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  padding: isMobile ? "8px 14px" : "12px 24px",
                  borderRadius: "50px",
                  border: "1px solid rgba(0,0,0,0.08)",
                  fontSize: isMobile ? "12px" : "14px",
                  fontWeight: 500,
                  background: currentPage === 1
                    ? "rgba(0,0,0,0.03)"
                    : "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(10px)",
                  color: currentPage === 1 ? "#999" : "#1a1a1a",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  letterSpacing: "0.5px",
                }}
              >
                {isMobile ? "←" : "← Previous"}
              </button>

              <div
                style={{
                  display: "flex",
                  gap: isMobile ? "4px" : "6px",
                  padding: "0 4px",
                }}
              >
                {Array.from({ length: Math.min(totalPages, isMobile ? 5 : 7) }, (_, index) => {
                  let page = index + 1;
                  const maxVisible = isMobile ? 5 : 7;
                  
                  if (totalPages > maxVisible) {
                    if (currentPage > 3 && currentPage < totalPages - 2) {
                      page = currentPage - 2 + index;
                    } else if (currentPage >= totalPages - 2) {
                      page = totalPages - (maxVisible - 1) + index;
                    }
                  }
                  
                  // Show ellipsis
                  if (totalPages > maxVisible && index === 2 && currentPage > 3 && currentPage < totalPages - 2) {
                    return (
                      <span
                        key="ellipsis"
                        style={{
                          padding: "0 4px",
                          color: "#999",
                          display: "flex",
                          alignItems: "center",
                          fontSize: isMobile ? "12px" : "14px",
                        }}
                      >
                        …
                      </span>
                    );
                  }
                  
                  // Show first page
                  if (totalPages > maxVisible && index === 0 && currentPage > 3) {
                    return (
                      <button
                        key={1}
                        onClick={() => handlePageChange(1)}
                        style={{
                          width: isMobile ? "32px" : "42px",
                          height: isMobile ? "32px" : "42px",
                          borderRadius: "50%",
                          border: "1px solid rgba(0,0,0,0.08)",
                          background: "rgba(255,255,255,0.6)",
                          color: "#666",
                          fontWeight: 400,
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          fontSize: isMobile ? "12px" : "14px",
                        }}
                      >
                        1
                      </button>
                    );
                  }
                  
                  // Show last page
                  if (totalPages > maxVisible && index === maxVisible - 1 && currentPage < totalPages - 2) {
                    return (
                      <button
                        key={totalPages}
                        onClick={() => handlePageChange(totalPages)}
                        style={{
                          width: isMobile ? "32px" : "42px",
                          height: isMobile ? "32px" : "42px",
                          borderRadius: "50%",
                          border: "1px solid rgba(0,0,0,0.08)",
                          background: "rgba(255,255,255,0.6)",
                          color: "#666",
                          fontWeight: 400,
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          fontSize: isMobile ? "12px" : "14px",
                        }}
                      >
                        {totalPages}
                      </button>
                    );
                  }
                  
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      style={{
                        width: isMobile ? "32px" : "42px",
                        height: isMobile ? "32px" : "42px",
                        borderRadius: "50%",
                        border: currentPage === page
                          ? "none"
                          : "1px solid rgba(0,0,0,0.08)",
                        background: currentPage === page
                          ? "linear-gradient(135deg, #1a1a1a 0%, #333 100%)"
                          : "rgba(255,255,255,0.6)",
                        color: currentPage === page
                          ? "#ffffff"
                          : "#666",
                        fontWeight: currentPage === page ? 600 : 400,
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        fontSize: isMobile ? "12px" : "14px",
                        boxShadow: currentPage === page
                          ? "0 4px 12px rgba(0,0,0,0.15)"
                          : "none",
                      }}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  padding: isMobile ? "8px 14px" : "12px 24px",
                  borderRadius: "50px",
                  border: "1px solid rgba(0,0,0,0.08)",
                  fontSize: isMobile ? "12px" : "14px",
                  fontWeight: 500,
                  background: currentPage === totalPages
                    ? "rgba(0,0,0,0.03)"
                    : "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(10px)",
                  color: currentPage === totalPages ? "#999" : "#1a1a1a",
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  letterSpacing: "0.5px",
                }}
              >
                {isMobile ? "→" : "Next →"}
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer - Only shows on mobile */}
      <AnimatePresence>
        {isMobile && showFilters && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(4px)",
                zIndex: 999,
              }}
              onClick={() => {
                setShowFilters(false);
                document.body.style.overflow = "auto";
              }}
            />
            
            {/* Filter Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "85%",
                maxWidth: "380px",
                height: "100vh",
                background: "rgba(255,255,255,0.98)",
                backdropFilter: "blur(20px)",
                zIndex: 1000,
                padding: "24px 20px",
                overflowY: "auto",
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "24px",
                  paddingBottom: "16px",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                  flexShrink: 0,
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#1a1a1a",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  Filters
                  {activeFilterCount > 0 && (
                    <span
                      style={{
                        marginLeft: "8px",
                        fontSize: "14px",
                        color: "#666",
                        fontWeight: 400,
                      }}
                    >
                      ({activeFilterCount} active)
                    </span>
                  )}
                </h2>
                <button
                  onClick={() => {
                    setShowFilters(false);
                    document.body.style.overflow = "auto";
                  }}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "none",
                    background: "rgba(0,0,0,0.05)",
                    fontSize: "20px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                  }}
                >
                  ✕
                </button>
              </div>
              
              <div style={{ flex: 1, overflowY: "auto", paddingBottom: "20px" }}>
                <Filters
                  categories={categories}
                  brands={brands}
                  selectedCategory={selectedCategory}
                  selectedBrands={selectedBrands}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  onCategoryChange={handleCategoryChange}
                  onBrandChange={handleBrandChange}
                  onMinPriceChange={handleMinPriceChange}
                  onMaxPriceChange={handleMaxPriceChange}
                  onReset={handleResetFilters}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}