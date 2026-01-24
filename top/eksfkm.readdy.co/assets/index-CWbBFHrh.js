(function() {
    const u = document.createElement("link").relList;
    if (u && u.supports && u.supports("modulepreload"))
        return;
    for (const o of document.querySelectorAll('link[rel="modulepreload"]'))
        r(o);
    new MutationObserver(o => {
        for (const d of o)
            if (d.type === "childList")
                for (const h of d.addedNodes)
                    h.tagName === "LINK" && h.rel === "modulepreload" && r(h)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function s(o) {
        const d = {};
        return o.integrity && (d.integrity = o.integrity),
        o.referrerPolicy && (d.referrerPolicy = o.referrerPolicy),
        o.crossOrigin === "use-credentials" ? d.credentials = "include" : o.crossOrigin === "anonymous" ? d.credentials = "omit" : d.credentials = "same-origin",
        d
    }
    function r(o) {
        if (o.ep)
            return;
        o.ep = !0;
        const d = s(o);
        fetch(o.href, d)
    }
}
)();
const Ip = "phc_V7JMHB0fVJGRu8UHyrsj6pSL1BS76P5zD8qCi7lrTTV"
  , Ze = {
    colors: {
        text: "#5D5D5D",
        white: "#FFFFFF",
        border: "rgba(0, 10, 36, 0.08)"
    },
    font: {
        family: '"Geist"',
        weight: "600",
        size: {
            normal: "14px",
            button: "18px"
        },
        lineHeight: "20px"
    },
    button: {
        gradient: "linear-gradient(180deg, #A797FF 0%, #7057FF 100%)"
    },
    shadow: "0px 8px 12px 0px rgba(9, 10, 20, 0.06)",
    zIndex: `${Number.MAX_SAFE_INTEGER}`
}
  , ph = {
    close: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2D303D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>')}`,
    generate: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.87 4.94c.227-.71 1.21-.723 1.456-.02l1.177 3.378 3.101 1.013c.708.231.714 1.216.01 1.455l-3.183 1.082-1.105 3.17c-.245.704-1.23.69-1.455-.02l-.989-3.107-3.367-1.203c-.702-.25-.68-1.234.04-1.455l3.282-1.016 1.043-3.277Z" fill="#FFF"/><path fill-rule="evenodd" d="M12.238 1.3c.167-.667 1.1-.667 1.266 0l.388 1.551 1.55.388c.666.166.667 1.1 0 1.266l-1.55.388-.388 1.55c-.167.666-1.1.667-1.266 0l-.388-1.55-1.55-.388c-.667-.166-.667-1.1 0-1.266l1.55-.388.388-1.551Z" fill="#FFF"/></svg>')}`
}
  , Vn = {
    // readdyLogo: "https://public.readdy.ai/gen_page/readdy-logo.png",
    // watermarkLogo: "https://public.readdy.ai/gen_page/watermark.png",
    // readdyLink: "https://readdy.ai?ref=b",
    fontStylesheet: "https://fonts.googleapis.com/css2?family=Geist:wght@600&display=swap",
    posthogCDN: "https://cdn.jsdelivr.net/npm/posthog-js@1.96.1/dist/array.full.min.js"
}
  , yh = {
    en: {
        prefix: "This Website is Made with",
        suffix: ". You can also get one like this in minutes",
        button: "Get one for FREE"
    },
    zh: {
        prefix: "本网站来自",
        suffix: "。你也可以在几分钟内拥有同样的页面",
        button: "立即免费拥有"
    }
}
  , ey = () => navigator.language?.toLowerCase().startsWith("zh") ?? !1
  , Jc = () => ey() ? yh.zh : yh.en
  , ty = () => window.innerWidth > 768 && !("ontouchstart"in window)
  , ly = () => {
    const c = window.location.hostname;
    return ["readdy.ai", "dev.readdy.ai", "localhost"].some(s => c === s || c.endsWith(`.${s}`))
}
;
function ay() {
    if (window.posthog)
        return;
    const c = document.createElement("script");
    c.src = Vn.posthogCDN,
    c.async = !0,
    c.onload = () => {
        window.posthog?.init(Ip, {
            api_host: "https://us.i.posthog.com",
            autocapture: !1,
            capture_pageview: !1,
            capture_pageleave: !1,
            disable_session_recording: !0,
            disable_scroll_properties: !0,
            capture_performance: {
                web_vitals: !1
            },
            rageclick: !1,
            loaded: function(u) {
                u.sessionRecording && u.sessionRecording.stopRecording()
            }
        })
    }
    ,
    document.head.appendChild(c)
}
function vh(c, u) {
    window.posthog?.capture(c, {
        ...u,
        version: 2
    })
}
function Vt(c, u) {
    Object.assign(c.style, u)
}
function gu(c, u="0") {
    Vt(c, {
        color: Ze.colors.text,
        fontFamily: Ze.font.family,
        fontSize: Ze.font.size.normal,
        lineHeight: Ze.font.lineHeight,
        fontWeight: Ze.font.weight,
        whiteSpace: "nowrap",
        marginRight: u
    })
}
function pu(c, u="row") {
    Vt(c, {
        display: "flex",
        flexDirection: u,
        alignItems: "center",
        justifyContent: "center"
    })
}
function ny() {
    if (ly())
        return;
    const c = "https://readdy.ai/api/public/user/is_free"
      , u = "5128eaf3-56f7-4a7b-b626-4896e0c1ac6a";
    async function s(T) {
        try {
            return !(await (await fetch(`${c}?projectId=${T}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })).json()).data.is_free
        } catch {
            return !0
        }
    }
    function r() {
        document.querySelector('link[rel="icon"]')?.remove();
        const T = document.createElement("link");
        T.type = "image/png",
        T.rel = "icon",
        T.href = Vn.readdyLogo,
        document.head.appendChild(T);
        const C = document.createElement("link");
        C.rel = "stylesheet",
        C.href = Vn.fontStylesheet,
        document.head.appendChild(C)
    }
    function o(T) {
        vh(T),
        window.open(Vn.readdyLink, "_blank")
    }
    function d() {
        const T = document.createElement("div");
        T.id = "close-button",
        Vt(T, {
            position: "absolute",
            top: "-12px",
            right: "-12px",
            width: "32px",
            height: "32px",
            backgroundColor: Ze.colors.white,
            borderRadius: "50%",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: Ze.colors.border,
            cursor: "pointer",
            boxShadow: Ze.shadow
        }),
        pu(T);
        const C = document.createElement("img");
        return C.src = ph.close,
        Vt(C, {
            width: "24px",
            height: "24px"
        }),
        T.appendChild(C),
        T.addEventListener("click", w => {
            w.stopPropagation(),
            vh("watermark_close_button_click"),
            document.getElementById("watermark")?.remove()
        }
        ),
        T
    }
    function h(T) {
        const C = document.createElement("div");
        C.id = "generate-button",
        Vt(C, {
            padding: T ? "8px 16px" : "10px 20px",
            background: Ze.button.gradient,
            borderRadius: "999px",
            border: "none",
            gap: "6px",
            cursor: "pointer",
            marginLeft: T ? "12px" : "0",
            whiteSpace: "nowrap",
            width: T ? "auto" : "100%"
        }),
        pu(C);
        const w = document.createElement("img");
        w.src = ph.generate,
        Vt(w, {
            width: "16px",
            height: "16px",
            flexShrink: "0"
        });
        const B = document.createElement("span");
        return B.textContent = Jc().button,
        Vt(B, {
            color: Ze.colors.white,
            fontFamily: Ze.font.family,
            fontSize: Ze.font.size.button,
            fontWeight: Ze.font.weight,
            lineHeight: Ze.font.lineHeight
        }),
        C.append(w, B),
        C.addEventListener("click", q => {
            q.stopPropagation(),
            o("watermark_create_button_click")
        }
        ),
        C
    }
    function p() {
        const T = document.createElement("img");
        return T.src = Vn.watermarkLogo,
        Vt(T, {
            width: "92px",
            height: "auto",
            paddingLeft: "8px",
            flexShrink: "0"
        }),
        T
    }
    function y(T) {
        const C = Jc()
          , w = document.createElement("div");
        w.textContent = C.prefix,
        gu(w);
        const B = p()
          , q = document.createElement("div");
        q.textContent = C.suffix,
        gu(q, "12px"),
        T.append(w, B, q, h(!0))
    }
    function g(T) {
        const C = Jc()
          , w = document.createElement("div");
        pu(w),
        w.style.marginBottom = "4px";
        const B = document.createElement("div");
        B.textContent = C.prefix,
        gu(B, "6px"),
        w.append(B, p());
        const q = document.createElement("div");
        q.textContent = C.suffix,
        gu(q),
        Vt(q, {
            textAlign: "center",
            marginBottom: "12px"
        }),
        T.append(w, q, h(!1))
    }
    function E() {
        const T = ty()
          , C = document.createElement("div");
        return C.id = "watermark",
        Vt(C, {
            zIndex: Ze.zIndex,
            position: "fixed",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            width: T ? "fit-content" : "calc(100% - 32px)",
            maxWidth: T ? "none" : "100%",
            backgroundColor: Ze.colors.white,
            borderStyle: "solid",
            borderWidth: "1px",
            borderRadius: T ? "999px" : "36px",
            borderColor: Ze.colors.border,
            padding: T ? "12px 20px" : "16px",
            boxShadow: Ze.shadow,
            cursor: "pointer"
        }),
        pu(C, T ? "row" : "column"),
        C.appendChild(d()),
        T ? y(C) : g(C),
        C.addEventListener("click", w => {
            w.target.closest("#generate-button, #close-button") || o("watermark_create_button_click")
        }
        ),
        C
    }
    function v(T) {
        const C = document.getElementById("watermark");
        !C && !T ? (document.body.appendChild(E()),
        r(),
        ay()) : T && C && C.remove()
    }
    s(u).then(v)
}
ny();
var $c = {
    exports: {}
}
  , Bn = {};
var Sh;
function iy() {
    if (Sh)
        return Bn;
    Sh = 1;
    var c = Symbol.for("react.transitional.element")
      , u = Symbol.for("react.fragment");
    function s(r, o, d) {
        var h = null;
        if (d !== void 0 && (h = "" + d),
        o.key !== void 0 && (h = "" + o.key),
        "key"in o) {
            d = {};
            for (var p in o)
                p !== "key" && (d[p] = o[p])
        } else
            d = o;
        return o = d.ref,
        {
            $$typeof: c,
            type: r,
            key: h,
            ref: o !== void 0 ? o : null,
            props: d
        }
    }
    return Bn.Fragment = u,
    Bn.jsx = s,
    Bn.jsxs = s,
    Bn
}
var bh;
function uy() {
    return bh || (bh = 1,
    $c.exports = iy()),
    $c.exports
}
var H = uy()
  , kc = {
    exports: {}
}
  , I = {};
var xh;
function sy() {
    if (xh)
        return I;
    xh = 1;
    var c = Symbol.for("react.transitional.element")
      , u = Symbol.for("react.portal")
      , s = Symbol.for("react.fragment")
      , r = Symbol.for("react.strict_mode")
      , o = Symbol.for("react.profiler")
      , d = Symbol.for("react.consumer")
      , h = Symbol.for("react.context")
      , p = Symbol.for("react.forward_ref")
      , y = Symbol.for("react.suspense")
      , g = Symbol.for("react.memo")
      , E = Symbol.for("react.lazy")
      , v = Symbol.for("react.activity")
      , T = Symbol.iterator;
    function C(b) {
        return b === null || typeof b != "object" ? null : (b = T && b[T] || b["@@iterator"],
        typeof b == "function" ? b : null)
    }
    var w = {
        isMounted: function() {
            return !1
        },
        enqueueForceUpdate: function() {},
        enqueueReplaceState: function() {},
        enqueueSetState: function() {}
    }
      , B = Object.assign
      , q = {};
    function Z(b, U, G) {
        this.props = b,
        this.context = U,
        this.refs = q,
        this.updater = G || w
    }
    Z.prototype.isReactComponent = {},
    Z.prototype.setState = function(b, U) {
        if (typeof b != "object" && typeof b != "function" && b != null)
            throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, b, U, "setState")
    }
    ,
    Z.prototype.forceUpdate = function(b) {
        this.updater.enqueueForceUpdate(this, b, "forceUpdate")
    }
    ;
    function V() {}
    V.prototype = Z.prototype;
    function J(b, U, G) {
        this.props = b,
        this.context = U,
        this.refs = q,
        this.updater = G || w
    }
    var ae = J.prototype = new V;
    ae.constructor = J,
    B(ae, Z.prototype),
    ae.isPureReactComponent = !0;
    var re = Array.isArray;
    function ye() {}
    var W = {
        H: null,
        A: null,
        T: null,
        S: null
    }
      , ze = Object.prototype.hasOwnProperty;
    function Te(b, U, G) {
        var Q = G.ref;
        return {
            $$typeof: c,
            type: b,
            key: U,
            ref: Q !== void 0 ? Q : null,
            props: G
        }
    }
    function Ce(b, U) {
        return Te(b.type, U, b.props)
    }
    function xt(b) {
        return typeof b == "object" && b !== null && b.$$typeof === c
    }
    function Pe(b) {
        var U = {
            "=": "=0",
            ":": "=2"
        };
        return "$" + b.replace(/[=:]/g, function(G) {
            return U[G]
        })
    }
    var Ve = /\/+/g;
    function Me(b, U) {
        return typeof b == "object" && b !== null && b.key != null ? Pe("" + b.key) : U.toString(36)
    }
    function at(b) {
        switch (b.status) {
        case "fulfilled":
            return b.value;
        case "rejected":
            throw b.reason;
        default:
            switch (typeof b.status == "string" ? b.then(ye, ye) : (b.status = "pending",
            b.then(function(U) {
                b.status === "pending" && (b.status = "fulfilled",
                b.value = U)
            }, function(U) {
                b.status === "pending" && (b.status = "rejected",
                b.reason = U)
            })),
            b.status) {
            case "fulfilled":
                return b.value;
            case "rejected":
                throw b.reason
            }
        }
        throw b
    }
    function N(b, U, G, Q, ee) {
        var ne = typeof b;
        (ne === "undefined" || ne === "boolean") && (b = null);
        var pe = !1;
        if (b === null)
            pe = !0;
        else
            switch (ne) {
            case "bigint":
            case "string":
            case "number":
                pe = !0;
                break;
            case "object":
                switch (b.$$typeof) {
                case c:
                case u:
                    pe = !0;
                    break;
                case E:
                    return pe = b._init,
                    N(pe(b._payload), U, G, Q, ee)
                }
            }
        if (pe)
            return ee = ee(b),
            pe = Q === "" ? "." + Me(b, 0) : Q,
            re(ee) ? (G = "",
            pe != null && (G = pe.replace(Ve, "$&/") + "/"),
            N(ee, U, G, "", function(Xa) {
                return Xa
            })) : ee != null && (xt(ee) && (ee = Ce(ee, G + (ee.key == null || b && b.key === ee.key ? "" : ("" + ee.key).replace(Ve, "$&/") + "/") + pe)),
            U.push(ee)),
            1;
        pe = 0;
        var tt = Q === "" ? "." : Q + ":";
        if (re(b))
            for (var Ue = 0; Ue < b.length; Ue++)
                Q = b[Ue],
                ne = tt + Me(Q, Ue),
                pe += N(Q, U, G, ne, ee);
        else if (Ue = C(b),
        typeof Ue == "function")
            for (b = Ue.call(b),
            Ue = 0; !(Q = b.next()).done; )
                Q = Q.value,
                ne = tt + Me(Q, Ue++),
                pe += N(Q, U, G, ne, ee);
        else if (ne === "object") {
            if (typeof b.then == "function")
                return N(at(b), U, G, Q, ee);
            throw U = String(b),
            Error("Objects are not valid as a React child (found: " + (U === "[object Object]" ? "object with keys {" + Object.keys(b).join(", ") + "}" : U) + "). If you meant to render a collection of children, use an array instead.")
        }
        return pe
    }
    function Y(b, U, G) {
        if (b == null)
            return b;
        var Q = []
          , ee = 0;
        return N(b, Q, "", "", function(ne) {
            return U.call(G, ne, ee++)
        }),
        Q
    }
    function k(b) {
        if (b._status === -1) {
            var U = b._result;
            U = U(),
            U.then(function(G) {
                (b._status === 0 || b._status === -1) && (b._status = 1,
                b._result = G)
            }, function(G) {
                (b._status === 0 || b._status === -1) && (b._status = 2,
                b._result = G)
            }),
            b._status === -1 && (b._status = 0,
            b._result = U)
        }
        if (b._status === 1)
            return b._result.default;
        throw b._result
    }
    var fe = typeof reportError == "function" ? reportError : function(b) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
            var U = new window.ErrorEvent("error",{
                bubbles: !0,
                cancelable: !0,
                message: typeof b == "object" && b !== null && typeof b.message == "string" ? String(b.message) : String(b),
                error: b
            });
            if (!window.dispatchEvent(U))
                return
        } else if (typeof process == "object" && typeof process.emit == "function") {
            process.emit("uncaughtException", b);
            return
        }
        console.error(b)
    }
      , ge = {
        map: Y,
        forEach: function(b, U, G) {
            Y(b, function() {
                U.apply(this, arguments)
            }, G)
        },
        count: function(b) {
            var U = 0;
            return Y(b, function() {
                U++
            }),
            U
        },
        toArray: function(b) {
            return Y(b, function(U) {
                return U
            }) || []
        },
        only: function(b) {
            if (!xt(b))
                throw Error("React.Children.only expected to receive a single React element child.");
            return b
        }
    };
    return I.Activity = v,
    I.Children = ge,
    I.Component = Z,
    I.Fragment = s,
    I.Profiler = o,
    I.PureComponent = J,
    I.StrictMode = r,
    I.Suspense = y,
    I.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = W,
    I.__COMPILER_RUNTIME = {
        __proto__: null,
        c: function(b) {
            return W.H.useMemoCache(b)
        }
    },
    I.cache = function(b) {
        return function() {
            return b.apply(null, arguments)
        }
    }
    ,
    I.cacheSignal = function() {
        return null
    }
    ,
    I.cloneElement = function(b, U, G) {
        if (b == null)
            throw Error("The argument must be a React element, but you passed " + b + ".");
        var Q = B({}, b.props)
          , ee = b.key;
        if (U != null)
            for (ne in U.key !== void 0 && (ee = "" + U.key),
            U)
                !ze.call(U, ne) || ne === "key" || ne === "__self" || ne === "__source" || ne === "ref" && U.ref === void 0 || (Q[ne] = U[ne]);
        var ne = arguments.length - 2;
        if (ne === 1)
            Q.children = G;
        else if (1 < ne) {
            for (var pe = Array(ne), tt = 0; tt < ne; tt++)
                pe[tt] = arguments[tt + 2];
            Q.children = pe
        }
        return Te(b.type, ee, Q)
    }
    ,
    I.createContext = function(b) {
        return b = {
            $$typeof: h,
            _currentValue: b,
            _currentValue2: b,
            _threadCount: 0,
            Provider: null,
            Consumer: null
        },
        b.Provider = b,
        b.Consumer = {
            $$typeof: d,
            _context: b
        },
        b
    }
    ,
    I.createElement = function(b, U, G) {
        var Q, ee = {}, ne = null;
        if (U != null)
            for (Q in U.key !== void 0 && (ne = "" + U.key),
            U)
                ze.call(U, Q) && Q !== "key" && Q !== "__self" && Q !== "__source" && (ee[Q] = U[Q]);
        var pe = arguments.length - 2;
        if (pe === 1)
            ee.children = G;
        else if (1 < pe) {
            for (var tt = Array(pe), Ue = 0; Ue < pe; Ue++)
                tt[Ue] = arguments[Ue + 2];
            ee.children = tt
        }
        if (b && b.defaultProps)
            for (Q in pe = b.defaultProps,
            pe)
                ee[Q] === void 0 && (ee[Q] = pe[Q]);
        return Te(b, ne, ee)
    }
    ,
    I.createRef = function() {
        return {
            current: null
        }
    }
    ,
    I.forwardRef = function(b) {
        return {
            $$typeof: p,
            render: b
        }
    }
    ,
    I.isValidElement = xt,
    I.lazy = function(b) {
        return {
            $$typeof: E,
            _payload: {
                _status: -1,
                _result: b
            },
            _init: k
        }
    }
    ,
    I.memo = function(b, U) {
        return {
            $$typeof: g,
            type: b,
            compare: U === void 0 ? null : U
        }
    }
    ,
    I.startTransition = function(b) {
        var U = W.T
          , G = {};
        W.T = G;
        try {
            var Q = b()
              , ee = W.S;
            ee !== null && ee(G, Q),
            typeof Q == "object" && Q !== null && typeof Q.then == "function" && Q.then(ye, fe)
        } catch (ne) {
            fe(ne)
        } finally {
            U !== null && G.types !== null && (U.types = G.types),
            W.T = U
        }
    }
    ,
    I.unstable_useCacheRefresh = function() {
        return W.H.useCacheRefresh()
    }
    ,
    I.use = function(b) {
        return W.H.use(b)
    }
    ,
    I.useActionState = function(b, U, G) {
        return W.H.useActionState(b, U, G)
    }
    ,
    I.useCallback = function(b, U) {
        return W.H.useCallback(b, U)
    }
    ,
    I.useContext = function(b) {
        return W.H.useContext(b)
    }
    ,
    I.useDebugValue = function() {}
    ,
    I.useDeferredValue = function(b, U) {
        return W.H.useDeferredValue(b, U)
    }
    ,
    I.useEffect = function(b, U) {
        return W.H.useEffect(b, U)
    }
    ,
    I.useEffectEvent = function(b) {
        return W.H.useEffectEvent(b)
    }
    ,
    I.useId = function() {
        return W.H.useId()
    }
    ,
    I.useImperativeHandle = function(b, U, G) {
        return W.H.useImperativeHandle(b, U, G)
    }
    ,
    I.useInsertionEffect = function(b, U) {
        return W.H.useInsertionEffect(b, U)
    }
    ,
    I.useLayoutEffect = function(b, U) {
        return W.H.useLayoutEffect(b, U)
    }
    ,
    I.useMemo = function(b, U) {
        return W.H.useMemo(b, U)
    }
    ,
    I.useOptimistic = function(b, U) {
        return W.H.useOptimistic(b, U)
    }
    ,
    I.useReducer = function(b, U, G) {
        return W.H.useReducer(b, U, G)
    }
    ,
    I.useRef = function(b) {
        return W.H.useRef(b)
    }
    ,
    I.useState = function(b) {
        return W.H.useState(b)
    }
    ,
    I.useSyncExternalStore = function(b, U, G) {
        return W.H.useSyncExternalStore(b, U, G)
    }
    ,
    I.useTransition = function() {
        return W.H.useTransition()
    }
    ,
    I.version = "19.2.3",
    I
}
var Eh;
function sr() {
    return Eh || (Eh = 1,
    kc.exports = sy()),
    kc.exports
}
var D = sr();
const P = c => typeof c == "string"
  , qn = () => {
    let c, u;
    const s = new Promise( (r, o) => {
        c = r,
        u = o
    }
    );
    return s.resolve = c,
    s.reject = u,
    s
}
  , Oh = c => c == null ? "" : "" + c
  , cy = (c, u, s) => {
    c.forEach(r => {
        u[r] && (s[r] = u[r])
    }
    )
}
  , ry = /###/g
  , Th = c => c && c.indexOf("###") > -1 ? c.replace(ry, ".") : c
  , Rh = c => !c || P(c)
  , Xn = (c, u, s) => {
    const r = P(u) ? u.split(".") : u;
    let o = 0;
    for (; o < r.length - 1; ) {
        if (Rh(c))
            return {};
        const d = Th(r[o]);
        !c[d] && s && (c[d] = new s),
        Object.prototype.hasOwnProperty.call(c, d) ? c = c[d] : c = {},
        ++o
    }
    return Rh(c) ? {} : {
        obj: c,
        k: Th(r[o])
    }
}
  , Ah = (c, u, s) => {
    const {obj: r, k: o} = Xn(c, u, Object);
    if (r !== void 0 || u.length === 1) {
        r[o] = s;
        return
    }
    let d = u[u.length - 1]
      , h = u.slice(0, u.length - 1)
      , p = Xn(c, h, Object);
    for (; p.obj === void 0 && h.length; )
        d = `${h[h.length - 1]}.${d}`,
        h = h.slice(0, h.length - 1),
        p = Xn(c, h, Object),
        p?.obj && typeof p.obj[`${p.k}.${d}`] < "u" && (p.obj = void 0);
    p.obj[`${p.k}.${d}`] = s
}
  , oy = (c, u, s, r) => {
    const {obj: o, k: d} = Xn(c, u, Object);
    o[d] = o[d] || [],
    o[d].push(s)
}
  , xu = (c, u) => {
    const {obj: s, k: r} = Xn(c, u);
    if (s && Object.prototype.hasOwnProperty.call(s, r))
        return s[r]
}
  , fy = (c, u, s) => {
    const r = xu(c, s);
    return r !== void 0 ? r : xu(u, s)
}
  , lm = (c, u, s) => {
    for (const r in u)
        r !== "__proto__" && r !== "constructor" && (r in c ? P(c[r]) || c[r]instanceof String || P(u[r]) || u[r]instanceof String ? s && (c[r] = u[r]) : lm(c[r], u[r], s) : c[r] = u[r]);
    return c
}
  , Ya = c => c.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
var dy = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;"
};
const hy = c => P(c) ? c.replace(/[&<>"'\/]/g, u => dy[u]) : c;
class my {
    constructor(u) {
        this.capacity = u,
        this.regExpMap = new Map,
        this.regExpQueue = []
    }
    getRegExp(u) {
        const s = this.regExpMap.get(u);
        if (s !== void 0)
            return s;
        const r = new RegExp(u);
        return this.regExpQueue.length === this.capacity && this.regExpMap.delete(this.regExpQueue.shift()),
        this.regExpMap.set(u, r),
        this.regExpQueue.push(u),
        r
    }
}
const gy = [" ", ",", "?", "!", ";"]
  , py = new my(20)
  , yy = (c, u, s) => {
    u = u || "",
    s = s || "";
    const r = gy.filter(h => u.indexOf(h) < 0 && s.indexOf(h) < 0);
    if (r.length === 0)
        return !0;
    const o = py.getRegExp(`(${r.map(h => h === "?" ? "\\?" : h).join("|")})`);
    let d = !o.test(c);
    if (!d) {
        const h = c.indexOf(s);
        h > 0 && !o.test(c.substring(0, h)) && (d = !0)
    }
    return d
}
  , nr = (c, u, s=".") => {
    if (!c)
        return;
    if (c[u])
        return Object.prototype.hasOwnProperty.call(c, u) ? c[u] : void 0;
    const r = u.split(s);
    let o = c;
    for (let d = 0; d < r.length; ) {
        if (!o || typeof o != "object")
            return;
        let h, p = "";
        for (let y = d; y < r.length; ++y)
            if (y !== d && (p += s),
            p += r[y],
            h = o[p],
            h !== void 0) {
                if (["string", "number", "boolean"].indexOf(typeof h) > -1 && y < r.length - 1)
                    continue;
                d += y - d + 1;
                break
            }
        o = h
    }
    return o
}
  , Zn = c => c?.replace("_", "-")
  , vy = {
    type: "logger",
    log(c) {
        this.output("log", c)
    },
    warn(c) {
        this.output("warn", c)
    },
    error(c) {
        this.output("error", c)
    },
    output(c, u) {
        console?.[c]?.apply?.(console, u)
    }
};
class Eu {
    constructor(u, s={}) {
        this.init(u, s)
    }
    init(u, s={}) {
        this.prefix = s.prefix || "i18next:",
        this.logger = u || vy,
        this.options = s,
        this.debug = s.debug
    }
    log(...u) {
        return this.forward(u, "log", "", !0)
    }
    warn(...u) {
        return this.forward(u, "warn", "", !0)
    }
    error(...u) {
        return this.forward(u, "error", "")
    }
    deprecate(...u) {
        return this.forward(u, "warn", "WARNING DEPRECATED: ", !0)
    }
    forward(u, s, r, o) {
        return o && !this.debug ? null : (P(u[0]) && (u[0] = `${r}${this.prefix} ${u[0]}`),
        this.logger[s](u))
    }
    create(u) {
        return new Eu(this.logger,{
            prefix: `${this.prefix}:${u}:`,
            ...this.options
        })
    }
    clone(u) {
        return u = u || this.options,
        u.prefix = u.prefix || this.prefix,
        new Eu(this.logger,u)
    }
}
var Qt = new Eu;
class Ru {
    constructor() {
        this.observers = {}
    }
    on(u, s) {
        return u.split(" ").forEach(r => {
            this.observers[r] || (this.observers[r] = new Map);
            const o = this.observers[r].get(s) || 0;
            this.observers[r].set(s, o + 1)
        }
        ),
        this
    }
    off(u, s) {
        if (this.observers[u]) {
            if (!s) {
                delete this.observers[u];
                return
            }
            this.observers[u].delete(s)
        }
    }
    emit(u, ...s) {
        this.observers[u] && Array.from(this.observers[u].entries()).forEach( ([o,d]) => {
            for (let h = 0; h < d; h++)
                o(...s)
        }
        ),
        this.observers["*"] && Array.from(this.observers["*"].entries()).forEach( ([o,d]) => {
            for (let h = 0; h < d; h++)
                o.apply(o, [u, ...s])
        }
        )
    }
}
class zh extends Ru {
    constructor(u, s={
        ns: ["translation"],
        defaultNS: "translation"
    }) {
        super(),
        this.data = u || {},
        this.options = s,
        this.options.keySeparator === void 0 && (this.options.keySeparator = "."),
        this.options.ignoreJSONStructure === void 0 && (this.options.ignoreJSONStructure = !0)
    }
    addNamespaces(u) {
        this.options.ns.indexOf(u) < 0 && this.options.ns.push(u)
    }
    removeNamespaces(u) {
        const s = this.options.ns.indexOf(u);
        s > -1 && this.options.ns.splice(s, 1)
    }
    getResource(u, s, r, o={}) {
        const d = o.keySeparator !== void 0 ? o.keySeparator : this.options.keySeparator
          , h = o.ignoreJSONStructure !== void 0 ? o.ignoreJSONStructure : this.options.ignoreJSONStructure;
        let p;
        u.indexOf(".") > -1 ? p = u.split(".") : (p = [u, s],
        r && (Array.isArray(r) ? p.push(...r) : P(r) && d ? p.push(...r.split(d)) : p.push(r)));
        const y = xu(this.data, p);
        return !y && !s && !r && u.indexOf(".") > -1 && (u = p[0],
        s = p[1],
        r = p.slice(2).join(".")),
        y || !h || !P(r) ? y : nr(this.data?.[u]?.[s], r, d)
    }
    addResource(u, s, r, o, d={
        silent: !1
    }) {
        const h = d.keySeparator !== void 0 ? d.keySeparator : this.options.keySeparator;
        let p = [u, s];
        r && (p = p.concat(h ? r.split(h) : r)),
        u.indexOf(".") > -1 && (p = u.split("."),
        o = s,
        s = p[1]),
        this.addNamespaces(s),
        Ah(this.data, p, o),
        d.silent || this.emit("added", u, s, r, o)
    }
    addResources(u, s, r, o={
        silent: !1
    }) {
        for (const d in r)
            (P(r[d]) || Array.isArray(r[d])) && this.addResource(u, s, d, r[d], {
                silent: !0
            });
        o.silent || this.emit("added", u, s, r)
    }
    addResourceBundle(u, s, r, o, d, h={
        silent: !1,
        skipCopy: !1
    }) {
        let p = [u, s];
        u.indexOf(".") > -1 && (p = u.split("."),
        o = r,
        r = s,
        s = p[1]),
        this.addNamespaces(s);
        let y = xu(this.data, p) || {};
        h.skipCopy || (r = JSON.parse(JSON.stringify(r))),
        o ? lm(y, r, d) : y = {
            ...y,
            ...r
        },
        Ah(this.data, p, y),
        h.silent || this.emit("added", u, s, r)
    }
    removeResourceBundle(u, s) {
        this.hasResourceBundle(u, s) && delete this.data[u][s],
        this.removeNamespaces(s),
        this.emit("removed", u, s)
    }
    hasResourceBundle(u, s) {
        return this.getResource(u, s) !== void 0
    }
    getResourceBundle(u, s) {
        return s || (s = this.options.defaultNS),
        this.getResource(u, s)
    }
    getDataByLanguage(u) {
        return this.data[u]
    }
    hasLanguageSomeTranslations(u) {
        const s = this.getDataByLanguage(u);
        return !!(s && Object.keys(s) || []).find(o => s[o] && Object.keys(s[o]).length > 0)
    }
    toJSON() {
        return this.data
    }
}
var am = {
    processors: {},
    addPostProcessor(c) {
        this.processors[c.name] = c
    },
    handle(c, u, s, r, o) {
        return c.forEach(d => {
            u = this.processors[d]?.process(u, s, r, o) ?? u
        }
        ),
        u
    }
};
const nm = Symbol("i18next/PATH_KEY");
function Sy() {
    const c = []
      , u = Object.create(null);
    let s;
    return u.get = (r, o) => (s?.revoke?.(),
    o === nm ? c : (c.push(o),
    s = Proxy.revocable(r, u),
    s.proxy)),
    Proxy.revocable(Object.create(null), u).proxy
}
function ir(c, u) {
    const {[nm]: s} = c(Sy());
    return s.join(u?.keySeparator ?? ".")
}
const _h = {}
  , Ch = c => !P(c) && typeof c != "boolean" && typeof c != "number";
class Ou extends Ru {
    constructor(u, s={}) {
        super(),
        cy(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], u, this),
        this.options = s,
        this.options.keySeparator === void 0 && (this.options.keySeparator = "."),
        this.logger = Qt.create("translator")
    }
    changeLanguage(u) {
        u && (this.language = u)
    }
    exists(u, s={
        interpolation: {}
    }) {
        const r = {
            ...s
        };
        return u == null ? !1 : this.resolve(u, r)?.res !== void 0
    }
    extractFromKey(u, s) {
        let r = s.nsSeparator !== void 0 ? s.nsSeparator : this.options.nsSeparator;
        r === void 0 && (r = ":");
        const o = s.keySeparator !== void 0 ? s.keySeparator : this.options.keySeparator;
        let d = s.ns || this.options.defaultNS || [];
        const h = r && u.indexOf(r) > -1
          , p = !this.options.userDefinedKeySeparator && !s.keySeparator && !this.options.userDefinedNsSeparator && !s.nsSeparator && !yy(u, r, o);
        if (h && !p) {
            const y = u.match(this.interpolator.nestingRegexp);
            if (y && y.length > 0)
                return {
                    key: u,
                    namespaces: P(d) ? [d] : d
                };
            const g = u.split(r);
            (r !== o || r === o && this.options.ns.indexOf(g[0]) > -1) && (d = g.shift()),
            u = g.join(o)
        }
        return {
            key: u,
            namespaces: P(d) ? [d] : d
        }
    }
    translate(u, s, r) {
        let o = typeof s == "object" ? {
            ...s
        } : s;
        if (typeof o != "object" && this.options.overloadTranslationOptionHandler && (o = this.options.overloadTranslationOptionHandler(arguments)),
        typeof options == "object" && (o = {
            ...o
        }),
        o || (o = {}),
        u == null)
            return "";
        typeof u == "function" && (u = ir(u, o)),
        Array.isArray(u) || (u = [String(u)]);
        const d = o.returnDetails !== void 0 ? o.returnDetails : this.options.returnDetails
          , h = o.keySeparator !== void 0 ? o.keySeparator : this.options.keySeparator
          , {key: p, namespaces: y} = this.extractFromKey(u[u.length - 1], o)
          , g = y[y.length - 1];
        let E = o.nsSeparator !== void 0 ? o.nsSeparator : this.options.nsSeparator;
        E === void 0 && (E = ":");
        const v = o.lng || this.language
          , T = o.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
        if (v?.toLowerCase() === "cimode")
            return T ? d ? {
                res: `${g}${E}${p}`,
                usedKey: p,
                exactUsedKey: p,
                usedLng: v,
                usedNS: g,
                usedParams: this.getUsedParamsDetails(o)
            } : `${g}${E}${p}` : d ? {
                res: p,
                usedKey: p,
                exactUsedKey: p,
                usedLng: v,
                usedNS: g,
                usedParams: this.getUsedParamsDetails(o)
            } : p;
        const C = this.resolve(u, o);
        let w = C?.res;
        const B = C?.usedKey || p
          , q = C?.exactUsedKey || p
          , Z = ["[object Number]", "[object Function]", "[object RegExp]"]
          , V = o.joinArrays !== void 0 ? o.joinArrays : this.options.joinArrays
          , J = !this.i18nFormat || this.i18nFormat.handleAsObject
          , ae = o.count !== void 0 && !P(o.count)
          , re = Ou.hasDefaultValue(o)
          , ye = ae ? this.pluralResolver.getSuffix(v, o.count, o) : ""
          , W = o.ordinal && ae ? this.pluralResolver.getSuffix(v, o.count, {
            ordinal: !1
        }) : ""
          , ze = ae && !o.ordinal && o.count === 0
          , Te = ze && o[`defaultValue${this.options.pluralSeparator}zero`] || o[`defaultValue${ye}`] || o[`defaultValue${W}`] || o.defaultValue;
        let Ce = w;
        J && !w && re && (Ce = Te);
        const xt = Ch(Ce)
          , Pe = Object.prototype.toString.apply(Ce);
        if (J && Ce && xt && Z.indexOf(Pe) < 0 && !(P(V) && Array.isArray(Ce))) {
            if (!o.returnObjects && !this.options.returnObjects) {
                this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
                const Ve = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(B, Ce, {
                    ...o,
                    ns: y
                }) : `key '${p} (${this.language})' returned an object instead of string.`;
                return d ? (C.res = Ve,
                C.usedParams = this.getUsedParamsDetails(o),
                C) : Ve
            }
            if (h) {
                const Ve = Array.isArray(Ce)
                  , Me = Ve ? [] : {}
                  , at = Ve ? q : B;
                for (const N in Ce)
                    if (Object.prototype.hasOwnProperty.call(Ce, N)) {
                        const Y = `${at}${h}${N}`;
                        re && !w ? Me[N] = this.translate(Y, {
                            ...o,
                            defaultValue: Ch(Te) ? Te[N] : void 0,
                            joinArrays: !1,
                            ns: y
                        }) : Me[N] = this.translate(Y, {
                            ...o,
                            joinArrays: !1,
                            ns: y
                        }),
                        Me[N] === Y && (Me[N] = Ce[N])
                    }
                w = Me
            }
        } else if (J && P(V) && Array.isArray(w))
            w = w.join(V),
            w && (w = this.extendTranslation(w, u, o, r));
        else {
            let Ve = !1
              , Me = !1;
            !this.isValidLookup(w) && re && (Ve = !0,
            w = Te),
            this.isValidLookup(w) || (Me = !0,
            w = p);
            const N = (o.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && Me ? void 0 : w
              , Y = re && Te !== w && this.options.updateMissing;
            if (Me || Ve || Y) {
                if (this.logger.log(Y ? "updateKey" : "missingKey", v, g, p, Y ? Te : w),
                h) {
                    const b = this.resolve(p, {
                        ...o,
                        keySeparator: !1
                    });
                    b && b.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.")
                }
                let k = [];
                const fe = this.languageUtils.getFallbackCodes(this.options.fallbackLng, o.lng || this.language);
                if (this.options.saveMissingTo === "fallback" && fe && fe[0])
                    for (let b = 0; b < fe.length; b++)
                        k.push(fe[b]);
                else
                    this.options.saveMissingTo === "all" ? k = this.languageUtils.toResolveHierarchy(o.lng || this.language) : k.push(o.lng || this.language);
                const ge = (b, U, G) => {
                    const Q = re && G !== w ? G : N;
                    this.options.missingKeyHandler ? this.options.missingKeyHandler(b, g, U, Q, Y, o) : this.backendConnector?.saveMissing && this.backendConnector.saveMissing(b, g, U, Q, Y, o),
                    this.emit("missingKey", b, g, U, w)
                }
                ;
                this.options.saveMissing && (this.options.saveMissingPlurals && ae ? k.forEach(b => {
                    const U = this.pluralResolver.getSuffixes(b, o);
                    ze && o[`defaultValue${this.options.pluralSeparator}zero`] && U.indexOf(`${this.options.pluralSeparator}zero`) < 0 && U.push(`${this.options.pluralSeparator}zero`),
                    U.forEach(G => {
                        ge([b], p + G, o[`defaultValue${G}`] || Te)
                    }
                    )
                }
                ) : ge(k, p, Te))
            }
            w = this.extendTranslation(w, u, o, C, r),
            Me && w === p && this.options.appendNamespaceToMissingKey && (w = `${g}${E}${p}`),
            (Me || Ve) && this.options.parseMissingKeyHandler && (w = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${g}${E}${p}` : p, Ve ? w : void 0, o))
        }
        return d ? (C.res = w,
        C.usedParams = this.getUsedParamsDetails(o),
        C) : w
    }
    extendTranslation(u, s, r, o, d) {
        if (this.i18nFormat?.parse)
            u = this.i18nFormat.parse(u, {
                ...this.options.interpolation.defaultVariables,
                ...r
            }, r.lng || this.language || o.usedLng, o.usedNS, o.usedKey, {
                resolved: o
            });
        else if (!r.skipInterpolation) {
            r.interpolation && this.interpolator.init({
                ...r,
                interpolation: {
                    ...this.options.interpolation,
                    ...r.interpolation
                }
            });
            const y = P(u) && (r?.interpolation?.skipOnVariables !== void 0 ? r.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
            let g;
            if (y) {
                const v = u.match(this.interpolator.nestingRegexp);
                g = v && v.length
            }
            let E = r.replace && !P(r.replace) ? r.replace : r;
            if (this.options.interpolation.defaultVariables && (E = {
                ...this.options.interpolation.defaultVariables,
                ...E
            }),
            u = this.interpolator.interpolate(u, E, r.lng || this.language || o.usedLng, r),
            y) {
                const v = u.match(this.interpolator.nestingRegexp)
                  , T = v && v.length;
                g < T && (r.nest = !1)
            }
            !r.lng && o && o.res && (r.lng = this.language || o.usedLng),
            r.nest !== !1 && (u = this.interpolator.nest(u, (...v) => d?.[0] === v[0] && !r.context ? (this.logger.warn(`It seems you are nesting recursively key: ${v[0]} in key: ${s[0]}`),
            null) : this.translate(...v, s), r)),
            r.interpolation && this.interpolator.reset()
        }
        const h = r.postProcess || this.options.postProcess
          , p = P(h) ? [h] : h;
        return u != null && p?.length && r.applyPostProcessor !== !1 && (u = am.handle(p, u, s, this.options && this.options.postProcessPassResolved ? {
            i18nResolved: {
                ...o,
                usedParams: this.getUsedParamsDetails(r)
            },
            ...r
        } : r, this)),
        u
    }
    resolve(u, s={}) {
        let r, o, d, h, p;
        return P(u) && (u = [u]),
        u.forEach(y => {
            if (this.isValidLookup(r))
                return;
            const g = this.extractFromKey(y, s)
              , E = g.key;
            o = E;
            let v = g.namespaces;
            this.options.fallbackNS && (v = v.concat(this.options.fallbackNS));
            const T = s.count !== void 0 && !P(s.count)
              , C = T && !s.ordinal && s.count === 0
              , w = s.context !== void 0 && (P(s.context) || typeof s.context == "number") && s.context !== ""
              , B = s.lngs ? s.lngs : this.languageUtils.toResolveHierarchy(s.lng || this.language, s.fallbackLng);
            v.forEach(q => {
                this.isValidLookup(r) || (p = q,
                !_h[`${B[0]}-${q}`] && this.utils?.hasLoadedNamespace && !this.utils?.hasLoadedNamespace(p) && (_h[`${B[0]}-${q}`] = !0,
                this.logger.warn(`key "${o}" for languages "${B.join(", ")}" won't get resolved as namespace "${p}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")),
                B.forEach(Z => {
                    if (this.isValidLookup(r))
                        return;
                    h = Z;
                    const V = [E];
                    if (this.i18nFormat?.addLookupKeys)
                        this.i18nFormat.addLookupKeys(V, E, Z, q, s);
                    else {
                        let ae;
                        T && (ae = this.pluralResolver.getSuffix(Z, s.count, s));
                        const re = `${this.options.pluralSeparator}zero`
                          , ye = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
                        if (T && (s.ordinal && ae.indexOf(ye) === 0 && V.push(E + ae.replace(ye, this.options.pluralSeparator)),
                        V.push(E + ae),
                        C && V.push(E + re)),
                        w) {
                            const W = `${E}${this.options.contextSeparator || "_"}${s.context}`;
                            V.push(W),
                            T && (s.ordinal && ae.indexOf(ye) === 0 && V.push(W + ae.replace(ye, this.options.pluralSeparator)),
                            V.push(W + ae),
                            C && V.push(W + re))
                        }
                    }
                    let J;
                    for (; J = V.pop(); )
                        this.isValidLookup(r) || (d = J,
                        r = this.getResource(Z, q, J, s))
                }
                ))
            }
            )
        }
        ),
        {
            res: r,
            usedKey: o,
            exactUsedKey: d,
            usedLng: h,
            usedNS: p
        }
    }
    isValidLookup(u) {
        return u !== void 0 && !(!this.options.returnNull && u === null) && !(!this.options.returnEmptyString && u === "")
    }
    getResource(u, s, r, o={}) {
        return this.i18nFormat?.getResource ? this.i18nFormat.getResource(u, s, r, o) : this.resourceStore.getResource(u, s, r, o)
    }
    getUsedParamsDetails(u={}) {
        const s = ["defaultValue", "ordinal", "context", "replace", "lng", "lngs", "fallbackLng", "ns", "keySeparator", "nsSeparator", "returnObjects", "returnDetails", "joinArrays", "postProcess", "interpolation"]
          , r = u.replace && !P(u.replace);
        let o = r ? u.replace : u;
        if (r && typeof u.count < "u" && (o.count = u.count),
        this.options.interpolation.defaultVariables && (o = {
            ...this.options.interpolation.defaultVariables,
            ...o
        }),
        !r) {
            o = {
                ...o
            };
            for (const d of s)
                delete o[d]
        }
        return o
    }
    static hasDefaultValue(u) {
        const s = "defaultValue";
        for (const r in u)
            if (Object.prototype.hasOwnProperty.call(u, r) && s === r.substring(0, s.length) && u[r] !== void 0)
                return !0;
        return !1
    }
}
class Nh {
    constructor(u) {
        this.options = u,
        this.supportedLngs = this.options.supportedLngs || !1,
        this.logger = Qt.create("languageUtils")
    }
    getScriptPartFromCode(u) {
        if (u = Zn(u),
        !u || u.indexOf("-") < 0)
            return null;
        const s = u.split("-");
        return s.length === 2 || (s.pop(),
        s[s.length - 1].toLowerCase() === "x") ? null : this.formatLanguageCode(s.join("-"))
    }
    getLanguagePartFromCode(u) {
        if (u = Zn(u),
        !u || u.indexOf("-") < 0)
            return u;
        const s = u.split("-");
        return this.formatLanguageCode(s[0])
    }
    formatLanguageCode(u) {
        if (P(u) && u.indexOf("-") > -1) {
            let s;
            try {
                s = Intl.getCanonicalLocales(u)[0]
            } catch {}
            return s && this.options.lowerCaseLng && (s = s.toLowerCase()),
            s || (this.options.lowerCaseLng ? u.toLowerCase() : u)
        }
        return this.options.cleanCode || this.options.lowerCaseLng ? u.toLowerCase() : u
    }
    isSupportedCode(u) {
        return (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) && (u = this.getLanguagePartFromCode(u)),
        !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(u) > -1
    }
    getBestMatchFromCodes(u) {
        if (!u)
            return null;
        let s;
        return u.forEach(r => {
            if (s)
                return;
            const o = this.formatLanguageCode(r);
            (!this.options.supportedLngs || this.isSupportedCode(o)) && (s = o)
        }
        ),
        !s && this.options.supportedLngs && u.forEach(r => {
            if (s)
                return;
            const o = this.getScriptPartFromCode(r);
            if (this.isSupportedCode(o))
                return s = o;
            const d = this.getLanguagePartFromCode(r);
            if (this.isSupportedCode(d))
                return s = d;
            s = this.options.supportedLngs.find(h => {
                if (h === d)
                    return h;
                if (!(h.indexOf("-") < 0 && d.indexOf("-") < 0) && (h.indexOf("-") > 0 && d.indexOf("-") < 0 && h.substring(0, h.indexOf("-")) === d || h.indexOf(d) === 0 && d.length > 1))
                    return h
            }
            )
        }
        ),
        s || (s = this.getFallbackCodes(this.options.fallbackLng)[0]),
        s
    }
    getFallbackCodes(u, s) {
        if (!u)
            return [];
        if (typeof u == "function" && (u = u(s)),
        P(u) && (u = [u]),
        Array.isArray(u))
            return u;
        if (!s)
            return u.default || [];
        let r = u[s];
        return r || (r = u[this.getScriptPartFromCode(s)]),
        r || (r = u[this.formatLanguageCode(s)]),
        r || (r = u[this.getLanguagePartFromCode(s)]),
        r || (r = u.default),
        r || []
    }
    toResolveHierarchy(u, s) {
        const r = this.getFallbackCodes((s === !1 ? [] : s) || this.options.fallbackLng || [], u)
          , o = []
          , d = h => {
            h && (this.isSupportedCode(h) ? o.push(h) : this.logger.warn(`rejecting language code not found in supportedLngs: ${h}`))
        }
        ;
        return P(u) && (u.indexOf("-") > -1 || u.indexOf("_") > -1) ? (this.options.load !== "languageOnly" && d(this.formatLanguageCode(u)),
        this.options.load !== "languageOnly" && this.options.load !== "currentOnly" && d(this.getScriptPartFromCode(u)),
        this.options.load !== "currentOnly" && d(this.getLanguagePartFromCode(u))) : P(u) && d(this.formatLanguageCode(u)),
        r.forEach(h => {
            o.indexOf(h) < 0 && d(this.formatLanguageCode(h))
        }
        ),
        o
    }
}
const Dh = {
    zero: 0,
    one: 1,
    two: 2,
    few: 3,
    many: 4,
    other: 5
}
  , Mh = {
    select: c => c === 1 ? "one" : "other",
    resolvedOptions: () => ({
        pluralCategories: ["one", "other"]
    })
};
class by {
    constructor(u, s={}) {
        this.languageUtils = u,
        this.options = s,
        this.logger = Qt.create("pluralResolver"),
        this.pluralRulesCache = {}
    }
    addRule(u, s) {
        this.rules[u] = s
    }
    clearCache() {
        this.pluralRulesCache = {}
    }
    getRule(u, s={}) {
        const r = Zn(u === "dev" ? "en" : u)
          , o = s.ordinal ? "ordinal" : "cardinal"
          , d = JSON.stringify({
            cleanedCode: r,
            type: o
        });
        if (d in this.pluralRulesCache)
            return this.pluralRulesCache[d];
        let h;
        try {
            h = new Intl.PluralRules(r,{
                type: o
            })
        } catch {
            if (!Intl)
                return this.logger.error("No Intl support, please use an Intl polyfill!"),
                Mh;
            if (!u.match(/-|_/))
                return Mh;
            const y = this.languageUtils.getLanguagePartFromCode(u);
            h = this.getRule(y, s)
        }
        return this.pluralRulesCache[d] = h,
        h
    }
    needsPlural(u, s={}) {
        let r = this.getRule(u, s);
        return r || (r = this.getRule("dev", s)),
        r?.resolvedOptions().pluralCategories.length > 1
    }
    getPluralFormsOfKey(u, s, r={}) {
        return this.getSuffixes(u, r).map(o => `${s}${o}`)
    }
    getSuffixes(u, s={}) {
        let r = this.getRule(u, s);
        return r || (r = this.getRule("dev", s)),
        r ? r.resolvedOptions().pluralCategories.sort( (o, d) => Dh[o] - Dh[d]).map(o => `${this.options.prepend}${s.ordinal ? `ordinal${this.options.prepend}` : ""}${o}`) : []
    }
    getSuffix(u, s, r={}) {
        const o = this.getRule(u, r);
        return o ? `${this.options.prepend}${r.ordinal ? `ordinal${this.options.prepend}` : ""}${o.select(s)}` : (this.logger.warn(`no plural rule found for: ${u}`),
        this.getSuffix("dev", s, r))
    }
}
const Uh = (c, u, s, r=".", o=!0) => {
    let d = fy(c, u, s);
    return !d && o && P(s) && (d = nr(c, s, r),
    d === void 0 && (d = nr(u, s, r))),
    d
}
  , Fc = c => c.replace(/\$/g, "$$$$");
class xy {
    constructor(u={}) {
        this.logger = Qt.create("interpolator"),
        this.options = u,
        this.format = u?.interpolation?.format || (s => s),
        this.init(u)
    }
    init(u={}) {
        u.interpolation || (u.interpolation = {
            escapeValue: !0
        });
        const {escape: s, escapeValue: r, useRawValueToEscape: o, prefix: d, prefixEscaped: h, suffix: p, suffixEscaped: y, formatSeparator: g, unescapeSuffix: E, unescapePrefix: v, nestingPrefix: T, nestingPrefixEscaped: C, nestingSuffix: w, nestingSuffixEscaped: B, nestingOptionsSeparator: q, maxReplaces: Z, alwaysFormat: V} = u.interpolation;
        this.escape = s !== void 0 ? s : hy,
        this.escapeValue = r !== void 0 ? r : !0,
        this.useRawValueToEscape = o !== void 0 ? o : !1,
        this.prefix = d ? Ya(d) : h || "{{",
        this.suffix = p ? Ya(p) : y || "}}",
        this.formatSeparator = g || ",",
        this.unescapePrefix = E ? "" : v || "-",
        this.unescapeSuffix = this.unescapePrefix ? "" : E || "",
        this.nestingPrefix = T ? Ya(T) : C || Ya("$t("),
        this.nestingSuffix = w ? Ya(w) : B || Ya(")"),
        this.nestingOptionsSeparator = q || ",",
        this.maxReplaces = Z || 1e3,
        this.alwaysFormat = V !== void 0 ? V : !1,
        this.resetRegExp()
    }
    reset() {
        this.options && this.init(this.options)
    }
    resetRegExp() {
        const u = (s, r) => s?.source === r ? (s.lastIndex = 0,
        s) : new RegExp(r,"g");
        this.regexp = u(this.regexp, `${this.prefix}(.+?)${this.suffix}`),
        this.regexpUnescape = u(this.regexpUnescape, `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`),
        this.nestingRegexp = u(this.nestingRegexp, `${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`)
    }
    interpolate(u, s, r, o) {
        let d, h, p;
        const y = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {}
          , g = C => {
            if (C.indexOf(this.formatSeparator) < 0) {
                const Z = Uh(s, y, C, this.options.keySeparator, this.options.ignoreJSONStructure);
                return this.alwaysFormat ? this.format(Z, void 0, r, {
                    ...o,
                    ...s,
                    interpolationkey: C
                }) : Z
            }
            const w = C.split(this.formatSeparator)
              , B = w.shift().trim()
              , q = w.join(this.formatSeparator).trim();
            return this.format(Uh(s, y, B, this.options.keySeparator, this.options.ignoreJSONStructure), q, r, {
                ...o,
                ...s,
                interpolationkey: B
            })
        }
        ;
        this.resetRegExp();
        const E = o?.missingInterpolationHandler || this.options.missingInterpolationHandler
          , v = o?.interpolation?.skipOnVariables !== void 0 ? o.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
        return [{
            regex: this.regexpUnescape,
            safeValue: C => Fc(C)
        }, {
            regex: this.regexp,
            safeValue: C => this.escapeValue ? Fc(this.escape(C)) : Fc(C)
        }].forEach(C => {
            for (p = 0; d = C.regex.exec(u); ) {
                const w = d[1].trim();
                if (h = g(w),
                h === void 0)
                    if (typeof E == "function") {
                        const q = E(u, d, o);
                        h = P(q) ? q : ""
                    } else if (o && Object.prototype.hasOwnProperty.call(o, w))
                        h = "";
                    else if (v) {
                        h = d[0];
                        continue
                    } else
                        this.logger.warn(`missed to pass in variable ${w} for interpolating ${u}`),
                        h = "";
                else
                    !P(h) && !this.useRawValueToEscape && (h = Oh(h));
                const B = C.safeValue(h);
                if (u = u.replace(d[0], B),
                v ? (C.regex.lastIndex += h.length,
                C.regex.lastIndex -= d[0].length) : C.regex.lastIndex = 0,
                p++,
                p >= this.maxReplaces)
                    break
            }
        }
        ),
        u
    }
    nest(u, s, r={}) {
        let o, d, h;
        const p = (y, g) => {
            const E = this.nestingOptionsSeparator;
            if (y.indexOf(E) < 0)
                return y;
            const v = y.split(new RegExp(`${E}[ ]*{`));
            let T = `{${v[1]}`;
            y = v[0],
            T = this.interpolate(T, h);
            const C = T.match(/'/g)
              , w = T.match(/"/g);
            ((C?.length ?? 0) % 2 === 0 && !w || w.length % 2 !== 0) && (T = T.replace(/'/g, '"'));
            try {
                h = JSON.parse(T),
                g && (h = {
                    ...g,
                    ...h
                })
            } catch (B) {
                return this.logger.warn(`failed parsing options string in nesting for key ${y}`, B),
                `${y}${E}${T}`
            }
            return h.defaultValue && h.defaultValue.indexOf(this.prefix) > -1 && delete h.defaultValue,
            y
        }
        ;
        for (; o = this.nestingRegexp.exec(u); ) {
            let y = [];
            h = {
                ...r
            },
            h = h.replace && !P(h.replace) ? h.replace : h,
            h.applyPostProcessor = !1,
            delete h.defaultValue;
            const g = /{.*}/.test(o[1]) ? o[1].lastIndexOf("}") + 1 : o[1].indexOf(this.formatSeparator);
            if (g !== -1 && (y = o[1].slice(g).split(this.formatSeparator).map(E => E.trim()).filter(Boolean),
            o[1] = o[1].slice(0, g)),
            d = s(p.call(this, o[1].trim(), h), h),
            d && o[0] === u && !P(d))
                return d;
            P(d) || (d = Oh(d)),
            d || (this.logger.warn(`missed to resolve ${o[1]} for nesting ${u}`),
            d = ""),
            y.length && (d = y.reduce( (E, v) => this.format(E, v, r.lng, {
                ...r,
                interpolationkey: o[1].trim()
            }), d.trim())),
            u = u.replace(o[0], d),
            this.regexp.lastIndex = 0
        }
        return u
    }
}
const Ey = c => {
    let u = c.toLowerCase().trim();
    const s = {};
    if (c.indexOf("(") > -1) {
        const r = c.split("(");
        u = r[0].toLowerCase().trim();
        const o = r[1].substring(0, r[1].length - 1);
        u === "currency" && o.indexOf(":") < 0 ? s.currency || (s.currency = o.trim()) : u === "relativetime" && o.indexOf(":") < 0 ? s.range || (s.range = o.trim()) : o.split(";").forEach(h => {
            if (h) {
                const [p,...y] = h.split(":")
                  , g = y.join(":").trim().replace(/^'+|'+$/g, "")
                  , E = p.trim();
                s[E] || (s[E] = g),
                g === "false" && (s[E] = !1),
                g === "true" && (s[E] = !0),
                isNaN(g) || (s[E] = parseInt(g, 10))
            }
        }
        )
    }
    return {
        formatName: u,
        formatOptions: s
    }
}
  , Lh = c => {
    const u = {};
    return (s, r, o) => {
        let d = o;
        o && o.interpolationkey && o.formatParams && o.formatParams[o.interpolationkey] && o[o.interpolationkey] && (d = {
            ...d,
            [o.interpolationkey]: void 0
        });
        const h = r + JSON.stringify(d);
        let p = u[h];
        return p || (p = c(Zn(r), o),
        u[h] = p),
        p(s)
    }
}
  , Oy = c => (u, s, r) => c(Zn(s), r)(u);
class Ty {
    constructor(u={}) {
        this.logger = Qt.create("formatter"),
        this.options = u,
        this.init(u)
    }
    init(u, s={
        interpolation: {}
    }) {
        this.formatSeparator = s.interpolation.formatSeparator || ",";
        const r = s.cacheInBuiltFormats ? Lh : Oy;
        this.formats = {
            number: r( (o, d) => {
                const h = new Intl.NumberFormat(o,{
                    ...d
                });
                return p => h.format(p)
            }
            ),
            currency: r( (o, d) => {
                const h = new Intl.NumberFormat(o,{
                    ...d,
                    style: "currency"
                });
                return p => h.format(p)
            }
            ),
            datetime: r( (o, d) => {
                const h = new Intl.DateTimeFormat(o,{
                    ...d
                });
                return p => h.format(p)
            }
            ),
            relativetime: r( (o, d) => {
                const h = new Intl.RelativeTimeFormat(o,{
                    ...d
                });
                return p => h.format(p, d.range || "day")
            }
            ),
            list: r( (o, d) => {
                const h = new Intl.ListFormat(o,{
                    ...d
                });
                return p => h.format(p)
            }
            )
        }
    }
    add(u, s) {
        this.formats[u.toLowerCase().trim()] = s
    }
    addCached(u, s) {
        this.formats[u.toLowerCase().trim()] = Lh(s)
    }
    format(u, s, r, o={}) {
        const d = s.split(this.formatSeparator);
        if (d.length > 1 && d[0].indexOf("(") > 1 && d[0].indexOf(")") < 0 && d.find(p => p.indexOf(")") > -1)) {
            const p = d.findIndex(y => y.indexOf(")") > -1);
            d[0] = [d[0], ...d.splice(1, p)].join(this.formatSeparator)
        }
        return d.reduce( (p, y) => {
            const {formatName: g, formatOptions: E} = Ey(y);
            if (this.formats[g]) {
                let v = p;
                try {
                    const T = o?.formatParams?.[o.interpolationkey] || {}
                      , C = T.locale || T.lng || o.locale || o.lng || r;
                    v = this.formats[g](p, C, {
                        ...E,
                        ...o,
                        ...T
                    })
                } catch (T) {
                    this.logger.warn(T)
                }
                return v
            } else
                this.logger.warn(`there was no format function for ${g}`);
            return p
        }
        , u)
    }
}
const Ry = (c, u) => {
    c.pending[u] !== void 0 && (delete c.pending[u],
    c.pendingCount--)
}
;
class Ay extends Ru {
    constructor(u, s, r, o={}) {
        super(),
        this.backend = u,
        this.store = s,
        this.services = r,
        this.languageUtils = r.languageUtils,
        this.options = o,
        this.logger = Qt.create("backendConnector"),
        this.waitingReads = [],
        this.maxParallelReads = o.maxParallelReads || 10,
        this.readingCalls = 0,
        this.maxRetries = o.maxRetries >= 0 ? o.maxRetries : 5,
        this.retryTimeout = o.retryTimeout >= 1 ? o.retryTimeout : 350,
        this.state = {},
        this.queue = [],
        this.backend?.init?.(r, o.backend, o)
    }
    queueLoad(u, s, r, o) {
        const d = {}
          , h = {}
          , p = {}
          , y = {};
        return u.forEach(g => {
            let E = !0;
            s.forEach(v => {
                const T = `${g}|${v}`;
                !r.reload && this.store.hasResourceBundle(g, v) ? this.state[T] = 2 : this.state[T] < 0 || (this.state[T] === 1 ? h[T] === void 0 && (h[T] = !0) : (this.state[T] = 1,
                E = !1,
                h[T] === void 0 && (h[T] = !0),
                d[T] === void 0 && (d[T] = !0),
                y[v] === void 0 && (y[v] = !0)))
            }
            ),
            E || (p[g] = !0)
        }
        ),
        (Object.keys(d).length || Object.keys(h).length) && this.queue.push({
            pending: h,
            pendingCount: Object.keys(h).length,
            loaded: {},
            errors: [],
            callback: o
        }),
        {
            toLoad: Object.keys(d),
            pending: Object.keys(h),
            toLoadLanguages: Object.keys(p),
            toLoadNamespaces: Object.keys(y)
        }
    }
    loaded(u, s, r) {
        const o = u.split("|")
          , d = o[0]
          , h = o[1];
        s && this.emit("failedLoading", d, h, s),
        !s && r && this.store.addResourceBundle(d, h, r, void 0, void 0, {
            skipCopy: !0
        }),
        this.state[u] = s ? -1 : 2,
        s && r && (this.state[u] = 0);
        const p = {};
        this.queue.forEach(y => {
            oy(y.loaded, [d], h),
            Ry(y, u),
            s && y.errors.push(s),
            y.pendingCount === 0 && !y.done && (Object.keys(y.loaded).forEach(g => {
                p[g] || (p[g] = {});
                const E = y.loaded[g];
                E.length && E.forEach(v => {
                    p[g][v] === void 0 && (p[g][v] = !0)
                }
                )
            }
            ),
            y.done = !0,
            y.errors.length ? y.callback(y.errors) : y.callback())
        }
        ),
        this.emit("loaded", p),
        this.queue = this.queue.filter(y => !y.done)
    }
    read(u, s, r, o=0, d=this.retryTimeout, h) {
        if (!u.length)
            return h(null, {});
        if (this.readingCalls >= this.maxParallelReads) {
            this.waitingReads.push({
                lng: u,
                ns: s,
                fcName: r,
                tried: o,
                wait: d,
                callback: h
            });
            return
        }
        this.readingCalls++;
        const p = (g, E) => {
            if (this.readingCalls--,
            this.waitingReads.length > 0) {
                const v = this.waitingReads.shift();
                this.read(v.lng, v.ns, v.fcName, v.tried, v.wait, v.callback)
            }
            if (g && E && o < this.maxRetries) {
                setTimeout( () => {
                    this.read.call(this, u, s, r, o + 1, d * 2, h)
                }
                , d);
                return
            }
            h(g, E)
        }
          , y = this.backend[r].bind(this.backend);
        if (y.length === 2) {
            try {
                const g = y(u, s);
                g && typeof g.then == "function" ? g.then(E => p(null, E)).catch(p) : p(null, g)
            } catch (g) {
                p(g)
            }
            return
        }
        return y(u, s, p)
    }
    prepareLoading(u, s, r={}, o) {
        if (!this.backend)
            return this.logger.warn("No backend was added via i18next.use. Will not load resources."),
            o && o();
        P(u) && (u = this.languageUtils.toResolveHierarchy(u)),
        P(s) && (s = [s]);
        const d = this.queueLoad(u, s, r, o);
        if (!d.toLoad.length)
            return d.pending.length || o(),
            null;
        d.toLoad.forEach(h => {
            this.loadOne(h)
        }
        )
    }
    load(u, s, r) {
        this.prepareLoading(u, s, {}, r)
    }
    reload(u, s, r) {
        this.prepareLoading(u, s, {
            reload: !0
        }, r)
    }
    loadOne(u, s="") {
        const r = u.split("|")
          , o = r[0]
          , d = r[1];
        this.read(o, d, "read", void 0, void 0, (h, p) => {
            h && this.logger.warn(`${s}loading namespace ${d} for language ${o} failed`, h),
            !h && p && this.logger.log(`${s}loaded namespace ${d} for language ${o}`, p),
            this.loaded(u, h, p)
        }
        )
    }
    saveMissing(u, s, r, o, d, h={}, p= () => {}
    ) {
        if (this.services?.utils?.hasLoadedNamespace && !this.services?.utils?.hasLoadedNamespace(s)) {
            this.logger.warn(`did not save key "${r}" as the namespace "${s}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
            return
        }
        if (!(r == null || r === "")) {
            if (this.backend?.create) {
                const y = {
                    ...h,
                    isUpdate: d
                }
                  , g = this.backend.create.bind(this.backend);
                if (g.length < 6)
                    try {
                        let E;
                        g.length === 5 ? E = g(u, s, r, o, y) : E = g(u, s, r, o),
                        E && typeof E.then == "function" ? E.then(v => p(null, v)).catch(p) : p(null, E)
                    } catch (E) {
                        p(E)
                    }
                else
                    g(u, s, r, o, p, y)
            }
            !u || !u[0] || this.store.addResource(u[0], s, r, o)
        }
    }
}
const jh = () => ({
    debug: !1,
    initAsync: !0,
    ns: ["translation"],
    defaultNS: ["translation"],
    fallbackLng: ["dev"],
    fallbackNS: !1,
    supportedLngs: !1,
    nonExplicitSupportedLngs: !1,
    load: "all",
    preload: !1,
    simplifyPluralSuffix: !0,
    keySeparator: ".",
    nsSeparator: ":",
    pluralSeparator: "_",
    contextSeparator: "_",
    partialBundledLanguages: !1,
    saveMissing: !1,
    updateMissing: !1,
    saveMissingTo: "fallback",
    saveMissingPlurals: !0,
    missingKeyHandler: !1,
    missingInterpolationHandler: !1,
    postProcess: !1,
    postProcessPassResolved: !1,
    returnNull: !1,
    returnEmptyString: !0,
    returnObjects: !1,
    joinArrays: !1,
    returnedObjectHandler: !1,
    parseMissingKeyHandler: !1,
    appendNamespaceToMissingKey: !1,
    appendNamespaceToCIMode: !1,
    overloadTranslationOptionHandler: c => {
        let u = {};
        if (typeof c[1] == "object" && (u = c[1]),
        P(c[1]) && (u.defaultValue = c[1]),
        P(c[2]) && (u.tDescription = c[2]),
        typeof c[2] == "object" || typeof c[3] == "object") {
            const s = c[3] || c[2];
            Object.keys(s).forEach(r => {
                u[r] = s[r]
            }
            )
        }
        return u
    }
    ,
    interpolation: {
        escapeValue: !0,
        format: c => c,
        prefix: "{{",
        suffix: "}}",
        formatSeparator: ",",
        unescapePrefix: "-",
        nestingPrefix: "$t(",
        nestingSuffix: ")",
        nestingOptionsSeparator: ",",
        maxReplaces: 1e3,
        skipOnVariables: !0
    },
    cacheInBuiltFormats: !0
})
  , wh = c => (P(c.ns) && (c.ns = [c.ns]),
P(c.fallbackLng) && (c.fallbackLng = [c.fallbackLng]),
P(c.fallbackNS) && (c.fallbackNS = [c.fallbackNS]),
c.supportedLngs?.indexOf?.("cimode") < 0 && (c.supportedLngs = c.supportedLngs.concat(["cimode"])),
typeof c.initImmediate == "boolean" && (c.initAsync = c.initImmediate),
c)
  , yu = () => {}
  , zy = c => {
    Object.getOwnPropertyNames(Object.getPrototypeOf(c)).forEach(s => {
        typeof c[s] == "function" && (c[s] = c[s].bind(c))
    }
    )
}
;
class Kn extends Ru {
    constructor(u={}, s) {
        if (super(),
        this.options = wh(u),
        this.services = {},
        this.logger = Qt,
        this.modules = {
            external: []
        },
        zy(this),
        s && !this.isInitialized && !u.isClone) {
            if (!this.options.initAsync)
                return this.init(u, s),
                this;
            setTimeout( () => {
                this.init(u, s)
            }
            , 0)
        }
    }
    init(u={}, s) {
        this.isInitializing = !0,
        typeof u == "function" && (s = u,
        u = {}),
        u.defaultNS == null && u.ns && (P(u.ns) ? u.defaultNS = u.ns : u.ns.indexOf("translation") < 0 && (u.defaultNS = u.ns[0]));
        const r = jh();
        this.options = {
            ...r,
            ...this.options,
            ...wh(u)
        },
        this.options.interpolation = {
            ...r.interpolation,
            ...this.options.interpolation
        },
        u.keySeparator !== void 0 && (this.options.userDefinedKeySeparator = u.keySeparator),
        u.nsSeparator !== void 0 && (this.options.userDefinedNsSeparator = u.nsSeparator);
        const o = g => g ? typeof g == "function" ? new g : g : null;
        if (!this.options.isClone) {
            this.modules.logger ? Qt.init(o(this.modules.logger), this.options) : Qt.init(null, this.options);
            let g;
            this.modules.formatter ? g = this.modules.formatter : g = Ty;
            const E = new Nh(this.options);
            this.store = new zh(this.options.resources,this.options);
            const v = this.services;
            v.logger = Qt,
            v.resourceStore = this.store,
            v.languageUtils = E,
            v.pluralResolver = new by(E,{
                prepend: this.options.pluralSeparator,
                simplifyPluralSuffix: this.options.simplifyPluralSuffix
            }),
            this.options.interpolation.format && this.options.interpolation.format !== r.interpolation.format && this.logger.deprecate("init: you are still using the legacy format function, please use the new approach: https://www.i18next.com/translation-function/formatting"),
            g && (!this.options.interpolation.format || this.options.interpolation.format === r.interpolation.format) && (v.formatter = o(g),
            v.formatter.init && v.formatter.init(v, this.options),
            this.options.interpolation.format = v.formatter.format.bind(v.formatter)),
            v.interpolator = new xy(this.options),
            v.utils = {
                hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
            },
            v.backendConnector = new Ay(o(this.modules.backend),v.resourceStore,v,this.options),
            v.backendConnector.on("*", (C, ...w) => {
                this.emit(C, ...w)
            }
            ),
            this.modules.languageDetector && (v.languageDetector = o(this.modules.languageDetector),
            v.languageDetector.init && v.languageDetector.init(v, this.options.detection, this.options)),
            this.modules.i18nFormat && (v.i18nFormat = o(this.modules.i18nFormat),
            v.i18nFormat.init && v.i18nFormat.init(this)),
            this.translator = new Ou(this.services,this.options),
            this.translator.on("*", (C, ...w) => {
                this.emit(C, ...w)
            }
            ),
            this.modules.external.forEach(C => {
                C.init && C.init(this)
            }
            )
        }
        if (this.format = this.options.interpolation.format,
        s || (s = yu),
        this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
            const g = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
            g.length > 0 && g[0] !== "dev" && (this.options.lng = g[0])
        }
        !this.services.languageDetector && !this.options.lng && this.logger.warn("init: no languageDetector is used and no lng is defined"),
        ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"].forEach(g => {
            this[g] = (...E) => this.store[g](...E)
        }
        ),
        ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"].forEach(g => {
            this[g] = (...E) => (this.store[g](...E),
            this)
        }
        );
        const p = qn()
          , y = () => {
            const g = (E, v) => {
                this.isInitializing = !1,
                this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"),
                this.isInitialized = !0,
                this.options.isClone || this.logger.log("initialized", this.options),
                this.emit("initialized", this.options),
                p.resolve(v),
                s(E, v)
            }
            ;
            if (this.languages && !this.isInitialized)
                return g(null, this.t.bind(this));
            this.changeLanguage(this.options.lng, g)
        }
        ;
        return this.options.resources || !this.options.initAsync ? y() : setTimeout(y, 0),
        p
    }
    loadResources(u, s=yu) {
        let r = s;
        const o = P(u) ? u : this.language;
        if (typeof u == "function" && (r = u),
        !this.options.resources || this.options.partialBundledLanguages) {
            if (o?.toLowerCase() === "cimode" && (!this.options.preload || this.options.preload.length === 0))
                return r();
            const d = []
              , h = p => {
                if (!p || p === "cimode")
                    return;
                this.services.languageUtils.toResolveHierarchy(p).forEach(g => {
                    g !== "cimode" && d.indexOf(g) < 0 && d.push(g)
                }
                )
            }
            ;
            o ? h(o) : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach(y => h(y)),
            this.options.preload?.forEach?.(p => h(p)),
            this.services.backendConnector.load(d, this.options.ns, p => {
                !p && !this.resolvedLanguage && this.language && this.setResolvedLanguage(this.language),
                r(p)
            }
            )
        } else
            r(null)
    }
    reloadResources(u, s, r) {
        const o = qn();
        return typeof u == "function" && (r = u,
        u = void 0),
        typeof s == "function" && (r = s,
        s = void 0),
        u || (u = this.languages),
        s || (s = this.options.ns),
        r || (r = yu),
        this.services.backendConnector.reload(u, s, d => {
            o.resolve(),
            r(d)
        }
        ),
        o
    }
    use(u) {
        if (!u)
            throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
        if (!u.type)
            throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
        return u.type === "backend" && (this.modules.backend = u),
        (u.type === "logger" || u.log && u.warn && u.error) && (this.modules.logger = u),
        u.type === "languageDetector" && (this.modules.languageDetector = u),
        u.type === "i18nFormat" && (this.modules.i18nFormat = u),
        u.type === "postProcessor" && am.addPostProcessor(u),
        u.type === "formatter" && (this.modules.formatter = u),
        u.type === "3rdParty" && this.modules.external.push(u),
        this
    }
    setResolvedLanguage(u) {
        if (!(!u || !this.languages) && !(["cimode", "dev"].indexOf(u) > -1)) {
            for (let s = 0; s < this.languages.length; s++) {
                const r = this.languages[s];
                if (!(["cimode", "dev"].indexOf(r) > -1) && this.store.hasLanguageSomeTranslations(r)) {
                    this.resolvedLanguage = r;
                    break
                }
            }
            !this.resolvedLanguage && this.languages.indexOf(u) < 0 && this.store.hasLanguageSomeTranslations(u) && (this.resolvedLanguage = u,
            this.languages.unshift(u))
        }
    }
    changeLanguage(u, s) {
        this.isLanguageChangingTo = u;
        const r = qn();
        this.emit("languageChanging", u);
        const o = p => {
            this.language = p,
            this.languages = this.services.languageUtils.toResolveHierarchy(p),
            this.resolvedLanguage = void 0,
            this.setResolvedLanguage(p)
        }
          , d = (p, y) => {
            y ? this.isLanguageChangingTo === u && (o(y),
            this.translator.changeLanguage(y),
            this.isLanguageChangingTo = void 0,
            this.emit("languageChanged", y),
            this.logger.log("languageChanged", y)) : this.isLanguageChangingTo = void 0,
            r.resolve( (...g) => this.t(...g)),
            s && s(p, (...g) => this.t(...g))
        }
          , h = p => {
            !u && !p && this.services.languageDetector && (p = []);
            const y = P(p) ? p : p && p[0]
              , g = this.store.hasLanguageSomeTranslations(y) ? y : this.services.languageUtils.getBestMatchFromCodes(P(p) ? [p] : p);
            g && (this.language || o(g),
            this.translator.language || this.translator.changeLanguage(g),
            this.services.languageDetector?.cacheUserLanguage?.(g)),
            this.loadResources(g, E => {
                d(E, g)
            }
            )
        }
        ;
        return !u && this.services.languageDetector && !this.services.languageDetector.async ? h(this.services.languageDetector.detect()) : !u && this.services.languageDetector && this.services.languageDetector.async ? this.services.languageDetector.detect.length === 0 ? this.services.languageDetector.detect().then(h) : this.services.languageDetector.detect(h) : h(u),
        r
    }
    getFixedT(u, s, r) {
        const o = (d, h, ...p) => {
            let y;
            typeof h != "object" ? y = this.options.overloadTranslationOptionHandler([d, h].concat(p)) : y = {
                ...h
            },
            y.lng = y.lng || o.lng,
            y.lngs = y.lngs || o.lngs,
            y.ns = y.ns || o.ns,
            y.keyPrefix !== "" && (y.keyPrefix = y.keyPrefix || r || o.keyPrefix);
            const g = this.options.keySeparator || ".";
            let E;
            return y.keyPrefix && Array.isArray(d) ? E = d.map(v => (typeof v == "function" && (v = ir(v, h)),
            `${y.keyPrefix}${g}${v}`)) : (typeof d == "function" && (d = ir(d, h)),
            E = y.keyPrefix ? `${y.keyPrefix}${g}${d}` : d),
            this.t(E, y)
        }
        ;
        return P(u) ? o.lng = u : o.lngs = u,
        o.ns = s,
        o.keyPrefix = r,
        o
    }
    t(...u) {
        return this.translator?.translate(...u)
    }
    exists(...u) {
        return this.translator?.exists(...u)
    }
    setDefaultNamespace(u) {
        this.options.defaultNS = u
    }
    hasLoadedNamespace(u, s={}) {
        if (!this.isInitialized)
            return this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages),
            !1;
        if (!this.languages || !this.languages.length)
            return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages),
            !1;
        const r = s.lng || this.resolvedLanguage || this.languages[0]
          , o = this.options ? this.options.fallbackLng : !1
          , d = this.languages[this.languages.length - 1];
        if (r.toLowerCase() === "cimode")
            return !0;
        const h = (p, y) => {
            const g = this.services.backendConnector.state[`${p}|${y}`];
            return g === -1 || g === 0 || g === 2
        }
        ;
        if (s.precheck) {
            const p = s.precheck(this, h);
            if (p !== void 0)
                return p
        }
        return !!(this.hasResourceBundle(r, u) || !this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages || h(r, u) && (!o || h(d, u)))
    }
    loadNamespaces(u, s) {
        const r = qn();
        return this.options.ns ? (P(u) && (u = [u]),
        u.forEach(o => {
            this.options.ns.indexOf(o) < 0 && this.options.ns.push(o)
        }
        ),
        this.loadResources(o => {
            r.resolve(),
            s && s(o)
        }
        ),
        r) : (s && s(),
        Promise.resolve())
    }
    loadLanguages(u, s) {
        const r = qn();
        P(u) && (u = [u]);
        const o = this.options.preload || []
          , d = u.filter(h => o.indexOf(h) < 0 && this.services.languageUtils.isSupportedCode(h));
        return d.length ? (this.options.preload = o.concat(d),
        this.loadResources(h => {
            r.resolve(),
            s && s(h)
        }
        ),
        r) : (s && s(),
        Promise.resolve())
    }
    dir(u) {
        if (u || (u = this.resolvedLanguage || (this.languages?.length > 0 ? this.languages[0] : this.language)),
        !u)
            return "rtl";
        try {
            const o = new Intl.Locale(u);
            if (o && o.getTextInfo) {
                const d = o.getTextInfo();
                if (d && d.direction)
                    return d.direction
            }
        } catch {}
        const s = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"]
          , r = this.services?.languageUtils || new Nh(jh());
        return u.toLowerCase().indexOf("-latn") > 1 ? "ltr" : s.indexOf(r.getLanguagePartFromCode(u)) > -1 || u.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr"
    }
    static createInstance(u={}, s) {
        return new Kn(u,s)
    }
    cloneInstance(u={}, s=yu) {
        const r = u.forkResourceStore;
        r && delete u.forkResourceStore;
        const o = {
            ...this.options,
            ...u,
            isClone: !0
        }
          , d = new Kn(o);
        if ((u.debug !== void 0 || u.prefix !== void 0) && (d.logger = d.logger.clone(u)),
        ["store", "services", "language"].forEach(p => {
            d[p] = this[p]
        }
        ),
        d.services = {
            ...this.services
        },
        d.services.utils = {
            hasLoadedNamespace: d.hasLoadedNamespace.bind(d)
        },
        r) {
            const p = Object.keys(this.store.data).reduce( (y, g) => (y[g] = {
                ...this.store.data[g]
            },
            y[g] = Object.keys(y[g]).reduce( (E, v) => (E[v] = {
                ...y[g][v]
            },
            E), y[g]),
            y), {});
            d.store = new zh(p,o),
            d.services.resourceStore = d.store
        }
        return d.translator = new Ou(d.services,o),
        d.translator.on("*", (p, ...y) => {
            d.emit(p, ...y)
        }
        ),
        d.init(o, s),
        d.translator.options = o,
        d.translator.backendConnector.services.utils = {
            hasLoadedNamespace: d.hasLoadedNamespace.bind(d)
        },
        d
    }
    toJSON() {
        return {
            options: this.options,
            store: this.store,
            language: this.language,
            languages: this.languages,
            resolvedLanguage: this.resolvedLanguage
        }
    }
}
const et = Kn.createInstance();
et.createInstance = Kn.createInstance;
et.createInstance;
et.dir;
et.init;
et.loadResources;
et.reloadResources;
et.use;
et.changeLanguage;
et.getFixedT;
et.t;
et.exists;
et.setDefaultNamespace;
et.hasLoadedNamespace;
et.loadNamespaces;
et.loadLanguages;
const _y = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g
  , Cy = {
    "&amp;": "&",
    "&#38;": "&",
    "&lt;": "<",
    "&#60;": "<",
    "&gt;": ">",
    "&#62;": ">",
    "&apos;": "'",
    "&#39;": "'",
    "&quot;": '"',
    "&#34;": '"',
    "&nbsp;": " ",
    "&#160;": " ",
    "&copy;": "©",
    "&#169;": "©",
    "&reg;": "®",
    "&#174;": "®",
    "&hellip;": "…",
    "&#8230;": "…",
    "&#x2F;": "/",
    "&#47;": "/"
}
  , Ny = c => Cy[c]
  , Dy = c => c.replace(_y, Ny);
let Hh = {
    bindI18n: "languageChanged",
    bindI18nStore: "",
    transEmptyNodeValue: "",
    transSupportBasicHtmlNodes: !0,
    transWrapTextNodes: "",
    transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
    useSuspense: !0,
    unescape: Dy
};
const My = (c={}) => {
    Hh = {
        ...Hh,
        ...c
    }
}
  , Uy = {
    type: "3rdParty",
    init(c) {
        My(c.options.react)
    }
}
  , {slice: Ly, forEach: jy} = [];
function wy(c) {
    return jy.call(Ly.call(arguments, 1), u => {
        if (u)
            for (const s in u)
                c[s] === void 0 && (c[s] = u[s])
    }
    ),
    c
}
function Hy(c) {
    return typeof c != "string" ? !1 : [/<\s*script.*?>/i, /<\s*\/\s*script\s*>/i, /<\s*img.*?on\w+\s*=/i, /<\s*\w+\s*on\w+\s*=.*?>/i, /javascript\s*:/i, /vbscript\s*:/i, /expression\s*\(/i, /eval\s*\(/i, /alert\s*\(/i, /document\.cookie/i, /document\.write\s*\(/i, /window\.location/i, /innerHTML/i].some(s => s.test(c))
}
const Bh = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/
  , By = function(c, u) {
    const r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
        path: "/"
    }
      , o = encodeURIComponent(u);
    let d = `${c}=${o}`;
    if (r.maxAge > 0) {
        const h = r.maxAge - 0;
        if (Number.isNaN(h))
            throw new Error("maxAge should be a Number");
        d += `; Max-Age=${Math.floor(h)}`
    }
    if (r.domain) {
        if (!Bh.test(r.domain))
            throw new TypeError("option domain is invalid");
        d += `; Domain=${r.domain}`
    }
    if (r.path) {
        if (!Bh.test(r.path))
            throw new TypeError("option path is invalid");
        d += `; Path=${r.path}`
    }
    if (r.expires) {
        if (typeof r.expires.toUTCString != "function")
            throw new TypeError("option expires is invalid");
        d += `; Expires=${r.expires.toUTCString()}`
    }
    if (r.httpOnly && (d += "; HttpOnly"),
    r.secure && (d += "; Secure"),
    r.sameSite)
        switch (typeof r.sameSite == "string" ? r.sameSite.toLowerCase() : r.sameSite) {
        case !0:
            d += "; SameSite=Strict";
            break;
        case "lax":
            d += "; SameSite=Lax";
            break;
        case "strict":
            d += "; SameSite=Strict";
            break;
        case "none":
            d += "; SameSite=None";
            break;
        default:
            throw new TypeError("option sameSite is invalid")
        }
    return r.partitioned && (d += "; Partitioned"),
    d
}
  , qh = {
    create(c, u, s, r) {
        let o = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
            path: "/",
            sameSite: "strict"
        };
        s && (o.expires = new Date,
        o.expires.setTime(o.expires.getTime() + s * 60 * 1e3)),
        r && (o.domain = r),
        document.cookie = By(c, u, o)
    },
    read(c) {
        const u = `${c}=`
          , s = document.cookie.split(";");
        for (let r = 0; r < s.length; r++) {
            let o = s[r];
            for (; o.charAt(0) === " "; )
                o = o.substring(1, o.length);
            if (o.indexOf(u) === 0)
                return o.substring(u.length, o.length)
        }
        return null
    },
    remove(c, u) {
        this.create(c, "", -1, u)
    }
};
var qy = {
    name: "cookie",
    lookup(c) {
        let {lookupCookie: u} = c;
        if (u && typeof document < "u")
            return qh.read(u) || void 0
    },
    cacheUserLanguage(c, u) {
        let {lookupCookie: s, cookieMinutes: r, cookieDomain: o, cookieOptions: d} = u;
        s && typeof document < "u" && qh.create(s, c, r, o, d)
    }
}
  , Yy = {
    name: "querystring",
    lookup(c) {
        let {lookupQuerystring: u} = c, s;
        if (typeof window < "u") {
            let {search: r} = window.location;
            !window.location.search && window.location.hash?.indexOf("?") > -1 && (r = window.location.hash.substring(window.location.hash.indexOf("?")));
            const d = r.substring(1).split("&");
            for (let h = 0; h < d.length; h++) {
                const p = d[h].indexOf("=");
                p > 0 && d[h].substring(0, p) === u && (s = d[h].substring(p + 1))
            }
        }
        return s
    }
}
  , Gy = {
    name: "hash",
    lookup(c) {
        let {lookupHash: u, lookupFromHashIndex: s} = c, r;
        if (typeof window < "u") {
            const {hash: o} = window.location;
            if (o && o.length > 2) {
                const d = o.substring(1);
                if (u) {
                    const h = d.split("&");
                    for (let p = 0; p < h.length; p++) {
                        const y = h[p].indexOf("=");
                        y > 0 && h[p].substring(0, y) === u && (r = h[p].substring(y + 1))
                    }
                }
                if (r)
                    return r;
                if (!r && s > -1) {
                    const h = o.match(/\/([a-zA-Z-]*)/g);
                    return Array.isArray(h) ? h[typeof s == "number" ? s : 0]?.replace("/", "") : void 0
                }
            }
        }
        return r
    }
};
let Ga = null;
const Yh = () => {
    if (Ga !== null)
        return Ga;
    try {
        if (Ga = typeof window < "u" && window.localStorage !== null,
        !Ga)
            return !1;
        const c = "i18next.translate.boo";
        window.localStorage.setItem(c, "foo"),
        window.localStorage.removeItem(c)
    } catch {
        Ga = !1
    }
    return Ga
}
;
var Vy = {
    name: "localStorage",
    lookup(c) {
        let {lookupLocalStorage: u} = c;
        if (u && Yh())
            return window.localStorage.getItem(u) || void 0
    },
    cacheUserLanguage(c, u) {
        let {lookupLocalStorage: s} = u;
        s && Yh() && window.localStorage.setItem(s, c)
    }
};
let Va = null;
const Gh = () => {
    if (Va !== null)
        return Va;
    try {
        if (Va = typeof window < "u" && window.sessionStorage !== null,
        !Va)
            return !1;
        const c = "i18next.translate.boo";
        window.sessionStorage.setItem(c, "foo"),
        window.sessionStorage.removeItem(c)
    } catch {
        Va = !1
    }
    return Va
}
;
var Qy = {
    name: "sessionStorage",
    lookup(c) {
        let {lookupSessionStorage: u} = c;
        if (u && Gh())
            return window.sessionStorage.getItem(u) || void 0
    },
    cacheUserLanguage(c, u) {
        let {lookupSessionStorage: s} = u;
        s && Gh() && window.sessionStorage.setItem(s, c)
    }
}
  , Xy = {
    name: "navigator",
    lookup(c) {
        const u = [];
        if (typeof navigator < "u") {
            const {languages: s, userLanguage: r, language: o} = navigator;
            if (s)
                for (let d = 0; d < s.length; d++)
                    u.push(s[d]);
            r && u.push(r),
            o && u.push(o)
        }
        return u.length > 0 ? u : void 0
    }
}
  , Zy = {
    name: "htmlTag",
    lookup(c) {
        let {htmlTag: u} = c, s;
        const r = u || (typeof document < "u" ? document.documentElement : null);
        return r && typeof r.getAttribute == "function" && (s = r.getAttribute("lang")),
        s
    }
}
  , Ky = {
    name: "path",
    lookup(c) {
        let {lookupFromPathIndex: u} = c;
        if (typeof window > "u")
            return;
        const s = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
        return Array.isArray(s) ? s[typeof u == "number" ? u : 0]?.replace("/", "") : void 0
    }
}
  , Jy = {
    name: "subdomain",
    lookup(c) {
        let {lookupFromSubdomainIndex: u} = c;
        const s = typeof u == "number" ? u + 1 : 1
          , r = typeof window < "u" && window.location?.hostname?.match(/^(\w{2,5})\.(([a-z0-9-]{1,63}\.[a-z]{2,6})|localhost)/i);
        if (r)
            return r[s]
    }
};
let im = !1;
try {
    document.cookie,
    im = !0
} catch {}
const um = ["querystring", "cookie", "localStorage", "sessionStorage", "navigator", "htmlTag"];
im || um.splice(1, 1);
const $y = () => ({
    order: um,
    lookupQuerystring: "lng",
    lookupCookie: "i18next",
    lookupLocalStorage: "i18nextLng",
    lookupSessionStorage: "i18nextLng",
    caches: ["localStorage"],
    excludeCacheFor: ["cimode"],
    convertDetectedLanguage: c => c
});
class sm {
    constructor(u) {
        let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        this.type = "languageDetector",
        this.detectors = {},
        this.init(u, s)
    }
    init() {
        let u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
            languageUtils: {}
        }
          , s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
          , r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        this.services = u,
        this.options = wy(s, this.options || {}, $y()),
        typeof this.options.convertDetectedLanguage == "string" && this.options.convertDetectedLanguage.indexOf("15897") > -1 && (this.options.convertDetectedLanguage = o => o.replace("-", "_")),
        this.options.lookupFromUrlIndex && (this.options.lookupFromPathIndex = this.options.lookupFromUrlIndex),
        this.i18nOptions = r,
        this.addDetector(qy),
        this.addDetector(Yy),
        this.addDetector(Vy),
        this.addDetector(Qy),
        this.addDetector(Xy),
        this.addDetector(Zy),
        this.addDetector(Ky),
        this.addDetector(Jy),
        this.addDetector(Gy)
    }
    addDetector(u) {
        return this.detectors[u.name] = u,
        this
    }
    detect() {
        let u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.options.order
          , s = [];
        return u.forEach(r => {
            if (this.detectors[r]) {
                let o = this.detectors[r].lookup(this.options);
                o && typeof o == "string" && (o = [o]),
                o && (s = s.concat(o))
            }
        }
        ),
        s = s.filter(r => r != null && !Hy(r)).map(r => this.options.convertDetectedLanguage(r)),
        this.services && this.services.languageUtils && this.services.languageUtils.getBestMatchFromCodes ? s : s.length > 0 ? s[0] : null
    }
    cacheUserLanguage(u) {
        let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.options.caches;
        s && (this.options.excludeCacheFor && this.options.excludeCacheFor.indexOf(u) > -1 || s.forEach(r => {
            this.detectors[r] && this.detectors[r].cacheUserLanguage(u, this.options)
        }
        ))
    }
}
sm.type = "languageDetector";
const Vh = Object.assign({})
  , Qn = {};
Object.keys(Vh).forEach(c => {
    const u = c.match(/\.\/([^/]+)\/([^/]+)\.ts$/);
    if (u) {
        const [,s] = u
          , r = Vh[c];
        Qn[s] || (Qn[s] = {
            translation: {}
        }),
        r.default && (Qn[s].translation = {
            ...Qn[s].translation,
            ...r.default
        })
    }
}
);
et.use(sm).use(Uy).init({
    lng: "en",
    fallbackLng: "en",
    debug: !1,
    resources: Qn,
    interpolation: {
        escapeValue: !1
    }
});
var Wc = {
    exports: {}
}
  , Yn = {}
  , Pc = {
    exports: {}
}
  , Ic = {};
var Qh;
function ky() {
    return Qh || (Qh = 1,
    (function(c) {
        function u(N, Y) {
            var k = N.length;
            N.push(Y);
            e: for (; 0 < k; ) {
                var fe = k - 1 >>> 1
                  , ge = N[fe];
                if (0 < o(ge, Y))
                    N[fe] = Y,
                    N[k] = ge,
                    k = fe;
                else
                    break e
            }
        }
        function s(N) {
            return N.length === 0 ? null : N[0]
        }
        function r(N) {
            if (N.length === 0)
                return null;
            var Y = N[0]
              , k = N.pop();
            if (k !== Y) {
                N[0] = k;
                e: for (var fe = 0, ge = N.length, b = ge >>> 1; fe < b; ) {
                    var U = 2 * (fe + 1) - 1
                      , G = N[U]
                      , Q = U + 1
                      , ee = N[Q];
                    if (0 > o(G, k))
                        Q < ge && 0 > o(ee, G) ? (N[fe] = ee,
                        N[Q] = k,
                        fe = Q) : (N[fe] = G,
                        N[U] = k,
                        fe = U);
                    else if (Q < ge && 0 > o(ee, k))
                        N[fe] = ee,
                        N[Q] = k,
                        fe = Q;
                    else
                        break e
                }
            }
            return Y
        }
        function o(N, Y) {
            var k = N.sortIndex - Y.sortIndex;
            return k !== 0 ? k : N.id - Y.id
        }
        if (c.unstable_now = void 0,
        typeof performance == "object" && typeof performance.now == "function") {
            var d = performance;
            c.unstable_now = function() {
                return d.now()
            }
        } else {
            var h = Date
              , p = h.now();
            c.unstable_now = function() {
                return h.now() - p
            }
        }
        var y = []
          , g = []
          , E = 1
          , v = null
          , T = 3
          , C = !1
          , w = !1
          , B = !1
          , q = !1
          , Z = typeof setTimeout == "function" ? setTimeout : null
          , V = typeof clearTimeout == "function" ? clearTimeout : null
          , J = typeof setImmediate < "u" ? setImmediate : null;
        function ae(N) {
            for (var Y = s(g); Y !== null; ) {
                if (Y.callback === null)
                    r(g);
                else if (Y.startTime <= N)
                    r(g),
                    Y.sortIndex = Y.expirationTime,
                    u(y, Y);
                else
                    break;
                Y = s(g)
            }
        }
        function re(N) {
            if (B = !1,
            ae(N),
            !w)
                if (s(y) !== null)
                    w = !0,
                    ye || (ye = !0,
                    Pe());
                else {
                    var Y = s(g);
                    Y !== null && at(re, Y.startTime - N)
                }
        }
        var ye = !1
          , W = -1
          , ze = 5
          , Te = -1;
        function Ce() {
            return q ? !0 : !(c.unstable_now() - Te < ze)
        }
        function xt() {
            if (q = !1,
            ye) {
                var N = c.unstable_now();
                Te = N;
                var Y = !0;
                try {
                    e: {
                        w = !1,
                        B && (B = !1,
                        V(W),
                        W = -1),
                        C = !0;
                        var k = T;
                        try {
                            t: {
                                for (ae(N),
                                v = s(y); v !== null && !(v.expirationTime > N && Ce()); ) {
                                    var fe = v.callback;
                                    if (typeof fe == "function") {
                                        v.callback = null,
                                        T = v.priorityLevel;
                                        var ge = fe(v.expirationTime <= N);
                                        if (N = c.unstable_now(),
                                        typeof ge == "function") {
                                            v.callback = ge,
                                            ae(N),
                                            Y = !0;
                                            break t
                                        }
                                        v === s(y) && r(y),
                                        ae(N)
                                    } else
                                        r(y);
                                    v = s(y)
                                }
                                if (v !== null)
                                    Y = !0;
                                else {
                                    var b = s(g);
                                    b !== null && at(re, b.startTime - N),
                                    Y = !1
                                }
                            }
                            break e
                        } finally {
                            v = null,
                            T = k,
                            C = !1
                        }
                        Y = void 0
                    }
                } finally {
                    Y ? Pe() : ye = !1
                }
            }
        }
        var Pe;
        if (typeof J == "function")
            Pe = function() {
                J(xt)
            }
            ;
        else if (typeof MessageChannel < "u") {
            var Ve = new MessageChannel
              , Me = Ve.port2;
            Ve.port1.onmessage = xt,
            Pe = function() {
                Me.postMessage(null)
            }
        } else
            Pe = function() {
                Z(xt, 0)
            }
            ;
        function at(N, Y) {
            W = Z(function() {
                N(c.unstable_now())
            }, Y)
        }
        c.unstable_IdlePriority = 5,
        c.unstable_ImmediatePriority = 1,
        c.unstable_LowPriority = 4,
        c.unstable_NormalPriority = 3,
        c.unstable_Profiling = null,
        c.unstable_UserBlockingPriority = 2,
        c.unstable_cancelCallback = function(N) {
            N.callback = null
        }
        ,
        c.unstable_forceFrameRate = function(N) {
            0 > N || 125 < N ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : ze = 0 < N ? Math.floor(1e3 / N) : 5
        }
        ,
        c.unstable_getCurrentPriorityLevel = function() {
            return T
        }
        ,
        c.unstable_next = function(N) {
            switch (T) {
            case 1:
            case 2:
            case 3:
                var Y = 3;
                break;
            default:
                Y = T
            }
            var k = T;
            T = Y;
            try {
                return N()
            } finally {
                T = k
            }
        }
        ,
        c.unstable_requestPaint = function() {
            q = !0
        }
        ,
        c.unstable_runWithPriority = function(N, Y) {
            switch (N) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            default:
                N = 3
            }
            var k = T;
            T = N;
            try {
                return Y()
            } finally {
                T = k
            }
        }
        ,
        c.unstable_scheduleCallback = function(N, Y, k) {
            var fe = c.unstable_now();
            switch (typeof k == "object" && k !== null ? (k = k.delay,
            k = typeof k == "number" && 0 < k ? fe + k : fe) : k = fe,
            N) {
            case 1:
                var ge = -1;
                break;
            case 2:
                ge = 250;
                break;
            case 5:
                ge = 1073741823;
                break;
            case 4:
                ge = 1e4;
                break;
            default:
                ge = 5e3
            }
            return ge = k + ge,
            N = {
                id: E++,
                callback: Y,
                priorityLevel: N,
                startTime: k,
                expirationTime: ge,
                sortIndex: -1
            },
            k > fe ? (N.sortIndex = k,
            u(g, N),
            s(y) === null && N === s(g) && (B ? (V(W),
            W = -1) : B = !0,
            at(re, k - fe))) : (N.sortIndex = ge,
            u(y, N),
            w || C || (w = !0,
            ye || (ye = !0,
            Pe()))),
            N
        }
        ,
        c.unstable_shouldYield = Ce,
        c.unstable_wrapCallback = function(N) {
            var Y = T;
            return function() {
                var k = T;
                T = Y;
                try {
                    return N.apply(this, arguments)
                } finally {
                    T = k
                }
            }
        }
    }
    )(Ic)),
    Ic
}
var Xh;
function Fy() {
    return Xh || (Xh = 1,
    Pc.exports = ky()),
    Pc.exports
}
var er = {
    exports: {}
}
  , Ie = {};
var Zh;
function Wy() {
    if (Zh)
        return Ie;
    Zh = 1;
    var c = sr();
    function u(y) {
        var g = "https://react.dev/errors/" + y;
        if (1 < arguments.length) {
            g += "?args[]=" + encodeURIComponent(arguments[1]);
            for (var E = 2; E < arguments.length; E++)
                g += "&args[]=" + encodeURIComponent(arguments[E])
        }
        return "Minified React error #" + y + "; visit " + g + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    }
    function s() {}
    var r = {
        d: {
            f: s,
            r: function() {
                throw Error(u(522))
            },
            D: s,
            C: s,
            L: s,
            m: s,
            X: s,
            S: s,
            M: s
        },
        p: 0,
        findDOMNode: null
    }
      , o = Symbol.for("react.portal");
    function d(y, g, E) {
        var v = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
        return {
            $$typeof: o,
            key: v == null ? null : "" + v,
            children: y,
            containerInfo: g,
            implementation: E
        }
    }
    var h = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function p(y, g) {
        if (y === "font")
            return "";
        if (typeof g == "string")
            return g === "use-credentials" ? g : ""
    }
    return Ie.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r,
    Ie.createPortal = function(y, g) {
        var E = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
        if (!g || g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)
            throw Error(u(299));
        return d(y, g, null, E)
    }
    ,
    Ie.flushSync = function(y) {
        var g = h.T
          , E = r.p;
        try {
            if (h.T = null,
            r.p = 2,
            y)
                return y()
        } finally {
            h.T = g,
            r.p = E,
            r.d.f()
        }
    }
    ,
    Ie.preconnect = function(y, g) {
        typeof y == "string" && (g ? (g = g.crossOrigin,
        g = typeof g == "string" ? g === "use-credentials" ? g : "" : void 0) : g = null,
        r.d.C(y, g))
    }
    ,
    Ie.prefetchDNS = function(y) {
        typeof y == "string" && r.d.D(y)
    }
    ,
    Ie.preinit = function(y, g) {
        if (typeof y == "string" && g && typeof g.as == "string") {
            var E = g.as
              , v = p(E, g.crossOrigin)
              , T = typeof g.integrity == "string" ? g.integrity : void 0
              , C = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
            E === "style" ? r.d.S(y, typeof g.precedence == "string" ? g.precedence : void 0, {
                crossOrigin: v,
                integrity: T,
                fetchPriority: C
            }) : E === "script" && r.d.X(y, {
                crossOrigin: v,
                integrity: T,
                fetchPriority: C,
                nonce: typeof g.nonce == "string" ? g.nonce : void 0
            })
        }
    }
    ,
    Ie.preinitModule = function(y, g) {
        if (typeof y == "string")
            if (typeof g == "object" && g !== null) {
                if (g.as == null || g.as === "script") {
                    var E = p(g.as, g.crossOrigin);
                    r.d.M(y, {
                        crossOrigin: E,
                        integrity: typeof g.integrity == "string" ? g.integrity : void 0,
                        nonce: typeof g.nonce == "string" ? g.nonce : void 0
                    })
                }
            } else
                g == null && r.d.M(y)
    }
    ,
    Ie.preload = function(y, g) {
        if (typeof y == "string" && typeof g == "object" && g !== null && typeof g.as == "string") {
            var E = g.as
              , v = p(E, g.crossOrigin);
            r.d.L(y, E, {
                crossOrigin: v,
                integrity: typeof g.integrity == "string" ? g.integrity : void 0,
                nonce: typeof g.nonce == "string" ? g.nonce : void 0,
                type: typeof g.type == "string" ? g.type : void 0,
                fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0,
                referrerPolicy: typeof g.referrerPolicy == "string" ? g.referrerPolicy : void 0,
                imageSrcSet: typeof g.imageSrcSet == "string" ? g.imageSrcSet : void 0,
                imageSizes: typeof g.imageSizes == "string" ? g.imageSizes : void 0,
                media: typeof g.media == "string" ? g.media : void 0
            })
        }
    }
    ,
    Ie.preloadModule = function(y, g) {
        if (typeof y == "string")
            if (g) {
                var E = p(g.as, g.crossOrigin);
                r.d.m(y, {
                    as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0,
                    crossOrigin: E,
                    integrity: typeof g.integrity == "string" ? g.integrity : void 0
                })
            } else
                r.d.m(y)
    }
    ,
    Ie.requestFormReset = function(y) {
        r.d.r(y)
    }
    ,
    Ie.unstable_batchedUpdates = function(y, g) {
        return y(g)
    }
    ,
    Ie.useFormState = function(y, g, E) {
        return h.H.useFormState(y, g, E)
    }
    ,
    Ie.useFormStatus = function() {
        return h.H.useHostTransitionStatus()
    }
    ,
    Ie.version = "19.2.3",
    Ie
}
var Kh;
function Py() {
    if (Kh)
        return er.exports;
    Kh = 1;
    function c() {
        if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
            try {
                __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c)
            } catch (u) {
                console.error(u)
            }
    }
    return c(),
    er.exports = Wy(),
    er.exports
}
var Jh;
function Iy() {
    if (Jh)
        return Yn;
    Jh = 1;
    var c = Fy()
      , u = sr()
      , s = Py();
    function r(e) {
        var t = "https://react.dev/errors/" + e;
        if (1 < arguments.length) {
            t += "?args[]=" + encodeURIComponent(arguments[1]);
            for (var l = 2; l < arguments.length; l++)
                t += "&args[]=" + encodeURIComponent(arguments[l])
        }
        return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    }
    function o(e) {
        return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
    }
    function d(e) {
        var t = e
          , l = e;
        if (e.alternate)
            for (; t.return; )
                t = t.return;
        else {
            e = t;
            do
                t = e,
                (t.flags & 4098) !== 0 && (l = t.return),
                e = t.return;
            while (e)
        }
        return t.tag === 3 ? l : null
    }
    function h(e) {
        if (e.tag === 13) {
            var t = e.memoizedState;
            if (t === null && (e = e.alternate,
            e !== null && (t = e.memoizedState)),
            t !== null)
                return t.dehydrated
        }
        return null
    }
    function p(e) {
        if (e.tag === 31) {
            var t = e.memoizedState;
            if (t === null && (e = e.alternate,
            e !== null && (t = e.memoizedState)),
            t !== null)
                return t.dehydrated
        }
        return null
    }
    function y(e) {
        if (d(e) !== e)
            throw Error(r(188))
    }
    function g(e) {
        var t = e.alternate;
        if (!t) {
            if (t = d(e),
            t === null)
                throw Error(r(188));
            return t !== e ? null : e
        }
        for (var l = e, a = t; ; ) {
            var n = l.return;
            if (n === null)
                break;
            var i = n.alternate;
            if (i === null) {
                if (a = n.return,
                a !== null) {
                    l = a;
                    continue
                }
                break
            }
            if (n.child === i.child) {
                for (i = n.child; i; ) {
                    if (i === l)
                        return y(n),
                        e;
                    if (i === a)
                        return y(n),
                        t;
                    i = i.sibling
                }
                throw Error(r(188))
            }
            if (l.return !== a.return)
                l = n,
                a = i;
            else {
                for (var f = !1, m = n.child; m; ) {
                    if (m === l) {
                        f = !0,
                        l = n,
                        a = i;
                        break
                    }
                    if (m === a) {
                        f = !0,
                        a = n,
                        l = i;
                        break
                    }
                    m = m.sibling
                }
                if (!f) {
                    for (m = i.child; m; ) {
                        if (m === l) {
                            f = !0,
                            l = i,
                            a = n;
                            break
                        }
                        if (m === a) {
                            f = !0,
                            a = i,
                            l = n;
                            break
                        }
                        m = m.sibling
                    }
                    if (!f)
                        throw Error(r(189))
                }
            }
            if (l.alternate !== a)
                throw Error(r(190))
        }
        if (l.tag !== 3)
            throw Error(r(188));
        return l.stateNode.current === l ? e : t
    }
    function E(e) {
        var t = e.tag;
        if (t === 5 || t === 26 || t === 27 || t === 6)
            return e;
        for (e = e.child; e !== null; ) {
            if (t = E(e),
            t !== null)
                return t;
            e = e.sibling
        }
        return null
    }
    var v = Object.assign
      , T = Symbol.for("react.element")
      , C = Symbol.for("react.transitional.element")
      , w = Symbol.for("react.portal")
      , B = Symbol.for("react.fragment")
      , q = Symbol.for("react.strict_mode")
      , Z = Symbol.for("react.profiler")
      , V = Symbol.for("react.consumer")
      , J = Symbol.for("react.context")
      , ae = Symbol.for("react.forward_ref")
      , re = Symbol.for("react.suspense")
      , ye = Symbol.for("react.suspense_list")
      , W = Symbol.for("react.memo")
      , ze = Symbol.for("react.lazy")
      , Te = Symbol.for("react.activity")
      , Ce = Symbol.for("react.memo_cache_sentinel")
      , xt = Symbol.iterator;
    function Pe(e) {
        return e === null || typeof e != "object" ? null : (e = xt && e[xt] || e["@@iterator"],
        typeof e == "function" ? e : null)
    }
    var Ve = Symbol.for("react.client.reference");
    function Me(e) {
        if (e == null)
            return null;
        if (typeof e == "function")
            return e.$$typeof === Ve ? null : e.displayName || e.name || null;
        if (typeof e == "string")
            return e;
        switch (e) {
        case B:
            return "Fragment";
        case Z:
            return "Profiler";
        case q:
            return "StrictMode";
        case re:
            return "Suspense";
        case ye:
            return "SuspenseList";
        case Te:
            return "Activity"
        }
        if (typeof e == "object")
            switch (e.$$typeof) {
            case w:
                return "Portal";
            case J:
                return e.displayName || "Context";
            case V:
                return (e._context.displayName || "Context") + ".Consumer";
            case ae:
                var t = e.render;
                return e = e.displayName,
                e || (e = t.displayName || t.name || "",
                e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"),
                e;
            case W:
                return t = e.displayName || null,
                t !== null ? t : Me(e.type) || "Memo";
            case ze:
                t = e._payload,
                e = e._init;
                try {
                    return Me(e(t))
                } catch {}
            }
        return null
    }
    var at = Array.isArray
      , N = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE
      , Y = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE
      , k = {
        pending: !1,
        data: null,
        method: null,
        action: null
    }
      , fe = []
      , ge = -1;
    function b(e) {
        return {
            current: e
        }
    }
    function U(e) {
        0 > ge || (e.current = fe[ge],
        fe[ge] = null,
        ge--)
    }
    function G(e, t) {
        ge++,
        fe[ge] = e.current,
        e.current = t
    }
    var Q = b(null)
      , ee = b(null)
      , ne = b(null)
      , pe = b(null);
    function tt(e, t) {
        switch (G(ne, t),
        G(ee, e),
        G(Q, null),
        t.nodeType) {
        case 9:
        case 11:
            e = (e = t.documentElement) && (e = e.namespaceURI) ? qd(e) : 0;
            break;
        default:
            if (e = t.tagName,
            t = t.namespaceURI)
                t = qd(t),
                e = Yd(t, e);
            else
                switch (e) {
                case "svg":
                    e = 1;
                    break;
                case "math":
                    e = 2;
                    break;
                default:
                    e = 0
                }
        }
        U(Q),
        G(Q, e)
    }
    function Ue() {
        U(Q),
        U(ee),
        U(ne)
    }
    function Xa(e) {
        e.memoizedState !== null && G(pe, e);
        var t = Q.current
          , l = Yd(t, e.type);
        t !== l && (G(ee, e),
        G(Q, l))
    }
    function Wn(e) {
        ee.current === e && (U(Q),
        U(ee)),
        pe.current === e && (U(pe),
        Ln._currentValue = k)
    }
    var Cu, hr;
    function Hl(e) {
        if (Cu === void 0)
            try {
                throw Error()
            } catch (l) {
                var t = l.stack.trim().match(/\n( *(at )?)/);
                Cu = t && t[1] || "",
                hr = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : ""
            }
        return `
` + Cu + e + hr
    }
    var Nu = !1;
    function Du(e, t) {
        if (!e || Nu)
            return "";
        Nu = !0;
        var l = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
            var a = {
                DetermineComponentFrameRoot: function() {
                    try {
                        if (t) {
                            var j = function() {
                                throw Error()
                            };
                            if (Object.defineProperty(j.prototype, "props", {
                                set: function() {
                                    throw Error()
                                }
                            }),
                            typeof Reflect == "object" && Reflect.construct) {
                                try {
                                    Reflect.construct(j, [])
                                } catch (_) {
                                    var z = _
                                }
                                Reflect.construct(e, [], j)
                            } else {
                                try {
                                    j.call()
                                } catch (_) {
                                    z = _
                                }
                                e.call(j.prototype)
                            }
                        } else {
                            try {
                                throw Error()
                            } catch (_) {
                                z = _
                            }
                            (j = e()) && typeof j.catch == "function" && j.catch(function() {})
                        }
                    } catch (_) {
                        if (_ && z && typeof _.stack == "string")
                            return [_.stack, z.stack]
                    }
                    return [null, null]
                }
            };
            a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
            var n = Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot, "name");
            n && n.configurable && Object.defineProperty(a.DetermineComponentFrameRoot, "name", {
                value: "DetermineComponentFrameRoot"
            });
            var i = a.DetermineComponentFrameRoot()
              , f = i[0]
              , m = i[1];
            if (f && m) {
                var S = f.split(`
`)
                  , A = m.split(`
`);
                for (n = a = 0; a < S.length && !S[a].includes("DetermineComponentFrameRoot"); )
                    a++;
                for (; n < A.length && !A[n].includes("DetermineComponentFrameRoot"); )
                    n++;
                if (a === S.length || n === A.length)
                    for (a = S.length - 1,
                    n = A.length - 1; 1 <= a && 0 <= n && S[a] !== A[n]; )
                        n--;
                for (; 1 <= a && 0 <= n; a--,
                n--)
                    if (S[a] !== A[n]) {
                        if (a !== 1 || n !== 1)
                            do
                                if (a--,
                                n--,
                                0 > n || S[a] !== A[n]) {
                                    var M = `
` + S[a].replace(" at new ", " at ");
                                    return e.displayName && M.includes("<anonymous>") && (M = M.replace("<anonymous>", e.displayName)),
                                    M
                                }
                            while (1 <= a && 0 <= n);
                        break
                    }
            }
        } finally {
            Nu = !1,
            Error.prepareStackTrace = l
        }
        return (l = e ? e.displayName || e.name : "") ? Hl(l) : ""
    }
    function Nm(e, t) {
        switch (e.tag) {
        case 26:
        case 27:
        case 5:
            return Hl(e.type);
        case 16:
            return Hl("Lazy");
        case 13:
            return e.child !== t && t !== null ? Hl("Suspense Fallback") : Hl("Suspense");
        case 19:
            return Hl("SuspenseList");
        case 0:
        case 15:
            return Du(e.type, !1);
        case 11:
            return Du(e.type.render, !1);
        case 1:
            return Du(e.type, !0);
        case 31:
            return Hl("Activity");
        default:
            return ""
        }
    }
    function mr(e) {
        try {
            var t = ""
              , l = null;
            do
                t += Nm(e, l),
                l = e,
                e = e.return;
            while (e);
            return t
        } catch (a) {
            return `
Error generating stack: ` + a.message + `
` + a.stack
        }
    }
    var Mu = Object.prototype.hasOwnProperty
      , Uu = c.unstable_scheduleCallback
      , Lu = c.unstable_cancelCallback
      , Dm = c.unstable_shouldYield
      , Mm = c.unstable_requestPaint
      , ft = c.unstable_now
      , Um = c.unstable_getCurrentPriorityLevel
      , gr = c.unstable_ImmediatePriority
      , pr = c.unstable_UserBlockingPriority
      , Pn = c.unstable_NormalPriority
      , Lm = c.unstable_LowPriority
      , yr = c.unstable_IdlePriority
      , jm = c.log
      , wm = c.unstable_setDisableYieldValue
      , Za = null
      , dt = null;
    function fl(e) {
        if (typeof jm == "function" && wm(e),
        dt && typeof dt.setStrictMode == "function")
            try {
                dt.setStrictMode(Za, e)
            } catch {}
    }
    var ht = Math.clz32 ? Math.clz32 : qm
      , Hm = Math.log
      , Bm = Math.LN2;
    function qm(e) {
        return e >>>= 0,
        e === 0 ? 32 : 31 - (Hm(e) / Bm | 0) | 0
    }
    var In = 256
      , ei = 262144
      , ti = 4194304;
    function Bl(e) {
        var t = e & 42;
        if (t !== 0)
            return t;
        switch (e & -e) {
        case 1:
            return 1;
        case 2:
            return 2;
        case 4:
            return 4;
        case 8:
            return 8;
        case 16:
            return 16;
        case 32:
            return 32;
        case 64:
            return 64;
        case 128:
            return 128;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
            return e & 261888;
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return e & 3932160;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
            return e & 62914560;
        case 67108864:
            return 67108864;
        case 134217728:
            return 134217728;
        case 268435456:
            return 268435456;
        case 536870912:
            return 536870912;
        case 1073741824:
            return 0;
        default:
            return e
        }
    }
    function li(e, t, l) {
        var a = e.pendingLanes;
        if (a === 0)
            return 0;
        var n = 0
          , i = e.suspendedLanes
          , f = e.pingedLanes;
        e = e.warmLanes;
        var m = a & 134217727;
        return m !== 0 ? (a = m & ~i,
        a !== 0 ? n = Bl(a) : (f &= m,
        f !== 0 ? n = Bl(f) : l || (l = m & ~e,
        l !== 0 && (n = Bl(l))))) : (m = a & ~i,
        m !== 0 ? n = Bl(m) : f !== 0 ? n = Bl(f) : l || (l = a & ~e,
        l !== 0 && (n = Bl(l)))),
        n === 0 ? 0 : t !== 0 && t !== n && (t & i) === 0 && (i = n & -n,
        l = t & -t,
        i >= l || i === 32 && (l & 4194048) !== 0) ? t : n
    }
    function Ka(e, t) {
        return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0
    }
    function Ym(e, t) {
        switch (e) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 64:
            return t + 250;
        case 16:
        case 32:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
            return -1;
        case 67108864:
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
            return -1;
        default:
            return -1
        }
    }
    function vr() {
        var e = ti;
        return ti <<= 1,
        (ti & 62914560) === 0 && (ti = 4194304),
        e
    }
    function ju(e) {
        for (var t = [], l = 0; 31 > l; l++)
            t.push(e);
        return t
    }
    function Ja(e, t) {
        e.pendingLanes |= t,
        t !== 268435456 && (e.suspendedLanes = 0,
        e.pingedLanes = 0,
        e.warmLanes = 0)
    }
    function Gm(e, t, l, a, n, i) {
        var f = e.pendingLanes;
        e.pendingLanes = l,
        e.suspendedLanes = 0,
        e.pingedLanes = 0,
        e.warmLanes = 0,
        e.expiredLanes &= l,
        e.entangledLanes &= l,
        e.errorRecoveryDisabledLanes &= l,
        e.shellSuspendCounter = 0;
        var m = e.entanglements
          , S = e.expirationTimes
          , A = e.hiddenUpdates;
        for (l = f & ~l; 0 < l; ) {
            var M = 31 - ht(l)
              , j = 1 << M;
            m[M] = 0,
            S[M] = -1;
            var z = A[M];
            if (z !== null)
                for (A[M] = null,
                M = 0; M < z.length; M++) {
                    var _ = z[M];
                    _ !== null && (_.lane &= -536870913)
                }
            l &= ~j
        }
        a !== 0 && Sr(e, a, 0),
        i !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= i & ~(f & ~t))
    }
    function Sr(e, t, l) {
        e.pendingLanes |= t,
        e.suspendedLanes &= ~t;
        var a = 31 - ht(t);
        e.entangledLanes |= t,
        e.entanglements[a] = e.entanglements[a] | 1073741824 | l & 261930
    }
    function br(e, t) {
        var l = e.entangledLanes |= t;
        for (e = e.entanglements; l; ) {
            var a = 31 - ht(l)
              , n = 1 << a;
            n & t | e[a] & t && (e[a] |= t),
            l &= ~n
        }
    }
    function xr(e, t) {
        var l = t & -t;
        return l = (l & 42) !== 0 ? 1 : wu(l),
        (l & (e.suspendedLanes | t)) !== 0 ? 0 : l
    }
    function wu(e) {
        switch (e) {
        case 2:
            e = 1;
            break;
        case 8:
            e = 4;
            break;
        case 32:
            e = 16;
            break;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
            e = 128;
            break;
        case 268435456:
            e = 134217728;
            break;
        default:
            e = 0
        }
        return e
    }
    function Hu(e) {
        return e &= -e,
        2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2
    }
    function Er() {
        var e = Y.p;
        return e !== 0 ? e : (e = window.event,
        e === void 0 ? 32 : rh(e.type))
    }
    function Or(e, t) {
        var l = Y.p;
        try {
            return Y.p = e,
            t()
        } finally {
            Y.p = l
        }
    }
    var dl = Math.random().toString(36).slice(2)
      , Ke = "__reactFiber$" + dl
      , nt = "__reactProps$" + dl
      , la = "__reactContainer$" + dl
      , Bu = "__reactEvents$" + dl
      , Vm = "__reactListeners$" + dl
      , Qm = "__reactHandles$" + dl
      , Tr = "__reactResources$" + dl
      , $a = "__reactMarker$" + dl;
    function qu(e) {
        delete e[Ke],
        delete e[nt],
        delete e[Bu],
        delete e[Vm],
        delete e[Qm]
    }
    function aa(e) {
        var t = e[Ke];
        if (t)
            return t;
        for (var l = e.parentNode; l; ) {
            if (t = l[la] || l[Ke]) {
                if (l = t.alternate,
                t.child !== null || l !== null && l.child !== null)
                    for (e = Jd(e); e !== null; ) {
                        if (l = e[Ke])
                            return l;
                        e = Jd(e)
                    }
                return t
            }
            e = l,
            l = e.parentNode
        }
        return null
    }
    function na(e) {
        if (e = e[Ke] || e[la]) {
            var t = e.tag;
            if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
                return e
        }
        return null
    }
    function ka(e) {
        var t = e.tag;
        if (t === 5 || t === 26 || t === 27 || t === 6)
            return e.stateNode;
        throw Error(r(33))
    }
    function ia(e) {
        var t = e[Tr];
        return t || (t = e[Tr] = {
            hoistableStyles: new Map,
            hoistableScripts: new Map
        }),
        t
    }
    function Qe(e) {
        e[$a] = !0
    }
    var Rr = new Set
      , Ar = {};
    function ql(e, t) {
        ua(e, t),
        ua(e + "Capture", t)
    }
    function ua(e, t) {
        for (Ar[e] = t,
        e = 0; e < t.length; e++)
            Rr.add(t[e])
    }
    var Xm = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$")
      , zr = {}
      , _r = {};
    function Zm(e) {
        return Mu.call(_r, e) ? !0 : Mu.call(zr, e) ? !1 : Xm.test(e) ? _r[e] = !0 : (zr[e] = !0,
        !1)
    }
    function ai(e, t, l) {
        if (Zm(t))
            if (l === null)
                e.removeAttribute(t);
            else {
                switch (typeof l) {
                case "undefined":
                case "function":
                case "symbol":
                    e.removeAttribute(t);
                    return;
                case "boolean":
                    var a = t.toLowerCase().slice(0, 5);
                    if (a !== "data-" && a !== "aria-") {
                        e.removeAttribute(t);
                        return
                    }
                }
                e.setAttribute(t, "" + l)
            }
    }
    function ni(e, t, l) {
        if (l === null)
            e.removeAttribute(t);
        else {
            switch (typeof l) {
            case "undefined":
            case "function":
            case "symbol":
            case "boolean":
                e.removeAttribute(t);
                return
            }
            e.setAttribute(t, "" + l)
        }
    }
    function Xt(e, t, l, a) {
        if (a === null)
            e.removeAttribute(l);
        else {
            switch (typeof a) {
            case "undefined":
            case "function":
            case "symbol":
            case "boolean":
                e.removeAttribute(l);
                return
            }
            e.setAttributeNS(t, l, "" + a)
        }
    }
    function Et(e) {
        switch (typeof e) {
        case "bigint":
        case "boolean":
        case "number":
        case "string":
        case "undefined":
            return e;
        case "object":
            return e;
        default:
            return ""
        }
    }
    function Cr(e) {
        var t = e.type;
        return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio")
    }
    function Km(e, t, l) {
        var a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
        if (!e.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
            var n = a.get
              , i = a.set;
            return Object.defineProperty(e, t, {
                configurable: !0,
                get: function() {
                    return n.call(this)
                },
                set: function(f) {
                    l = "" + f,
                    i.call(this, f)
                }
            }),
            Object.defineProperty(e, t, {
                enumerable: a.enumerable
            }),
            {
                getValue: function() {
                    return l
                },
                setValue: function(f) {
                    l = "" + f
                },
                stopTracking: function() {
                    e._valueTracker = null,
                    delete e[t]
                }
            }
        }
    }
    function Yu(e) {
        if (!e._valueTracker) {
            var t = Cr(e) ? "checked" : "value";
            e._valueTracker = Km(e, t, "" + e[t])
        }
    }
    function Nr(e) {
        if (!e)
            return !1;
        var t = e._valueTracker;
        if (!t)
            return !0;
        var l = t.getValue()
          , a = "";
        return e && (a = Cr(e) ? e.checked ? "true" : "false" : e.value),
        e = a,
        e !== l ? (t.setValue(e),
        !0) : !1
    }
    function ii(e) {
        if (e = e || (typeof document < "u" ? document : void 0),
        typeof e > "u")
            return null;
        try {
            return e.activeElement || e.body
        } catch {
            return e.body
        }
    }
    var Jm = /[\n"\\]/g;
    function Ot(e) {
        return e.replace(Jm, function(t) {
            return "\\" + t.charCodeAt(0).toString(16) + " "
        })
    }
    function Gu(e, t, l, a, n, i, f, m) {
        e.name = "",
        f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? e.type = f : e.removeAttribute("type"),
        t != null ? f === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Et(t)) : e.value !== "" + Et(t) && (e.value = "" + Et(t)) : f !== "submit" && f !== "reset" || e.removeAttribute("value"),
        t != null ? Vu(e, f, Et(t)) : l != null ? Vu(e, f, Et(l)) : a != null && e.removeAttribute("value"),
        n == null && i != null && (e.defaultChecked = !!i),
        n != null && (e.checked = n && typeof n != "function" && typeof n != "symbol"),
        m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" ? e.name = "" + Et(m) : e.removeAttribute("name")
    }
    function Dr(e, t, l, a, n, i, f, m) {
        if (i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (e.type = i),
        t != null || l != null) {
            if (!(i !== "submit" && i !== "reset" || t != null)) {
                Yu(e);
                return
            }
            l = l != null ? "" + Et(l) : "",
            t = t != null ? "" + Et(t) : l,
            m || t === e.value || (e.value = t),
            e.defaultValue = t
        }
        a = a ?? n,
        a = typeof a != "function" && typeof a != "symbol" && !!a,
        e.checked = m ? e.checked : !!a,
        e.defaultChecked = !!a,
        f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (e.name = f),
        Yu(e)
    }
    function Vu(e, t, l) {
        t === "number" && ii(e.ownerDocument) === e || e.defaultValue === "" + l || (e.defaultValue = "" + l)
    }
    function sa(e, t, l, a) {
        if (e = e.options,
        t) {
            t = {};
            for (var n = 0; n < l.length; n++)
                t["$" + l[n]] = !0;
            for (l = 0; l < e.length; l++)
                n = t.hasOwnProperty("$" + e[l].value),
                e[l].selected !== n && (e[l].selected = n),
                n && a && (e[l].defaultSelected = !0)
        } else {
            for (l = "" + Et(l),
            t = null,
            n = 0; n < e.length; n++) {
                if (e[n].value === l) {
                    e[n].selected = !0,
                    a && (e[n].defaultSelected = !0);
                    return
                }
                t !== null || e[n].disabled || (t = e[n])
            }
            t !== null && (t.selected = !0)
        }
    }
    function Mr(e, t, l) {
        if (t != null && (t = "" + Et(t),
        t !== e.value && (e.value = t),
        l == null)) {
            e.defaultValue !== t && (e.defaultValue = t);
            return
        }
        e.defaultValue = l != null ? "" + Et(l) : ""
    }
    function Ur(e, t, l, a) {
        if (t == null) {
            if (a != null) {
                if (l != null)
                    throw Error(r(92));
                if (at(a)) {
                    if (1 < a.length)
                        throw Error(r(93));
                    a = a[0]
                }
                l = a
            }
            l == null && (l = ""),
            t = l
        }
        l = Et(t),
        e.defaultValue = l,
        a = e.textContent,
        a === l && a !== "" && a !== null && (e.value = a),
        Yu(e)
    }
    function ca(e, t) {
        if (t) {
            var l = e.firstChild;
            if (l && l === e.lastChild && l.nodeType === 3) {
                l.nodeValue = t;
                return
            }
        }
        e.textContent = t
    }
    var $m = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
    function Lr(e, t, l) {
        var a = t.indexOf("--") === 0;
        l == null || typeof l == "boolean" || l === "" ? a ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : a ? e.setProperty(t, l) : typeof l != "number" || l === 0 || $m.has(t) ? t === "float" ? e.cssFloat = l : e[t] = ("" + l).trim() : e[t] = l + "px"
    }
    function jr(e, t, l) {
        if (t != null && typeof t != "object")
            throw Error(r(62));
        if (e = e.style,
        l != null) {
            for (var a in l)
                !l.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? e.setProperty(a, "") : a === "float" ? e.cssFloat = "" : e[a] = "");
            for (var n in t)
                a = t[n],
                t.hasOwnProperty(n) && l[n] !== a && Lr(e, n, a)
        } else
            for (var i in t)
                t.hasOwnProperty(i) && Lr(e, i, t[i])
    }
    function Qu(e) {
        if (e.indexOf("-") === -1)
            return !1;
        switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
            return !1;
        default:
            return !0
        }
    }
    var km = new Map([["acceptCharset", "accept-charset"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"], ["crossOrigin", "crossorigin"], ["accentHeight", "accent-height"], ["alignmentBaseline", "alignment-baseline"], ["arabicForm", "arabic-form"], ["baselineShift", "baseline-shift"], ["capHeight", "cap-height"], ["clipPath", "clip-path"], ["clipRule", "clip-rule"], ["colorInterpolation", "color-interpolation"], ["colorInterpolationFilters", "color-interpolation-filters"], ["colorProfile", "color-profile"], ["colorRendering", "color-rendering"], ["dominantBaseline", "dominant-baseline"], ["enableBackground", "enable-background"], ["fillOpacity", "fill-opacity"], ["fillRule", "fill-rule"], ["floodColor", "flood-color"], ["floodOpacity", "flood-opacity"], ["fontFamily", "font-family"], ["fontSize", "font-size"], ["fontSizeAdjust", "font-size-adjust"], ["fontStretch", "font-stretch"], ["fontStyle", "font-style"], ["fontVariant", "font-variant"], ["fontWeight", "font-weight"], ["glyphName", "glyph-name"], ["glyphOrientationHorizontal", "glyph-orientation-horizontal"], ["glyphOrientationVertical", "glyph-orientation-vertical"], ["horizAdvX", "horiz-adv-x"], ["horizOriginX", "horiz-origin-x"], ["imageRendering", "image-rendering"], ["letterSpacing", "letter-spacing"], ["lightingColor", "lighting-color"], ["markerEnd", "marker-end"], ["markerMid", "marker-mid"], ["markerStart", "marker-start"], ["overlinePosition", "overline-position"], ["overlineThickness", "overline-thickness"], ["paintOrder", "paint-order"], ["panose-1", "panose-1"], ["pointerEvents", "pointer-events"], ["renderingIntent", "rendering-intent"], ["shapeRendering", "shape-rendering"], ["stopColor", "stop-color"], ["stopOpacity", "stop-opacity"], ["strikethroughPosition", "strikethrough-position"], ["strikethroughThickness", "strikethrough-thickness"], ["strokeDasharray", "stroke-dasharray"], ["strokeDashoffset", "stroke-dashoffset"], ["strokeLinecap", "stroke-linecap"], ["strokeLinejoin", "stroke-linejoin"], ["strokeMiterlimit", "stroke-miterlimit"], ["strokeOpacity", "stroke-opacity"], ["strokeWidth", "stroke-width"], ["textAnchor", "text-anchor"], ["textDecoration", "text-decoration"], ["textRendering", "text-rendering"], ["transformOrigin", "transform-origin"], ["underlinePosition", "underline-position"], ["underlineThickness", "underline-thickness"], ["unicodeBidi", "unicode-bidi"], ["unicodeRange", "unicode-range"], ["unitsPerEm", "units-per-em"], ["vAlphabetic", "v-alphabetic"], ["vHanging", "v-hanging"], ["vIdeographic", "v-ideographic"], ["vMathematical", "v-mathematical"], ["vectorEffect", "vector-effect"], ["vertAdvY", "vert-adv-y"], ["vertOriginX", "vert-origin-x"], ["vertOriginY", "vert-origin-y"], ["wordSpacing", "word-spacing"], ["writingMode", "writing-mode"], ["xmlnsXlink", "xmlns:xlink"], ["xHeight", "x-height"]])
      , Fm = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function ui(e) {
        return Fm.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e
    }
    function Zt() {}
    var Xu = null;
    function Zu(e) {
        return e = e.target || e.srcElement || window,
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
    }
    var ra = null
      , oa = null;
    function wr(e) {
        var t = na(e);
        if (t && (e = t.stateNode)) {
            var l = e[nt] || null;
            e: switch (e = t.stateNode,
            t.type) {
            case "input":
                if (Gu(e, l.value, l.defaultValue, l.defaultValue, l.checked, l.defaultChecked, l.type, l.name),
                t = l.name,
                l.type === "radio" && t != null) {
                    for (l = e; l.parentNode; )
                        l = l.parentNode;
                    for (l = l.querySelectorAll('input[name="' + Ot("" + t) + '"][type="radio"]'),
                    t = 0; t < l.length; t++) {
                        var a = l[t];
                        if (a !== e && a.form === e.form) {
                            var n = a[nt] || null;
                            if (!n)
                                throw Error(r(90));
                            Gu(a, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name)
                        }
                    }
                    for (t = 0; t < l.length; t++)
                        a = l[t],
                        a.form === e.form && Nr(a)
                }
                break e;
            case "textarea":
                Mr(e, l.value, l.defaultValue);
                break e;
            case "select":
                t = l.value,
                t != null && sa(e, !!l.multiple, t, !1)
            }
        }
    }
    var Ku = !1;
    function Hr(e, t, l) {
        if (Ku)
            return e(t, l);
        Ku = !0;
        try {
            var a = e(t);
            return a
        } finally {
            if (Ku = !1,
            (ra !== null || oa !== null) && (Ji(),
            ra && (t = ra,
            e = oa,
            oa = ra = null,
            wr(t),
            e)))
                for (t = 0; t < e.length; t++)
                    wr(e[t])
        }
    }
    function Fa(e, t) {
        var l = e.stateNode;
        if (l === null)
            return null;
        var a = l[nt] || null;
        if (a === null)
            return null;
        l = a[t];
        e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
            (a = !a.disabled) || (e = e.type,
            a = !(e === "button" || e === "input" || e === "select" || e === "textarea")),
            e = !a;
            break e;
        default:
            e = !1
        }
        if (e)
            return null;
        if (l && typeof l != "function")
            throw Error(r(231, t, typeof l));
        return l
    }
    var Kt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u")
      , Ju = !1;
    if (Kt)
        try {
            var Wa = {};
            Object.defineProperty(Wa, "passive", {
                get: function() {
                    Ju = !0
                }
            }),
            window.addEventListener("test", Wa, Wa),
            window.removeEventListener("test", Wa, Wa)
        } catch {
            Ju = !1
        }
    var hl = null
      , $u = null
      , si = null;
    function Br() {
        if (si)
            return si;
        var e, t = $u, l = t.length, a, n = "value"in hl ? hl.value : hl.textContent, i = n.length;
        for (e = 0; e < l && t[e] === n[e]; e++)
            ;
        var f = l - e;
        for (a = 1; a <= f && t[l - a] === n[i - a]; a++)
            ;
        return si = n.slice(e, 1 < a ? 1 - a : void 0)
    }
    function ci(e) {
        var t = e.keyCode;
        return "charCode"in e ? (e = e.charCode,
        e === 0 && t === 13 && (e = 13)) : e = t,
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
    }
    function ri() {
        return !0
    }
    function qr() {
        return !1
    }
    function it(e) {
        function t(l, a, n, i, f) {
            this._reactName = l,
            this._targetInst = n,
            this.type = a,
            this.nativeEvent = i,
            this.target = f,
            this.currentTarget = null;
            for (var m in e)
                e.hasOwnProperty(m) && (l = e[m],
                this[m] = l ? l(i) : i[m]);
            return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? ri : qr,
            this.isPropagationStopped = qr,
            this
        }
        return v(t.prototype, {
            preventDefault: function() {
                this.defaultPrevented = !0;
                var l = this.nativeEvent;
                l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1),
                this.isDefaultPrevented = ri)
            },
            stopPropagation: function() {
                var l = this.nativeEvent;
                l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0),
                this.isPropagationStopped = ri)
            },
            persist: function() {},
            isPersistent: ri
        }),
        t
    }
    var Yl = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function(e) {
            return e.timeStamp || Date.now()
        },
        defaultPrevented: 0,
        isTrusted: 0
    }, oi = it(Yl), Pa = v({}, Yl, {
        view: 0,
        detail: 0
    }), Wm = it(Pa), ku, Fu, Ia, fi = v({}, Pa, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: Pu,
        button: 0,
        buttons: 0,
        relatedTarget: function(e) {
            return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
        },
        movementX: function(e) {
            return "movementX"in e ? e.movementX : (e !== Ia && (Ia && e.type === "mousemove" ? (ku = e.screenX - Ia.screenX,
            Fu = e.screenY - Ia.screenY) : Fu = ku = 0,
            Ia = e),
            ku)
        },
        movementY: function(e) {
            return "movementY"in e ? e.movementY : Fu
        }
    }), Yr = it(fi), Pm = v({}, fi, {
        dataTransfer: 0
    }), Im = it(Pm), eg = v({}, Pa, {
        relatedTarget: 0
    }), Wu = it(eg), tg = v({}, Yl, {
        animationName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    }), lg = it(tg), ag = v({}, Yl, {
        clipboardData: function(e) {
            return "clipboardData"in e ? e.clipboardData : window.clipboardData
        }
    }), ng = it(ag), ig = v({}, Yl, {
        data: 0
    }), Gr = it(ig), ug = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
    }, sg = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
    }, cg = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey"
    };
    function rg(e) {
        var t = this.nativeEvent;
        return t.getModifierState ? t.getModifierState(e) : (e = cg[e]) ? !!t[e] : !1
    }
    function Pu() {
        return rg
    }
    var og = v({}, Pa, {
        key: function(e) {
            if (e.key) {
                var t = ug[e.key] || e.key;
                if (t !== "Unidentified")
                    return t
            }
            return e.type === "keypress" ? (e = ci(e),
            e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? sg[e.keyCode] || "Unidentified" : ""
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: Pu,
        charCode: function(e) {
            return e.type === "keypress" ? ci(e) : 0
        },
        keyCode: function(e) {
            return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
        },
        which: function(e) {
            return e.type === "keypress" ? ci(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
        }
    })
      , fg = it(og)
      , dg = v({}, fi, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0
    })
      , Vr = it(dg)
      , hg = v({}, Pa, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: Pu
    })
      , mg = it(hg)
      , gg = v({}, Yl, {
        propertyName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    })
      , pg = it(gg)
      , yg = v({}, fi, {
        deltaX: function(e) {
            return "deltaX"in e ? e.deltaX : "wheelDeltaX"in e ? -e.wheelDeltaX : 0
        },
        deltaY: function(e) {
            return "deltaY"in e ? e.deltaY : "wheelDeltaY"in e ? -e.wheelDeltaY : "wheelDelta"in e ? -e.wheelDelta : 0
        },
        deltaZ: 0,
        deltaMode: 0
    })
      , vg = it(yg)
      , Sg = v({}, Yl, {
        newState: 0,
        oldState: 0
    })
      , bg = it(Sg)
      , xg = [9, 13, 27, 32]
      , Iu = Kt && "CompositionEvent"in window
      , en = null;
    Kt && "documentMode"in document && (en = document.documentMode);
    var Eg = Kt && "TextEvent"in window && !en
      , Qr = Kt && (!Iu || en && 8 < en && 11 >= en)
      , Xr = " "
      , Zr = !1;
    function Kr(e, t) {
        switch (e) {
        case "keyup":
            return xg.indexOf(t.keyCode) !== -1;
        case "keydown":
            return t.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
            return !0;
        default:
            return !1
        }
    }
    function Jr(e) {
        return e = e.detail,
        typeof e == "object" && "data"in e ? e.data : null
    }
    var fa = !1;
    function Og(e, t) {
        switch (e) {
        case "compositionend":
            return Jr(t);
        case "keypress":
            return t.which !== 32 ? null : (Zr = !0,
            Xr);
        case "textInput":
            return e = t.data,
            e === Xr && Zr ? null : e;
        default:
            return null
        }
    }
    function Tg(e, t) {
        if (fa)
            return e === "compositionend" || !Iu && Kr(e, t) ? (e = Br(),
            si = $u = hl = null,
            fa = !1,
            e) : null;
        switch (e) {
        case "paste":
            return null;
        case "keypress":
            if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
                if (t.char && 1 < t.char.length)
                    return t.char;
                if (t.which)
                    return String.fromCharCode(t.which)
            }
            return null;
        case "compositionend":
            return Qr && t.locale !== "ko" ? null : t.data;
        default:
            return null
        }
    }
    var Rg = {
        color: !0,
        date: !0,
        datetime: !0,
        "datetime-local": !0,
        email: !0,
        month: !0,
        number: !0,
        password: !0,
        range: !0,
        search: !0,
        tel: !0,
        text: !0,
        time: !0,
        url: !0,
        week: !0
    };
    function $r(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return t === "input" ? !!Rg[e.type] : t === "textarea"
    }
    function kr(e, t, l, a) {
        ra ? oa ? oa.push(a) : oa = [a] : ra = a,
        t = eu(t, "onChange"),
        0 < t.length && (l = new oi("onChange","change",null,l,a),
        e.push({
            event: l,
            listeners: t
        }))
    }
    var tn = null
      , ln = null;
    function Ag(e) {
        Ud(e, 0)
    }
    function di(e) {
        var t = ka(e);
        if (Nr(t))
            return e
    }
    function Fr(e, t) {
        if (e === "change")
            return t
    }
    var Wr = !1;
    if (Kt) {
        var es;
        if (Kt) {
            var ts = "oninput"in document;
            if (!ts) {
                var Pr = document.createElement("div");
                Pr.setAttribute("oninput", "return;"),
                ts = typeof Pr.oninput == "function"
            }
            es = ts
        } else
            es = !1;
        Wr = es && (!document.documentMode || 9 < document.documentMode)
    }
    function Ir() {
        tn && (tn.detachEvent("onpropertychange", eo),
        ln = tn = null)
    }
    function eo(e) {
        if (e.propertyName === "value" && di(ln)) {
            var t = [];
            kr(t, ln, e, Zu(e)),
            Hr(Ag, t)
        }
    }
    function zg(e, t, l) {
        e === "focusin" ? (Ir(),
        tn = t,
        ln = l,
        tn.attachEvent("onpropertychange", eo)) : e === "focusout" && Ir()
    }
    function _g(e) {
        if (e === "selectionchange" || e === "keyup" || e === "keydown")
            return di(ln)
    }
    function Cg(e, t) {
        if (e === "click")
            return di(t)
    }
    function Ng(e, t) {
        if (e === "input" || e === "change")
            return di(t)
    }
    function Dg(e, t) {
        return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
    }
    var mt = typeof Object.is == "function" ? Object.is : Dg;
    function an(e, t) {
        if (mt(e, t))
            return !0;
        if (typeof e != "object" || e === null || typeof t != "object" || t === null)
            return !1;
        var l = Object.keys(e)
          , a = Object.keys(t);
        if (l.length !== a.length)
            return !1;
        for (a = 0; a < l.length; a++) {
            var n = l[a];
            if (!Mu.call(t, n) || !mt(e[n], t[n]))
                return !1
        }
        return !0
    }
    function to(e) {
        for (; e && e.firstChild; )
            e = e.firstChild;
        return e
    }
    function lo(e, t) {
        var l = to(e);
        e = 0;
        for (var a; l; ) {
            if (l.nodeType === 3) {
                if (a = e + l.textContent.length,
                e <= t && a >= t)
                    return {
                        node: l,
                        offset: t - e
                    };
                e = a
            }
            e: {
                for (; l; ) {
                    if (l.nextSibling) {
                        l = l.nextSibling;
                        break e
                    }
                    l = l.parentNode
                }
                l = void 0
            }
            l = to(l)
        }
    }
    function ao(e, t) {
        return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? ao(e, t.parentNode) : "contains"in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1
    }
    function no(e) {
        e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
        for (var t = ii(e.document); t instanceof e.HTMLIFrameElement; ) {
            try {
                var l = typeof t.contentWindow.location.href == "string"
            } catch {
                l = !1
            }
            if (l)
                e = t.contentWindow;
            else
                break;
            t = ii(e.document)
        }
        return t
    }
    function ls(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true")
    }
    var Mg = Kt && "documentMode"in document && 11 >= document.documentMode
      , da = null
      , as = null
      , nn = null
      , ns = !1;
    function io(e, t, l) {
        var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
        ns || da == null || da !== ii(a) || (a = da,
        "selectionStart"in a && ls(a) ? a = {
            start: a.selectionStart,
            end: a.selectionEnd
        } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(),
        a = {
            anchorNode: a.anchorNode,
            anchorOffset: a.anchorOffset,
            focusNode: a.focusNode,
            focusOffset: a.focusOffset
        }),
        nn && an(nn, a) || (nn = a,
        a = eu(as, "onSelect"),
        0 < a.length && (t = new oi("onSelect","select",null,t,l),
        e.push({
            event: t,
            listeners: a
        }),
        t.target = da)))
    }
    function Gl(e, t) {
        var l = {};
        return l[e.toLowerCase()] = t.toLowerCase(),
        l["Webkit" + e] = "webkit" + t,
        l["Moz" + e] = "moz" + t,
        l
    }
    var ha = {
        animationend: Gl("Animation", "AnimationEnd"),
        animationiteration: Gl("Animation", "AnimationIteration"),
        animationstart: Gl("Animation", "AnimationStart"),
        transitionrun: Gl("Transition", "TransitionRun"),
        transitionstart: Gl("Transition", "TransitionStart"),
        transitioncancel: Gl("Transition", "TransitionCancel"),
        transitionend: Gl("Transition", "TransitionEnd")
    }
      , is = {}
      , uo = {};
    Kt && (uo = document.createElement("div").style,
    "AnimationEvent"in window || (delete ha.animationend.animation,
    delete ha.animationiteration.animation,
    delete ha.animationstart.animation),
    "TransitionEvent"in window || delete ha.transitionend.transition);
    function Vl(e) {
        if (is[e])
            return is[e];
        if (!ha[e])
            return e;
        var t = ha[e], l;
        for (l in t)
            if (t.hasOwnProperty(l) && l in uo)
                return is[e] = t[l];
        return e
    }
    var so = Vl("animationend")
      , co = Vl("animationiteration")
      , ro = Vl("animationstart")
      , Ug = Vl("transitionrun")
      , Lg = Vl("transitionstart")
      , jg = Vl("transitioncancel")
      , oo = Vl("transitionend")
      , fo = new Map
      , us = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    us.push("scrollEnd");
    function Lt(e, t) {
        fo.set(e, t),
        ql(t, [e])
    }
    var hi = typeof reportError == "function" ? reportError : function(e) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
            var t = new window.ErrorEvent("error",{
                bubbles: !0,
                cancelable: !0,
                message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
                error: e
            });
            if (!window.dispatchEvent(t))
                return
        } else if (typeof process == "object" && typeof process.emit == "function") {
            process.emit("uncaughtException", e);
            return
        }
        console.error(e)
    }
      , Tt = []
      , ma = 0
      , ss = 0;
    function mi() {
        for (var e = ma, t = ss = ma = 0; t < e; ) {
            var l = Tt[t];
            Tt[t++] = null;
            var a = Tt[t];
            Tt[t++] = null;
            var n = Tt[t];
            Tt[t++] = null;
            var i = Tt[t];
            if (Tt[t++] = null,
            a !== null && n !== null) {
                var f = a.pending;
                f === null ? n.next = n : (n.next = f.next,
                f.next = n),
                a.pending = n
            }
            i !== 0 && ho(l, n, i)
        }
    }
    function gi(e, t, l, a) {
        Tt[ma++] = e,
        Tt[ma++] = t,
        Tt[ma++] = l,
        Tt[ma++] = a,
        ss |= a,
        e.lanes |= a,
        e = e.alternate,
        e !== null && (e.lanes |= a)
    }
    function cs(e, t, l, a) {
        return gi(e, t, l, a),
        pi(e)
    }
    function Ql(e, t) {
        return gi(e, null, null, t),
        pi(e)
    }
    function ho(e, t, l) {
        e.lanes |= l;
        var a = e.alternate;
        a !== null && (a.lanes |= l);
        for (var n = !1, i = e.return; i !== null; )
            i.childLanes |= l,
            a = i.alternate,
            a !== null && (a.childLanes |= l),
            i.tag === 22 && (e = i.stateNode,
            e === null || e._visibility & 1 || (n = !0)),
            e = i,
            i = i.return;
        return e.tag === 3 ? (i = e.stateNode,
        n && t !== null && (n = 31 - ht(l),
        e = i.hiddenUpdates,
        a = e[n],
        a === null ? e[n] = [t] : a.push(t),
        t.lane = l | 536870912),
        i) : null
    }
    function pi(e) {
        if (50 < zn)
            throw zn = 0,
            yc = null,
            Error(r(185));
        for (var t = e.return; t !== null; )
            e = t,
            t = e.return;
        return e.tag === 3 ? e.stateNode : null
    }
    var ga = {};
    function wg(e, t, l, a) {
        this.tag = e,
        this.key = l,
        this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null,
        this.index = 0,
        this.refCleanup = this.ref = null,
        this.pendingProps = t,
        this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null,
        this.mode = a,
        this.subtreeFlags = this.flags = 0,
        this.deletions = null,
        this.childLanes = this.lanes = 0,
        this.alternate = null
    }
    function gt(e, t, l, a) {
        return new wg(e,t,l,a)
    }
    function rs(e) {
        return e = e.prototype,
        !(!e || !e.isReactComponent)
    }
    function Jt(e, t) {
        var l = e.alternate;
        return l === null ? (l = gt(e.tag, t, e.key, e.mode),
        l.elementType = e.elementType,
        l.type = e.type,
        l.stateNode = e.stateNode,
        l.alternate = e,
        e.alternate = l) : (l.pendingProps = t,
        l.type = e.type,
        l.flags = 0,
        l.subtreeFlags = 0,
        l.deletions = null),
        l.flags = e.flags & 65011712,
        l.childLanes = e.childLanes,
        l.lanes = e.lanes,
        l.child = e.child,
        l.memoizedProps = e.memoizedProps,
        l.memoizedState = e.memoizedState,
        l.updateQueue = e.updateQueue,
        t = e.dependencies,
        l.dependencies = t === null ? null : {
            lanes: t.lanes,
            firstContext: t.firstContext
        },
        l.sibling = e.sibling,
        l.index = e.index,
        l.ref = e.ref,
        l.refCleanup = e.refCleanup,
        l
    }
    function mo(e, t) {
        e.flags &= 65011714;
        var l = e.alternate;
        return l === null ? (e.childLanes = 0,
        e.lanes = t,
        e.child = null,
        e.subtreeFlags = 0,
        e.memoizedProps = null,
        e.memoizedState = null,
        e.updateQueue = null,
        e.dependencies = null,
        e.stateNode = null) : (e.childLanes = l.childLanes,
        e.lanes = l.lanes,
        e.child = l.child,
        e.subtreeFlags = 0,
        e.deletions = null,
        e.memoizedProps = l.memoizedProps,
        e.memoizedState = l.memoizedState,
        e.updateQueue = l.updateQueue,
        e.type = l.type,
        t = l.dependencies,
        e.dependencies = t === null ? null : {
            lanes: t.lanes,
            firstContext: t.firstContext
        }),
        e
    }
    function yi(e, t, l, a, n, i) {
        var f = 0;
        if (a = e,
        typeof e == "function")
            rs(e) && (f = 1);
        else if (typeof e == "string")
            f = Gp(e, l, Q.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
        else
            e: switch (e) {
            case Te:
                return e = gt(31, l, t, n),
                e.elementType = Te,
                e.lanes = i,
                e;
            case B:
                return Xl(l.children, n, i, t);
            case q:
                f = 8,
                n |= 24;
                break;
            case Z:
                return e = gt(12, l, t, n | 2),
                e.elementType = Z,
                e.lanes = i,
                e;
            case re:
                return e = gt(13, l, t, n),
                e.elementType = re,
                e.lanes = i,
                e;
            case ye:
                return e = gt(19, l, t, n),
                e.elementType = ye,
                e.lanes = i,
                e;
            default:
                if (typeof e == "object" && e !== null)
                    switch (e.$$typeof) {
                    case J:
                        f = 10;
                        break e;
                    case V:
                        f = 9;
                        break e;
                    case ae:
                        f = 11;
                        break e;
                    case W:
                        f = 14;
                        break e;
                    case ze:
                        f = 16,
                        a = null;
                        break e
                    }
                f = 29,
                l = Error(r(130, e === null ? "null" : typeof e, "")),
                a = null
            }
        return t = gt(f, l, t, n),
        t.elementType = e,
        t.type = a,
        t.lanes = i,
        t
    }
    function Xl(e, t, l, a) {
        return e = gt(7, e, a, t),
        e.lanes = l,
        e
    }
    function os(e, t, l) {
        return e = gt(6, e, null, t),
        e.lanes = l,
        e
    }
    function go(e) {
        var t = gt(18, null, null, 0);
        return t.stateNode = e,
        t
    }
    function fs(e, t, l) {
        return t = gt(4, e.children !== null ? e.children : [], e.key, t),
        t.lanes = l,
        t.stateNode = {
            containerInfo: e.containerInfo,
            pendingChildren: null,
            implementation: e.implementation
        },
        t
    }
    var po = new WeakMap;
    function Rt(e, t) {
        if (typeof e == "object" && e !== null) {
            var l = po.get(e);
            return l !== void 0 ? l : (t = {
                value: e,
                source: t,
                stack: mr(t)
            },
            po.set(e, t),
            t)
        }
        return {
            value: e,
            source: t,
            stack: mr(t)
        }
    }
    var pa = []
      , ya = 0
      , vi = null
      , un = 0
      , At = []
      , zt = 0
      , ml = null
      , Bt = 1
      , qt = "";
    function $t(e, t) {
        pa[ya++] = un,
        pa[ya++] = vi,
        vi = e,
        un = t
    }
    function yo(e, t, l) {
        At[zt++] = Bt,
        At[zt++] = qt,
        At[zt++] = ml,
        ml = e;
        var a = Bt;
        e = qt;
        var n = 32 - ht(a) - 1;
        a &= ~(1 << n),
        l += 1;
        var i = 32 - ht(t) + n;
        if (30 < i) {
            var f = n - n % 5;
            i = (a & (1 << f) - 1).toString(32),
            a >>= f,
            n -= f,
            Bt = 1 << 32 - ht(t) + n | l << n | a,
            qt = i + e
        } else
            Bt = 1 << i | l << n | a,
            qt = e
    }
    function ds(e) {
        e.return !== null && ($t(e, 1),
        yo(e, 1, 0))
    }
    function hs(e) {
        for (; e === vi; )
            vi = pa[--ya],
            pa[ya] = null,
            un = pa[--ya],
            pa[ya] = null;
        for (; e === ml; )
            ml = At[--zt],
            At[zt] = null,
            qt = At[--zt],
            At[zt] = null,
            Bt = At[--zt],
            At[zt] = null
    }
    function vo(e, t) {
        At[zt++] = Bt,
        At[zt++] = qt,
        At[zt++] = ml,
        Bt = t.id,
        qt = t.overflow,
        ml = e
    }
    var Je = null
      , Re = null
      , oe = !1
      , gl = null
      , _t = !1
      , ms = Error(r(519));
    function pl(e) {
        var t = Error(r(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""));
        throw sn(Rt(t, e)),
        ms
    }
    function So(e) {
        var t = e.stateNode
          , l = e.type
          , a = e.memoizedProps;
        switch (t[Ke] = e,
        t[nt] = a,
        l) {
        case "dialog":
            ue("cancel", t),
            ue("close", t);
            break;
        case "iframe":
        case "object":
        case "embed":
            ue("load", t);
            break;
        case "video":
        case "audio":
            for (l = 0; l < Cn.length; l++)
                ue(Cn[l], t);
            break;
        case "source":
            ue("error", t);
            break;
        case "img":
        case "image":
        case "link":
            ue("error", t),
            ue("load", t);
            break;
        case "details":
            ue("toggle", t);
            break;
        case "input":
            ue("invalid", t),
            Dr(t, a.value, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name, !0);
            break;
        case "select":
            ue("invalid", t);
            break;
        case "textarea":
            ue("invalid", t),
            Ur(t, a.value, a.defaultValue, a.children)
        }
        l = a.children,
        typeof l != "string" && typeof l != "number" && typeof l != "bigint" || t.textContent === "" + l || a.suppressHydrationWarning === !0 || Hd(t.textContent, l) ? (a.popover != null && (ue("beforetoggle", t),
        ue("toggle", t)),
        a.onScroll != null && ue("scroll", t),
        a.onScrollEnd != null && ue("scrollend", t),
        a.onClick != null && (t.onclick = Zt),
        t = !0) : t = !1,
        t || pl(e, !0)
    }
    function bo(e) {
        for (Je = e.return; Je; )
            switch (Je.tag) {
            case 5:
            case 31:
            case 13:
                _t = !1;
                return;
            case 27:
            case 3:
                _t = !0;
                return;
            default:
                Je = Je.return
            }
    }
    function va(e) {
        if (e !== Je)
            return !1;
        if (!oe)
            return bo(e),
            oe = !0,
            !1;
        var t = e.tag, l;
        if ((l = t !== 3 && t !== 27) && ((l = t === 5) && (l = e.type,
        l = !(l !== "form" && l !== "button") || Mc(e.type, e.memoizedProps)),
        l = !l),
        l && Re && pl(e),
        bo(e),
        t === 13) {
            if (e = e.memoizedState,
            e = e !== null ? e.dehydrated : null,
            !e)
                throw Error(r(317));
            Re = Kd(e)
        } else if (t === 31) {
            if (e = e.memoizedState,
            e = e !== null ? e.dehydrated : null,
            !e)
                throw Error(r(317));
            Re = Kd(e)
        } else
            t === 27 ? (t = Re,
            Nl(e.type) ? (e = Hc,
            Hc = null,
            Re = e) : Re = t) : Re = Je ? Nt(e.stateNode.nextSibling) : null;
        return !0
    }
    function Zl() {
        Re = Je = null,
        oe = !1
    }
    function gs() {
        var e = gl;
        return e !== null && (rt === null ? rt = e : rt.push.apply(rt, e),
        gl = null),
        e
    }
    function sn(e) {
        gl === null ? gl = [e] : gl.push(e)
    }
    var ps = b(null)
      , Kl = null
      , kt = null;
    function yl(e, t, l) {
        G(ps, t._currentValue),
        t._currentValue = l
    }
    function Ft(e) {
        e._currentValue = ps.current,
        U(ps)
    }
    function ys(e, t, l) {
        for (; e !== null; ) {
            var a = e.alternate;
            if ((e.childLanes & t) !== t ? (e.childLanes |= t,
            a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t),
            e === l)
                break;
            e = e.return
        }
    }
    function vs(e, t, l, a) {
        var n = e.child;
        for (n !== null && (n.return = e); n !== null; ) {
            var i = n.dependencies;
            if (i !== null) {
                var f = n.child;
                i = i.firstContext;
                e: for (; i !== null; ) {
                    var m = i;
                    i = n;
                    for (var S = 0; S < t.length; S++)
                        if (m.context === t[S]) {
                            i.lanes |= l,
                            m = i.alternate,
                            m !== null && (m.lanes |= l),
                            ys(i.return, l, e),
                            a || (f = null);
                            break e
                        }
                    i = m.next
                }
            } else if (n.tag === 18) {
                if (f = n.return,
                f === null)
                    throw Error(r(341));
                f.lanes |= l,
                i = f.alternate,
                i !== null && (i.lanes |= l),
                ys(f, l, e),
                f = null
            } else
                f = n.child;
            if (f !== null)
                f.return = n;
            else
                for (f = n; f !== null; ) {
                    if (f === e) {
                        f = null;
                        break
                    }
                    if (n = f.sibling,
                    n !== null) {
                        n.return = f.return,
                        f = n;
                        break
                    }
                    f = f.return
                }
            n = f
        }
    }
    function Sa(e, t, l, a) {
        e = null;
        for (var n = t, i = !1; n !== null; ) {
            if (!i) {
                if ((n.flags & 524288) !== 0)
                    i = !0;
                else if ((n.flags & 262144) !== 0)
                    break
            }
            if (n.tag === 10) {
                var f = n.alternate;
                if (f === null)
                    throw Error(r(387));
                if (f = f.memoizedProps,
                f !== null) {
                    var m = n.type;
                    mt(n.pendingProps.value, f.value) || (e !== null ? e.push(m) : e = [m])
                }
            } else if (n === pe.current) {
                if (f = n.alternate,
                f === null)
                    throw Error(r(387));
                f.memoizedState.memoizedState !== n.memoizedState.memoizedState && (e !== null ? e.push(Ln) : e = [Ln])
            }
            n = n.return
        }
        e !== null && vs(t, e, l, a),
        t.flags |= 262144
    }
    function Si(e) {
        for (e = e.firstContext; e !== null; ) {
            if (!mt(e.context._currentValue, e.memoizedValue))
                return !0;
            e = e.next
        }
        return !1
    }
    function Jl(e) {
        Kl = e,
        kt = null,
        e = e.dependencies,
        e !== null && (e.firstContext = null)
    }
    function $e(e) {
        return xo(Kl, e)
    }
    function bi(e, t) {
        return Kl === null && Jl(e),
        xo(e, t)
    }
    function xo(e, t) {
        var l = t._currentValue;
        if (t = {
            context: t,
            memoizedValue: l,
            next: null
        },
        kt === null) {
            if (e === null)
                throw Error(r(308));
            kt = t,
            e.dependencies = {
                lanes: 0,
                firstContext: t
            },
            e.flags |= 524288
        } else
            kt = kt.next = t;
        return l
    }
    var Hg = typeof AbortController < "u" ? AbortController : function() {
        var e = []
          , t = this.signal = {
            aborted: !1,
            addEventListener: function(l, a) {
                e.push(a)
            }
        };
        this.abort = function() {
            t.aborted = !0,
            e.forEach(function(l) {
                return l()
            })
        }
    }
      , Bg = c.unstable_scheduleCallback
      , qg = c.unstable_NormalPriority
      , we = {
        $$typeof: J,
        Consumer: null,
        Provider: null,
        _currentValue: null,
        _currentValue2: null,
        _threadCount: 0
    };
    function Ss() {
        return {
            controller: new Hg,
            data: new Map,
            refCount: 0
        }
    }
    function cn(e) {
        e.refCount--,
        e.refCount === 0 && Bg(qg, function() {
            e.controller.abort()
        })
    }
    var rn = null
      , bs = 0
      , ba = 0
      , xa = null;
    function Yg(e, t) {
        if (rn === null) {
            var l = rn = [];
            bs = 0,
            ba = Oc(),
            xa = {
                status: "pending",
                value: void 0,
                then: function(a) {
                    l.push(a)
                }
            }
        }
        return bs++,
        t.then(Eo, Eo),
        t
    }
    function Eo() {
        if (--bs === 0 && rn !== null) {
            xa !== null && (xa.status = "fulfilled");
            var e = rn;
            rn = null,
            ba = 0,
            xa = null;
            for (var t = 0; t < e.length; t++)
                (0,
                e[t])()
        }
    }
    function Gg(e, t) {
        var l = []
          , a = {
            status: "pending",
            value: null,
            reason: null,
            then: function(n) {
                l.push(n)
            }
        };
        return e.then(function() {
            a.status = "fulfilled",
            a.value = t;
            for (var n = 0; n < l.length; n++)
                (0,
                l[n])(t)
        }, function(n) {
            for (a.status = "rejected",
            a.reason = n,
            n = 0; n < l.length; n++)
                (0,
                l[n])(void 0)
        }),
        a
    }
    var Oo = N.S;
    N.S = function(e, t) {
        sd = ft(),
        typeof t == "object" && t !== null && typeof t.then == "function" && Yg(e, t),
        Oo !== null && Oo(e, t)
    }
    ;
    var $l = b(null);
    function xs() {
        var e = $l.current;
        return e !== null ? e : Oe.pooledCache
    }
    function xi(e, t) {
        t === null ? G($l, $l.current) : G($l, t.pool)
    }
    function To() {
        var e = xs();
        return e === null ? null : {
            parent: we._currentValue,
            pool: e
        }
    }
    var Ea = Error(r(460))
      , Es = Error(r(474))
      , Ei = Error(r(542))
      , Oi = {
        then: function() {}
    };
    function Ro(e) {
        return e = e.status,
        e === "fulfilled" || e === "rejected"
    }
    function Ao(e, t, l) {
        switch (l = e[l],
        l === void 0 ? e.push(t) : l !== t && (t.then(Zt, Zt),
        t = l),
        t.status) {
        case "fulfilled":
            return t.value;
        case "rejected":
            throw e = t.reason,
            _o(e),
            e;
        default:
            if (typeof t.status == "string")
                t.then(Zt, Zt);
            else {
                if (e = Oe,
                e !== null && 100 < e.shellSuspendCounter)
                    throw Error(r(482));
                e = t,
                e.status = "pending",
                e.then(function(a) {
                    if (t.status === "pending") {
                        var n = t;
                        n.status = "fulfilled",
                        n.value = a
                    }
                }, function(a) {
                    if (t.status === "pending") {
                        var n = t;
                        n.status = "rejected",
                        n.reason = a
                    }
                })
            }
            switch (t.status) {
            case "fulfilled":
                return t.value;
            case "rejected":
                throw e = t.reason,
                _o(e),
                e
            }
            throw Fl = t,
            Ea
        }
    }
    function kl(e) {
        try {
            var t = e._init;
            return t(e._payload)
        } catch (l) {
            throw l !== null && typeof l == "object" && typeof l.then == "function" ? (Fl = l,
            Ea) : l
        }
    }
    var Fl = null;
    function zo() {
        if (Fl === null)
            throw Error(r(459));
        var e = Fl;
        return Fl = null,
        e
    }
    function _o(e) {
        if (e === Ea || e === Ei)
            throw Error(r(483))
    }
    var Oa = null
      , on = 0;
    function Ti(e) {
        var t = on;
        return on += 1,
        Oa === null && (Oa = []),
        Ao(Oa, e, t)
    }
    function fn(e, t) {
        t = t.props.ref,
        e.ref = t !== void 0 ? t : null
    }
    function Ri(e, t) {
        throw t.$$typeof === T ? Error(r(525)) : (e = Object.prototype.toString.call(t),
        Error(r(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)))
    }
    function Co(e) {
        function t(O, x) {
            if (e) {
                var R = O.deletions;
                R === null ? (O.deletions = [x],
                O.flags |= 16) : R.push(x)
            }
        }
        function l(O, x) {
            if (!e)
                return null;
            for (; x !== null; )
                t(O, x),
                x = x.sibling;
            return null
        }
        function a(O) {
            for (var x = new Map; O !== null; )
                O.key !== null ? x.set(O.key, O) : x.set(O.index, O),
                O = O.sibling;
            return x
        }
        function n(O, x) {
            return O = Jt(O, x),
            O.index = 0,
            O.sibling = null,
            O
        }
        function i(O, x, R) {
            return O.index = R,
            e ? (R = O.alternate,
            R !== null ? (R = R.index,
            R < x ? (O.flags |= 67108866,
            x) : R) : (O.flags |= 67108866,
            x)) : (O.flags |= 1048576,
            x)
        }
        function f(O) {
            return e && O.alternate === null && (O.flags |= 67108866),
            O
        }
        function m(O, x, R, L) {
            return x === null || x.tag !== 6 ? (x = os(R, O.mode, L),
            x.return = O,
            x) : (x = n(x, R),
            x.return = O,
            x)
        }
        function S(O, x, R, L) {
            var $ = R.type;
            return $ === B ? M(O, x, R.props.children, L, R.key) : x !== null && (x.elementType === $ || typeof $ == "object" && $ !== null && $.$$typeof === ze && kl($) === x.type) ? (x = n(x, R.props),
            fn(x, R),
            x.return = O,
            x) : (x = yi(R.type, R.key, R.props, null, O.mode, L),
            fn(x, R),
            x.return = O,
            x)
        }
        function A(O, x, R, L) {
            return x === null || x.tag !== 4 || x.stateNode.containerInfo !== R.containerInfo || x.stateNode.implementation !== R.implementation ? (x = fs(R, O.mode, L),
            x.return = O,
            x) : (x = n(x, R.children || []),
            x.return = O,
            x)
        }
        function M(O, x, R, L, $) {
            return x === null || x.tag !== 7 ? (x = Xl(R, O.mode, L, $),
            x.return = O,
            x) : (x = n(x, R),
            x.return = O,
            x)
        }
        function j(O, x, R) {
            if (typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint")
                return x = os("" + x, O.mode, R),
                x.return = O,
                x;
            if (typeof x == "object" && x !== null) {
                switch (x.$$typeof) {
                case C:
                    return R = yi(x.type, x.key, x.props, null, O.mode, R),
                    fn(R, x),
                    R.return = O,
                    R;
                case w:
                    return x = fs(x, O.mode, R),
                    x.return = O,
                    x;
                case ze:
                    return x = kl(x),
                    j(O, x, R)
                }
                if (at(x) || Pe(x))
                    return x = Xl(x, O.mode, R, null),
                    x.return = O,
                    x;
                if (typeof x.then == "function")
                    return j(O, Ti(x), R);
                if (x.$$typeof === J)
                    return j(O, bi(O, x), R);
                Ri(O, x)
            }
            return null
        }
        function z(O, x, R, L) {
            var $ = x !== null ? x.key : null;
            if (typeof R == "string" && R !== "" || typeof R == "number" || typeof R == "bigint")
                return $ !== null ? null : m(O, x, "" + R, L);
            if (typeof R == "object" && R !== null) {
                switch (R.$$typeof) {
                case C:
                    return R.key === $ ? S(O, x, R, L) : null;
                case w:
                    return R.key === $ ? A(O, x, R, L) : null;
                case ze:
                    return R = kl(R),
                    z(O, x, R, L)
                }
                if (at(R) || Pe(R))
                    return $ !== null ? null : M(O, x, R, L, null);
                if (typeof R.then == "function")
                    return z(O, x, Ti(R), L);
                if (R.$$typeof === J)
                    return z(O, x, bi(O, R), L);
                Ri(O, R)
            }
            return null
        }
        function _(O, x, R, L, $) {
            if (typeof L == "string" && L !== "" || typeof L == "number" || typeof L == "bigint")
                return O = O.get(R) || null,
                m(x, O, "" + L, $);
            if (typeof L == "object" && L !== null) {
                switch (L.$$typeof) {
                case C:
                    return O = O.get(L.key === null ? R : L.key) || null,
                    S(x, O, L, $);
                case w:
                    return O = O.get(L.key === null ? R : L.key) || null,
                    A(x, O, L, $);
                case ze:
                    return L = kl(L),
                    _(O, x, R, L, $)
                }
                if (at(L) || Pe(L))
                    return O = O.get(R) || null,
                    M(x, O, L, $, null);
                if (typeof L.then == "function")
                    return _(O, x, R, Ti(L), $);
                if (L.$$typeof === J)
                    return _(O, x, R, bi(x, L), $);
                Ri(x, L)
            }
            return null
        }
        function X(O, x, R, L) {
            for (var $ = null, de = null, K = x, le = x = 0, ce = null; K !== null && le < R.length; le++) {
                K.index > le ? (ce = K,
                K = null) : ce = K.sibling;
                var he = z(O, K, R[le], L);
                if (he === null) {
                    K === null && (K = ce);
                    break
                }
                e && K && he.alternate === null && t(O, K),
                x = i(he, x, le),
                de === null ? $ = he : de.sibling = he,
                de = he,
                K = ce
            }
            if (le === R.length)
                return l(O, K),
                oe && $t(O, le),
                $;
            if (K === null) {
                for (; le < R.length; le++)
                    K = j(O, R[le], L),
                    K !== null && (x = i(K, x, le),
                    de === null ? $ = K : de.sibling = K,
                    de = K);
                return oe && $t(O, le),
                $
            }
            for (K = a(K); le < R.length; le++)
                ce = _(K, O, le, R[le], L),
                ce !== null && (e && ce.alternate !== null && K.delete(ce.key === null ? le : ce.key),
                x = i(ce, x, le),
                de === null ? $ = ce : de.sibling = ce,
                de = ce);
            return e && K.forEach(function(jl) {
                return t(O, jl)
            }),
            oe && $t(O, le),
            $
        }
        function F(O, x, R, L) {
            if (R == null)
                throw Error(r(151));
            for (var $ = null, de = null, K = x, le = x = 0, ce = null, he = R.next(); K !== null && !he.done; le++,
            he = R.next()) {
                K.index > le ? (ce = K,
                K = null) : ce = K.sibling;
                var jl = z(O, K, he.value, L);
                if (jl === null) {
                    K === null && (K = ce);
                    break
                }
                e && K && jl.alternate === null && t(O, K),
                x = i(jl, x, le),
                de === null ? $ = jl : de.sibling = jl,
                de = jl,
                K = ce
            }
            if (he.done)
                return l(O, K),
                oe && $t(O, le),
                $;
            if (K === null) {
                for (; !he.done; le++,
                he = R.next())
                    he = j(O, he.value, L),
                    he !== null && (x = i(he, x, le),
                    de === null ? $ = he : de.sibling = he,
                    de = he);
                return oe && $t(O, le),
                $
            }
            for (K = a(K); !he.done; le++,
            he = R.next())
                he = _(K, O, le, he.value, L),
                he !== null && (e && he.alternate !== null && K.delete(he.key === null ? le : he.key),
                x = i(he, x, le),
                de === null ? $ = he : de.sibling = he,
                de = he);
            return e && K.forEach(function(Pp) {
                return t(O, Pp)
            }),
            oe && $t(O, le),
            $
        }
        function Ee(O, x, R, L) {
            if (typeof R == "object" && R !== null && R.type === B && R.key === null && (R = R.props.children),
            typeof R == "object" && R !== null) {
                switch (R.$$typeof) {
                case C:
                    e: {
                        for (var $ = R.key; x !== null; ) {
                            if (x.key === $) {
                                if ($ = R.type,
                                $ === B) {
                                    if (x.tag === 7) {
                                        l(O, x.sibling),
                                        L = n(x, R.props.children),
                                        L.return = O,
                                        O = L;
                                        break e
                                    }
                                } else if (x.elementType === $ || typeof $ == "object" && $ !== null && $.$$typeof === ze && kl($) === x.type) {
                                    l(O, x.sibling),
                                    L = n(x, R.props),
                                    fn(L, R),
                                    L.return = O,
                                    O = L;
                                    break e
                                }
                                l(O, x);
                                break
                            } else
                                t(O, x);
                            x = x.sibling
                        }
                        R.type === B ? (L = Xl(R.props.children, O.mode, L, R.key),
                        L.return = O,
                        O = L) : (L = yi(R.type, R.key, R.props, null, O.mode, L),
                        fn(L, R),
                        L.return = O,
                        O = L)
                    }
                    return f(O);
                case w:
                    e: {
                        for ($ = R.key; x !== null; ) {
                            if (x.key === $)
                                if (x.tag === 4 && x.stateNode.containerInfo === R.containerInfo && x.stateNode.implementation === R.implementation) {
                                    l(O, x.sibling),
                                    L = n(x, R.children || []),
                                    L.return = O,
                                    O = L;
                                    break e
                                } else {
                                    l(O, x);
                                    break
                                }
                            else
                                t(O, x);
                            x = x.sibling
                        }
                        L = fs(R, O.mode, L),
                        L.return = O,
                        O = L
                    }
                    return f(O);
                case ze:
                    return R = kl(R),
                    Ee(O, x, R, L)
                }
                if (at(R))
                    return X(O, x, R, L);
                if (Pe(R)) {
                    if ($ = Pe(R),
                    typeof $ != "function")
                        throw Error(r(150));
                    return R = $.call(R),
                    F(O, x, R, L)
                }
                if (typeof R.then == "function")
                    return Ee(O, x, Ti(R), L);
                if (R.$$typeof === J)
                    return Ee(O, x, bi(O, R), L);
                Ri(O, R)
            }
            return typeof R == "string" && R !== "" || typeof R == "number" || typeof R == "bigint" ? (R = "" + R,
            x !== null && x.tag === 6 ? (l(O, x.sibling),
            L = n(x, R),
            L.return = O,
            O = L) : (l(O, x),
            L = os(R, O.mode, L),
            L.return = O,
            O = L),
            f(O)) : l(O, x)
        }
        return function(O, x, R, L) {
            try {
                on = 0;
                var $ = Ee(O, x, R, L);
                return Oa = null,
                $
            } catch (K) {
                if (K === Ea || K === Ei)
                    throw K;
                var de = gt(29, K, null, O.mode);
                return de.lanes = L,
                de.return = O,
                de
            }
        }
    }
    var Wl = Co(!0)
      , No = Co(!1)
      , vl = !1;
    function Os(e) {
        e.updateQueue = {
            baseState: e.memoizedState,
            firstBaseUpdate: null,
            lastBaseUpdate: null,
            shared: {
                pending: null,
                lanes: 0,
                hiddenCallbacks: null
            },
            callbacks: null
        }
    }
    function Ts(e, t) {
        e = e.updateQueue,
        t.updateQueue === e && (t.updateQueue = {
            baseState: e.baseState,
            firstBaseUpdate: e.firstBaseUpdate,
            lastBaseUpdate: e.lastBaseUpdate,
            shared: e.shared,
            callbacks: null
        })
    }
    function Sl(e) {
        return {
            lane: e,
            tag: 0,
            payload: null,
            callback: null,
            next: null
        }
    }
    function bl(e, t, l) {
        var a = e.updateQueue;
        if (a === null)
            return null;
        if (a = a.shared,
        (me & 2) !== 0) {
            var n = a.pending;
            return n === null ? t.next = t : (t.next = n.next,
            n.next = t),
            a.pending = t,
            t = pi(e),
            ho(e, null, l),
            t
        }
        return gi(e, a, t, l),
        pi(e)
    }
    function dn(e, t, l) {
        if (t = t.updateQueue,
        t !== null && (t = t.shared,
        (l & 4194048) !== 0)) {
            var a = t.lanes;
            a &= e.pendingLanes,
            l |= a,
            t.lanes = l,
            br(e, l)
        }
    }
    function Rs(e, t) {
        var l = e.updateQueue
          , a = e.alternate;
        if (a !== null && (a = a.updateQueue,
        l === a)) {
            var n = null
              , i = null;
            if (l = l.firstBaseUpdate,
            l !== null) {
                do {
                    var f = {
                        lane: l.lane,
                        tag: l.tag,
                        payload: l.payload,
                        callback: null,
                        next: null
                    };
                    i === null ? n = i = f : i = i.next = f,
                    l = l.next
                } while (l !== null);
                i === null ? n = i = t : i = i.next = t
            } else
                n = i = t;
            l = {
                baseState: a.baseState,
                firstBaseUpdate: n,
                lastBaseUpdate: i,
                shared: a.shared,
                callbacks: a.callbacks
            },
            e.updateQueue = l;
            return
        }
        e = l.lastBaseUpdate,
        e === null ? l.firstBaseUpdate = t : e.next = t,
        l.lastBaseUpdate = t
    }
    var As = !1;
    function hn() {
        if (As) {
            var e = xa;
            if (e !== null)
                throw e
        }
    }
    function mn(e, t, l, a) {
        As = !1;
        var n = e.updateQueue;
        vl = !1;
        var i = n.firstBaseUpdate
          , f = n.lastBaseUpdate
          , m = n.shared.pending;
        if (m !== null) {
            n.shared.pending = null;
            var S = m
              , A = S.next;
            S.next = null,
            f === null ? i = A : f.next = A,
            f = S;
            var M = e.alternate;
            M !== null && (M = M.updateQueue,
            m = M.lastBaseUpdate,
            m !== f && (m === null ? M.firstBaseUpdate = A : m.next = A,
            M.lastBaseUpdate = S))
        }
        if (i !== null) {
            var j = n.baseState;
            f = 0,
            M = A = S = null,
            m = i;
            do {
                var z = m.lane & -536870913
                  , _ = z !== m.lane;
                if (_ ? (se & z) === z : (a & z) === z) {
                    z !== 0 && z === ba && (As = !0),
                    M !== null && (M = M.next = {
                        lane: 0,
                        tag: m.tag,
                        payload: m.payload,
                        callback: null,
                        next: null
                    });
                    e: {
                        var X = e
                          , F = m;
                        z = t;
                        var Ee = l;
                        switch (F.tag) {
                        case 1:
                            if (X = F.payload,
                            typeof X == "function") {
                                j = X.call(Ee, j, z);
                                break e
                            }
                            j = X;
                            break e;
                        case 3:
                            X.flags = X.flags & -65537 | 128;
                        case 0:
                            if (X = F.payload,
                            z = typeof X == "function" ? X.call(Ee, j, z) : X,
                            z == null)
                                break e;
                            j = v({}, j, z);
                            break e;
                        case 2:
                            vl = !0
                        }
                    }
                    z = m.callback,
                    z !== null && (e.flags |= 64,
                    _ && (e.flags |= 8192),
                    _ = n.callbacks,
                    _ === null ? n.callbacks = [z] : _.push(z))
                } else
                    _ = {
                        lane: z,
                        tag: m.tag,
                        payload: m.payload,
                        callback: m.callback,
                        next: null
                    },
                    M === null ? (A = M = _,
                    S = j) : M = M.next = _,
                    f |= z;
                if (m = m.next,
                m === null) {
                    if (m = n.shared.pending,
                    m === null)
                        break;
                    _ = m,
                    m = _.next,
                    _.next = null,
                    n.lastBaseUpdate = _,
                    n.shared.pending = null
                }
            } while (!0);
            M === null && (S = j),
            n.baseState = S,
            n.firstBaseUpdate = A,
            n.lastBaseUpdate = M,
            i === null && (n.shared.lanes = 0),
            Rl |= f,
            e.lanes = f,
            e.memoizedState = j
        }
    }
    function Do(e, t) {
        if (typeof e != "function")
            throw Error(r(191, e));
        e.call(t)
    }
    function Mo(e, t) {
        var l = e.callbacks;
        if (l !== null)
            for (e.callbacks = null,
            e = 0; e < l.length; e++)
                Do(l[e], t)
    }
    var Ta = b(null)
      , Ai = b(0);
    function Uo(e, t) {
        e = il,
        G(Ai, e),
        G(Ta, t),
        il = e | t.baseLanes
    }
    function zs() {
        G(Ai, il),
        G(Ta, Ta.current)
    }
    function _s() {
        il = Ai.current,
        U(Ta),
        U(Ai)
    }
    var pt = b(null)
      , Ct = null;
    function xl(e) {
        var t = e.alternate;
        G(Le, Le.current & 1),
        G(pt, e),
        Ct === null && (t === null || Ta.current !== null || t.memoizedState !== null) && (Ct = e)
    }
    function Cs(e) {
        G(Le, Le.current),
        G(pt, e),
        Ct === null && (Ct = e)
    }
    function Lo(e) {
        e.tag === 22 ? (G(Le, Le.current),
        G(pt, e),
        Ct === null && (Ct = e)) : El()
    }
    function El() {
        G(Le, Le.current),
        G(pt, pt.current)
    }
    function yt(e) {
        U(pt),
        Ct === e && (Ct = null),
        U(Le)
    }
    var Le = b(0);
    function zi(e) {
        for (var t = e; t !== null; ) {
            if (t.tag === 13) {
                var l = t.memoizedState;
                if (l !== null && (l = l.dehydrated,
                l === null || jc(l) || wc(l)))
                    return t
            } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
                if ((t.flags & 128) !== 0)
                    return t
            } else if (t.child !== null) {
                t.child.return = t,
                t = t.child;
                continue
            }
            if (t === e)
                break;
            for (; t.sibling === null; ) {
                if (t.return === null || t.return === e)
                    return null;
                t = t.return
            }
            t.sibling.return = t.return,
            t = t.sibling
        }
        return null
    }
    var Wt = 0
      , te = null
      , be = null
      , He = null
      , _i = !1
      , Ra = !1
      , Pl = !1
      , Ci = 0
      , gn = 0
      , Aa = null
      , Vg = 0;
    function Ne() {
        throw Error(r(321))
    }
    function Ns(e, t) {
        if (t === null)
            return !1;
        for (var l = 0; l < t.length && l < e.length; l++)
            if (!mt(e[l], t[l]))
                return !1;
        return !0
    }
    function Ds(e, t, l, a, n, i) {
        return Wt = i,
        te = t,
        t.memoizedState = null,
        t.updateQueue = null,
        t.lanes = 0,
        N.H = e === null || e.memoizedState === null ? vf : Ks,
        Pl = !1,
        i = l(a, n),
        Pl = !1,
        Ra && (i = wo(t, l, a, n)),
        jo(e),
        i
    }
    function jo(e) {
        N.H = vn;
        var t = be !== null && be.next !== null;
        if (Wt = 0,
        He = be = te = null,
        _i = !1,
        gn = 0,
        Aa = null,
        t)
            throw Error(r(300));
        e === null || Be || (e = e.dependencies,
        e !== null && Si(e) && (Be = !0))
    }
    function wo(e, t, l, a) {
        te = e;
        var n = 0;
        do {
            if (Ra && (Aa = null),
            gn = 0,
            Ra = !1,
            25 <= n)
                throw Error(r(301));
            if (n += 1,
            He = be = null,
            e.updateQueue != null) {
                var i = e.updateQueue;
                i.lastEffect = null,
                i.events = null,
                i.stores = null,
                i.memoCache != null && (i.memoCache.index = 0)
            }
            N.H = Sf,
            i = t(l, a)
        } while (Ra);
        return i
    }
    function Qg() {
        var e = N.H
          , t = e.useState()[0];
        return t = typeof t.then == "function" ? pn(t) : t,
        e = e.useState()[0],
        (be !== null ? be.memoizedState : null) !== e && (te.flags |= 1024),
        t
    }
    function Ms() {
        var e = Ci !== 0;
        return Ci = 0,
        e
    }
    function Us(e, t, l) {
        t.updateQueue = e.updateQueue,
        t.flags &= -2053,
        e.lanes &= ~l
    }
    function Ls(e) {
        if (_i) {
            for (e = e.memoizedState; e !== null; ) {
                var t = e.queue;
                t !== null && (t.pending = null),
                e = e.next
            }
            _i = !1
        }
        Wt = 0,
        He = be = te = null,
        Ra = !1,
        gn = Ci = 0,
        Aa = null
    }
    function lt() {
        var e = {
            memoizedState: null,
            baseState: null,
            baseQueue: null,
            queue: null,
            next: null
        };
        return He === null ? te.memoizedState = He = e : He = He.next = e,
        He
    }
    function je() {
        if (be === null) {
            var e = te.alternate;
            e = e !== null ? e.memoizedState : null
        } else
            e = be.next;
        var t = He === null ? te.memoizedState : He.next;
        if (t !== null)
            He = t,
            be = e;
        else {
            if (e === null)
                throw te.alternate === null ? Error(r(467)) : Error(r(310));
            be = e,
            e = {
                memoizedState: be.memoizedState,
                baseState: be.baseState,
                baseQueue: be.baseQueue,
                queue: be.queue,
                next: null
            },
            He === null ? te.memoizedState = He = e : He = He.next = e
        }
        return He
    }
    function Ni() {
        return {
            lastEffect: null,
            events: null,
            stores: null,
            memoCache: null
        }
    }
    function pn(e) {
        var t = gn;
        return gn += 1,
        Aa === null && (Aa = []),
        e = Ao(Aa, e, t),
        t = te,
        (He === null ? t.memoizedState : He.next) === null && (t = t.alternate,
        N.H = t === null || t.memoizedState === null ? vf : Ks),
        e
    }
    function Di(e) {
        if (e !== null && typeof e == "object") {
            if (typeof e.then == "function")
                return pn(e);
            if (e.$$typeof === J)
                return $e(e)
        }
        throw Error(r(438, String(e)))
    }
    function js(e) {
        var t = null
          , l = te.updateQueue;
        if (l !== null && (t = l.memoCache),
        t == null) {
            var a = te.alternate;
            a !== null && (a = a.updateQueue,
            a !== null && (a = a.memoCache,
            a != null && (t = {
                data: a.data.map(function(n) {
                    return n.slice()
                }),
                index: 0
            })))
        }
        if (t == null && (t = {
            data: [],
            index: 0
        }),
        l === null && (l = Ni(),
        te.updateQueue = l),
        l.memoCache = t,
        l = t.data[t.index],
        l === void 0)
            for (l = t.data[t.index] = Array(e),
            a = 0; a < e; a++)
                l[a] = Ce;
        return t.index++,
        l
    }
    function Pt(e, t) {
        return typeof t == "function" ? t(e) : t
    }
    function Mi(e) {
        var t = je();
        return ws(t, be, e)
    }
    function ws(e, t, l) {
        var a = e.queue;
        if (a === null)
            throw Error(r(311));
        a.lastRenderedReducer = l;
        var n = e.baseQueue
          , i = a.pending;
        if (i !== null) {
            if (n !== null) {
                var f = n.next;
                n.next = i.next,
                i.next = f
            }
            t.baseQueue = n = i,
            a.pending = null
        }
        if (i = e.baseState,
        n === null)
            e.memoizedState = i;
        else {
            t = n.next;
            var m = f = null
              , S = null
              , A = t
              , M = !1;
            do {
                var j = A.lane & -536870913;
                if (j !== A.lane ? (se & j) === j : (Wt & j) === j) {
                    var z = A.revertLane;
                    if (z === 0)
                        S !== null && (S = S.next = {
                            lane: 0,
                            revertLane: 0,
                            gesture: null,
                            action: A.action,
                            hasEagerState: A.hasEagerState,
                            eagerState: A.eagerState,
                            next: null
                        }),
                        j === ba && (M = !0);
                    else if ((Wt & z) === z) {
                        A = A.next,
                        z === ba && (M = !0);
                        continue
                    } else
                        j = {
                            lane: 0,
                            revertLane: A.revertLane,
                            gesture: null,
                            action: A.action,
                            hasEagerState: A.hasEagerState,
                            eagerState: A.eagerState,
                            next: null
                        },
                        S === null ? (m = S = j,
                        f = i) : S = S.next = j,
                        te.lanes |= z,
                        Rl |= z;
                    j = A.action,
                    Pl && l(i, j),
                    i = A.hasEagerState ? A.eagerState : l(i, j)
                } else
                    z = {
                        lane: j,
                        revertLane: A.revertLane,
                        gesture: A.gesture,
                        action: A.action,
                        hasEagerState: A.hasEagerState,
                        eagerState: A.eagerState,
                        next: null
                    },
                    S === null ? (m = S = z,
                    f = i) : S = S.next = z,
                    te.lanes |= j,
                    Rl |= j;
                A = A.next
            } while (A !== null && A !== t);
            if (S === null ? f = i : S.next = m,
            !mt(i, e.memoizedState) && (Be = !0,
            M && (l = xa,
            l !== null)))
                throw l;
            e.memoizedState = i,
            e.baseState = f,
            e.baseQueue = S,
            a.lastRenderedState = i
        }
        return n === null && (a.lanes = 0),
        [e.memoizedState, a.dispatch]
    }
    function Hs(e) {
        var t = je()
          , l = t.queue;
        if (l === null)
            throw Error(r(311));
        l.lastRenderedReducer = e;
        var a = l.dispatch
          , n = l.pending
          , i = t.memoizedState;
        if (n !== null) {
            l.pending = null;
            var f = n = n.next;
            do
                i = e(i, f.action),
                f = f.next;
            while (f !== n);
            mt(i, t.memoizedState) || (Be = !0),
            t.memoizedState = i,
            t.baseQueue === null && (t.baseState = i),
            l.lastRenderedState = i
        }
        return [i, a]
    }
    function Ho(e, t, l) {
        var a = te
          , n = je()
          , i = oe;
        if (i) {
            if (l === void 0)
                throw Error(r(407));
            l = l()
        } else
            l = t();
        var f = !mt((be || n).memoizedState, l);
        if (f && (n.memoizedState = l,
        Be = !0),
        n = n.queue,
        Ys(Yo.bind(null, a, n, e), [e]),
        n.getSnapshot !== t || f || He !== null && He.memoizedState.tag & 1) {
            if (a.flags |= 2048,
            za(9, {
                destroy: void 0
            }, qo.bind(null, a, n, l, t), null),
            Oe === null)
                throw Error(r(349));
            i || (Wt & 127) !== 0 || Bo(a, t, l)
        }
        return l
    }
    function Bo(e, t, l) {
        e.flags |= 16384,
        e = {
            getSnapshot: t,
            value: l
        },
        t = te.updateQueue,
        t === null ? (t = Ni(),
        te.updateQueue = t,
        t.stores = [e]) : (l = t.stores,
        l === null ? t.stores = [e] : l.push(e))
    }
    function qo(e, t, l, a) {
        t.value = l,
        t.getSnapshot = a,
        Go(t) && Vo(e)
    }
    function Yo(e, t, l) {
        return l(function() {
            Go(t) && Vo(e)
        })
    }
    function Go(e) {
        var t = e.getSnapshot;
        e = e.value;
        try {
            var l = t();
            return !mt(e, l)
        } catch {
            return !0
        }
    }
    function Vo(e) {
        var t = Ql(e, 2);
        t !== null && ot(t, e, 2)
    }
    function Bs(e) {
        var t = lt();
        if (typeof e == "function") {
            var l = e;
            if (e = l(),
            Pl) {
                fl(!0);
                try {
                    l()
                } finally {
                    fl(!1)
                }
            }
        }
        return t.memoizedState = t.baseState = e,
        t.queue = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: Pt,
            lastRenderedState: e
        },
        t
    }
    function Qo(e, t, l, a) {
        return e.baseState = l,
        ws(e, be, typeof a == "function" ? a : Pt)
    }
    function Xg(e, t, l, a, n) {
        if (ji(e))
            throw Error(r(485));
        if (e = t.action,
        e !== null) {
            var i = {
                payload: n,
                action: e,
                next: null,
                isTransition: !0,
                status: "pending",
                value: null,
                reason: null,
                listeners: [],
                then: function(f) {
                    i.listeners.push(f)
                }
            };
            N.T !== null ? l(!0) : i.isTransition = !1,
            a(i),
            l = t.pending,
            l === null ? (i.next = t.pending = i,
            Xo(t, i)) : (i.next = l.next,
            t.pending = l.next = i)
        }
    }
    function Xo(e, t) {
        var l = t.action
          , a = t.payload
          , n = e.state;
        if (t.isTransition) {
            var i = N.T
              , f = {};
            N.T = f;
            try {
                var m = l(n, a)
                  , S = N.S;
                S !== null && S(f, m),
                Zo(e, t, m)
            } catch (A) {
                qs(e, t, A)
            } finally {
                i !== null && f.types !== null && (i.types = f.types),
                N.T = i
            }
        } else
            try {
                i = l(n, a),
                Zo(e, t, i)
            } catch (A) {
                qs(e, t, A)
            }
    }
    function Zo(e, t, l) {
        l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(function(a) {
            Ko(e, t, a)
        }, function(a) {
            return qs(e, t, a)
        }) : Ko(e, t, l)
    }
    function Ko(e, t, l) {
        t.status = "fulfilled",
        t.value = l,
        Jo(t),
        e.state = l,
        t = e.pending,
        t !== null && (l = t.next,
        l === t ? e.pending = null : (l = l.next,
        t.next = l,
        Xo(e, l)))
    }
    function qs(e, t, l) {
        var a = e.pending;
        if (e.pending = null,
        a !== null) {
            a = a.next;
            do
                t.status = "rejected",
                t.reason = l,
                Jo(t),
                t = t.next;
            while (t !== a)
        }
        e.action = null
    }
    function Jo(e) {
        e = e.listeners;
        for (var t = 0; t < e.length; t++)
            (0,
            e[t])()
    }
    function $o(e, t) {
        return t
    }
    function ko(e, t) {
        if (oe) {
            var l = Oe.formState;
            if (l !== null) {
                e: {
                    var a = te;
                    if (oe) {
                        if (Re) {
                            t: {
                                for (var n = Re, i = _t; n.nodeType !== 8; ) {
                                    if (!i) {
                                        n = null;
                                        break t
                                    }
                                    if (n = Nt(n.nextSibling),
                                    n === null) {
                                        n = null;
                                        break t
                                    }
                                }
                                i = n.data,
                                n = i === "F!" || i === "F" ? n : null
                            }
                            if (n) {
                                Re = Nt(n.nextSibling),
                                a = n.data === "F!";
                                break e
                            }
                        }
                        pl(a)
                    }
                    a = !1
                }
                a && (t = l[0])
            }
        }
        return l = lt(),
        l.memoizedState = l.baseState = t,
        a = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: $o,
            lastRenderedState: t
        },
        l.queue = a,
        l = gf.bind(null, te, a),
        a.dispatch = l,
        a = Bs(!1),
        i = Zs.bind(null, te, !1, a.queue),
        a = lt(),
        n = {
            state: t,
            dispatch: null,
            action: e,
            pending: null
        },
        a.queue = n,
        l = Xg.bind(null, te, n, i, l),
        n.dispatch = l,
        a.memoizedState = e,
        [t, l, !1]
    }
    function Fo(e) {
        var t = je();
        return Wo(t, be, e)
    }
    function Wo(e, t, l) {
        if (t = ws(e, t, $o)[0],
        e = Mi(Pt)[0],
        typeof t == "object" && t !== null && typeof t.then == "function")
            try {
                var a = pn(t)
            } catch (f) {
                throw f === Ea ? Ei : f
            }
        else
            a = t;
        t = je();
        var n = t.queue
          , i = n.dispatch;
        return l !== t.memoizedState && (te.flags |= 2048,
        za(9, {
            destroy: void 0
        }, Zg.bind(null, n, l), null)),
        [a, i, e]
    }
    function Zg(e, t) {
        e.action = t
    }
    function Po(e) {
        var t = je()
          , l = be;
        if (l !== null)
            return Wo(t, l, e);
        je(),
        t = t.memoizedState,
        l = je();
        var a = l.queue.dispatch;
        return l.memoizedState = e,
        [t, a, !1]
    }
    function za(e, t, l, a) {
        return e = {
            tag: e,
            create: l,
            deps: a,
            inst: t,
            next: null
        },
        t = te.updateQueue,
        t === null && (t = Ni(),
        te.updateQueue = t),
        l = t.lastEffect,
        l === null ? t.lastEffect = e.next = e : (a = l.next,
        l.next = e,
        e.next = a,
        t.lastEffect = e),
        e
    }
    function Io() {
        return je().memoizedState
    }
    function Ui(e, t, l, a) {
        var n = lt();
        te.flags |= e,
        n.memoizedState = za(1 | t, {
            destroy: void 0
        }, l, a === void 0 ? null : a)
    }
    function Li(e, t, l, a) {
        var n = je();
        a = a === void 0 ? null : a;
        var i = n.memoizedState.inst;
        be !== null && a !== null && Ns(a, be.memoizedState.deps) ? n.memoizedState = za(t, i, l, a) : (te.flags |= e,
        n.memoizedState = za(1 | t, i, l, a))
    }
    function ef(e, t) {
        Ui(8390656, 8, e, t)
    }
    function Ys(e, t) {
        Li(2048, 8, e, t)
    }
    function Kg(e) {
        te.flags |= 4;
        var t = te.updateQueue;
        if (t === null)
            t = Ni(),
            te.updateQueue = t,
            t.events = [e];
        else {
            var l = t.events;
            l === null ? t.events = [e] : l.push(e)
        }
    }
    function tf(e) {
        var t = je().memoizedState;
        return Kg({
            ref: t,
            nextImpl: e
        }),
        function() {
            if ((me & 2) !== 0)
                throw Error(r(440));
            return t.impl.apply(void 0, arguments)
        }
    }
    function lf(e, t) {
        return Li(4, 2, e, t)
    }
    function af(e, t) {
        return Li(4, 4, e, t)
    }
    function nf(e, t) {
        if (typeof t == "function") {
            e = e();
            var l = t(e);
            return function() {
                typeof l == "function" ? l() : t(null)
            }
        }
        if (t != null)
            return e = e(),
            t.current = e,
            function() {
                t.current = null
            }
    }
    function uf(e, t, l) {
        l = l != null ? l.concat([e]) : null,
        Li(4, 4, nf.bind(null, t, e), l)
    }
    function Gs() {}
    function sf(e, t) {
        var l = je();
        t = t === void 0 ? null : t;
        var a = l.memoizedState;
        return t !== null && Ns(t, a[1]) ? a[0] : (l.memoizedState = [e, t],
        e)
    }
    function cf(e, t) {
        var l = je();
        t = t === void 0 ? null : t;
        var a = l.memoizedState;
        if (t !== null && Ns(t, a[1]))
            return a[0];
        if (a = e(),
        Pl) {
            fl(!0);
            try {
                e()
            } finally {
                fl(!1)
            }
        }
        return l.memoizedState = [a, t],
        a
    }
    function Vs(e, t, l) {
        return l === void 0 || (Wt & 1073741824) !== 0 && (se & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = l,
        e = rd(),
        te.lanes |= e,
        Rl |= e,
        l)
    }
    function rf(e, t, l, a) {
        return mt(l, t) ? l : Ta.current !== null ? (e = Vs(e, l, a),
        mt(e, t) || (Be = !0),
        e) : (Wt & 42) === 0 || (Wt & 1073741824) !== 0 && (se & 261930) === 0 ? (Be = !0,
        e.memoizedState = l) : (e = rd(),
        te.lanes |= e,
        Rl |= e,
        t)
    }
    function of(e, t, l, a, n) {
        var i = Y.p;
        Y.p = i !== 0 && 8 > i ? i : 8;
        var f = N.T
          , m = {};
        N.T = m,
        Zs(e, !1, t, l);
        try {
            var S = n()
              , A = N.S;
            if (A !== null && A(m, S),
            S !== null && typeof S == "object" && typeof S.then == "function") {
                var M = Gg(S, a);
                yn(e, t, M, bt(e))
            } else
                yn(e, t, a, bt(e))
        } catch (j) {
            yn(e, t, {
                then: function() {},
                status: "rejected",
                reason: j
            }, bt())
        } finally {
            Y.p = i,
            f !== null && m.types !== null && (f.types = m.types),
            N.T = f
        }
    }
    function Jg() {}
    function Qs(e, t, l, a) {
        if (e.tag !== 5)
            throw Error(r(476));
        var n = ff(e).queue;
        of(e, n, t, k, l === null ? Jg : function() {
            return df(e),
            l(a)
        }
        )
    }
    function ff(e) {
        var t = e.memoizedState;
        if (t !== null)
            return t;
        t = {
            memoizedState: k,
            baseState: k,
            baseQueue: null,
            queue: {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: Pt,
                lastRenderedState: k
            },
            next: null
        };
        var l = {};
        return t.next = {
            memoizedState: l,
            baseState: l,
            baseQueue: null,
            queue: {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: Pt,
                lastRenderedState: l
            },
            next: null
        },
        e.memoizedState = t,
        e = e.alternate,
        e !== null && (e.memoizedState = t),
        t
    }
    function df(e) {
        var t = ff(e);
        t.next === null && (t = e.alternate.memoizedState),
        yn(e, t.next.queue, {}, bt())
    }
    function Xs() {
        return $e(Ln)
    }
    function hf() {
        return je().memoizedState
    }
    function mf() {
        return je().memoizedState
    }
    function $g(e) {
        for (var t = e.return; t !== null; ) {
            switch (t.tag) {
            case 24:
            case 3:
                var l = bt();
                e = Sl(l);
                var a = bl(t, e, l);
                a !== null && (ot(a, t, l),
                dn(a, t, l)),
                t = {
                    cache: Ss()
                },
                e.payload = t;
                return
            }
            t = t.return
        }
    }
    function kg(e, t, l) {
        var a = bt();
        l = {
            lane: a,
            revertLane: 0,
            gesture: null,
            action: l,
            hasEagerState: !1,
            eagerState: null,
            next: null
        },
        ji(e) ? pf(t, l) : (l = cs(e, t, l, a),
        l !== null && (ot(l, e, a),
        yf(l, t, a)))
    }
    function gf(e, t, l) {
        var a = bt();
        yn(e, t, l, a)
    }
    function yn(e, t, l, a) {
        var n = {
            lane: a,
            revertLane: 0,
            gesture: null,
            action: l,
            hasEagerState: !1,
            eagerState: null,
            next: null
        };
        if (ji(e))
            pf(t, n);
        else {
            var i = e.alternate;
            if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer,
            i !== null))
                try {
                    var f = t.lastRenderedState
                      , m = i(f, l);
                    if (n.hasEagerState = !0,
                    n.eagerState = m,
                    mt(m, f))
                        return gi(e, t, n, 0),
                        Oe === null && mi(),
                        !1
                } catch {}
            if (l = cs(e, t, n, a),
            l !== null)
                return ot(l, e, a),
                yf(l, t, a),
                !0
        }
        return !1
    }
    function Zs(e, t, l, a) {
        if (a = {
            lane: 2,
            revertLane: Oc(),
            gesture: null,
            action: a,
            hasEagerState: !1,
            eagerState: null,
            next: null
        },
        ji(e)) {
            if (t)
                throw Error(r(479))
        } else
            t = cs(e, l, a, 2),
            t !== null && ot(t, e, 2)
    }
    function ji(e) {
        var t = e.alternate;
        return e === te || t !== null && t === te
    }
    function pf(e, t) {
        Ra = _i = !0;
        var l = e.pending;
        l === null ? t.next = t : (t.next = l.next,
        l.next = t),
        e.pending = t
    }
    function yf(e, t, l) {
        if ((l & 4194048) !== 0) {
            var a = t.lanes;
            a &= e.pendingLanes,
            l |= a,
            t.lanes = l,
            br(e, l)
        }
    }
    var vn = {
        readContext: $e,
        use: Di,
        useCallback: Ne,
        useContext: Ne,
        useEffect: Ne,
        useImperativeHandle: Ne,
        useLayoutEffect: Ne,
        useInsertionEffect: Ne,
        useMemo: Ne,
        useReducer: Ne,
        useRef: Ne,
        useState: Ne,
        useDebugValue: Ne,
        useDeferredValue: Ne,
        useTransition: Ne,
        useSyncExternalStore: Ne,
        useId: Ne,
        useHostTransitionStatus: Ne,
        useFormState: Ne,
        useActionState: Ne,
        useOptimistic: Ne,
        useMemoCache: Ne,
        useCacheRefresh: Ne
    };
    vn.useEffectEvent = Ne;
    var vf = {
        readContext: $e,
        use: Di,
        useCallback: function(e, t) {
            return lt().memoizedState = [e, t === void 0 ? null : t],
            e
        },
        useContext: $e,
        useEffect: ef,
        useImperativeHandle: function(e, t, l) {
            l = l != null ? l.concat([e]) : null,
            Ui(4194308, 4, nf.bind(null, t, e), l)
        },
        useLayoutEffect: function(e, t) {
            return Ui(4194308, 4, e, t)
        },
        useInsertionEffect: function(e, t) {
            Ui(4, 2, e, t)
        },
        useMemo: function(e, t) {
            var l = lt();
            t = t === void 0 ? null : t;
            var a = e();
            if (Pl) {
                fl(!0);
                try {
                    e()
                } finally {
                    fl(!1)
                }
            }
            return l.memoizedState = [a, t],
            a
        },
        useReducer: function(e, t, l) {
            var a = lt();
            if (l !== void 0) {
                var n = l(t);
                if (Pl) {
                    fl(!0);
                    try {
                        l(t)
                    } finally {
                        fl(!1)
                    }
                }
            } else
                n = t;
            return a.memoizedState = a.baseState = n,
            e = {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: e,
                lastRenderedState: n
            },
            a.queue = e,
            e = e.dispatch = kg.bind(null, te, e),
            [a.memoizedState, e]
        },
        useRef: function(e) {
            var t = lt();
            return e = {
                current: e
            },
            t.memoizedState = e
        },
        useState: function(e) {
            e = Bs(e);
            var t = e.queue
              , l = gf.bind(null, te, t);
            return t.dispatch = l,
            [e.memoizedState, l]
        },
        useDebugValue: Gs,
        useDeferredValue: function(e, t) {
            var l = lt();
            return Vs(l, e, t)
        },
        useTransition: function() {
            var e = Bs(!1);
            return e = of.bind(null, te, e.queue, !0, !1),
            lt().memoizedState = e,
            [!1, e]
        },
        useSyncExternalStore: function(e, t, l) {
            var a = te
              , n = lt();
            if (oe) {
                if (l === void 0)
                    throw Error(r(407));
                l = l()
            } else {
                if (l = t(),
                Oe === null)
                    throw Error(r(349));
                (se & 127) !== 0 || Bo(a, t, l)
            }
            n.memoizedState = l;
            var i = {
                value: l,
                getSnapshot: t
            };
            return n.queue = i,
            ef(Yo.bind(null, a, i, e), [e]),
            a.flags |= 2048,
            za(9, {
                destroy: void 0
            }, qo.bind(null, a, i, l, t), null),
            l
        },
        useId: function() {
            var e = lt()
              , t = Oe.identifierPrefix;
            if (oe) {
                var l = qt
                  , a = Bt;
                l = (a & ~(1 << 32 - ht(a) - 1)).toString(32) + l,
                t = "_" + t + "R_" + l,
                l = Ci++,
                0 < l && (t += "H" + l.toString(32)),
                t += "_"
            } else
                l = Vg++,
                t = "_" + t + "r_" + l.toString(32) + "_";
            return e.memoizedState = t
        },
        useHostTransitionStatus: Xs,
        useFormState: ko,
        useActionState: ko,
        useOptimistic: function(e) {
            var t = lt();
            t.memoizedState = t.baseState = e;
            var l = {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: null,
                lastRenderedState: null
            };
            return t.queue = l,
            t = Zs.bind(null, te, !0, l),
            l.dispatch = t,
            [e, t]
        },
        useMemoCache: js,
        useCacheRefresh: function() {
            return lt().memoizedState = $g.bind(null, te)
        },
        useEffectEvent: function(e) {
            var t = lt()
              , l = {
                impl: e
            };
            return t.memoizedState = l,
            function() {
                if ((me & 2) !== 0)
                    throw Error(r(440));
                return l.impl.apply(void 0, arguments)
            }
        }
    }
      , Ks = {
        readContext: $e,
        use: Di,
        useCallback: sf,
        useContext: $e,
        useEffect: Ys,
        useImperativeHandle: uf,
        useInsertionEffect: lf,
        useLayoutEffect: af,
        useMemo: cf,
        useReducer: Mi,
        useRef: Io,
        useState: function() {
            return Mi(Pt)
        },
        useDebugValue: Gs,
        useDeferredValue: function(e, t) {
            var l = je();
            return rf(l, be.memoizedState, e, t)
        },
        useTransition: function() {
            var e = Mi(Pt)[0]
              , t = je().memoizedState;
            return [typeof e == "boolean" ? e : pn(e), t]
        },
        useSyncExternalStore: Ho,
        useId: hf,
        useHostTransitionStatus: Xs,
        useFormState: Fo,
        useActionState: Fo,
        useOptimistic: function(e, t) {
            var l = je();
            return Qo(l, be, e, t)
        },
        useMemoCache: js,
        useCacheRefresh: mf
    };
    Ks.useEffectEvent = tf;
    var Sf = {
        readContext: $e,
        use: Di,
        useCallback: sf,
        useContext: $e,
        useEffect: Ys,
        useImperativeHandle: uf,
        useInsertionEffect: lf,
        useLayoutEffect: af,
        useMemo: cf,
        useReducer: Hs,
        useRef: Io,
        useState: function() {
            return Hs(Pt)
        },
        useDebugValue: Gs,
        useDeferredValue: function(e, t) {
            var l = je();
            return be === null ? Vs(l, e, t) : rf(l, be.memoizedState, e, t)
        },
        useTransition: function() {
            var e = Hs(Pt)[0]
              , t = je().memoizedState;
            return [typeof e == "boolean" ? e : pn(e), t]
        },
        useSyncExternalStore: Ho,
        useId: hf,
        useHostTransitionStatus: Xs,
        useFormState: Po,
        useActionState: Po,
        useOptimistic: function(e, t) {
            var l = je();
            return be !== null ? Qo(l, be, e, t) : (l.baseState = e,
            [e, l.queue.dispatch])
        },
        useMemoCache: js,
        useCacheRefresh: mf
    };
    Sf.useEffectEvent = tf;
    function Js(e, t, l, a) {
        t = e.memoizedState,
        l = l(a, t),
        l = l == null ? t : v({}, t, l),
        e.memoizedState = l,
        e.lanes === 0 && (e.updateQueue.baseState = l)
    }
    var $s = {
        enqueueSetState: function(e, t, l) {
            e = e._reactInternals;
            var a = bt()
              , n = Sl(a);
            n.payload = t,
            l != null && (n.callback = l),
            t = bl(e, n, a),
            t !== null && (ot(t, e, a),
            dn(t, e, a))
        },
        enqueueReplaceState: function(e, t, l) {
            e = e._reactInternals;
            var a = bt()
              , n = Sl(a);
            n.tag = 1,
            n.payload = t,
            l != null && (n.callback = l),
            t = bl(e, n, a),
            t !== null && (ot(t, e, a),
            dn(t, e, a))
        },
        enqueueForceUpdate: function(e, t) {
            e = e._reactInternals;
            var l = bt()
              , a = Sl(l);
            a.tag = 2,
            t != null && (a.callback = t),
            t = bl(e, a, l),
            t !== null && (ot(t, e, l),
            dn(t, e, l))
        }
    };
    function bf(e, t, l, a, n, i, f) {
        return e = e.stateNode,
        typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(a, i, f) : t.prototype && t.prototype.isPureReactComponent ? !an(l, a) || !an(n, i) : !0
    }
    function xf(e, t, l, a) {
        e = t.state,
        typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(l, a),
        typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(l, a),
        t.state !== e && $s.enqueueReplaceState(t, t.state, null)
    }
    function Il(e, t) {
        var l = t;
        if ("ref"in t) {
            l = {};
            for (var a in t)
                a !== "ref" && (l[a] = t[a])
        }
        if (e = e.defaultProps) {
            l === t && (l = v({}, l));
            for (var n in e)
                l[n] === void 0 && (l[n] = e[n])
        }
        return l
    }
    function Ef(e) {
        hi(e)
    }
    function Of(e) {
        console.error(e)
    }
    function Tf(e) {
        hi(e)
    }
    function wi(e, t) {
        try {
            var l = e.onUncaughtError;
            l(t.value, {
                componentStack: t.stack
            })
        } catch (a) {
            setTimeout(function() {
                throw a
            })
        }
    }
    function Rf(e, t, l) {
        try {
            var a = e.onCaughtError;
            a(l.value, {
                componentStack: l.stack,
                errorBoundary: t.tag === 1 ? t.stateNode : null
            })
        } catch (n) {
            setTimeout(function() {
                throw n
            })
        }
    }
    function ks(e, t, l) {
        return l = Sl(l),
        l.tag = 3,
        l.payload = {
            element: null
        },
        l.callback = function() {
            wi(e, t)
        }
        ,
        l
    }
    function Af(e) {
        return e = Sl(e),
        e.tag = 3,
        e
    }
    function zf(e, t, l, a) {
        var n = l.type.getDerivedStateFromError;
        if (typeof n == "function") {
            var i = a.value;
            e.payload = function() {
                return n(i)
            }
            ,
            e.callback = function() {
                Rf(t, l, a)
            }
        }
        var f = l.stateNode;
        f !== null && typeof f.componentDidCatch == "function" && (e.callback = function() {
            Rf(t, l, a),
            typeof n != "function" && (Al === null ? Al = new Set([this]) : Al.add(this));
            var m = a.stack;
            this.componentDidCatch(a.value, {
                componentStack: m !== null ? m : ""
            })
        }
        )
    }
    function Fg(e, t, l, a, n) {
        if (l.flags |= 32768,
        a !== null && typeof a == "object" && typeof a.then == "function") {
            if (t = l.alternate,
            t !== null && Sa(t, l, n, !0),
            l = pt.current,
            l !== null) {
                switch (l.tag) {
                case 31:
                case 13:
                    return Ct === null ? $i() : l.alternate === null && De === 0 && (De = 3),
                    l.flags &= -257,
                    l.flags |= 65536,
                    l.lanes = n,
                    a === Oi ? l.flags |= 16384 : (t = l.updateQueue,
                    t === null ? l.updateQueue = new Set([a]) : t.add(a),
                    bc(e, a, n)),
                    !1;
                case 22:
                    return l.flags |= 65536,
                    a === Oi ? l.flags |= 16384 : (t = l.updateQueue,
                    t === null ? (t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([a])
                    },
                    l.updateQueue = t) : (l = t.retryQueue,
                    l === null ? t.retryQueue = new Set([a]) : l.add(a)),
                    bc(e, a, n)),
                    !1
                }
                throw Error(r(435, l.tag))
            }
            return bc(e, a, n),
            $i(),
            !1
        }
        if (oe)
            return t = pt.current,
            t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            t.flags |= 65536,
            t.lanes = n,
            a !== ms && (e = Error(r(422), {
                cause: a
            }),
            sn(Rt(e, l)))) : (a !== ms && (t = Error(r(423), {
                cause: a
            }),
            sn(Rt(t, l))),
            e = e.current.alternate,
            e.flags |= 65536,
            n &= -n,
            e.lanes |= n,
            a = Rt(a, l),
            n = ks(e.stateNode, a, n),
            Rs(e, n),
            De !== 4 && (De = 2)),
            !1;
        var i = Error(r(520), {
            cause: a
        });
        if (i = Rt(i, l),
        An === null ? An = [i] : An.push(i),
        De !== 4 && (De = 2),
        t === null)
            return !0;
        a = Rt(a, l),
        l = t;
        do {
            switch (l.tag) {
            case 3:
                return l.flags |= 65536,
                e = n & -n,
                l.lanes |= e,
                e = ks(l.stateNode, a, e),
                Rs(l, e),
                !1;
            case 1:
                if (t = l.type,
                i = l.stateNode,
                (l.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || i !== null && typeof i.componentDidCatch == "function" && (Al === null || !Al.has(i))))
                    return l.flags |= 65536,
                    n &= -n,
                    l.lanes |= n,
                    n = Af(n),
                    zf(n, e, l, a),
                    Rs(l, n),
                    !1
            }
            l = l.return
        } while (l !== null);
        return !1
    }
    var Fs = Error(r(461))
      , Be = !1;
    function ke(e, t, l, a) {
        t.child = e === null ? No(t, null, l, a) : Wl(t, e.child, l, a)
    }
    function _f(e, t, l, a, n) {
        l = l.render;
        var i = t.ref;
        if ("ref"in a) {
            var f = {};
            for (var m in a)
                m !== "ref" && (f[m] = a[m])
        } else
            f = a;
        return Jl(t),
        a = Ds(e, t, l, f, i, n),
        m = Ms(),
        e !== null && !Be ? (Us(e, t, n),
        It(e, t, n)) : (oe && m && ds(t),
        t.flags |= 1,
        ke(e, t, a, n),
        t.child)
    }
    function Cf(e, t, l, a, n) {
        if (e === null) {
            var i = l.type;
            return typeof i == "function" && !rs(i) && i.defaultProps === void 0 && l.compare === null ? (t.tag = 15,
            t.type = i,
            Nf(e, t, i, a, n)) : (e = yi(l.type, null, a, t, t.mode, n),
            e.ref = t.ref,
            e.return = t,
            t.child = e)
        }
        if (i = e.child,
        !nc(e, n)) {
            var f = i.memoizedProps;
            if (l = l.compare,
            l = l !== null ? l : an,
            l(f, a) && e.ref === t.ref)
                return It(e, t, n)
        }
        return t.flags |= 1,
        e = Jt(i, a),
        e.ref = t.ref,
        e.return = t,
        t.child = e
    }
    function Nf(e, t, l, a, n) {
        if (e !== null) {
            var i = e.memoizedProps;
            if (an(i, a) && e.ref === t.ref)
                if (Be = !1,
                t.pendingProps = a = i,
                nc(e, n))
                    (e.flags & 131072) !== 0 && (Be = !0);
                else
                    return t.lanes = e.lanes,
                    It(e, t, n)
        }
        return Ws(e, t, l, a, n)
    }
    function Df(e, t, l, a) {
        var n = a.children
          , i = e !== null ? e.memoizedState : null;
        if (e === null && t.stateNode === null && (t.stateNode = {
            _visibility: 1,
            _pendingMarkers: null,
            _retryCache: null,
            _transitions: null
        }),
        a.mode === "hidden") {
            if ((t.flags & 128) !== 0) {
                if (i = i !== null ? i.baseLanes | l : l,
                e !== null) {
                    for (a = t.child = e.child,
                    n = 0; a !== null; )
                        n = n | a.lanes | a.childLanes,
                        a = a.sibling;
                    a = n & ~i
                } else
                    a = 0,
                    t.child = null;
                return Mf(e, t, i, l, a)
            }
            if ((l & 536870912) !== 0)
                t.memoizedState = {
                    baseLanes: 0,
                    cachePool: null
                },
                e !== null && xi(t, i !== null ? i.cachePool : null),
                i !== null ? Uo(t, i) : zs(),
                Lo(t);
            else
                return a = t.lanes = 536870912,
                Mf(e, t, i !== null ? i.baseLanes | l : l, l, a)
        } else
            i !== null ? (xi(t, i.cachePool),
            Uo(t, i),
            El(),
            t.memoizedState = null) : (e !== null && xi(t, null),
            zs(),
            El());
        return ke(e, t, n, l),
        t.child
    }
    function Sn(e, t) {
        return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
            _visibility: 1,
            _pendingMarkers: null,
            _retryCache: null,
            _transitions: null
        }),
        t.sibling
    }
    function Mf(e, t, l, a, n) {
        var i = xs();
        return i = i === null ? null : {
            parent: we._currentValue,
            pool: i
        },
        t.memoizedState = {
            baseLanes: l,
            cachePool: i
        },
        e !== null && xi(t, null),
        zs(),
        Lo(t),
        e !== null && Sa(e, t, a, !0),
        t.childLanes = n,
        null
    }
    function Hi(e, t) {
        return t = qi({
            mode: t.mode,
            children: t.children
        }, e.mode),
        t.ref = e.ref,
        e.child = t,
        t.return = e,
        t
    }
    function Uf(e, t, l) {
        return Wl(t, e.child, null, l),
        e = Hi(t, t.pendingProps),
        e.flags |= 2,
        yt(t),
        t.memoizedState = null,
        e
    }
    function Wg(e, t, l) {
        var a = t.pendingProps
          , n = (t.flags & 128) !== 0;
        if (t.flags &= -129,
        e === null) {
            if (oe) {
                if (a.mode === "hidden")
                    return e = Hi(t, a),
                    t.lanes = 536870912,
                    Sn(null, e);
                if (Cs(t),
                (e = Re) ? (e = Zd(e, _t),
                e = e !== null && e.data === "&" ? e : null,
                e !== null && (t.memoizedState = {
                    dehydrated: e,
                    treeContext: ml !== null ? {
                        id: Bt,
                        overflow: qt
                    } : null,
                    retryLane: 536870912,
                    hydrationErrors: null
                },
                l = go(e),
                l.return = t,
                t.child = l,
                Je = t,
                Re = null)) : e = null,
                e === null)
                    throw pl(t);
                return t.lanes = 536870912,
                null
            }
            return Hi(t, a)
        }
        var i = e.memoizedState;
        if (i !== null) {
            var f = i.dehydrated;
            if (Cs(t),
            n)
                if (t.flags & 256)
                    t.flags &= -257,
                    t = Uf(e, t, l);
                else if (t.memoizedState !== null)
                    t.child = e.child,
                    t.flags |= 128,
                    t = null;
                else
                    throw Error(r(558));
            else if (Be || Sa(e, t, l, !1),
            n = (l & e.childLanes) !== 0,
            Be || n) {
                if (a = Oe,
                a !== null && (f = xr(a, l),
                f !== 0 && f !== i.retryLane))
                    throw i.retryLane = f,
                    Ql(e, f),
                    ot(a, e, f),
                    Fs;
                $i(),
                t = Uf(e, t, l)
            } else
                e = i.treeContext,
                Re = Nt(f.nextSibling),
                Je = t,
                oe = !0,
                gl = null,
                _t = !1,
                e !== null && vo(t, e),
                t = Hi(t, a),
                t.flags |= 4096;
            return t
        }
        return e = Jt(e.child, {
            mode: a.mode,
            children: a.children
        }),
        e.ref = t.ref,
        t.child = e,
        e.return = t,
        e
    }
    function Bi(e, t) {
        var l = t.ref;
        if (l === null)
            e !== null && e.ref !== null && (t.flags |= 4194816);
        else {
            if (typeof l != "function" && typeof l != "object")
                throw Error(r(284));
            (e === null || e.ref !== l) && (t.flags |= 4194816)
        }
    }
    function Ws(e, t, l, a, n) {
        return Jl(t),
        l = Ds(e, t, l, a, void 0, n),
        a = Ms(),
        e !== null && !Be ? (Us(e, t, n),
        It(e, t, n)) : (oe && a && ds(t),
        t.flags |= 1,
        ke(e, t, l, n),
        t.child)
    }
    function Lf(e, t, l, a, n, i) {
        return Jl(t),
        t.updateQueue = null,
        l = wo(t, a, l, n),
        jo(e),
        a = Ms(),
        e !== null && !Be ? (Us(e, t, i),
        It(e, t, i)) : (oe && a && ds(t),
        t.flags |= 1,
        ke(e, t, l, i),
        t.child)
    }
    function jf(e, t, l, a, n) {
        if (Jl(t),
        t.stateNode === null) {
            var i = ga
              , f = l.contextType;
            typeof f == "object" && f !== null && (i = $e(f)),
            i = new l(a,i),
            t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null,
            i.updater = $s,
            t.stateNode = i,
            i._reactInternals = t,
            i = t.stateNode,
            i.props = a,
            i.state = t.memoizedState,
            i.refs = {},
            Os(t),
            f = l.contextType,
            i.context = typeof f == "object" && f !== null ? $e(f) : ga,
            i.state = t.memoizedState,
            f = l.getDerivedStateFromProps,
            typeof f == "function" && (Js(t, l, f, a),
            i.state = t.memoizedState),
            typeof l.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (f = i.state,
            typeof i.componentWillMount == "function" && i.componentWillMount(),
            typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(),
            f !== i.state && $s.enqueueReplaceState(i, i.state, null),
            mn(t, a, i, n),
            hn(),
            i.state = t.memoizedState),
            typeof i.componentDidMount == "function" && (t.flags |= 4194308),
            a = !0
        } else if (e === null) {
            i = t.stateNode;
            var m = t.memoizedProps
              , S = Il(l, m);
            i.props = S;
            var A = i.context
              , M = l.contextType;
            f = ga,
            typeof M == "object" && M !== null && (f = $e(M));
            var j = l.getDerivedStateFromProps;
            M = typeof j == "function" || typeof i.getSnapshotBeforeUpdate == "function",
            m = t.pendingProps !== m,
            M || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (m || A !== f) && xf(t, i, a, f),
            vl = !1;
            var z = t.memoizedState;
            i.state = z,
            mn(t, a, i, n),
            hn(),
            A = t.memoizedState,
            m || z !== A || vl ? (typeof j == "function" && (Js(t, l, j, a),
            A = t.memoizedState),
            (S = vl || bf(t, l, S, a, z, A, f)) ? (M || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(),
            typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()),
            typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
            t.memoizedProps = a,
            t.memoizedState = A),
            i.props = a,
            i.state = A,
            i.context = f,
            a = S) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
            a = !1)
        } else {
            i = t.stateNode,
            Ts(e, t),
            f = t.memoizedProps,
            M = Il(l, f),
            i.props = M,
            j = t.pendingProps,
            z = i.context,
            A = l.contextType,
            S = ga,
            typeof A == "object" && A !== null && (S = $e(A)),
            m = l.getDerivedStateFromProps,
            (A = typeof m == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (f !== j || z !== S) && xf(t, i, a, S),
            vl = !1,
            z = t.memoizedState,
            i.state = z,
            mn(t, a, i, n),
            hn();
            var _ = t.memoizedState;
            f !== j || z !== _ || vl || e !== null && e.dependencies !== null && Si(e.dependencies) ? (typeof m == "function" && (Js(t, l, m, a),
            _ = t.memoizedState),
            (M = vl || bf(t, l, M, a, z, _, S) || e !== null && e.dependencies !== null && Si(e.dependencies)) ? (A || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(a, _, S),
            typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(a, _, S)),
            typeof i.componentDidUpdate == "function" && (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || f === e.memoizedProps && z === e.memoizedState || (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate != "function" || f === e.memoizedProps && z === e.memoizedState || (t.flags |= 1024),
            t.memoizedProps = a,
            t.memoizedState = _),
            i.props = a,
            i.state = _,
            i.context = S,
            a = M) : (typeof i.componentDidUpdate != "function" || f === e.memoizedProps && z === e.memoizedState || (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate != "function" || f === e.memoizedProps && z === e.memoizedState || (t.flags |= 1024),
            a = !1)
        }
        return i = a,
        Bi(e, t),
        a = (t.flags & 128) !== 0,
        i || a ? (i = t.stateNode,
        l = a && typeof l.getDerivedStateFromError != "function" ? null : i.render(),
        t.flags |= 1,
        e !== null && a ? (t.child = Wl(t, e.child, null, n),
        t.child = Wl(t, null, l, n)) : ke(e, t, l, n),
        t.memoizedState = i.state,
        e = t.child) : e = It(e, t, n),
        e
    }
    function wf(e, t, l, a) {
        return Zl(),
        t.flags |= 256,
        ke(e, t, l, a),
        t.child
    }
    var Ps = {
        dehydrated: null,
        treeContext: null,
        retryLane: 0,
        hydrationErrors: null
    };
    function Is(e) {
        return {
            baseLanes: e,
            cachePool: To()
        }
    }
    function ec(e, t, l) {
        return e = e !== null ? e.childLanes & ~l : 0,
        t && (e |= St),
        e
    }
    function Hf(e, t, l) {
        var a = t.pendingProps, n = !1, i = (t.flags & 128) !== 0, f;
        if ((f = i) || (f = e !== null && e.memoizedState === null ? !1 : (Le.current & 2) !== 0),
        f && (n = !0,
        t.flags &= -129),
        f = (t.flags & 32) !== 0,
        t.flags &= -33,
        e === null) {
            if (oe) {
                if (n ? xl(t) : El(),
                (e = Re) ? (e = Zd(e, _t),
                e = e !== null && e.data !== "&" ? e : null,
                e !== null && (t.memoizedState = {
                    dehydrated: e,
                    treeContext: ml !== null ? {
                        id: Bt,
                        overflow: qt
                    } : null,
                    retryLane: 536870912,
                    hydrationErrors: null
                },
                l = go(e),
                l.return = t,
                t.child = l,
                Je = t,
                Re = null)) : e = null,
                e === null)
                    throw pl(t);
                return wc(e) ? t.lanes = 32 : t.lanes = 536870912,
                null
            }
            var m = a.children;
            return a = a.fallback,
            n ? (El(),
            n = t.mode,
            m = qi({
                mode: "hidden",
                children: m
            }, n),
            a = Xl(a, n, l, null),
            m.return = t,
            a.return = t,
            m.sibling = a,
            t.child = m,
            a = t.child,
            a.memoizedState = Is(l),
            a.childLanes = ec(e, f, l),
            t.memoizedState = Ps,
            Sn(null, a)) : (xl(t),
            tc(t, m))
        }
        var S = e.memoizedState;
        if (S !== null && (m = S.dehydrated,
        m !== null)) {
            if (i)
                t.flags & 256 ? (xl(t),
                t.flags &= -257,
                t = lc(e, t, l)) : t.memoizedState !== null ? (El(),
                t.child = e.child,
                t.flags |= 128,
                t = null) : (El(),
                m = a.fallback,
                n = t.mode,
                a = qi({
                    mode: "visible",
                    children: a.children
                }, n),
                m = Xl(m, n, l, null),
                m.flags |= 2,
                a.return = t,
                m.return = t,
                a.sibling = m,
                t.child = a,
                Wl(t, e.child, null, l),
                a = t.child,
                a.memoizedState = Is(l),
                a.childLanes = ec(e, f, l),
                t.memoizedState = Ps,
                t = Sn(null, a));
            else if (xl(t),
            wc(m)) {
                if (f = m.nextSibling && m.nextSibling.dataset,
                f)
                    var A = f.dgst;
                f = A,
                a = Error(r(419)),
                a.stack = "",
                a.digest = f,
                sn({
                    value: a,
                    source: null,
                    stack: null
                }),
                t = lc(e, t, l)
            } else if (Be || Sa(e, t, l, !1),
            f = (l & e.childLanes) !== 0,
            Be || f) {
                if (f = Oe,
                f !== null && (a = xr(f, l),
                a !== 0 && a !== S.retryLane))
                    throw S.retryLane = a,
                    Ql(e, a),
                    ot(f, e, a),
                    Fs;
                jc(m) || $i(),
                t = lc(e, t, l)
            } else
                jc(m) ? (t.flags |= 192,
                t.child = e.child,
                t = null) : (e = S.treeContext,
                Re = Nt(m.nextSibling),
                Je = t,
                oe = !0,
                gl = null,
                _t = !1,
                e !== null && vo(t, e),
                t = tc(t, a.children),
                t.flags |= 4096);
            return t
        }
        return n ? (El(),
        m = a.fallback,
        n = t.mode,
        S = e.child,
        A = S.sibling,
        a = Jt(S, {
            mode: "hidden",
            children: a.children
        }),
        a.subtreeFlags = S.subtreeFlags & 65011712,
        A !== null ? m = Jt(A, m) : (m = Xl(m, n, l, null),
        m.flags |= 2),
        m.return = t,
        a.return = t,
        a.sibling = m,
        t.child = a,
        Sn(null, a),
        a = t.child,
        m = e.child.memoizedState,
        m === null ? m = Is(l) : (n = m.cachePool,
        n !== null ? (S = we._currentValue,
        n = n.parent !== S ? {
            parent: S,
            pool: S
        } : n) : n = To(),
        m = {
            baseLanes: m.baseLanes | l,
            cachePool: n
        }),
        a.memoizedState = m,
        a.childLanes = ec(e, f, l),
        t.memoizedState = Ps,
        Sn(e.child, a)) : (xl(t),
        l = e.child,
        e = l.sibling,
        l = Jt(l, {
            mode: "visible",
            children: a.children
        }),
        l.return = t,
        l.sibling = null,
        e !== null && (f = t.deletions,
        f === null ? (t.deletions = [e],
        t.flags |= 16) : f.push(e)),
        t.child = l,
        t.memoizedState = null,
        l)
    }
    function tc(e, t) {
        return t = qi({
            mode: "visible",
            children: t
        }, e.mode),
        t.return = e,
        e.child = t
    }
    function qi(e, t) {
        return e = gt(22, e, null, t),
        e.lanes = 0,
        e
    }
    function lc(e, t, l) {
        return Wl(t, e.child, null, l),
        e = tc(t, t.pendingProps.children),
        e.flags |= 2,
        t.memoizedState = null,
        e
    }
    function Bf(e, t, l) {
        e.lanes |= t;
        var a = e.alternate;
        a !== null && (a.lanes |= t),
        ys(e.return, t, l)
    }
    function ac(e, t, l, a, n, i) {
        var f = e.memoizedState;
        f === null ? e.memoizedState = {
            isBackwards: t,
            rendering: null,
            renderingStartTime: 0,
            last: a,
            tail: l,
            tailMode: n,
            treeForkCount: i
        } : (f.isBackwards = t,
        f.rendering = null,
        f.renderingStartTime = 0,
        f.last = a,
        f.tail = l,
        f.tailMode = n,
        f.treeForkCount = i)
    }
    function qf(e, t, l) {
        var a = t.pendingProps
          , n = a.revealOrder
          , i = a.tail;
        a = a.children;
        var f = Le.current
          , m = (f & 2) !== 0;
        if (m ? (f = f & 1 | 2,
        t.flags |= 128) : f &= 1,
        G(Le, f),
        ke(e, t, a, l),
        a = oe ? un : 0,
        !m && e !== null && (e.flags & 128) !== 0)
            e: for (e = t.child; e !== null; ) {
                if (e.tag === 13)
                    e.memoizedState !== null && Bf(e, l, t);
                else if (e.tag === 19)
                    Bf(e, l, t);
                else if (e.child !== null) {
                    e.child.return = e,
                    e = e.child;
                    continue
                }
                if (e === t)
                    break e;
                for (; e.sibling === null; ) {
                    if (e.return === null || e.return === t)
                        break e;
                    e = e.return
                }
                e.sibling.return = e.return,
                e = e.sibling
            }
        switch (n) {
        case "forwards":
            for (l = t.child,
            n = null; l !== null; )
                e = l.alternate,
                e !== null && zi(e) === null && (n = l),
                l = l.sibling;
            l = n,
            l === null ? (n = t.child,
            t.child = null) : (n = l.sibling,
            l.sibling = null),
            ac(t, !1, n, l, i, a);
            break;
        case "backwards":
        case "unstable_legacy-backwards":
            for (l = null,
            n = t.child,
            t.child = null; n !== null; ) {
                if (e = n.alternate,
                e !== null && zi(e) === null) {
                    t.child = n;
                    break
                }
                e = n.sibling,
                n.sibling = l,
                l = n,
                n = e
            }
            ac(t, !0, l, null, i, a);
            break;
        case "together":
            ac(t, !1, null, null, void 0, a);
            break;
        default:
            t.memoizedState = null
        }
        return t.child
    }
    function It(e, t, l) {
        if (e !== null && (t.dependencies = e.dependencies),
        Rl |= t.lanes,
        (l & t.childLanes) === 0)
            if (e !== null) {
                if (Sa(e, t, l, !1),
                (l & t.childLanes) === 0)
                    return null
            } else
                return null;
        if (e !== null && t.child !== e.child)
            throw Error(r(153));
        if (t.child !== null) {
            for (e = t.child,
            l = Jt(e, e.pendingProps),
            t.child = l,
            l.return = t; e.sibling !== null; )
                e = e.sibling,
                l = l.sibling = Jt(e, e.pendingProps),
                l.return = t;
            l.sibling = null
        }
        return t.child
    }
    function nc(e, t) {
        return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies,
        !!(e !== null && Si(e)))
    }
    function Pg(e, t, l) {
        switch (t.tag) {
        case 3:
            tt(t, t.stateNode.containerInfo),
            yl(t, we, e.memoizedState.cache),
            Zl();
            break;
        case 27:
        case 5:
            Xa(t);
            break;
        case 4:
            tt(t, t.stateNode.containerInfo);
            break;
        case 10:
            yl(t, t.type, t.memoizedProps.value);
            break;
        case 31:
            if (t.memoizedState !== null)
                return t.flags |= 128,
                Cs(t),
                null;
            break;
        case 13:
            var a = t.memoizedState;
            if (a !== null)
                return a.dehydrated !== null ? (xl(t),
                t.flags |= 128,
                null) : (l & t.child.childLanes) !== 0 ? Hf(e, t, l) : (xl(t),
                e = It(e, t, l),
                e !== null ? e.sibling : null);
            xl(t);
            break;
        case 19:
            var n = (e.flags & 128) !== 0;
            if (a = (l & t.childLanes) !== 0,
            a || (Sa(e, t, l, !1),
            a = (l & t.childLanes) !== 0),
            n) {
                if (a)
                    return qf(e, t, l);
                t.flags |= 128
            }
            if (n = t.memoizedState,
            n !== null && (n.rendering = null,
            n.tail = null,
            n.lastEffect = null),
            G(Le, Le.current),
            a)
                break;
            return null;
        case 22:
            return t.lanes = 0,
            Df(e, t, l, t.pendingProps);
        case 24:
            yl(t, we, e.memoizedState.cache)
        }
        return It(e, t, l)
    }
    function Yf(e, t, l) {
        if (e !== null)
            if (e.memoizedProps !== t.pendingProps)
                Be = !0;
            else {
                if (!nc(e, l) && (t.flags & 128) === 0)
                    return Be = !1,
                    Pg(e, t, l);
                Be = (e.flags & 131072) !== 0
            }
        else
            Be = !1,
            oe && (t.flags & 1048576) !== 0 && yo(t, un, t.index);
        switch (t.lanes = 0,
        t.tag) {
        case 16:
            e: {
                var a = t.pendingProps;
                if (e = kl(t.elementType),
                t.type = e,
                typeof e == "function")
                    rs(e) ? (a = Il(e, a),
                    t.tag = 1,
                    t = jf(null, t, e, a, l)) : (t.tag = 0,
                    t = Ws(null, t, e, a, l));
                else {
                    if (e != null) {
                        var n = e.$$typeof;
                        if (n === ae) {
                            t.tag = 11,
                            t = _f(null, t, e, a, l);
                            break e
                        } else if (n === W) {
                            t.tag = 14,
                            t = Cf(null, t, e, a, l);
                            break e
                        }
                    }
                    throw t = Me(e) || e,
                    Error(r(306, t, ""))
                }
            }
            return t;
        case 0:
            return Ws(e, t, t.type, t.pendingProps, l);
        case 1:
            return a = t.type,
            n = Il(a, t.pendingProps),
            jf(e, t, a, n, l);
        case 3:
            e: {
                if (tt(t, t.stateNode.containerInfo),
                e === null)
                    throw Error(r(387));
                a = t.pendingProps;
                var i = t.memoizedState;
                n = i.element,
                Ts(e, t),
                mn(t, a, null, l);
                var f = t.memoizedState;
                if (a = f.cache,
                yl(t, we, a),
                a !== i.cache && vs(t, [we], l, !0),
                hn(),
                a = f.element,
                i.isDehydrated)
                    if (i = {
                        element: a,
                        isDehydrated: !1,
                        cache: f.cache
                    },
                    t.updateQueue.baseState = i,
                    t.memoizedState = i,
                    t.flags & 256) {
                        t = wf(e, t, a, l);
                        break e
                    } else if (a !== n) {
                        n = Rt(Error(r(424)), t),
                        sn(n),
                        t = wf(e, t, a, l);
                        break e
                    } else
                        for (e = t.stateNode.containerInfo,
                        e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e,
                        Re = Nt(e.firstChild),
                        Je = t,
                        oe = !0,
                        gl = null,
                        _t = !0,
                        l = No(t, null, a, l),
                        t.child = l; l; )
                            l.flags = l.flags & -3 | 4096,
                            l = l.sibling;
                else {
                    if (Zl(),
                    a === n) {
                        t = It(e, t, l);
                        break e
                    }
                    ke(e, t, a, l)
                }
                t = t.child
            }
            return t;
        case 26:
            return Bi(e, t),
            e === null ? (l = Wd(t.type, null, t.pendingProps, null)) ? t.memoizedState = l : oe || (l = t.type,
            e = t.pendingProps,
            a = tu(ne.current).createElement(l),
            a[Ke] = t,
            a[nt] = e,
            Fe(a, l, e),
            Qe(a),
            t.stateNode = a) : t.memoizedState = Wd(t.type, e.memoizedProps, t.pendingProps, e.memoizedState),
            null;
        case 27:
            return Xa(t),
            e === null && oe && (a = t.stateNode = $d(t.type, t.pendingProps, ne.current),
            Je = t,
            _t = !0,
            n = Re,
            Nl(t.type) ? (Hc = n,
            Re = Nt(a.firstChild)) : Re = n),
            ke(e, t, t.pendingProps.children, l),
            Bi(e, t),
            e === null && (t.flags |= 4194304),
            t.child;
        case 5:
            return e === null && oe && ((n = a = Re) && (a = _p(a, t.type, t.pendingProps, _t),
            a !== null ? (t.stateNode = a,
            Je = t,
            Re = Nt(a.firstChild),
            _t = !1,
            n = !0) : n = !1),
            n || pl(t)),
            Xa(t),
            n = t.type,
            i = t.pendingProps,
            f = e !== null ? e.memoizedProps : null,
            a = i.children,
            Mc(n, i) ? a = null : f !== null && Mc(n, f) && (t.flags |= 32),
            t.memoizedState !== null && (n = Ds(e, t, Qg, null, null, l),
            Ln._currentValue = n),
            Bi(e, t),
            ke(e, t, a, l),
            t.child;
        case 6:
            return e === null && oe && ((e = l = Re) && (l = Cp(l, t.pendingProps, _t),
            l !== null ? (t.stateNode = l,
            Je = t,
            Re = null,
            e = !0) : e = !1),
            e || pl(t)),
            null;
        case 13:
            return Hf(e, t, l);
        case 4:
            return tt(t, t.stateNode.containerInfo),
            a = t.pendingProps,
            e === null ? t.child = Wl(t, null, a, l) : ke(e, t, a, l),
            t.child;
        case 11:
            return _f(e, t, t.type, t.pendingProps, l);
        case 7:
            return ke(e, t, t.pendingProps, l),
            t.child;
        case 8:
            return ke(e, t, t.pendingProps.children, l),
            t.child;
        case 12:
            return ke(e, t, t.pendingProps.children, l),
            t.child;
        case 10:
            return a = t.pendingProps,
            yl(t, t.type, a.value),
            ke(e, t, a.children, l),
            t.child;
        case 9:
            return n = t.type._context,
            a = t.pendingProps.children,
            Jl(t),
            n = $e(n),
            a = a(n),
            t.flags |= 1,
            ke(e, t, a, l),
            t.child;
        case 14:
            return Cf(e, t, t.type, t.pendingProps, l);
        case 15:
            return Nf(e, t, t.type, t.pendingProps, l);
        case 19:
            return qf(e, t, l);
        case 31:
            return Wg(e, t, l);
        case 22:
            return Df(e, t, l, t.pendingProps);
        case 24:
            return Jl(t),
            a = $e(we),
            e === null ? (n = xs(),
            n === null && (n = Oe,
            i = Ss(),
            n.pooledCache = i,
            i.refCount++,
            i !== null && (n.pooledCacheLanes |= l),
            n = i),
            t.memoizedState = {
                parent: a,
                cache: n
            },
            Os(t),
            yl(t, we, n)) : ((e.lanes & l) !== 0 && (Ts(e, t),
            mn(t, null, null, l),
            hn()),
            n = e.memoizedState,
            i = t.memoizedState,
            n.parent !== a ? (n = {
                parent: a,
                cache: a
            },
            t.memoizedState = n,
            t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n),
            yl(t, we, a)) : (a = i.cache,
            yl(t, we, a),
            a !== n.cache && vs(t, [we], l, !0))),
            ke(e, t, t.pendingProps.children, l),
            t.child;
        case 29:
            throw t.pendingProps
        }
        throw Error(r(156, t.tag))
    }
    function el(e) {
        e.flags |= 4
    }
    function ic(e, t, l, a, n) {
        if ((t = (e.mode & 32) !== 0) && (t = !1),
        t) {
            if (e.flags |= 16777216,
            (n & 335544128) === n)
                if (e.stateNode.complete)
                    e.flags |= 8192;
                else if (hd())
                    e.flags |= 8192;
                else
                    throw Fl = Oi,
                    Es
        } else
            e.flags &= -16777217
    }
    function Gf(e, t) {
        if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
            e.flags &= -16777217;
        else if (e.flags |= 16777216,
        !lh(t))
            if (hd())
                e.flags |= 8192;
            else
                throw Fl = Oi,
                Es
    }
    function Yi(e, t) {
        t !== null && (e.flags |= 4),
        e.flags & 16384 && (t = e.tag !== 22 ? vr() : 536870912,
        e.lanes |= t,
        Da |= t)
    }
    function bn(e, t) {
        if (!oe)
            switch (e.tailMode) {
            case "hidden":
                t = e.tail;
                for (var l = null; t !== null; )
                    t.alternate !== null && (l = t),
                    t = t.sibling;
                l === null ? e.tail = null : l.sibling = null;
                break;
            case "collapsed":
                l = e.tail;
                for (var a = null; l !== null; )
                    l.alternate !== null && (a = l),
                    l = l.sibling;
                a === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : a.sibling = null
            }
    }
    function Ae(e) {
        var t = e.alternate !== null && e.alternate.child === e.child
          , l = 0
          , a = 0;
        if (t)
            for (var n = e.child; n !== null; )
                l |= n.lanes | n.childLanes,
                a |= n.subtreeFlags & 65011712,
                a |= n.flags & 65011712,
                n.return = e,
                n = n.sibling;
        else
            for (n = e.child; n !== null; )
                l |= n.lanes | n.childLanes,
                a |= n.subtreeFlags,
                a |= n.flags,
                n.return = e,
                n = n.sibling;
        return e.subtreeFlags |= a,
        e.childLanes = l,
        t
    }
    function Ig(e, t, l) {
        var a = t.pendingProps;
        switch (hs(t),
        t.tag) {
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
            return Ae(t),
            null;
        case 1:
            return Ae(t),
            null;
        case 3:
            return l = t.stateNode,
            a = null,
            e !== null && (a = e.memoizedState.cache),
            t.memoizedState.cache !== a && (t.flags |= 2048),
            Ft(we),
            Ue(),
            l.pendingContext && (l.context = l.pendingContext,
            l.pendingContext = null),
            (e === null || e.child === null) && (va(t) ? el(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024,
            gs())),
            Ae(t),
            null;
        case 26:
            var n = t.type
              , i = t.memoizedState;
            return e === null ? (el(t),
            i !== null ? (Ae(t),
            Gf(t, i)) : (Ae(t),
            ic(t, n, null, a, l))) : i ? i !== e.memoizedState ? (el(t),
            Ae(t),
            Gf(t, i)) : (Ae(t),
            t.flags &= -16777217) : (e = e.memoizedProps,
            e !== a && el(t),
            Ae(t),
            ic(t, n, e, a, l)),
            null;
        case 27:
            if (Wn(t),
            l = ne.current,
            n = t.type,
            e !== null && t.stateNode != null)
                e.memoizedProps !== a && el(t);
            else {
                if (!a) {
                    if (t.stateNode === null)
                        throw Error(r(166));
                    return Ae(t),
                    null
                }
                e = Q.current,
                va(t) ? So(t) : (e = $d(n, a, l),
                t.stateNode = e,
                el(t))
            }
            return Ae(t),
            null;
        case 5:
            if (Wn(t),
            n = t.type,
            e !== null && t.stateNode != null)
                e.memoizedProps !== a && el(t);
            else {
                if (!a) {
                    if (t.stateNode === null)
                        throw Error(r(166));
                    return Ae(t),
                    null
                }
                if (i = Q.current,
                va(t))
                    So(t);
                else {
                    var f = tu(ne.current);
                    switch (i) {
                    case 1:
                        i = f.createElementNS("http://www.w3.org/2000/svg", n);
                        break;
                    case 2:
                        i = f.createElementNS("http://www.w3.org/1998/Math/MathML", n);
                        break;
                    default:
                        switch (n) {
                        case "svg":
                            i = f.createElementNS("http://www.w3.org/2000/svg", n);
                            break;
                        case "math":
                            i = f.createElementNS("http://www.w3.org/1998/Math/MathML", n);
                            break;
                        case "script":
                            i = f.createElement("div"),
                            i.innerHTML = "<script><\/script>",
                            i = i.removeChild(i.firstChild);
                            break;
                        case "select":
                            i = typeof a.is == "string" ? f.createElement("select", {
                                is: a.is
                            }) : f.createElement("select"),
                            a.multiple ? i.multiple = !0 : a.size && (i.size = a.size);
                            break;
                        default:
                            i = typeof a.is == "string" ? f.createElement(n, {
                                is: a.is
                            }) : f.createElement(n)
                        }
                    }
                    i[Ke] = t,
                    i[nt] = a;
                    e: for (f = t.child; f !== null; ) {
                        if (f.tag === 5 || f.tag === 6)
                            i.appendChild(f.stateNode);
                        else if (f.tag !== 4 && f.tag !== 27 && f.child !== null) {
                            f.child.return = f,
                            f = f.child;
                            continue
                        }
                        if (f === t)
                            break e;
                        for (; f.sibling === null; ) {
                            if (f.return === null || f.return === t)
                                break e;
                            f = f.return
                        }
                        f.sibling.return = f.return,
                        f = f.sibling
                    }
                    t.stateNode = i;
                    e: switch (Fe(i, n, a),
                    n) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                        a = !!a.autoFocus;
                        break e;
                    case "img":
                        a = !0;
                        break e;
                    default:
                        a = !1
                    }
                    a && el(t)
                }
            }
            return Ae(t),
            ic(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, l),
            null;
        case 6:
            if (e && t.stateNode != null)
                e.memoizedProps !== a && el(t);
            else {
                if (typeof a != "string" && t.stateNode === null)
                    throw Error(r(166));
                if (e = ne.current,
                va(t)) {
                    if (e = t.stateNode,
                    l = t.memoizedProps,
                    a = null,
                    n = Je,
                    n !== null)
                        switch (n.tag) {
                        case 27:
                        case 5:
                            a = n.memoizedProps
                        }
                    e[Ke] = t,
                    e = !!(e.nodeValue === l || a !== null && a.suppressHydrationWarning === !0 || Hd(e.nodeValue, l)),
                    e || pl(t, !0)
                } else
                    e = tu(e).createTextNode(a),
                    e[Ke] = t,
                    t.stateNode = e
            }
            return Ae(t),
            null;
        case 31:
            if (l = t.memoizedState,
            e === null || e.memoizedState !== null) {
                if (a = va(t),
                l !== null) {
                    if (e === null) {
                        if (!a)
                            throw Error(r(318));
                        if (e = t.memoizedState,
                        e = e !== null ? e.dehydrated : null,
                        !e)
                            throw Error(r(557));
                        e[Ke] = t
                    } else
                        Zl(),
                        (t.flags & 128) === 0 && (t.memoizedState = null),
                        t.flags |= 4;
                    Ae(t),
                    e = !1
                } else
                    l = gs(),
                    e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l),
                    e = !0;
                if (!e)
                    return t.flags & 256 ? (yt(t),
                    t) : (yt(t),
                    null);
                if ((t.flags & 128) !== 0)
                    throw Error(r(558))
            }
            return Ae(t),
            null;
        case 13:
            if (a = t.memoizedState,
            e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
                if (n = va(t),
                a !== null && a.dehydrated !== null) {
                    if (e === null) {
                        if (!n)
                            throw Error(r(318));
                        if (n = t.memoizedState,
                        n = n !== null ? n.dehydrated : null,
                        !n)
                            throw Error(r(317));
                        n[Ke] = t
                    } else
                        Zl(),
                        (t.flags & 128) === 0 && (t.memoizedState = null),
                        t.flags |= 4;
                    Ae(t),
                    n = !1
                } else
                    n = gs(),
                    e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n),
                    n = !0;
                if (!n)
                    return t.flags & 256 ? (yt(t),
                    t) : (yt(t),
                    null)
            }
            return yt(t),
            (t.flags & 128) !== 0 ? (t.lanes = l,
            t) : (l = a !== null,
            e = e !== null && e.memoizedState !== null,
            l && (a = t.child,
            n = null,
            a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool),
            i = null,
            a.memoizedState !== null && a.memoizedState.cachePool !== null && (i = a.memoizedState.cachePool.pool),
            i !== n && (a.flags |= 2048)),
            l !== e && l && (t.child.flags |= 8192),
            Yi(t, t.updateQueue),
            Ae(t),
            null);
        case 4:
            return Ue(),
            e === null && zc(t.stateNode.containerInfo),
            Ae(t),
            null;
        case 10:
            return Ft(t.type),
            Ae(t),
            null;
        case 19:
            if (U(Le),
            a = t.memoizedState,
            a === null)
                return Ae(t),
                null;
            if (n = (t.flags & 128) !== 0,
            i = a.rendering,
            i === null)
                if (n)
                    bn(a, !1);
                else {
                    if (De !== 0 || e !== null && (e.flags & 128) !== 0)
                        for (e = t.child; e !== null; ) {
                            if (i = zi(e),
                            i !== null) {
                                for (t.flags |= 128,
                                bn(a, !1),
                                e = i.updateQueue,
                                t.updateQueue = e,
                                Yi(t, e),
                                t.subtreeFlags = 0,
                                e = l,
                                l = t.child; l !== null; )
                                    mo(l, e),
                                    l = l.sibling;
                                return G(Le, Le.current & 1 | 2),
                                oe && $t(t, a.treeForkCount),
                                t.child
                            }
                            e = e.sibling
                        }
                    a.tail !== null && ft() > Zi && (t.flags |= 128,
                    n = !0,
                    bn(a, !1),
                    t.lanes = 4194304)
                }
            else {
                if (!n)
                    if (e = zi(i),
                    e !== null) {
                        if (t.flags |= 128,
                        n = !0,
                        e = e.updateQueue,
                        t.updateQueue = e,
                        Yi(t, e),
                        bn(a, !0),
                        a.tail === null && a.tailMode === "hidden" && !i.alternate && !oe)
                            return Ae(t),
                            null
                    } else
                        2 * ft() - a.renderingStartTime > Zi && l !== 536870912 && (t.flags |= 128,
                        n = !0,
                        bn(a, !1),
                        t.lanes = 4194304);
                a.isBackwards ? (i.sibling = t.child,
                t.child = i) : (e = a.last,
                e !== null ? e.sibling = i : t.child = i,
                a.last = i)
            }
            return a.tail !== null ? (e = a.tail,
            a.rendering = e,
            a.tail = e.sibling,
            a.renderingStartTime = ft(),
            e.sibling = null,
            l = Le.current,
            G(Le, n ? l & 1 | 2 : l & 1),
            oe && $t(t, a.treeForkCount),
            e) : (Ae(t),
            null);
        case 22:
        case 23:
            return yt(t),
            _s(),
            a = t.memoizedState !== null,
            e !== null ? e.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192),
            a ? (l & 536870912) !== 0 && (t.flags & 128) === 0 && (Ae(t),
            t.subtreeFlags & 6 && (t.flags |= 8192)) : Ae(t),
            l = t.updateQueue,
            l !== null && Yi(t, l.retryQueue),
            l = null,
            e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool),
            a = null,
            t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool),
            a !== l && (t.flags |= 2048),
            e !== null && U($l),
            null;
        case 24:
            return l = null,
            e !== null && (l = e.memoizedState.cache),
            t.memoizedState.cache !== l && (t.flags |= 2048),
            Ft(we),
            Ae(t),
            null;
        case 25:
            return null;
        case 30:
            return null
        }
        throw Error(r(156, t.tag))
    }
    function ep(e, t) {
        switch (hs(t),
        t.tag) {
        case 1:
            return e = t.flags,
            e & 65536 ? (t.flags = e & -65537 | 128,
            t) : null;
        case 3:
            return Ft(we),
            Ue(),
            e = t.flags,
            (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128,
            t) : null;
        case 26:
        case 27:
        case 5:
            return Wn(t),
            null;
        case 31:
            if (t.memoizedState !== null) {
                if (yt(t),
                t.alternate === null)
                    throw Error(r(340));
                Zl()
            }
            return e = t.flags,
            e & 65536 ? (t.flags = e & -65537 | 128,
            t) : null;
        case 13:
            if (yt(t),
            e = t.memoizedState,
            e !== null && e.dehydrated !== null) {
                if (t.alternate === null)
                    throw Error(r(340));
                Zl()
            }
            return e = t.flags,
            e & 65536 ? (t.flags = e & -65537 | 128,
            t) : null;
        case 19:
            return U(Le),
            null;
        case 4:
            return Ue(),
            null;
        case 10:
            return Ft(t.type),
            null;
        case 22:
        case 23:
            return yt(t),
            _s(),
            e !== null && U($l),
            e = t.flags,
            e & 65536 ? (t.flags = e & -65537 | 128,
            t) : null;
        case 24:
            return Ft(we),
            null;
        case 25:
            return null;
        default:
            return null
        }
    }
    function Vf(e, t) {
        switch (hs(t),
        t.tag) {
        case 3:
            Ft(we),
            Ue();
            break;
        case 26:
        case 27:
        case 5:
            Wn(t);
            break;
        case 4:
            Ue();
            break;
        case 31:
            t.memoizedState !== null && yt(t);
            break;
        case 13:
            yt(t);
            break;
        case 19:
            U(Le);
            break;
        case 10:
            Ft(t.type);
            break;
        case 22:
        case 23:
            yt(t),
            _s(),
            e !== null && U($l);
            break;
        case 24:
            Ft(we)
        }
    }
    function xn(e, t) {
        try {
            var l = t.updateQueue
              , a = l !== null ? l.lastEffect : null;
            if (a !== null) {
                var n = a.next;
                l = n;
                do {
                    if ((l.tag & e) === e) {
                        a = void 0;
                        var i = l.create
                          , f = l.inst;
                        a = i(),
                        f.destroy = a
                    }
                    l = l.next
                } while (l !== n)
            }
        } catch (m) {
            Se(t, t.return, m)
        }
    }
    function Ol(e, t, l) {
        try {
            var a = t.updateQueue
              , n = a !== null ? a.lastEffect : null;
            if (n !== null) {
                var i = n.next;
                a = i;
                do {
                    if ((a.tag & e) === e) {
                        var f = a.inst
                          , m = f.destroy;
                        if (m !== void 0) {
                            f.destroy = void 0,
                            n = t;
                            var S = l
                              , A = m;
                            try {
                                A()
                            } catch (M) {
                                Se(n, S, M)
                            }
                        }
                    }
                    a = a.next
                } while (a !== i)
            }
        } catch (M) {
            Se(t, t.return, M)
        }
    }
    function Qf(e) {
        var t = e.updateQueue;
        if (t !== null) {
            var l = e.stateNode;
            try {
                Mo(t, l)
            } catch (a) {
                Se(e, e.return, a)
            }
        }
    }
    function Xf(e, t, l) {
        l.props = Il(e.type, e.memoizedProps),
        l.state = e.memoizedState;
        try {
            l.componentWillUnmount()
        } catch (a) {
            Se(e, t, a)
        }
    }
    function En(e, t) {
        try {
            var l = e.ref;
            if (l !== null) {
                switch (e.tag) {
                case 26:
                case 27:
                case 5:
                    var a = e.stateNode;
                    break;
                case 30:
                    a = e.stateNode;
                    break;
                default:
                    a = e.stateNode
                }
                typeof l == "function" ? e.refCleanup = l(a) : l.current = a
            }
        } catch (n) {
            Se(e, t, n)
        }
    }
    function Yt(e, t) {
        var l = e.ref
          , a = e.refCleanup;
        if (l !== null)
            if (typeof a == "function")
                try {
                    a()
                } catch (n) {
                    Se(e, t, n)
                } finally {
                    e.refCleanup = null,
                    e = e.alternate,
                    e != null && (e.refCleanup = null)
                }
            else if (typeof l == "function")
                try {
                    l(null)
                } catch (n) {
                    Se(e, t, n)
                }
            else
                l.current = null
    }
    function Zf(e) {
        var t = e.type
          , l = e.memoizedProps
          , a = e.stateNode;
        try {
            e: switch (t) {
            case "button":
            case "input":
            case "select":
            case "textarea":
                l.autoFocus && a.focus();
                break e;
            case "img":
                l.src ? a.src = l.src : l.srcSet && (a.srcset = l.srcSet)
            }
        } catch (n) {
            Se(e, e.return, n)
        }
    }
    function uc(e, t, l) {
        try {
            var a = e.stateNode;
            Ep(a, e.type, l, t),
            a[nt] = t
        } catch (n) {
            Se(e, e.return, n)
        }
    }
    function Kf(e) {
        return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Nl(e.type) || e.tag === 4
    }
    function sc(e) {
        e: for (; ; ) {
            for (; e.sibling === null; ) {
                if (e.return === null || Kf(e.return))
                    return null;
                e = e.return
            }
            for (e.sibling.return = e.return,
            e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
                if (e.tag === 27 && Nl(e.type) || e.flags & 2 || e.child === null || e.tag === 4)
                    continue e;
                e.child.return = e,
                e = e.child
            }
            if (!(e.flags & 2))
                return e.stateNode
        }
    }
    function cc(e, t, l) {
        var a = e.tag;
        if (a === 5 || a === 6)
            e = e.stateNode,
            t ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(e, t) : (t = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
            t.appendChild(e),
            l = l._reactRootContainer,
            l != null || t.onclick !== null || (t.onclick = Zt));
        else if (a !== 4 && (a === 27 && Nl(e.type) && (l = e.stateNode,
        t = null),
        e = e.child,
        e !== null))
            for (cc(e, t, l),
            e = e.sibling; e !== null; )
                cc(e, t, l),
                e = e.sibling
    }
    function Gi(e, t, l) {
        var a = e.tag;
        if (a === 5 || a === 6)
            e = e.stateNode,
            t ? l.insertBefore(e, t) : l.appendChild(e);
        else if (a !== 4 && (a === 27 && Nl(e.type) && (l = e.stateNode),
        e = e.child,
        e !== null))
            for (Gi(e, t, l),
            e = e.sibling; e !== null; )
                Gi(e, t, l),
                e = e.sibling
    }
    function Jf(e) {
        var t = e.stateNode
          , l = e.memoizedProps;
        try {
            for (var a = e.type, n = t.attributes; n.length; )
                t.removeAttributeNode(n[0]);
            Fe(t, a, l),
            t[Ke] = e,
            t[nt] = l
        } catch (i) {
            Se(e, e.return, i)
        }
    }
    var tl = !1
      , qe = !1
      , rc = !1
      , $f = typeof WeakSet == "function" ? WeakSet : Set
      , Xe = null;
    function tp(e, t) {
        if (e = e.containerInfo,
        Nc = cu,
        e = no(e),
        ls(e)) {
            if ("selectionStart"in e)
                var l = {
                    start: e.selectionStart,
                    end: e.selectionEnd
                };
            else
                e: {
                    l = (l = e.ownerDocument) && l.defaultView || window;
                    var a = l.getSelection && l.getSelection();
                    if (a && a.rangeCount !== 0) {
                        l = a.anchorNode;
                        var n = a.anchorOffset
                          , i = a.focusNode;
                        a = a.focusOffset;
                        try {
                            l.nodeType,
                            i.nodeType
                        } catch {
                            l = null;
                            break e
                        }
                        var f = 0
                          , m = -1
                          , S = -1
                          , A = 0
                          , M = 0
                          , j = e
                          , z = null;
                        t: for (; ; ) {
                            for (var _; j !== l || n !== 0 && j.nodeType !== 3 || (m = f + n),
                            j !== i || a !== 0 && j.nodeType !== 3 || (S = f + a),
                            j.nodeType === 3 && (f += j.nodeValue.length),
                            (_ = j.firstChild) !== null; )
                                z = j,
                                j = _;
                            for (; ; ) {
                                if (j === e)
                                    break t;
                                if (z === l && ++A === n && (m = f),
                                z === i && ++M === a && (S = f),
                                (_ = j.nextSibling) !== null)
                                    break;
                                j = z,
                                z = j.parentNode
                            }
                            j = _
                        }
                        l = m === -1 || S === -1 ? null : {
                            start: m,
                            end: S
                        }
                    } else
                        l = null
                }
            l = l || {
                start: 0,
                end: 0
            }
        } else
            l = null;
        for (Dc = {
            focusedElem: e,
            selectionRange: l
        },
        cu = !1,
        Xe = t; Xe !== null; )
            if (t = Xe,
            e = t.child,
            (t.subtreeFlags & 1028) !== 0 && e !== null)
                e.return = t,
                Xe = e;
            else
                for (; Xe !== null; ) {
                    switch (t = Xe,
                    i = t.alternate,
                    e = t.flags,
                    t.tag) {
                    case 0:
                        if ((e & 4) !== 0 && (e = t.updateQueue,
                        e = e !== null ? e.events : null,
                        e !== null))
                            for (l = 0; l < e.length; l++)
                                n = e[l],
                                n.ref.impl = n.nextImpl;
                        break;
                    case 11:
                    case 15:
                        break;
                    case 1:
                        if ((e & 1024) !== 0 && i !== null) {
                            e = void 0,
                            l = t,
                            n = i.memoizedProps,
                            i = i.memoizedState,
                            a = l.stateNode;
                            try {
                                var X = Il(l.type, n);
                                e = a.getSnapshotBeforeUpdate(X, i),
                                a.__reactInternalSnapshotBeforeUpdate = e
                            } catch (F) {
                                Se(l, l.return, F)
                            }
                        }
                        break;
                    case 3:
                        if ((e & 1024) !== 0) {
                            if (e = t.stateNode.containerInfo,
                            l = e.nodeType,
                            l === 9)
                                Lc(e);
                            else if (l === 1)
                                switch (e.nodeName) {
                                case "HEAD":
                                case "HTML":
                                case "BODY":
                                    Lc(e);
                                    break;
                                default:
                                    e.textContent = ""
                                }
                        }
                        break;
                    case 5:
                    case 26:
                    case 27:
                    case 6:
                    case 4:
                    case 17:
                        break;
                    default:
                        if ((e & 1024) !== 0)
                            throw Error(r(163))
                    }
                    if (e = t.sibling,
                    e !== null) {
                        e.return = t.return,
                        Xe = e;
                        break
                    }
                    Xe = t.return
                }
    }
    function kf(e, t, l) {
        var a = l.flags;
        switch (l.tag) {
        case 0:
        case 11:
        case 15:
            al(e, l),
            a & 4 && xn(5, l);
            break;
        case 1:
            if (al(e, l),
            a & 4)
                if (e = l.stateNode,
                t === null)
                    try {
                        e.componentDidMount()
                    } catch (f) {
                        Se(l, l.return, f)
                    }
                else {
                    var n = Il(l.type, t.memoizedProps);
                    t = t.memoizedState;
                    try {
                        e.componentDidUpdate(n, t, e.__reactInternalSnapshotBeforeUpdate)
                    } catch (f) {
                        Se(l, l.return, f)
                    }
                }
            a & 64 && Qf(l),
            a & 512 && En(l, l.return);
            break;
        case 3:
            if (al(e, l),
            a & 64 && (e = l.updateQueue,
            e !== null)) {
                if (t = null,
                l.child !== null)
                    switch (l.child.tag) {
                    case 27:
                    case 5:
                        t = l.child.stateNode;
                        break;
                    case 1:
                        t = l.child.stateNode
                    }
                try {
                    Mo(e, t)
                } catch (f) {
                    Se(l, l.return, f)
                }
            }
            break;
        case 27:
            t === null && a & 4 && Jf(l);
        case 26:
        case 5:
            al(e, l),
            t === null && a & 4 && Zf(l),
            a & 512 && En(l, l.return);
            break;
        case 12:
            al(e, l);
            break;
        case 31:
            al(e, l),
            a & 4 && Pf(e, l);
            break;
        case 13:
            al(e, l),
            a & 4 && If(e, l),
            a & 64 && (e = l.memoizedState,
            e !== null && (e = e.dehydrated,
            e !== null && (l = op.bind(null, l),
            Np(e, l))));
            break;
        case 22:
            if (a = l.memoizedState !== null || tl,
            !a) {
                t = t !== null && t.memoizedState !== null || qe,
                n = tl;
                var i = qe;
                tl = a,
                (qe = t) && !i ? nl(e, l, (l.subtreeFlags & 8772) !== 0) : al(e, l),
                tl = n,
                qe = i
            }
            break;
        case 30:
            break;
        default:
            al(e, l)
        }
    }
    function Ff(e) {
        var t = e.alternate;
        t !== null && (e.alternate = null,
        Ff(t)),
        e.child = null,
        e.deletions = null,
        e.sibling = null,
        e.tag === 5 && (t = e.stateNode,
        t !== null && qu(t)),
        e.stateNode = null,
        e.return = null,
        e.dependencies = null,
        e.memoizedProps = null,
        e.memoizedState = null,
        e.pendingProps = null,
        e.stateNode = null,
        e.updateQueue = null
    }
    var _e = null
      , ut = !1;
    function ll(e, t, l) {
        for (l = l.child; l !== null; )
            Wf(e, t, l),
            l = l.sibling
    }
    function Wf(e, t, l) {
        if (dt && typeof dt.onCommitFiberUnmount == "function")
            try {
                dt.onCommitFiberUnmount(Za, l)
            } catch {}
        switch (l.tag) {
        case 26:
            qe || Yt(l, t),
            ll(e, t, l),
            l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode,
            l.parentNode.removeChild(l));
            break;
        case 27:
            qe || Yt(l, t);
            var a = _e
              , n = ut;
            Nl(l.type) && (_e = l.stateNode,
            ut = !1),
            ll(e, t, l),
            Dn(l.stateNode),
            _e = a,
            ut = n;
            break;
        case 5:
            qe || Yt(l, t);
        case 6:
            if (a = _e,
            n = ut,
            _e = null,
            ll(e, t, l),
            _e = a,
            ut = n,
            _e !== null)
                if (ut)
                    try {
                        (_e.nodeType === 9 ? _e.body : _e.nodeName === "HTML" ? _e.ownerDocument.body : _e).removeChild(l.stateNode)
                    } catch (i) {
                        Se(l, t, i)
                    }
                else
                    try {
                        _e.removeChild(l.stateNode)
                    } catch (i) {
                        Se(l, t, i)
                    }
            break;
        case 18:
            _e !== null && (ut ? (e = _e,
            Qd(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, l.stateNode),
            qa(e)) : Qd(_e, l.stateNode));
            break;
        case 4:
            a = _e,
            n = ut,
            _e = l.stateNode.containerInfo,
            ut = !0,
            ll(e, t, l),
            _e = a,
            ut = n;
            break;
        case 0:
        case 11:
        case 14:
        case 15:
            Ol(2, l, t),
            qe || Ol(4, l, t),
            ll(e, t, l);
            break;
        case 1:
            qe || (Yt(l, t),
            a = l.stateNode,
            typeof a.componentWillUnmount == "function" && Xf(l, t, a)),
            ll(e, t, l);
            break;
        case 21:
            ll(e, t, l);
            break;
        case 22:
            qe = (a = qe) || l.memoizedState !== null,
            ll(e, t, l),
            qe = a;
            break;
        default:
            ll(e, t, l)
        }
    }
    function Pf(e, t) {
        if (t.memoizedState === null && (e = t.alternate,
        e !== null && (e = e.memoizedState,
        e !== null))) {
            e = e.dehydrated;
            try {
                qa(e)
            } catch (l) {
                Se(t, t.return, l)
            }
        }
    }
    function If(e, t) {
        if (t.memoizedState === null && (e = t.alternate,
        e !== null && (e = e.memoizedState,
        e !== null && (e = e.dehydrated,
        e !== null))))
            try {
                qa(e)
            } catch (l) {
                Se(t, t.return, l)
            }
    }
    function lp(e) {
        switch (e.tag) {
        case 31:
        case 13:
        case 19:
            var t = e.stateNode;
            return t === null && (t = e.stateNode = new $f),
            t;
        case 22:
            return e = e.stateNode,
            t = e._retryCache,
            t === null && (t = e._retryCache = new $f),
            t;
        default:
            throw Error(r(435, e.tag))
        }
    }
    function Vi(e, t) {
        var l = lp(e);
        t.forEach(function(a) {
            if (!l.has(a)) {
                l.add(a);
                var n = fp.bind(null, e, a);
                a.then(n, n)
            }
        })
    }
    function st(e, t) {
        var l = t.deletions;
        if (l !== null)
            for (var a = 0; a < l.length; a++) {
                var n = l[a]
                  , i = e
                  , f = t
                  , m = f;
                e: for (; m !== null; ) {
                    switch (m.tag) {
                    case 27:
                        if (Nl(m.type)) {
                            _e = m.stateNode,
                            ut = !1;
                            break e
                        }
                        break;
                    case 5:
                        _e = m.stateNode,
                        ut = !1;
                        break e;
                    case 3:
                    case 4:
                        _e = m.stateNode.containerInfo,
                        ut = !0;
                        break e
                    }
                    m = m.return
                }
                if (_e === null)
                    throw Error(r(160));
                Wf(i, f, n),
                _e = null,
                ut = !1,
                i = n.alternate,
                i !== null && (i.return = null),
                n.return = null
            }
        if (t.subtreeFlags & 13886)
            for (t = t.child; t !== null; )
                ed(t, e),
                t = t.sibling
    }
    var jt = null;
    function ed(e, t) {
        var l = e.alternate
          , a = e.flags;
        switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
            st(t, e),
            ct(e),
            a & 4 && (Ol(3, e, e.return),
            xn(3, e),
            Ol(5, e, e.return));
            break;
        case 1:
            st(t, e),
            ct(e),
            a & 512 && (qe || l === null || Yt(l, l.return)),
            a & 64 && tl && (e = e.updateQueue,
            e !== null && (a = e.callbacks,
            a !== null && (l = e.shared.hiddenCallbacks,
            e.shared.hiddenCallbacks = l === null ? a : l.concat(a))));
            break;
        case 26:
            var n = jt;
            if (st(t, e),
            ct(e),
            a & 512 && (qe || l === null || Yt(l, l.return)),
            a & 4) {
                var i = l !== null ? l.memoizedState : null;
                if (a = e.memoizedState,
                l === null)
                    if (a === null)
                        if (e.stateNode === null) {
                            e: {
                                a = e.type,
                                l = e.memoizedProps,
                                n = n.ownerDocument || n;
                                t: switch (a) {
                                case "title":
                                    i = n.getElementsByTagName("title")[0],
                                    (!i || i[$a] || i[Ke] || i.namespaceURI === "http://www.w3.org/2000/svg" || i.hasAttribute("itemprop")) && (i = n.createElement(a),
                                    n.head.insertBefore(i, n.querySelector("head > title"))),
                                    Fe(i, a, l),
                                    i[Ke] = e,
                                    Qe(i),
                                    a = i;
                                    break e;
                                case "link":
                                    var f = eh("link", "href", n).get(a + (l.href || ""));
                                    if (f) {
                                        for (var m = 0; m < f.length; m++)
                                            if (i = f[m],
                                            i.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && i.getAttribute("rel") === (l.rel == null ? null : l.rel) && i.getAttribute("title") === (l.title == null ? null : l.title) && i.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                                                f.splice(m, 1);
                                                break t
                                            }
                                    }
                                    i = n.createElement(a),
                                    Fe(i, a, l),
                                    n.head.appendChild(i);
                                    break;
                                case "meta":
                                    if (f = eh("meta", "content", n).get(a + (l.content || ""))) {
                                        for (m = 0; m < f.length; m++)
                                            if (i = f[m],
                                            i.getAttribute("content") === (l.content == null ? null : "" + l.content) && i.getAttribute("name") === (l.name == null ? null : l.name) && i.getAttribute("property") === (l.property == null ? null : l.property) && i.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && i.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                                                f.splice(m, 1);
                                                break t
                                            }
                                    }
                                    i = n.createElement(a),
                                    Fe(i, a, l),
                                    n.head.appendChild(i);
                                    break;
                                default:
                                    throw Error(r(468, a))
                                }
                                i[Ke] = e,
                                Qe(i),
                                a = i
                            }
                            e.stateNode = a
                        } else
                            th(n, e.type, e.stateNode);
                    else
                        e.stateNode = Id(n, a, e.memoizedProps);
                else
                    i !== a ? (i === null ? l.stateNode !== null && (l = l.stateNode,
                    l.parentNode.removeChild(l)) : i.count--,
                    a === null ? th(n, e.type, e.stateNode) : Id(n, a, e.memoizedProps)) : a === null && e.stateNode !== null && uc(e, e.memoizedProps, l.memoizedProps)
            }
            break;
        case 27:
            st(t, e),
            ct(e),
            a & 512 && (qe || l === null || Yt(l, l.return)),
            l !== null && a & 4 && uc(e, e.memoizedProps, l.memoizedProps);
            break;
        case 5:
            if (st(t, e),
            ct(e),
            a & 512 && (qe || l === null || Yt(l, l.return)),
            e.flags & 32) {
                n = e.stateNode;
                try {
                    ca(n, "")
                } catch (X) {
                    Se(e, e.return, X)
                }
            }
            a & 4 && e.stateNode != null && (n = e.memoizedProps,
            uc(e, n, l !== null ? l.memoizedProps : n)),
            a & 1024 && (rc = !0);
            break;
        case 6:
            if (st(t, e),
            ct(e),
            a & 4) {
                if (e.stateNode === null)
                    throw Error(r(162));
                a = e.memoizedProps,
                l = e.stateNode;
                try {
                    l.nodeValue = a
                } catch (X) {
                    Se(e, e.return, X)
                }
            }
            break;
        case 3:
            if (nu = null,
            n = jt,
            jt = lu(t.containerInfo),
            st(t, e),
            jt = n,
            ct(e),
            a & 4 && l !== null && l.memoizedState.isDehydrated)
                try {
                    qa(t.containerInfo)
                } catch (X) {
                    Se(e, e.return, X)
                }
            rc && (rc = !1,
            td(e));
            break;
        case 4:
            a = jt,
            jt = lu(e.stateNode.containerInfo),
            st(t, e),
            ct(e),
            jt = a;
            break;
        case 12:
            st(t, e),
            ct(e);
            break;
        case 31:
            st(t, e),
            ct(e),
            a & 4 && (a = e.updateQueue,
            a !== null && (e.updateQueue = null,
            Vi(e, a)));
            break;
        case 13:
            st(t, e),
            ct(e),
            e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (Xi = ft()),
            a & 4 && (a = e.updateQueue,
            a !== null && (e.updateQueue = null,
            Vi(e, a)));
            break;
        case 22:
            n = e.memoizedState !== null;
            var S = l !== null && l.memoizedState !== null
              , A = tl
              , M = qe;
            if (tl = A || n,
            qe = M || S,
            st(t, e),
            qe = M,
            tl = A,
            ct(e),
            a & 8192)
                e: for (t = e.stateNode,
                t._visibility = n ? t._visibility & -2 : t._visibility | 1,
                n && (l === null || S || tl || qe || ea(e)),
                l = null,
                t = e; ; ) {
                    if (t.tag === 5 || t.tag === 26) {
                        if (l === null) {
                            S = l = t;
                            try {
                                if (i = S.stateNode,
                                n)
                                    f = i.style,
                                    typeof f.setProperty == "function" ? f.setProperty("display", "none", "important") : f.display = "none";
                                else {
                                    m = S.stateNode;
                                    var j = S.memoizedProps.style
                                      , z = j != null && j.hasOwnProperty("display") ? j.display : null;
                                    m.style.display = z == null || typeof z == "boolean" ? "" : ("" + z).trim()
                                }
                            } catch (X) {
                                Se(S, S.return, X)
                            }
                        }
                    } else if (t.tag === 6) {
                        if (l === null) {
                            S = t;
                            try {
                                S.stateNode.nodeValue = n ? "" : S.memoizedProps
                            } catch (X) {
                                Se(S, S.return, X)
                            }
                        }
                    } else if (t.tag === 18) {
                        if (l === null) {
                            S = t;
                            try {
                                var _ = S.stateNode;
                                n ? Xd(_, !0) : Xd(S.stateNode, !1)
                            } catch (X) {
                                Se(S, S.return, X)
                            }
                        }
                    } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
                        t.child.return = t,
                        t = t.child;
                        continue
                    }
                    if (t === e)
                        break e;
                    for (; t.sibling === null; ) {
                        if (t.return === null || t.return === e)
                            break e;
                        l === t && (l = null),
                        t = t.return
                    }
                    l === t && (l = null),
                    t.sibling.return = t.return,
                    t = t.sibling
                }
            a & 4 && (a = e.updateQueue,
            a !== null && (l = a.retryQueue,
            l !== null && (a.retryQueue = null,
            Vi(e, l))));
            break;
        case 19:
            st(t, e),
            ct(e),
            a & 4 && (a = e.updateQueue,
            a !== null && (e.updateQueue = null,
            Vi(e, a)));
            break;
        case 30:
            break;
        case 21:
            break;
        default:
            st(t, e),
            ct(e)
        }
    }
    function ct(e) {
        var t = e.flags;
        if (t & 2) {
            try {
                for (var l, a = e.return; a !== null; ) {
                    if (Kf(a)) {
                        l = a;
                        break
                    }
                    a = a.return
                }
                if (l == null)
                    throw Error(r(160));
                switch (l.tag) {
                case 27:
                    var n = l.stateNode
                      , i = sc(e);
                    Gi(e, i, n);
                    break;
                case 5:
                    var f = l.stateNode;
                    l.flags & 32 && (ca(f, ""),
                    l.flags &= -33);
                    var m = sc(e);
                    Gi(e, m, f);
                    break;
                case 3:
                case 4:
                    var S = l.stateNode.containerInfo
                      , A = sc(e);
                    cc(e, A, S);
                    break;
                default:
                    throw Error(r(161))
                }
            } catch (M) {
                Se(e, e.return, M)
            }
            e.flags &= -3
        }
        t & 4096 && (e.flags &= -4097)
    }
    function td(e) {
        if (e.subtreeFlags & 1024)
            for (e = e.child; e !== null; ) {
                var t = e;
                td(t),
                t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
                e = e.sibling
            }
    }
    function al(e, t) {
        if (t.subtreeFlags & 8772)
            for (t = t.child; t !== null; )
                kf(e, t.alternate, t),
                t = t.sibling
    }
    function ea(e) {
        for (e = e.child; e !== null; ) {
            var t = e;
            switch (t.tag) {
            case 0:
            case 11:
            case 14:
            case 15:
                Ol(4, t, t.return),
                ea(t);
                break;
            case 1:
                Yt(t, t.return);
                var l = t.stateNode;
                typeof l.componentWillUnmount == "function" && Xf(t, t.return, l),
                ea(t);
                break;
            case 27:
                Dn(t.stateNode);
            case 26:
            case 5:
                Yt(t, t.return),
                ea(t);
                break;
            case 22:
                t.memoizedState === null && ea(t);
                break;
            case 30:
                ea(t);
                break;
            default:
                ea(t)
            }
            e = e.sibling
        }
    }
    function nl(e, t, l) {
        for (l = l && (t.subtreeFlags & 8772) !== 0,
        t = t.child; t !== null; ) {
            var a = t.alternate
              , n = e
              , i = t
              , f = i.flags;
            switch (i.tag) {
            case 0:
            case 11:
            case 15:
                nl(n, i, l),
                xn(4, i);
                break;
            case 1:
                if (nl(n, i, l),
                a = i,
                n = a.stateNode,
                typeof n.componentDidMount == "function")
                    try {
                        n.componentDidMount()
                    } catch (A) {
                        Se(a, a.return, A)
                    }
                if (a = i,
                n = a.updateQueue,
                n !== null) {
                    var m = a.stateNode;
                    try {
                        var S = n.shared.hiddenCallbacks;
                        if (S !== null)
                            for (n.shared.hiddenCallbacks = null,
                            n = 0; n < S.length; n++)
                                Do(S[n], m)
                    } catch (A) {
                        Se(a, a.return, A)
                    }
                }
                l && f & 64 && Qf(i),
                En(i, i.return);
                break;
            case 27:
                Jf(i);
            case 26:
            case 5:
                nl(n, i, l),
                l && a === null && f & 4 && Zf(i),
                En(i, i.return);
                break;
            case 12:
                nl(n, i, l);
                break;
            case 31:
                nl(n, i, l),
                l && f & 4 && Pf(n, i);
                break;
            case 13:
                nl(n, i, l),
                l && f & 4 && If(n, i);
                break;
            case 22:
                i.memoizedState === null && nl(n, i, l),
                En(i, i.return);
                break;
            case 30:
                break;
            default:
                nl(n, i, l)
            }
            t = t.sibling
        }
    }
    function oc(e, t) {
        var l = null;
        e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool),
        e = null,
        t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool),
        e !== l && (e != null && e.refCount++,
        l != null && cn(l))
    }
    function fc(e, t) {
        e = null,
        t.alternate !== null && (e = t.alternate.memoizedState.cache),
        t = t.memoizedState.cache,
        t !== e && (t.refCount++,
        e != null && cn(e))
    }
    function wt(e, t, l, a) {
        if (t.subtreeFlags & 10256)
            for (t = t.child; t !== null; )
                ld(e, t, l, a),
                t = t.sibling
    }
    function ld(e, t, l, a) {
        var n = t.flags;
        switch (t.tag) {
        case 0:
        case 11:
        case 15:
            wt(e, t, l, a),
            n & 2048 && xn(9, t);
            break;
        case 1:
            wt(e, t, l, a);
            break;
        case 3:
            wt(e, t, l, a),
            n & 2048 && (e = null,
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            t = t.memoizedState.cache,
            t !== e && (t.refCount++,
            e != null && cn(e)));
            break;
        case 12:
            if (n & 2048) {
                wt(e, t, l, a),
                e = t.stateNode;
                try {
                    var i = t.memoizedProps
                      , f = i.id
                      , m = i.onPostCommit;
                    typeof m == "function" && m(f, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0)
                } catch (S) {
                    Se(t, t.return, S)
                }
            } else
                wt(e, t, l, a);
            break;
        case 31:
            wt(e, t, l, a);
            break;
        case 13:
            wt(e, t, l, a);
            break;
        case 23:
            break;
        case 22:
            i = t.stateNode,
            f = t.alternate,
            t.memoizedState !== null ? i._visibility & 2 ? wt(e, t, l, a) : On(e, t) : i._visibility & 2 ? wt(e, t, l, a) : (i._visibility |= 2,
            _a(e, t, l, a, (t.subtreeFlags & 10256) !== 0 || !1)),
            n & 2048 && oc(f, t);
            break;
        case 24:
            wt(e, t, l, a),
            n & 2048 && fc(t.alternate, t);
            break;
        default:
            wt(e, t, l, a)
        }
    }
    function _a(e, t, l, a, n) {
        for (n = n && ((t.subtreeFlags & 10256) !== 0 || !1),
        t = t.child; t !== null; ) {
            var i = e
              , f = t
              , m = l
              , S = a
              , A = f.flags;
            switch (f.tag) {
            case 0:
            case 11:
            case 15:
                _a(i, f, m, S, n),
                xn(8, f);
                break;
            case 23:
                break;
            case 22:
                var M = f.stateNode;
                f.memoizedState !== null ? M._visibility & 2 ? _a(i, f, m, S, n) : On(i, f) : (M._visibility |= 2,
                _a(i, f, m, S, n)),
                n && A & 2048 && oc(f.alternate, f);
                break;
            case 24:
                _a(i, f, m, S, n),
                n && A & 2048 && fc(f.alternate, f);
                break;
            default:
                _a(i, f, m, S, n)
            }
            t = t.sibling
        }
    }
    function On(e, t) {
        if (t.subtreeFlags & 10256)
            for (t = t.child; t !== null; ) {
                var l = e
                  , a = t
                  , n = a.flags;
                switch (a.tag) {
                case 22:
                    On(l, a),
                    n & 2048 && oc(a.alternate, a);
                    break;
                case 24:
                    On(l, a),
                    n & 2048 && fc(a.alternate, a);
                    break;
                default:
                    On(l, a)
                }
                t = t.sibling
            }
    }
    var Tn = 8192;
    function Ca(e, t, l) {
        if (e.subtreeFlags & Tn)
            for (e = e.child; e !== null; )
                ad(e, t, l),
                e = e.sibling
    }
    function ad(e, t, l) {
        switch (e.tag) {
        case 26:
            Ca(e, t, l),
            e.flags & Tn && e.memoizedState !== null && Vp(l, jt, e.memoizedState, e.memoizedProps);
            break;
        case 5:
            Ca(e, t, l);
            break;
        case 3:
        case 4:
            var a = jt;
            jt = lu(e.stateNode.containerInfo),
            Ca(e, t, l),
            jt = a;
            break;
        case 22:
            e.memoizedState === null && (a = e.alternate,
            a !== null && a.memoizedState !== null ? (a = Tn,
            Tn = 16777216,
            Ca(e, t, l),
            Tn = a) : Ca(e, t, l));
            break;
        default:
            Ca(e, t, l)
        }
    }
    function nd(e) {
        var t = e.alternate;
        if (t !== null && (e = t.child,
        e !== null)) {
            t.child = null;
            do
                t = e.sibling,
                e.sibling = null,
                e = t;
            while (e !== null)
        }
    }
    function Rn(e) {
        var t = e.deletions;
        if ((e.flags & 16) !== 0) {
            if (t !== null)
                for (var l = 0; l < t.length; l++) {
                    var a = t[l];
                    Xe = a,
                    ud(a, e)
                }
            nd(e)
        }
        if (e.subtreeFlags & 10256)
            for (e = e.child; e !== null; )
                id(e),
                e = e.sibling
    }
    function id(e) {
        switch (e.tag) {
        case 0:
        case 11:
        case 15:
            Rn(e),
            e.flags & 2048 && Ol(9, e, e.return);
            break;
        case 3:
            Rn(e);
            break;
        case 12:
            Rn(e);
            break;
        case 22:
            var t = e.stateNode;
            e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3,
            Qi(e)) : Rn(e);
            break;
        default:
            Rn(e)
        }
    }
    function Qi(e) {
        var t = e.deletions;
        if ((e.flags & 16) !== 0) {
            if (t !== null)
                for (var l = 0; l < t.length; l++) {
                    var a = t[l];
                    Xe = a,
                    ud(a, e)
                }
            nd(e)
        }
        for (e = e.child; e !== null; ) {
            switch (t = e,
            t.tag) {
            case 0:
            case 11:
            case 15:
                Ol(8, t, t.return),
                Qi(t);
                break;
            case 22:
                l = t.stateNode,
                l._visibility & 2 && (l._visibility &= -3,
                Qi(t));
                break;
            default:
                Qi(t)
            }
            e = e.sibling
        }
    }
    function ud(e, t) {
        for (; Xe !== null; ) {
            var l = Xe;
            switch (l.tag) {
            case 0:
            case 11:
            case 15:
                Ol(8, l, t);
                break;
            case 23:
            case 22:
                if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
                    var a = l.memoizedState.cachePool.pool;
                    a != null && a.refCount++
                }
                break;
            case 24:
                cn(l.memoizedState.cache)
            }
            if (a = l.child,
            a !== null)
                a.return = l,
                Xe = a;
            else
                e: for (l = e; Xe !== null; ) {
                    a = Xe;
                    var n = a.sibling
                      , i = a.return;
                    if (Ff(a),
                    a === l) {
                        Xe = null;
                        break e
                    }
                    if (n !== null) {
                        n.return = i,
                        Xe = n;
                        break e
                    }
                    Xe = i
                }
        }
    }
    var ap = {
        getCacheForType: function(e) {
            var t = $e(we)
              , l = t.data.get(e);
            return l === void 0 && (l = e(),
            t.data.set(e, l)),
            l
        },
        cacheSignal: function() {
            return $e(we).controller.signal
        }
    }
      , np = typeof WeakMap == "function" ? WeakMap : Map
      , me = 0
      , Oe = null
      , ie = null
      , se = 0
      , ve = 0
      , vt = null
      , Tl = !1
      , Na = !1
      , dc = !1
      , il = 0
      , De = 0
      , Rl = 0
      , ta = 0
      , hc = 0
      , St = 0
      , Da = 0
      , An = null
      , rt = null
      , mc = !1
      , Xi = 0
      , sd = 0
      , Zi = 1 / 0
      , Ki = null
      , Al = null
      , Ye = 0
      , zl = null
      , Ma = null
      , ul = 0
      , gc = 0
      , pc = null
      , cd = null
      , zn = 0
      , yc = null;
    function bt() {
        return (me & 2) !== 0 && se !== 0 ? se & -se : N.T !== null ? Oc() : Er()
    }
    function rd() {
        if (St === 0)
            if ((se & 536870912) === 0 || oe) {
                var e = ei;
                ei <<= 1,
                (ei & 3932160) === 0 && (ei = 262144),
                St = e
            } else
                St = 536870912;
        return e = pt.current,
        e !== null && (e.flags |= 32),
        St
    }
    function ot(e, t, l) {
        (e === Oe && (ve === 2 || ve === 9) || e.cancelPendingCommit !== null) && (Ua(e, 0),
        _l(e, se, St, !1)),
        Ja(e, l),
        ((me & 2) === 0 || e !== Oe) && (e === Oe && ((me & 2) === 0 && (ta |= l),
        De === 4 && _l(e, se, St, !1)),
        Gt(e))
    }
    function od(e, t, l) {
        if ((me & 6) !== 0)
            throw Error(r(327));
        var a = !l && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Ka(e, t)
          , n = a ? sp(e, t) : Sc(e, t, !0)
          , i = a;
        do {
            if (n === 0) {
                Na && !a && _l(e, t, 0, !1);
                break
            } else {
                if (l = e.current.alternate,
                i && !ip(l)) {
                    n = Sc(e, t, !1),
                    i = !1;
                    continue
                }
                if (n === 2) {
                    if (i = t,
                    e.errorRecoveryDisabledLanes & i)
                        var f = 0;
                    else
                        f = e.pendingLanes & -536870913,
                        f = f !== 0 ? f : f & 536870912 ? 536870912 : 0;
                    if (f !== 0) {
                        t = f;
                        e: {
                            var m = e;
                            n = An;
                            var S = m.current.memoizedState.isDehydrated;
                            if (S && (Ua(m, f).flags |= 256),
                            f = Sc(m, f, !1),
                            f !== 2) {
                                if (dc && !S) {
                                    m.errorRecoveryDisabledLanes |= i,
                                    ta |= i,
                                    n = 4;
                                    break e
                                }
                                i = rt,
                                rt = n,
                                i !== null && (rt === null ? rt = i : rt.push.apply(rt, i))
                            }
                            n = f
                        }
                        if (i = !1,
                        n !== 2)
                            continue
                    }
                }
                if (n === 1) {
                    Ua(e, 0),
                    _l(e, t, 0, !0);
                    break
                }
                e: {
                    switch (a = e,
                    i = n,
                    i) {
                    case 0:
                    case 1:
                        throw Error(r(345));
                    case 4:
                        if ((t & 4194048) !== t)
                            break;
                    case 6:
                        _l(a, t, St, !Tl);
                        break e;
                    case 2:
                        rt = null;
                        break;
                    case 3:
                    case 5:
                        break;
                    default:
                        throw Error(r(329))
                    }
                    if ((t & 62914560) === t && (n = Xi + 300 - ft(),
                    10 < n)) {
                        if (_l(a, t, St, !Tl),
                        li(a, 0, !0) !== 0)
                            break e;
                        ul = t,
                        a.timeoutHandle = Gd(fd.bind(null, a, l, rt, Ki, mc, t, St, ta, Da, Tl, i, "Throttled", -0, 0), n);
                        break e
                    }
                    fd(a, l, rt, Ki, mc, t, St, ta, Da, Tl, i, null, -0, 0)
                }
            }
            break
        } while (!0);
        Gt(e)
    }
    function fd(e, t, l, a, n, i, f, m, S, A, M, j, z, _) {
        if (e.timeoutHandle = -1,
        j = t.subtreeFlags,
        j & 8192 || (j & 16785408) === 16785408) {
            j = {
                stylesheets: null,
                count: 0,
                imgCount: 0,
                imgBytes: 0,
                suspenseyImages: [],
                waitingForImages: !0,
                waitingForViewTransition: !1,
                unsuspend: Zt
            },
            ad(t, i, j);
            var X = (i & 62914560) === i ? Xi - ft() : (i & 4194048) === i ? sd - ft() : 0;
            if (X = Qp(j, X),
            X !== null) {
                ul = i,
                e.cancelPendingCommit = X(Sd.bind(null, e, t, i, l, a, n, f, m, S, M, j, null, z, _)),
                _l(e, i, f, !A);
                return
            }
        }
        Sd(e, t, i, l, a, n, f, m, S)
    }
    function ip(e) {
        for (var t = e; ; ) {
            var l = t.tag;
            if ((l === 0 || l === 11 || l === 15) && t.flags & 16384 && (l = t.updateQueue,
            l !== null && (l = l.stores,
            l !== null)))
                for (var a = 0; a < l.length; a++) {
                    var n = l[a]
                      , i = n.getSnapshot;
                    n = n.value;
                    try {
                        if (!mt(i(), n))
                            return !1
                    } catch {
                        return !1
                    }
                }
            if (l = t.child,
            t.subtreeFlags & 16384 && l !== null)
                l.return = t,
                t = l;
            else {
                if (t === e)
                    break;
                for (; t.sibling === null; ) {
                    if (t.return === null || t.return === e)
                        return !0;
                    t = t.return
                }
                t.sibling.return = t.return,
                t = t.sibling
            }
        }
        return !0
    }
    function _l(e, t, l, a) {
        t &= ~hc,
        t &= ~ta,
        e.suspendedLanes |= t,
        e.pingedLanes &= ~t,
        a && (e.warmLanes |= t),
        a = e.expirationTimes;
        for (var n = t; 0 < n; ) {
            var i = 31 - ht(n)
              , f = 1 << i;
            a[i] = -1,
            n &= ~f
        }
        l !== 0 && Sr(e, l, t)
    }
    function Ji() {
        return (me & 6) === 0 ? (_n(0),
        !1) : !0
    }
    function vc() {
        if (ie !== null) {
            if (ve === 0)
                var e = ie.return;
            else
                e = ie,
                kt = Kl = null,
                Ls(e),
                Oa = null,
                on = 0,
                e = ie;
            for (; e !== null; )
                Vf(e.alternate, e),
                e = e.return;
            ie = null
        }
    }
    function Ua(e, t) {
        var l = e.timeoutHandle;
        l !== -1 && (e.timeoutHandle = -1,
        Rp(l)),
        l = e.cancelPendingCommit,
        l !== null && (e.cancelPendingCommit = null,
        l()),
        ul = 0,
        vc(),
        Oe = e,
        ie = l = Jt(e.current, null),
        se = t,
        ve = 0,
        vt = null,
        Tl = !1,
        Na = Ka(e, t),
        dc = !1,
        Da = St = hc = ta = Rl = De = 0,
        rt = An = null,
        mc = !1,
        (t & 8) !== 0 && (t |= t & 32);
        var a = e.entangledLanes;
        if (a !== 0)
            for (e = e.entanglements,
            a &= t; 0 < a; ) {
                var n = 31 - ht(a)
                  , i = 1 << n;
                t |= e[n],
                a &= ~i
            }
        return il = t,
        mi(),
        l
    }
    function dd(e, t) {
        te = null,
        N.H = vn,
        t === Ea || t === Ei ? (t = zo(),
        ve = 3) : t === Es ? (t = zo(),
        ve = 4) : ve = t === Fs ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1,
        vt = t,
        ie === null && (De = 1,
        wi(e, Rt(t, e.current)))
    }
    function hd() {
        var e = pt.current;
        return e === null ? !0 : (se & 4194048) === se ? Ct === null : (se & 62914560) === se || (se & 536870912) !== 0 ? e === Ct : !1
    }
    function md() {
        var e = N.H;
        return N.H = vn,
        e === null ? vn : e
    }
    function gd() {
        var e = N.A;
        return N.A = ap,
        e
    }
    function $i() {
        De = 4,
        Tl || (se & 4194048) !== se && pt.current !== null || (Na = !0),
        (Rl & 134217727) === 0 && (ta & 134217727) === 0 || Oe === null || _l(Oe, se, St, !1)
    }
    function Sc(e, t, l) {
        var a = me;
        me |= 2;
        var n = md()
          , i = gd();
        (Oe !== e || se !== t) && (Ki = null,
        Ua(e, t)),
        t = !1;
        var f = De;
        e: do
            try {
                if (ve !== 0 && ie !== null) {
                    var m = ie
                      , S = vt;
                    switch (ve) {
                    case 8:
                        vc(),
                        f = 6;
                        break e;
                    case 3:
                    case 2:
                    case 9:
                    case 6:
                        pt.current === null && (t = !0);
                        var A = ve;
                        if (ve = 0,
                        vt = null,
                        La(e, m, S, A),
                        l && Na) {
                            f = 0;
                            break e
                        }
                        break;
                    default:
                        A = ve,
                        ve = 0,
                        vt = null,
                        La(e, m, S, A)
                    }
                }
                up(),
                f = De;
                break
            } catch (M) {
                dd(e, M)
            }
        while (!0);
        return t && e.shellSuspendCounter++,
        kt = Kl = null,
        me = a,
        N.H = n,
        N.A = i,
        ie === null && (Oe = null,
        se = 0,
        mi()),
        f
    }
    function up() {
        for (; ie !== null; )
            pd(ie)
    }
    function sp(e, t) {
        var l = me;
        me |= 2;
        var a = md()
          , n = gd();
        Oe !== e || se !== t ? (Ki = null,
        Zi = ft() + 500,
        Ua(e, t)) : Na = Ka(e, t);
        e: do
            try {
                if (ve !== 0 && ie !== null) {
                    t = ie;
                    var i = vt;
                    t: switch (ve) {
                    case 1:
                        ve = 0,
                        vt = null,
                        La(e, t, i, 1);
                        break;
                    case 2:
                    case 9:
                        if (Ro(i)) {
                            ve = 0,
                            vt = null,
                            yd(t);
                            break
                        }
                        t = function() {
                            ve !== 2 && ve !== 9 || Oe !== e || (ve = 7),
                            Gt(e)
                        }
                        ,
                        i.then(t, t);
                        break e;
                    case 3:
                        ve = 7;
                        break e;
                    case 4:
                        ve = 5;
                        break e;
                    case 7:
                        Ro(i) ? (ve = 0,
                        vt = null,
                        yd(t)) : (ve = 0,
                        vt = null,
                        La(e, t, i, 7));
                        break;
                    case 5:
                        var f = null;
                        switch (ie.tag) {
                        case 26:
                            f = ie.memoizedState;
                        case 5:
                        case 27:
                            var m = ie;
                            if (f ? lh(f) : m.stateNode.complete) {
                                ve = 0,
                                vt = null;
                                var S = m.sibling;
                                if (S !== null)
                                    ie = S;
                                else {
                                    var A = m.return;
                                    A !== null ? (ie = A,
                                    ki(A)) : ie = null
                                }
                                break t
                            }
                        }
                        ve = 0,
                        vt = null,
                        La(e, t, i, 5);
                        break;
                    case 6:
                        ve = 0,
                        vt = null,
                        La(e, t, i, 6);
                        break;
                    case 8:
                        vc(),
                        De = 6;
                        break e;
                    default:
                        throw Error(r(462))
                    }
                }
                cp();
                break
            } catch (M) {
                dd(e, M)
            }
        while (!0);
        return kt = Kl = null,
        N.H = a,
        N.A = n,
        me = l,
        ie !== null ? 0 : (Oe = null,
        se = 0,
        mi(),
        De)
    }
    function cp() {
        for (; ie !== null && !Dm(); )
            pd(ie)
    }
    function pd(e) {
        var t = Yf(e.alternate, e, il);
        e.memoizedProps = e.pendingProps,
        t === null ? ki(e) : ie = t
    }
    function yd(e) {
        var t = e
          , l = t.alternate;
        switch (t.tag) {
        case 15:
        case 0:
            t = Lf(l, t, t.pendingProps, t.type, void 0, se);
            break;
        case 11:
            t = Lf(l, t, t.pendingProps, t.type.render, t.ref, se);
            break;
        case 5:
            Ls(t);
        default:
            Vf(l, t),
            t = ie = mo(t, il),
            t = Yf(l, t, il)
        }
        e.memoizedProps = e.pendingProps,
        t === null ? ki(e) : ie = t
    }
    function La(e, t, l, a) {
        kt = Kl = null,
        Ls(t),
        Oa = null,
        on = 0;
        var n = t.return;
        try {
            if (Fg(e, n, t, l, se)) {
                De = 1,
                wi(e, Rt(l, e.current)),
                ie = null;
                return
            }
        } catch (i) {
            if (n !== null)
                throw ie = n,
                i;
            De = 1,
            wi(e, Rt(l, e.current)),
            ie = null;
            return
        }
        t.flags & 32768 ? (oe || a === 1 ? e = !0 : Na || (se & 536870912) !== 0 ? e = !1 : (Tl = e = !0,
        (a === 2 || a === 9 || a === 3 || a === 6) && (a = pt.current,
        a !== null && a.tag === 13 && (a.flags |= 16384))),
        vd(t, e)) : ki(t)
    }
    function ki(e) {
        var t = e;
        do {
            if ((t.flags & 32768) !== 0) {
                vd(t, Tl);
                return
            }
            e = t.return;
            var l = Ig(t.alternate, t, il);
            if (l !== null) {
                ie = l;
                return
            }
            if (t = t.sibling,
            t !== null) {
                ie = t;
                return
            }
            ie = t = e
        } while (t !== null);
        De === 0 && (De = 5)
    }
    function vd(e, t) {
        do {
            var l = ep(e.alternate, e);
            if (l !== null) {
                l.flags &= 32767,
                ie = l;
                return
            }
            if (l = e.return,
            l !== null && (l.flags |= 32768,
            l.subtreeFlags = 0,
            l.deletions = null),
            !t && (e = e.sibling,
            e !== null)) {
                ie = e;
                return
            }
            ie = e = l
        } while (e !== null);
        De = 6,
        ie = null
    }
    function Sd(e, t, l, a, n, i, f, m, S) {
        e.cancelPendingCommit = null;
        do
            Fi();
        while (Ye !== 0);
        if ((me & 6) !== 0)
            throw Error(r(327));
        if (t !== null) {
            if (t === e.current)
                throw Error(r(177));
            if (i = t.lanes | t.childLanes,
            i |= ss,
            Gm(e, l, i, f, m, S),
            e === Oe && (ie = Oe = null,
            se = 0),
            Ma = t,
            zl = e,
            ul = l,
            gc = i,
            pc = n,
            cd = a,
            (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null,
            e.callbackPriority = 0,
            dp(Pn, function() {
                return Td(),
                null
            })) : (e.callbackNode = null,
            e.callbackPriority = 0),
            a = (t.flags & 13878) !== 0,
            (t.subtreeFlags & 13878) !== 0 || a) {
                a = N.T,
                N.T = null,
                n = Y.p,
                Y.p = 2,
                f = me,
                me |= 4;
                try {
                    tp(e, t, l)
                } finally {
                    me = f,
                    Y.p = n,
                    N.T = a
                }
            }
            Ye = 1,
            bd(),
            xd(),
            Ed()
        }
    }
    function bd() {
        if (Ye === 1) {
            Ye = 0;
            var e = zl
              , t = Ma
              , l = (t.flags & 13878) !== 0;
            if ((t.subtreeFlags & 13878) !== 0 || l) {
                l = N.T,
                N.T = null;
                var a = Y.p;
                Y.p = 2;
                var n = me;
                me |= 4;
                try {
                    ed(t, e);
                    var i = Dc
                      , f = no(e.containerInfo)
                      , m = i.focusedElem
                      , S = i.selectionRange;
                    if (f !== m && m && m.ownerDocument && ao(m.ownerDocument.documentElement, m)) {
                        if (S !== null && ls(m)) {
                            var A = S.start
                              , M = S.end;
                            if (M === void 0 && (M = A),
                            "selectionStart"in m)
                                m.selectionStart = A,
                                m.selectionEnd = Math.min(M, m.value.length);
                            else {
                                var j = m.ownerDocument || document
                                  , z = j && j.defaultView || window;
                                if (z.getSelection) {
                                    var _ = z.getSelection()
                                      , X = m.textContent.length
                                      , F = Math.min(S.start, X)
                                      , Ee = S.end === void 0 ? F : Math.min(S.end, X);
                                    !_.extend && F > Ee && (f = Ee,
                                    Ee = F,
                                    F = f);
                                    var O = lo(m, F)
                                      , x = lo(m, Ee);
                                    if (O && x && (_.rangeCount !== 1 || _.anchorNode !== O.node || _.anchorOffset !== O.offset || _.focusNode !== x.node || _.focusOffset !== x.offset)) {
                                        var R = j.createRange();
                                        R.setStart(O.node, O.offset),
                                        _.removeAllRanges(),
                                        F > Ee ? (_.addRange(R),
                                        _.extend(x.node, x.offset)) : (R.setEnd(x.node, x.offset),
                                        _.addRange(R))
                                    }
                                }
                            }
                        }
                        for (j = [],
                        _ = m; _ = _.parentNode; )
                            _.nodeType === 1 && j.push({
                                element: _,
                                left: _.scrollLeft,
                                top: _.scrollTop
                            });
                        for (typeof m.focus == "function" && m.focus(),
                        m = 0; m < j.length; m++) {
                            var L = j[m];
                            L.element.scrollLeft = L.left,
                            L.element.scrollTop = L.top
                        }
                    }
                    cu = !!Nc,
                    Dc = Nc = null
                } finally {
                    me = n,
                    Y.p = a,
                    N.T = l
                }
            }
            e.current = t,
            Ye = 2
        }
    }
    function xd() {
        if (Ye === 2) {
            Ye = 0;
            var e = zl
              , t = Ma
              , l = (t.flags & 8772) !== 0;
            if ((t.subtreeFlags & 8772) !== 0 || l) {
                l = N.T,
                N.T = null;
                var a = Y.p;
                Y.p = 2;
                var n = me;
                me |= 4;
                try {
                    kf(e, t.alternate, t)
                } finally {
                    me = n,
                    Y.p = a,
                    N.T = l
                }
            }
            Ye = 3
        }
    }
    function Ed() {
        if (Ye === 4 || Ye === 3) {
            Ye = 0,
            Mm();
            var e = zl
              , t = Ma
              , l = ul
              , a = cd;
            (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Ye = 5 : (Ye = 0,
            Ma = zl = null,
            Od(e, e.pendingLanes));
            var n = e.pendingLanes;
            if (n === 0 && (Al = null),
            Hu(l),
            t = t.stateNode,
            dt && typeof dt.onCommitFiberRoot == "function")
                try {
                    dt.onCommitFiberRoot(Za, t, void 0, (t.current.flags & 128) === 128)
                } catch {}
            if (a !== null) {
                t = N.T,
                n = Y.p,
                Y.p = 2,
                N.T = null;
                try {
                    for (var i = e.onRecoverableError, f = 0; f < a.length; f++) {
                        var m = a[f];
                        i(m.value, {
                            componentStack: m.stack
                        })
                    }
                } finally {
                    N.T = t,
                    Y.p = n
                }
            }
            (ul & 3) !== 0 && Fi(),
            Gt(e),
            n = e.pendingLanes,
            (l & 261930) !== 0 && (n & 42) !== 0 ? e === yc ? zn++ : (zn = 0,
            yc = e) : zn = 0,
            _n(0)
        }
    }
    function Od(e, t) {
        (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache,
        t != null && (e.pooledCache = null,
        cn(t)))
    }
    function Fi() {
        return bd(),
        xd(),
        Ed(),
        Td()
    }
    function Td() {
        if (Ye !== 5)
            return !1;
        var e = zl
          , t = gc;
        gc = 0;
        var l = Hu(ul)
          , a = N.T
          , n = Y.p;
        try {
            Y.p = 32 > l ? 32 : l,
            N.T = null,
            l = pc,
            pc = null;
            var i = zl
              , f = ul;
            if (Ye = 0,
            Ma = zl = null,
            ul = 0,
            (me & 6) !== 0)
                throw Error(r(331));
            var m = me;
            if (me |= 4,
            id(i.current),
            ld(i, i.current, f, l),
            me = m,
            _n(0, !1),
            dt && typeof dt.onPostCommitFiberRoot == "function")
                try {
                    dt.onPostCommitFiberRoot(Za, i)
                } catch {}
            return !0
        } finally {
            Y.p = n,
            N.T = a,
            Od(e, t)
        }
    }
    function Rd(e, t, l) {
        t = Rt(l, t),
        t = ks(e.stateNode, t, 2),
        e = bl(e, t, 2),
        e !== null && (Ja(e, 2),
        Gt(e))
    }
    function Se(e, t, l) {
        if (e.tag === 3)
            Rd(e, e, l);
        else
            for (; t !== null; ) {
                if (t.tag === 3) {
                    Rd(t, e, l);
                    break
                } else if (t.tag === 1) {
                    var a = t.stateNode;
                    if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (Al === null || !Al.has(a))) {
                        e = Rt(l, e),
                        l = Af(2),
                        a = bl(t, l, 2),
                        a !== null && (zf(l, a, t, e),
                        Ja(a, 2),
                        Gt(a));
                        break
                    }
                }
                t = t.return
            }
    }
    function bc(e, t, l) {
        var a = e.pingCache;
        if (a === null) {
            a = e.pingCache = new np;
            var n = new Set;
            a.set(t, n)
        } else
            n = a.get(t),
            n === void 0 && (n = new Set,
            a.set(t, n));
        n.has(l) || (dc = !0,
        n.add(l),
        e = rp.bind(null, e, t, l),
        t.then(e, e))
    }
    function rp(e, t, l) {
        var a = e.pingCache;
        a !== null && a.delete(t),
        e.pingedLanes |= e.suspendedLanes & l,
        e.warmLanes &= ~l,
        Oe === e && (se & l) === l && (De === 4 || De === 3 && (se & 62914560) === se && 300 > ft() - Xi ? (me & 2) === 0 && Ua(e, 0) : hc |= l,
        Da === se && (Da = 0)),
        Gt(e)
    }
    function Ad(e, t) {
        t === 0 && (t = vr()),
        e = Ql(e, t),
        e !== null && (Ja(e, t),
        Gt(e))
    }
    function op(e) {
        var t = e.memoizedState
          , l = 0;
        t !== null && (l = t.retryLane),
        Ad(e, l)
    }
    function fp(e, t) {
        var l = 0;
        switch (e.tag) {
        case 31:
        case 13:
            var a = e.stateNode
              , n = e.memoizedState;
            n !== null && (l = n.retryLane);
            break;
        case 19:
            a = e.stateNode;
            break;
        case 22:
            a = e.stateNode._retryCache;
            break;
        default:
            throw Error(r(314))
        }
        a !== null && a.delete(t),
        Ad(e, l)
    }
    function dp(e, t) {
        return Uu(e, t)
    }
    var Wi = null
      , ja = null
      , xc = !1
      , Pi = !1
      , Ec = !1
      , Cl = 0;
    function Gt(e) {
        e !== ja && e.next === null && (ja === null ? Wi = ja = e : ja = ja.next = e),
        Pi = !0,
        xc || (xc = !0,
        mp())
    }
    function _n(e, t) {
        if (!Ec && Pi) {
            Ec = !0;
            do
                for (var l = !1, a = Wi; a !== null; ) {
                    if (e !== 0) {
                        var n = a.pendingLanes;
                        if (n === 0)
                            var i = 0;
                        else {
                            var f = a.suspendedLanes
                              , m = a.pingedLanes;
                            i = (1 << 31 - ht(42 | e) + 1) - 1,
                            i &= n & ~(f & ~m),
                            i = i & 201326741 ? i & 201326741 | 1 : i ? i | 2 : 0
                        }
                        i !== 0 && (l = !0,
                        Nd(a, i))
                    } else
                        i = se,
                        i = li(a, a === Oe ? i : 0, a.cancelPendingCommit !== null || a.timeoutHandle !== -1),
                        (i & 3) === 0 || Ka(a, i) || (l = !0,
                        Nd(a, i));
                    a = a.next
                }
            while (l);
            Ec = !1
        }
    }
    function hp() {
        zd()
    }
    function zd() {
        Pi = xc = !1;
        var e = 0;
        Cl !== 0 && Tp() && (e = Cl);
        for (var t = ft(), l = null, a = Wi; a !== null; ) {
            var n = a.next
              , i = _d(a, t);
            i === 0 ? (a.next = null,
            l === null ? Wi = n : l.next = n,
            n === null && (ja = l)) : (l = a,
            (e !== 0 || (i & 3) !== 0) && (Pi = !0)),
            a = n
        }
        Ye !== 0 && Ye !== 5 || _n(e),
        Cl !== 0 && (Cl = 0)
    }
    function _d(e, t) {
        for (var l = e.suspendedLanes, a = e.pingedLanes, n = e.expirationTimes, i = e.pendingLanes & -62914561; 0 < i; ) {
            var f = 31 - ht(i)
              , m = 1 << f
              , S = n[f];
            S === -1 ? ((m & l) === 0 || (m & a) !== 0) && (n[f] = Ym(m, t)) : S <= t && (e.expiredLanes |= m),
            i &= ~m
        }
        if (t = Oe,
        l = se,
        l = li(e, e === t ? l : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1),
        a = e.callbackNode,
        l === 0 || e === t && (ve === 2 || ve === 9) || e.cancelPendingCommit !== null)
            return a !== null && a !== null && Lu(a),
            e.callbackNode = null,
            e.callbackPriority = 0;
        if ((l & 3) === 0 || Ka(e, l)) {
            if (t = l & -l,
            t === e.callbackPriority)
                return t;
            switch (a !== null && Lu(a),
            Hu(l)) {
            case 2:
            case 8:
                l = pr;
                break;
            case 32:
                l = Pn;
                break;
            case 268435456:
                l = yr;
                break;
            default:
                l = Pn
            }
            return a = Cd.bind(null, e),
            l = Uu(l, a),
            e.callbackPriority = t,
            e.callbackNode = l,
            t
        }
        return a !== null && a !== null && Lu(a),
        e.callbackPriority = 2,
        e.callbackNode = null,
        2
    }
    function Cd(e, t) {
        if (Ye !== 0 && Ye !== 5)
            return e.callbackNode = null,
            e.callbackPriority = 0,
            null;
        var l = e.callbackNode;
        if (Fi() && e.callbackNode !== l)
            return null;
        var a = se;
        return a = li(e, e === Oe ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1),
        a === 0 ? null : (od(e, a, t),
        _d(e, ft()),
        e.callbackNode != null && e.callbackNode === l ? Cd.bind(null, e) : null)
    }
    function Nd(e, t) {
        if (Fi())
            return null;
        od(e, t, !0)
    }
    function mp() {
        Ap(function() {
            (me & 6) !== 0 ? Uu(gr, hp) : zd()
        })
    }
    function Oc() {
        if (Cl === 0) {
            var e = ba;
            e === 0 && (e = In,
            In <<= 1,
            (In & 261888) === 0 && (In = 256)),
            Cl = e
        }
        return Cl
    }
    function Dd(e) {
        return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : ui("" + e)
    }
    function Md(e, t) {
        var l = t.ownerDocument.createElement("input");
        return l.name = t.name,
        l.value = t.value,
        e.id && l.setAttribute("form", e.id),
        t.parentNode.insertBefore(l, t),
        e = new FormData(e),
        l.parentNode.removeChild(l),
        e
    }
    function gp(e, t, l, a, n) {
        if (t === "submit" && l && l.stateNode === n) {
            var i = Dd((n[nt] || null).action)
              , f = a.submitter;
            f && (t = (t = f[nt] || null) ? Dd(t.formAction) : f.getAttribute("formAction"),
            t !== null && (i = t,
            f = null));
            var m = new oi("action","action",null,a,n);
            e.push({
                event: m,
                listeners: [{
                    instance: null,
                    listener: function() {
                        if (a.defaultPrevented) {
                            if (Cl !== 0) {
                                var S = f ? Md(n, f) : new FormData(n);
                                Qs(l, {
                                    pending: !0,
                                    data: S,
                                    method: n.method,
                                    action: i
                                }, null, S)
                            }
                        } else
                            typeof i == "function" && (m.preventDefault(),
                            S = f ? Md(n, f) : new FormData(n),
                            Qs(l, {
                                pending: !0,
                                data: S,
                                method: n.method,
                                action: i
                            }, i, S))
                    },
                    currentTarget: n
                }]
            })
        }
    }
    for (var Tc = 0; Tc < us.length; Tc++) {
        var Rc = us[Tc]
          , pp = Rc.toLowerCase()
          , yp = Rc[0].toUpperCase() + Rc.slice(1);
        Lt(pp, "on" + yp)
    }
    Lt(so, "onAnimationEnd"),
    Lt(co, "onAnimationIteration"),
    Lt(ro, "onAnimationStart"),
    Lt("dblclick", "onDoubleClick"),
    Lt("focusin", "onFocus"),
    Lt("focusout", "onBlur"),
    Lt(Ug, "onTransitionRun"),
    Lt(Lg, "onTransitionStart"),
    Lt(jg, "onTransitionCancel"),
    Lt(oo, "onTransitionEnd"),
    ua("onMouseEnter", ["mouseout", "mouseover"]),
    ua("onMouseLeave", ["mouseout", "mouseover"]),
    ua("onPointerEnter", ["pointerout", "pointerover"]),
    ua("onPointerLeave", ["pointerout", "pointerover"]),
    ql("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
    ql("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),
    ql("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    ql("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
    ql("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")),
    ql("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var Cn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ")
      , vp = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Cn));
    function Ud(e, t) {
        t = (t & 4) !== 0;
        for (var l = 0; l < e.length; l++) {
            var a = e[l]
              , n = a.event;
            a = a.listeners;
            e: {
                var i = void 0;
                if (t)
                    for (var f = a.length - 1; 0 <= f; f--) {
                        var m = a[f]
                          , S = m.instance
                          , A = m.currentTarget;
                        if (m = m.listener,
                        S !== i && n.isPropagationStopped())
                            break e;
                        i = m,
                        n.currentTarget = A;
                        try {
                            i(n)
                        } catch (M) {
                            hi(M)
                        }
                        n.currentTarget = null,
                        i = S
                    }
                else
                    for (f = 0; f < a.length; f++) {
                        if (m = a[f],
                        S = m.instance,
                        A = m.currentTarget,
                        m = m.listener,
                        S !== i && n.isPropagationStopped())
                            break e;
                        i = m,
                        n.currentTarget = A;
                        try {
                            i(n)
                        } catch (M) {
                            hi(M)
                        }
                        n.currentTarget = null,
                        i = S
                    }
            }
        }
    }
    function ue(e, t) {
        var l = t[Bu];
        l === void 0 && (l = t[Bu] = new Set);
        var a = e + "__bubble";
        l.has(a) || (Ld(t, e, 2, !1),
        l.add(a))
    }
    function Ac(e, t, l) {
        var a = 0;
        t && (a |= 4),
        Ld(l, e, a, t)
    }
    var Ii = "_reactListening" + Math.random().toString(36).slice(2);
    function zc(e) {
        if (!e[Ii]) {
            e[Ii] = !0,
            Rr.forEach(function(l) {
                l !== "selectionchange" && (vp.has(l) || Ac(l, !1, e),
                Ac(l, !0, e))
            });
            var t = e.nodeType === 9 ? e : e.ownerDocument;
            t === null || t[Ii] || (t[Ii] = !0,
            Ac("selectionchange", !1, t))
        }
    }
    function Ld(e, t, l, a) {
        switch (rh(t)) {
        case 2:
            var n = Kp;
            break;
        case 8:
            n = Jp;
            break;
        default:
            n = Vc
        }
        l = n.bind(null, t, l, e),
        n = void 0,
        !Ju || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (n = !0),
        a ? n !== void 0 ? e.addEventListener(t, l, {
            capture: !0,
            passive: n
        }) : e.addEventListener(t, l, !0) : n !== void 0 ? e.addEventListener(t, l, {
            passive: n
        }) : e.addEventListener(t, l, !1)
    }
    function _c(e, t, l, a, n) {
        var i = a;
        if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
            e: for (; ; ) {
                if (a === null)
                    return;
                var f = a.tag;
                if (f === 3 || f === 4) {
                    var m = a.stateNode.containerInfo;
                    if (m === n)
                        break;
                    if (f === 4)
                        for (f = a.return; f !== null; ) {
                            var S = f.tag;
                            if ((S === 3 || S === 4) && f.stateNode.containerInfo === n)
                                return;
                            f = f.return
                        }
                    for (; m !== null; ) {
                        if (f = aa(m),
                        f === null)
                            return;
                        if (S = f.tag,
                        S === 5 || S === 6 || S === 26 || S === 27) {
                            a = i = f;
                            continue e
                        }
                        m = m.parentNode
                    }
                }
                a = a.return
            }
        Hr(function() {
            var A = i
              , M = Zu(l)
              , j = [];
            e: {
                var z = fo.get(e);
                if (z !== void 0) {
                    var _ = oi
                      , X = e;
                    switch (e) {
                    case "keypress":
                        if (ci(l) === 0)
                            break e;
                    case "keydown":
                    case "keyup":
                        _ = fg;
                        break;
                    case "focusin":
                        X = "focus",
                        _ = Wu;
                        break;
                    case "focusout":
                        X = "blur",
                        _ = Wu;
                        break;
                    case "beforeblur":
                    case "afterblur":
                        _ = Wu;
                        break;
                    case "click":
                        if (l.button === 2)
                            break e;
                    case "auxclick":
                    case "dblclick":
                    case "mousedown":
                    case "mousemove":
                    case "mouseup":
                    case "mouseout":
                    case "mouseover":
                    case "contextmenu":
                        _ = Yr;
                        break;
                    case "drag":
                    case "dragend":
                    case "dragenter":
                    case "dragexit":
                    case "dragleave":
                    case "dragover":
                    case "dragstart":
                    case "drop":
                        _ = Im;
                        break;
                    case "touchcancel":
                    case "touchend":
                    case "touchmove":
                    case "touchstart":
                        _ = mg;
                        break;
                    case so:
                    case co:
                    case ro:
                        _ = lg;
                        break;
                    case oo:
                        _ = pg;
                        break;
                    case "scroll":
                    case "scrollend":
                        _ = Wm;
                        break;
                    case "wheel":
                        _ = vg;
                        break;
                    case "copy":
                    case "cut":
                    case "paste":
                        _ = ng;
                        break;
                    case "gotpointercapture":
                    case "lostpointercapture":
                    case "pointercancel":
                    case "pointerdown":
                    case "pointermove":
                    case "pointerout":
                    case "pointerover":
                    case "pointerup":
                        _ = Vr;
                        break;
                    case "toggle":
                    case "beforetoggle":
                        _ = bg
                    }
                    var F = (t & 4) !== 0
                      , Ee = !F && (e === "scroll" || e === "scrollend")
                      , O = F ? z !== null ? z + "Capture" : null : z;
                    F = [];
                    for (var x = A, R; x !== null; ) {
                        var L = x;
                        if (R = L.stateNode,
                        L = L.tag,
                        L !== 5 && L !== 26 && L !== 27 || R === null || O === null || (L = Fa(x, O),
                        L != null && F.push(Nn(x, L, R))),
                        Ee)
                            break;
                        x = x.return
                    }
                    0 < F.length && (z = new _(z,X,null,l,M),
                    j.push({
                        event: z,
                        listeners: F
                    }))
                }
            }
            if ((t & 7) === 0) {
                e: {
                    if (z = e === "mouseover" || e === "pointerover",
                    _ = e === "mouseout" || e === "pointerout",
                    z && l !== Xu && (X = l.relatedTarget || l.fromElement) && (aa(X) || X[la]))
                        break e;
                    if ((_ || z) && (z = M.window === M ? M : (z = M.ownerDocument) ? z.defaultView || z.parentWindow : window,
                    _ ? (X = l.relatedTarget || l.toElement,
                    _ = A,
                    X = X ? aa(X) : null,
                    X !== null && (Ee = d(X),
                    F = X.tag,
                    X !== Ee || F !== 5 && F !== 27 && F !== 6) && (X = null)) : (_ = null,
                    X = A),
                    _ !== X)) {
                        if (F = Yr,
                        L = "onMouseLeave",
                        O = "onMouseEnter",
                        x = "mouse",
                        (e === "pointerout" || e === "pointerover") && (F = Vr,
                        L = "onPointerLeave",
                        O = "onPointerEnter",
                        x = "pointer"),
                        Ee = _ == null ? z : ka(_),
                        R = X == null ? z : ka(X),
                        z = new F(L,x + "leave",_,l,M),
                        z.target = Ee,
                        z.relatedTarget = R,
                        L = null,
                        aa(M) === A && (F = new F(O,x + "enter",X,l,M),
                        F.target = R,
                        F.relatedTarget = Ee,
                        L = F),
                        Ee = L,
                        _ && X)
                            t: {
                                for (F = Sp,
                                O = _,
                                x = X,
                                R = 0,
                                L = O; L; L = F(L))
                                    R++;
                                L = 0;
                                for (var $ = x; $; $ = F($))
                                    L++;
                                for (; 0 < R - L; )
                                    O = F(O),
                                    R--;
                                for (; 0 < L - R; )
                                    x = F(x),
                                    L--;
                                for (; R--; ) {
                                    if (O === x || x !== null && O === x.alternate) {
                                        F = O;
                                        break t
                                    }
                                    O = F(O),
                                    x = F(x)
                                }
                                F = null
                            }
                        else
                            F = null;
                        _ !== null && jd(j, z, _, F, !1),
                        X !== null && Ee !== null && jd(j, Ee, X, F, !0)
                    }
                }
                e: {
                    if (z = A ? ka(A) : window,
                    _ = z.nodeName && z.nodeName.toLowerCase(),
                    _ === "select" || _ === "input" && z.type === "file")
                        var de = Fr;
                    else if ($r(z))
                        if (Wr)
                            de = Ng;
                        else {
                            de = _g;
                            var K = zg
                        }
                    else
                        _ = z.nodeName,
                        !_ || _.toLowerCase() !== "input" || z.type !== "checkbox" && z.type !== "radio" ? A && Qu(A.elementType) && (de = Fr) : de = Cg;
                    if (de && (de = de(e, A))) {
                        kr(j, de, l, M);
                        break e
                    }
                    K && K(e, z, A),
                    e === "focusout" && A && z.type === "number" && A.memoizedProps.value != null && Vu(z, "number", z.value)
                }
                switch (K = A ? ka(A) : window,
                e) {
                case "focusin":
                    ($r(K) || K.contentEditable === "true") && (da = K,
                    as = A,
                    nn = null);
                    break;
                case "focusout":
                    nn = as = da = null;
                    break;
                case "mousedown":
                    ns = !0;
                    break;
                case "contextmenu":
                case "mouseup":
                case "dragend":
                    ns = !1,
                    io(j, l, M);
                    break;
                case "selectionchange":
                    if (Mg)
                        break;
                case "keydown":
                case "keyup":
                    io(j, l, M)
                }
                var le;
                if (Iu)
                    e: {
                        switch (e) {
                        case "compositionstart":
                            var ce = "onCompositionStart";
                            break e;
                        case "compositionend":
                            ce = "onCompositionEnd";
                            break e;
                        case "compositionupdate":
                            ce = "onCompositionUpdate";
                            break e
                        }
                        ce = void 0
                    }
                else
                    fa ? Kr(e, l) && (ce = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (ce = "onCompositionStart");
                ce && (Qr && l.locale !== "ko" && (fa || ce !== "onCompositionStart" ? ce === "onCompositionEnd" && fa && (le = Br()) : (hl = M,
                $u = "value"in hl ? hl.value : hl.textContent,
                fa = !0)),
                K = eu(A, ce),
                0 < K.length && (ce = new Gr(ce,e,null,l,M),
                j.push({
                    event: ce,
                    listeners: K
                }),
                le ? ce.data = le : (le = Jr(l),
                le !== null && (ce.data = le)))),
                (le = Eg ? Og(e, l) : Tg(e, l)) && (ce = eu(A, "onBeforeInput"),
                0 < ce.length && (K = new Gr("onBeforeInput","beforeinput",null,l,M),
                j.push({
                    event: K,
                    listeners: ce
                }),
                K.data = le)),
                gp(j, e, A, l, M)
            }
            Ud(j, t)
        })
    }
    function Nn(e, t, l) {
        return {
            instance: e,
            listener: t,
            currentTarget: l
        }
    }
    function eu(e, t) {
        for (var l = t + "Capture", a = []; e !== null; ) {
            var n = e
              , i = n.stateNode;
            if (n = n.tag,
            n !== 5 && n !== 26 && n !== 27 || i === null || (n = Fa(e, l),
            n != null && a.unshift(Nn(e, n, i)),
            n = Fa(e, t),
            n != null && a.push(Nn(e, n, i))),
            e.tag === 3)
                return a;
            e = e.return
        }
        return []
    }
    function Sp(e) {
        if (e === null)
            return null;
        do
            e = e.return;
        while (e && e.tag !== 5 && e.tag !== 27);
        return e || null
    }
    function jd(e, t, l, a, n) {
        for (var i = t._reactName, f = []; l !== null && l !== a; ) {
            var m = l
              , S = m.alternate
              , A = m.stateNode;
            if (m = m.tag,
            S !== null && S === a)
                break;
            m !== 5 && m !== 26 && m !== 27 || A === null || (S = A,
            n ? (A = Fa(l, i),
            A != null && f.unshift(Nn(l, A, S))) : n || (A = Fa(l, i),
            A != null && f.push(Nn(l, A, S)))),
            l = l.return
        }
        f.length !== 0 && e.push({
            event: t,
            listeners: f
        })
    }
    var bp = /\r\n?/g
      , xp = /\u0000|\uFFFD/g;
    function wd(e) {
        return (typeof e == "string" ? e : "" + e).replace(bp, `
`).replace(xp, "")
    }
    function Hd(e, t) {
        return t = wd(t),
        wd(e) === t
    }
    function xe(e, t, l, a, n, i) {
        switch (l) {
        case "children":
            typeof a == "string" ? t === "body" || t === "textarea" && a === "" || ca(e, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && ca(e, "" + a);
            break;
        case "className":
            ni(e, "class", a);
            break;
        case "tabIndex":
            ni(e, "tabindex", a);
            break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
            ni(e, l, a);
            break;
        case "style":
            jr(e, a, i);
            break;
        case "data":
            if (t !== "object") {
                ni(e, "data", a);
                break
            }
        case "src":
        case "href":
            if (a === "" && (t !== "a" || l !== "href")) {
                e.removeAttribute(l);
                break
            }
            if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
                e.removeAttribute(l);
                break
            }
            a = ui("" + a),
            e.setAttribute(l, a);
            break;
        case "action":
        case "formAction":
            if (typeof a == "function") {
                e.setAttribute(l, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
                break
            } else
                typeof i == "function" && (l === "formAction" ? (t !== "input" && xe(e, t, "name", n.name, n, null),
                xe(e, t, "formEncType", n.formEncType, n, null),
                xe(e, t, "formMethod", n.formMethod, n, null),
                xe(e, t, "formTarget", n.formTarget, n, null)) : (xe(e, t, "encType", n.encType, n, null),
                xe(e, t, "method", n.method, n, null),
                xe(e, t, "target", n.target, n, null)));
            if (a == null || typeof a == "symbol" || typeof a == "boolean") {
                e.removeAttribute(l);
                break
            }
            a = ui("" + a),
            e.setAttribute(l, a);
            break;
        case "onClick":
            a != null && (e.onclick = Zt);
            break;
        case "onScroll":
            a != null && ue("scroll", e);
            break;
        case "onScrollEnd":
            a != null && ue("scrollend", e);
            break;
        case "dangerouslySetInnerHTML":
            if (a != null) {
                if (typeof a != "object" || !("__html"in a))
                    throw Error(r(61));
                if (l = a.__html,
                l != null) {
                    if (n.children != null)
                        throw Error(r(60));
                    e.innerHTML = l
                }
            }
            break;
        case "multiple":
            e.multiple = a && typeof a != "function" && typeof a != "symbol";
            break;
        case "muted":
            e.muted = a && typeof a != "function" && typeof a != "symbol";
            break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "ref":
            break;
        case "autoFocus":
            break;
        case "xlinkHref":
            if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
                e.removeAttribute("xlink:href");
                break
            }
            l = ui("" + a),
            e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", l);
            break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
            a != null && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(l, "" + a) : e.removeAttribute(l);
            break;
        case "inert":
        case "allowFullScreen":
        case "async":
        case "autoPlay":
        case "controls":
        case "default":
        case "defer":
        case "disabled":
        case "disablePictureInPicture":
        case "disableRemotePlayback":
        case "formNoValidate":
        case "hidden":
        case "loop":
        case "noModule":
        case "noValidate":
        case "open":
        case "playsInline":
        case "readOnly":
        case "required":
        case "reversed":
        case "scoped":
        case "seamless":
        case "itemScope":
            a && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(l, "") : e.removeAttribute(l);
            break;
        case "capture":
        case "download":
            a === !0 ? e.setAttribute(l, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(l, a) : e.removeAttribute(l);
            break;
        case "cols":
        case "rows":
        case "size":
        case "span":
            a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? e.setAttribute(l, a) : e.removeAttribute(l);
            break;
        case "rowSpan":
        case "start":
            a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? e.removeAttribute(l) : e.setAttribute(l, a);
            break;
        case "popover":
            ue("beforetoggle", e),
            ue("toggle", e),
            ai(e, "popover", a);
            break;
        case "xlinkActuate":
            Xt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
            break;
        case "xlinkArcrole":
            Xt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
            break;
        case "xlinkRole":
            Xt(e, "http://www.w3.org/1999/xlink", "xlink:role", a);
            break;
        case "xlinkShow":
            Xt(e, "http://www.w3.org/1999/xlink", "xlink:show", a);
            break;
        case "xlinkTitle":
            Xt(e, "http://www.w3.org/1999/xlink", "xlink:title", a);
            break;
        case "xlinkType":
            Xt(e, "http://www.w3.org/1999/xlink", "xlink:type", a);
            break;
        case "xmlBase":
            Xt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
            break;
        case "xmlLang":
            Xt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
            break;
        case "xmlSpace":
            Xt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
            break;
        case "is":
            ai(e, "is", a);
            break;
        case "innerText":
        case "textContent":
            break;
        default:
            (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = km.get(l) || l,
            ai(e, l, a))
        }
    }
    function Cc(e, t, l, a, n, i) {
        switch (l) {
        case "style":
            jr(e, a, i);
            break;
        case "dangerouslySetInnerHTML":
            if (a != null) {
                if (typeof a != "object" || !("__html"in a))
                    throw Error(r(61));
                if (l = a.__html,
                l != null) {
                    if (n.children != null)
                        throw Error(r(60));
                    e.innerHTML = l
                }
            }
            break;
        case "children":
            typeof a == "string" ? ca(e, a) : (typeof a == "number" || typeof a == "bigint") && ca(e, "" + a);
            break;
        case "onScroll":
            a != null && ue("scroll", e);
            break;
        case "onScrollEnd":
            a != null && ue("scrollend", e);
            break;
        case "onClick":
            a != null && (e.onclick = Zt);
            break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "innerHTML":
        case "ref":
            break;
        case "innerText":
        case "textContent":
            break;
        default:
            if (!Ar.hasOwnProperty(l))
                e: {
                    if (l[0] === "o" && l[1] === "n" && (n = l.endsWith("Capture"),
                    t = l.slice(2, n ? l.length - 7 : void 0),
                    i = e[nt] || null,
                    i = i != null ? i[l] : null,
                    typeof i == "function" && e.removeEventListener(t, i, n),
                    typeof a == "function")) {
                        typeof i != "function" && i !== null && (l in e ? e[l] = null : e.hasAttribute(l) && e.removeAttribute(l)),
                        e.addEventListener(t, a, n);
                        break e
                    }
                    l in e ? e[l] = a : a === !0 ? e.setAttribute(l, "") : ai(e, l, a)
                }
        }
    }
    function Fe(e, t, l) {
        switch (t) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
            break;
        case "img":
            ue("error", e),
            ue("load", e);
            var a = !1, n = !1, i;
            for (i in l)
                if (l.hasOwnProperty(i)) {
                    var f = l[i];
                    if (f != null)
                        switch (i) {
                        case "src":
                            a = !0;
                            break;
                        case "srcSet":
                            n = !0;
                            break;
                        case "children":
                        case "dangerouslySetInnerHTML":
                            throw Error(r(137, t));
                        default:
                            xe(e, t, i, f, l, null)
                        }
                }
            n && xe(e, t, "srcSet", l.srcSet, l, null),
            a && xe(e, t, "src", l.src, l, null);
            return;
        case "input":
            ue("invalid", e);
            var m = i = f = n = null
              , S = null
              , A = null;
            for (a in l)
                if (l.hasOwnProperty(a)) {
                    var M = l[a];
                    if (M != null)
                        switch (a) {
                        case "name":
                            n = M;
                            break;
                        case "type":
                            f = M;
                            break;
                        case "checked":
                            S = M;
                            break;
                        case "defaultChecked":
                            A = M;
                            break;
                        case "value":
                            i = M;
                            break;
                        case "defaultValue":
                            m = M;
                            break;
                        case "children":
                        case "dangerouslySetInnerHTML":
                            if (M != null)
                                throw Error(r(137, t));
                            break;
                        default:
                            xe(e, t, a, M, l, null)
                        }
                }
            Dr(e, i, m, S, A, f, n, !1);
            return;
        case "select":
            ue("invalid", e),
            a = f = i = null;
            for (n in l)
                if (l.hasOwnProperty(n) && (m = l[n],
                m != null))
                    switch (n) {
                    case "value":
                        i = m;
                        break;
                    case "defaultValue":
                        f = m;
                        break;
                    case "multiple":
                        a = m;
                    default:
                        xe(e, t, n, m, l, null)
                    }
            t = i,
            l = f,
            e.multiple = !!a,
            t != null ? sa(e, !!a, t, !1) : l != null && sa(e, !!a, l, !0);
            return;
        case "textarea":
            ue("invalid", e),
            i = n = a = null;
            for (f in l)
                if (l.hasOwnProperty(f) && (m = l[f],
                m != null))
                    switch (f) {
                    case "value":
                        a = m;
                        break;
                    case "defaultValue":
                        n = m;
                        break;
                    case "children":
                        i = m;
                        break;
                    case "dangerouslySetInnerHTML":
                        if (m != null)
                            throw Error(r(91));
                        break;
                    default:
                        xe(e, t, f, m, l, null)
                    }
            Ur(e, a, n, i);
            return;
        case "option":
            for (S in l)
                l.hasOwnProperty(S) && (a = l[S],
                a != null) && (S === "selected" ? e.selected = a && typeof a != "function" && typeof a != "symbol" : xe(e, t, S, a, l, null));
            return;
        case "dialog":
            ue("beforetoggle", e),
            ue("toggle", e),
            ue("cancel", e),
            ue("close", e);
            break;
        case "iframe":
        case "object":
            ue("load", e);
            break;
        case "video":
        case "audio":
            for (a = 0; a < Cn.length; a++)
                ue(Cn[a], e);
            break;
        case "image":
            ue("error", e),
            ue("load", e);
            break;
        case "details":
            ue("toggle", e);
            break;
        case "embed":
        case "source":
        case "link":
            ue("error", e),
            ue("load", e);
        case "area":
        case "base":
        case "br":
        case "col":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "track":
        case "wbr":
        case "menuitem":
            for (A in l)
                if (l.hasOwnProperty(A) && (a = l[A],
                a != null))
                    switch (A) {
                    case "children":
                    case "dangerouslySetInnerHTML":
                        throw Error(r(137, t));
                    default:
                        xe(e, t, A, a, l, null)
                    }
            return;
        default:
            if (Qu(t)) {
                for (M in l)
                    l.hasOwnProperty(M) && (a = l[M],
                    a !== void 0 && Cc(e, t, M, a, l, void 0));
                return
            }
        }
        for (m in l)
            l.hasOwnProperty(m) && (a = l[m],
            a != null && xe(e, t, m, a, l, null))
    }
    function Ep(e, t, l, a) {
        switch (t) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
            break;
        case "input":
            var n = null
              , i = null
              , f = null
              , m = null
              , S = null
              , A = null
              , M = null;
            for (_ in l) {
                var j = l[_];
                if (l.hasOwnProperty(_) && j != null)
                    switch (_) {
                    case "checked":
                        break;
                    case "value":
                        break;
                    case "defaultValue":
                        S = j;
                    default:
                        a.hasOwnProperty(_) || xe(e, t, _, null, a, j)
                    }
            }
            for (var z in a) {
                var _ = a[z];
                if (j = l[z],
                a.hasOwnProperty(z) && (_ != null || j != null))
                    switch (z) {
                    case "type":
                        i = _;
                        break;
                    case "name":
                        n = _;
                        break;
                    case "checked":
                        A = _;
                        break;
                    case "defaultChecked":
                        M = _;
                        break;
                    case "value":
                        f = _;
                        break;
                    case "defaultValue":
                        m = _;
                        break;
                    case "children":
                    case "dangerouslySetInnerHTML":
                        if (_ != null)
                            throw Error(r(137, t));
                        break;
                    default:
                        _ !== j && xe(e, t, z, _, a, j)
                    }
            }
            Gu(e, f, m, S, A, M, i, n);
            return;
        case "select":
            _ = f = m = z = null;
            for (i in l)
                if (S = l[i],
                l.hasOwnProperty(i) && S != null)
                    switch (i) {
                    case "value":
                        break;
                    case "multiple":
                        _ = S;
                    default:
                        a.hasOwnProperty(i) || xe(e, t, i, null, a, S)
                    }
            for (n in a)
                if (i = a[n],
                S = l[n],
                a.hasOwnProperty(n) && (i != null || S != null))
                    switch (n) {
                    case "value":
                        z = i;
                        break;
                    case "defaultValue":
                        m = i;
                        break;
                    case "multiple":
                        f = i;
                    default:
                        i !== S && xe(e, t, n, i, a, S)
                    }
            t = m,
            l = f,
            a = _,
            z != null ? sa(e, !!l, z, !1) : !!a != !!l && (t != null ? sa(e, !!l, t, !0) : sa(e, !!l, l ? [] : "", !1));
            return;
        case "textarea":
            _ = z = null;
            for (m in l)
                if (n = l[m],
                l.hasOwnProperty(m) && n != null && !a.hasOwnProperty(m))
                    switch (m) {
                    case "value":
                        break;
                    case "children":
                        break;
                    default:
                        xe(e, t, m, null, a, n)
                    }
            for (f in a)
                if (n = a[f],
                i = l[f],
                a.hasOwnProperty(f) && (n != null || i != null))
                    switch (f) {
                    case "value":
                        z = n;
                        break;
                    case "defaultValue":
                        _ = n;
                        break;
                    case "children":
                        break;
                    case "dangerouslySetInnerHTML":
                        if (n != null)
                            throw Error(r(91));
                        break;
                    default:
                        n !== i && xe(e, t, f, n, a, i)
                    }
            Mr(e, z, _);
            return;
        case "option":
            for (var X in l)
                z = l[X],
                l.hasOwnProperty(X) && z != null && !a.hasOwnProperty(X) && (X === "selected" ? e.selected = !1 : xe(e, t, X, null, a, z));
            for (S in a)
                z = a[S],
                _ = l[S],
                a.hasOwnProperty(S) && z !== _ && (z != null || _ != null) && (S === "selected" ? e.selected = z && typeof z != "function" && typeof z != "symbol" : xe(e, t, S, z, a, _));
            return;
        case "img":
        case "link":
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
        case "menuitem":
            for (var F in l)
                z = l[F],
                l.hasOwnProperty(F) && z != null && !a.hasOwnProperty(F) && xe(e, t, F, null, a, z);
            for (A in a)
                if (z = a[A],
                _ = l[A],
                a.hasOwnProperty(A) && z !== _ && (z != null || _ != null))
                    switch (A) {
                    case "children":
                    case "dangerouslySetInnerHTML":
                        if (z != null)
                            throw Error(r(137, t));
                        break;
                    default:
                        xe(e, t, A, z, a, _)
                    }
            return;
        default:
            if (Qu(t)) {
                for (var Ee in l)
                    z = l[Ee],
                    l.hasOwnProperty(Ee) && z !== void 0 && !a.hasOwnProperty(Ee) && Cc(e, t, Ee, void 0, a, z);
                for (M in a)
                    z = a[M],
                    _ = l[M],
                    !a.hasOwnProperty(M) || z === _ || z === void 0 && _ === void 0 || Cc(e, t, M, z, a, _);
                return
            }
        }
        for (var O in l)
            z = l[O],
            l.hasOwnProperty(O) && z != null && !a.hasOwnProperty(O) && xe(e, t, O, null, a, z);
        for (j in a)
            z = a[j],
            _ = l[j],
            !a.hasOwnProperty(j) || z === _ || z == null && _ == null || xe(e, t, j, z, a, _)
    }
    function Bd(e) {
        switch (e) {
        case "css":
        case "script":
        case "font":
        case "img":
        case "image":
        case "input":
        case "link":
            return !0;
        default:
            return !1
        }
    }
    function Op() {
        if (typeof performance.getEntriesByType == "function") {
            for (var e = 0, t = 0, l = performance.getEntriesByType("resource"), a = 0; a < l.length; a++) {
                var n = l[a]
                  , i = n.transferSize
                  , f = n.initiatorType
                  , m = n.duration;
                if (i && m && Bd(f)) {
                    for (f = 0,
                    m = n.responseEnd,
                    a += 1; a < l.length; a++) {
                        var S = l[a]
                          , A = S.startTime;
                        if (A > m)
                            break;
                        var M = S.transferSize
                          , j = S.initiatorType;
                        M && Bd(j) && (S = S.responseEnd,
                        f += M * (S < m ? 1 : (m - A) / (S - A)))
                    }
                    if (--a,
                    t += 8 * (i + f) / (n.duration / 1e3),
                    e++,
                    10 < e)
                        break
                }
            }
            if (0 < e)
                return t / e / 1e6
        }
        return navigator.connection && (e = navigator.connection.downlink,
        typeof e == "number") ? e : 5
    }
    var Nc = null
      , Dc = null;
    function tu(e) {
        return e.nodeType === 9 ? e : e.ownerDocument
    }
    function qd(e) {
        switch (e) {
        case "http://www.w3.org/2000/svg":
            return 1;
        case "http://www.w3.org/1998/Math/MathML":
            return 2;
        default:
            return 0
        }
    }
    function Yd(e, t) {
        if (e === 0)
            switch (t) {
            case "svg":
                return 1;
            case "math":
                return 2;
            default:
                return 0
            }
        return e === 1 && t === "foreignObject" ? 0 : e
    }
    function Mc(e, t) {
        return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null
    }
    var Uc = null;
    function Tp() {
        var e = window.event;
        return e && e.type === "popstate" ? e === Uc ? !1 : (Uc = e,
        !0) : (Uc = null,
        !1)
    }
    var Gd = typeof setTimeout == "function" ? setTimeout : void 0
      , Rp = typeof clearTimeout == "function" ? clearTimeout : void 0
      , Vd = typeof Promise == "function" ? Promise : void 0
      , Ap = typeof queueMicrotask == "function" ? queueMicrotask : typeof Vd < "u" ? function(e) {
        return Vd.resolve(null).then(e).catch(zp)
    }
    : Gd;
    function zp(e) {
        setTimeout(function() {
            throw e
        })
    }
    function Nl(e) {
        return e === "head"
    }
    function Qd(e, t) {
        var l = t
          , a = 0;
        do {
            var n = l.nextSibling;
            if (e.removeChild(l),
            n && n.nodeType === 8)
                if (l = n.data,
                l === "/$" || l === "/&") {
                    if (a === 0) {
                        e.removeChild(n),
                        qa(t);
                        return
                    }
                    a--
                } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
                    a++;
                else if (l === "html")
                    Dn(e.ownerDocument.documentElement);
                else if (l === "head") {
                    l = e.ownerDocument.head,
                    Dn(l);
                    for (var i = l.firstChild; i; ) {
                        var f = i.nextSibling
                          , m = i.nodeName;
                        i[$a] || m === "SCRIPT" || m === "STYLE" || m === "LINK" && i.rel.toLowerCase() === "stylesheet" || l.removeChild(i),
                        i = f
                    }
                } else
                    l === "body" && Dn(e.ownerDocument.body);
            l = n
        } while (l);
        qa(t)
    }
    function Xd(e, t) {
        var l = e;
        e = 0;
        do {
            var a = l.nextSibling;
            if (l.nodeType === 1 ? t ? (l._stashedDisplay = l.style.display,
            l.style.display = "none") : (l.style.display = l._stashedDisplay || "",
            l.getAttribute("style") === "" && l.removeAttribute("style")) : l.nodeType === 3 && (t ? (l._stashedText = l.nodeValue,
            l.nodeValue = "") : l.nodeValue = l._stashedText || ""),
            a && a.nodeType === 8)
                if (l = a.data,
                l === "/$") {
                    if (e === 0)
                        break;
                    e--
                } else
                    l !== "$" && l !== "$?" && l !== "$~" && l !== "$!" || e++;
            l = a
        } while (l)
    }
    function Lc(e) {
        var t = e.firstChild;
        for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
            var l = t;
            switch (t = t.nextSibling,
            l.nodeName) {
            case "HTML":
            case "HEAD":
            case "BODY":
                Lc(l),
                qu(l);
                continue;
            case "SCRIPT":
            case "STYLE":
                continue;
            case "LINK":
                if (l.rel.toLowerCase() === "stylesheet")
                    continue
            }
            e.removeChild(l)
        }
    }
    function _p(e, t, l, a) {
        for (; e.nodeType === 1; ) {
            var n = l;
            if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
                if (!a && (e.nodeName !== "INPUT" || e.type !== "hidden"))
                    break
            } else if (a) {
                if (!e[$a])
                    switch (t) {
                    case "meta":
                        if (!e.hasAttribute("itemprop"))
                            break;
                        return e;
                    case "link":
                        if (i = e.getAttribute("rel"),
                        i === "stylesheet" && e.hasAttribute("data-precedence"))
                            break;
                        if (i !== n.rel || e.getAttribute("href") !== (n.href == null || n.href === "" ? null : n.href) || e.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin) || e.getAttribute("title") !== (n.title == null ? null : n.title))
                            break;
                        return e;
                    case "style":
                        if (e.hasAttribute("data-precedence"))
                            break;
                        return e;
                    case "script":
                        if (i = e.getAttribute("src"),
                        (i !== (n.src == null ? null : n.src) || e.getAttribute("type") !== (n.type == null ? null : n.type) || e.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin)) && i && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                            break;
                        return e;
                    default:
                        return e
                    }
            } else if (t === "input" && e.type === "hidden") {
                var i = n.name == null ? null : "" + n.name;
                if (n.type === "hidden" && e.getAttribute("name") === i)
                    return e
            } else
                return e;
            if (e = Nt(e.nextSibling),
            e === null)
                break
        }
        return null
    }
    function Cp(e, t, l) {
        if (t === "")
            return null;
        for (; e.nodeType !== 3; )
            if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !l || (e = Nt(e.nextSibling),
            e === null))
                return null;
        return e
    }
    function Zd(e, t) {
        for (; e.nodeType !== 8; )
            if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Nt(e.nextSibling),
            e === null))
                return null;
        return e
    }
    function jc(e) {
        return e.data === "$?" || e.data === "$~"
    }
    function wc(e) {
        return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading"
    }
    function Np(e, t) {
        var l = e.ownerDocument;
        if (e.data === "$~")
            e._reactRetry = t;
        else if (e.data !== "$?" || l.readyState !== "loading")
            t();
        else {
            var a = function() {
                t(),
                l.removeEventListener("DOMContentLoaded", a)
            };
            l.addEventListener("DOMContentLoaded", a),
            e._reactRetry = a
        }
    }
    function Nt(e) {
        for (; e != null; e = e.nextSibling) {
            var t = e.nodeType;
            if (t === 1 || t === 3)
                break;
            if (t === 8) {
                if (t = e.data,
                t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
                    break;
                if (t === "/$" || t === "/&")
                    return null
            }
        }
        return e
    }
    var Hc = null;
    function Kd(e) {
        e = e.nextSibling;
        for (var t = 0; e; ) {
            if (e.nodeType === 8) {
                var l = e.data;
                if (l === "/$" || l === "/&") {
                    if (t === 0)
                        return Nt(e.nextSibling);
                    t--
                } else
                    l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || t++
            }
            e = e.nextSibling
        }
        return null
    }
    function Jd(e) {
        e = e.previousSibling;
        for (var t = 0; e; ) {
            if (e.nodeType === 8) {
                var l = e.data;
                if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
                    if (t === 0)
                        return e;
                    t--
                } else
                    l !== "/$" && l !== "/&" || t++
            }
            e = e.previousSibling
        }
        return null
    }
    function $d(e, t, l) {
        switch (t = tu(l),
        e) {
        case "html":
            if (e = t.documentElement,
            !e)
                throw Error(r(452));
            return e;
        case "head":
            if (e = t.head,
            !e)
                throw Error(r(453));
            return e;
        case "body":
            if (e = t.body,
            !e)
                throw Error(r(454));
            return e;
        default:
            throw Error(r(451))
        }
    }
    function Dn(e) {
        for (var t = e.attributes; t.length; )
            e.removeAttributeNode(t[0]);
        qu(e)
    }
    var Dt = new Map
      , kd = new Set;
    function lu(e) {
        return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument
    }
    var sl = Y.d;
    Y.d = {
        f: Dp,
        r: Mp,
        D: Up,
        C: Lp,
        L: jp,
        m: wp,
        X: Bp,
        S: Hp,
        M: qp
    };
    function Dp() {
        var e = sl.f()
          , t = Ji();
        return e || t
    }
    function Mp(e) {
        var t = na(e);
        t !== null && t.tag === 5 && t.type === "form" ? df(t) : sl.r(e)
    }
    var wa = typeof document > "u" ? null : document;
    function Fd(e, t, l) {
        var a = wa;
        if (a && typeof t == "string" && t) {
            var n = Ot(t);
            n = 'link[rel="' + e + '"][href="' + n + '"]',
            typeof l == "string" && (n += '[crossorigin="' + l + '"]'),
            kd.has(n) || (kd.add(n),
            e = {
                rel: e,
                crossOrigin: l,
                href: t
            },
            a.querySelector(n) === null && (t = a.createElement("link"),
            Fe(t, "link", e),
            Qe(t),
            a.head.appendChild(t)))
        }
    }
    function Up(e) {
        sl.D(e),
        Fd("dns-prefetch", e, null)
    }
    function Lp(e, t) {
        sl.C(e, t),
        Fd("preconnect", e, t)
    }
    function jp(e, t, l) {
        sl.L(e, t, l);
        var a = wa;
        if (a && e && t) {
            var n = 'link[rel="preload"][as="' + Ot(t) + '"]';
            t === "image" && l && l.imageSrcSet ? (n += '[imagesrcset="' + Ot(l.imageSrcSet) + '"]',
            typeof l.imageSizes == "string" && (n += '[imagesizes="' + Ot(l.imageSizes) + '"]')) : n += '[href="' + Ot(e) + '"]';
            var i = n;
            switch (t) {
            case "style":
                i = Ha(e);
                break;
            case "script":
                i = Ba(e)
            }
            Dt.has(i) || (e = v({
                rel: "preload",
                href: t === "image" && l && l.imageSrcSet ? void 0 : e,
                as: t
            }, l),
            Dt.set(i, e),
            a.querySelector(n) !== null || t === "style" && a.querySelector(Mn(i)) || t === "script" && a.querySelector(Un(i)) || (t = a.createElement("link"),
            Fe(t, "link", e),
            Qe(t),
            a.head.appendChild(t)))
        }
    }
    function wp(e, t) {
        sl.m(e, t);
        var l = wa;
        if (l && e) {
            var a = t && typeof t.as == "string" ? t.as : "script"
              , n = 'link[rel="modulepreload"][as="' + Ot(a) + '"][href="' + Ot(e) + '"]'
              , i = n;
            switch (a) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
                i = Ba(e)
            }
            if (!Dt.has(i) && (e = v({
                rel: "modulepreload",
                href: e
            }, t),
            Dt.set(i, e),
            l.querySelector(n) === null)) {
                switch (a) {
                case "audioworklet":
                case "paintworklet":
                case "serviceworker":
                case "sharedworker":
                case "worker":
                case "script":
                    if (l.querySelector(Un(i)))
                        return
                }
                a = l.createElement("link"),
                Fe(a, "link", e),
                Qe(a),
                l.head.appendChild(a)
            }
        }
    }
    function Hp(e, t, l) {
        sl.S(e, t, l);
        var a = wa;
        if (a && e) {
            var n = ia(a).hoistableStyles
              , i = Ha(e);
            t = t || "default";
            var f = n.get(i);
            if (!f) {
                var m = {
                    loading: 0,
                    preload: null
                };
                if (f = a.querySelector(Mn(i)))
                    m.loading = 5;
                else {
                    e = v({
                        rel: "stylesheet",
                        href: e,
                        "data-precedence": t
                    }, l),
                    (l = Dt.get(i)) && Bc(e, l);
                    var S = f = a.createElement("link");
                    Qe(S),
                    Fe(S, "link", e),
                    S._p = new Promise(function(A, M) {
                        S.onload = A,
                        S.onerror = M
                    }
                    ),
                    S.addEventListener("load", function() {
                        m.loading |= 1
                    }),
                    S.addEventListener("error", function() {
                        m.loading |= 2
                    }),
                    m.loading |= 4,
                    au(f, t, a)
                }
                f = {
                    type: "stylesheet",
                    instance: f,
                    count: 1,
                    state: m
                },
                n.set(i, f)
            }
        }
    }
    function Bp(e, t) {
        sl.X(e, t);
        var l = wa;
        if (l && e) {
            var a = ia(l).hoistableScripts
              , n = Ba(e)
              , i = a.get(n);
            i || (i = l.querySelector(Un(n)),
            i || (e = v({
                src: e,
                async: !0
            }, t),
            (t = Dt.get(n)) && qc(e, t),
            i = l.createElement("script"),
            Qe(i),
            Fe(i, "link", e),
            l.head.appendChild(i)),
            i = {
                type: "script",
                instance: i,
                count: 1,
                state: null
            },
            a.set(n, i))
        }
    }
    function qp(e, t) {
        sl.M(e, t);
        var l = wa;
        if (l && e) {
            var a = ia(l).hoistableScripts
              , n = Ba(e)
              , i = a.get(n);
            i || (i = l.querySelector(Un(n)),
            i || (e = v({
                src: e,
                async: !0,
                type: "module"
            }, t),
            (t = Dt.get(n)) && qc(e, t),
            i = l.createElement("script"),
            Qe(i),
            Fe(i, "link", e),
            l.head.appendChild(i)),
            i = {
                type: "script",
                instance: i,
                count: 1,
                state: null
            },
            a.set(n, i))
        }
    }
    function Wd(e, t, l, a) {
        var n = (n = ne.current) ? lu(n) : null;
        if (!n)
            throw Error(r(446));
        switch (e) {
        case "meta":
        case "title":
            return null;
        case "style":
            return typeof l.precedence == "string" && typeof l.href == "string" ? (t = Ha(l.href),
            l = ia(n).hoistableStyles,
            a = l.get(t),
            a || (a = {
                type: "style",
                instance: null,
                count: 0,
                state: null
            },
            l.set(t, a)),
            a) : {
                type: "void",
                instance: null,
                count: 0,
                state: null
            };
        case "link":
            if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
                e = Ha(l.href);
                var i = ia(n).hoistableStyles
                  , f = i.get(e);
                if (f || (n = n.ownerDocument || n,
                f = {
                    type: "stylesheet",
                    instance: null,
                    count: 0,
                    state: {
                        loading: 0,
                        preload: null
                    }
                },
                i.set(e, f),
                (i = n.querySelector(Mn(e))) && !i._p && (f.instance = i,
                f.state.loading = 5),
                Dt.has(e) || (l = {
                    rel: "preload",
                    as: "style",
                    href: l.href,
                    crossOrigin: l.crossOrigin,
                    integrity: l.integrity,
                    media: l.media,
                    hrefLang: l.hrefLang,
                    referrerPolicy: l.referrerPolicy
                },
                Dt.set(e, l),
                i || Yp(n, e, l, f.state))),
                t && a === null)
                    throw Error(r(528, ""));
                return f
            }
            if (t && a !== null)
                throw Error(r(529, ""));
            return null;
        case "script":
            return t = l.async,
            l = l.src,
            typeof l == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Ba(l),
            l = ia(n).hoistableScripts,
            a = l.get(t),
            a || (a = {
                type: "script",
                instance: null,
                count: 0,
                state: null
            },
            l.set(t, a)),
            a) : {
                type: "void",
                instance: null,
                count: 0,
                state: null
            };
        default:
            throw Error(r(444, e))
        }
    }
    function Ha(e) {
        return 'href="' + Ot(e) + '"'
    }
    function Mn(e) {
        return 'link[rel="stylesheet"][' + e + "]"
    }
    function Pd(e) {
        return v({}, e, {
            "data-precedence": e.precedence,
            precedence: null
        })
    }
    function Yp(e, t, l, a) {
        e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = e.createElement("link"),
        a.preload = t,
        t.addEventListener("load", function() {
            return a.loading |= 1
        }),
        t.addEventListener("error", function() {
            return a.loading |= 2
        }),
        Fe(t, "link", l),
        Qe(t),
        e.head.appendChild(t))
    }
    function Ba(e) {
        return '[src="' + Ot(e) + '"]'
    }
    function Un(e) {
        return "script[async]" + e
    }
    function Id(e, t, l) {
        if (t.count++,
        t.instance === null)
            switch (t.type) {
            case "style":
                var a = e.querySelector('style[data-href~="' + Ot(l.href) + '"]');
                if (a)
                    return t.instance = a,
                    Qe(a),
                    a;
                var n = v({}, l, {
                    "data-href": l.href,
                    "data-precedence": l.precedence,
                    href: null,
                    precedence: null
                });
                return a = (e.ownerDocument || e).createElement("style"),
                Qe(a),
                Fe(a, "style", n),
                au(a, l.precedence, e),
                t.instance = a;
            case "stylesheet":
                n = Ha(l.href);
                var i = e.querySelector(Mn(n));
                if (i)
                    return t.state.loading |= 4,
                    t.instance = i,
                    Qe(i),
                    i;
                a = Pd(l),
                (n = Dt.get(n)) && Bc(a, n),
                i = (e.ownerDocument || e).createElement("link"),
                Qe(i);
                var f = i;
                return f._p = new Promise(function(m, S) {
                    f.onload = m,
                    f.onerror = S
                }
                ),
                Fe(i, "link", a),
                t.state.loading |= 4,
                au(i, l.precedence, e),
                t.instance = i;
            case "script":
                return i = Ba(l.src),
                (n = e.querySelector(Un(i))) ? (t.instance = n,
                Qe(n),
                n) : (a = l,
                (n = Dt.get(i)) && (a = v({}, l),
                qc(a, n)),
                e = e.ownerDocument || e,
                n = e.createElement("script"),
                Qe(n),
                Fe(n, "link", a),
                e.head.appendChild(n),
                t.instance = n);
            case "void":
                return null;
            default:
                throw Error(r(443, t.type))
            }
        else
            t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance,
            t.state.loading |= 4,
            au(a, l.precedence, e));
        return t.instance
    }
    function au(e, t, l) {
        for (var a = l.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), n = a.length ? a[a.length - 1] : null, i = n, f = 0; f < a.length; f++) {
            var m = a[f];
            if (m.dataset.precedence === t)
                i = m;
            else if (i !== n)
                break
        }
        i ? i.parentNode.insertBefore(e, i.nextSibling) : (t = l.nodeType === 9 ? l.head : l,
        t.insertBefore(e, t.firstChild))
    }
    function Bc(e, t) {
        e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
        e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
        e.title == null && (e.title = t.title)
    }
    function qc(e, t) {
        e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
        e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
        e.integrity == null && (e.integrity = t.integrity)
    }
    var nu = null;
    function eh(e, t, l) {
        if (nu === null) {
            var a = new Map
              , n = nu = new Map;
            n.set(l, a)
        } else
            n = nu,
            a = n.get(l),
            a || (a = new Map,
            n.set(l, a));
        if (a.has(e))
            return a;
        for (a.set(e, null),
        l = l.getElementsByTagName(e),
        n = 0; n < l.length; n++) {
            var i = l[n];
            if (!(i[$a] || i[Ke] || e === "link" && i.getAttribute("rel") === "stylesheet") && i.namespaceURI !== "http://www.w3.org/2000/svg") {
                var f = i.getAttribute(t) || "";
                f = e + f;
                var m = a.get(f);
                m ? m.push(i) : a.set(f, [i])
            }
        }
        return a
    }
    function th(e, t, l) {
        e = e.ownerDocument || e,
        e.head.insertBefore(l, t === "title" ? e.querySelector("head > title") : null)
    }
    function Gp(e, t, l) {
        if (l === 1 || t.itemProp != null)
            return !1;
        switch (e) {
        case "meta":
        case "title":
            return !0;
        case "style":
            if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
                break;
            return !0;
        case "link":
            if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
                break;
            return t.rel === "stylesheet" ? (e = t.disabled,
            typeof t.precedence == "string" && e == null) : !0;
        case "script":
            if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
                return !0
        }
        return !1
    }
    function lh(e) {
        return !(e.type === "stylesheet" && (e.state.loading & 3) === 0)
    }
    function Vp(e, t, l, a) {
        if (l.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (l.state.loading & 4) === 0) {
            if (l.instance === null) {
                var n = Ha(a.href)
                  , i = t.querySelector(Mn(n));
                if (i) {
                    t = i._p,
                    t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++,
                    e = iu.bind(e),
                    t.then(e, e)),
                    l.state.loading |= 4,
                    l.instance = i,
                    Qe(i);
                    return
                }
                i = t.ownerDocument || t,
                a = Pd(a),
                (n = Dt.get(n)) && Bc(a, n),
                i = i.createElement("link"),
                Qe(i);
                var f = i;
                f._p = new Promise(function(m, S) {
                    f.onload = m,
                    f.onerror = S
                }
                ),
                Fe(i, "link", a),
                l.instance = i
            }
            e.stylesheets === null && (e.stylesheets = new Map),
            e.stylesheets.set(l, t),
            (t = l.state.preload) && (l.state.loading & 3) === 0 && (e.count++,
            l = iu.bind(e),
            t.addEventListener("load", l),
            t.addEventListener("error", l))
        }
    }
    var Yc = 0;
    function Qp(e, t) {
        return e.stylesheets && e.count === 0 && su(e, e.stylesheets),
        0 < e.count || 0 < e.imgCount ? function(l) {
            var a = setTimeout(function() {
                if (e.stylesheets && su(e, e.stylesheets),
                e.unsuspend) {
                    var i = e.unsuspend;
                    e.unsuspend = null,
                    i()
                }
            }, 6e4 + t);
            0 < e.imgBytes && Yc === 0 && (Yc = 62500 * Op());
            var n = setTimeout(function() {
                if (e.waitingForImages = !1,
                e.count === 0 && (e.stylesheets && su(e, e.stylesheets),
                e.unsuspend)) {
                    var i = e.unsuspend;
                    e.unsuspend = null,
                    i()
                }
            }, (e.imgBytes > Yc ? 50 : 800) + t);
            return e.unsuspend = l,
            function() {
                e.unsuspend = null,
                clearTimeout(a),
                clearTimeout(n)
            }
        }
        : null
    }
    function iu() {
        if (this.count--,
        this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
            if (this.stylesheets)
                su(this, this.stylesheets);
            else if (this.unsuspend) {
                var e = this.unsuspend;
                this.unsuspend = null,
                e()
            }
        }
    }
    var uu = null;
    function su(e, t) {
        e.stylesheets = null,
        e.unsuspend !== null && (e.count++,
        uu = new Map,
        t.forEach(Xp, e),
        uu = null,
        iu.call(e))
    }
    function Xp(e, t) {
        if (!(t.state.loading & 4)) {
            var l = uu.get(e);
            if (l)
                var a = l.get(null);
            else {
                l = new Map,
                uu.set(e, l);
                for (var n = e.querySelectorAll("link[data-precedence],style[data-precedence]"), i = 0; i < n.length; i++) {
                    var f = n[i];
                    (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") && (l.set(f.dataset.precedence, f),
                    a = f)
                }
                a && l.set(null, a)
            }
            n = t.instance,
            f = n.getAttribute("data-precedence"),
            i = l.get(f) || a,
            i === a && l.set(null, n),
            l.set(f, n),
            this.count++,
            a = iu.bind(this),
            n.addEventListener("load", a),
            n.addEventListener("error", a),
            i ? i.parentNode.insertBefore(n, i.nextSibling) : (e = e.nodeType === 9 ? e.head : e,
            e.insertBefore(n, e.firstChild)),
            t.state.loading |= 4
        }
    }
    var Ln = {
        $$typeof: J,
        Provider: null,
        Consumer: null,
        _currentValue: k,
        _currentValue2: k,
        _threadCount: 0
    };
    function Zp(e, t, l, a, n, i, f, m, S) {
        this.tag = 1,
        this.containerInfo = e,
        this.pingCache = this.current = this.pendingChildren = null,
        this.timeoutHandle = -1,
        this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null,
        this.callbackPriority = 0,
        this.expirationTimes = ju(-1),
        this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0,
        this.entanglements = ju(0),
        this.hiddenUpdates = ju(null),
        this.identifierPrefix = a,
        this.onUncaughtError = n,
        this.onCaughtError = i,
        this.onRecoverableError = f,
        this.pooledCache = null,
        this.pooledCacheLanes = 0,
        this.formState = S,
        this.incompleteTransitions = new Map
    }
    function ah(e, t, l, a, n, i, f, m, S, A, M, j) {
        return e = new Zp(e,t,l,f,S,A,M,j,m),
        t = 1,
        i === !0 && (t |= 24),
        i = gt(3, null, null, t),
        e.current = i,
        i.stateNode = e,
        t = Ss(),
        t.refCount++,
        e.pooledCache = t,
        t.refCount++,
        i.memoizedState = {
            element: a,
            isDehydrated: l,
            cache: t
        },
        Os(i),
        e
    }
    function nh(e) {
        return e ? (e = ga,
        e) : ga
    }
    function ih(e, t, l, a, n, i) {
        n = nh(n),
        a.context === null ? a.context = n : a.pendingContext = n,
        a = Sl(t),
        a.payload = {
            element: l
        },
        i = i === void 0 ? null : i,
        i !== null && (a.callback = i),
        l = bl(e, a, t),
        l !== null && (ot(l, e, t),
        dn(l, e, t))
    }
    function uh(e, t) {
        if (e = e.memoizedState,
        e !== null && e.dehydrated !== null) {
            var l = e.retryLane;
            e.retryLane = l !== 0 && l < t ? l : t
        }
    }
    function Gc(e, t) {
        uh(e, t),
        (e = e.alternate) && uh(e, t)
    }
    function sh(e) {
        if (e.tag === 13 || e.tag === 31) {
            var t = Ql(e, 67108864);
            t !== null && ot(t, e, 67108864),
            Gc(e, 67108864)
        }
    }
    function ch(e) {
        if (e.tag === 13 || e.tag === 31) {
            var t = bt();
            t = wu(t);
            var l = Ql(e, t);
            l !== null && ot(l, e, t),
            Gc(e, t)
        }
    }
    var cu = !0;
    function Kp(e, t, l, a) {
        var n = N.T;
        N.T = null;
        var i = Y.p;
        try {
            Y.p = 2,
            Vc(e, t, l, a)
        } finally {
            Y.p = i,
            N.T = n
        }
    }
    function Jp(e, t, l, a) {
        var n = N.T;
        N.T = null;
        var i = Y.p;
        try {
            Y.p = 8,
            Vc(e, t, l, a)
        } finally {
            Y.p = i,
            N.T = n
        }
    }
    function Vc(e, t, l, a) {
        if (cu) {
            var n = Qc(a);
            if (n === null)
                _c(e, t, a, ru, l),
                oh(e, a);
            else if (kp(n, e, t, l, a))
                a.stopPropagation();
            else if (oh(e, a),
            t & 4 && -1 < $p.indexOf(e)) {
                for (; n !== null; ) {
                    var i = na(n);
                    if (i !== null)
                        switch (i.tag) {
                        case 3:
                            if (i = i.stateNode,
                            i.current.memoizedState.isDehydrated) {
                                var f = Bl(i.pendingLanes);
                                if (f !== 0) {
                                    var m = i;
                                    for (m.pendingLanes |= 2,
                                    m.entangledLanes |= 2; f; ) {
                                        var S = 1 << 31 - ht(f);
                                        m.entanglements[1] |= S,
                                        f &= ~S
                                    }
                                    Gt(i),
                                    (me & 6) === 0 && (Zi = ft() + 500,
                                    _n(0))
                                }
                            }
                            break;
                        case 31:
                        case 13:
                            m = Ql(i, 2),
                            m !== null && ot(m, i, 2),
                            Ji(),
                            Gc(i, 2)
                        }
                    if (i = Qc(a),
                    i === null && _c(e, t, a, ru, l),
                    i === n)
                        break;
                    n = i
                }
                n !== null && a.stopPropagation()
            } else
                _c(e, t, a, null, l)
        }
    }
    function Qc(e) {
        return e = Zu(e),
        Xc(e)
    }
    var ru = null;
    function Xc(e) {
        if (ru = null,
        e = aa(e),
        e !== null) {
            var t = d(e);
            if (t === null)
                e = null;
            else {
                var l = t.tag;
                if (l === 13) {
                    if (e = h(t),
                    e !== null)
                        return e;
                    e = null
                } else if (l === 31) {
                    if (e = p(t),
                    e !== null)
                        return e;
                    e = null
                } else if (l === 3) {
                    if (t.stateNode.current.memoizedState.isDehydrated)
                        return t.tag === 3 ? t.stateNode.containerInfo : null;
                    e = null
                } else
                    t !== e && (e = null)
            }
        }
        return ru = e,
        null
    }
    function rh(e) {
        switch (e) {
        case "beforetoggle":
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "toggle":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
            return 2;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
            return 8;
        case "message":
            switch (Um()) {
            case gr:
                return 2;
            case pr:
                return 8;
            case Pn:
            case Lm:
                return 32;
            case yr:
                return 268435456;
            default:
                return 32
            }
        default:
            return 32
        }
    }
    var Zc = !1
      , Dl = null
      , Ml = null
      , Ul = null
      , jn = new Map
      , wn = new Map
      , Ll = []
      , $p = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
    function oh(e, t) {
        switch (e) {
        case "focusin":
        case "focusout":
            Dl = null;
            break;
        case "dragenter":
        case "dragleave":
            Ml = null;
            break;
        case "mouseover":
        case "mouseout":
            Ul = null;
            break;
        case "pointerover":
        case "pointerout":
            jn.delete(t.pointerId);
            break;
        case "gotpointercapture":
        case "lostpointercapture":
            wn.delete(t.pointerId)
        }
    }
    function Hn(e, t, l, a, n, i) {
        return e === null || e.nativeEvent !== i ? (e = {
            blockedOn: t,
            domEventName: l,
            eventSystemFlags: a,
            nativeEvent: i,
            targetContainers: [n]
        },
        t !== null && (t = na(t),
        t !== null && sh(t)),
        e) : (e.eventSystemFlags |= a,
        t = e.targetContainers,
        n !== null && t.indexOf(n) === -1 && t.push(n),
        e)
    }
    function kp(e, t, l, a, n) {
        switch (t) {
        case "focusin":
            return Dl = Hn(Dl, e, t, l, a, n),
            !0;
        case "dragenter":
            return Ml = Hn(Ml, e, t, l, a, n),
            !0;
        case "mouseover":
            return Ul = Hn(Ul, e, t, l, a, n),
            !0;
        case "pointerover":
            var i = n.pointerId;
            return jn.set(i, Hn(jn.get(i) || null, e, t, l, a, n)),
            !0;
        case "gotpointercapture":
            return i = n.pointerId,
            wn.set(i, Hn(wn.get(i) || null, e, t, l, a, n)),
            !0
        }
        return !1
    }
    function fh(e) {
        var t = aa(e.target);
        if (t !== null) {
            var l = d(t);
            if (l !== null) {
                if (t = l.tag,
                t === 13) {
                    if (t = h(l),
                    t !== null) {
                        e.blockedOn = t,
                        Or(e.priority, function() {
                            ch(l)
                        });
                        return
                    }
                } else if (t === 31) {
                    if (t = p(l),
                    t !== null) {
                        e.blockedOn = t,
                        Or(e.priority, function() {
                            ch(l)
                        });
                        return
                    }
                } else if (t === 3 && l.stateNode.current.memoizedState.isDehydrated) {
                    e.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
                    return
                }
            }
        }
        e.blockedOn = null
    }
    function ou(e) {
        if (e.blockedOn !== null)
            return !1;
        for (var t = e.targetContainers; 0 < t.length; ) {
            var l = Qc(e.nativeEvent);
            if (l === null) {
                l = e.nativeEvent;
                var a = new l.constructor(l.type,l);
                Xu = a,
                l.target.dispatchEvent(a),
                Xu = null
            } else
                return t = na(l),
                t !== null && sh(t),
                e.blockedOn = l,
                !1;
            t.shift()
        }
        return !0
    }
    function dh(e, t, l) {
        ou(e) && l.delete(t)
    }
    function Fp() {
        Zc = !1,
        Dl !== null && ou(Dl) && (Dl = null),
        Ml !== null && ou(Ml) && (Ml = null),
        Ul !== null && ou(Ul) && (Ul = null),
        jn.forEach(dh),
        wn.forEach(dh)
    }
    function fu(e, t) {
        e.blockedOn === t && (e.blockedOn = null,
        Zc || (Zc = !0,
        c.unstable_scheduleCallback(c.unstable_NormalPriority, Fp)))
    }
    var du = null;
    function hh(e) {
        du !== e && (du = e,
        c.unstable_scheduleCallback(c.unstable_NormalPriority, function() {
            du === e && (du = null);
            for (var t = 0; t < e.length; t += 3) {
                var l = e[t]
                  , a = e[t + 1]
                  , n = e[t + 2];
                if (typeof a != "function") {
                    if (Xc(a || l) === null)
                        continue;
                    break
                }
                var i = na(l);
                i !== null && (e.splice(t, 3),
                t -= 3,
                Qs(i, {
                    pending: !0,
                    data: n,
                    method: l.method,
                    action: a
                }, a, n))
            }
        }))
    }
    function qa(e) {
        function t(S) {
            return fu(S, e)
        }
        Dl !== null && fu(Dl, e),
        Ml !== null && fu(Ml, e),
        Ul !== null && fu(Ul, e),
        jn.forEach(t),
        wn.forEach(t);
        for (var l = 0; l < Ll.length; l++) {
            var a = Ll[l];
            a.blockedOn === e && (a.blockedOn = null)
        }
        for (; 0 < Ll.length && (l = Ll[0],
        l.blockedOn === null); )
            fh(l),
            l.blockedOn === null && Ll.shift();
        if (l = (e.ownerDocument || e).$$reactFormReplay,
        l != null)
            for (a = 0; a < l.length; a += 3) {
                var n = l[a]
                  , i = l[a + 1]
                  , f = n[nt] || null;
                if (typeof i == "function")
                    f || hh(l);
                else if (f) {
                    var m = null;
                    if (i && i.hasAttribute("formAction")) {
                        if (n = i,
                        f = i[nt] || null)
                            m = f.formAction;
                        else if (Xc(n) !== null)
                            continue
                    } else
                        m = f.action;
                    typeof m == "function" ? l[a + 1] = m : (l.splice(a, 3),
                    a -= 3),
                    hh(l)
                }
            }
    }
    function mh() {
        function e(i) {
            i.canIntercept && i.info === "react-transition" && i.intercept({
                handler: function() {
                    return new Promise(function(f) {
                        return n = f
                    }
                    )
                },
                focusReset: "manual",
                scroll: "manual"
            })
        }
        function t() {
            n !== null && (n(),
            n = null),
            a || setTimeout(l, 20)
        }
        function l() {
            if (!a && !navigation.transition) {
                var i = navigation.currentEntry;
                i && i.url != null && navigation.navigate(i.url, {
                    state: i.getState(),
                    info: "react-transition",
                    history: "replace"
                })
            }
        }
        if (typeof navigation == "object") {
            var a = !1
              , n = null;
            return navigation.addEventListener("navigate", e),
            navigation.addEventListener("navigatesuccess", t),
            navigation.addEventListener("navigateerror", t),
            setTimeout(l, 100),
            function() {
                a = !0,
                navigation.removeEventListener("navigate", e),
                navigation.removeEventListener("navigatesuccess", t),
                navigation.removeEventListener("navigateerror", t),
                n !== null && (n(),
                n = null)
            }
        }
    }
    function Kc(e) {
        this._internalRoot = e
    }
    hu.prototype.render = Kc.prototype.render = function(e) {
        var t = this._internalRoot;
        if (t === null)
            throw Error(r(409));
        var l = t.current
          , a = bt();
        ih(l, a, e, t, null, null)
    }
    ,
    hu.prototype.unmount = Kc.prototype.unmount = function() {
        var e = this._internalRoot;
        if (e !== null) {
            this._internalRoot = null;
            var t = e.containerInfo;
            ih(e.current, 2, null, e, null, null),
            Ji(),
            t[la] = null
        }
    }
    ;
    function hu(e) {
        this._internalRoot = e
    }
    hu.prototype.unstable_scheduleHydration = function(e) {
        if (e) {
            var t = Er();
            e = {
                blockedOn: null,
                target: e,
                priority: t
            };
            for (var l = 0; l < Ll.length && t !== 0 && t < Ll[l].priority; l++)
                ;
            Ll.splice(l, 0, e),
            l === 0 && fh(e)
        }
    }
    ;
    var gh = u.version;
    if (gh !== "19.2.3")
        throw Error(r(527, gh, "19.2.3"));
    Y.findDOMNode = function(e) {
        var t = e._reactInternals;
        if (t === void 0)
            throw typeof e.render == "function" ? Error(r(188)) : (e = Object.keys(e).join(","),
            Error(r(268, e)));
        return e = g(t),
        e = e !== null ? E(e) : null,
        e = e === null ? null : e.stateNode,
        e
    }
    ;
    var Wp = {
        bundleType: 0,
        version: "19.2.3",
        rendererPackageName: "react-dom",
        currentDispatcherRef: N,
        reconcilerVersion: "19.2.3"
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
        var mu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!mu.isDisabled && mu.supportsFiber)
            try {
                Za = mu.inject(Wp),
                dt = mu
            } catch {}
    }
    return Yn.createRoot = function(e, t) {
        if (!o(e))
            throw Error(r(299));
        var l = !1
          , a = ""
          , n = Ef
          , i = Of
          , f = Tf;
        return t != null && (t.unstable_strictMode === !0 && (l = !0),
        t.identifierPrefix !== void 0 && (a = t.identifierPrefix),
        t.onUncaughtError !== void 0 && (n = t.onUncaughtError),
        t.onCaughtError !== void 0 && (i = t.onCaughtError),
        t.onRecoverableError !== void 0 && (f = t.onRecoverableError)),
        t = ah(e, 1, !1, null, null, l, a, null, n, i, f, mh),
        e[la] = t.current,
        zc(e),
        new Kc(t)
    }
    ,
    Yn.hydrateRoot = function(e, t, l) {
        if (!o(e))
            throw Error(r(299));
        var a = !1
          , n = ""
          , i = Ef
          , f = Of
          , m = Tf
          , S = null;
        return l != null && (l.unstable_strictMode === !0 && (a = !0),
        l.identifierPrefix !== void 0 && (n = l.identifierPrefix),
        l.onUncaughtError !== void 0 && (i = l.onUncaughtError),
        l.onCaughtError !== void 0 && (f = l.onCaughtError),
        l.onRecoverableError !== void 0 && (m = l.onRecoverableError),
        l.formState !== void 0 && (S = l.formState)),
        t = ah(e, 1, !0, t, l ?? null, a, n, S, i, f, m, mh),
        t.context = nh(null),
        l = t.current,
        a = bt(),
        a = wu(a),
        n = Sl(a),
        n.callback = null,
        bl(l, n, a),
        l = a,
        t.current.lanes = l,
        Ja(t, l),
        Gt(t),
        e[la] = t.current,
        zc(e),
        new hu(t)
    }
    ,
    Yn.version = "19.2.3",
    Yn
}
var $h;
function e0() {
    if ($h)
        return Wc.exports;
    $h = 1;
    function c() {
        if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
            try {
                __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c)
            } catch (u) {
                console.error(u)
            }
    }
    return c(),
    Wc.exports = Iy(),
    Wc.exports
}
var t0 = e0();
var kh = "popstate";
function l0(c={}) {
    function u(r, o) {
        let {pathname: d, search: h, hash: p} = r.location;
        return ur("", {
            pathname: d,
            search: h,
            hash: p
        }, o.state && o.state.usr || null, o.state && o.state.key || "default")
    }
    function s(r, o) {
        return typeof o == "string" ? o : Jn(o)
    }
    return n0(u, s, null, c)
}
function Ge(c, u) {
    if (c === !1 || c === null || typeof c > "u")
        throw new Error(u)
}
function Ht(c, u) {
    if (!c) {
        typeof console < "u" && console.warn(u);
        try {
            throw new Error(u)
        } catch {}
    }
}
function a0() {
    return Math.random().toString(36).substring(2, 10)
}
function Fh(c, u) {
    return {
        usr: c.state,
        key: c.key,
        idx: u
    }
}
function ur(c, u, s=null, r) {
    return {
        pathname: typeof c == "string" ? c : c.pathname,
        search: "",
        hash: "",
        ...typeof u == "string" ? $n(u) : u,
        state: s,
        key: u && u.key || r || a0()
    }
}
function Jn({pathname: c="/", search: u="", hash: s=""}) {
    return u && u !== "?" && (c += u.charAt(0) === "?" ? u : "?" + u),
    s && s !== "#" && (c += s.charAt(0) === "#" ? s : "#" + s),
    c
}
function $n(c) {
    let u = {};
    if (c) {
        let s = c.indexOf("#");
        s >= 0 && (u.hash = c.substring(s),
        c = c.substring(0, s));
        let r = c.indexOf("?");
        r >= 0 && (u.search = c.substring(r),
        c = c.substring(0, r)),
        c && (u.pathname = c)
    }
    return u
}
function n0(c, u, s, r={}) {
    let {window: o=document.defaultView, v5Compat: d=!1} = r
      , h = o.history
      , p = "POP"
      , y = null
      , g = E();
    g == null && (g = 0,
    h.replaceState({
        ...h.state,
        idx: g
    }, ""));
    function E() {
        return (h.state || {
            idx: null
        }).idx
    }
    function v() {
        p = "POP";
        let q = E()
          , Z = q == null ? null : q - g;
        g = q,
        y && y({
            action: p,
            location: B.location,
            delta: Z
        })
    }
    function T(q, Z) {
        p = "PUSH";
        let V = ur(B.location, q, Z);
        g = E() + 1;
        let J = Fh(V, g)
          , ae = B.createHref(V);
        try {
            h.pushState(J, "", ae)
        } catch (re) {
            if (re instanceof DOMException && re.name === "DataCloneError")
                throw re;
            o.location.assign(ae)
        }
        d && y && y({
            action: p,
            location: B.location,
            delta: 1
        })
    }
    function C(q, Z) {
        p = "REPLACE";
        let V = ur(B.location, q, Z);
        g = E();
        let J = Fh(V, g)
          , ae = B.createHref(V);
        h.replaceState(J, "", ae),
        d && y && y({
            action: p,
            location: B.location,
            delta: 0
        })
    }
    function w(q) {
        return i0(q)
    }
    let B = {
        get action() {
            return p
        },
        get location() {
            return c(o, h)
        },
        listen(q) {
            if (y)
                throw new Error("A history only accepts one active listener");
            return o.addEventListener(kh, v),
            y = q,
            () => {
                o.removeEventListener(kh, v),
                y = null
            }
        },
        createHref(q) {
            return u(o, q)
        },
        createURL: w,
        encodeLocation(q) {
            let Z = w(q);
            return {
                pathname: Z.pathname,
                search: Z.search,
                hash: Z.hash
            }
        },
        push: T,
        replace: C,
        go(q) {
            return h.go(q)
        }
    };
    return B
}
function i0(c, u=!1) {
    let s = "http://localhost";
    typeof window < "u" && (s = window.location.origin !== "null" ? window.location.origin : window.location.href),
    Ge(s, "No window.location.(origin|href) available to create URL");
    let r = typeof c == "string" ? c : Jn(c);
    return r = r.replace(/ $/, "%20"),
    !u && r.startsWith("//") && (r = s + r),
    new URL(r,s)
}
function cm(c, u, s="/") {
    return u0(c, u, s, !1)
}
function u0(c, u, s, r) {
    let o = typeof u == "string" ? $n(u) : u
      , d = rl(o.pathname || "/", s);
    if (d == null)
        return null;
    let h = rm(c);
    s0(h);
    let p = null;
    for (let y = 0; p == null && y < h.length; ++y) {
        let g = v0(d);
        p = p0(h[y], g, r)
    }
    return p
}
function rm(c, u=[], s=[], r="", o=!1) {
    let d = (h, p, y=o, g) => {
        let E = {
            relativePath: g === void 0 ? h.path || "" : g,
            caseSensitive: h.caseSensitive === !0,
            childrenIndex: p,
            route: h
        };
        if (E.relativePath.startsWith("/")) {
            if (!E.relativePath.startsWith(r) && y)
                return;
            Ge(E.relativePath.startsWith(r), `Absolute route path "${E.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),
            E.relativePath = E.relativePath.slice(r.length)
        }
        let v = cl([r, E.relativePath])
          , T = s.concat(E);
        h.children && h.children.length > 0 && (Ge(h.index !== !0, `Index routes must not have child routes. Please remove all child routes from route path "${v}".`),
        rm(h.children, u, T, v, y)),
        !(h.path == null && !h.index) && u.push({
            path: v,
            score: m0(v, h.index),
            routesMeta: T
        })
    }
    ;
    return c.forEach( (h, p) => {
        if (h.path === "" || !h.path?.includes("?"))
            d(h, p);
        else
            for (let y of om(h.path))
                d(h, p, !0, y)
    }
    ),
    u
}
function om(c) {
    let u = c.split("/");
    if (u.length === 0)
        return [];
    let[s,...r] = u
      , o = s.endsWith("?")
      , d = s.replace(/\?$/, "");
    if (r.length === 0)
        return o ? [d, ""] : [d];
    let h = om(r.join("/"))
      , p = [];
    return p.push(...h.map(y => y === "" ? d : [d, y].join("/"))),
    o && p.push(...h),
    p.map(y => c.startsWith("/") && y === "" ? "/" : y)
}
function s0(c) {
    c.sort( (u, s) => u.score !== s.score ? s.score - u.score : g0(u.routesMeta.map(r => r.childrenIndex), s.routesMeta.map(r => r.childrenIndex)))
}
var c0 = /^:[\w-]+$/
  , r0 = 3
  , o0 = 2
  , f0 = 1
  , d0 = 10
  , h0 = -2
  , Wh = c => c === "*";
function m0(c, u) {
    let s = c.split("/")
      , r = s.length;
    return s.some(Wh) && (r += h0),
    u && (r += o0),
    s.filter(o => !Wh(o)).reduce( (o, d) => o + (c0.test(d) ? r0 : d === "" ? f0 : d0), r)
}
function g0(c, u) {
    return c.length === u.length && c.slice(0, -1).every( (r, o) => r === u[o]) ? c[c.length - 1] - u[u.length - 1] : 0
}
function p0(c, u, s=!1) {
    let {routesMeta: r} = c
      , o = {}
      , d = "/"
      , h = [];
    for (let p = 0; p < r.length; ++p) {
        let y = r[p]
          , g = p === r.length - 1
          , E = d === "/" ? u : u.slice(d.length) || "/"
          , v = Tu({
            path: y.relativePath,
            caseSensitive: y.caseSensitive,
            end: g
        }, E)
          , T = y.route;
        if (!v && g && s && !r[r.length - 1].route.index && (v = Tu({
            path: y.relativePath,
            caseSensitive: y.caseSensitive,
            end: !1
        }, E)),
        !v)
            return null;
        Object.assign(o, v.params),
        h.push({
            params: o,
            pathname: cl([d, v.pathname]),
            pathnameBase: E0(cl([d, v.pathnameBase])),
            route: T
        }),
        v.pathnameBase !== "/" && (d = cl([d, v.pathnameBase]))
    }
    return h
}
function Tu(c, u) {
    typeof c == "string" && (c = {
        path: c,
        caseSensitive: !1,
        end: !0
    });
    let[s,r] = y0(c.path, c.caseSensitive, c.end)
      , o = u.match(s);
    if (!o)
        return null;
    let d = o[0]
      , h = d.replace(/(.)\/+$/, "$1")
      , p = o.slice(1);
    return {
        params: r.reduce( (g, {paramName: E, isOptional: v}, T) => {
            if (E === "*") {
                let w = p[T] || "";
                h = d.slice(0, d.length - w.length).replace(/(.)\/+$/, "$1")
            }
            const C = p[T];
            return v && !C ? g[E] = void 0 : g[E] = (C || "").replace(/%2F/g, "/"),
            g
        }
        , {}),
        pathname: d,
        pathnameBase: h,
        pattern: c
    }
}
function y0(c, u=!1, s=!0) {
    Ht(c === "*" || !c.endsWith("*") || c.endsWith("/*"), `Route path "${c}" will be treated as if it were "${c.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${c.replace(/\*$/, "/*")}".`);
    let r = []
      , o = "^" + c.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (h, p, y) => (r.push({
        paramName: p,
        isOptional: y != null
    }),
    y ? "/?([^\\/]+)?" : "/([^\\/]+)")).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
    return c.endsWith("*") ? (r.push({
        paramName: "*"
    }),
    o += c === "*" || c === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : s ? o += "\\/*$" : c !== "" && c !== "/" && (o += "(?:(?=\\/|$))"),
    [new RegExp(o,u ? void 0 : "i"), r]
}
function v0(c) {
    try {
        return c.split("/").map(u => decodeURIComponent(u).replace(/\//g, "%2F")).join("/")
    } catch (u) {
        return Ht(!1, `The URL path "${c}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${u}).`),
        c
    }
}
function rl(c, u) {
    if (u === "/")
        return c;
    if (!c.toLowerCase().startsWith(u.toLowerCase()))
        return null;
    let s = u.endsWith("/") ? u.length - 1 : u.length
      , r = c.charAt(s);
    return r && r !== "/" ? null : c.slice(s) || "/"
}
var fm = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i
  , S0 = c => fm.test(c);
function b0(c, u="/") {
    let {pathname: s, search: r="", hash: o=""} = typeof c == "string" ? $n(c) : c, d;
    if (s)
        if (S0(s))
            d = s;
        else {
            if (s.includes("//")) {
                let h = s;
                s = s.replace(/\/\/+/g, "/"),
                Ht(!1, `Pathnames cannot have embedded double slashes - normalizing ${h} -> ${s}`)
            }
            s.startsWith("/") ? d = Ph(s.substring(1), "/") : d = Ph(s, u)
        }
    else
        d = u;
    return {
        pathname: d,
        search: O0(r),
        hash: T0(o)
    }
}
function Ph(c, u) {
    let s = u.replace(/\/+$/, "").split("/");
    return c.split("/").forEach(o => {
        o === ".." ? s.length > 1 && s.pop() : o !== "." && s.push(o)
    }
    ),
    s.length > 1 ? s.join("/") : "/"
}
function tr(c, u, s, r) {
    return `Cannot include a '${c}' character in a manually specified \`to.${u}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${s}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`
}
function x0(c) {
    return c.filter( (u, s) => s === 0 || u.route.path && u.route.path.length > 0)
}
function dm(c) {
    let u = x0(c);
    return u.map( (s, r) => r === u.length - 1 ? s.pathname : s.pathnameBase)
}
function hm(c, u, s, r=!1) {
    let o;
    typeof c == "string" ? o = $n(c) : (o = {
        ...c
    },
    Ge(!o.pathname || !o.pathname.includes("?"), tr("?", "pathname", "search", o)),
    Ge(!o.pathname || !o.pathname.includes("#"), tr("#", "pathname", "hash", o)),
    Ge(!o.search || !o.search.includes("#"), tr("#", "search", "hash", o)));
    let d = c === "" || o.pathname === "", h = d ? "/" : o.pathname, p;
    if (h == null)
        p = s;
    else {
        let v = u.length - 1;
        if (!r && h.startsWith("..")) {
            let T = h.split("/");
            for (; T[0] === ".."; )
                T.shift(),
                v -= 1;
            o.pathname = T.join("/")
        }
        p = v >= 0 ? u[v] : "/"
    }
    let y = b0(o, p)
      , g = h && h !== "/" && h.endsWith("/")
      , E = (d || h === ".") && s.endsWith("/");
    return !y.pathname.endsWith("/") && (g || E) && (y.pathname += "/"),
    y
}
var cl = c => c.join("/").replace(/\/\/+/g, "/")
  , E0 = c => c.replace(/\/+$/, "").replace(/^\/*/, "/")
  , O0 = c => !c || c === "?" ? "" : c.startsWith("?") ? c : "?" + c
  , T0 = c => !c || c === "#" ? "" : c.startsWith("#") ? c : "#" + c
  , R0 = class {
    constructor(c, u, s, r=!1) {
        this.status = c,
        this.statusText = u || "",
        this.internal = r,
        s instanceof Error ? (this.data = s.toString(),
        this.error = s) : this.data = s
    }
}
;
function A0(c) {
    return c != null && typeof c.status == "number" && typeof c.statusText == "string" && typeof c.internal == "boolean" && "data"in c
}
function z0(c) {
    return c.map(u => u.route.path).filter(Boolean).join("/").replace(/\/\/*/g, "/") || "/"
}
var mm = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function gm(c, u) {
    let s = c;
    if (typeof s != "string" || !fm.test(s))
        return {
            absoluteURL: void 0,
            isExternal: !1,
            to: s
        };
    let r = s
      , o = !1;
    if (mm)
        try {
            let d = new URL(window.location.href)
              , h = s.startsWith("//") ? new URL(d.protocol + s) : new URL(s)
              , p = rl(h.pathname, u);
            h.origin === d.origin && p != null ? s = p + h.search + h.hash : o = !0
        } catch {
            Ht(!1, `<Link to="${s}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)
        }
    return {
        absoluteURL: r,
        isExternal: o,
        to: s
    }
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var pm = ["POST", "PUT", "PATCH", "DELETE"];
new Set(pm);
var _0 = ["GET", ...pm];
new Set(_0);
var Qa = D.createContext(null);
Qa.displayName = "DataRouter";
var Au = D.createContext(null);
Au.displayName = "DataRouterState";
var C0 = D.createContext(!1)
  , ym = D.createContext({
    isTransitioning: !1
});
ym.displayName = "ViewTransition";
var N0 = D.createContext(new Map);
N0.displayName = "Fetchers";
var D0 = D.createContext(null);
D0.displayName = "Await";
var Mt = D.createContext(null);
Mt.displayName = "Navigation";
var zu = D.createContext(null);
zu.displayName = "Location";
var ol = D.createContext({
    outlet: null,
    matches: [],
    isDataRoute: !1
});
ol.displayName = "Route";
var cr = D.createContext(null);
cr.displayName = "RouteError";
var vm = "REACT_ROUTER_ERROR"
  , M0 = "REDIRECT"
  , U0 = "ROUTE_ERROR_RESPONSE";
function L0(c) {
    if (c.startsWith(`${vm}:${M0}:{`))
        try {
            let u = JSON.parse(c.slice(28));
            if (typeof u == "object" && u && typeof u.status == "number" && typeof u.statusText == "string" && typeof u.location == "string" && typeof u.reloadDocument == "boolean" && typeof u.replace == "boolean")
                return u
        } catch {}
}
function j0(c) {
    if (c.startsWith(`${vm}:${U0}:{`))
        try {
            let u = JSON.parse(c.slice(40));
            if (typeof u == "object" && u && typeof u.status == "number" && typeof u.statusText == "string")
                return new R0(u.status,u.statusText,u.data)
        } catch {}
}
function w0(c, {relative: u}={}) {
    Ge(kn(), "useHref() may be used only in the context of a <Router> component.");
    let {basename: s, navigator: r} = D.useContext(Mt)
      , {hash: o, pathname: d, search: h} = Fn(c, {
        relative: u
    })
      , p = d;
    return s !== "/" && (p = d === "/" ? s : cl([s, d])),
    r.createHref({
        pathname: p,
        search: h,
        hash: o
    })
}
function kn() {
    return D.useContext(zu) != null
}
function wl() {
    return Ge(kn(), "useLocation() may be used only in the context of a <Router> component."),
    D.useContext(zu).location
}
var Sm = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function bm(c) {
    D.useContext(Mt).static || D.useLayoutEffect(c)
}
function xm() {
    let {isDataRoute: c} = D.useContext(ol);
    return c ? k0() : H0()
}
function H0() {
    Ge(kn(), "useNavigate() may be used only in the context of a <Router> component.");
    let c = D.useContext(Qa)
      , {basename: u, navigator: s} = D.useContext(Mt)
      , {matches: r} = D.useContext(ol)
      , {pathname: o} = wl()
      , d = JSON.stringify(dm(r))
      , h = D.useRef(!1);
    return bm( () => {
        h.current = !0
    }
    ),
    D.useCallback( (y, g={}) => {
        if (Ht(h.current, Sm),
        !h.current)
            return;
        if (typeof y == "number") {
            s.go(y);
            return
        }
        let E = hm(y, JSON.parse(d), o, g.relative === "path");
        c == null && u !== "/" && (E.pathname = E.pathname === "/" ? u : cl([u, E.pathname])),
        (g.replace ? s.replace : s.push)(E, g.state, g)
    }
    , [u, s, d, o, c])
}
D.createContext(null);
function Fn(c, {relative: u}={}) {
    let {matches: s} = D.useContext(ol)
      , {pathname: r} = wl()
      , o = JSON.stringify(dm(s));
    return D.useMemo( () => hm(c, JSON.parse(o), r, u === "path"), [c, o, r, u])
}
function B0(c, u) {
    return Em(c)
}
function Em(c, u, s, r, o) {
    Ge(kn(), "useRoutes() may be used only in the context of a <Router> component.");
    let {navigator: d} = D.useContext(Mt)
      , {matches: h} = D.useContext(ol)
      , p = h[h.length - 1]
      , y = p ? p.params : {}
      , g = p ? p.pathname : "/"
      , E = p ? p.pathnameBase : "/"
      , v = p && p.route;
    {
        let V = v && v.path || "";
        Tm(g, !v || V.endsWith("*") || V.endsWith("*?"), `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${g}" (under <Route path="${V}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${V}"> to <Route path="${V === "/" ? "*" : `${V}/*`}">.`)
    }
    let T = wl(), C;
    C = T;
    let w = C.pathname || "/"
      , B = w;
    if (E !== "/") {
        let V = E.replace(/^\//, "").split("/");
        B = "/" + w.replace(/^\//, "").split("/").slice(V.length).join("/")
    }
    let q = cm(c, {
        pathname: B
    });
    return Ht(v || q != null, `No routes matched location "${C.pathname}${C.search}${C.hash}" `),
    Ht(q == null || q[q.length - 1].route.element !== void 0 || q[q.length - 1].route.Component !== void 0 || q[q.length - 1].route.lazy !== void 0, `Matched leaf route at location "${C.pathname}${C.search}${C.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`),
    Q0(q && q.map(V => Object.assign({}, V, {
        params: Object.assign({}, y, V.params),
        pathname: cl([E, d.encodeLocation ? d.encodeLocation(V.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23")).pathname : V.pathname]),
        pathnameBase: V.pathnameBase === "/" ? E : cl([E, d.encodeLocation ? d.encodeLocation(V.pathnameBase.replace(/\?/g, "%3F").replace(/#/g, "%23")).pathname : V.pathnameBase])
    })), h, s, r, o)
}
function q0() {
    let c = $0()
      , u = A0(c) ? `${c.status} ${c.statusText}` : c instanceof Error ? c.message : JSON.stringify(c)
      , s = c instanceof Error ? c.stack : null
      , r = "rgba(200,200,200, 0.5)"
      , o = {
        padding: "0.5rem",
        backgroundColor: r
    }
      , d = {
        padding: "2px 4px",
        backgroundColor: r
    }
      , h = null;
    return console.error("Error handled by React Router default ErrorBoundary:", c),
    h = D.createElement(D.Fragment, null, D.createElement("p", null, "💿 Hey developer 👋"), D.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", D.createElement("code", {
        style: d
    }, "ErrorBoundary"), " or", " ", D.createElement("code", {
        style: d
    }, "errorElement"), " prop on your route.")),
    D.createElement(D.Fragment, null, D.createElement("h2", null, "Unexpected Application Error!"), D.createElement("h3", {
        style: {
            fontStyle: "italic"
        }
    }, u), s ? D.createElement("pre", {
        style: o
    }, s) : null, h)
}
var Y0 = D.createElement(q0, null)
  , Om = class extends D.Component {
    constructor(c) {
        super(c),
        this.state = {
            location: c.location,
            revalidation: c.revalidation,
            error: c.error
        }
    }
    static getDerivedStateFromError(c) {
        return {
            error: c
        }
    }
    static getDerivedStateFromProps(c, u) {
        return u.location !== c.location || u.revalidation !== "idle" && c.revalidation === "idle" ? {
            error: c.error,
            location: c.location,
            revalidation: c.revalidation
        } : {
            error: c.error !== void 0 ? c.error : u.error,
            location: u.location,
            revalidation: c.revalidation || u.revalidation
        }
    }
    componentDidCatch(c, u) {
        this.props.onError ? this.props.onError(c, u) : console.error("React Router caught the following error during render", c)
    }
    render() {
        let c = this.state.error;
        if (this.context && typeof c == "object" && c && "digest"in c && typeof c.digest == "string") {
            const s = j0(c.digest);
            s && (c = s)
        }
        let u = c !== void 0 ? D.createElement(ol.Provider, {
            value: this.props.routeContext
        }, D.createElement(cr.Provider, {
            value: c,
            children: this.props.component
        })) : this.props.children;
        return this.context ? D.createElement(G0, {
            error: c
        }, u) : u
    }
}
;
Om.contextType = C0;
var lr = new WeakMap;
function G0({children: c, error: u}) {
    let {basename: s} = D.useContext(Mt);
    if (typeof u == "object" && u && "digest"in u && typeof u.digest == "string") {
        let r = L0(u.digest);
        if (r) {
            let o = lr.get(u);
            if (o)
                throw o;
            let d = gm(r.location, s);
            if (mm && !lr.get(u))
                if (d.isExternal || r.reloadDocument)
                    window.location.href = d.absoluteURL || d.to;
                else {
                    const h = Promise.resolve().then( () => window.__reactRouterDataRouter.navigate(d.to, {
                        replace: r.replace
                    }));
                    throw lr.set(u, h),
                    h
                }
            return D.createElement("meta", {
                httpEquiv: "refresh",
                content: `0;url=${d.absoluteURL || d.to}`
            })
        }
    }
    return c
}
function V0({routeContext: c, match: u, children: s}) {
    let r = D.useContext(Qa);
    return r && r.static && r.staticContext && (u.route.errorElement || u.route.ErrorBoundary) && (r.staticContext._deepestRenderedBoundaryId = u.route.id),
    D.createElement(ol.Provider, {
        value: c
    }, s)
}
function Q0(c, u=[], s=null, r=null, o=null) {
    if (c == null) {
        if (!s)
            return null;
        if (s.errors)
            c = s.matches;
        else if (u.length === 0 && !s.initialized && s.matches.length > 0)
            c = s.matches;
        else
            return null
    }
    let d = c
      , h = s?.errors;
    if (h != null) {
        let E = d.findIndex(v => v.route.id && h?.[v.route.id] !== void 0);
        Ge(E >= 0, `Could not find a matching route for errors on route IDs: ${Object.keys(h).join(",")}`),
        d = d.slice(0, Math.min(d.length, E + 1))
    }
    let p = !1
      , y = -1;
    if (s)
        for (let E = 0; E < d.length; E++) {
            let v = d[E];
            if ((v.route.HydrateFallback || v.route.hydrateFallbackElement) && (y = E),
            v.route.id) {
                let {loaderData: T, errors: C} = s
                  , w = v.route.loader && !T.hasOwnProperty(v.route.id) && (!C || C[v.route.id] === void 0);
                if (v.route.lazy || w) {
                    p = !0,
                    y >= 0 ? d = d.slice(0, y + 1) : d = [d[0]];
                    break
                }
            }
        }
    let g = s && r ? (E, v) => {
        r(E, {
            location: s.location,
            params: s.matches?.[0]?.params ?? {},
            unstable_pattern: z0(s.matches),
            errorInfo: v
        })
    }
    : void 0;
    return d.reduceRight( (E, v, T) => {
        let C, w = !1, B = null, q = null;
        s && (C = h && v.route.id ? h[v.route.id] : void 0,
        B = v.route.errorElement || Y0,
        p && (y < 0 && T === 0 ? (Tm("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"),
        w = !0,
        q = null) : y === T && (w = !0,
        q = v.route.hydrateFallbackElement || null)));
        let Z = u.concat(d.slice(0, T + 1))
          , V = () => {
            let J;
            return C ? J = B : w ? J = q : v.route.Component ? J = D.createElement(v.route.Component, null) : v.route.element ? J = v.route.element : J = E,
            D.createElement(V0, {
                match: v,
                routeContext: {
                    outlet: E,
                    matches: Z,
                    isDataRoute: s != null
                },
                children: J
            })
        }
        ;
        return s && (v.route.ErrorBoundary || v.route.errorElement || T === 0) ? D.createElement(Om, {
            location: s.location,
            revalidation: s.revalidation,
            component: B,
            error: C,
            children: V(),
            routeContext: {
                outlet: null,
                matches: Z,
                isDataRoute: !0
            },
            onError: g
        }) : V()
    }
    , null)
}
function rr(c) {
    return `${c} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`
}
function X0(c) {
    let u = D.useContext(Qa);
    return Ge(u, rr(c)),
    u
}
function Z0(c) {
    let u = D.useContext(Au);
    return Ge(u, rr(c)),
    u
}
function K0(c) {
    let u = D.useContext(ol);
    return Ge(u, rr(c)),
    u
}
function or(c) {
    let u = K0(c)
      , s = u.matches[u.matches.length - 1];
    return Ge(s.route.id, `${c} can only be used on routes that contain a unique "id"`),
    s.route.id
}
function J0() {
    return or("useRouteId")
}
function $0() {
    let c = D.useContext(cr)
      , u = Z0("useRouteError")
      , s = or("useRouteError");
    return c !== void 0 ? c : u.errors?.[s]
}
function k0() {
    let {router: c} = X0("useNavigate")
      , u = or("useNavigate")
      , s = D.useRef(!1);
    return bm( () => {
        s.current = !0
    }
    ),
    D.useCallback(async (o, d={}) => {
        Ht(s.current, Sm),
        s.current && (typeof o == "number" ? await c.navigate(o) : await c.navigate(o, {
            fromRouteId: u,
            ...d
        }))
    }
    , [c, u])
}
var Ih = {};
function Tm(c, u, s) {
    !u && !Ih[c] && (Ih[c] = !0,
    Ht(!1, s))
}
D.memo(F0);
function F0({routes: c, future: u, state: s, onError: r}) {
    return Em(c, void 0, s, r, u)
}
function W0({basename: c="/", children: u=null, location: s, navigationType: r="POP", navigator: o, static: d=!1, unstable_useTransitions: h}) {
    Ge(!kn(), "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
    let p = c.replace(/^\/*/, "/")
      , y = D.useMemo( () => ({
        basename: p,
        navigator: o,
        static: d,
        unstable_useTransitions: h,
        future: {}
    }), [p, o, d, h]);
    typeof s == "string" && (s = $n(s));
    let {pathname: g="/", search: E="", hash: v="", state: T=null, key: C="default"} = s
      , w = D.useMemo( () => {
        let B = rl(g, p);
        return B == null ? null : {
            location: {
                pathname: B,
                search: E,
                hash: v,
                state: T,
                key: C
            },
            navigationType: r
        }
    }
    , [p, g, E, v, T, C, r]);
    return Ht(w != null, `<Router basename="${p}"> is not able to match the URL "${g}${E}${v}" because it does not start with the basename, so the <Router> won't render anything.`),
    w == null ? null : D.createElement(Mt.Provider, {
        value: y
    }, D.createElement(zu.Provider, {
        children: u,
        value: w
    }))
}
var Su = "get"
  , bu = "application/x-www-form-urlencoded";
function _u(c) {
    return typeof HTMLElement < "u" && c instanceof HTMLElement
}
function P0(c) {
    return _u(c) && c.tagName.toLowerCase() === "button"
}
function I0(c) {
    return _u(c) && c.tagName.toLowerCase() === "form"
}
function ev(c) {
    return _u(c) && c.tagName.toLowerCase() === "input"
}
function tv(c) {
    return !!(c.metaKey || c.altKey || c.ctrlKey || c.shiftKey)
}
function lv(c, u) {
    return c.button === 0 && (!u || u === "_self") && !tv(c)
}
var vu = null;
function av() {
    if (vu === null)
        try {
            new FormData(document.createElement("form"),0),
            vu = !1
        } catch {
            vu = !0
        }
    return vu
}
var nv = new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function ar(c) {
    return c != null && !nv.has(c) ? (Ht(!1, `"${c}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${bu}"`),
    null) : c
}
function iv(c, u) {
    let s, r, o, d, h;
    if (I0(c)) {
        let p = c.getAttribute("action");
        r = p ? rl(p, u) : null,
        s = c.getAttribute("method") || Su,
        o = ar(c.getAttribute("enctype")) || bu,
        d = new FormData(c)
    } else if (P0(c) || ev(c) && (c.type === "submit" || c.type === "image")) {
        let p = c.form;
        if (p == null)
            throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
        let y = c.getAttribute("formaction") || p.getAttribute("action");
        if (r = y ? rl(y, u) : null,
        s = c.getAttribute("formmethod") || p.getAttribute("method") || Su,
        o = ar(c.getAttribute("formenctype")) || ar(p.getAttribute("enctype")) || bu,
        d = new FormData(p,c),
        !av()) {
            let {name: g, type: E, value: v} = c;
            if (E === "image") {
                let T = g ? `${g}.` : "";
                d.append(`${T}x`, "0"),
                d.append(`${T}y`, "0")
            } else
                g && d.append(g, v)
        }
    } else {
        if (_u(c))
            throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
        s = Su,
        r = null,
        o = bu,
        h = c
    }
    return d && o === "text/plain" && (h = d,
    d = void 0),
    {
        action: r,
        method: s.toLowerCase(),
        encType: o,
        formData: d,
        body: h
    }
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function fr(c, u) {
    if (c === !1 || c === null || typeof c > "u")
        throw new Error(u)
}
function uv(c, u, s, r) {
    let o = typeof c == "string" ? new URL(c,typeof window > "u" ? "server://singlefetch/" : window.location.origin) : c;
    return s ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${r}` : o.pathname = `${o.pathname}.${r}` : o.pathname === "/" ? o.pathname = `_root.${r}` : u && rl(o.pathname, u) === "/" ? o.pathname = `${u.replace(/\/$/, "")}/_root.${r}` : o.pathname = `${o.pathname.replace(/\/$/, "")}.${r}`,
    o
}
async function sv(c, u) {
    if (c.id in u)
        return u[c.id];
    try {
        let s = await import(c.module);
        return u[c.id] = s,
        s
    } catch (s) {
        return console.error(`Error loading route module \`${c.module}\`, reloading page...`),
        console.error(s),
        window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
        window.location.reload(),
        new Promise( () => {}
        )
    }
}
function cv(c) {
    return c == null ? !1 : c.href == null ? c.rel === "preload" && typeof c.imageSrcSet == "string" && typeof c.imageSizes == "string" : typeof c.rel == "string" && typeof c.href == "string"
}
async function rv(c, u, s) {
    let r = await Promise.all(c.map(async o => {
        let d = u.routes[o.route.id];
        if (d) {
            let h = await sv(d, s);
            return h.links ? h.links() : []
        }
        return []
    }
    ));
    return hv(r.flat(1).filter(cv).filter(o => o.rel === "stylesheet" || o.rel === "preload").map(o => o.rel === "stylesheet" ? {
        ...o,
        rel: "prefetch",
        as: "style"
    } : {
        ...o,
        rel: "prefetch"
    }))
}
function em(c, u, s, r, o, d) {
    let h = (y, g) => s[g] ? y.route.id !== s[g].route.id : !0
      , p = (y, g) => s[g].pathname !== y.pathname || s[g].route.path?.endsWith("*") && s[g].params["*"] !== y.params["*"];
    return d === "assets" ? u.filter( (y, g) => h(y, g) || p(y, g)) : d === "data" ? u.filter( (y, g) => {
        let E = r.routes[y.route.id];
        if (!E || !E.hasLoader)
            return !1;
        if (h(y, g) || p(y, g))
            return !0;
        if (y.route.shouldRevalidate) {
            let v = y.route.shouldRevalidate({
                currentUrl: new URL(o.pathname + o.search + o.hash,window.origin),
                currentParams: s[0]?.params || {},
                nextUrl: new URL(c,window.origin),
                nextParams: y.params,
                defaultShouldRevalidate: !0
            });
            if (typeof v == "boolean")
                return v
        }
        return !0
    }
    ) : []
}
function ov(c, u, {includeHydrateFallback: s}={}) {
    return fv(c.map(r => {
        let o = u.routes[r.route.id];
        if (!o)
            return [];
        let d = [o.module];
        return o.clientActionModule && (d = d.concat(o.clientActionModule)),
        o.clientLoaderModule && (d = d.concat(o.clientLoaderModule)),
        s && o.hydrateFallbackModule && (d = d.concat(o.hydrateFallbackModule)),
        o.imports && (d = d.concat(o.imports)),
        d
    }
    ).flat(1))
}
function fv(c) {
    return [...new Set(c)]
}
function dv(c) {
    let u = {}
      , s = Object.keys(c).sort();
    for (let r of s)
        u[r] = c[r];
    return u
}
function hv(c, u) {
    let s = new Set;
    return new Set(u),
    c.reduce( (r, o) => {
        let d = JSON.stringify(dv(o));
        return s.has(d) || (s.add(d),
        r.push({
            key: d,
            link: o
        })),
        r
    }
    , [])
}
function Rm() {
    let c = D.useContext(Qa);
    return fr(c, "You must render this element inside a <DataRouterContext.Provider> element"),
    c
}
function mv() {
    let c = D.useContext(Au);
    return fr(c, "You must render this element inside a <DataRouterStateContext.Provider> element"),
    c
}
var dr = D.createContext(void 0);
dr.displayName = "FrameworkContext";
function Am() {
    let c = D.useContext(dr);
    return fr(c, "You must render this element inside a <HydratedRouter> element"),
    c
}
function gv(c, u) {
    let s = D.useContext(dr)
      , [r,o] = D.useState(!1)
      , [d,h] = D.useState(!1)
      , {onFocus: p, onBlur: y, onMouseEnter: g, onMouseLeave: E, onTouchStart: v} = u
      , T = D.useRef(null);
    D.useEffect( () => {
        if (c === "render" && h(!0),
        c === "viewport") {
            let B = Z => {
                Z.forEach(V => {
                    h(V.isIntersecting)
                }
                )
            }
              , q = new IntersectionObserver(B,{
                threshold: .5
            });
            return T.current && q.observe(T.current),
            () => {
                q.disconnect()
            }
        }
    }
    , [c]),
    D.useEffect( () => {
        if (r) {
            let B = setTimeout( () => {
                h(!0)
            }
            , 100);
            return () => {
                clearTimeout(B)
            }
        }
    }
    , [r]);
    let C = () => {
        o(!0)
    }
      , w = () => {
        o(!1),
        h(!1)
    }
    ;
    return s ? c !== "intent" ? [d, T, {}] : [d, T, {
        onFocus: Gn(p, C),
        onBlur: Gn(y, w),
        onMouseEnter: Gn(g, C),
        onMouseLeave: Gn(E, w),
        onTouchStart: Gn(v, C)
    }] : [!1, T, {}]
}
function Gn(c, u) {
    return s => {
        c && c(s),
        s.defaultPrevented || u(s)
    }
}
function pv({page: c, ...u}) {
    let {router: s} = Rm()
      , r = D.useMemo( () => cm(s.routes, c, s.basename), [s.routes, c, s.basename]);
    return r ? D.createElement(vv, {
        page: c,
        matches: r,
        ...u
    }) : null
}
function yv(c) {
    let {manifest: u, routeModules: s} = Am()
      , [r,o] = D.useState([]);
    return D.useEffect( () => {
        let d = !1;
        return rv(c, u, s).then(h => {
            d || o(h)
        }
        ),
        () => {
            d = !0
        }
    }
    , [c, u, s]),
    r
}
function vv({page: c, matches: u, ...s}) {
    let r = wl()
      , {future: o, manifest: d, routeModules: h} = Am()
      , {basename: p} = Rm()
      , {loaderData: y, matches: g} = mv()
      , E = D.useMemo( () => em(c, u, g, d, r, "data"), [c, u, g, d, r])
      , v = D.useMemo( () => em(c, u, g, d, r, "assets"), [c, u, g, d, r])
      , T = D.useMemo( () => {
        if (c === r.pathname + r.search + r.hash)
            return [];
        let B = new Set
          , q = !1;
        if (u.forEach(V => {
            let J = d.routes[V.route.id];
            !J || !J.hasLoader || (!E.some(ae => ae.route.id === V.route.id) && V.route.id in y && h[V.route.id]?.shouldRevalidate || J.hasClientLoader ? q = !0 : B.add(V.route.id))
        }
        ),
        B.size === 0)
            return [];
        let Z = uv(c, p, o.unstable_trailingSlashAwareDataRequests, "data");
        return q && B.size > 0 && Z.searchParams.set("_routes", u.filter(V => B.has(V.route.id)).map(V => V.route.id).join(",")),
        [Z.pathname + Z.search]
    }
    , [p, o.unstable_trailingSlashAwareDataRequests, y, r, d, E, u, c, h])
      , C = D.useMemo( () => ov(v, d), [v, d])
      , w = yv(v);
    return D.createElement(D.Fragment, null, T.map(B => D.createElement("link", {
        key: B,
        rel: "prefetch",
        as: "fetch",
        href: B,
        ...s
    })), C.map(B => D.createElement("link", {
        key: B,
        rel: "modulepreload",
        href: B,
        ...s
    })), w.map( ({key: B, link: q}) => D.createElement("link", {
        key: B,
        nonce: s.nonce,
        ...q
    })))
}
function Sv(...c) {
    return u => {
        c.forEach(s => {
            typeof s == "function" ? s(u) : s != null && (s.current = u)
        }
        )
    }
}
var bv = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
    bv && (window.__reactRouterVersion = "7.12.0")
} catch {}
function xv({basename: c, children: u, unstable_useTransitions: s, window: r}) {
    let o = D.useRef();
    o.current == null && (o.current = l0({
        window: r,
        v5Compat: !0
    }));
    let d = o.current
      , [h,p] = D.useState({
        action: d.action,
        location: d.location
    })
      , y = D.useCallback(g => {
        s === !1 ? p(g) : D.startTransition( () => p(g))
    }
    , [s]);
    return D.useLayoutEffect( () => d.listen(y), [d, y]),
    D.createElement(W0, {
        basename: c,
        children: u,
        location: h.location,
        navigationType: h.action,
        navigator: d,
        unstable_useTransitions: s
    })
}
var zm = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i
  , We = D.forwardRef(function({onClick: u, discover: s="render", prefetch: r="none", relative: o, reloadDocument: d, replace: h, state: p, target: y, to: g, preventScrollReset: E, viewTransition: v, unstable_defaultShouldRevalidate: T, ...C}, w) {
    let {basename: B, unstable_useTransitions: q} = D.useContext(Mt)
      , Z = typeof g == "string" && zm.test(g)
      , V = gm(g, B);
    g = V.to;
    let J = w0(g, {
        relative: o
    })
      , [ae,re,ye] = gv(r, C)
      , W = Rv(g, {
        replace: h,
        state: p,
        target: y,
        preventScrollReset: E,
        relative: o,
        viewTransition: v,
        unstable_defaultShouldRevalidate: T,
        unstable_useTransitions: q
    });
    function ze(Ce) {
        u && u(Ce),
        Ce.defaultPrevented || W(Ce)
    }
    let Te = D.createElement("a", {
        ...C,
        ...ye,
        href: V.absoluteURL || J,
        onClick: V.isExternal || d ? u : ze,
        ref: Sv(w, re),
        target: y,
        "data-discover": !Z && s === "render" ? "true" : void 0
    });
    return ae && !Z ? D.createElement(D.Fragment, null, Te, D.createElement(pv, {
        page: J
    })) : Te
});
We.displayName = "Link";
var Ev = D.forwardRef(function({"aria-current": u="page", caseSensitive: s=!1, className: r="", end: o=!1, style: d, to: h, viewTransition: p, children: y, ...g}, E) {
    let v = Fn(h, {
        relative: g.relative
    })
      , T = wl()
      , C = D.useContext(Au)
      , {navigator: w, basename: B} = D.useContext(Mt)
      , q = C != null && Nv(v) && p === !0
      , Z = w.encodeLocation ? w.encodeLocation(v).pathname : v.pathname
      , V = T.pathname
      , J = C && C.navigation && C.navigation.location ? C.navigation.location.pathname : null;
    s || (V = V.toLowerCase(),
    J = J ? J.toLowerCase() : null,
    Z = Z.toLowerCase()),
    J && B && (J = rl(J, B) || J);
    const ae = Z !== "/" && Z.endsWith("/") ? Z.length - 1 : Z.length;
    let re = V === Z || !o && V.startsWith(Z) && V.charAt(ae) === "/", ye = J != null && (J === Z || !o && J.startsWith(Z) && J.charAt(Z.length) === "/"), W = {
        isActive: re,
        isPending: ye,
        isTransitioning: q
    }, ze = re ? u : void 0, Te;
    typeof r == "function" ? Te = r(W) : Te = [r, re ? "active" : null, ye ? "pending" : null, q ? "transitioning" : null].filter(Boolean).join(" ");
    let Ce = typeof d == "function" ? d(W) : d;
    return D.createElement(We, {
        ...g,
        "aria-current": ze,
        className: Te,
        ref: E,
        style: Ce,
        to: h,
        viewTransition: p
    }, typeof y == "function" ? y(W) : y)
});
Ev.displayName = "NavLink";
var Ov = D.forwardRef( ({discover: c="render", fetcherKey: u, navigate: s, reloadDocument: r, replace: o, state: d, method: h=Su, action: p, onSubmit: y, relative: g, preventScrollReset: E, viewTransition: v, unstable_defaultShouldRevalidate: T, ...C}, w) => {
    let {unstable_useTransitions: B} = D.useContext(Mt)
      , q = _v()
      , Z = Cv(p, {
        relative: g
    })
      , V = h.toLowerCase() === "get" ? "get" : "post"
      , J = typeof p == "string" && zm.test(p)
      , ae = re => {
        if (y && y(re),
        re.defaultPrevented)
            return;
        re.preventDefault();
        let ye = re.nativeEvent.submitter
          , W = ye?.getAttribute("formmethod") || h
          , ze = () => q(ye || re.currentTarget, {
            fetcherKey: u,
            method: W,
            navigate: s,
            replace: o,
            state: d,
            relative: g,
            preventScrollReset: E,
            viewTransition: v,
            unstable_defaultShouldRevalidate: T
        });
        B && s !== !1 ? D.startTransition( () => ze()) : ze()
    }
    ;
    return D.createElement("form", {
        ref: w,
        method: V,
        action: Z,
        onSubmit: r ? y : ae,
        ...C,
        "data-discover": !J && c === "render" ? "true" : void 0
    })
}
);
Ov.displayName = "Form";
function Tv(c) {
    return `${c} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`
}
function _m(c) {
    let u = D.useContext(Qa);
    return Ge(u, Tv(c)),
    u
}
function Rv(c, {target: u, replace: s, state: r, preventScrollReset: o, relative: d, viewTransition: h, unstable_defaultShouldRevalidate: p, unstable_useTransitions: y}={}) {
    let g = xm()
      , E = wl()
      , v = Fn(c, {
        relative: d
    });
    return D.useCallback(T => {
        if (lv(T, u)) {
            T.preventDefault();
            let C = s !== void 0 ? s : Jn(E) === Jn(v)
              , w = () => g(c, {
                replace: C,
                state: r,
                preventScrollReset: o,
                relative: d,
                viewTransition: h,
                unstable_defaultShouldRevalidate: p
            });
            y ? D.startTransition( () => w()) : w()
        }
    }
    , [E, g, v, s, r, u, c, o, d, h, p, y])
}
var Av = 0
  , zv = () => `__${String(++Av)}__`;
function _v() {
    let {router: c} = _m("useSubmit")
      , {basename: u} = D.useContext(Mt)
      , s = J0()
      , r = c.fetch
      , o = c.navigate;
    return D.useCallback(async (d, h={}) => {
        let {action: p, method: y, encType: g, formData: E, body: v} = iv(d, u);
        if (h.navigate === !1) {
            let T = h.fetcherKey || zv();
            await r(T, s, h.action || p, {
                unstable_defaultShouldRevalidate: h.unstable_defaultShouldRevalidate,
                preventScrollReset: h.preventScrollReset,
                formData: E,
                body: v,
                formMethod: h.method || y,
                formEncType: h.encType || g,
                flushSync: h.flushSync
            })
        } else
            await o(h.action || p, {
                unstable_defaultShouldRevalidate: h.unstable_defaultShouldRevalidate,
                preventScrollReset: h.preventScrollReset,
                formData: E,
                body: v,
                formMethod: h.method || y,
                formEncType: h.encType || g,
                replace: h.replace,
                state: h.state,
                fromRouteId: s,
                flushSync: h.flushSync,
                viewTransition: h.viewTransition
            })
    }
    , [r, o, u, s])
}
function Cv(c, {relative: u}={}) {
    let {basename: s} = D.useContext(Mt)
      , r = D.useContext(ol);
    Ge(r, "useFormAction must be used inside a RouteContext");
    let[o] = r.matches.slice(-1)
      , d = {
        ...Fn(c || ".", {
            relative: u
        })
    }
      , h = wl();
    if (c == null) {
        d.search = h.search;
        let p = new URLSearchParams(d.search)
          , y = p.getAll("index");
        if (y.some(E => E === "")) {
            p.delete("index"),
            y.filter(v => v).forEach(v => p.append("index", v));
            let E = p.toString();
            d.search = E ? `?${E}` : ""
        }
    }
    return (!c || c === ".") && o.route.index && (d.search = d.search ? d.search.replace(/^\?/, "?index&") : "?index"),
    s !== "/" && (d.pathname = d.pathname === "/" ? s : cl([s, d.pathname])),
    Jn(d)
}
function Nv(c, {relative: u}={}) {
    let s = D.useContext(ym);
    Ge(s != null, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
    let {basename: r} = _m("useViewTransitionState")
      , o = Fn(c, {
        relative: u
    });
    if (!s.isTransitioning)
        return !1;
    let d = rl(s.currentLocation.pathname, r) || s.currentLocation.pathname
      , h = rl(s.nextLocation.pathname, r) || s.nextLocation.pathname;
    return Tu(o.pathname, h) != null || Tu(o.pathname, d) != null
}
const Dv = "modulepreload"
  , Mv = function(c) {
    return "/" + c
}
  , tm = {}
  , Ut = function(u, s, r) {
    let o = Promise.resolve();
    if (s && s.length > 0) {
        let y = function(g) {
            return Promise.all(g.map(E => Promise.resolve(E).then(v => ({
                status: "fulfilled",
                value: v
            }), v => ({
                status: "rejected",
                reason: v
            }))))
        };
        document.getElementsByTagName("link");
        const h = document.querySelector("meta[property=csp-nonce]")
          , p = h?.nonce || h?.getAttribute("nonce");
        o = y(s.map(g => {
            if (g = Mv(g),
            g in tm)
                return;
            tm[g] = !0;
            const E = g.endsWith(".css")
              , v = E ? '[rel="stylesheet"]' : "";
            if (document.querySelector(`link[href="${g}"]${v}`))
                return;
            const T = document.createElement("link");
            if (T.rel = E ? "stylesheet" : Dv,
            E || (T.as = "script"),
            T.crossOrigin = "",
            T.href = g,
            p && T.setAttribute("nonce", p),
            document.head.appendChild(T),
            E)
                return new Promise( (C, w) => {
                    T.addEventListener("load", C),
                    T.addEventListener("error", () => w(new Error(`Unable to preload CSS for ${g}`)))
                }
                )
        }
        ))
    }
    function d(h) {
        const p = new Event("vite:preloadError",{
            cancelable: !0
        });
        if (p.payload = h,
        window.dispatchEvent(p),
        !p.defaultPrevented)
            throw h
    }
    return o.then(h => {
        for (const p of h || [])
            p.status === "rejected" && d(p.reason);
        return u().catch(d)
    }
    )
}
  , Uv = D.lazy( () => Ut( () => import("./page-C1Ae36DV.js"), []))
  , Lv = D.lazy( () => Ut( () => import("./page-Ctnjhpim.js"), []))
  , jv = D.lazy( () => Ut( () => import("./page-Da9iOWy6.js"), []))
  , wv = D.lazy( () => Ut( () => import("./page-CVf-6zH1.js"), []))
  , Hv = D.lazy( () => Ut( () => import("./page-Bx7CrW-I.js"), []))
  , Bv = D.lazy( () => Ut( () => import("./page-CS4pjFFX.js"), []))
  , qv = D.lazy( () => Ut( () => import("./page-CgQpEobB.js"), []))
  , Yv = D.lazy( () => Ut( () => import("./NotFound-Da1VuMKY.js"), []))
  , Gv = D.lazy( () => Ut( () => import("./page-CcdoHAIn.js"), []))
  , Vv = D.lazy( () => Ut( () => import("./page-B4g8g5e1.js"), []))
  , Qv = D.lazy( () => Ut( () => import("./page-NWOkuwW8.js"), []))
  , Xv = D.lazy( () => Ut( () => import("./page-BPbbsNzR.js"), []))
  , Zv = [{
    path: "/",
    element: H.jsx(Uv, {})
}, {
    path: "/about",
    element: H.jsx(Lv, {})
}, {
    path: "/programs",
    element: H.jsx(jv, {})
}, {
    path: "/get-involved",
    element: H.jsx(wv, {})
}, {
    path: "/donate",
    element: H.jsx(Hv, {})
}, {
    path: "/contact",
    element: H.jsx(Bv, {})
}, {
    path: "/partners",
    element: H.jsx(qv, {})
}, {
    path: "/financial-reports",
    element: H.jsx(Gv, {})
}, {
    path: "/corporate-sponsorship",
    element: H.jsx(Vv, {})
}, {
    path: "/planned-giving",
    element: H.jsx(Qv, {})
}, {
    path: "/stock-gifts",
    element: H.jsx(Xv, {})
}, {
    path: "*",
    element: H.jsx(Yv, {})
}];
let Cm;
new Promise(c => {
    Cm = c
}
);
function Kv() {
    const c = B0(Zv)
      , u = xm();
    return D.useEffect( () => {
        window.REACT_APP_NAVIGATE = u,
        Cm(window.REACT_APP_NAVIGATE)
    }
    ),
    c
}
function Jv() {
    const [c,u] = D.useState(!1)
      , [s,r] = D.useState(!1)
      , o = wl();
    D.useEffect( () => {
        const h = () => {
            r(window.scrollY > 50)
        }
        ;
        return window.addEventListener("scroll", h),
        () => window.removeEventListener("scroll", h)
    }
    , []),
    D.useEffect( () => {
        u(!1)
    }
    , [o]);
    const d = [{
        path: "/",
        label: "Home"
    }, {
        path: "/about",
        label: "About Us"
    }, {
        path: "/programs",
        label: "Programs"
    }, {
        path: "/get-involved",
        label: "Get Involved"
    }, {
        path: "/partners",
        label: "Partners"
    }, {
        path: "/contact",
        label: "Contact"
    }];
    return H.jsx("header", {
        className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${s ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200" : "bg-white/60 backdrop-blur-md border-b border-white/30"}`,
        children: H.jsxs("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6",
            children: [H.jsxs("div", {
                className: "flex items-center justify-between h-20",
                children: [H.jsxs(We, {
                    to: "/",
                    className: "flex items-center gap-3 cursor-pointer group",
                    children: [H.jsx("div", {
                        className: `w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${s ? "bg-teal-600" : "bg-teal-600/90"}`,
                        children: H.jsx("i", {
                            className: "ri-book-open-line text-2xl text-white"
                        })
                    }), H.jsxs("div", {
                        className: "hidden md:block",
                        children: [H.jsx("div", {
                            className: "text-xl font-bold transition-colors duration-300 text-gray-900",
                            children: "Educate an Orphan"
                        }), H.jsx("div", {
                            className: `text-xs transition-colors duration-300 ${s ? "text-gray-600" : "text-gray-700"}`,
                            children: "Uganda"
                        })]
                    })]
                }), H.jsx("nav", {
                    className: "hidden lg:flex items-center gap-8",
                    children: d.map(h => H.jsxs(We, {
                        to: h.path,
                        className: `relative text-base font-medium transition-colors duration-300 cursor-pointer group ${o.pathname === h.path ? s ? "text-teal-600" : "text-teal-700" : s ? "text-gray-700 hover:text-teal-600" : "text-gray-800 hover:text-teal-600"}`,
                        children: [h.label, H.jsx("span", {
                            className: `absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 transition-all duration-300 group-hover:w-full ${o.pathname === h.path ? "w-full" : ""}`
                        })]
                    }, h.path))
                }), H.jsx(We, {
                    to: "/donate",
                    className: "hidden lg:inline-block px-6 py-3 rounded-full font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap shadow-md hover:shadow-lg hover:scale-105 bg-amber-500 text-white hover:bg-amber-600",
                    children: "Donate Now"
                }), H.jsx("button", {
                    onClick: () => u(!c),
                    className: `lg:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-300 cursor-pointer ${s ? "text-gray-900 hover:bg-gray-100" : "text-gray-900 hover:bg-white/50"}`,
                    children: H.jsx("i", {
                        className: `${c ? "ri-close-line" : "ri-menu-line"} text-2xl`
                    })
                })]
            }), c && H.jsx("div", {
                className: "lg:hidden py-6 border-t border-gray-200 bg-white/95 backdrop-blur-lg rounded-b-2xl shadow-xl",
                children: H.jsxs("nav", {
                    className: "flex flex-col gap-2",
                    children: [d.map(h => H.jsx(We, {
                        to: h.path,
                        className: `px-4 py-3 rounded-lg text-base font-medium transition-colors cursor-pointer ${o.pathname === h.path ? "bg-teal-50 text-teal-600" : "text-gray-700 hover:bg-gray-50"}`,
                        children: h.label
                    }, h.path)), H.jsx(We, {
                        to: "/donate",
                        className: "mx-4 mt-4 px-6 py-3 bg-amber-500 text-white text-center rounded-full font-semibold hover:bg-amber-600 transition-colors cursor-pointer whitespace-nowrap",
                        children: "Donate Now"
                    })]
                })
            })]
        })
    })
}
function $v() {
    return H.jsx("footer", {
        className: "bg-gray-900 text-white",
        children: H.jsxs("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16",
            children: [H.jsxs("div", {
                className: "grid sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-12",
                children: [H.jsxs("div", {
                    children: [H.jsxs("div", {
                        className: "flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4",
                        children: [H.jsx("img", {
                            src: "https://static.readdy.ai/image/cd41cd238abe70c234eacdeb9ca87499/e1c8f6c0f5ff5c3ce84d9c8b0df3dd0d.jpeg",
                            alt: "Educate an Orphan Uganda",
                            className: "h-10 sm:h-12 w-10 sm:w-12 object-contain rounded-lg"
                        }), H.jsxs("div", {
                            children: [H.jsx("div", {
                                className: "font-bold text-base sm:text-lg",
                                children: "Educate an Orphan"
                            }), H.jsx("div", {
                                className: "text-xs sm:text-sm text-gray-400",
                                children: "Uganda"
                            })]
                        })]
                    }), H.jsx("p", {
                        className: "text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 leading-relaxed",
                        children: "Empowering Uganda's future through quality education for vulnerable children."
                    }), H.jsxs("div", {
                        className: "flex gap-3 sm:gap-4",
                        children: [H.jsx("a", {
                            href: "https://facebook.com",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors cursor-pointer",
                            children: H.jsx("i", {
                                className: "ri-facebook-fill text-lg sm:text-xl"
                            })
                        }), H.jsx("a", {
                            href: "https://twitter.com",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors cursor-pointer",
                            children: H.jsx("i", {
                                className: "ri-twitter-fill text-lg sm:text-xl"
                            })
                        }), H.jsx("a", {
                            href: "https://instagram.com",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors cursor-pointer",
                            children: H.jsx("i", {
                                className: "ri-instagram-fill text-lg sm:text-xl"
                            })
                        }), H.jsx("a", {
                            href: "https://linkedin.com",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors cursor-pointer",
                            children: H.jsx("i", {
                                className: "ri-linkedin-fill text-lg sm:text-xl"
                            })
                        })]
                    })]
                }), H.jsxs("div", {
                    children: [H.jsx("h4", {
                        className: "font-bold text-base sm:text-lg mb-3 sm:mb-4",
                        children: "Quick Links"
                    }), H.jsxs("ul", {
                        className: "space-y-2 sm:space-y-3",
                        children: [H.jsx("li", {
                            children: H.jsx(We, {
                                to: "/about",
                                className: "text-sm sm:text-base text-gray-400 hover:text-teal-400 transition-colors cursor-pointer",
                                children: "About Us"
                            })
                        }), H.jsx("li", {
                            children: H.jsx(We, {
                                to: "/programs",
                                className: "text-sm sm:text-base text-gray-400 hover:text-teal-400 transition-colors cursor-pointer",
                                children: "Our Programs"
                            })
                        }), H.jsx("li", {
                            children: H.jsx(We, {
                                to: "/about#board",
                                className: "text-sm sm:text-base text-gray-400 hover:text-teal-400 transition-colors cursor-pointer",
                                children: "Our Team"
                            })
                        }), H.jsx("li", {
                            children: H.jsx(We, {
                                to: "/partners",
                                className: "text-sm sm:text-base text-gray-400 hover:text-teal-400 transition-colors cursor-pointer",
                                children: "Partners"
                            })
                        })]
                    })]
                }), H.jsxs("div", {
                    children: [H.jsx("h4", {
                        className: "font-bold text-base sm:text-lg mb-3 sm:mb-4",
                        children: "Get Involved"
                    }), H.jsxs("ul", {
                        className: "space-y-2 sm:space-y-3",
                        children: [H.jsx("li", {
                            children: H.jsx(We, {
                                to: "/get-involved#volunteer",
                                className: "text-sm sm:text-base text-gray-400 hover:text-teal-400 transition-colors cursor-pointer",
                                children: "Volunteer"
                            })
                        }), H.jsx("li", {
                            children: H.jsx(We, {
                                to: "/donate",
                                className: "text-sm sm:text-base text-gray-400 hover:text-teal-400 transition-colors cursor-pointer",
                                children: "Donate"
                            })
                        }), H.jsx("li", {
                            children: H.jsx(We, {
                                to: "/get-involved#events",
                                className: "text-sm sm:text-base text-gray-400 hover:text-teal-400 transition-colors cursor-pointer",
                                children: "Events"
                            })
                        }), H.jsx("li", {
                            children: H.jsx(We, {
                                to: "/partners",
                                className: "text-sm sm:text-base text-gray-400 hover:text-teal-400 transition-colors cursor-pointer",
                                children: "Partner With Us"
                            })
                        })]
                    })]
                }), H.jsxs("div", {
                    children: [H.jsx("h4", {
                        className: "font-bold text-base sm:text-lg mb-3 sm:mb-4",
                        children: "Contact"
                    }), H.jsxs("ul", {
                        className: "space-y-2 sm:space-y-3 text-gray-400",
                        children: [H.jsxs("li", {
                            className: "flex items-start gap-2 text-sm sm:text-base",
                            children: [H.jsx("i", {
                                className: "ri-map-pin-line text-teal-400 mt-1 flex-shrink-0"
                            }), H.jsxs("span", {
                                children: ["Plot 123, Kampala Road", H.jsx("br", {}), "Kampala, Uganda"]
                            })]
                        }), H.jsxs("li", {
                            className: "flex items-center gap-2 text-sm sm:text-base",
                            children: [H.jsx("i", {
                                className: "ri-phone-line text-teal-400 flex-shrink-0"
                            }), H.jsx("a", {
                                href: "tel:+256700000000",
                                className: "hover:text-teal-400 transition-colors cursor-pointer",
                                children: "+256 700 000 000"
                            })]
                        }), H.jsxs("li", {
                            className: "flex items-center gap-2 text-sm sm:text-base",
                            children: [H.jsx("i", {
                                className: "ri-mail-line text-teal-400 flex-shrink-0"
                            }), H.jsx("a", {
                                href: "mailto:info@educateanorphan.org",
                                className: "hover:text-teal-400 transition-colors cursor-pointer break-all",
                                children: "info@educateanorphan.org"
                            })]
                        })]
                    })]
                })]
            }), H.jsx("div", {
                className: "pt-6 sm:pt-8 border-t border-gray-800",
                children: H.jsxs("div", {
                    className: "flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400",
                    children: [H.jsx("div", {
                        className: "text-center md:text-left",
                        children: "© 2024 Educate an Orphan Uganda. All rights reserved."
                    }), H.jsxs("div", {
                        className: "flex flex-wrap justify-center gap-3 sm:gap-6",
                        children: [H.jsx(We, {
                            to: "/privacy",
                            className: "hover:text-teal-400 transition-colors cursor-pointer",
                            children: "Privacy Policy"
                        }), H.jsx(We, {
                            to: "/terms",
                            className: "hover:text-teal-400 transition-colors cursor-pointer",
                            children: "Terms of Service"
                        }), H.jsx("span", {
                            className: "hidden sm:inline text-gray-600",
                            children: "|"
                        }), H.jsx("span", {
                            className: "text-teal-400",
                            children: "Registered NGO in Uganda"
                        })]
                    }), H.jsx("div", {
                        className: "text-center md:text-right",
                        children: H.jsx("a", {
                            href: "https://readdy.ai/?ref=logo",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "hover:text-teal-400 transition-colors cursor-pointer",
                            children: "Website Builder"
                        })
                    })]
                })
            })]
        })
    })
}
function kv() {
    return H.jsx(xv, {
        basename: "/",
        children: H.jsxs("div", {
            className: "min-h-screen flex flex-col",
            children: [H.jsx(Jv, {}), H.jsx("main", {
                className: "flex-1",
                children: H.jsx(Kv, {})
            }), H.jsx($v, {})]
        })
    })
}
t0.createRoot(document.getElementById("root")).render(H.jsx(D.StrictMode, {
    children: H.jsx(kv, {})
}));
export {We as L, H as j, D as r, wl as u};
//# sourceMappingURL=index-CWbBFHrl.js.map
