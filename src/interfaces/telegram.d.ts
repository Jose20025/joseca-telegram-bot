// Basic chat shape used by incoming messages.
export interface TelegramChat {
	id: number;
	[key: string]: unknown;
}

// Minimal message definition to cover current bot needs.
export interface TelegramMessage {
	chat: TelegramChat;
	text?: string;
	[key: string]: unknown;
}

type TelegramEntity = Record<string, unknown>;

export interface TelegramRequest {
	update_id: number;
	message?: TelegramMessage;
	edited_message?: TelegramMessage;
	channel_post?: TelegramMessage;
	edited_channel_post?: TelegramMessage;
	business_connection?: TelegramEntity;
	business_message?: TelegramMessage;
	edited_business_message?: TelegramMessage;
	deleted_business_messages?: TelegramEntity;
	message_reaction?: TelegramEntity;
	message_reaction_count?: TelegramEntity;
	inline_query?: TelegramEntity;
	chosen_inline_result?: TelegramEntity;
	callback_query?: TelegramEntity;
	shipping_query?: TelegramEntity;
	pre_checkout_query?: TelegramEntity;
	purchased_paid_media?: TelegramEntity;
	poll?: TelegramEntity;
	poll_answer?: TelegramEntity;
	my_chat_member?: TelegramEntity;
	chat_member?: TelegramEntity;
	chat_join_request?: TelegramEntity;
	chat_boost?: TelegramEntity;
	removed_chat_boost?: TelegramEntity;
}
