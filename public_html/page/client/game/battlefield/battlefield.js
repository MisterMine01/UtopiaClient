Game.Battle = new class {
    constructor() {
        this.game_data = Game.loadbattle.Starter;
        setInterval(function () {
            if (page_loaded === "client/game/battlefield") {
                var data = Game_data.BS_server.GetBattle();
                if (this.game_data !== data) {
                    console.log("changement");
                }
            }
        }, 100);
    }

    sending_battle(card_id, board_id, phase_id) {
        if (phase_id.include(this.game_data["Phase"]["PhaseType"])) {
            if (self.game_dict["Phase"]["PlayerId"] === Game_data.BS_server.PlayerId) {
                if (self.game_dict["Phase"]["PhaseUser"] === 0) {
                    Game_data.BS_server.SendBattle(null, JSON.stringify({"card": card_id, "board_id": board_id}));
                }
            } else if (this.game_data["Phase"]["PhaseUser"] === 1) {
                Game_data.BS_server.SendBattle(null, JSON.stringify({"card": card_id, "board_id": board_id}));
            }
        }
    }

    Hand(value) {
        sending_battle(value, 0, [0, 3, 5, 6]);
    }

    Board(value) {
        sending_battle(value, 2, [2, 4, 5, 6]);
    }
    Enemy(value) {
        sending_battle(value, 1, [1, 3, 4, 6]);
    }
    Pass() {
        Game_data.BS_server.SendBattle("Pass", null);
    }
}();