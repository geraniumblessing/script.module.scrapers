

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

source = {
  priority: 1,
  language: ['en'],
  domains: ['www1.swatchseries.to'],
  base_link: 'https://www1.swatchseries.to/',
  search_link: 'https://www1.swatchseries.to/show/search-shows-json/',
  search_link_2: 'http://www1.swatchseries.to/search/',
  tvshow_link: 'https://www1.swatchseries.to/serie/'
};

tvshow = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(libs, listHosts, infoMovie, listDirect, getDirect, callback) {
    var tvshowLink, episodeLink, searchText, parser, item, titleTvshow, parseEpisode, listEpisode, parseEmbed, listEmbed;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            tvshowLink = '';
            episodeLink = '';
            searchText = libs.cleantitle.geturl(infoMovie.title);
            _context.next = 6;
            return libs.client.request(source.search_link + searchText, 'GET');

          case 6:
            parser = _context.sent;

            if (!(!parser || parser.length == 0)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt('return');

          case 9:
            _context.t0 = regeneratorRuntime.keys(parser);

          case 10:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 21;
              break;
            }

            item = _context.t1.value;
            titleTvshow = parser[item]['label'];


            titleTvshow = titleTvshow.replace(/\( *[0-9]+ *\)/i, '');
            titleTvshow = titleTvshow.replace(/\( *[0-9]+ *\)/i, '');
            titleTvshow = titleTvshow.trim();

            if (!(titleTvshow.toLowerCase() == infoMovie.title.toLowerCase())) {
              _context.next = 19;
              break;
            }

            tvshowLink = source.tvshow_link + parser[item]['seo_url'];
            return _context.abrupt('break', 21);

          case 19:
            _context.next = 10;
            break;

          case 21:
            if (tvshowLink) {
              _context.next = 23;
              break;
            }

            return _context.abrupt('return');

          case 23:
            _context.next = 25;
            return libs.client.request(tvshowLink, 'GET', {}, {}, false, '', '', '', 'dom');

          case 25:
            parseEpisode = _context.sent;
            listEpisode = parseEpisode('ul#listing_' + infoMovie.season + ' li[itemprop=episode]');


            listEpisode.map(function () {

              var episodeTvshow = parseEpisode(this).find('meta').attr('content');

              if (episodeTvshow == infoMovie.episode) {

                episodeLink = parseEpisode(this).find('a').attr('href');
              }
            });

            if (episodeLink) {
              _context.next = 30;
              break;
            }

            return _context.abrupt('return');

          case 30:
            _context.next = 32;
            return libs.client.request(episodeLink, 'GET', {}, {}, false, '', '', '', 'dom');

          case 32:
            parseEmbed = _context.sent;
            listEmbed = parseEmbed('a.watchlink');


            listEmbed.map(function () {

              var hrefEncode = parseEmbed(this).attr('href');
              var hrefToken = hrefEncode.match(/\?r\=(.*)/i);

              if (hrefToken) {
                hrefToken = hrefToken[1];

                var embed = libs.base64.decode(hrefToken);

                if (embed) {

                  embed = {
                    'source': 'MyWatchSeries', 'quality': 'SD', 'language': 'en', 'url': embed,
                    'info': '', direct: false, 'debridonly': false
                  };
                  getDirect(libs, listHosts, embed, listDirect, callback);
                }
              }
            });

            return _context.abrupt('return');

          case 38:
            _context.prev = 38;
            _context.t2 = _context['catch'](0);

            console.log(String(_context.t2));
            return _context.abrupt('return');

          case 42:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 38]]);
  }));

  return function tvshow(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();