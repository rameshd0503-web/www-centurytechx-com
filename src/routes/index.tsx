import { createFileRoute } from "@tanstack/react-router";
import { NavBar } from "@/components/v2/NavBar";
import { Hero } from "@/components/v2/Hero";
import { Problem, WhoWeServe, WhyOnePartner } from "@/components/v2/Sections";
import { Roadmap } from "@/components/v2/Roadmap";
import { Insights } from "@/components/v2/Insights";
import { DemoContact } from "@/components/v2/DemoContact";
import { SiteFooter } from "@/components/v2/SiteFooter";
import { FloatingActions } from "@/components/v2/FloatingActions";

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
        <Reveal><Divisions /></Reveal>
        <Reveal><Services /></Reveal>
        <Reveal><Collaboration /></Reveal>
        <Reveal><Automations /></Reveal>
        <Reveal><WorkflowsN8n /></Reveal>
        <Reveal><Portfolio /></Reveal>
        <Reveal><Clients /></Reveal>
        <Reveal><WhyTrust /></Reveal>
        <Reveal><Stack /></Reveal>
        <Reveal><Contact /></Reveal>
      </main>
      <Footer />
    </div>
  );
}

