import React, { useState } from "react";

// Real Unsplash photos mapped by product id
// Each image is a luxury skincare/beauty product photo
const PRODUCT_IMAGES = {
  // Skincare
  1:  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80&fit=crop", // serum bottle
  2:  "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=600&q=80&fit=crop", // moisturiser jar
  3:  "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=600&q=80&fit=crop", // day cream
  4:  "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80&fit=crop", // facial oil
  5:  "https://images.unsplash.com/photo-1617897903246-719242758050?w=600&q=80&fit=crop", // glow serum
  6:  "https://images.unsplash.com/photo-1586495777744-4e6232bf2ebb?w=600&q=80&fit=crop", // balm
  7:  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&q=80&fit=crop", // eye cream
  8:  "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80&fit=crop", // cleanser
  9:  "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?w=600&q=80&fit=crop", // luxury cream
  31: "https://images.unsplash.com/photo-1643185539104-3622eb1f0f49?w=600&q=80&fit=crop", // gel cream
  32: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=600&q=80&fit=crop", // blemish stick

  // Makeup
  10: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80&fit=crop", // foundation
  11: "https://images.unsplash.com/photo-1631214500004-de3c469b263b?w=600&q=80&fit=crop", // lip oil
  12: "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=600&q=80&fit=crop", // lip gloss
  13: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=80&fit=crop", // primer
  14: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=600&q=80&fit=crop", // lipstick
  15: "https://images.unsplash.com/photo-1526758097130-bab247274f58?w=600&q=80&fit=crop", // skin tint
  16: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80&fit=crop", // eye remover

  // Fragrance
  17: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80&fit=crop", // perfume bottle
  18: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&q=80&fit=crop", // floral fragrance
  19: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80&fit=crop", // fragrance

  // Body
  20: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80&fit=crop", // body oil
  21: "https://images.unsplash.com/photo-1570194065650-d99fb4b38e86?w=600&q=80&fit=crop", // body milk
  22: "https://images.unsplash.com/photo-1556228841-a3c527ebefe5?w=600&q=80&fit=crop", // hand cream
  23: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80&fit=crop", // body lotion
  24: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80&fit=crop", // bath oil

  // Men
  25: "https://images.unsplash.com/photo-1626954079673-f3c3a7884dd5?w=600&q=80&fit=crop", // men moisturiser
  26: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80&fit=crop", // eye serum
  27: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80&fit=crop", // cleanser men
  28: "https://images.unsplash.com/photo-1585232351009-aa87cbb74487?w=600&q=80&fit=crop", // eye cream men
  29: "https://images.unsplash.com/photo-1607006483224-17ef5b0a1e4b?w=600&q=80&fit=crop", // shave oil
  30: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80&fit=crop", // spf moisturiser
};

// Fallback by category if a specific image fails
const CATEGORY_FALLBACKS = {
  Skincare:  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80&fit=crop",
  Makeup:    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80&fit=crop",
  Fragrance: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80&fit=crop",
  Body:      "https://images.unsplash.com/photo-1570194065650-d99fb4b38e86?w=600&q=80&fit=crop",
  Men:       "https://images.unsplash.com/photo-1626954079673-f3c3a7884dd5?w=600&q=80&fit=crop",
};

function naira(n) { return "₦" + n.toLocaleString("en-NG"); }
function stars(r) { const f = Math.round(r); return "★".repeat(f) + "☆".repeat(5 - f); }

export default function ProductCard({ product, onAddToCart }) {
  const [added,    setAdded]    = useState(false);
  const [hovered,  setHovered]  = useState(false);
  const [imgError, setImgError] = useState(false);

  const isOut    = product.stock === "out";
  const isLow    = product.stock === "low";
  const onSale   = product.originalPrice != null;
  const discount = onSale
    ? Math.round((product.originalPrice - product.price) / product.originalPrice * 100)
    : 0;

  const imgSrc = imgError
    ? CATEGORY_FALLBACKS[product.category]
    : (PRODUCT_IMAGES[product.id] || CATEGORY_FALLBACKS[product.category]);

  function handleAdd() {
    if (isOut || added) return;
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  function badgeBg() {
    if (!product.badge) return "var(--charcoal)";
    const b = product.badge.toLowerCase();
    if (b === "sale")                       return "var(--rose)";
    if (b === "vegan")                      return "#3a6b48";
    if (b === "new" || b === "new formula") return "var(--gold)";
    if (b === "luxury")                     return "#5a3a6b";
    return "var(--charcoal)";
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: "1px solid var(--border)",
        display: "flex", flexDirection: "column",
        position: "relative",
        transition: "box-shadow 0.35s, transform 0.35s",
        boxShadow: hovered
          ? "0 24px 64px rgba(28,16,16,0.13)"
          : "0 2px 16px rgba(28,16,16,0.05)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
      }}
    >
      {/* Badge */}
      {product.badge && (
        <span style={{
          position:"absolute", top:"12px", left:"12px",
          background: badgeBg(), color:"#fff",
          fontFamily:"'Outfit',sans-serif", fontSize:"8.5px", fontWeight:400,
          letterSpacing:"0.18em", textTransform:"uppercase",
          padding:"4px 10px", zIndex:1,
        }}>
          {product.badge}
        </span>
      )}

      {/* Low stock */}
      {isLow && (
        <span style={{
          position:"absolute", top:"12px", right:"12px",
          background:"#fff3e0", color:"#a06000",
          fontFamily:"'Outfit',sans-serif", fontSize:"8.5px", fontWeight:400,
          letterSpacing:"0.1em", textTransform:"uppercase",
          padding:"4px 9px", zIndex:1,
        }}>
          Low Stock
        </span>
      )}

      {/* Image */}
      <div style={{
        width:"100%", aspectRatio:"1/1",
        overflow:"hidden", background:"var(--rose-pale)",
        position:"relative",
      }}>
        <img
          src={imgSrc}
          alt={product.name}
          loading="lazy"
          onError={() => setImgError(true)}
          style={{
            width:"100%", height:"100%", objectFit:"cover", display:"block",
            transition:"transform 0.5s ease",
            transform: hovered ? "scale(1.07)" : "scale(1)",
          }}
        />
        {/* Subtle gradient at bottom of image for polish */}
        <div style={{
          position:"absolute", bottom:0, left:0, right:0, height:"40%",
          background:"linear-gradient(to top, rgba(28,16,16,0.18) 0%, transparent 100%)",
          pointerEvents:"none",
        }} />
      </div>

      {/* Body */}
      <div style={{ padding:"16px 16px 0", flex:1, display:"flex", flexDirection:"column", gap:"4px" }}>
        <p style={{
          fontFamily:"'Outfit',sans-serif", fontSize:"8.5px", fontWeight:300,
          letterSpacing:"0.24em", textTransform:"uppercase", color:"var(--gold)", margin:0,
        }}>
          {product.brand}
        </p>
        <h3 style={{
          fontFamily:"'Cormorant Garamond',serif", fontSize:"16px", fontWeight:500,
          color:"var(--charcoal)", margin:0, lineHeight:1.3,
        }}>
          {product.name}
        </h3>
        <p style={{
          fontFamily:"'Outfit',sans-serif", fontSize:"11px", color:"#a08888",
          margin:0, fontWeight:300, letterSpacing:"0.04em",
        }}>
          {product.size}{product.skinType ? ` · ${product.skinType}` : ""}
        </p>
        <p style={{
          fontFamily:"'Outfit',sans-serif", fontSize:"12px", color:"var(--muted)",
          margin:"6px 0 0", lineHeight:1.7, fontWeight:300, flexGrow:1,
        }}>
          {product.description}
        </p>
      </div>

      {/* Footer */}
      <div style={{ padding:"14px 16px 16px", borderTop:"1px solid var(--border)", marginTop:"14px" }}>

        {/* Price */}
        <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"6px", flexWrap:"wrap" }}>
          <span style={{
            fontFamily:"'Outfit',sans-serif", fontSize:"17px", fontWeight:500, color:"var(--charcoal)",
          }}>
            {naira(product.price)}
          </span>
          {onSale && (
            <>
              <span style={{
                fontFamily:"'Outfit',sans-serif", fontSize:"12px",
                color:"#b09090", textDecoration:"line-through", fontWeight:300,
              }}>
                {naira(product.originalPrice)}
              </span>
              <span style={{
                fontFamily:"'Outfit',sans-serif", fontSize:"9px", fontWeight:400,
                color:"var(--rose)", background:"var(--rose-pale)",
                padding:"2px 7px", letterSpacing:"0.05em",
              }}>
                -{discount}% OFF
              </span>
            </>
          )}
        </div>

        {/* Stars */}
        <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"12px" }}>
          <span style={{ color:"var(--gold)", fontSize:"12px", letterSpacing:"1px" }}>
            {stars(product.rating)}
          </span>
          <span style={{
            fontFamily:"'Outfit',sans-serif", fontSize:"11px",
            color:"var(--muted)", fontWeight:300,
          }}>
            {product.rating.toFixed(1)} ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Button */}
        <button
          onClick={handleAdd}
          disabled={isOut}
          style={{
            width:"100%", padding:"12px",
            background: isOut ? "#e8dede" : added ? "var(--gold)" : "var(--charcoal)",
            color: isOut ? "#b09090" : "#fff",
            border:"none",
            cursor: isOut ? "not-allowed" : "pointer",
            fontFamily:"'Outfit',sans-serif", fontSize:"9.5px", fontWeight:300,
            letterSpacing:"0.24em", textTransform:"uppercase",
            transition:"background 0.25s",
          }}
        >
          {isOut ? "Out of Stock" : added ? "✓ Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}