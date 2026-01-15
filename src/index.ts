import type { TelegramRequest } from './interfaces/telegram';
import { sendMessage } from './utils/send-message';

export default {
	async fetch(request, env, ctx) {
		if (request.method === 'POST') {
			const payload = (await request.json()) as TelegramRequest;

			if (payload.message) {
				const { chat, text } = payload.message;

				await sendMessage(
					env.API_KEY,
					chat.id,
					`Cooj, dijiste: ${text ?? '<no text>'}`
				);
			}
		}

		return new Response('Ok');
	},
} satisfies ExportedHandler<Env>;
