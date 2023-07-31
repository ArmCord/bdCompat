require("./bdPreload.js")
const fs = require("fs")

window.addEventListener("DOMContentLoaded", (event) => {
    let script = document.createElement("script");
    script.textContent = fs.readFileSync(__dirname + "/" + "bdRenderer.js", "utf8");
    document.body.append(script);
})
