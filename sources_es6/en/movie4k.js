source = {
	priority: 1,
	language: ['en'],
	domains : ['movie4k.is'],
	base_link : 'https://movie4k.is/',
	search_link : 'http://www.movie4k.is/?s='
};


getSource = async (url) => {
  return;
};



movie = async (libs, listHosts,  infoMovie, listDirect, getDirect, callback)  => {
  try {

    let movieLink = '';

    let searchLink = source.search_link + libs.cleantitle.geturl(infoMovie.title);

    let parser = await libs.client.request(searchLink, 'GET', {}, {}, false, '', '', '', 'dom');

    if (!parser) return;

    let listItem = parser('div.item');

    console.log(listItem.length, 'listItem');

    listItem.each(function() {

      let title = parser(this).find('div.fixyear h2').text();
      let year = parser(this).find('div.fixyear span.year').text();

      console.log(title.toLowerCase(), 'title');

      if (title.toLowerCase() == infoMovie.title.toLowerCase() || title.toLowerCase() == infoMovie.title.toLowerCase() + " " + infoMovie.year) {

      	if ( infoMovie.year == year) {
      		movieLink = parser(this).find('.boxinfo a').attr('href');
      	}
        
      }
    });


    if (movieLink == '') return;

    parser = await libs.client.request(movieLink, 'GET', {}, {}, false, '' ,'' ,'' ,'dom');

    if (!parser) return;

    let quality = parser('.calidad2').text();
    let iframe = parser('.movieplay iframe').attr('src');

    let embed = {
      'source': 'Movie4k - Openload', 'quality': quality, 'language': 'en', 'url': iframe, 
      'info': '', direct: false, 'debridonly': false,
    };

    getDirect(libs, listHosts, embed, listDirect, callback);
    return;
  } catch(e) {
    console.log(String(e));
    return;
  }
};