Launcher.battle = new class {
    constructor(get_id) {
        this.get_id = get_id;
        this.battle_interval = setInterval(function() {
            if (page_loaded === "launcher/battle") {
                let value = PBattleApi.ResearchServer(document.getElementById("launcher.battle.new_server").value);
                if (value === undefined) {
                    return;
                }
                var already_created_value = [];
                let already_created = document.getElementById("launcher.battle.battle_list");
                for (let item of already_created.children) {
                    console.log(Object.keys(value).includes(item.id));
                    if (Object.keys(value).includes(item.id)) {
                        already_created_value.push(item.id);
                    } else {
                        console.log(item);
                        item.remove();
                    }
                }
                for (let item of Object.keys(value)) {
                    if (!already_created_value.includes(item)) {
                        document.getElementById("launcher.battle.battle_list").appendChild(function() {
                            var div = document.createElement("div");
                            div.id = item;
                            div.className = "launcher.battle.battle_list.battle_data";


                            var label = document.createElement("label");
                            label.innerHTML = item;
                            label.className = "launcher.battle.battle_list.battle_data.name";
                            div.appendChild(label);


                            var button1 = document.createElement("button");
                            button1.value = item;
                            button1.setAttribute("onclick", "Launcher.battle.set_server(this.value)");
                            button1.innerHTML = "use";
                            button1.className = "launcher.battle.battle_list.battle_data.use";
                            div.appendChild(button1);

                            return div;
                        }());
                    }
                }
            }
        }, 100);
    }

    set_server(battle_server) {
        value = PBattleApi.ResearchServer("")
        if (Object.keys(value).includes(battle_server)) {
            Launcher.save_launcher_data(battle_server);
        }
    }

}("IfBattleServer");