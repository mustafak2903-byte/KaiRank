import type { CompetitorProvider } from "@/lib/competitors/types";

const providers: CompetitorProvider[] = [];

export function getConfiguredCompetitorProvider() {
  return providers.find((provider) => provider.isConfigured()) ?? null;
}

export function getCompetitorProviderStatus() {
  return {
    configured: providers.filter((provider) => provider.isConfigured()).map(({ id, label }) => ({ id, label })),
    note: "No competitor-discovery provider is configured. KaiRank will not invent nearby businesses or ranking positions.",
  };
}
