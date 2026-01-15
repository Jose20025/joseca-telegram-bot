import { CommandHandler } from './command-handler';
import type { TelegramRequest } from './interfaces/telegram';

export default {
	async fetch(request, env, ctx) {
		if (request.method === 'POST') {
			const apiKey = env.API_KEY;
			const payload = (await request.json()) as TelegramRequest;

			if (payload.message) {
				const { text } = payload.message;

				const isCommand = text?.startsWith('/');

				if (isCommand) {
					const command = text?.split('/')[1].split(' ')[0];
					const commandHandler = new CommandHandler(
						apiKey,
						env.DB,
						env.GEMINI_API_KEY
					);

					console.log({ command });

					switch (command) {
						case 'start':
							await commandHandler.startCommand(payload.message);
							break;

						case '8ball':
							await commandHandler.eigthBallCommand(payload.message);
							break;

						default:
							break;
					}
				}
			}
		}

		return new Response('Ok');
	},
} satisfies ExportedHandler<Env>;
