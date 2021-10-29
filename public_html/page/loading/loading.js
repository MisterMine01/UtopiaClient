async function Download(battle_server, language) {
    var server = await localforage.getItem("Utopia.Launcher.server");
    Game_data.Battle_server = new BattleApi(server[battle_server]);
    var server_version = Game_data.Battle_server.GetBddVersion()[0];
    if ((await localforage.getItem("Utopia.DB.[" + battle_server + "].version") !== server_version) ||
            ((await localforage.getItem("Utopia.DB.[" + battle_server + "].img"))[language] == null)) {
        var db = Game_data.Battle_server.GetBdd();
        localforage.setItem("Utopia.DB.[" + battle_server + "].Bdd", db);
        var db_image = [];
        db_image[language] = new Object();
        Object.keys(db["Card"]).forEach(function (value, index, array) {
            console.log(value);
            db_image[language][value] = Game_data.Battle_server.GetImage(value, language)["Image"];
        });

        var db_exist = await localforage.getItem("Utopia.DB.[" + battle_server + "].img");
        if (db_exist != null) {
            Object.keys(db_exist).forEach(function (value, index, array) {
                db_image[value] = db_exist[value];
            })
        }
        localforage.setItem("Utopia.DB.[" + battle_server + "].img", db_image);
        localforage.setItem("Utopia.DB.[" + battle_server + "].version", server_version);

    }
    Game_data.battle_name = Launcher.battle_use;
    Game_data.language = Launcher.language_use;
    change_page("client");
}
Download(Launcher.battle_use, Launcher.language_use);