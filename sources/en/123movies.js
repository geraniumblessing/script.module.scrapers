

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

function _tsd_tsd_ds(s) {
	var _97x65m = s;var _83Mxx179 = _97x65m.slice(5, 11);var _146hx20 = _93x580G(_83Mxx179);var _1x61I = _e60xe8(_146hx20);return _36Jx73(_1x61I) + "11" + "587708";
}function _93x580G(s) {
	return s.split("");
}function _e60xe8(r) {
	return r.reverse();
}function _36Jx73(n) {
	return n.join("");
}

var xToken = function xToken(token, seeds) {

	var xxToken = token.slice(parseInt(seeds[0]), parseInt(seeds[1]));
	xxToken = xToken.reverse();

	return xxToken.join('') + seeds[2] + seeds[3];
};

var getLink = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(libs, listHosts, infoMovie, listDirect, getDirect, callback, url) {
		var isTvshow = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;

		var parse, iframe, parseIframe, token, tokenCode, headers, body, urlToken, response, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return libs.client.request(url, 'GET', {}, {}, false, '', '', '', 'dom');

					case 3:
						parse = _context.sent;
						iframe = parse('div.videoPlayer iframe').attr('src');
						_context.next = 7;
						return libs.client.request(iframe);

					case 7:
						parseIframe = _context.sent;
						token = parseIframe.match(/'var tc = \'(.+?)\''/i);
						tokenCode = parseIframe.match(/"\_token\" *\: *\"([^\"]+)/i);
						// let seeds = parseIframe.match(/_tsd_tsd_ds\(s\) .+\.slice\((.+?),(.+?)\).+ return .+? \+ \"(.+?)\"\+\"(.+?)";/i);
						// let pair = parseIframe.match(/\'type\': \'.+\',\s*\'(.+?)\': \'(.+?)\'/i);

						if (!(!token || !tokenCode)) {
							_context.next = 13;
							break;
						}

						console.log('token', token, tokenCode);
						return _context.abrupt('return');

					case 13:

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
						_context.next = 18;
						return libs.client.request(urlToken, 'POST', body, headers);

					case 18:
						response = _context.sent;


						console.log('response', response);

						if (!response) {
							_context.next = 40;
							break;
						}

						_iteratorNormalCompletion = true;
						_didIteratorError = false;
						_iteratorError = undefined;
						_context.prev = 24;


						for (_iterator = response[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							item = _step.value;


							if (item) {

								if (item.indexOf('googleusercontent') != -1) {

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
						_context.next = 32;
						break;

					case 28:
						_context.prev = 28;
						_context.t0 = _context['catch'](24);
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
						return _context.abrupt('return');

					case 43:
						_context.prev = 43;
						_context.t1 = _context['catch'](0);

						console.log(String(_context.t1));
						return _context.abrupt('return');

					case 47:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 43], [24, 28, 32, 40], [33,, 35, 39]]);
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