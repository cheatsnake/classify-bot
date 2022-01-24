const {
    Scenes: { BaseScene },
} = require("telegraf");
const { encodeData, decodeData } = require("../../api/classify.api");

const keyScene = new BaseScene("keyScene");
keyScene.enter((ctx) => ctx.reply("Good! Now enter a secret key..."));
keyScene.on("text", (ctx) => {
    ctx.session.data = ctx.scene.state.data;
    ctx.session.key = ctx.message.text;
    ctx.session.mode = ctx.scene.state.mode;
    return ctx.scene.leave();
});
keyScene.leave(async (ctx) => {
    if (ctx.session?.mode == "encode") {
        await encodeData(ctx.session?.data, ctx.session?.key).then((res) => {
            ctx.reply(`${res.data.result}`);
        });
    } else {
        await decodeData(ctx.session?.data, ctx.session?.key).then((res) => {
            ctx.reply(`Here is the result:`);
            ctx.reply(`${res.data.result}`);
        });
    }
});

module.exports = { keyScene };
