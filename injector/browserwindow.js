const electron =  require("electron");
const BetterDiscord =  require("./bdMain");

class BrowserWindow extends electron.BrowserWindow {
    constructor(options) {
        if (!options || !options.webPreferences || !options.webPreferences.preload || !options.title) return super(options); // eslint-disable-line constructor-super
        const originalPreload = options.webPreferences.preload;
        // options.webPreferences.preload = path.join(__dirname, "preload.js"); // don't override preload, kernel does it for us

        // Don't allow just "truthy" values
        const shouldBeTransparent = BetterDiscord.getSetting("window", "transparency");
        if (typeof(shouldBeTransparent) === "boolean" && shouldBeTransparent) {
            options.transparent = true;
            options.backgroundColor = "#00000000";
        }

        // Only affect frame if it is *explicitly* set
        // const shouldHaveFrame = BetterDiscord.getSetting("window", "frame");
        // if (typeof(shouldHaveFrame) === "boolean") options.frame = shouldHaveFrame;

        super(options);
        this.__originalPreload = originalPreload;
        BetterDiscord.setup(this);
    }
}

Object.assign(BrowserWindow, electron.BrowserWindow);

function patchBrowserWindow() {
    const electronPath = require.resolve("electron");
    delete require.cache[electronPath].exports; // If it didn't work, try to delete existing
    require.cache[electronPath].exports = {...electron, BrowserWindow}; // Try to assign again after deleting
}
module.exports = {patchBrowserWindow};