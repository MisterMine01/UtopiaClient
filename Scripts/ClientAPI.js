var ClientApi = new class {
	constructor() {
		this.rcjs = new RcJsApi("http://github/UtopiaPrincipaleServer/");
	}
	CreateAccount(username, passw) {
		return this.rcjs.getJsBySystem(
			"CreateAccount",
			{
				"Username": username,
				"Password": passw
			}
		);
	}
	AutoConnectAccount(username, Atoken) {
		return this.rcjs.getJsBySystem(
			"AutoConnectAccount",
			{
				"Username": username,
				"A-Token": Atoken
			}
		);
	}
	ConnectAccount(username, passw) {
		return this.rcjs.getJsBySystem(
			"ConnectAccount",
			{
				"Username": username,
				"Password": passw
			}
		);
	}
	IfPrincipalServer() {
		return this.rcjs.getJsBySystem(
			"IfPrincipalServer"
		)
	}
	Lang() {
		return this.rcjs.getJsBySystem(
			"Lang"
		)
	}
}();