"use server";

// On failure the inputs are echoed back: React clears the form after every action.
export type SendState = {
  status: "idle" | "sent" | "invalid" | "error";
  values?: { name: string; email: string; message: string };
};

// Contact form -> Resend -> owner's Gmail. Callable by direct POST, so validate everything here.
export async function sendMessage(_prev: SendState, form: FormData): Promise<SendState> {
  // Honeypot: hidden field only bots fill in. Pretend success so they don't retry.
  if (form.get("website")) return { status: "sent" };

  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const message = String(form.get("message") ?? "").trim();
  const values = { name, email, message };
  if (!name || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200 || !message || message.length > 5000)
    return { status: "invalid", values };

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("sendMessage: RESEND_API_KEY is not set");
    return { status: "error", values };
  }

  // ponytail: no rate limit (serverless has no shared memory); honeypot + Resend quota cap abuse. Add Upstash/Turnstile if spam shows up.
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      // resend.dev sender only delivers to the Resend account's own address; verify a domain to change that.
      from: "Portfolio <onboarding@resend.dev>",
      to: ["mohammadariefhidayatullah@gmail.com"],
      reply_to: email,
      subject: `Portfolio: message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  });
  if (!res.ok) {
    console.error("sendMessage: Resend", res.status, await res.text());
    return { status: "error", values };
  }
  return { status: "sent" };
}

export type Comment = { id: number; name: string; message: string; created_at: string };
export type PostState = {
  status: "idle" | "posted" | "invalid" | "error";
  comments?: Comment[];
  values?: { name: string; message: string };
};

// Guestbook lives in Supabase table `guestbook`. RLS is on with no policies, so only
// this server (secret key) can read or write it; the owner deletes rows from the dashboard.
// Network errors and missing env come back as a 503 Response, so callers handle one failure path.
async function db(path: string, init?: RequestInit) {
  const { SUPABASE_URL: url, SUPABASE_SECRET_KEY: key } = process.env;
  if (!url || !key) return new Response("SUPABASE_URL / SUPABASE_SECRET_KEY not set", { status: 503 });
  try {
    return await fetch(`${url}/rest/v1/${path}`, {
      ...init,
      headers: { apikey: key, "Content-Type": "application/json", ...init?.headers },
      cache: "no-store",
    });
  } catch (e) {
    return new Response(String(e), { status: 503 });
  }
}

export async function listComments(): Promise<Comment[] | null> {
  const res = await db("guestbook?select=id,name,message,created_at&order=created_at.desc&limit=50");
  if (!res.ok) {
    console.error("listComments: Supabase", res.status, await res.text());
    return null;
  }
  return res.json();
}

export async function postComment(_prev: PostState, form: FormData): Promise<PostState> {
  if (form.get("website")) return { status: "posted" };

  const name = String(form.get("name") ?? "").trim();
  const message = String(form.get("message") ?? "").trim();
  if (!name || name.length > 50 || !message || message.length > 500)
    return { status: "invalid", values: { name, message } };

  // ponytail: no rate limit, comments publish instantly; add Turnstile if spam shows up.
  const res = await db("guestbook", { method: "POST", body: JSON.stringify({ name, message }) });
  if (!res.ok) {
    console.error("postComment: Supabase", res.status, await res.text());
    return { status: "error", values: { name, message } };
  }
  return { status: "posted", comments: (await listComments()) ?? undefined };
}
