Launcher.battle = new class {
	constructor(get_id) {
		this.get_id = get_id;
		this.battle_interval = setInterval(function() {
			localforage.getItem("Utopia.Launcher.server", function(err, value) {
				if (page_loaded == "launcher/battle") {
					var already_created_value = []
					let already_created = document.getElementById("launcher.battle.battle_list")
					for (let item of already_created.children) {
						if (Object.keys(value).includes(item.id)) {
							already_created_value.push(item.id)
						} else {
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
								button1.innerHTML = "use"
								button1.className = "launcher.battle.battle_list.battle_data.use";
								div.appendChild(button1)
								
								
								var button2 = document.createElement("button");
								button2.value = item;
								button2.setAttribute("onclick", "Launcher.battle.delete_server(this.value)");
								button2.innerHTML = "DELETE"
								button2.className = "launcher.battle.battle_list.battle_data.delete";
								div.appendChild(button2)
								return div
							}());
						}
					}
				}
			});
		}, 100);
	}
			
	add_battle_server(ip) {
		var that = this;
		return localforage.getItem("Utopia.Launcher.server", function(err, value) {
			if (value == null) {
				var data = {};
			} else {
				var data = value;
			}
			name = new RcJsApi(ip).getJsBySystem(that.get_id)["ServId"];
			if (!Object.keys(data).includes(name)) {
				data[name] = ip;
			}
			localforage.setItem("Utopia.Launcher.server", data);
		});
	}
			
	delete_server(battle_server) {
		localforage.getItem("Utopia.Launcher.server", function(err, value) {
			if (Object.keys(value).includes(battle_server)) {
				delete value[battle_server];
				localforage.setItem("Utopia.Launcher.server", value);
				if (Launcher.battle_use == battle_server) {
					battle_server = "null";
					Launcher.save_launcher_data(battle_server);
				}
			}
		});
	}
	
	get_all_battle_name(after_function) {
		localforage.getItem("Utopia.Launcher.server", function(err, value) {
			after_function(Object.keys(value));
		});
	}

	get_battle_server_ip(name, after_function) {
		localforage.getItem("Utopia.Launcher.server", function(err, value) {
			if (Object.keys(value).includes(name)) {
				after_function(value[name]);
			}
		});
	}
		
	set_server(battle_server) {
		localforage.getItem("Utopia.Launcher.server", function(err, value) {
			if (Object.keys(value).includes(battle_server)) {
				Launcher.save_launcher_data(battle_server);
			}
		});
	}
			
	addbutton() {
		this.add_battle_server(document.getElementById("launcher.battle.new_server").value)
		document.getElementById("launcher.battle.new_server").value = "";
	}			
}("IfBattleServer");