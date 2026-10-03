// pages/api/webhook.ts
import type { NextApiRequest, NextApiResponse } from 'next';

// 1. Define Basic TypeScript Types for Telegram Payloads
type TelegramMessage = {
  message_id: number;
  from: { id: number; username?: string };
  chat: { id: number; type: string };
  text?: string;
};

type TelegramUpdate = {
  update_id: number;
  message?: TelegramMessage;
};

// 2. Helper function to send a reply back to Telegram
async function sendMessage(chatId: number, text: string) {
  const token = process.env.bot_token;
  if (!token) throw new Error("TELEGRAM_BOT_TOKEN not found in env variables.");

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      // parse_mode: 'HTML', // Optional: Use HTML or MarkdownV2 formatting
    }),
  });
}

// 3. The main API Route Handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Validate request method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Next.js automatically parses JSON bodies, so req.body is already a JSON object
  const update = req.body as TelegramUpdate;

  // 4. Validate the incoming payload
  if (!update || !update.message) {
    // Return 200 to acknowledge the update even if unprocessable, otherwise Telegram will retry
    return res.status(200).json({ status: 'No message to process' });
  }

  const { chat, text } = update.message;

  try {
    // 5. CORE LOGIC: Process the message
    if (text) {
      if (text.startsWith('/start')) {
        await sendMessage(chat.id, "Welcome to the Next.js Agent! Send me your text to distribute.");
      } else if (text.toLowerCase().includes('hello')) {
        await sendMessage(chat.id, "Hi there! How can I help you?");
      } else {
        // Echo the message (basic test logic)
        await sendMessage(chat.id, `Received: "${text}"`);
      }
    } else {
      await sendMessage(chat.id, "I only understand text messages right now.");
    }

    // 6. Success Acknowledgment
    return res.status(200).json({ status: 'ok' });

  } catch (error) {
    console.error('Error processing message:', error);
    // Even if an error occurs, returning 200 stops Telegram from spamming retries
    return res.status(200).json({ status: 'error', error: String(error) });
  }
}
