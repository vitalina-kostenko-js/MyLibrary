import { NextResponse } from "next/server";
import { z } from "zod";

import { supabaseServer } from "../../shared/lib/supabase";

const REGISTER_WINDOW_MS = 15 * 60 * 1000;
const REGISTER_MAX_PER_WINDOW = 10;

const registerAttempts = new Map<string, number[]>();

const registerBodySchema = z.object({
  name: z.string().max(200).optional(),
  email: z.email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  return request.headers.get("x-real-ip")?.trim() ?? "unknown";
}

function checkRegisterRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - REGISTER_WINDOW_MS;
  let timestamps = registerAttempts.get(ip) ?? [];
  timestamps = timestamps.filter((t) => t > windowStart);

  if (timestamps.length >= REGISTER_MAX_PER_WINDOW) {
    registerAttempts.set(ip, timestamps);
    return false;
  }

  timestamps.push(now);
  registerAttempts.set(ip, timestamps);
  return true;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (!checkRegisterRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many registration attempts. Try again later." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = registerBodySchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { error: first?.message ?? "Validation failed" },
      { status: 400 },
    );
  }

  const { name, email, password } = parsed.data;

  try {
    const { data, error } = await supabaseServer.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name: name?.trim() ?? "" },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ user: data.user });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Registration failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
