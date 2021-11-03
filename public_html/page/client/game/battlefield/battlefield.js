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

    adding_card(div_id, name, click, class_id) {
        localforage.getItem("Utopia.DB.[" + Game_data.battle_name + "].img", function (err, value) {
            var img_data = value[Game_data.language][name];
            localforage.getItem("Utopia.DB.[" + Game_data.battle_name + "].Bdd", function (err, value) {
                var att_value = value["Card"][name]["att"];
                var def_value = value["Card"][name]["def"];

                document.getElementById(div_id).appendChild(function () {
                    var div = document.createElement("div");
                    div.className = class_id;
                    div.setAttribute("onclick", click);

                    var img = document.createElement("img");
                    img.src = "data:image/png;base64," + img_data;
                    div.appendChild(img);

                    var att = document.createElement("label");
                    att.innerHTML = att_value;
                    att.className = "card_div.att";
                    div.appendChild(att);

                    var def = document.createElement("label");
                    def.innerHTML = def_value;
                    def.className = "card_div.def";
                    div.appendChild(def);

                    return div;
                }());
            });
        });
    }

    change_card(card_id, att, def) {
        card_id.querySelector(".card_div\.att").contentHTML = att;
        card_id.querySelector(".card_div\.def").contentHTML = def;
    }

    reload_Board(board_name, data, onclick_function, card_class) {
        let child = document.getElementsById(board_name).children;
        for (var i = 0; i === data.length; i++) {
            if (i > child.length) {
                adding_card(board_name, data[i]["Id"],
                        onclick_function + "(" + i + ")", card_class); // NOT FINISHED
            }
            switch (data[i]["state"]) {
                case "Dead":
                    child[i].hidden = true;
                    break;
                case "Attack":
                    child[i].style.backgroundColor = "red";
                    break;
                case "onAttack":
                    child[i].style.backgroundColor = "yellow";
                    break;
                case "Alive":
                    child[i].hidden = false;
                    child[i].style.backgroundColor = "white";
                    break;
            }
            if (child[i].querySelector(".card_div\.att").contentHTML !== data[i]["att"] ||
                    child[i].querySelector(".card_div\.def").contentHTML !== data[i]["def"]) {
                change_card(child[i], data[i]["att"], data[i]["def"]);
            }
        }
        //Adding Board code
    }

    reload_battle(new_data) {
        reload_Board("user_battlefield", new_data[this.PlayerId], "Game.Battle.Board", "class");
        reload_Board("enemy_battlefield", new_data[this.EnnemyId], "Game.Battle.Enemy", "class");
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