source = {
	priority: 1,
	language: ['en'],
	domains : ['ororo.tv'],
	base_link : 'https://ororo.tv',
  	moviesearch_link: 'moviesearch_link',
  	tvsearch_link: '/api/v2/shows',
	movie_link : '/api/v2/movies/',
	show_link: '/api/v2/shows/',
	episode_link: '/api/v2/episodes/',
	username: 'testappdaily2@gmail.com',
	password: 'huyenabcd'
};


getSource = async (libs, listHosts,  infoMovie, listDirect, getDirect, callback, url) => {

	try {


		let headers = {
   			'User-Agent': 'Incursion for Kodi',
   			'Authorization': `Basic ${libs.base64.encode(`${source.username}:${source.password}`)}`
   		};

   		let parse = await libs.client.request(url, 'GET', {}, headers);
   		parse = parse['url'];

   		getDirect(libs, listHosts, {
			'source': '123movies', 'quality': 'HD', 'language': 'en', 'url': parse, 
			'info': '', direct: true, 'debridonly': false
		}, listDirect, callback);
	} catch(e) {
		console.log(String(e));
    	return;
	}
};
movie = async (libs, listHosts,  infoMovie, listDirect, getDirect, callback)  => {
  try {

   	let url = source.base_link+source.moviesearch_link;
   	let urlCache = '';

   	let headers = {
   		'User-Agent': 'Incursion for Kodi',
   		'Authorization': `Basic ${libs.base64.encode(`${source.username}:${source.password}`)}`
   	};

   	let response = await libs.client.request(url, 'GET', {}, headers);
   	response = response['movies'];

   	for (let item in response) {

   		if ('tt'+item[1].replace(/[^[0-9]]/i, '') == infoMovie.imdb) {
   			urlCache = item[0];
   			break;
   		}
   	}


   	if (!urlCache) return;

   	await getSource(libs, listHosts,  infoMovie, listDirect, getDirect, callback, source.base_link+source.show_link+urlCache);

    return;
  } catch(e) {
    console.log(String(e));
    return;
  }
};
tvshow = async (libs, listHosts, infoMovie, listDirect, getDirect, callback) => {

  try {

  	let url = source.base_link+source.tvsearch_link;
   	let urlCache = '';
   	let urlEpisode = '';

   	let headers = {
   		'User-Agent': 'Incursion for Kodi',
   		'Authorization': `Basic ${libs.base64.encode(`${source.username}:${source.password}`)}`
   	};

   	let response = await libs.client.request(url, 'GET', {},  headers);
   	response = response['shows'];

   	for (let item in response) {

   		if ('tt'+item[1].replace(/[^[0-9]]/i, '') == infoMovie.imdb) {
   			urlCache = item[0];
   			break;
   		}
   	}


   	if (!urlCache) return;


   	urlCache = source.base_link+urlCache;

   	responseCache = await libs.client.request(urlCache, 'GET', headers);
   	responseCache = responseCache['episodes'];

   	for (let item in responseCache) {

   		let id = item['id'];
   		let seasonTvshow = item['season'];
   		let episodeTvshow = item['number'];

   		if (seasonTvshow == infoMovie.season && episodeTvshow == infoMovie.episode) {

   			urlEpisode = source.base_link+source.episode_link+id;
   			break;
   		}
 
   	}

   	if (urlEpisode) return;

   	await getSource(libs, listHosts,  infoMovie, listDirect, getDirect, callback, source.base_link+urlEpisode);


    return;

  } catch(e) {
    console.log(String(e));
    return;
  }
};