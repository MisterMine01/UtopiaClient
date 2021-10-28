function XMLsync(url) {
	const request = new XMLHttpRequest();
	request.open("POST", url, false);
	request.send(null);
	return request;
}