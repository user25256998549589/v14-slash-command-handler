import { Client, Collection, GatewayIntentBits, Partials } from "discord.js"
import config from "./src/config.js"
import { readdirSync } from "fs"
import moment from "moment"
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v10'

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember] });
let token = config.token

client.commands = new Collection()
client.slashcommands = new Collection()
client.commandaliases = new Collection()

const rest = new REST({ version: '10' }).setToken(token);

const log = x => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${x}`) };

//command-handler
// const commands = []
// readdirSync('./src/commands/normal').forEach(async file => {
//   const command = await import(`./src/commands/normal/${file}`);
//   if (command) {
//     client.commands.set(command.name, command)
//     commands.push(command.name, command);
//     if (command.aliases && Array.isArray(command.aliases)) {
//       command.aliases.forEach(alias => {
//         client.commandaliases.set(alias, command.name)
//       })
//     }
//   }
// })

//slash-command-handler
const slashcommands = [];
readdirSync('./src/commands/slash').forEach(async file => {
  let command = await import(`./src/commands/slash/${file}`);
  command = command.default
  slashcommands.push(command.data.toJSON());
  client.slashcommands.set(command.data.name, command);
})

client.on("ready", async () => {
  try {
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: slashcommands },
    );
  } catch (error) {
    console.error(error);
  }
  log(`${client.user.username} Aktif Edildi!`);
})

//event-handler
readdirSync('./src/events').forEach(async file => {
  let event = await import(`./src/events/${file}`);
  event = event.default
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
})

//nodejs-events
process.on("unhandledRejection", e => {
  console.log(e)
})
process.on("uncaughtException", e => {
  console.log(e)
})
process.on("uncaughtExceptionMonitor", e => {
  console.log(e)
})
//

client.login(token)
