

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

source = {
  priority: 1,
  language: ['en'],
  domains: ['movie4k.is'],
  base_link: 'https://movie4k.is/',
  search_link: 'http://www.movie4k.is/?s='
};

getSource = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return');

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getSource(_x) {
    return _ref.apply(this, arguments);
  };
}();

movie = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(libs, listHosts, infoMovie, listDirect, getDirect, callback) {
    var movieLink, searchLink, parser, listItem, quality, iframe, embed;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            movieLink = '';
            searchLink = source.search_link + libs.cleantitle.geturl(infoMovie.title);
            _context2.next = 5;
            return libs.client.request(searchLink, 'GET', {}, {}, false, '', '', '', 'dom');

          case 5:
            parser = _context2.sent;

            if (parser) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt('return');

          case 8:
            listItem = parser('div.item');


            console.log(listItem.length, 'listItem');

            listItem.each(function () {

              var title = parser(this).find('div.fixyear h2').text();
              var year = parser(this).find('div.fixyear span.year').text();

              console.log(title.toLowerCase(), 'title');

              if (title.toLowerCase() == infoMovie.title.toLowerCase() || title.toLowerCase() == infoMovie.title.toLowerCase() + " " + infoMovie.year) {

                if (infoMovie.year == year) {
                  movieLink = parser(this).find('.boxinfo a').attr('href');
                }
              }
            });

            if (!(movieLink == '')) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt('return');

          case 13:
            _context2.next = 15;
            return libs.client.request(movieLink, 'GET', {}, {}, false, '', '', '', 'dom');

          case 15:
            parser = _context2.sent;

            if (parser) {
              _context2.next = 18;
              break;
            }

            return _context2.abrupt('return');

          case 18:
            quality = parser('.calidad2').text();
            iframe = parser('.movieplay iframe').attr('src');
            embed = {
              'source': 'Movie4k - Openload', 'quality': quality, 'language': 'en', 'url': iframe,
              'info': '', direct: false, 'debridonly': false
            };


            getDirect(libs, listHosts, embed, listDirect, callback);
            return _context2.abrupt('return');

          case 25:
            _context2.prev = 25;
            _context2.t0 = _context2['catch'](0);

            console.log(String(_context2.t0));
            return _context2.abrupt('return');

          case 29:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 25]]);
  }));

  return function movie(_x2, _x3, _x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();