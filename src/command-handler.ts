import { TelegramMessage } from './interfaces/telegram';

export class CommandHandler {
	constructor(private apiKey: string, private db: D1Database) {}

	private sendMessage = async (chatId: number, message: string) => {
		const url = `https://api.telegram.org/bot${this.apiKey}/sendMessage?chat_id=${chatId}&text=${message}`;
		await fetch(url);
	};

	async startCommand(message: TelegramMessage) {
		const { chat, from } = message;

		const { results } = await this.db
			.prepare('SELECT id FROM users WHERE id = ?')
			.bind(from!.id)
			.run();

		if (results.length) {
			await this.sendMessage(chat.id, `Que dice, ${from?.first_name}! `);

			return new Response('Ok');
		}

		const { success } = await this.db
			.prepare(
				'INSERT INTO users (id, first_name, username, created_at) VALUES (?, ?, ?, ?)'
			)
			.bind(
				from!.id,
				from!.first_name,
				from!.username,
				new Date().toUTCString()
			)
			.run();

		if (success) {
			await this.sendMessage(chat.id, `Bienvenido, ${from?.first_name}!`);
			await this.sendMessage(
				chat.id,
				'Soy un bot hecho por Joseca, un locango. Espero poder ayudarte pronto!'
			);
		} else {
			await this.sendMessage(
				chat.id,
				`Hubo un error al registrarte, ${from?.first_name}. Intenta de nuevo más tarde.`
			);
		}
	}
}
