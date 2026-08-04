import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/edu/Nav";
import { Hero } from "@/components/edu/Hero";
import {
  Problem,
  BrandOS,
  Ecosystem,
  WhoWeServe,
  WhyOnePartner,
  Insights,
  Company,
} from "@/components/edu/Sections";
import { DemoCTA } from "@/components/edu/DemoCTA";
import { SiteFooter } from "@/components/edu/SiteFooter";

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
      <Nav />
      <main>
        <Hero />
        <Problem />
        <BrandOS />
        <Ecosystem />
        <WhoWeServe />
        <WhyOnePartner />
        <Insights />
        <Company />
        <DemoCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
