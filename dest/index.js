require('source-map-support').install(),
  (function(e) {
    var r = {};
    function n(o) {
      if (r[o]) return r[o].exports;
      var t = (r[o] = { i: o, l: !1, exports: {} });
      return e[o].call(t.exports, t, t.exports, n), (t.l = !0), t.exports;
    }
    (n.m = e),
      (n.c = r),
      (n.d = function(e, r, o) {
        n.o(e, r) || Object.defineProperty(e, r, { enumerable: !0, get: o });
      }),
      (n.r = function(e) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 });
      }),
      (n.t = function(e, r) {
        if ((1 & r && (e = n(e)), 8 & r)) return e;
        if (4 & r && 'object' == typeof e && e && e.__esModule) return e;
        var o = Object.create(null);
        if (
          (n.r(o),
          Object.defineProperty(o, 'default', { enumerable: !0, value: e }),
          2 & r && 'string' != typeof e)
        )
          for (var t in e)
            n.d(
              o,
              t,
              function(r) {
                return e[r];
              }.bind(null, t)
            );
        return o;
      }),
      (n.n = function(e) {
        var r =
          e && e.__esModule
            ? function() {
                return e.default;
              }
            : function() {
                return e;
              };
        return n.d(r, 'a', r), r;
      }),
      (n.o = function(e, r) {
        return Object.prototype.hasOwnProperty.call(e, r);
      }),
      (n.p = ''),
      n((n.s = 4));
  })([
    function(e, r) {
      e.exports = require('path');
    },
    ,
    ,
    ,
    function(e, r, n) {
      process.on('unhandledRejection', (e, r) => {
        console.error('Unhandled Rejection at:', r, 'reason:', e),
          process.exit(1);
      });
      const { Worker: o } = n(5),
        t = n(0);
      n(6)
        .check()
        .then(() => {
          const e = new o(t.resolve(__dirname, 'server.js'));
          e.on('error', console.error),
            e.on('exit', e => {
              0 !== e && console.error('Worker stopped with exit code ' + e);
            });
        })
        .catch(console.error);
    },
    function(e, r) {
      e.exports = require('worker_threads');
    },
    function(e, r) {
      e.exports = { check: async () => {} };
    },
  ]);
//# sourceMappingURL=index.js.map
