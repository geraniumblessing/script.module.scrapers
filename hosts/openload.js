

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var config = {
	priority: 1,
	language: ['en'],
	api_get_direct: 'https://api.teatv.net/api/v2/get_opl'
};

host = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(libs, embed, listDirect, callback) {
		var parser, direct, result;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return libs.client.request(embed.url, 'GET');

					case 3:
						parser = _context.sent;
						_context.next = 6;
						return libs.client.request(config.api_get_direct, 'POST', {
							'data': parser,
							'token': libs.cryptoJs.MD5(parser + "teatv-openload").toString()
						});

					case 6:
						direct = _context.sent;

						if (direct) {
							_context.next = 9;
							break;
						}

						return _context.abrupt('return');

					case 9:
						result = {
							'source': embed.source, 'quality': embed.qual,
							'language': embed.language, 'url': direct.data, 'info': embed.info,
							'direct': true, 'debridonly': embed.debridonly
						};


						console.log(result);

						listDirect.push(result);
						callback(result);
						return _context.abrupt('return');

					case 16:
						_context.prev = 16;
						_context.t0 = _context['catch'](0);
						return _context.abrupt('return');

					case 19:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 16]]);
	}));

	return function host(_x, _x2, _x3, _x4) {
		return _ref.apply(this, arguments);
	};
}();