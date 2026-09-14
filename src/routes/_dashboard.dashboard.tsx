import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/_dashboard/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Quality Dial" },
      { name: "description", content: "Live pipeline, calling and campaign performance for your workspace." },
      { property: "og:title", content: "Dashboard — Quality Dial" },
      { property: "og:description", content: "Live pipeline, calling and campaign performance for your workspace." },
    ],
  }),
  component: Page,
});

function Page() {
  return <PageShell title="Overview" description="Live pipeline, calling and campaign performance for your workspace." entity="widget" />;
}
