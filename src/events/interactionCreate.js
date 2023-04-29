import { InteractionType, Events } from "discord.js"
import axios from "axios"
export default {
	name: 'interactionCreate',
	execute: async (interaction) => {

		console.log('====================================');
		console.log(interaction.type);
		console.log('====================================');
		let client = interaction.client;

		if (interaction.type == InteractionType.ApplicationCommand) {
			if (interaction.user.bot) return;
			try {
				const command = client.slashcommands.get(interaction.commandName)
				command.run(client, interaction)
			} catch {
				interaction.reply({ content: "Komut çalıştırılırken bir sorunla karşılaşıldı! Lütfen tekrar deneyin.", ephemeral: true })
			}
		}

		else if (interaction.type == InteractionType.MessageComponent) {
			console.log('====================================');
			console.log(interaction);
			console.log('====================================');

			if (interaction.values.length == 0) return

			const products = [
				{
					name: "1,000,000 Chog",
					description: "یک میلیون چوق",
					id: "1M",
					emoji: "956479936535879730",
					image: "http://ordakbot.ir/static/media/1M.ae2d1b4ae2c28ba4881e.png",
					price: 10000,
					additionalExplanation: false
				},
				{
					name: "2,000,000 Chog",
					description: "یک میلیون چوق",
					id: "2M",
					emoji: "956479936535879730",
					image: "https://cdn.discordapp.com/emojis/891018495205203968.webp?size=96&quality=lossless",
					price: 15000,
					additionalExplanation: false
				},
				{
					name: "3,000,000 Chog",
					description: "یک میلیون چوق",
					id: "3M",
					emoji: "956479936535879730",
					image: "https://cdn.discordapp.com/emojis/891018495205203968.webp?size=96&quality=lossless",
					price: 20000,
					additionalExplanation: false
				},
				{
					name: "10,000,000 Chog",
					description: "یک میلیون چوق",
					id: "10M",
					emoji: "956479936535879730",
					image: "https://cdn.discordapp.com/emojis/891018495205203968.webp?size=96&quality=lossless",
					price: 35000,
					additionalExplanation: false
				},
				{
					name: "20,000,000 Chog",
					description: "یک میلیون چوق",
					id: "20M",
					emoji: "956479936535879730",
					image: "https://cdn.discordapp.com/emojis/891018495205203968.webp?size=96&quality=lossless",
					price: 60000,
					additionalExplanation: false
				},
				{
					name: "30,000,000 Chog",
					description: "یک میلیون چوق",
					id: "30M",
					emoji: "956479936535879730",
					image: "https://cdn.discordapp.com/emojis/891018495205203968.webp?size=96&quality=lossless",
					price: 85000,
					additionalExplanation: false
				},
				{
					name: "50,000,000 Chog",
					description: "یک میلیون چوق",
					id: "50M",
					emoji: "956479936535879730",
					image: "https://cdn.discordapp.com/emojis/891018495205203968.webp?size=96&quality=lossless",
					price: 110000,
					additionalExplanation: false
				},
				{
					name: "100,000,000 Chog",
					description: "یک میلیون چوق",
					id: "100M",
					emoji: "956479936535879730",
					image: "https://cdn.discordapp.com/emojis/891018495205203968.webp?size=96&quality=lossless",
					price: 200000,
					additionalExplanation: false
				},
				{
					name: "200,000,000 Chog",
					description: "یک میلیون چوق",
					id: "200M",
					emoji: "956479936535879730",
					image: "https://cdn.discordapp.com/emojis/891018495205203968.webp?size=96&quality=lossless",
					price: 400000,
					additionalExplanation: false
				},

				{
					name: "VIP TIER 5",
					description: "یک میلیون چوق",
					id: "VIP5",
					emoji: "950004405757939733",
					image: "https://cdn.discordapp.com/emojis/891018495205203968.webp?size=96&quality=lossless",
					price: 25000,
					additionalExplanation: "(VIP + 5M + Role)"
				},
				{
					name: "VIP TIER 4",
					description: "یک میلیون چوق",
					id: "VIP4",
					emoji: "950004405757939733",
					image: "https://cdn.discordapp.com/emojis/891018495205203968.webp?size=96&quality=lossless",
					price: 20000,
					additionalExplanation: "(VIP + 3M + Role)"
				},
				{
					name: "VIP TIER 3",
					description: "یک میلیون چوق",
					id: "VIP3",
					emoji: "950004405757939733",
					image: "https://cdn.discordapp.com/emojis/891018495205203968.webp?size=96&quality=lossless",
					price: 15000,
					additionalExplanation: "(VIP + 1M + Role)"
				},
			]

			const selectedProduct = products.find((product) => product.id === interaction.values[0])
			if (!selectedProduct) return


			const config = {
				method: "POST",
				url: "http://localhost:3000/payment/create",
				data: {
					username: interaction.user.username,
					discord_id: interaction.user.id,
					chog: 0,
					product: selectedProduct.id
				}
			}

			const response = await axios.request(config)
			console.log('====================================');
			console.log(response);
			console.log('====================================');

			if (response.data.code != -1)
				return await interaction.editReply({ content: " مشکلی در خرید پیش آمده است", ephemeral: true })

		}
	}
}
