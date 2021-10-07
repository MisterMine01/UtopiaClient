Game.deck.creator = new class {
	constructor() {
		this.deck = {};
	}
	
	create_deck() {
		var name = document.getElementById("client.deck.creator.deck_name").innerHTML;
		if (name=="") {
			return;
		}
		localforage.getItem("Utopia.[" + Game_data.battle_name+"].Deck", function(err, value) {
			if (value == null) {
				var data = {};
			} else {
				var data = value;
			}
			data[name] = this.deck;
			localforage.setItem("Utopia.[" + Game_data.battle_name+"].Deck", data);
		});
	}
	
	delete_card(name) {
		if (this.deck[name] == 1) {
			delete this.deck[name];
			document.getElementById(name).remove(); 
		} else {
			this.deck[name] -= 1
		}
		this.reload();
	}
	
	add_card(name) {
		if (name in this.deck) {
			this.deck[name] += 1;
		} else {
			this.deck[name] = 1;
			document.getElementById("client.deck.creator.deck").appendChild(function(that) {
				var div = document.createElement("div");
				div.id = name;
				div.className = "client.deck.creator.card_counter";
				
				var label = document.createElement("label");
				label.id = "[" + name + "].label";
				label.className = "client.deck.creator.card_counter.label";
				div.appendChild(label);
				
				that.create_card(name, name, "Game.deck.creator.delete_card('" + name + "')");
				
				return div;
			}(this));
		}
		this.reload();
	}
	
	reload() {
		for (let item in this.deck) {
			document.getElementById("[" + item + "].label").innerHTML = this.deck[item];
		}
	}
	
	create_card(div_id, name, click) {
		localforage.getItem("Utopia.DB.[" + Game_data.battle_name + "].img", function(err, value) {
			var img_data = value[Game_data.language][name];
			
			localforage.getItem("Utopia.DB.[" + Game_data.battle_name + "].Bdd", function(err, value) {
				var att_value = value["Card"][name]["att"];
				var def_value = value["Card"][name]["def"];
				
				document.getElementById(div_id).appendChild(function() {
					var div = document.createElement("div");
					div.className = "client.deck.creator.card";
					console.log(click);
					div.setAttribute("onclick", click);
				
					var img = document.createElement("img");
					img.src = "data:image/png;base64," + img_data;
					img.className = "client.deck.creator.card.img";
					div.appendChild(img);
				
					var att = document.createElement("label");
					att.innerHTML = att_value;
					att.className = "client.deck.creator.card.att";
					div.appendChild(att);
				
					var def = document.createElement("label");
					def.innerHTML = def_value;
					def.className = "client.deck.creator.card.def";
					div.appendChild(def);
				
					return div;
				}());
			});
		});	
	}
}();

localforage.getItem("Utopia.DB.[" + Game_data.battle_name + "].Bdd", function(err, value) {
	for (let id in value["Card"]) {
		Game.deck.creator.create_card("client.deck.creator.all_card", id, "Game.deck.creator.add_card('" + id + "')");
	}
});

