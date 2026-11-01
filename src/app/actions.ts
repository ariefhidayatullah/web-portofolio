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
