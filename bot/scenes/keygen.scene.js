const {
    Scenes: { BaseScene },
} = require("telegraf");
const { keygen } = require("../../api/classify.api");

const keygenScene = new BaseScene("keygenScene");
keygenScene.enter((ctx) =>
    ctx.reply("How long is the key you want me to generate?")
);
keygenScene.on("text", async (ctx) => {
    const length = Number(ctx.message.text);
    ctx.session.keyLength = length && length > 3 ? length : 16;
    return ctx.scene.leave();
});

keygenScene.leave(async (ctx) => {
    await keygen(Number(ctx.session?.keyLength)).then((res) => {
        ctx.reply(`${res.data.key}`);
    });
});

module.exports = { keygenScene };
