// Serverless-функция для Vercel (работает автоматически, если сайт задеплоен на Vercel —
// папка /api подхватывается платформой сама, без доп. настройки).
//
// Пересылает заявку с сайта в Telegram-чат через Telegram Bot API.
// Токен бота и ID чата хранятся в переменных окружения Vercel — они НЕ попадают
// в код сайта и не видны в браузере (в отличие от прямого вызова Telegram API с фронта).
//
// Настройка (бесплатно):
// 1. В Telegram у @BotFather создать бота командой /newbot — получишь TELEGRAM_BOT_TOKEN.
// 2. Написать своему новому боту любое сообщение (иначе он не сможет писать тебе).
// 3. Узнать свой chat_id: открыть https://api.telegram.org/bot<TOKEN>/getUpdates
//    после того как написал боту, и найти "chat":{"id": ...} — это TELEGRAM_CHAT_ID.
// 4. В настройках проекта на Vercel → Settings → Environment Variables добавить:
//    TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID.
// 5. Передеплоить проект, чтобы переменные подхватились.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method not allowed" });
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    res.status(500).json({
      error: "TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID не заданы в переменных окружения",
    });
    return;
  }

  try {
    const { name, phone, whatsapp, package: pkg, price } = req.body || {};

    if (!name || !phone) {
      res.status(400).json({ error: "name and phone are required" });
      return;
    }

    const text = [
      "🆕 Новая заявка с сайта",
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      whatsapp ? `WhatsApp: ${whatsapp}` : null,
      pkg ? `Пакет: ${pkg}` : null,
      price ? `Стоимость: ${price}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    if (!tgRes.ok) {
      const detail = await tgRes.text();
      res.status(502).json({ error: "telegram delivery failed", detail });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "unexpected error", detail: String(err) });
  }
}
