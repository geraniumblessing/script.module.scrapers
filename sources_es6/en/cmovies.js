source = {
	priority: 1,
	language: ['en'],
	domains : ['cmovieshd.net'],
	base_link : 'http://cmovieshd.net/',
  tv_link: 'https://cmovieshd.net/tv-series/',
  movie_link: 'https://cmovieshd.net/movie/',
	search_link : 'https://cmovieshd.net/search/?q='
};

const streamdor = async (libs, html, src, olod)  => {

  let episodeId = html.match(/https\:\/\/api\.streamdor\.co\/load_player\.html\?e\=([A-z0-9]+)/i);

  if (!episodeId) return;

  // let episodeId = html.match(/.*streamdor\.co\/video\/(\d+)/ig);

  // console.log(episodeId, 'episodeId');

  // if (!episodeId) return;

  // console.log('https://embed.streamdor.co/video/' + episodeId[0], 'linkemBed');

  // parserEpisode = await libs.client.request('https://embed.streamdor.co/video/' + episodeId[0], 'GET', {}, {'Referer': src});
  // parserEpisode = parserEpisode.match(/JuicyCodes\.Run\(([^\)]+)/i);
  // parserEpisode = parserEpisode.replace(/\"\s*\+\s*\"/ig, '');
  // parserEpisode = parserEpisode.replace(/[^A-Za-z0-9+\\/=]/i, '');
  // parserEpisode = libs.base64.decode(parserEpisode);
  // parserEpisode = libs.aes(parserEpisode);
  

  // qual = parserEpisode.match(/label:"(.*?)"/i);

  // if (qual) {qual = qual[0];}
  // else {qual = 'SD';}

  let qual = 'SD';

  let findEmbed = await libs.client.request('https://api.streamdor.co/episode/embed/'+episodeId[1], 'GET');

  if (!findEmbed) return false;

  findEmbed = JSON.parse(findEmbed);

  if (findEmbed['status'] == 0) return false;



  // let findEmbed = parserEpisode.match(/(https\:\/\/streamango\.com\/embed\/.*?)/i);

  console.log(findEmbed, 'findEmbed');

  if (findEmbed) {

    return detail = {
      'source': 'streamango.com', 'quality': qual, 'language': 'en', 'url': findEmbed['embed'], 
      'info': '', direct: false, 'debridonly': False
    };

  }

  if (olod) {
    return {
      'source': 'openload.co', 'quality': qual, 'language': 'en', 'url': findEmbed[0], 
      'info': '', direct: false, 'debridonly': False
    };
  }
  return false;

}

getSource = async (url) => {
  return;
};
movie = async (libs, infoMovie, listDirect, getDirect, callback)  => {
  try {

    let movieLink = '';
    let listLink = [];


    let searchLink = source.search_link + infoMovie.title + "+" +infoMovie.year;
    let parser = await libs.client.request(searchLink, 'GET', {}, {}, false, '', '', '', 'dom');

    if (!parser) return;

    let listItem = parser('a.ml-mask');


    listItem.each(function() {

      let title = parser(this).attr('title');

      if (title.toLowerCase() == infoMovie.title.toLowerCase() || title.toLowerCase() == infoMovie.title.toLowerCase() + " " + infoMovie.year) {
        movieLink = parse(this).attr('href');
      }
    });

    if (movieLink == '') return;

    parser = await libs.client.request(movieLink+"watch", 'GET', {}, {}, false, '' ,'' ,'' ,'dom');

    if (!parser) return;

    let listEps = parser('.btn-eps');

    listEps.each(function() {
        listLinks.push(parser(this).attr('href'));
    });

    let arrPromise = listLinks.map(async (item) => {

      let parserEmbed = await libs.client.request(item, 'GET');

      if (parseEmbed.match(/http.+:\/\/openload\.co\/embed\/.+\"/ig)) {

        let openloadLink = parseEmbed.match(/http.+:\/\/openload.co\/embed\/.+\"/ig); 
        if (openloadLink) {

          let embed = await streamdor(libs, trim(openloadLink[0]), item, true);
          if (embed) {

            getDirect(embed, listDirect, callback);
          }
        }
      } else {

        let embed = await streamdor(libs, parserEmbed, item, false);

        if(embed) {

          getDirect(embed, listDirect, callback);
        }
        
      }
    });
    await Promise.all(arrPromise);
    return;
  } catch(e) {
    console.log(String(e));
    return;
  }
};
tvshow = async (libs, infoMovie, listDirect, getDirect, callback) => {

  try {

    let tvshowLink = '';
    let episodeLink = [];

    let searchText = infoMovie.title + ' season ' + infoMovie.season;
    

    let parser = await libs.client.request(source.search_link+searchText, 'GET', {}, {}, false, '', '', '', 'dom');


    let listItem = parser('a.ml-mask');

    console.log(listItem.length, 'lengthItem');

    listItem.each(function() {
      
      const title = parser(this).attr('title');

      console.log(title, 'titleTvshow');

      if (title && title.toLowerCase().replace(/\W+/ig, '') == (infoMovie.title + " - season " + infoMovie.season).toLowerCase().replace(/\W+/ig, '')) {

      	console.log(title, 'titleAdd');
        tvshowLink = parser(this).attr('href');
      }
    });

    
    if (!tvshowLink) {
      console.log('not tvshow match'); 
      return;
    }

    let parserWatch = await libs.client.request(tvshowLink+'watch/', 'GET', {}, {}, false, '', '', '', 'dom');

    console.log(parserWatch);

    if (!parserWatch) {
      console.log('error when get link watch', tvshowLink);
      return;
    }
    let listEps = parserWatch('.btn-eps');

    console.log(listEps.length, 'lengthItemEps');

    listEps.each(function() {
      let eps = parserWatch(this).text();
      eps = eps.match(/episode *([0-9]+)/i);

      if (eps && eps[1] == infoMovie.episode)  {
        episodeLink.push(parserWatch(this).attr('href'));
      }
    });

    console.log(episodeLink, 'episodeLink');

    let arrPromise = episodeLink.map(async (item) => {

      console.log(item, 'embed');
      let parserEmbed = await libs.client.request(item, 'GET'); 

      if (parserEmbed.match(/http.+\:\/\/openload\.co\/embed\/.+\"/ig)) {

        let openloadLink = parserEmbed.match(/http.+\:\/\/openload.co\/embed\/.+\"/ig); 
        if (openloadLink) {

          console.log(openloadLink[0], 'parserEmbed');
          let embed = await streamdor(libs, trim(openloadLink[0]), item, true);
          if (embed) {

            getDirect(embed, listDirect, callback);
          }
        }
      } else {

        console.log('get embed');
        let embed = await streamdor(libs, parserEmbed, item, false);

        if(embed) {

          getDirect(embed, listDirect, callback);
        }
        
      }
    });
    await Promise.all(arrPromise);
    return;

  } catch(e) {
    console.log(String(e));
    return;
  }
};