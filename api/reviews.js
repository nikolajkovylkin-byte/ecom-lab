// Публичный эндпоинт отзывов.
//
// GET  — возвращает только отзывы со статусом "approved" (то, что видят посетители сайта).
// POST — принимает новый отзыв и сохраняет его со статусом "pending" (на проверке).
//        На сайте он появится только после того, как ты одобришь его на странице /admin/reviews.
//
// Хранилище — Vercel KV. Настройка та же, что описана в README:
// Vercel → Storage → Create Database → KV → подключить к проекту → передеплой.

import { kv } from "@vercel/kv";

const HASH_KEY = "reviews:data"; // id -> JSON строка отзыва
const ORDER_KEY = "reviews:order"; // список id, новые — в начале

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const ids = (await kv.lrange(ORDER_KEY, 0, 99)) || [];
      if (ids.length === 0) {
        res.status(200).json({ reviews: [] });
        return;
      }
      const raw = await kv.hmget(HASH_KEY, ...ids);
      const reviews = ids
        .map((id) => {
          const v = raw[id];
          if (!v) return null;
          const parsed = typeof v === "string" ? JSON.parse(v) : v;
          return parsed;
        })
        .filter((r) => r && r.status === "approved");
      res.status(200).json({ reviews });
    } catch (err) {
      res.status(500).json({ error: "kv not configured", detail: String(err) });
    }
    return;
  }

  if (req.method === "POST") {
    const { name, text } = req.body || {};
    if (!name || !text) {
      res.status(400).json({ error: "name and text are required" });
      return;
    }

    const id = makeId();
    const review = {
      id,
      name: String(name).slice(0, 60),
      text: String(text).slice(0, 600),
      time: new Date().toISOString(),
      status: "pending",
    };

    try {
      await kv.hset(HASH_KEY, { [id]: JSON.stringify(review) });
      await kv.lpush(ORDER_KEY, id);
      await kv.ltrim(ORDER_KEY, 0, 499);
    } catch (err) {
      res.status(500).json({ error: "kv not configured", detail: String(err) });
      return;
    }

    // необязательное уведомление в Telegram о новом отзыве на проверке
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (token && chatId) {
      try {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: `⭐ Новый отзыв на проверке\nИмя: ${review.name}\nТекст: ${review.text}\n\nОдобрить/отклонить: /admin/reviews на сайте`,
          }),
        });
      } catch {
        // необязательно
      }
    }

    res.status(200).json({ ok: true, pending: true });
    return;
  }

  res.status(405).json({ error: "method not allowed" });
}
