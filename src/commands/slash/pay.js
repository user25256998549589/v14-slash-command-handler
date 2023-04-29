import { EmbedBuilder, PermissionsBitField } from "discord.js"
import { SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } from "@discordjs/builders"
import numberSplit from "number-split"

export default {
    data: new SlashCommandBuilder()
        .setName("message")
        .setDescription("Pong!"),
    // komutu geliştirmek istersen guide: https://discordjs.guide/slash-commands/advanced-creation.html
    run: async (client, interaction) => {


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

        const select = new StringSelectMenuBuilder()
            .setCustomId('buymenu')
            .setPlaceholder('محصول مورد نظر خود را انتخاب کنید')
            .addOptions(
                products.map((product) => {
                    return {
                        label: product.name,
                        value: product.id,
                        description: `💵 ${numberSplit.numberSplit(product.price, 3)} Toman  ${product?.additionalExplanation ? `• \t${product.additionalExplanation}` : ""}`,
                        emoji: { id: product.emoji }
                    }
                })
            );


        const row = new ActionRowBuilder()
            .addComponents(select);

        const embed = new EmbedBuilder()
            .setAuthor({ name: "ORDAK SHOP", iconURL: "https://cdn.discordapp.com/attachments/854698075952119809/1101844186652758116/shopping-cart.png" })
            .setColor("#27a1a3")
            .setDescription(`\n\n> <:a:846458830019231794> **1.** محصول مورد نظرتونو از لیست زیر انتخاب کنید \n\n> <:a:846458831328116748> **2.** دکمه پرداخت رو بزنید و پرداخت کنید \n\n> <:a:846458829314457640> **3.** چوق شما به صورت اتومات واریز میشه \n\n اگر مشکلی در خرید پیش اومد یا چوقتون واریز نشد تیکت باز کنید .`)


        const channel = client.channels.cache.get('854698075952119809');
        const message = await channel.send({ embeds: [embed], components: [row] });
    }
};
