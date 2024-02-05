const Discord = require("discord.js");
const { EmbedBuilder } = require('discord.js');
const axios = require("axios");
const bot = new Discord.Client({intents: 3276799});
//const config = require ("./config");
//require('dotenv').config();

const apexAPIKey = String(process.env.API);
const botToken = String(process.env.TOKEN);

bot.login(botToken);

bot.on("ready", async() => {
    console.log(`${bot.user.tag} est en ligne !`);
})

bot.on("messageCreate", async message => {
    if(message.content === "map" || message.content === "Map")
    {
        try{
        const mapRequest = await axios.get("https://api.mozambiquehe.re/maprotation?auth=" + apexAPIKey);
        const embedMap = new EmbedBuilder();
        let currentMap = String(mapRequest.data.current.map);
        let currentTimeLeft = String(mapRequest.data.current.remainingTimer);
        if(currentMap === "Storm Point")
        {
            embedMap.setTitle("Apex Map");
            embedMap.setThumbnail("https://media.discordapp.net/attachments/1029852440759111744/1203154591089426502/sp.png?ex=65d01008&is=65bd9b08&hm=4e56781582198718b5945c065af73c409ebce051c85e0f62d482386c236ea4ba&=&format=webp&quality=lossless&width=623&height=564")
            embedMap.setColor("#00FF00");
            embedMap.addFields(
                { name: "Map Actuelle : ", value: currentMap },
                { name: "Temps restant : ", value: currentTimeLeft }
            );
        }
        else if(currentMap === "Kings Canyon")
        {
            embedMap.setTitle("Apex Map");
            embedMap.setThumbnail("https://media.discordapp.net/attachments/1029852440759111744/1203154961832349776/kc.png?ex=65d01060&is=65bd9b60&hm=ee6e868e34dec36c26756ac02e35df45f77df69760e695a681ec424c3abdb58e&=&format=webp&quality=lossless&width=596&height=564")
            embedMap.setColor("#00FF00");
            embedMap.addFields(
                { name: "Map Actuelle : ", value: currentMap },
                { name: "Temps restant : ", value: currentTimeLeft }
            );
        }
        else if(currentMap === "Olympus")
        {
            embedMap.setTitle("Apex Map");
            embedMap.setThumbnail("https://media.discordapp.net/attachments/1029852440759111744/1203757691382800415/olympus.png?ex=65d241b6&is=65bfccb6&hm=b8bbcfb9a077a6b60fb2268042c8d7d49597cf5bdd38344529ae0f6387e0fb70&=&format=webp&quality=lossless&width=597&height=565")
            embedMap.setColor("#00FF00");
            embedMap.addFields(
                { name: "Map Actuelle : ", value: currentMap },
                { name: "Temps restant : ", value: currentTimeLeft }
            );
        }
        else if(currentMap === "World's Edge")
        {
            embedMap.setTitle("Apex Map");
            embedMap.setThumbnail("https://media.discordapp.net/attachments/1029852440759111744/1203154589650784346/we.png?ex=65d01007&is=65bd9b07&hm=88c989068f2a4630ec2c3a8898045380ebc5168f21106e9cf6a5fa1de03a6086&=&format=webp&quality=lossless&width=573&height=564")
            embedMap.setColor("#FF0000");
            embedMap.addFields(
                { name: "Map Actuelle : ", value: currentMap },
                { name: "Temps restant : ", value: currentTimeLeft }
            );
        }
        else if(currentMap === "Broken Moon")
        {
            embedMap.setTitle("Apex Map");
            embedMap.setThumbnail("https://media.discordapp.net/attachments/1029852440759111744/1203154590753751090/o.png?ex=65d01007&is=65bd9b07&hm=66b8f1ceb73eca4fcbc907ab1c8d3f600627091408f2dff76aeb8e2eaf722ec3&=&format=webp&quality=lossless&width=570&height=564")
            embedMap.setColor("#00FF00");
            embedMap.addFields(
                { name: "Map Actuelle : ", value: currentMap },
                { name: "Temps restant : ", value: currentTimeLeft }
            );
        }
        else
        {
            embedMap.setTitle("Apex Map");
            embedMap.setColor("#FF9000");
            embedMap.addFields(
                { name: "Map Actuelle : ", value: currentMap },
                { name: "Temps restant : ", value: currentTimeLeft }
            );
        }

        message.channel.send({embeds : [embedMap]});
        } catch (error) {
            message.reply("Problème API :(")
        }
    }

    else if(message.content.startsWith("player") || message.content.startsWith("Player"))
    {
        let splited = message.content.split('-');
        let name = splited[1];
        let platform = splited[2];

        try {
        const playerRequest = await axios.get("https://api.mozambiquehe.re/bridge?auth=" + apexAPIKey + "&player=" + name + "&platform=" + platform);
        
        const embedPlayer = new EmbedBuilder();
        let player = String(playerRequest.data.global.name);
        let platforme = String(playerRequest.data.global.platform);
        let level = String(playerRequest.data.global.level);
        let kills = String(playerRequest.data.total.specialEvent_kills.value);
        let damages = String(playerRequest.data.total.specialEvent_damage.value);
        let wins = String(playerRequest.data.total.specialEvent_wins.value);
        let image = String(playerRequest.data.legends.selected.ImgAssets.icon);
            
        embedPlayer.setTitle("Apex Player");
        embedPlayer.setThumbnail(image);
        embedPlayer.setColor("#0187FF");
        embedPlayer.addFields(
            { name: "Pseudo : ", value: player },
            { name: "Plateforme : ", value: platforme },
            { name: "Niveau : ", value: level },
            { name: "Kills : ", value: kills },
            { name: "Damages : ", value: damages },
            { name: "Wins : ", value: wins }
        );

        message.channel.send({embeds : [embedPlayer]});
        } catch (error) {
            message.reply("Données non trouvées :(")
        }
    }

    else if(message.content.startsWith("preda") || message.content.startsWith("Preda"))
    {
        let splited = message.content.split('-');
        let platform = splited[1];

        try {
        const predaRequest = await axios.get("https://api.mozambiquehe.re/predator?auth=" + apexAPIKey);
        const embedPreda = new EmbedBuilder();
        let predaPoints = String(predaRequest.data.RP[platform].val);
        let predaMasterTotal = String(predaRequest.data.RP[platform].totalMastersAndPreds);

        embedPreda.setTitle("Apex Preda");
        embedPreda.setThumbnail("https://media.discordapp.net/attachments/1029852440759111744/1203188876470915122/preda.png?ex=65d02ff6&is=65bdbaf6&hm=8fd59fa500d1825a4c9c074643eba0d1e1f6e0efd5c812f3a4f429d22d2bf781&=&format=webp&quality=lossless&width=585&height=565");
        embedPreda.setColor("#FF0000");
        embedPreda.addFields(
            { name: "Plateforme : ", value: platform },
            { name: "Seuille de Points : ", value: predaPoints },
            { name: "Nombre de Master et Preda : ", value: predaMasterTotal }
        );

        message.channel.send({embeds : [embedPreda]});
        } catch (error) {
            message.reply("Données non trouvées :(")
        }
    }

    else if(message.content === "craft" || message.content === "Craft")
    {
        try{
        const craftRequest = await axios.get("https://api.mozambiquehe.re/crafting?auth=" + apexAPIKey);
        const embedCraft1 = new EmbedBuilder();
        const embedCraft2 = new EmbedBuilder();
        const embedCraft3 = new EmbedBuilder();
        const embedCraft4 = new EmbedBuilder();
        const embedCraft5 = new EmbedBuilder();
        const embedCraft6 = new EmbedBuilder();
        let craftDay1 = craftRequest.data[0].bundleContent[0];
        let craftDay2 = craftRequest.data[0].bundleContent[1];
        let craftWeek1 = craftRequest.data[1].bundleContent[0];
        let craftWeek2 = craftRequest.data[1].bundleContent[1];
        let craftWeapon1 = craftRequest.data[2].bundleContent[0];
        let craftWeapon2 = craftRequest.data[3].bundleContent[0];        
        
        // Embed Daily Item 1
        embedCraft1.setTitle("Daily 1");
        embedCraft1.setThumbnail(craftDay1.itemType.asset)
        embedCraft1.setColor(craftDay1.itemType.rarityHex);
        embedCraft1.addFields(
            { name: "Item : ", value: String(craftDay1.itemType.name) },
            { name: "Cout : ", value: String(craftDay1.cost) }
        );

        // Embed Daily Item 2
        embedCraft2.setTitle("Daily 2");
        embedCraft2.setThumbnail(craftDay2.itemType.asset)
        embedCraft2.setColor(craftDay2.itemType.rarityHex);
        embedCraft2.addFields(
            { name: "Item : ", value: String(craftDay2.itemType.name) },
            { name: "Cout : ", value: String(craftDay2.cost) }
        );

        // Embed Weekly Item 1
        embedCraft3.setTitle("Weekly 1");
        embedCraft3.setThumbnail(craftWeek1.itemType.asset)
        embedCraft3.setColor(craftWeek1.itemType.rarityHex);
        embedCraft3.addFields(
            { name: "Item : ", value: String(craftWeek1.itemType.name) },
            { name: "Cout : ", value: String(craftWeek1.cost) }
        );

        // Embed Weekly Item 2
        embedCraft4.setTitle("Weekly 2");
        embedCraft4.setThumbnail(craftWeek2.itemType.asset)
        embedCraft4.setColor(craftWeek2.itemType.rarityHex);
        embedCraft4.addFields(
            { name: "Item : ", value: String(craftWeek2.itemType.name) },
            { name: "Cout : ", value: String(craftWeek2.cost) }
        );

        // Embed Weapon Item 1
        embedCraft5.setTitle("Weapon 1");
        embedCraft5.setThumbnail(craftWeapon1.itemType.asset)
        embedCraft5.setColor(craftWeapon1.itemType.rarityHex);
        embedCraft5.addFields(
            { name: "Item : ", value: String(craftWeapon1.itemType.name) },
            { name: "Cout : ", value: String(craftWeapon1.cost) }
        );

        // Embed Weapon Item 2
        embedCraft6.setTitle("Weapon 2");
        embedCraft6.setThumbnail(craftWeapon2.itemType.asset)
        embedCraft6.setColor(craftWeapon2.itemType.rarityHex);
        embedCraft6.addFields(
            { name: "Item : ", value: String(craftWeapon2.itemType.name) },
            { name: "Cout : ", value: String(craftWeapon2.cost) }
        );

        message.channel.send({embeds : [embedCraft1]});
        message.channel.send({embeds : [embedCraft2]});
        message.channel.send({embeds : [embedCraft3]});
        message.channel.send({embeds : [embedCraft4]});
        message.channel.send({embeds : [embedCraft5]});
        message.channel.send({embeds : [embedCraft6]});
        } catch (error) {
            message.reply("Problème API :(")
        }
    }

    else if(message.content === "help" || message.content === "Help")
    {
        message.reply("Les commandes existantes sont :\n- map\n- player-pseudo-plateforme\n- preda-plateforme\n- craft\n=> (plateforme parmi : PC,X1,PS4,SWITCH)");
    }

    else if(message.content === "bière" || message.content === "Bière")
    {
        message.reply("Rendez-vous à la casa d'Octane pour una cerveza !!!");
    }
})
