import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "Century TechX LLP" },
      { name: "keywords", content: "Century TechX, education technology India, school software, college ERP, coaching institute marketing, Brand-OS, EdTech ecosystem" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Century TechX" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@centurytechx" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap",
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://centurytechx.com/#organization",
              name: "Century TechX",
              url: "https://centurytechx.com/",
              logo: "https://centurytechx.com/favicon.png",
              email: "info@centurytechx.com",
              telephone: "+91-80730-92082",
            },
            {
              "@type": "WebSite",
              "@id": "https://centurytechx.com/#website",
              name: "Century TechX",
              url: "https://centurytechx.com/",
              publisher: { "@id": "https://centurytechx.com/#organization" },
            },
            {
              "@type": "LocalBusiness",
              "@id": "https://centurytechx.com/#localbusiness",
              name: "Century TechX",
              url: "https://centurytechx.com/",
              telephone: "+91-80730-92082",
              email: "info@centurytechx.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Plot No. 119, KIADB Industrial Area, 1st Phase, Vasanthanarasapura",
                addressLocality: "Tumkur",
                addressRegion: "Karnataka",
                postalCode: "572137",
                addressCountry: "IN",
              },
            },
          ],
        }),
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Outlet />
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            success: "!bg-green-600 !text-white !border-green-700",
            error: "!bg-red-600 !text-white !border-red-700",
          },
        }}
      />
    </>
  );
}
