const {
    Scenes: { BaseScene },
} = require("telegraf");

const decodeScene = new BaseScene("decodeScene");
decodeScene.enter((ctx) => ctx.reply("Enter an encrypted message..."));
decodeScene.on("text", async (ctx) => {
    await ctx.scene.enter("keyScene", {
        data: ctx.message.text,
        mode: "decode",
    });
});

module.exports = { decodeScene };
