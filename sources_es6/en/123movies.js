source = {
	priority: 1,
	language: ['en'],
	domains : ['123movies.as'],
	base_link : 'https://123movies.as',
	source_link : 'https://gomostream.com',
	decode_file: '/decoding_v3.php',
	grabber_file: '/get.php'
};


// function _tsd_tsd_ds(s) { 
// 	var _97x65m = s;var _83Mxx179 = _97x65m.slice(5,11);var _146hx20 = _93x580G(_83Mxx179);            var _1x61I = _e60xe8(_146hx20); return _36Jx73(_1x61I) + "11"+"587708";           
// }           
// function _93x580G(s){return s.split("");}function _e60xe8(r){return  r.reverse();}function _36Jx73(n){return n.join("");}


const xToken = (token, seeds) => {

	let xxToken = token.slice(parseInt(seeds[0]), parseInt(seeds[1]));
	xxToken = xToken.reverse();

	return xxToken.join('') + seeds[2] +seeds[3];
};

const getLink = async (libs, listHosts, infoMovie, listDirect, getDirect, callback, url, isTvshow=false) => {

	try {

		let parse = await libs.client.request(url, 'GET', {}, {}, false, '', '', '', 'dom');
		let iframe= parse('div.videoPlayer iframe').attr('src');

		let parseIframe = await libs.client.request(iframe, 'GET');

		let token = parseIframe.match(/var *tc *\= *\'(.+?)\'/i);
		let tokenCode = parseIframe.match(/\"\_token\" *\: *\"([^\"]+)/i);
		let seeds = parseIframe.match(/_tsd_tsd_ds\(s\) .+\.slice\((.+?),(.+?)\).+ return .+? \+ \"(.+?)\"\+\"(.+?)";/i);
		// let seeds = parseIframe.match(/_tsd_tsd_ds\(s\) .+\.slice\((.+?),(.+?)\).+ return .+? \+ \"(.+?)\"\+\"(.+?)";/i);
		// let pair = parseIframe.match(/\'type\': \'.+\',\s*\'(.+?)\': \'(.+?)\'/i);

		if (!token || !tokenCode || !seeds) {
			console.log('token1', token);
			console.log('tokenCode', tokenCode);
			console.log('seeds', seeds);
			return;
		}


		token = token[1];
		tokenCode = tokenCode[1];

		console.log('token', token, tokenCode, seeds[3], seeds[4]);


		const _93x580G = (s) => {return s.split("");}
		const _e60xe8 = (r) => {
			return  r.reverse();
		}
		const  _36Jx73 = (n) => {return n.join("");}

		const _tsd_tsd_ds = (s) => { 
			var _97x65m = s;
			var _83Mxx179 = _97x65m.slice(seeds[1],seeds[2]);
			var _146hx20 = _93x580G(_83Mxx179);            
			var _1x61I = _e60xe8(_146hx20); 
			return _36Jx73(_1x61I) + seeds[3]+seeds[4];           
		}

		// let headerToken = xToken(token, seeds);

		// console.log('headerToken', headerToken)

		let headers = {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'x-token': _tsd_tsd_ds(token)
		};
		let body = {
			'tokenCode': token,
			'_token': tokenCode
		};
		let urlToken = source.source_link+source.decode_file;

		let response = await libs.client.request(urlToken, 'POST', body, headers, true, iframe, '', '', '', 50000);

		console.log('response', response);

		if (response) {

			for (let item of response) {

				if (item) {

					if (item.indexOf('googleusercontent') != -1 || item.indexOf('gomostream') != -1) {

						console.log('direct', item);
						getDirect(libs, listHosts, {
					      'source': '123movies', 'quality': 'HD', 'language': 'en', 'url': item, 
					      'info': '', direct: true, 'debridonly': false
					    }, listDirect, callback);
					} else {
						getDirect(libs, listHosts, {
					      'source': '123movies', 'quality': 'HD', 'language': 'en', 'url': item, 
					      'info': '', direct: false, 'debridonly': false
					    }, listDirect, callback);
					}
				}
				
			}
		}
		

		// if (isTvshow) {

		// 	let urlGrabber = source.source_link+source.grabber_file;
		// 	let bodyGrabber = {
		// 		'type': 'episode',
		// 		'imd_id': infoMovie.imdb,
		// 		'seasonsNo': infoMovie.season,
		// 		'episodesNo': infoMovie.episode
		// 	}; 
		// 	bodyGrabber[pair[0]] = pair[1];

		// 	let responseGrabber = await libs.client.request(urlGrabber, 'POST', bodyGrabber, headers);

		// 	if (responseGrabber) {

		// 		for (let item in responseGrabber) {

		// 			getDirect(libs, listHosts, {
		// 		      'source': '123movies', 'quality': item[label], 'language': 'en', 'url': item['file'], 
		// 		      'info': '', direct: true, 'debridonly': false
		// 		    }, listDirect, callback);
		// 		}
		// 	}
		// }

		return;	 
	} catch(e) {
		console.log(String(e));
    	return;
	}
}




movie = async (libs, listHosts,  infoMovie, listDirect, getDirect, callback)  => {
  try {

  	let urlMovie = libs.cleantitle.geturl(infoMovie.title);
  	// urlMovie = `${source.base_link}/movies/${urlMovie}-watch-online-free-123movies/`;
  	urlMovie = `${source.base_link}/movie/${urlMovie}`;

  	let parse = await libs.client.request(urlMovie, 'GET', {}, {}, false, '', '', '', 'dom');
  	let hrefMovie = parse('div.ds_seriesplay.dsclear a').attr('href');

  	await getLink(libs, listHosts,  infoMovie, listDirect, getDirect, callback, hrefMovie);
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

  	let parse = await libs.client.request(urlMovie, 'GET', {}, {}, false, '', '', '', 'dom');
  	let hrefMovie = parse('div.ds_seriesplay.dsclear a').attr('href');

  	await getLink(libs, listHosts,  infoMovie, listDirect, getDirect, callback, hrefMovie);
    return;
  } catch(e) {
    console.log(String(e));
    return;
  }
};