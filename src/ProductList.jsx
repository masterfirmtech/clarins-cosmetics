import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import products from "./products";

const CATEGORIES = ["All", "Skincare", "Makeup", "Fragrance", "Body", "Men"];

export default function ProductList({ onAddToCart, externalSearch = "", onClearExternalSearch, activeCategory = "All" }) {
  const [localSearch, setLocal] = useState("");
  const [sortOption,  setSort]  = useState("default");

  useEffect(() => {
    if (externalSearch) setLocal("");
  }, [externalSearch]);

  const searchTerm = externalSearch || localSearch;

  let filtered = [...products];

  if (searchTerm.trim()) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (activeCategory !== "All") {
    filtered = filtered.filter((p) => p.category === activeCategory);
  }

  if (sortOption === "price-low")  filtered.sort((a, b) => a.price - b.price);
  if (sortOption === "price-high") filtered.sort((a, b) => b.price - a.price);
  if (sortOption === "rating")     filtered.sort((a, b) => b.rating - a.rating);
  if (sortOption === "reviews")    filtered.sort((a, b) => b.reviews - a.reviews);

  function clearAll() {
    setLocal("");
    setSort("default");
    onClearExternalSearch?.();
  }

  return (
    <div style={{ maxWidth:"1320px", margin:"0 auto", padding:"64px 24px 96px" }}>

      {/* Section heading */}
      <div style={{ textAlign:"center", marginBottom:"48px" }}>
        <p style={{
          fontFamily:"'Outfit',sans-serif", fontSize:"9.5px", fontWeight:200,
          letterSpacing:"0.42em", textTransform:"uppercase", color:"var(--gold)", margin:"0 0 12px",
        }}>
          Powered by Plant Science Since 1954
        </p>
        <h2 style={{
          fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(28px,4vw,48px)",
          fontWeight:300, color:"var(--charcoal)", margin:0, letterSpacing:"0.04em",
        }}>
          Our Products
        </h2>
        <div style={{ width:"32px", height:"1.5px", background:"var(--gold)", opacity:0.5, margin:"18px auto 0" }} />
      </div>

      {/* Search + Sort only — NO category tabs here */}
      <div style={{ display:"flex", gap:"10px", flexWrap:"wrap", alignItems:"center", marginBottom:"44px" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={localSearch}
          onChange={(e) => { setLocal(e.target.value); onClearExternalSearch?.(); }}
          style={{
            flex:"1 1 220px", padding:"11px 18px",
            border:"1px solid var(--border)", background:"#fff",
            fontFamily:"'Outfit',sans-serif", fontSize:"12px", fontWeight:300,
            color:"var(--charcoal)", outline:"none", letterSpacing:"0.04em",
            transition:"border-color 0.2s",
          }}
          onFocus={e => e.target.style.borderColor = "var(--charcoal)"}
          onBlur={e  => e.target.style.borderColor = "var(--border)"}
        />

        <select
          value={sortOption}
          onChange={(e) => setSort(e.target.value)}
          style={{
            padding:"11px 16px",
            border:"1px solid var(--border)", background:"#fff",
            fontFamily:"'Outfit',sans-serif", fontSize:"12px", fontWeight:300,
            color:"var(--charcoal)", outline:"none", cursor:"pointer",
          }}
        >
          <option value="default">Sort: Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="reviews">Most Reviewed</option>
        </select>

        <span style={{
          fontFamily:"'Outfit',sans-serif", fontSize:"11px",
          color:"#b09090", fontWeight:300, whiteSpace:"nowrap",
        }}>
          {filtered.length} product{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Grid or empty state */}
      {filtered.length === 0 ? (
        <div style={{ textAlign:"center", padding:"80px 20px" }}>
          <p style={{
            fontFamily:"'Outfit',sans-serif", fontSize:"14px",
            color:"var(--muted)", marginBottom:"20px",
          }}>
            No products found for "{searchTerm || activeCategory}"
          </p>
          <button
            onClick={clearAll}
            style={{
              background:"var(--charcoal)", color:"#fff", border:"none",
              padding:"12px 32px", cursor:"pointer",
              fontFamily:"'Outfit',sans-serif", fontSize:"9.5px", fontWeight:300,
              letterSpacing:"0.24em", textTransform:"uppercase", transition:"background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--rose)"}
            onMouseLeave={e => e.currentTarget.style.background = "var(--charcoal)"}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fill, minmax(240px, 1fr))",
          gap:"24px",
        }}>
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}
    </div>
  );
}