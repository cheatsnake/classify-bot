require("dotenv/config");
const {
    Telegraf,
    session,
    Scenes: { Stage },
} = require("telegraf");
const { encodeScene } = require("./scenes/encode.scene");
const { decodeScene } = require("./scenes/decode.scene");
const { keyScene } = require("./scenes/key.scene");
const { keygenScene } = require("./scenes/keygen.scene");
const { help } = require("./messages/help.msg");

const stage = new Stage([encodeScene, decodeScene, keyScene, keygenScene]);

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(session());
bot.use(stage.middleware());

bot.start(async (ctx) => {
    await ctx.reply(
        `Hello, ${ctx.message.from.first_name}! I can encrypt and decrypt any text. Use commands to do something.`
    );
});

bot.hears("/encode", (ctx) => {
    ctx.scene.enter("encodeScene");
});

bot.hears("/decode", (ctx) => {
    ctx.scene.enter("decodeScene");
});

bot.hears("/keygen", (ctx) => {
    ctx.scene.enter("keygenScene");
});

bot.help((ctx) => ctx.reply(help));

bot.on("text", (ctx) =>
    ctx.reply("Please, use commands to make me understand you.")
);

module.exports = { bot };
