Game.Battle = new class {
    constructor() {
        this.game_data = Game.loadbattle.Starter;
        this.PlayerId = Game_data.BS_server.PlayerId;
        Ennemyid = Object.keys(new_data);
        Ennemyid.splice(Ennemyid.indexOf(this.PlayerId), 1);
        this.EnnemyId = Ennemyid[0];
        setInterval(function () {
            if (page_loaded === "client/game/battlefield") {
                var data = Game_data.BS_server.GetBattle();
                if (JSON.stringify(this.game_data) !== JSON.stringify(data)) {
                    console.log("changement");
                }
            }
        }, 100);
    }
    
    reload_Board(board_name, data) {
        //Adding Board code
    }
    
    reload_battle(new_data) {
        reload_Board("user_battlefield", new_data[this.PlayerId]);
        reload_Board("enemy_battlefield", new_data[this.EnnemyId]);
        //adding hand and info
    }

    sending_battle(card_id, board_id, phase_id) {
        if (phase_id.include(this.game_data["Phase"]["PhaseType"])) {
            if (self.game_dict["Phase"]["PlayerId"] === this.PlayerId) {
                if (self.game_dict["Phase"]["PhaseUser"] === 0) {
                    Game_data.BS_server.SendBattle(null,
                        JSON.stringify({"card": card_id, "board_id": board_id}));
                }
            } else if (this.game_data["Phase"]["PhaseUser"] === 1) {
                Game_data.BS_server.SendBattle(null,
                        JSON.stringify({"card": card_id, "board_id": board_id}));
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