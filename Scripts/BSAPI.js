class BattleSystemApi {
	constructor(Server) {
		this.rcjs = new RcJsApi(Server);
	}
	
	Start(BattleId, PlayerId, ClientVersion, BddVersion) {
		return this.rcjs.getJsBySystem(
			"Start",
			{
				"BattleId": BattleId,
				"PlayerId": PlayerId,
				"ClientVersion": ClientVersion,
				"BddVersion": BddVersion
			}
		);
	}
	WaitPlayer(BattleId, PlayerId) {
		return this.rcjs.getJsBySystem(
			"WaitPlayer",
			{
				"BattleId": BattleId,
				"PlayerId": PlayerId
			}
		);
	}
	SendDeck(BattleId, PlayerId, Deck) {
		return this.rcjs.getJsBySystem(
			"SendDeck",
			{
				"BattleId": BattleId,
				"PlayerId": PlayerId,
				"Deck": Deck
			}
		);
	}
	GetBattle(BattleId, PlayerId, System, CardId) {
		return this.rcjs.getJsBySystem(
			"GetBattle",
			{
				"BattleId": BattleId,
				"PlayerId": PlayerId
				"System": System,
				"CardId"; CardId
			}
		)
	}
	SendBattle(BattleId, PlayerId) {
		return this.rcjs.getJsBySystem(
			"SendBattle",
			{
				"BattleId": BattleId,
				"PlayerId": PlayerId
			}
		)
	}
}