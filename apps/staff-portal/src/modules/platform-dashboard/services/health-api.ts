import { apiClient } from "../../../app/api";

export interface HealthPayload {
  status: "ok" | "ready" | "live";
  database: {
    status: "not_configured" | "connected" | "disconnected" | "unhealthy";
    driver: string;
    latencyMs?: number;
    migrationStatus: "not_configured" | "pending" | "current" | "unknown";
  };
  uptimeSeconds: number;
  timestamp: string;
  version: string;
  environment: string;
}

/** Reads the platform health endpoint for the developer dashboard. */
export async function fetchPlatformHealth(): Promise<HealthPayload> {
  return apiClient.get<HealthPayload>("/health");
}
