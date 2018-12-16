

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

source = {
	priority: 1,
	language: ['en'],
	domains: ['123movies.as'],
	base_link: 'https://123movies.as',
	source_link: 'https://gomostream.com',
	decode_file: '/decoding_v2.php',
	grabber_file: '/get.php'
};

var xToken = function xToken(token, seeds) {

	var xxToken = token.slice(parseInt(seeds[0]), parseInt(seeds[1]));
	xxToken = xToken.reverse();

	return xxToken.join('') + seeds[2] + seeds[3];
};

var getLink = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(libs, listHosts, infoMovie, listDirect, getDirect, callback, url) {
		var isTvshow = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;

		var parse, iframe, parseIframe, token, seeds, pair, headerToken, headers, body, urlToken, response, item, urlGrabber, bodyGrabber, responseGrabber, _item;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return libs.client.request(url);

					case 3:
						parse = _context.sent;
						iframe = parse.match(/\<iframe .+? src\=\"(.+?)\"/i);

						if (iframe) {
							_context.next = 8;
							break;
						}

						console.log('iframe', iframe);
						return _context.abrupt('return');

					case 8:
						_context.next = 10;
						return libs.client.request(iframe);

					case 10:
						parseIframe = _context.sent;
						token = parseIframe.match(/'var tc = \'(.+?)\''/i);
						seeds = parseIframe.match(/_tsd_tsd\(s\) .+\.slice\((.+?),(.+?)\).+ return .+? \+ \"(.+?)\"\+\"(.+?)";/i);
						pair = parseIframe.match(/\'type\': \'.+\',\s*\'(.+?)\': \'(.+?)\'/i);

						if (!(!token || !seeds || !pair)) {
							_context.next = 17;
							break;
						}

						console.log('token, seeds, pair', token, seeds, pair);
						return _context.abrupt('return');

					case 17:
						headerToken = xToken(token, seeds);


						console.log('headerToken', headerToken);

						headers = {
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
							'x-token': headerToken
						};
						body = {
							'tokenCode': token
						};
						urlToken = source.source_link + source.decode_file;
						_context.next = 24;
						return libs.client.request(urlToken, 'POST', body, headers);

					case 24:
						response = _context.sent;


						console.log('response', response);

						if (response) {

							for (item in response) {
								if (item.indexOf('vidushare.com') != -1) {

									console.log('direct', item);
									getDirect(libs, listHosts, {
										'source': '123movies', 'quality': 'HD', 'language': 'en', 'url': item,
										'info': '', direct: true, 'debridonly': false
									}, listDirect, callback);
								}
							}
						}

						if (!isTvshow) {
							_context.next = 35;
							break;
						}

						urlGrabber = source.source_link + source.grabber_file;
						bodyGrabber = {
							'type': 'episode',
							'imd_id': infoMovie.imdb,
							'seasonsNo': infoMovie.season,
							'episodesNo': infoMovie.episode
						};

						bodyGrabber[pair[0]] = pair[1];

						_context.next = 33;
						return libs.client.request(urlGrabber, 'POST', bodyGrabber, headers);

					case 33:
						responseGrabber = _context.sent;


						if (responseGrabber) {

							for (_item in responseGrabber) {

								getDirect(libs, listHosts, {
									'source': '123movies', 'quality': _item[label], 'language': 'en', 'url': _item['file'],
									'info': '', direct: true, 'debridonly': false
								}, listDirect, callback);
							}
						}

					case 35:
						return _context.abrupt('return');

					case 38:
						_context.prev = 38;
						_context.t0 = _context['catch'](0);

						console.log(String(_context.t0));
						return _context.abrupt('return');

					case 42:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 38]]);
	}));

	return function getLink(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
		return _ref.apply(this, arguments);
	};
}();

movie = function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(libs, listHosts, infoMovie, listDirect, getDirect, callback) {
		var urlMovie, parse, token;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.prev = 0;
						urlMovie = libs.cleantitle.geturl(infoMovie.title);

						urlMovie = source.base_link + '/movies/' + urlMovie + '-watch-online-free-123movies/';

						_context2.next = 5;
						return libs.client.request(urlMovie);

					case 5:
						parse = _context2.sent;
						token = parse.match(/\/?watch-token=(.*?)/i);

						if (token) {
							_context2.next = 10;
							break;
						}

						console.log('token', token);
						return _context2.abrupt('return');

					case 10:
						;

						urlMovie = urlMovie + '?watch-token=' + token[1];

						_context2.next = 14;
						return getLink(libs, listHosts, infoMovie, listDirect, getDirect, callback, urlMovie);

					case 14:
						return _context2.abrupt('return');

					case 17:
						_context2.prev = 17;
						_context2.t0 = _context2['catch'](0);

						console.log(String(_context2.t0));
						return _context2.abrupt('return');

					case 21:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined, [[0, 17]]);
	}));

	return function movie(_x9, _x10, _x11, _x12, _x13, _x14) {
		return _ref2.apply(this, arguments);
	};
}();
tvshow = function () {
	var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, listHosts, infoMovie, listDirect, getDirect, callback) {
		var urlMovie, parse, token;
		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_context3.prev = 0;
						urlMovie = libs.cleantitle.geturl(infoMovie.title);

						urlMovie = source.base_link + '/episodes/' + urlMovie + '-' + infoMovie.season + 'x' + infoMovie.episode + '/';

						_context3.next = 5;
						return libs.client.request(urlMovie);

					case 5:
						parse = _context3.sent;
						token = parse.match(/\/?watch-token=(.*?)/i);

						if (token) {
							_context3.next = 9;
							break;
						}

						return _context3.abrupt('return');

					case 9:

						urlMovie = urlMovie + '?watch-token=' + token[1];

						_context3.next = 12;
						return getLink(libs, listHosts, infoMovie, listDirect, getDirect, callback, urlMovie);

					case 12:
						return _context3.abrupt('return');

					case 15:
						_context3.prev = 15;
						_context3.t0 = _context3['catch'](0);

						console.log(String(_context3.t0));
						return _context3.abrupt('return');

					case 19:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, undefined, [[0, 15]]);
	}));

	return function tvshow(_x15, _x16, _x17, _x18, _x19, _x20) {
		return _ref3.apply(this, arguments);
	};
}();