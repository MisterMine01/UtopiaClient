Game.loadbattle = new class {
	constructor() {
		setInterval(function() {
			if (page_loaded == "client/game/loading") {
				if (Game.loadDeck.deck != "") {
					Game.loadbattle.load_game("B1", Game.loadDeck.deck);
					Game.loadDeck.deck = "";
				}
			}
		}, 100);
	}
	
	async load_game(battlefield_id, deck) {
		var server = await localforage.getItem("Utopia.Launcher.server");
		var server = server[Game_data.battle_name];
		Game_data.BS_server = new BattleSystemApi(server + "Battle/");
		var client_token = await localforage.getItem("Client.Account")["Token"];
		var Bdd_version = await localforage.getItem("Utopia.DB.["+Game_data.battle_name+"].version");
		var data = Game_data.BS_server.Start(battlefield_id, client_token, 1, Bdd_version);
		if (data["System"] != "Wait") {
			return;
		}
		do {
			data = Game_data.BS_server.WaitPlayer(battlefield_id, client_token);
		} while (data["Error"] == "Wait");
		if (data.contains("Error")) {
			return;
		}
		
		
		
}
}
Game.loadbattle.load_game()