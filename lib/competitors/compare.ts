import { getCompetitorProviderStatus } from "@/lib/competitors/providers";
import type { CompetitorSearchInput, FastVisibilitySurface, VisibilityStatus } from "@/lib/competitors/types";
import { analyseWebsiteSurface } from "@/lib/competitors/website-analysis";

const priority: Record<VisibilityStatus, number> = {
  blocked: 5,
  opportunity: 4,
  "needs-review": 3,
  supported: 2,
  strong: 1,
};

export function buildVisibilityGap(surface: FastVisibilitySurface, input: CompetitorSearchInput) {
  const signals = analyseWebsiteSurface(surface, input);
  const strongestOpportunity = [...signals].sort((a, b) => priority[b.status] - priority[a.status])[0];

  return {
    clinic: { website: surface.finalUrl, signals },
    competitors: [],
    provider: getCompetitorProviderStatus(),
    strongestOpportunity,
    note: "This snapshot uses public website signals. It does not claim Google, Maps or AI-search positions.",
  };
}
