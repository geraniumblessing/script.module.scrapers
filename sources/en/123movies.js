

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

source = {
	priority: 1,
	language: ['en'],
	domains: ['123movies.as'],
	base_link: 'https://123movies.as',
	source_link: 'https://gomostream.com',
	decode_file: '/decoding_v3.php',
	grabber_file: '/get.php'
};

// function _tsd_tsd_ds(s) { 
// 	var _97x65m = s;var _83Mxx179 = _97x65m.slice(5,11);var _146hx20 = _93x580G(_83Mxx179);            var _1x61I = _e60xe8(_146hx20); return _36Jx73(_1x61I) + "11"+"587708";           
// }           
// function _93x580G(s){return s.split("");}function _e60xe8(r){return  r.reverse();}function _36Jx73(n){return n.join("");}


var xToken = function xToken(token, seeds) {

	var xxToken = token.slice(parseInt(seeds[0]), parseInt(seeds[1]));
	xxToken = xToken.reverse();

	return xxToken.join('') + seeds[2] + seeds[3];
};

var getLink = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(libs, listHosts, infoMovie, listDirect, getDirect, callback, url) {
		var isTvshow = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;

		var parseIframe, token, tokenCode, seeds, pair, _93x580G, _e60xe8, _36Jx73, _tsd_tsd_ds, headers, body, urlToken, response, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return libs.client.request(url, 'GET');

					case 3:
						parseIframe = _context.sent;
						token = parseIframe.match(/'var tc = \'(.+?)\''/i);
						tokenCode = parseIframe.match(/"\_token\" *\: *\"([^\"]+)/i);
						seeds = parseIframe.match(/return *_12Wx69\(_1x72a\) + "([^\"]+)/i);
						pair = parseIframe.match(/return *_12Wx69\(_1x72a\) *\+ *\"[0-9]+" *\+ *\"([^\"]+)/i);
						// let seeds = parseIframe.match(/_tsd_tsd_ds\(s\) .+\.slice\((.+?),(.+?)\).+ return .+? \+ \"(.+?)\"\+\"(.+?)";/i);
						// let pair = parseIframe.match(/\'type\': \'.+\',\s*\'(.+?)\': \'(.+?)\'/i);

						if (!(!token || !tokenCode || !seeds || !pair)) {
							_context.next = 11;
							break;
						}

						console.log('token', token, tokenCode);
						return _context.abrupt('return');

					case 11:

						token = token[1];
						tokenCode = tokenCode[1];
						seeds = seeds[1];
						pair = pair[1];

						console.log('token', token, tokenCode, seeds, pair);

						_93x580G = function _93x580G(s) {
							return s.split("");
						};

						_e60xe8 = function _e60xe8(r) {
							return r.reverse();
						};

						_36Jx73 = function _36Jx73(n) {
							return n.join("");
						};

						_tsd_tsd_ds = function _tsd_tsd_ds(s) {
							var _97x65m = s;
							var _83Mxx179 = _97x65m.slice(5, 11);
							var _146hx20 = _93x580G(_83Mxx179);
							var _1x61I = _e60xe8(_146hx20);
							return _36Jx73(_1x61I) + seeds + pair;
						};

						// let headerToken = xToken(token, seeds);

						// console.log('headerToken', headerToken)

						headers = {
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
							'x-token': _tsd_tsd_ds(token)
						};
						body = {
							'tokenCode': token,
							'_token': tokenCode
						};
						urlToken = source.source_link + source.decode_file;
						_context.next = 25;
						return libs.client.request(urlToken, 'POST', body, headers);

					case 25:
						response = _context.sent;


						console.log('response', response);

						if (!response) {
							_context.next = 47;
							break;
						}

						_iteratorNormalCompletion = true;
						_didIteratorError = false;
						_iteratorError = undefined;
						_context.prev = 31;


						for (_iterator = response[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							item = _step.value;


							if (item) {

								if (item.indexOf('googleusercontent') != -1 || item.indexOf('gomostream') != -1) {

									console.log('direct', item);
									getDirect(libs, listHosts, {
										'source': '123movies', 'quality': 'HD', 'language': 'en', 'url': item,
										'info': '', direct: true, 'debridonly': false
									}, listDirect, callback);
								} else {
									getDirect(libs, listHosts, {
										'source': '123movies', 'quality': 'HD', 'language': 'en', 'url': item,
										'info': '', direct: false, 'debridonly': false
									}, listDirect, callback);
								}
							}
						}
						_context.next = 39;
						break;

					case 35:
						_context.prev = 35;
						_context.t0 = _context['catch'](31);
						_didIteratorError = true;
						_iteratorError = _context.t0;

					case 39:
						_context.prev = 39;
						_context.prev = 40;

						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}

					case 42:
						_context.prev = 42;

						if (!_didIteratorError) {
							_context.next = 45;
							break;
						}

						throw _iteratorError;

					case 45:
						return _context.finish(42);

					case 46:
						return _context.finish(39);

					case 47:
						return _context.abrupt('return');

					case 50:
						_context.prev = 50;
						_context.t1 = _context['catch'](0);

						console.log(String(_context.t1));
						return _context.abrupt('return');

					case 54:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 50], [31, 35, 39, 47], [40,, 42, 46]]);
	}));

	return function getLink(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
		return _ref.apply(this, arguments);
	};
}();

movie = function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(libs, listHosts, infoMovie, listDirect, getDirect, callback) {
		var urlMovie, parse, hrefMovie;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.prev = 0;
						urlMovie = libs.cleantitle.geturl(infoMovie.title);
						// urlMovie = `${source.base_link}/movies/${urlMovie}-watch-online-free-123movies/`;

						urlMovie = source.base_link + '/movie/' + urlMovie;

						_context2.next = 5;
						return libs.client.request(urlMovie, 'GET', {}, {}, false, '', '', '', 'dom');

					case 5:
						parse = _context2.sent;
						hrefMovie = parse('div.ds_seriesplay.dsclear a').attr('href');
						_context2.next = 9;
						return getLink(libs, listHosts, infoMovie, listDirect, getDirect, callback, hrefMovie);

					case 9:
						return _context2.abrupt('return');

					case 12:
						_context2.prev = 12;
						_context2.t0 = _context2['catch'](0);

						console.log(String(_context2.t0));
						return _context2.abrupt('return');

					case 16:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined, [[0, 12]]);
	}));

	return function movie(_x9, _x10, _x11, _x12, _x13, _x14) {
		return _ref2.apply(this, arguments);
	};
}();
tvshow = function () {
	var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, listHosts, infoMovie, listDirect, getDirect, callback) {
		var urlMovie, parse, hrefMovie;
		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_context3.prev = 0;
						urlMovie = libs.cleantitle.geturl(infoMovie.title);

						urlMovie = source.base_link + '/episodes/' + urlMovie + '-' + infoMovie.season + 'x' + infoMovie.episode + '/';

						_context3.next = 5;
						return libs.client.request(urlMovie, 'GET', {}, {}, false, '', '', '', 'dom');

					case 5:
						parse = _context3.sent;
						hrefMovie = parse('div.ds_seriesplay.dsclear a').attr('href');
						_context3.next = 9;
						return getLink(libs, listHosts, infoMovie, listDirect, getDirect, callback, hrefMovie);

					case 9:
						return _context3.abrupt('return');

					case 12:
						_context3.prev = 12;
						_context3.t0 = _context3['catch'](0);

						console.log(String(_context3.t0));
						return _context3.abrupt('return');

					case 16:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, undefined, [[0, 12]]);
	}));

	return function tvshow(_x15, _x16, _x17, _x18, _x19, _x20) {
		return _ref3.apply(this, arguments);
	};
}();