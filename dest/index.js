require('source-map-support').install(),
  (function(e) {
    var n = {};
    function t(o) {
      if (n[o]) return n[o].exports;
      var r = (n[o] = { i: o, l: !1, exports: {} });
      return e[o].call(r.exports, r, r.exports, t), (r.l = !0), r.exports;
    }
    (t.m = e),
      (t.c = n),
      (t.d = function(e, n, o) {
        t.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: o });
      }),
      (t.r = function(e) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 });
      }),
      (t.t = function(e, n) {
        if ((1 & n && (e = t(e)), 8 & n)) return e;
        if (4 & n && 'object' == typeof e && e && e.__esModule) return e;
        var o = Object.create(null);
        if (
          (t.r(o),
          Object.defineProperty(o, 'default', { enumerable: !0, value: e }),
          2 & n && 'string' != typeof e)
        )
          for (var r in e)
            t.d(
              o,
              r,
              function(n) {
                return e[n];
              }.bind(null, r)
            );
        return o;
      }),
      (t.n = function(e) {
        var n =
          e && e.__esModule
            ? function() {
                return e.default;
              }
            : function() {
                return e;
              };
        return t.d(n, 'a', n), n;
      }),
      (t.o = function(e, n) {
        return Object.prototype.hasOwnProperty.call(e, n);
      }),
      (t.p = ''),
      t((t.s = 1));
  })([
    function(e, n) {
      e.exports = require('express');
    },
    function(e, n, t) {
      process.on('unhandledRejection', (e, n) => {
        console.error('Unhandled Rejection at:', n, 'reason:', e),
          process.exit(1);
      });
      const o = t(0),
        r = t(2),
        u = t(3),
        s = t(9),
        i = o();
      i.use('/streaming', r(), u),
        i.listen(s.port, () => {
          console.info(
            '\nFree4Talk-Streaming-Server is started.\nYou can comeback Free4Talk and start to use Streaming.\n  '.trim()
          );
        });
    },
    function(e, n) {
      e.exports = require('cors');
    },
    function(e, n, t) {
      const o = t(0),
        r = t(4),
        u = (t(5), t(6)),
        s = t(7),
        i = t(8),
        c = o.Router();
      c.use('/ping', u),
        c.use(i('before')),
        c.use(r.urlencoded({ extended: !0 })),
        c.use(r.json()),
        c.use(i('after')),
        c.use(s),
        (e.exports = c);
    },
    function(e, n) {
      e.exports = require('body-parser');
    },
    function(e, n) {
      e.exports = (e = 1e3) =>
        async function(n, t, o) {
          await new Promise(n => setTimeout(n, e)), o();
        };
    },
    function(e, n) {
      e.exports = function(e, n) {
        return n.send('pong');
      };
    },
    function(e, n) {
      e.exports = function(e, n, t, o) {
        e instanceof Error
          ? (console.error(e.stack),
            t.set({ Connection: 'close' }),
            t.status(500).json({
              success: !1,
              type: e.type,
              title: e.title,
              error: e.message,
              data: null,
            }))
          : e instanceof Buffer
          ? (t.set({
              'Content-Type': 'application/json',
              'Content-Length': e.length,
            }),
            t.write(e),
            t.end())
          : t.json({ success: !0, error: null, data: e });
      };
    },
    function(e, n) {
      function t(e, n, t) {
        'POST' === e.method
          ? (e.query.a &&
              ((e.headers['content-type'] = 'application/json'),
              delete e.query.a),
            t())
          : t();
      }
      function o(e, n, t) {
        'POST' === e.method
          ? (e.body && e.body.body && (e.body = e.body.body), t())
          : t();
      }
      e.exports = function(e) {
        return 'before' === e ? t : o;
      };
    },
    function(e, n) {
      e.exports = { port: 8888 };
    },
  ]);
//# sourceMappingURL=index.js.map
