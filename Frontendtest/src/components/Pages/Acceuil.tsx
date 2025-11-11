import React, { useEffect, useRef } from "react";
import Navbar from "../Layouts/Navbar";
import { gsap } from "gsap";
import LiquidEther from "../Layouts/LiquidEther";
  import CircularGallery from '../Layouts/CircularGallery'

const Acceuil: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      containerRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2 }
    );

    // Animation du texte (lettres)
    if (textRef.current) {
      const letters = Array.from(textRef.current.children);
      tl.fromTo(
        letters,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.8 },
        "-=0.5"
      );
    }

    // Animation du bouton
    if (btnRef.current) {
      tl.fromTo(
        btnRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6 },
        "-=0.3"
      );
    }
  }, []);

 const titleText = "Découvrez l'élégance en un parfum";

const splitTitle = titleText.split("").map((char, i) => (
  <span
    key={i}
    style={{
      display: "inline-block",
      marginRight: char === " " ? "0.4em" : "0", // ajoute un petit espace entre les mots
    }}
  >
    {char === " " ? "\u00A0" : char}
  </span>
));


  return (
    <div>
      <div style={{ width: '200vh', height: '100vh', position: 'relative' }}>
 <LiquidEther
    colors={[ '#5227FF', '#FF9FFC', '#B19EEF' ]}
    mouseForce={20}
    cursorSize={100}
    isViscous={false}
    viscous={30}
    iterationsViscous={32}
    iterationsPoisson={32}
    resolution={0.5}
    isBounce={false}
    autoDemo={true}
    autoSpeed={0.5}
    autoIntensity={2.2}
    takeoverDuration={0.25}
    autoResumeDelay={3000}
    autoRampDuration={0.6}
  />
</div>

       

{/* ==== Contenu principal ==== */}
<div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20">
  {/* Titre animé */}
           {/* ==== Navbar ==== */}
        <div className="absolute top-0 left-0 w-full z-20">
          <Navbar />
        </div>
  <div
  ref={textRef}
  className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-wide"
  style={{
    color: "#FDFDFD", // blanc cassé pour lisibilité
    textShadow: "0 4px 25px rgba(74, 0, 224, 0.65)", // halo violet foncé doux
  }}
>
  {splitTitle}
</div>

{/* Sous-texte */}
<p
  className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
  style={{
    color: "#8A63FF", // violet foncé lisible
    textShadow: "0 2px 8px rgba(0,0,0,0.45)", // halo noir léger
  }}
>
  Des senteurs uniques pour exprimer votre personnalité.
</p>

{/* Bouton animé */}
<button
  ref={btnRef}
  style={{
    background: "linear-gradient(135deg, #6E3BFF, #A17CFF)", // dégradé violet vif
    color: "#FFFFFF",
    fontWeight: 600,
    borderRadius: "9999px",
    padding: "14px 36px",
    fontSize: "1rem",
    boxShadow: "0 6px 20px rgba(161, 124, 255, 0.45)",
    transition: "all 0.35s ease",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.filter = "brightness(1.25)";
    e.currentTarget.style.boxShadow = "0 0 30px rgba(110, 59, 255, 0.6)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.filter = "brightness(1)";
    e.currentTarget.style.boxShadow = "0 6px 20px rgba(161, 124, 255, 0.45)";
  }}
>
  Explorer nos parfums
</button>


      </div>
    

<div style={{ height: '600px', position: 'relative' }}>
  <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02}/>
</div>
    </div>
  );
}


export default Acceuil;