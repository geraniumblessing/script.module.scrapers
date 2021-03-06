

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

source = {
  priority: 1,
  language: ['en'],
  domains: ['cmovieshd.net'],
  base_link: 'http://cmovieshd.net/',
  tv_link: 'https://cmovieshd.net/tv-series/',
  movie_link: 'https://cmovieshd.net/movie/',
  search_link: 'https://cmovieshd.net/search/?q='
};

var streamdor = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(libs, html, src, olod) {
    var episodeId, qual, findEmbed;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            episodeId = html.match(/https\:\/\/api\.streamdor\.co\/load_player\.html\?e\=([A-z0-9]+)/i);

            if (episodeId) {
              _context.next = 3;
              break;
            }

            return _context.abrupt('return');

          case 3:

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

            qual = 'SD';
            _context.next = 6;
            return libs.client.request('https://api.streamdor.co/episode/embed/' + episodeId[1], 'GET');

          case 6:
            findEmbed = _context.sent;

            if (findEmbed) {
              _context.next = 9;
              break;
            }

            return _context.abrupt('return', false);

          case 9:
            if (!(findEmbed['status'] == 0)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt('return', false);

          case 11:

            // let findEmbed = parserEpisode.match(/(https\:\/\/streamango\.com\/embed\/.*?)/i);

            console.log(findEmbed, 'findEmbed');

            if (!findEmbed) {
              _context.next = 14;
              break;
            }

            return _context.abrupt('return', detail = {
              'source': 'Cmovies - Streamango', 'quality': qual, 'language': 'en', 'url': findEmbed['embed'],
              'info': '', direct: false, 'debridonly': false
            });

          case 14:
            if (!olod) {
              _context.next = 16;
              break;
            }

            return _context.abrupt('return', {
              'source': 'Cmovies - Openload', 'quality': qual, 'language': 'en', 'url': findEmbed[0],
              'info': '', direct: false, 'debridonly': false
            });

          case 16:
            return _context.abrupt('return', false);

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function streamdor(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();
//ádasd
getSource = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return');

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getSource(_x5) {
    return _ref2.apply(this, arguments);
  };
}();
movie = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, listHosts, infoMovie, listDirect, getDirect, callback) {
    var movieLink, listLinks, searchLink, parser, listItem, listEps, arrPromise;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            movieLink = '';
            listLinks = [];
            searchLink = source.search_link + infoMovie.title + "+" + infoMovie.year;
            _context4.next = 6;
            return libs.client.request(searchLink, 'GET', {}, {}, false, '', '', '', 'dom');

          case 6:
            parser = _context4.sent;

            if (parser) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt('return');

          case 9:
            listItem = parser('a.ml-mask');


            console.log(listItem.length, 'listItem');

            listItem.each(function () {

              var title = parser(this).attr('title');

              console.log(title.toLowerCase(), 'title');

              if (title.toLowerCase() == infoMovie.title.toLowerCase() || title.toLowerCase() == infoMovie.title.toLowerCase() + " " + infoMovie.year) {
                movieLink = parser(this).attr('href');
              }
            });

            if (!(movieLink == '')) {
              _context4.next = 14;
              break;
            }

            return _context4.abrupt('return');

          case 14:
            _context4.next = 16;
            return libs.client.request(movieLink + "watch", 'GET', {}, {}, false, '', '', '', 'dom');

          case 16:
            parser = _context4.sent;

            if (parser) {
              _context4.next = 19;
              break;
            }

            return _context4.abrupt('return');

          case 19:
            listEps = parser('.btn-eps');


            console.log(listEps, 'listEps');

            listEps.each(function () {
              listLinks.push(parser(this).attr('href'));
            });

            console.log(listLinks, 'listLinks');

            arrPromise = listLinks.map(function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(item) {
                var parserEmbed, openloadLink, embed, _embed;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return libs.client.request(item, 'GET');

                      case 2:
                        parserEmbed = _context3.sent;

                        if (!parserEmbed.match(/http.+:\/\/openload\.co\/embed\/.+\"/ig)) {
                          _context3.next = 12;
                          break;
                        }

                        openloadLink = parserEmbed.match(/http.+:\/\/openload.co\/embed\/.+\"/ig);

                        if (!openloadLink) {
                          _context3.next = 10;
                          break;
                        }

                        _context3.next = 8;
                        return streamdor(libs, trim(openloadLink[0]), item, true);

                      case 8:
                        embed = _context3.sent;

                        if (embed) {

                          getDirect(libs, listHosts, embed, listDirect, callback);
                        }

                      case 10:
                        _context3.next = 16;
                        break;

                      case 12:
                        _context3.next = 14;
                        return streamdor(libs, parserEmbed, item, false);

                      case 14:
                        _embed = _context3.sent;


                        if (_embed) {

                          getDirect(libs, listHosts, _embed, listDirect, callback);
                        }

                      case 16:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, undefined);
              }));

              return function (_x12) {
                return _ref4.apply(this, arguments);
              };
            }());
            _context4.next = 26;
            return Promise.all(arrPromise);

          case 26:
            return _context4.abrupt('return');

          case 29:
            _context4.prev = 29;
            _context4.t0 = _context4['catch'](0);

            console.log(String(_context4.t0));
            return _context4.abrupt('return');

          case 33:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 29]]);
  }));

  return function movie(_x6, _x7, _x8, _x9, _x10, _x11) {
    return _ref3.apply(this, arguments);
  };
}();
tvshow = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(libs, listHosts, infoMovie, listDirect, getDirect, callback) {
    var tvshowLink, episodeLink, searchText, parser, listItem, parserWatch, listEps, arrPromise;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            tvshowLink = '';
            episodeLink = [];
            searchText = infoMovie.title + ' season ' + infoMovie.season;
            _context6.next = 6;
            return libs.client.request(source.search_link + searchText, 'GET', {}, {}, false, '', '', '', 'dom');

          case 6:
            parser = _context6.sent;
            listItem = parser('a.ml-mask');


            console.log(listItem.length, 'lengthItem');

            listItem.each(function () {

              var title = parser(this).attr('title');

              console.log(title, 'titleTvshow');

              if (title && title.toLowerCase().replace(/\W+/ig, '') == (infoMovie.title + " - season " + infoMovie.season).toLowerCase().replace(/\W+/ig, '')) {

                console.log(title, 'titleAdd');
                tvshowLink = parser(this).attr('href');
              }
            });

            if (tvshowLink) {
              _context6.next = 13;
              break;
            }

            console.log('not tvshow match');
            return _context6.abrupt('return');

          case 13:
            _context6.next = 15;
            return libs.client.request(tvshowLink + 'watch/', 'GET', {}, {}, false, '', '', '', 'dom');

          case 15:
            parserWatch = _context6.sent;

            if (parserWatch) {
              _context6.next = 19;
              break;
            }

            console.log('error when get link watch', tvshowLink);
            return _context6.abrupt('return');

          case 19:
            listEps = parserWatch('.btn-eps');


            console.log(listEps.length, 'lengthItemEps');

            listEps.each(function () {
              var eps = parserWatch(this).text();
              eps = eps.match(/episode *([0-9]+)/i);

              if (eps && eps[1] == infoMovie.episode) {
                episodeLink.push(parserWatch(this).attr('href'));
              }
            });

            console.log(episodeLink, 'episodeLink');

            arrPromise = episodeLink.map(function () {
              var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(item) {
                var parserEmbed, openloadLink, embed, _embed2;

                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:

                        console.log(item, 'embed');
                        _context5.next = 3;
                        return libs.client.request(item, 'GET');

                      case 3:
                        parserEmbed = _context5.sent;

                        if (!parserEmbed.match(/http.+\:\/\/openload\.co\/embed\/.+\"/ig)) {
                          _context5.next = 14;
                          break;
                        }

                        openloadLink = parserEmbed.match(/http.+\:\/\/openload.co\/embed\/.+\"/ig);

                        if (!openloadLink) {
                          _context5.next = 12;
                          break;
                        }

                        console.log(openloadLink[0], 'parserEmbed');
                        _context5.next = 10;
                        return streamdor(libs, trim(openloadLink[0]), item, true);

                      case 10:
                        embed = _context5.sent;

                        if (embed) {

                          getDirect(libs, listHosts, embed, listDirect, callback);
                        }

                      case 12:
                        _context5.next = 18;
                        break;

                      case 14:
                        _context5.next = 16;
                        return streamdor(libs, parserEmbed, item, false);

                      case 16:
                        _embed2 = _context5.sent;


                        if (_embed2) {

                          console.log(_embed2, 'get embed');
                          getDirect(libs, listHosts, _embed2, listDirect, callback);
                        }

                      case 18:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                }, _callee5, undefined);
              }));

              return function (_x19) {
                return _ref6.apply(this, arguments);
              };
            }());
            _context6.next = 26;
            return Promise.all(arrPromise);

          case 26:
            return _context6.abrupt('return');

          case 29:
            _context6.prev = 29;
            _context6.t0 = _context6['catch'](0);

            console.log(String(_context6.t0));
            return _context6.abrupt('return');

          case 33:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 29]]);
  }));

  return function tvshow(_x13, _x14, _x15, _x16, _x17, _x18) {
    return _ref5.apply(this, arguments);
  };
}();