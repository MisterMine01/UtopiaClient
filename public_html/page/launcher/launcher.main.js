Launcher.main = new class {
    constructor() {
        this.launcher_interval = setInterval(function () {
            if (page_loaded === "launcher") {
                document.getElementById("launcher.battle_use").innerHTML = "Battle Server: " + Launcher.battle_use;
                document.getElementById("launcher.language_use").innerHTML = "Language: " + Launcher.language_use;
            }
        }, 100);
    }

    play() {
        if (Launcher.battle_use !== undefined) {
            if (Launcher.language_use !== undefined) {
                change_page("loading");
            }
        }
    }
}();