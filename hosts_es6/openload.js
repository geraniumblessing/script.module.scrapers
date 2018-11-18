let config = {
	priority : 1,
	language : ['en'],
	api_get_direct: 'http://localhost:8889/v1/openload/get'
};

host = async (libs, embed, listDirect, callback) => {
	try {

		let parser = await libs.client.request(embed.url, 'GET');
		let direct = await libs.client.request(config.api_get_direct, 'POST', {
			'data': parser
		});
		direct = JSON.parse(direct);

		if (direct.code) return;

		let result = {
    		'source': embed.source, 'quality': embed.qual, 
    		'language': embed.language, 'url': direct.direct, 'info': embed.info,
           	'direct': true, 'debridonly': embed.debridonly
        };

        listDirect.push(result);
        callback(result);
        return;
	} catch(e) {
		return;
	}
};
