import React, { useState, useRef } from "react";
import Header from "./Header.jsx";
import ProductList from "./ProductList.jsx";
import OurStoryModal from "./OurStoryModal.jsx";
import Cart from "./components/Cart.jsx"; // Integrated Student 2's Cart component
import "./index.css";

export default function App() {
  const [cartCount,      setCartCount]      = useState(0);
  const [searchTerm,     setSearchTerm]     = useState("");
  const [storyOpen,      setStoryOpen]      = useState(false);
  const [cartOpen,       setCartOpen]       = useState(false); // New state to toggle Student 2's Cart visibility
  const [activeCategory, setActiveCategory] = useState("All");
  const productsRef = useRef(null);

  function handleAddToCart() { 
    setCartCount((n) => n + 1); 
  }

  function scrollToProducts() {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div style={{ minHeight:"100vh", background:"var(--ivory)", position: "relative" }}>

      {/* --- Modals and Overlays --- */}
      {storyOpen && <OurStoryModal onClose={() => setStoryOpen(false)} />}
      
      {/* Integrated Student 2's Cart display controlled by state toggle */}
      {cartOpen && <Cart onClose={() => setCartOpen(false)} />}

      {/* --- Header Navigation System --- */}
      <Header
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)} // Toggles the cart overlay open when clicked
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        activeCategory={activeCategory}
        onCategoryChange={(cat) => {
          setActiveCategory(cat);
          productsRef.current?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* ── HERO SECTION ── */}
      <section style={{
        position:"relative", minHeight:"92vh",
        display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
        textAlign:"center", overflow:"hidden",
      }}>
        <img
          src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1800&q=80&fit=crop"
          alt="Luxury skincare"
          style={{
            position:"absolute", inset:0,
            width:"100%", height:"100%",
            objectFit:"cover", objectPosition:"center", zIndex:0,
          }}
        />
        <div style={{
          position:"absolute", inset:0, zIndex:1,
          background:"linear-gradient(170deg,rgba(28,16,16,0.35) 0%,rgba(28,16,16,0.55) 50%,rgba(28,16,16,0.82) 100%)",
        }} />
        <div style={{
          position:"absolute", inset:0, zIndex:2,
          backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
          opacity:0.4, pointerEvents:"none",
        }} />

        <div style={{ position:"relative", zIndex:3, padding:"0 24px", maxWidth:"820px" }}>
          <p style={{
            fontFamily:"'Outfit',sans-serif", fontSize:"10px", fontWeight:200,
            letterSpacing:"0.5em", textTransform:"uppercase",
            color:"var(--gold-light)", margin:"0 0 24px",
          }}>
            New Arrivals · Spring 2025
          </p>
          <h1 style={{
            fontFamily:"'Cormorant Garamond',serif",
            fontSize:"clamp(42px,7vw,88px)", fontWeight:300,
            color:"#fff", lineHeight:1.06, letterSpacing:"0.04em", margin:"0 0 10px",
          }}>
            Luxury Skincare,
          </h1>
          <h1 style={{
            fontFamily:"'Cormorant Garamond',serif",
            fontSize:"clamp(42px,7vw,88px)", fontWeight:300,
            fontStyle:"italic", color:"var(--gold-light)",
            lineHeight:1.06, letterSpacing:"0.04em", margin:"0 0 32px",
          }}>
            Rooted in Nature.
          </h1>
          <p style={{
            fontFamily:"'Outfit',sans-serif", fontSize:"13px", fontWeight:200,
            color:"rgba(255,255,255,0.7)", letterSpacing:"0.12em",
            margin:"0 0 48px", textTransform:"uppercase",
          }}>
            Delivered across Nigeria &nbsp;·&nbsp; 100% Authentic Clarins
          </p>
          <div style={{ display:"flex", gap:"14px", justifyContent:"center", flexWrap:"wrap" }}>
            <button className="btn-dark" onClick={scrollToProducts}>Shop Now</button>
            <button className="btn-outline" onClick={() => setStoryOpen(true)}>Our Story</button>
          </div>
          <p style={{
            marginTop:"64px",
            fontFamily:"'Outfit',sans-serif", fontSize:"9px", fontWeight:200,
            letterSpacing:"0.4em", textTransform:"uppercase",
            color:"rgba(255,255,255,0.35)",
          }}>
            ↓ &nbsp; Scroll to explore
          </p>
        </div>

        <div style={{
          position:"absolute", bottom:0, left:0, right:0, height:"120px", zIndex:4,
          background:"linear-gradient(to top, var(--ivory) 0%, transparent 100%)",
        }} />
      </section>

      {/* ── MARQUEE BRAGGING INFOBAR ── */}
      <div style={{
        background:"var(--charcoal)", padding:"14px 0",
        overflow:"hidden", whiteSpace:"nowrap",
      }}>
        <div style={{
          display:"inline-block",
          animation:"marquee 40s linear infinite",
          fontFamily:"'Outfit',sans-serif", fontSize:"10px", fontWeight:200,
          letterSpacing:"0.3em", textTransform:"uppercase",
          color:"rgba(255,255,255,0.45)",
        }}>
          {Array(8).fill("✦ Free Delivery Over ₦50,000      ✦ 100% Authentic Clarins      ✦ Plant Science Since 1954      ✦ Delivered Across Nigeria      ").join("")}
        </div>
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* ── PRODUCTS MAIN CONTENT GRID ── */}
      <div ref={productsRef}>
        <ProductList
          onAddToCart={handleAddToCart}
          externalSearch={searchTerm}
          onClearExternalSearch={() => setSearchTerm("")}
          activeCategory={activeCategory}
        />
      </div>

      {/* ── FOOTER BRADING BLOCK ── */}
      <footer style={{
        background:"var(--charcoal)", padding:"48px 24px 36px",
        fontFamily:"'Outfit',sans-serif",
      }}>
        <div style={{
          maxWidth:"1320px", margin:"0 auto",
          display:"flex", flexDirection:"column", alignItems:"center", gap:"16px",
        }}>
          <div style={{ display:"flex", alignItems:"baseline", gap:"9px" }}>
            <span style={{
              fontFamily:"'Cormorant Garamond',serif", fontSize:"24px",
              fontWeight:400, color:"rgba(255,255,255,0.7)", letterSpacing:"0.1em",
            }}>Clarins</span>
            <span style={{
              width:"1px", height:"12px", background:"var(--gold)",
              opacity:0.4, display:"inline-block", marginBottom:"2px",
            }} />
            <span style={{
              fontSize:"9px", fontWeight:200, color:"var(--gold-light)",
              letterSpacing:"0.26em", textTransform:"uppercase",
            }}>Nigeria</span>
          </div>
          <p style={{
            fontSize:"9px", fontWeight:200,
            color:"rgba(255,255,255,0.25)", letterSpacing:"0.2em", textTransform:"uppercase",
          }}>
            © 2026 Clarins Nigeria · All Rights Reserved · 100% Authentic Products
          </p>
        </div>
      </footer>

    </div>
  );
}