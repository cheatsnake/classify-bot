const {
    Scenes: { BaseScene },
} = require("telegraf");

const encodeScene = new BaseScene("encodeScene");
encodeScene.enter((ctx) => ctx.reply("Enter your message..."));
encodeScene.on("text", async (ctx) => {
    await ctx.scene.enter("keyScene", {
        data: ctx.message.text,
        mode: "encode",
    });
});

module.exports = { encodeScene };
