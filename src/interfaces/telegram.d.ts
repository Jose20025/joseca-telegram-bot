// Core user identity.
export interface TelegramUser {
	id: number;
	is_bot: boolean;
	first_name: string;
	last_name?: string;
	username?: string;
	language_code?: string;
	is_premium?: boolean;
	added_to_attachment_menu?: boolean;
	can_join_groups?: boolean;
	can_read_all_group_messages?: boolean;
	supports_inline_queries?: boolean;
	can_connect_to_business?: boolean;
	has_main_web_app?: boolean;
}

// Public chat description.
export interface TelegramChat {
	id: number;
	type: 'private' | 'group' | 'supergroup' | 'channel';
	title?: string;
	username?: string;
	first_name?: string;
	last_name?: string;
	is_forum?: boolean;
	photo?: TelegramChatPhoto;
	active_usernames?: string[];
	emoji_status_custom_emoji_id?: string;
	bio?: string;
	has_private_forwards?: boolean;
	has_restricted_voice_and_video_messages?: boolean;
	join_to_send_messages?: boolean;
	join_by_request?: boolean;
	description?: string;
	invite_link?: string;
	pinned_message?: TelegramMessage;
	permissions?: TelegramChatPermissions;
	slow_mode_delay?: number;
	message_auto_delete_time?: number;
	has_aggressive_anti_spam_enabled?: boolean;
	has_hidden_members?: boolean;
	has_protected_content?: boolean;
	sticker_set_name?: string;
	can_set_sticker_set?: boolean;
	linked_chat_id?: number;
	location?: TelegramChatLocation;
}

export interface TelegramChatPhoto {
	small_file_id: string;
	small_file_unique_id: string;
	big_file_id: string;
	big_file_unique_id: string;
}

export interface TelegramChatPermissions {
	can_send_messages?: boolean;
	can_send_audios?: boolean;
	can_send_documents?: boolean;
	can_send_photos?: boolean;
	can_send_videos?: boolean;
	can_send_video_notes?: boolean;
	can_send_voice_notes?: boolean;
	can_send_polls?: boolean;
	can_send_other_messages?: boolean;
	can_add_web_page_previews?: boolean;
	can_change_info?: boolean;
	can_invite_users?: boolean;
	can_pin_messages?: boolean;
	can_manage_topics?: boolean;
}

export interface TelegramChatLocation {
	location: TelegramLocation;
	address: string;
}

// Message entities for formatting and special links.
export interface TelegramMessageEntity {
	type:
		| 'mention'
		| 'hashtag'
		| 'cashtag'
		| 'bot_command'
		| 'url'
		| 'email'
		| 'phone_number'
		| 'bold'
		| 'italic'
		| 'underline'
		| 'strikethrough'
		| 'spoiler'
		| 'blockquote'
		| 'expandable_blockquote'
		| 'code'
		| 'pre'
		| 'text_link'
		| 'text_mention'
		| 'custom_emoji';
	offset: number;
	length: number;
	url?: string;
	user?: TelegramUser;
	language?: string;
	custom_emoji_id?: string;
}

// Media primitives.
export interface TelegramPhotoSize {
	file_id: string;
	file_unique_id: string;
	width: number;
	height: number;
	file_size?: number;
}

export interface TelegramAnimation {
	file_id: string;
	file_unique_id: string;
	width: number;
	height: number;
	duration: number;
	thumbnail?: TelegramPhotoSize;
	file_name?: string;
	mime_type?: string;
	file_size?: number;
}

export interface TelegramAudio {
	file_id: string;
	file_unique_id: string;
	duration: number;
	performer?: string;
	title?: string;
	file_name?: string;
	mime_type?: string;
	file_size?: number;
	thumbnail?: TelegramPhotoSize;
}

export interface TelegramDocument {
	file_id: string;
	file_unique_id: string;
	thumbnail?: TelegramPhotoSize;
	file_name?: string;
	mime_type?: string;
	file_size?: number;
}

export interface TelegramVideo {
	file_id: string;
	file_unique_id: string;
	width: number;
	height: number;
	duration: number;
	thumbnail?: TelegramPhotoSize;
	file_name?: string;
	mime_type?: string;
	file_size?: number;
}

export interface TelegramVideoNote {
	file_id: string;
	file_unique_id: string;
	length: number;
	duration: number;
	thumbnail?: TelegramPhotoSize;
	file_size?: number;
}

export interface TelegramVoice {
	file_id: string;
	file_unique_id: string;
	duration: number;
	mime_type?: string;
	file_size?: number;
}

export interface TelegramContact {
	phone_number: string;
	first_name: string;
	last_name?: string;
	user_id?: number;
	vcard?: string;
}

export interface TelegramDice {
	emoji: string;
	value: number;
}

export interface TelegramPollOption {
	text: string;
	voter_count: number;
}

export interface TelegramPoll {
	id: string;
	question: string;
	options: TelegramPollOption[];
	total_voter_count: number;
	is_closed: boolean;
	is_anonymous: boolean;
	type: 'regular' | 'quiz';
	allows_multiple_answers: boolean;
	correct_option_id?: number;
	explanation?: string;
	explanation_entities?: TelegramMessageEntity[];
	open_period?: number;
	close_date?: number;
}

export interface TelegramLocation {
	latitude: number;
	longitude: number;
	horizontal_accuracy?: number;
	live_period?: number;
	heading?: number;
	proximity_alert_radius?: number;
}

export interface TelegramVenue {
	location: TelegramLocation;
	title: string;
	address: string;
	foursquare_id?: string;
	foursquare_type?: string;
	google_place_id?: string;
	google_place_type?: string;
}

export interface TelegramMessageAutoDeleteTimerChanged {
	message_auto_delete_time: number;
}

export interface TelegramInvoice {
	title: string;
	description: string;
	start_parameter: string;
	currency: string;
	total_amount: number;
}

export interface TelegramSuccessfulPayment {
	currency: string;
	total_amount: number;
	invoice_payload: string;
	shipping_option_id?: string;
	order_info?: TelegramOrderInfo;
	telegram_payment_charge_id: string;
	provider_payment_charge_id: string;
}

export interface TelegramOrderInfo {
	name?: string;
	phone_number?: string;
	email?: string;
	shipping_address?: TelegramShippingAddress;
}

export interface TelegramShippingAddress {
	country_code: string;
	state: string;
	city: string;
	street_line1: string;
	street_line2: string;
	post_code: string;
}

export interface TelegramProximityAlertTriggered {
	source: TelegramUser;
	target: TelegramUser;
	distance: number;
}

export interface TelegramVoiceChatScheduled {
	start_date: number;
}

export interface TelegramVoiceChatStarted {}

export interface TelegramVoiceChatEnded {
	duration: number;
}

export interface TelegramVoiceChatParticipantsInvited {
	users?: TelegramUser[];
}

export interface TelegramWebAppData {
	data: string;
	button_text: string;
}

export interface TelegramInlineKeyboardButton {
	text: string;
	url?: string;
	callback_data?: string;
	switch_inline_query?: string;
	switch_inline_query_current_chat?: string;
	callback_game?: Record<string, unknown>;
	pay?: boolean;
}

export interface TelegramInlineKeyboardMarkup {
	inline_keyboard: TelegramInlineKeyboardButton[][];
}

export interface TelegramMessageReactionUpdated {
	chat: TelegramChat;
	message_id: number;
	user?: TelegramUser;
	actor_chat?: TelegramChat;
	date: number;
	old_reaction?: TelegramReactionType[];
	new_reaction?: TelegramReactionType[];
}

export interface TelegramMessageReactionCountUpdated {
	chat: TelegramChat;
	message_id: number;
	date: number;
	reactions: TelegramReactionCount[];
}

export interface TelegramReactionCount {
	type: TelegramReactionType;
	count: number;
}

export interface TelegramReactionType {
	type: 'emoji' | 'custom_emoji' | 'unknown';
	emoji?: string;
	custom_emoji_id?: string;
}

// Main message per Bot API.
export interface TelegramMessage {
	message_id: number;
	message_thread_id?: number;
	from?: TelegramUser;
	sender_chat?: TelegramChat;
	sender_business_bot?: TelegramUser;
	date: number;
	business_connection_id?: string;
	chat: TelegramChat;
	forward_from?: TelegramUser;
	forward_from_chat?: TelegramChat;
	forward_from_message_id?: number;
	forward_signature?: string;
	forward_sender_name?: string;
	forward_date?: number;
	is_topic_message?: boolean;
	is_automatic_forward?: boolean;
	reply_to_message?: TelegramMessage;
	external_reply?: unknown;
	quote?: unknown;
	reply_to_story?: unknown;
	via_bot?: TelegramUser;
	edit_date?: number;
	has_protected_content?: boolean;
	media_group_id?: string;
	author_signature?: string;
	text?: string;
	entities?: TelegramMessageEntity[];
	link_preview_options?: TelegramLinkPreviewOptions;
	caption?: string;
	caption_entities?: TelegramMessageEntity[];
	has_media_spoiler?: boolean;
	photo?: TelegramPhotoSize[];
	animation?: TelegramAnimation;
	audio?: TelegramAudio;
	document?: TelegramDocument;
	video?: TelegramVideo;
	video_note?: TelegramVideoNote;
	voice?: TelegramVoice;
	contact?: TelegramContact;
	dice?: TelegramDice;
	game?: unknown;
	poll?: TelegramPoll;
	venue?: TelegramVenue;
	location?: TelegramLocation;
	new_chat_members?: TelegramUser[];
	left_chat_member?: TelegramUser;
	new_chat_title?: string;
	new_chat_photo?: TelegramPhotoSize[];
	delete_chat_photo?: boolean;
	group_chat_created?: boolean;
	supergroup_chat_created?: boolean;
	channel_chat_created?: boolean;
	message_auto_delete_timer_changed?: TelegramMessageAutoDeleteTimerChanged;
	migrate_to_chat_id?: number;
	migrate_from_chat_id?: number;
	pinned_message?: TelegramMessage;
	invoice?: TelegramInvoice;
	successful_payment?: TelegramSuccessfulPayment;
	users_shared?: TelegramUsersShared;
	chat_shared?: TelegramChatShared;
	connected_website?: string;
	write_access_allowed?: TelegramWriteAccessAllowed;
	passport_data?: TelegramPassportData;
	proximity_alert_triggered?: TelegramProximityAlertTriggered;
	boost_added?: TelegramChatBoostAdded;
	chat_background_set?: TelegramChatBackground;
	forum_topic_created?: TelegramForumTopicCreated;
	forum_topic_edited?: TelegramForumTopicEdited;
	forum_topic_closed?: TelegramForumTopicClosed;
	forum_topic_reopened?: TelegramForumTopicReopened;
	general_forum_topic_hidden?: TelegramGeneralForumTopicHidden;
	general_forum_topic_unhidden?: TelegramGeneralForumTopicUnhidden;
	giveaway?: TelegramGiveaway;
	giveaway_winners?: TelegramGiveawayWinners;
	giveaway_completed?: TelegramGiveawayCompleted;
	video_chat_scheduled?: TelegramVoiceChatScheduled;
	video_chat_started?: TelegramVoiceChatStarted;
	video_chat_ended?: TelegramVoiceChatEnded;
	video_chat_participants_invited?: TelegramVoiceChatParticipantsInvited;
	web_app_data?: TelegramWebAppData;
	reply_markup?: TelegramInlineKeyboardMarkup;
}

export interface TelegramLinkPreviewOptions {
	is_disabled?: boolean;
	url?: string;
	prefer_small_media?: boolean;
	prefer_large_media?: boolean;
	show_above_text?: boolean;
}

export interface TelegramUsersShared {
	request_id: number;
	users: TelegramUser[];
}

export interface TelegramChatShared {
	request_id: number;
	chat_id: number;
}

export interface TelegramWriteAccessAllowed {
	from_request?: boolean;
	web_app_name?: string;
	from_attachment_menu?: boolean;
}

export interface TelegramPassportData {
	data: unknown[];
	credentials: unknown;
}

export interface TelegramChatBoostAdded {
	boost_count: number;
}

export interface TelegramChatBackground {
	type: string;
}

export interface TelegramForumTopicCreated {
	name: string;
	icon_color?: number;
	icon_custom_emoji_id?: string;
}

export interface TelegramForumTopicEdited {
	name?: string;
	icon_custom_emoji_id?: string;
}

export interface TelegramForumTopicClosed {}

export interface TelegramForumTopicReopened {}

export interface TelegramGeneralForumTopicHidden {}

export interface TelegramGeneralForumTopicUnhidden {}

export interface TelegramGiveaway {
	prize_star_count: number;
	title?: string;
	description?: string;
}

export interface TelegramGiveawayWinners {
	prize_star_count: number;
	winners: TelegramUser[];
}

export interface TelegramGiveawayCompleted {
	prize_star_count: number;
	unclaimed_prize_count?: number;
}

// Update object (a.k.a. webhook payload).
export interface TelegramRequest {
	update_id: number;
	message?: TelegramMessage;
	edited_message?: TelegramMessage;
	channel_post?: TelegramMessage;
	edited_channel_post?: TelegramMessage;
	business_connection?: unknown;
	business_message?: TelegramMessage;
	edited_business_message?: TelegramMessage;
	deleted_business_messages?: unknown;
	message_reaction?: TelegramMessageReactionUpdated;
	message_reaction_count?: TelegramMessageReactionCountUpdated;
	inline_query?: unknown;
	chosen_inline_result?: unknown;
	callback_query?: unknown;
	shipping_query?: unknown;
	pre_checkout_query?: unknown;
	purchased_paid_media?: unknown;
	poll?: TelegramPoll;
	poll_answer?: unknown;
	my_chat_member?: unknown;
	chat_member?: unknown;
	chat_join_request?: unknown;
	chat_boost?: unknown;
	removed_chat_boost?: unknown;
}
