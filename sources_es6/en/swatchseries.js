source = {
	priority: 1,
	language: ['en'],
	domains : ['www1.swatchseries.to'],
	base_link : 'https://www1.swatchseries.to/',
	search_link : 'https://www1.swatchseries.to/show/search-shows-json/',
	search_link_2: 'http://www1.swatchseries.to/search/',
	tvshow_link: 'https://www1.swatchseries.to/serie/'
};

tvshow = async (libs, listHosts, infoMovie, listDirect, getDirect, callback) => {

  try {

    let tvshowLink = '';
    let episodeLink = '';

    let searchText = libs.cleantitle.geturl(infoMovie.title);
    

    let parser = await libs.client.request(source.search_link+searchText, 'GET');


    if (!parser || parser.length == 0) {
    	return;
    }

    for (let item in parser) {

    	let titleTvshow = item['label'];
    	titleTvshow 	= titleTvshow.replace(/\( *[0-9]+ *\)/i, '');
    	titleTvshow 	= titleTvshow.replace(/\( *[0-9]+ *\)/i, '');
    	titleTvshow		= titleTvshow.trim();

    	if (titleTvshow.toLowerCase() == infoMovie.title) {
    		tvshowLink = source.tvshow_link + item['seo_url'];
    		break;
    	}
    }


    if (!tvshowLink) return;


    let parseEpisode = await libs.client.request(tvshowLink, 'GET', {}, {}, false, '', '', '', 'dom');

    let listEpisode = parseEpisode('ul#listing_'+infoMovie.season+ ' li[itemprop=episode]');

    listEpisode.map(function() {

    	let episodeTvshow = parseEpisode(this).find(`meta`).attr('content');

    	if (episodeTvshow == infoMovie.episode) {

    		episodeLink = parseEpisode(this).find('a').attr('href');
    	}
    });

    if (!episodeLink) return;


    let parseEmbed = await libs.client.request(episodeLink, 'GET', {}, {}, false, '', '', '', 'dom');


    let listEmbed = parseEmbed('a.watchlink');

    listEmbed.map(function() {

    	let hrefEncode = parseEmbed(this).attr('href');
    	let hrefToken = hrefEncode.match(/\?r\=(.*)/i);

    	if (hrefToken) {
    		hrefToken = hrefToken[1];

    		let embed = libs.base64.decode(hrefToken);

    		if (embed) {

    			embed = {
			      'source': 'MyWatchSeries', 'quality': 'SD', 'language': 'en', 'url': embed, 
			      'info': '', direct: false, 'debridonly': false,
		    	};		
		    	getDirect(libs, listHosts, embed, listDirect, callback);
    		}
    	}
    });


    return;

  } catch(e) {
    console.log(String(e));
    return;
  }
};