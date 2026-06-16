import { useState, useEffect } from "react";

// TODO: Reemplazar todas las URLs de imágenes con los assets originales de thefabulous.co
// TODO: Integrar analytics (Segment/GTM) como en el sitio original
// TODO: Agregar animaciones de scroll (IntersectionObserver) para las secciones de features

const COLORS = {
  purple: "#251c93",
  purpleLight: "#CBC7FF",
  purpleMid: "#3c3680",
  purpleDark: "#14103d",
  accent: "#5b4cf5",
  accentLight: "#ebe9ff",
  white: "#ffffff",
  textDark: "#14191d",
  textGray: "#555",
  bgLight: "#f8f7ff",
  gold: "#f5a623",
};

const ONBOARDING_URL =
  "https://start.thefabulous.co/onboarding/fabulous-initial?utm_medium=website&utm_source=landing_page";

const NAV_APPS = [
  {
    id: "fabulous",
    name: "Fabulous",
    href: "/",
    // TODO: img: "images/Fabulous-Logo.jpg"
    emoji: "✨",
    current: true,
  },
  {
    id: "shape",
    name: "Healthy Eating",
    href: "/shape/",
    // TODO: img: "images/Shape-Logo.jpg"
    emoji: "🥗",
  },
  {
    id: "clarify",
    name: "ADHD Organizer",
    href: "/clarify/",
    // TODO: img: "images/clarify-logo2.jpeg"
    emoji: "🧠",
  },
  {
    id: "elixir",
    name: "Find Purpose",
    href: "https://elixir.thefabulous.co/onboarding/elixir-initial?utm_medium=website&utm_source=landing_page",
    // TODO: img: "images/Elixir-Logo.jpg"
    emoji: "🌟",
  },
  {
    id: "mind",
    name: "Ease Stress",
    href: "https://mind.thefabulous.co/onboarding/mind-initial?utm_medium=website&utm_source=landing_page",
    // TODO: img: "images/img_lumiere_header_landing.png"
    emoji: "🧘",
  },
  {
    id: "sleep",
    name: "Sleep Tracker",
    href: "https://sleep.thefabulous.co/onboarding/sleep-initial?utm_medium=website&utm_source=landing_page",
    // TODO: img: "images/Mind-Logo.jpg"
    emoji: "🌙",
  },
];

const FEATURES = [
  {
    id: 1,
    title: "Biblioteca de coaching 24/7",
    subtitle:
      "Obtén un impulso en 2 minutos. Series disponibles bajo demanda todo el día y toda la noche.",
    // TODO: img: "images/Fabulous_Feature_1_Desktop.webp"
    emoji: "📚",
    color: "#f0eeff",
    align: "left",
  },
  {
    id: 2,
    title: "Coach humano de Fabulous",
    subtitle:
      "Habla con un coach real que te apoya en tus metas personales y te ayuda a mantener el rumbo.",
    // TODO: img: feature 2 image
    emoji: "🤝",
    color: "#fff0f5",
    align: "right",
  },
  {
    id: 3,
    title: "Rituales que cambian vidas",
    subtitle:
      "Construye rutinas matutinas, vespertinas y nocturnas que transforman tus hábitos paso a paso.",
    // TODO: img: feature 3 image
    emoji: "🌅",
    color: "#f0fff4",
    align: "left",
  },
  {
    id: 4,
    title: "Seguimiento de progreso",
    subtitle:
      "Visualiza tu avance, celebra rachas y mantén la motivación con estadísticas personalizadas.",
    // TODO: img: feature 4 image
    emoji: "📈",
    color: "#fff8f0",
    align: "right",
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    text: "Fabulous cambió mi vida por completo. En 3 meses logré construir una rutina matutina que pensé que nunca podría mantener.",
    author: "María G.",
    stars: 5,
    source: "App Store",
  },
  {
    id: 2,
    text: "La ciencia detrás de la app es real. Mis hábitos de sueño mejoraron dramáticamente en las primeras semanas.",
    author: "Carlos M.",
    stars: 5,
    source: "Google Play",
  },
  {
    id: 3,
    text: "Por fin una app que no me hace sentir mal cuando fallo. Me ayuda a volver al camino sin juicios.",
    author: "Ana P.",
    stars: 5,
    source: "App Store",
  },
];

const FAQ_ITEMS = [
  {
    id: 1,
    question: "¿Cómo funciona Fabulous?",
    answer:
      "Fabulous utiliza ciencia del comportamiento desarrollada en la Universidad de Duke para ayudarte a construir hábitos saludables de forma gradual. Empiezas con pequeños rituales y los vas expandiendo con el tiempo hasta crear rutinas completas.",
  },
  {
    id: 2,
    question: "¿Es gratis Fabulous?",
    answer:
      "Fabulous ofrece una prueba gratuita para que puedas experimentar todas las funciones. Después, puedes elegir un plan de suscripción mensual o anual. La inversión en tus hábitos vale cada centavo.",
  },
  {
    id: 3,
    question: "¿En qué se diferencia Fabulous de otras apps de hábitos?",
    answer:
      "Fabulous está basada en investigación científica de Duke University y usa psicología del comportamiento real. No solo rastreamos hábitos, te guiamos con coaching, motivación personalizada y una comunidad de millones de personas.",
  },
  {
    id: 4,
    question: "¿Puedo usar Fabulous si tengo TDAH?",
    answer:
      "¡Absolutamente! Fabulous tiene características específicamente diseñadas para personas con TDAH. Nuestro organizador Clarify también está disponible como herramienta complementaria. Muchos usuarios con TDAH reportan mejoras significativas.",
  },
  {
    id: 5,
    question: "¿Cuánto tiempo necesito dedicarle cada día?",
    answer:
      "Puedes empezar con solo 2 minutos al día. Fabulous se adapta a tu ritmo de vida. Lo importante es la consistencia, no la duración. Conforme avanzas, puedes ir agregando más tiempo si así lo deseas.",
  },
  {
    id: 6,
    question: "¿Funciona Fabulous en Android e iOS?",
    answer:
      "Sí, Fabulous está disponible tanto en la App Store de Apple como en Google Play. También puedes iniciar tu journey desde nuestro sitio web.",
  },
];

const AWARDS = [
  {
    icon: "🍎",
    title: "Mejor App de Autocuidado 2018",
    sub: "App Store",
  },
  {
    icon: "▶️",
    title: "Finalista Mejor App",
    sub: "Google Play Awards",
  },
  {
    icon: "🎨",
    title: "Ganador Premio de Diseño",
    sub: "Google Material",
  },
];

const SCIENCE_PILLARS = [
  {
    emoji: "🔬",
    title: "Basado en ciencia",
    desc: "Desarrollado con investigadores de Duke University usando principios reales de psicología del comportamiento.",
  },
  {
    emoji: "🎯",
    title: "Metas progresivas",
    desc: "Empiezas con cambios pequeños y los vas ampliando. La neurociencia muestra que así se forman hábitos duraderos.",
  },
  {
    emoji: "💡",
    title: "Coaching personalizado",
    desc: "Cada usuario recibe un camino único basado en sus metas, desafíos y ritmo de vida.",
  },
  {
    emoji: "🏆",
    title: "Más de 30 millones",
    desc: "Personas en todo el mundo han transformado sus vidas con Fabulous. Únete a la comunidad.",
  },
];

function StarRating({ count }) {
  return (
    <span style={{ color: "#f5a623", fontSize: "14px" }}>
      {"★".repeat(count)}
    </span>
  );
}

function NavBar({ scrolled }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header>
      {/* Top App Nav */}
      <nav
        style={{
          width: "100%",
          backgroundColor: COLORS.purple,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "14px 16px",
          gap: "clamp(16px, 4vw, 64px)",
          flexWrap: "wrap",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 2px 12px rgba(37,28,147,0.3)",
        }}
      >
        {NAV_APPS.map((app) => (
          <a
            key={app.id}
            href={app.href}
            style={{
              color: app.current ? "#fff" : "rgba(255,255,255,0.8)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              textDecoration: "none",
              fontWeight: app.current ? 700 : 600,
              fontSize: "clamp(10px, 1.5vw, 13px)",
              lineHeight: "1.2",
              borderBottom: app.current ? "2px solid #CBC7FF" : "2px solid transparent",
              paddingBottom: "2px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (!app.current) {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderBottomColor = "rgba(203,199,255,0.5)";
              }
            }}
            onMouseLeave={(e) => {
              if (!app.current) {
                e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                e.currentTarget.style.borderBottomColor = "transparent";
              }
            }}
          >
            {/* TODO: Reemplazar emoji con <img src={app.img} style={{width:24,height:24,borderRadius:6}} /> */}
            <span style={{ fontSize: "18px" }}>{app.emoji}</span>
            <span>{app.name}</span>
          </a>
        ))}
      </nav>

      {/* Main Navbar */}
      <div
        style={{
          width: "100%",
          backgroundColor: scrolled ? "#fff" : "transparent",
          position: scrolled ? "sticky" : "relative",
          top: scrolled ? "0" : "auto",
          zIndex: 999,
          transition: "all 0.3s ease",
          boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.1)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: "1170px",
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
            }}
          >
            {/* TODO: Reemplazar con <img src="images/fabulous_logo2x.webp" style={{height:32}} /> */}
            <span
              style={{
                fontSize: "22px",
                fontWeight: 800,
                color: scrolled ? COLORS.purpleMid : "#fff",
                letterSpacing: "-0.5px",
              }}
            >
              ✨ Fabulous
            </span>
          </a>

          {/* Desktop Links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
            }}
          >
            <a
              href="https://www.thefabulous.co/science-behind-fabulous/"
              style={{
                color: scrolled ? COLORS.textDark : "rgba(255,255,255,0.9)",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "15px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = scrolled ? COLORS.purple : "#fff")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = scrolled ? COLORS.textDark : "rgba(255,255,255,0.9)")
              }
            >
              Ciencia
            </a>
            <a
              href="https://app.thefabulous.co/login?fab_source=homepage"
              style={{
                color: scrolled ? COLORS.textDark : "rgba(255,255,255,0.9)",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "15px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = scrolled ? COLORS.purple : "#fff")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = scrolled ? COLORS.textDark : "rgba(255,255,255,0.9)")
              }
            >
              Iniciar sesión
            </a>
            <a
              href={ONBOARDING_URL}
              style={{
                backgroundColor: "#fff",
                color: COLORS.purple,
                padding: "10px 22px",
                borderRadius: "30px",
                fontWeight: 700,
                fontSize: "14px",
                textDecoration: "none",
                transition: "all 0.2s ease",
                boxShadow: "0 4px 12px rgba(91,76,245,0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = COLORS.accentLight;
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#fff";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Empezar
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section
      style={{
        background: `linear-gradient(135deg, ${COLORS.purple} 0%, #1a0f7a 40%, #3c2aae 70%, #6b4ef0 100%)`,
        minHeight: "85vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px 60px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorative circles */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(203,199,255,0.08)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "-80px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(203,199,255,0.06)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "770px", position: "relative", zIndex: 1 }}>
        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 52px)",
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.15,
            marginBottom: "24px",
            letterSpacing: "-1px",
          }}
        >
          Encuentra tu rutina diaria ideal y hazla permanente
        </h1>
        <p
          style={{
            fontSize: "clamp(15px, 2vw, 19px)",
            color: "rgba(255,255,255,0.85)",
            lineHeight: 1.7,
            marginBottom: "40px",
            maxWidth: "600px",
            margin: "0 auto 40px",
          }}
        >
          Respaldado por ciencia del comportamiento, Fabulous es el socio de
          responsabilidad que llevas en el bolsillo para ayudarte a hacer
          cambios inteligentes y construir hábitos saludables. ¿Listo para
          llevar tu vida al siguiente nivel?
        </p>

        <a
          href={ONBOARDING_URL}
          style={{
            display: "inline-block",
            backgroundColor: "#fff",
            color: COLORS.purple,
            padding: "16px 40px",
            borderRadius: "40px",
            fontWeight: 800,
            fontSize: "17px",
            textDecoration: "none",
            boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
            marginBottom: "16px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.2)";
          }}
        >
          Comienza tu viaje
        </a>
        <p
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "13px",
            marginTop: "12px",
          }}
        >
          Prueba gratis · Sin tarjeta requerida
        </p>

        {/* Awards */}
        <div style={{ marginTop: "64px" }}>
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            Premios Fabulous
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "clamp(16px, 4vw, 48px)",
              flexWrap: "wrap",
            }}
          >
            {AWARDS.map((award, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                  padding: "12px 18px",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                {/* TODO: Reemplazar emojis con logos SVG originales: app-store.svg, google-play.svg, google-material.svg */}
                <span style={{ fontSize: "22px" }}>{award.icon}</span>
                <div style={{ textAlign: "left" }}>
                  <div
                    style={{
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "12px",
                      lineHeight: 1.3,
                    }}
                  >
                    {award.title}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.6)",
                      fontSize: "11px",
                      marginTop: "2px",
                    }}
                  >
                    {award.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section
      style={{
        backgroundColor: COLORS.bgLight,
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(22px, 3vw, 36px)",
            fontWeight: 800,
            color: COLORS.purpleDark,
            marginBottom: "16px",
          }}
        >
          Todo lo que necesitas para transformar tu vida
        </h2>
        <p
          style={{
            textAlign: "center",
            color: COLORS.textGray,
            fontSize: "17px",
            marginBottom: "64px",
            maxWidth: "540px",
            margin: "0 auto 64px",
          }}
        >
          Herramientas poderosas, respaldadas por ciencia real
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
          }}
        >
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }) {
  const isRight = feature.align === "right";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "32px",
        backgroundColor: "#fff",
        borderRadius: "24px",
        padding: "48px 40px",
        boxShadow: "0 4px 24px rgba(91,76,245,0.08)",
        border: "1px solid rgba(203,199,255,0.3)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(91,76,245,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(91,76,245,0.08)";
      }}
    >
      {/* Phone mockup */}
      <div
        style={{
          width: "200px",
          height: "380px",
          backgroundColor: feature.color,
          borderRadius: "32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid rgba(203,199,255,0.4)",
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(91,76,245,0.15)",
        }}
      >
        {/* TODO: Reemplazar con <img src={feature.img} style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'32px'}} /> */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${feature.color} 0%, rgba(203,199,255,0.3) 100%)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <span style={{ fontSize: "56px" }}>{feature.emoji}</span>
          <div
            style={{
              width: "120px",
              height: "8px",
              backgroundColor: "rgba(91,76,245,0.2)",
              borderRadius: "4px",
            }}
          />
          <div
            style={{
              width: "80px",
              height: "8px",
              backgroundColor: "rgba(91,76,245,0.15)",
              borderRadius: "4px",
            }}
          />
          <div
            style={{
              width: "100px",
              height: "8px",
              backgroundColor: "rgba(91,76,245,0.1)",
              borderRadius: "4px",
            }}
          />
        </div>
        {/* Notch */}
        <div
          style={{
            position: "absolute",
            top: "12px",
            width: "60px",
            height: "18px",
            backgroundColor: "rgba(0,0,0,0.06)",
            borderRadius: "9px",
          }}
        />
      </div>

      {/* Text */}
      <div style={{ maxWidth: "480px", textAlign: "center" }}>
        <h3
          style={{
            fontSize: "clamp(18px, 2.5vw, 26px)",
            fontWeight: 800,
            color: COLORS.purpleDark,
            marginBottom: "16px",
            lineHeight: 1.2,
          }}
        >
          {feature.title}
        </h3>
        <p
          style={{
            fontSize: "16px",
            color: COLORS.textGray,
            lineHeight: 1.7,
            marginBottom: "24px",
          }}
        >
          {feature.subtitle}
        </p>
        <a
          href={ONBOARDING_URL}
          style={{
            display: "inline-block",
            backgroundColor: COLORS.purple,
            color: "#fff",
            padding: "12px 28px",
            borderRadius: "30px",
            fontWeight: 700,
            fontSize: "14px",
            textDecoration: "none",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = COLORS.accent;
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = COLORS.purple;
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Explorar →
        </a>
      </div>
    </div>
  );
}

function ScienceSection() {
  return (
    <section
      style={{
        background: `linear-gradient(135deg, ${COLORS.purple} 0%, #3c2aae 100%)`,
        padding: "80px 24px",
        color: "#fff",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
        <p
          style={{
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: COLORS.purpleLight,
            marginBottom: "16px",
          }}
        >
          La ciencia detrás de Fabulous
        </p>
        <h2
          style={{
            fontSize: "clamp(22px, 3vw, 36px)",
            fontWeight: 800,
            color: "#fff",
            marginBottom: "16px",
          }}
        >
          Nacido en Duke University
        </h2>
        <p
          style={{
            fontSize: "17px",
            color: "rgba(255,255,255,0.75)",
            maxWidth: "600px",
            margin: "0 auto 64px",
            lineHeight: 1.7,
          }}
        >
          Fabulous fue desarrollado con investigadores de la Universidad de Duke
          usando psicología del comportamiento real para crear cambios duraderos.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "24px",
          }}
        >
          {SCIENCE_PILLARS.map((pillar, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                padding: "32px 24px",
                border: "1px solid rgba(255,255,255,0.15)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.14)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: "36px", marginBottom: "16px" }}>
                {pillar.emoji}
              </div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "10px",
                }}
              >
                {pillar.title}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.6,
                }}
              >
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section
      style={{
        backgroundColor: "#fff",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <p
          style={{
            textAlign: "center",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: COLORS.accent,
            marginBottom: "12px",
          }}
        >
          Historias reales
        </p>
        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(22px, 3vw, 36px)",
            fontWeight: 800,
            color: COLORS.purpleDark,
            marginBottom: "16px",
          }}
        >
          Millones de vidas transformadas
        </h2>
        <p
          style={{
            textAlign: "center",
            color: COLORS.textGray,
            fontSize: "16px",
            marginBottom: "56px",
          }}
        >
          Con calificación de 4.8/5 estrellas en ambas tiendas
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              style={{
                backgroundColor: COLORS.bgLight,
                borderRadius: "20px",
                padding: "32px",
                border: "1px solid rgba(203,199,255,0.4)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(91,76,245,0.12)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <StarRating count={t.stars} />
              <p
                style={{
                  fontSize: "15px",
                  color: COLORS.textDark,
                  lineHeight: 1.7,
                  margin: "16px 0",
                  fontStyle: "italic",
                }}
              >
                "{t.text}"
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: "14px",
                    color: COLORS.purpleMid,
                  }}
                >
                  {t.author}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: COLORS.textGray,
                    backgroundColor: "#fff",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    border: "1px solid rgba(203,199,255,0.4)",
                  }}
                >
                  {t.source}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <section
      style={{
        backgroundColor: COLORS.bgLight,
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <p
          style={{
            textAlign: "center",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: COLORS.accent,
            marginBottom: "12px",
          }}
        >
          Preguntas frecuentes
        </p>
        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(22px, 3vw, 32px)",
            fontWeight: 800,
            color: COLORS.purpleDark,
            marginBottom: "48px",
          }}
        >
          Todo lo que necesitas saber
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {FAQ_ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                borderTop: `1px solid ${COLORS.purpleLight}`,
              }}
            >
              <button
                onClick={() => toggle(item.id)}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "24px 0",
                  textAlign: "left",
                  gap: "16px",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(14px, 2vw, 16px)",
                    fontWeight: 700,
                    color: openId === item.id ? COLORS.purpleMid : COLORS.purpleDark,
                    lineHeight: 1.4,
                    flex: 1,
                    transition: "color 0.2s",
                  }}
                >
                  {item.question}
                </span>
                <span
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: openId === item.id ? COLORS.purple : "rgba(203,199,255,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: openId === item.id ? "#fff" : COLORS.purpleMid,
                    fontSize: "18px",
                    fontWeight: 700,
                    flexShrink: 0,
                    transition: "all 0.3s ease",
                    transform: openId === item.id ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  +
                </span>
              </button>
              <div
                style={{
                  maxHeight: openId === item.id ? "300px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <p
                  style={{
                    fontSize: "15px",
                    color: COLORS.textGray,
                    lineHeight: 1.7,
                    paddingBottom: "24px",
                    margin: 0,
                  }}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
          {/* Last item border */}
          <div style={{ borderTop: `1px solid ${COLORS.purpleLight}` }} />
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section
      style={{
        background: `linear-gradient(135deg, ${COLORS.purple} 0%, #6b4ef0 100%)`,
        padding: "100px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative blobs */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.04)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <p
          style={{
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: COLORS.purpleLight,
            marginBottom: "16px",
          }}
        >
          Empieza hoy
        </p>
        <h2
          style={{
            fontSize: "clamp(26px, 4vw, 44px)",
            fontWeight: 800,
            color: "#fff",
            marginBottom: "20px",
            maxWidth: "600px",
            margin: "0 auto 20px",
            lineHeight: 1.2,
          }}
        >
          Tu mejor versión te está esperando
        </h2>
        <p
          style={{
            fontSize: "17px",
            color: "rgba(255,255,255,0.75)",
            maxWidth: "480px",
            margin: "0 auto 40px",
            lineHeight: 1.7,
          }}
        >
          Únete a más de 30 millones de personas que ya están transformando sus
          vidas con Fabulous.
        </p>

        <a
          href={ONBOARDING_URL}
          style={{
            display: "inline-block",
            backgroundColor: "#fff",
            color: COLORS.purple,
            padding: "18px 48px",
            borderRadius: "40px",
            fontWeight: 800,
            fontSize: "18px",
            textDecoration: "none",
            boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
            e.currentTarget.style.boxShadow = "0 16px 50px rgba(0,0,0,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.2)";
          }}
        >
          Comienza tu viaje →
        </a>

        {/* App store badges */}
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          {/* TODO: Reemplazar con imágenes reales de badges de App Store y Google Play */}
          {["🍎 App Store", "▶️ Google Play"].map((badge, i) => (
            <a
              key={i}
              href={ONBOARDING_URL}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: "14px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "14px",
                transition: "all 0.2s ease",
                backdropFilter: "blur(10px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {badge}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const footerLinks = [
    { label: "Ciencia", href: "https://www.thefabulous.co/science-behind-fabulous/" },
    { label: "Privacidad", href: "https://www.thefabulous.co/privacy-policy/" },
    { label: "Términos", href: "https://www.thefabulous.co/terms-of-service/" },
    { label: "Blog", href: "https://www.thefabulous.co/blog/" },
    // TODO: Agregar más links del footer original
  ];

  return (
    <footer
      style={{
        backgroundColor: COLORS.purpleDark,
        padding: "60px 24px 40px",
        color: "rgba(255,255,255,0.6)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "40px",
            marginBottom: "48px",
          }}
        >
          {/* Brand */}
          <div>
            {/* TODO: Reemplazar con img logo */}
            <div
              style={{
                fontSize: "22px",
                fontWeight: 800,
                color: "#fff",
                marginBottom: "12px",
              }}
            >
              ✨ Fabulous
            </div>
            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.6,
                maxWidth: "260px",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Construye mejores hábitos y alcanza tus metas con ciencia del comportamiento.
            </p>
          </div>

          {/* Links */}
          <div
            style={{
              display: "flex",
              gap: "48px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <p
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "14px",
                  marginBottom: "16px",
                }}
              >
                Empresa
              </p>
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    display: "block",
                    color: "rgba(255,255,255,0.5)",
                    textDecoration: "none",
                    fontSize: "14px",
                    marginBottom: "10px",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
                  }
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div>
              <p
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "14px",
                  marginBottom: "16px",
                }}
              >
                Apps
              </p>
              {NAV_APPS.map((app) => (
                <a
                  key={app.id}
                  href={app.href}
                  style={{
                    display: "block",
                    color: "rgba(255,255,255,0.5)",
                    textDecoration: "none",
                    fontSize: "14px",
                    marginBottom: "10px",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
                  }
                >
                  {app.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p style={{ fontSize: "13px", margin: 0 }}>
            © {new Date().getFullYear()} Fabulous. Todos los derechos reservados.
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            {/* TODO: Agregar íconos de redes sociales (Twitter, Instagram, Facebook) */}
            {["Twitter", "Instagram", "Facebook"].map((social) => (
              <a
                key={social}
                href={`https://www.thefabulous.co/`}
                style={{
                  color: "rgba(255,255,255,0.4)",
                  textDecoration: "none",
                  fontSize: "13px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.4)")
                }
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        margin: 0,
        padding: 0,
        backgroundColor: "#fff",
        overflowX: "hidden",
      }}
    >
      <NavBar scrolled={scrolled} />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ScienceSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}