import { GoogleGenAI } from '@google/genai';
import { TelegramMessage } from './interfaces/telegram';

export class CommandHandler {
	private geminiAI: GoogleGenAI;

	constructor(
		private apiKey: string,
		private db: D1Database,
		geminiApiKey: string
	) {
		this.geminiAI = new GoogleGenAI({ apiKey: geminiApiKey });
		console.log('Gemini AI initialized');
	}

	private sendMessage = async (chatId: number, message: string) => {
		try {
			const url = `https://api.telegram.org/bot${this.apiKey}/sendMessage?chat_id=${chatId}&text=${message}`;
			await fetch(url);
		} catch (error) {
			console.error('Error al enviar mensaje:', error);
			throw error;
		}
	};

	async startCommand(message: TelegramMessage) {
		try {
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
		} catch (error) {
			console.error('Error en startCommand:', error);
			try {
				await this.sendMessage(
					message.chat.id,
					`Ocurrió un error inesperado al procesar el comando /start. Por favor, intenta de nuevo más tarde.`
				);
			} catch (sendError) {
				console.error('Error al enviar mensaje de error:', sendError);
			}
			return new Response('Error', { status: 500 });
		}
	}

	async eigthBallCommand(message: TelegramMessage) {
		try {
			const { chat, text } = message;

			const question = text?.replace('/8ball', '').trim();

			if (!question) {
				await this.sendMessage(
					chat.id,
					'Por favor, haz una pregunta después del comando /8ball.'
				);
				return new Response('Ok');
			}

			console.log('Consultando a Gemini...');
			console.log({ question });

			const response = await this.geminiAI.models.generateContent({
				model: 'gemini-2.5-flash',
				contents: [
					{
						role: 'model',
						parts: [
							{
								text: 'Eres una bola 8 mágica que responde de forma breve y concisa. Sin negritas. Evita el markdown. Todas las respuestas deben ser en español. Todo es jugando, no tomes en serio las preguntas. Selecciona aleatoriamente entre respuestas positivas o negativas, no neutras. Responde solo con la respuesta, complementando la pregunta, por ejemplo: ¿Soy inteligente? => No, no eres inteligente.',
							},
						],
					},
					{
						role: 'user',
						parts: [
							{
								text: question || 'Sin pregunta',
							},
						],
					},
				],
			});

			await this.sendMessage(
				chat.id,
				response.text || 'No tengo una respuesta en este momento.'
			);

			return new Response('Ok');
		} catch (error) {
			console.error('Error en eigthBallCommand:', error);
			try {
				await this.sendMessage(
					message.chat.id,
					`Ocurrió un error al consultar la bola 8 mágica. Por favor, intenta de nuevo más tarde.`
				);
			} catch (sendError) {
				console.error('Error al enviar mensaje de error:', sendError);
			}
			return new Response('Error', { status: 500 });
		}
	}
}
