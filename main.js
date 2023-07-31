const  {patchBrowserWindow} = require("./injector/browserwindow");
patchBrowserWindow();
require("./injector/bdMain").default;
//BetterDiscord.disableMediaKeys();