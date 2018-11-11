

let host = {
	priority : 1,
	language : ['en'],
	base_link : '',
	api_get_direct: 'http://localhost:8889/v1/openload/get'
};

host.host = async (embed, listDirect, callback) => {
	try {

		let parser = await client.request(embed, 'GET');
		let direct = await client.request(host.api_get_direct, 'POST', {
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

WmrBLZZdx2UN26Sq = host;