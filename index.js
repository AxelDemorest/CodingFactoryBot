// -----------------------
// Importation des modules
// -----------------------

const fs = require("fs");
const Discord = require("discord.js");
const config = require("./config/config.json");
const util = require('./utils/templates.js');
const database = require("./utils/database.js")

const client = new Discord.Client({ intents: Object.values(Discord.Intents.FLAGS), partials: ['MESSAGE', 'REACTION'] });

const commandFolders = fs.readdirSync("./commands"); // Il parcourt le dossier "commands" en lisant les enfants directs du dossier
const eventFolders = fs.readdirSync("./events"); // Il parcourt le dossier "events" en lisant les enfants directs du dossier

client.guildSettings = new Discord.Collection();
client.ownerVoices = new Discord.Collection();
client.commands = new Discord.Collection(); // On crée une nouvelle collection
client.categories = new Array(); // on crée un tableau des catégories qui extend de client
client.util = util;

// ---------------
// Command Handler
// ---------------

for (const folder of commandFolders) { // On parcourt les dossiers du dossier commands 
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith(".js")); // On lit les sous-dossiers et on filtre les fichiers qui termine par ".js"
    for (const file of commandFiles) { // On parcourt les sous dossiers
        const command = require(`./commands/${folder}/${file}`); // On require les fichiers dans les sous-dossiers
        client.commands.set(command.name, command); // Dans la collection, on set comme key le nom de la commande et comme valeur les infos de la commande

        if (command.category) { // Si la command.category existe
            if (!client.categories.includes(command.category)) client.categories.push(command.category) // Si la catégorie n'existe pas, on push dans le tableau le nom de la category
        }
    }
}

// ---------------
// Event Handler
// ---------------

for (const folder of eventFolders) { // On parcourt les dossiers du dossier events 
    const eventFiles = fs.readdirSync(`./events/${folder}`).filter(file => file.endsWith('.js')); // On lit les sous-dossiers et on filtre les fichiers qui termine par ".js"
    for (const file of eventFiles) { // On parcourt les sous dossiers
        const event = require(`./events/${folder}/${file}`); // On require les fichiers dans les sous-dossiers
        if (event.once) { // Si event.once = true
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }
}

// -----------------------
// Connexion à la database
// -----------------------

database.connexion(client);

client.login(config.token);
