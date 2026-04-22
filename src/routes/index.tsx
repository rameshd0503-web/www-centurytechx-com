import { createFileRoute } from "@tanstack/react-router";
import { ScanlineOverlay } from "@/components/effects/ScanlineOverlay";
import { CircuitBackground } from "@/components/effects/CircuitBackground";
import { CursorReticle } from "@/components/effects/CursorReticle";
import { BootSequence } from "@/components/effects/BootSequence";
import { SectionFlash } from "@/components/effects/SectionFlash";
import { Navigation } from "@/components/site/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Divisions } from "@/components/sections/Divisions";
import { Products } from "@/components/sections/Products";
import { Services } from "@/components/sections/Services";
import { Collaboration } from "@/components/sections/Collaboration";
import { Clients } from "@/components/sections/Clients";
import { Stack } from "@/components/sections/Stack";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Century TechX LLP — Build · Launch · Automate" },
      {
        name: "description",
        content:
          "India's next-generation technology company building AI automation, EdTech platforms, and SaaS products. Based in Tumkur, Karnataka.",
      },
      { property: "og:title", content: "Century TechX LLP — Build · Launch · Automate" },
      {
        property: "og:description",
        content:
          "AI automation, EdTech platforms, and SaaS products engineered in India. ExamOS, StudentOS, and custom systems for ambitious teams.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Century TechX LLP — Build · Launch · Automate" },
      {
        name: "twitter:description",
        content: "India's next-generation technology company. AI · EdTech · SaaS.",
      },
      { rel: "canonical", href: "https://centurytechx.in" } as unknown as Record<string, string>,
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <CircuitBackground />
      <ScanlineOverlay />
      <CursorReticle />
      <BootSequence />

      <div className="relative" style={{ zIndex: 2 }}>
        <Navigation />
        <main>
          <Hero />
          <SectionFlash><Divisions /></SectionFlash>
          <SectionFlash><Products /></SectionFlash>
          <SectionFlash><Services /></SectionFlash>
          <SectionFlash><Collaboration /></SectionFlash>
          <SectionFlash><Clients /></SectionFlash>
          <SectionFlash><Stack /></SectionFlash>
          <SectionFlash><Contact /></SectionFlash>
        </main>
        <Footer />
      </div>
    </div>
  );
}
