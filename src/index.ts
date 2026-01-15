import type { TelegramRequest } from './interfaces/telegram';

export default {
	async fetch(request, env, ctx) {
		if (request.method === 'POST') {
			const payload = (await request.json()) as TelegramRequest;

			if (payload.message) {
				const { chat, text } = payload.message;

				const url = `https://api.telegram.org/bot${env.API_KEY}/sendMessage?chat_id=${chat.id}&text=${text}`;
				await fetch(url);
			}
		}

		return new Response('Ok');
	},
} satisfies ExportedHandler<Env>;
