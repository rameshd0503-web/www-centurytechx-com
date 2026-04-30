import { createFileRoute } from "@tanstack/react-router";
import { CircuitBackground } from "@/components/effects/CircuitBackground";
import { BootSequence } from "@/components/effects/BootSequence";
import { SectionFlash } from "@/components/effects/SectionFlash";
import { Navigation } from "@/components/site/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Divisions } from "@/components/sections/Divisions";

import { Services } from "@/components/sections/Services";
import { Collaboration } from "@/components/sections/Collaboration";
import { Automations } from "@/components/sections/Automations";
import { Portfolio } from "@/components/sections/Portfolio";
import { Clients } from "@/components/sections/Clients";
import { WhyTrust } from "@/components/sections/WhyTrust";
import { Stack } from "@/components/sections/Stack";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export const Route = createFileRoute("/")({
  head: () => {
    const title = "Century TechX LLP — Build · Launch · Automate";
    const description =
      "India's next-generation technology company building AI automation, EdTech platforms, and SaaS products. Based in Tumkur, Karnataka.";
    const url = "https://centurytechx.com/";
    const image = "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9e2a1725-82e8-444b-9c78-bd74e83cb3f6/id-preview-26dfb45c--be300750-a760-4e6e-920d-594741d04ab5.lovable.app-1776853397979.png";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <CircuitBackground />
      <BootSequence />

      <div className="relative" style={{ zIndex: 2 }}>
        <Navigation />
        <main>
          <Hero />
          <SectionFlash><Divisions /></SectionFlash>
          
          <SectionFlash><Services /></SectionFlash>
          <SectionFlash><Collaboration /></SectionFlash>
          <SectionFlash><Automations /></SectionFlash>
          <SectionFlash><Portfolio /></SectionFlash>
          <SectionFlash><Clients /></SectionFlash>
          <SectionFlash><WhyTrust /></SectionFlash>
          <SectionFlash><Stack /></SectionFlash>
          <SectionFlash><Contact /></SectionFlash>
        </main>
        <Footer />
      </div>
    </div>
  );
}
