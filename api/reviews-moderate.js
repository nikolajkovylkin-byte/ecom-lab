// Одобрение/отклонение отзыва. Требует заголовок x-admin-token.
// body: { id, status } где status — "approved" или "rejected".

import { kv } from "@vercel/kv";

const HASH_KEY = "reviews:data";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method not allowed" });
    return;
  }

  const adminToken = process.env.ADMIN_TOKEN;
  const provided = req.headers["x-admin-token"];

  if (!adminToken) {
    res.status(500).json({ error: "ADMIN_TOKEN не задан в переменных окружения" });
    return;
  }
  if (!provided || provided !== adminToken) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }

  const { id, status } = req.body || {};
  if (!id || !["approved", "rejected"].includes(status)) {
    res.status(400).json({ error: "id and valid status ('approved' | 'rejected') are required" });
    return;
  }

  try {
    const raw = await kv.hget(HASH_KEY, id);
    if (!raw) {
      res.status(404).json({ error: "review not found" });
      return;
    }
    const review = typeof raw === "string" ? JSON.parse(raw) : raw;
    review.status = status;
    await kv.hset(HASH_KEY, { [id]: JSON.stringify(review) });
    res.status(200).json({ ok: true, review });
  } catch (err) {
    res.status(500).json({ error: "kv not configured", detail: String(err) });
  }
}
