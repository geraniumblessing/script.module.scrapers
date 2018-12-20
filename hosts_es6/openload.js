let config = {
	priority : 1,
	language : ['en'],
	api_get_direct: 'https://api.teatv.net/api/v2/get_opl'
};

host = async (libs, embed, listDirect, callback) => {
	try {


		let parser = await libs.client.request(embed.url, 'GET');

		let direct = await libs.client.request(config.api_get_direct, 'POST', {
			'data': parser,
			'token': libs.cryptoJs.MD5(parser + "teatv-openload").toString()
		});

		if (!direct) return;

		let result = {
    		'source': embed.source, 'quality': embed.qual, 
    		'language': embed.language, 'url': direct.data, 'info': embed.info,
           	'direct': true, 'debridonly': embed.debridonly
        };

        console.log(result);

        listDirect.push(result);
        callback(result);
        return;
	} catch(e) {
		return;
	}
};
