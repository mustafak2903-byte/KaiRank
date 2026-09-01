import type { CompetitorSearchInput, FastVisibilitySurface, ObservableSignal, VisibilityStatus } from "@/lib/competitors/types";

const ignoredWords = new Set(["and", "the", "for", "with", "clinic", "service", "services"]);

function terms(value: string) {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((term) => term.length > 2 && !ignoredWords.has(term));
}

function containsUsefulTerm(surface: string, target: string) {
  const candidates = terms(target);
  return candidates.length > 0 && candidates.some((term) => surface.includes(term));
}

function statusFromChecks(surface: FastVisibilitySurface, ids: string[]): VisibilityStatus {
  const checks = surface.checks.filter((check) => ids.includes(check.id));
  if (checks.some((check) => check.status === "fail")) return "blocked";
  if (checks.some((check) => check.status === "attention" || check.status === "info")) return "opportunity";
  return "strong";
}

export function analyseWebsiteSurface(surface: FastVisibilitySurface, input: CompetitorSearchInput): ObservableSignal[] {
  const searchableText = [surface.title, surface.metaDescription, surface.primaryHeading]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  const serviceFound = containsUsefulTerm(searchableText, input.priorityService);
  const locationFound = containsUsefulTerm(searchableText, input.location);

  return [
    {
      id: "technical-foundation",
      label: "Technical foundation",
      status: statusFromChecks(surface, ["response", "https", "canonical", "viewport", "robots", "sitemap"]),
      evidence: "Based on the public response, HTTPS, canonical, mobile and indexation signals checked above.",
    },
    {
      id: "treatment-relevance",
      label: "Treatment relevance",
      status: serviceFound ? "supported" : "opportunity",
      evidence: serviceFound
        ? `Language related to “${input.priorityService}” appears in the public title, description or H1.`
        : `Language related to “${input.priorityService}” was not detected in the public title, description or H1. This is not a ranking test.`,
    },
    {
      id: "location-context",
      label: "Location context",
      status: locationFound ? "supported" : "needs-review",
      evidence: locationFound
        ? `“${input.location}” is represented in the public page fundamentals.`
        : `“${input.location}” was not detected in the public title, description or H1. Maps visibility still needs a manual/provider-backed review.`,
    },
    {
      id: "structured-clarity",
      label: "Structured clarity",
      status: surface.structuredDataCount > 0 ? "supported" : "opportunity",
      evidence: surface.structuredDataCount > 0
        ? `${surface.structuredDataCount} public JSON-LD block${surface.structuredDataCount === 1 ? " was" : "s were"} detected.`
        : "No JSON-LD block was detected on the checked page.",
    },
    {
      id: "competitive-position",
      label: "Competitive visibility",
      status: "needs-review",
      evidence: "No competitor provider is configured, so nearby businesses and ranking positions are not inferred.",
    },
  ];
}
