import { GoogleGenAI, ThinkingLevel } from '@google/genai';
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
					'🎱 Por favor, haz una pregunta después del comando.'
				);
				return new Response('Ok');
			}

			const response = await this.geminiAI.models.generateContent({
				model: 'gemini-3-flash-preview',
				contents: [
					{
						role: 'user',
						parts: [{ text: question }],
					},
				],
				config: {
					temperature: 1.0, // Para máxima aleatoriedad en la bola 8
					maxOutputTokens: 60,
					thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
					systemInstruction:
						'Eres una bola 8 mágica. Responde breve, en español, sin negritas ni markdown. Responde solo con la respuesta complementando la pregunta de forma aleatoria (positiva o negativa, no neutra).',
				},
			});

			await this.sendMessage(
				chat.id,
				response.text || 'La bola está borrosa...'
			);
			return new Response('Ok');
		} catch (error: any) {
			console.error('Error:', error);
			// El SDK nuevo devuelve errores más limpios
			const isRateLimit = error.message?.includes('429');
			const msg = isRateLimit
				? 'Demasiadas preguntas. La bola 8 necesita descansar 1 min.'
				: 'Error mágico.';
			await this.sendMessage(message.chat.id, msg);
			return new Response('Error', { status: 500 });
		}
	}
}
