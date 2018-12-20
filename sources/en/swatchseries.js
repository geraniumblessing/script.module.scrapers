

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
    var tvshowLink, episodeLink, searchText, parser, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, titleTvshow, parseEpisode, listEpisode, parseEmbed, listEmbed;

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
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 12;
            _iterator = parser[Symbol.iterator]();

          case 14:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 26;
              break;
            }

            item = _step.value;
            titleTvshow = item['label'];


            titleTvshow = titleTvshow.replace(/\( *[0-9]+ *\)/i, '');
            titleTvshow = titleTvshow.replace(/\( *[0-9]+ *\)/i, '');
            titleTvshow = titleTvshow.trim();

            if (!(titleTvshow.toLowerCase() == infoMovie.title.toLowerCase())) {
              _context.next = 23;
              break;
            }

            tvshowLink = source.tvshow_link + item['seo_url'];
            return _context.abrupt('break', 26);

          case 23:
            _iteratorNormalCompletion = true;
            _context.next = 14;
            break;

          case 26:
            _context.next = 32;
            break;

          case 28:
            _context.prev = 28;
            _context.t0 = _context['catch'](12);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 32:
            _context.prev = 32;
            _context.prev = 33;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 35:
            _context.prev = 35;

            if (!_didIteratorError) {
              _context.next = 38;
              break;
            }

            throw _iteratorError;

          case 38:
            return _context.finish(35);

          case 39:
            return _context.finish(32);

          case 40:
            if (tvshowLink) {
              _context.next = 42;
              break;
            }

            return _context.abrupt('return');

          case 42:
            _context.next = 44;
            return libs.client.request(tvshowLink, 'GET', {}, {}, false, '', '', '', 'dom');

          case 44:
            parseEpisode = _context.sent;
            listEpisode = parseEpisode('ul#listing_' + infoMovie.season + ' li[itemprop=episode]');


            listEpisode.map(function () {

              var episodeTvshow = parseEpisode(this).find('meta').attr('content');

              if (episodeTvshow == infoMovie.episode) {

                episodeLink = parseEpisode(this).find('a').attr('href');
              }
            });

            if (episodeLink) {
              _context.next = 49;
              break;
            }

            return _context.abrupt('return');

          case 49:
            _context.next = 51;
            return libs.client.request(episodeLink, 'GET', {}, {}, false, '', '', '', 'dom');

          case 51:
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

          case 57:
            _context.prev = 57;
            _context.t1 = _context['catch'](0);

            console.log(String(_context.t1));
            return _context.abrupt('return');

          case 61:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 57], [12, 28, 32, 40], [33,, 35, 39]]);
  }));

  return function tvshow(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();