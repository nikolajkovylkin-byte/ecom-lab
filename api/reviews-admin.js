// Закрытый эндпоинт для страницы модерации /admin/reviews.
// Требует заголовок x-admin-token, совпадающий с переменной окружения ADMIN_TOKEN.
// Без верного токена ничего не отдаёт.

import { kv } from "@vercel/kv";

const HASH_KEY = "reviews:data";
const ORDER_KEY = "reviews:order";

export default async function handler(req, res) {
  if (req.method !== "GET") {
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

  try {
    const ids = (await kv.lrange(ORDER_KEY, 0, 199)) || [];
    if (ids.length === 0) {
      res.status(200).json({ reviews: [] });
      return;
    }
    const raw = await kv.hmget(HASH_KEY, ...ids);
    const reviews = ids
      .map((id) => {
        const v = raw[id];
        if (!v) return null;
        return typeof v === "string" ? JSON.parse(v) : v;
      })
      .filter(Boolean);
    res.status(200).json({ reviews });
  } catch (err) {
    res.status(500).json({ error: "kv not configured", detail: String(err) });
  }
}
