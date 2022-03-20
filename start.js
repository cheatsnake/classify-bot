const { bot } = require("./bot/bot");

bot.launch({
    webhook: {
        domain: "https://classifybot.herokuapp.com/",
        port: process.env.PORT || 5000,
    },
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
