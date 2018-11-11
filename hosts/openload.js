

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var host = {
	priority: 1,
	language: ['en'],
	base_link: '',
	api_get_direct: 'http://localhost:8889/v1/openload/get'
};

host.host = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(embed, listDirect, callback) {
		var parser, direct, result;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return client.request(embed, 'GET');

					case 3:
						parser = _context.sent;
						_context.next = 6;
						return client.request(host.api_get_direct, 'POST', {
							'data': parser
						});

					case 6:
						direct = _context.sent;

						direct = JSON.parse(direct);

						if (!direct.code) {
							_context.next = 10;
							break;
						}

						return _context.abrupt('return');

					case 10:
						result = {
							'source': embed.source, 'quality': embed.qual,
							'language': embed.language, 'url': direct.direct, 'info': embed.info,
							'direct': true, 'debridonly': embed.debridonly
						};


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

	return function (_x, _x2, _x3) {
		return _ref.apply(this, arguments);
	};
}();

WmrBLZZdx2UN26Sq = host;