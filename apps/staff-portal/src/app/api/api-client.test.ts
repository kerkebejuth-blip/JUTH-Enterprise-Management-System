import { afterEach, describe, expect, it, vi } from "vitest";

import { createApiClient } from "./api-client";

describe("enterprise API client", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("unwraps the approved response envelope", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(
        new Response(
          JSON.stringify({
            success: true,
            message: "Request completed successfully.",
            data: { status: "ok" },
          }),
          { status: 200 },
        ),
      );
    const client = createApiClient("http://localhost:3000/");

    await expect(client.get<{ status: string }>("/health")).resolves.toEqual({
      status: "ok",
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:3000/health",
      expect.objectContaining({
        headers: { Accept: "application/json" },
      }),
    );
  });

  it("turns enterprise error envelopes into safe client errors", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          success: false,
          message: "Request validation failed.",
          errorCode: "VALIDATION_ERROR",
          correlationId: "correlation-1",
          details: { field: "search" },
        }),
        { status: 400 },
      ),
    );
    const client = createApiClient("http://localhost:3000");

    await expect(client.get("/health")).rejects.toMatchObject({
      name: "ApiClientError",
      status: 400,
      errorCode: "VALIDATION_ERROR",
      correlationId: "correlation-1",
    });
  });
});
