import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// A health probe must never be cached and must always run on the server: a
// cached/prerendered "ok" would keep reporting healthy after the DB has gone
// away. `force-dynamic` opts out of static optimization; `no-store` stops any
// CDN or browser from holding onto the result.
export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_STORE = { "Cache-Control": "no-store, no-cache, must-revalidate" } as const;

// Readiness probe: reports whether this instance can serve traffic *right now*,
// which for us means the database is reachable. (Liveness — "is the process
// up?" — is answered simply by this route responding at all.) A DB that hangs
// must not hang the probe, so the check is bounded by a short timeout.
const DB_TIMEOUT_MS = 2000;

export async function GET() {
  try {
    await Promise.race([
      query("SELECT 1 AS ok"),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`db check timed out after ${DB_TIMEOUT_MS}ms`)), DB_TIMEOUT_MS),
      ),
    ]);
    return NextResponse.json({ ok: true, db: "ok" }, { headers: NO_STORE });
  } catch (err) {
    console.error("Health check failed:", err);
    return NextResponse.json({ ok: false, db: "error" }, { status: 503, headers: NO_STORE });
  }
}
