import React, { useEffect } from "react";

export default function OurStoryModal({ onClose }) {
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", fn);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, zIndex: 2000,
        background: "rgba(28,16,16,0.7)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        animation: "fadeIn 0.25s ease",
      }} />

      {/* Panel */}
      <div style={{
        position: "fixed",
        top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        zIndex: 2001,
        width: "min(700px, 94vw)",
        maxHeight: "88vh",
        overflowY: "auto",
        background: "var(--ivory)",
        animation: "slideUp 0.32s cubic-bezier(0.4,0,0.2,1)",
      }}>

        {/* Hero image inside modal */}
        <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
          <img
            src="https://images.unsplash.com/photo-1570194065650-d99fb4b38e86?w=900&q=80&fit=crop"
            alt="Clarins botanicals"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 60%" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(28,16,16,0.85) 0%, rgba(28,16,16,0.2) 100%)",
          }} />
          {/* Close */}
          <button onClick={onClose} style={{
            position: "absolute", top: "14px", right: "16px",
            background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer",
            color: "#fff", width: "30px", height: "30px", borderRadius: "50%",
            fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(4px)", transition: "background 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.3)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
          >✕</button>
          {/* Title over image */}
          <div style={{ position: "absolute", bottom: "24px", left: "40px" }}>
            <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"9px", fontWeight:200, letterSpacing:"0.4em", textTransform:"uppercase", color:"var(--gold-light)", marginBottom:"8px" }}>
              Since 1954
            </p>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"36px", fontWeight:300, color:"#fff", letterSpacing:"0.05em", lineHeight:1 }}>
              Our Story
            </h2>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "36px 40px 44px" }}>

          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"20px", fontStyle:"italic", fontWeight:300, color:"var(--rose)", lineHeight:1.55, marginBottom:"22px" }}>
            "Beauty is not a luxury — it is a science rooted in nature."
          </p>

          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"13px", fontWeight:300, color:"var(--muted)", lineHeight:1.85, marginBottom:"18px" }}>
            In 1954, Michael Marvellous-Clarins founded Clarins in Paris with a single radical belief: that plants hold the secret to truly beautiful skin. Armed with a massage table, a handful of plant extracts, and an unshakeable conviction, he began treating women with natural formulas at a time when the beauty world relied entirely on synthetics.
          </p>

          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"13px", fontWeight:300, color:"var(--muted)", lineHeight:1.85, marginBottom:"32px" }}>
            Seven decades later, Clarins remains family-owned — guided by those same principles, powered by plant science, and committed to doing right by women and by the planet. Every formula is tested with real women. Every ingredient is traceable. Every product is made to work.
          </p>

          {/* 3 pillars */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))", gap:"16px", marginBottom:"36px" }}>
            {[
              { icon:"🌿", title:"Plant Science", body:"Over 250 plant extracts from Clarins' own botanical gardens and ethical global suppliers." },
              { icon:"💗", title:"Made for Women", body:"Every formula tested and perfected with real women — because Clarins believes you deserve the best." },
              { icon:"🇳🇬", title:"Clarins Nigeria", body:"100% authentic Clarins, delivered with love to every corner of Nigeria." },
            ].map(({ icon, title, body }) => (
              <div key={title} style={{
                borderTop: "1.5px solid var(--border)",
                paddingTop: "16px",
              }}>
                <div style={{ fontSize: "20px", marginBottom: "8px" }}>{icon}</div>
                <h4 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"16px", fontWeight:500, color:"var(--charcoal)", marginBottom:"6px" }}>{title}</h4>
                <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"12px", fontWeight:300, color:"var(--muted)", lineHeight:1.65 }}>{body}</p>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            style={{
              background:"var(--charcoal)", color:"#fff", border:"none",
              padding:"14px 44px", cursor:"pointer",
              fontFamily:"'Outfit',sans-serif", fontSize:"10px", fontWeight:300,
              letterSpacing:"0.26em", textTransform:"uppercase",
              transition:"background 0.2s", display:"block", margin:"0 auto",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--rose)"}
            onMouseLeave={e => e.currentTarget.style.background = "var(--charcoal)"}
          >
            Shop Our Products
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { opacity:0; transform:translate(-50%,-46%) } to { opacity:1; transform:translate(-50%,-50%) } }
      `}</style>
    </>
  );
}
