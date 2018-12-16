

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

source = {
  priority: 1,
  language: ['en'],
  domains: ['ororo.tv'],
  base_link: 'https://ororo.tv',
  moviesearch_link: 'moviesearch_link',
  tvsearch_link: '/api/v2/shows',
  movie_link: '/api/v2/movies/',
  show_link: '/api/v2/shows/',
  episode_link: '/api/v2/episodes/',
  username: 'testappdaily2@gmail.com',
  password: 'huyenabcd'
};

getSource = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(libs, listHosts, infoMovie, listDirect, getDirect, callback, url) {
    var headers, parse;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            headers = {
              'User-Agent': 'Incursion for Kodi',
              'Authorization': 'Basic ' + libs.base64.encode(source.username + ':' + source.password)
            };
            _context.next = 4;
            return libs.client.request(url, 'GET', {}, headers);

          case 4:
            parse = _context.sent;

            parse = parse['url'];

            getDirect(libs, listHosts, {
              'source': '123movies', 'quality': 'HD', 'language': 'en', 'url': parse,
              'info': '', direct: true, 'debridonly': false
            }, listDirect, callback);
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](0);

            console.log(String(_context.t0));
            return _context.abrupt('return');

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 9]]);
  }));

  return function getSource(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
    return _ref.apply(this, arguments);
  };
}();
movie = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(libs, listHosts, infoMovie, listDirect, getDirect, callback) {
    var url, urlCache, headers, response, item;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            url = source.base_link + source.moviesearch_link;
            urlCache = '';
            headers = {
              'User-Agent': 'Incursion for Kodi',
              'Authorization': 'Basic ' + libs.base64.encode(source.username + ':' + source.password)
            };
            _context2.next = 6;
            return libs.client.request(url, 'GET', {}, headers);

          case 6:
            response = _context2.sent;

            response = response['movies'];

            _context2.t0 = regeneratorRuntime.keys(response);

          case 9:
            if ((_context2.t1 = _context2.t0()).done) {
              _context2.next = 16;
              break;
            }

            item = _context2.t1.value;

            if (!('tt' + item[1].replace(/[^[0-9]]/i, '') == infoMovie.imdb)) {
              _context2.next = 14;
              break;
            }

            urlCache = item[0];
            return _context2.abrupt('break', 16);

          case 14:
            _context2.next = 9;
            break;

          case 16:
            if (urlCache) {
              _context2.next = 18;
              break;
            }

            return _context2.abrupt('return');

          case 18:
            _context2.next = 20;
            return getSource(libs, listHosts, infoMovie, listDirect, getDirect, callback, source.base_link + source.show_link + urlCache);

          case 20:
            return _context2.abrupt('return');

          case 23:
            _context2.prev = 23;
            _context2.t2 = _context2['catch'](0);

            console.log(String(_context2.t2));
            return _context2.abrupt('return');

          case 27:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 23]]);
  }));

  return function movie(_x8, _x9, _x10, _x11, _x12, _x13) {
    return _ref2.apply(this, arguments);
  };
}();
tvshow = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, listHosts, infoMovie, listDirect, getDirect, callback) {
    var url, urlCache, urlEpisode, headers, response, item, _item, id, seasonTvshow, episodeTvshow;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            url = source.base_link + source.tvsearch_link;
            urlCache = '';
            urlEpisode = '';
            headers = {
              'User-Agent': 'Incursion for Kodi',
              'Authorization': 'Basic ' + libs.base64.encode(source.username + ':' + source.password)
            };
            _context3.next = 7;
            return libs.client.request(url, 'GET', {}, headers);

          case 7:
            response = _context3.sent;

            response = response['shows'];

            _context3.t0 = regeneratorRuntime.keys(response);

          case 10:
            if ((_context3.t1 = _context3.t0()).done) {
              _context3.next = 17;
              break;
            }

            item = _context3.t1.value;

            if (!('tt' + item[1].replace(/[^[0-9]]/i, '') == infoMovie.imdb)) {
              _context3.next = 15;
              break;
            }

            urlCache = item[0];
            return _context3.abrupt('break', 17);

          case 15:
            _context3.next = 10;
            break;

          case 17:
            if (urlCache) {
              _context3.next = 19;
              break;
            }

            return _context3.abrupt('return');

          case 19:

            urlCache = source.base_link + urlCache;

            _context3.next = 22;
            return libs.client.request(urlCache, 'GET', headers);

          case 22:
            responseCache = _context3.sent;

            responseCache = responseCache['episodes'];

            _context3.t2 = regeneratorRuntime.keys(responseCache);

          case 25:
            if ((_context3.t3 = _context3.t2()).done) {
              _context3.next = 35;
              break;
            }

            _item = _context3.t3.value;
            id = _item['id'];
            seasonTvshow = _item['season'];
            episodeTvshow = _item['number'];

            if (!(seasonTvshow == infoMovie.season && episodeTvshow == infoMovie.episode)) {
              _context3.next = 33;
              break;
            }

            urlEpisode = source.base_link + source.episode_link + id;
            return _context3.abrupt('break', 35);

          case 33:
            _context3.next = 25;
            break;

          case 35:
            if (!urlEpisode) {
              _context3.next = 37;
              break;
            }

            return _context3.abrupt('return');

          case 37:
            _context3.next = 39;
            return getSource(libs, listHosts, infoMovie, listDirect, getDirect, callback, source.base_link + urlEpisode);

          case 39:
            return _context3.abrupt('return');

          case 42:
            _context3.prev = 42;
            _context3.t4 = _context3['catch'](0);

            console.log(String(_context3.t4));
            return _context3.abrupt('return');

          case 46:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 42]]);
  }));

  return function tvshow(_x14, _x15, _x16, _x17, _x18, _x19) {
    return _ref3.apply(this, arguments);
  };
}();