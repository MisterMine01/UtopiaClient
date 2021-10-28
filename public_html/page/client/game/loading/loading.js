Game.loadbattle = new class {
    constructor() {
        setInterval(function () {
            if (page_loaded === "client/game/loading") {
                if (Game.loadDeck.deck !== "") {
                    deck = Game.loadDeck.deck;
                    Game.loadDeck.deck = "";
                    Game.loadbattle.load_game("B1", deck);
                } else {
                    if (this.Starter !== undefined) {
                        change_page("client/game/battlefield");
                    }
                }
            }
        }, 100);
    }

    async load_game(battlefield_id, deck) {
        var deck_decoded = [];
        for (let item of Object.keys(deck)) {
            for (var i = 0; i < deck[item]; i++) {
                deck_decoded.push(item);
            }
        }
        var server = await localforage.getItem("Utopia.Launcher.server");
        var server = server[Game_data.battle_name];
        var client_token = await localforage.getItem("Client.Account")["Token"];
        Game_data.BS_server = new BattleSystemApi(server + "Battle/", battlefield_id, client_token);
        var Bdd_version = await localforage.getItem("Utopia.DB.[" + Game_data.battle_name + "].version");
        var data = Game_data.BS_server.Start(1, Bdd_version);
        if (data["System"] !== "Wait") {
            return;
        }
        do {
            data = Game_data.BS_server.WaitPlayer();
        } while (data["Error"] === "Wait");
        if (data.contains("Error")) {
            return;
        }
        this.Starter = Game_data.BS_server.SendDeck(deck_decoded);
    }
}();