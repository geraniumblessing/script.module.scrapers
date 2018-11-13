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

  let episodeId = html.match(/.*streamdor\.co\/video\/(\d+)/ig);

  if (!episodeId) return;

  parserEpisode = await libs.client.request('https://embed.streamdor.co/video/' + episodeId[0], 'GET', {}, {'Referer': src});
  parserEpisode = parserEpisode.match(/JuicyCodes\.Run\(([^\)]+)/i);
  parserEpisode = parserEpisode.replace(/\"\s*\+\s*\"/ig, '');
  parserEpisode = parserEpisode.replace(/[^A-Za-z0-9+\\/=]/i, '');
  parserEpisode = base64.decode(parserEpisode);
  parserEpisode = aes(parserEpisode);
  

  qual = parserEpisode.match(/label:"(.*?)"/i);

  if (qual) {qual = qual[0];}
  else {qual = 'SD';}

  let findEmbed = parserEpisode.match(/(https\:\/\/streamango\.com\/embed\/.*?)/i);


  if (findEmbed) {

    return detail = {
      'source': 'streamango.com', 'quality': qual, 'language': 'en', 'url': findEmbed[0], 
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
    return;
  }
};
tvshow = async (libs, infoMovie, listDirect, getDirect, callback) => {

  try {

    let tvshowLink = '';
    let episodeLink = [];

    let searchText = infoMovie.title + ' season ' + infoMovie.season;
    

    let parser = await libs.client.request(source.search_link+searchText, 'GET', {}, {}, false, '', '', '', 'dom');


    let listItem = parser('.ml-item');

    console.log(listItem.length, 'lengthItem');

    listItem.each(function() {
      
      const title = parser(this).attr('title');

      console.log(title, 'titleTvshow');

      if (title && title.toLowerCase().replace(/\W+/ig, '') == (infoMovie.title + " - season " + infoMovie.season).toLowerCase().replace(/\W+/ig, '')) {

      	console.log(title, 'titleAdd');
        tvshowLink = parser(this).attr('href');
      }
    });

    console.log(listItem, 'listItem')



    if (!tvshowLink) console.log('not tvshow match'); return;

    parser = libs.client.request(tvshowLink+'watch', 'GET', {}, {}, false, '', '', '', 'dom');
    let listEps = parser('.btn-eps');

    console.log(listEps, 'lengthItemEps');

    listEps.each(function() {
      let eps = parser(this).text;
      eps = exps.match(/episode *([0-9]+)/i);

      if (eps && eps == infoMovie.episode)  {
        episodeLink.push(parser(this).attr('href'));
      }
    });

    console.log(episodeLink, 'episodeLink');

    let arrPromise = episodeLink.map(async function(item) {
      parserEmbed = await libs.client.request(item, 'GET'); 

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

  } catch(e) {
    console.log(String(e));
    return;
  }
};