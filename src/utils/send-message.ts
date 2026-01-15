export const sendMessage = async (
	apiKey: string,
	chatId: number,
	message: string
) => {
	const url = `https://api.telegram.org/bot${apiKey}/sendMessage?chat_id=${chatId}&text=${message}`;
	await fetch(url);
};
