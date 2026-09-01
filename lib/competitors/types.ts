export type VisibilityStatus = "strong" | "opportunity" | "supported" | "needs-review" | "blocked";

export type ObservableSignal = {
  id: string;
  label: string;
  status: VisibilityStatus;
  evidence: string;
};

export type CompetitorCandidate = {
  id: string;
  name: string;
  website: string | null;
  source: string;
  sourceLabel: string;
};

export type CompetitorSearchInput = {
  website: string;
  location: string;
  priorityService: string;
};

export interface CompetitorProvider {
  id: string;
  label: string;
  isConfigured(): boolean;
  discover(input: CompetitorSearchInput, signal: AbortSignal): Promise<CompetitorCandidate[]>;
}

export type FastVisibilitySurface = {
  finalUrl: string;
  statusCode: number;
  responseMs: number;
  title: string | null;
  metaDescription: string | null;
  primaryHeading: string | null;
  canonical: string | null;
  structuredDataCount: number;
  checks: Array<{
    id: string;
    label: string;
    status: "pass" | "attention" | "fail" | "info";
    value: string;
  }>;
};
