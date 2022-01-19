var PBattleApi = new class {
    constructor() {
        this.rcjs = new RcJsApi(JSON.parse(XMLsync("Utopia.json").responseText)["principal_battle"]);
    }

    ResearchServer(search) {
        return this.rcjs.getJsBySystem(
            "ResearchServer", {
                "Search": search,
            }
        );
    }
}();