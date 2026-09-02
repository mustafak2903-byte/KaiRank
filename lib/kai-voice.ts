export type KaiVoiceCue =
  | "kai_intro"
  | "kai_scan_success"
  | "kai_scan_issue"
  | "kai_proof"
  | "kai_robots"
  | "kai_sitemap"
  | "kai_throw_reaction";

/**
 * Voice stays opt-in and asset-led. Null means the cue is intentionally silent
 * until a reviewed, pre-recorded file is available.
 */
export const kaiVoiceAssets: Readonly<Record<KaiVoiceCue, string | null>> = {
  kai_intro: null,
  kai_scan_success: null,
  kai_scan_issue: null,
  kai_proof: null,
  kai_robots: null,
  kai_sitemap: null,
  kai_throw_reaction: null,
};

export function getKaiVoiceAsset(cue: KaiVoiceCue) {
  return kaiVoiceAssets[cue];
}
