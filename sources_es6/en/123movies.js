source = {
	priority: 1,
	language: ['en'],
	domains : ['123movies.as'],
	base_link : 'https://123movies.as',
	source_link : 'https://gomostream.com',
	decode_file: '/decoding_v2.php',
	grabber_file: '/get.php'
};

const xToken = (token, seeds) => {

	let xxToken = token.slice(parseInt(seeds[0]), parseInt(seeds[1]));
	xxToken = xToken.reverse();

	return xxToken.join('') + seeds[2] +seeds[3];
};

const getLink = async (libs, listHosts, infoMovie, listDirect, getDirect, callback, url, isTvshow=false) => {

	try {

		let parse = await libs.client.request(url);
		let iframe= parse.match(/\<iframe .+? src\=\"(.+?)\"/i);




		if (!iframe) {
			console.log('iframe', iframe);
			return;
		}

		let parseIframe = await libs.client.request(iframe);

		let token = parseIframe.match(/'var tc = \'(.+?)\''/i);
		let seeds = parseIframe.match(/_tsd_tsd\(s\) .+\.slice\((.+?),(.+?)\).+ return .+? \+ \"(.+?)\"\+\"(.+?)";/i);
		let pair = parseIframe.match(/\'type\': \'.+\',\s*\'(.+?)\': \'(.+?)\'/i);

		if (!token || !seeds || !pair) {
			console.log('token, seeds, pair', token, seeds, pair);
			return;
		}

		let headerToken = xToken(token, seeds);

		console.log('headerToken', headerToken)

		let headers = {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'x-token': headerToken
		};
		let body = {
			'tokenCode': token
		};
		let urlToken = source.source_link+source.decode_file;

		let response = await libs.client.request(urlToken, 'POST', body, headers);

		console.log('response', response);

		if (response) {

			for (let item in response) {
				if (item.indexOf('vidushare.com') != -1) {

					console.log('direct', item);
					getDirect(libs, listHosts, {
				      'source': '123movies', 'quality': 'HD', 'language': 'en', 'url': item, 
				      'info': '', direct: true, 'debridonly': false
				    }, listDirect, callback);
				}
			}
		}
		

		if (isTvshow) {

			let urlGrabber = source.source_link+source.grabber_file;
			let bodyGrabber = {
				'type': 'episode',
				'imd_id': infoMovie.imdb,
				'seasonsNo': infoMovie.season,
				'episodesNo': infoMovie.episode
			}; 
			bodyGrabber[pair[0]] = pair[1];

			let responseGrabber = await libs.client.request(urlGrabber, 'POST', bodyGrabber, headers);

			if (responseGrabber) {

				for (let item in responseGrabber) {

					getDirect(libs, listHosts, {
				      'source': '123movies', 'quality': item[label], 'language': 'en', 'url': item['file'], 
				      'info': '', direct: true, 'debridonly': false
				    }, listDirect, callback);
				}
			}
		}

		return;	 
	} catch(e) {
		console.log(String(e));
    	return;
	}
}




movie = async (libs, listHosts,  infoMovie, listDirect, getDirect, callback)  => {
  try {

  	let urlMovie = libs.cleantitle.geturl(infoMovie.title);
  	urlMovie = `${source.base_link}/movies/${urlMovie}-watch-online-free-123movies/`;

  	let parse = await libs.client.request(urlMovie);
  	let token = parse.match(/\/?watch-token=(.*?)/i);

  	if (!token) {
  		console.log('token', token);
  		return;
  	};

  	urlMovie = urlMovie + '?watch-token=' + token[1];

  	await getLink(libs, listHosts,  infoMovie, listDirect, getDirect, callback, urlMovie);
  	return;
  } catch(e) {
    console.log(String(e));
    return;
  }
};
tvshow = async (libs, listHosts, infoMovie, listDirect, getDirect, callback) => {

  try {

  	let urlMovie = libs.cleantitle.geturl(infoMovie.title);
  	urlMovie = `${source.base_link}/episodes/${urlMovie}-${infoMovie.season}x${infoMovie.episode}/`;

  	let parse = await libs.client.request(urlMovie);
  	let token = parse.match(/\/?watch-token=(.*?)/i);

  	if (!token) return;

  	urlMovie = urlMovie + '?watch-token=' + token[1];

  	await getLink(libs, listHosts,  infoMovie, listDirect, getDirect, callback, urlMovie);
    return;
  } catch(e) {
    console.log(String(e));
    return;
  }
};