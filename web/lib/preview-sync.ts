import type { DesignConfig } from "./schema";

export const PREVIEW_CHANNEL_NAME = "design-md-live-preview";

export type PreviewMessage =
  | { type: "request-config" }
  | { type: "config"; config: DesignConfig };

