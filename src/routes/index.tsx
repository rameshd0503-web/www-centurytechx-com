import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "@/components/site/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Divisions } from "@/components/sections/Divisions";
import { Services } from "@/components/sections/Services";
import { Collaboration } from "@/components/sections/Collaboration";
import { Automations } from "@/components/sections/Automations";
import { WorkflowsN8n } from "@/components/sections/WorkflowsN8n";
import { Portfolio } from "@/components/sections/Portfolio";
import { Clients } from "@/components/sections/Clients";
import { WhyTrust } from "@/components/sections/WhyTrust";
import { Stack } from "@/components/sections/Stack";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export const Route = createFileRoute("/")({
  head: () => {
    const title = "Century TechX | The Operating System for Education";
    const description =
      "One technology partner for Indian schools, colleges, coaching and training institutes. Brand-OS is live today, with a seven-phase education ecosystem in build.";
    const url = "https://centurytechx.com/";
    const image = "https://centurytechx.com/og-image.png";
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
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <Navigation />
      <main>
        <Hero />
        <Divisions />
        <Services />
        <Collaboration />
        <Automations />
        <WorkflowsN8n />
        <Portfolio />
        <Clients />
        <WhyTrust />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
