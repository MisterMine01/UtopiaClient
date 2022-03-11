var PBattleApi = new class {
    constructor() {
        this.rcjs = new RcJsApi(JSON.parse(XMLsync("Utopia.json").responseText)["principal_server"] + "server/");
    }

    ResearchServer(search, userToken, Atoken) {
        return this.rcjs.getJsBySystem(
            "ResearchServer", {
                "Search": search,
                "userToken": userToken,
                "Atoken": Atoken
            }
        );
    }
}();