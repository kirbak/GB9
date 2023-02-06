"use strict";

(function() {
        if (document.querySelector(".main-department")) {
            var promoSlider = new Swiper(".main-department",{
                slidesPerView: 'auto',
                centeredSlides: true,
                spaceBetween: 30,
                speed: 400,
                loop: true,
            })
        }
    }
)();

(function() {
        if (document.querySelector(".persons")) {
            var adminsSlider = new Swiper(".persons",{
                slidesPerView: 2,
                spaceBetween: 20,
                speed: 400,
                loop: false,
                navigation: {
                    nextEl: '.icon-next',
                    prevEl: '.icon-prev',
                },
                breakpoints: {
                    1140: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    }
                },
            })
        }
    }
)();

(function() {
        var DEBOUNCE_INTERVAL = 100;
        var lastTimeout;
        window.debounce = function(fun) {
            if (lastTimeout) {
                window.clearTimeout(lastTimeout)
            }
            lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL)
        }
    }
)();

(function() {
        if (document.querySelector(".js-vision-menu") && document.querySelector(".js-vision-closed")) {
            var checkCookie = function checkCookie(name) {
                var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
                return matches ? true : false
            };
            var setCookie = function setCookie(name, value, options) {
                options = options || {};
                var expires = options.expires;
                if (typeof expires == "number" && expires) {
                    var d = new Date;
                    d.setTime(d.getTime() + expires * 1e3);
                    expires = options.expires = d
                }
                if (expires && expires.toUTCString) {
                    options.expires = expires.toUTCString()
                }
                value = encodeURIComponent(value);
                var updatedCookie = name + "=" + value;
                for (var propName in options) {
                    updatedCookie += "; " + propName;
                    var propValue = options[propName];
                    if (propValue !== true) {
                        updatedCookie += "=" + propValue
                    }
                }
                document.cookie = updatedCookie
            };
            var deleteCookie = function deleteCookie(name) {
                var pathBits = location.pathname.split("/");
                var pathCurrent = " path=";
                document.cookie = name + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
                for (var i = 0; i < pathBits.length; i++) {
                    pathCurrent += (pathCurrent.substr(-1) != "/" ? "/" : "") + pathBits[i];
                    document.cookie = name + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT;" + pathCurrent + ";"
                }
            };
            var setFontsize = function setFontsize() {
                if (body.classList.contains("font_default")) {
                    return htmlEl.setAttribute("style", "font-size: 62.5%;")
                } else if (body.classList.contains("font_middle")) {
                    return htmlEl.setAttribute("style", "font-size: 70.5%;")
                } else if (body.classList.contains("font_big")) {
                    return htmlEl.setAttribute("style", "font-size: 77.5%;")
                }
            };
            var setFontsizeOnResize = function setFontsizeOnResize() {
                if (!window.matchMedia("(min-width: 1150px)").matches) {
                    htmlEl.setAttribute("style", "font-size: 62.5%;")
                } else {
                    setFontsize()
                }
            };
            var ESC_KEYCODE = 27;
            var container = document.querySelector(".vision.js-vision-closed");
            var btnOpen = document.querySelector(".js-vision-menu");
            var btnSvg = document.querySelector(".js-vision-menu svg");
            var btnClose = container.querySelector(".js-btn-close");
            var visionInputs = document.querySelectorAll(".vision__item input");
            var visionForm = document.querySelector(".vision__nav");
            var overlay = document.querySelector(".overlay");
            var body = document.body;
            var htmlEl = document.documentElement;
            window.addEventListener("load", function() {
                if (!window.matchMedia("(min-width: 1150px)").matches) {
                    htmlEl.setAttribute("style", "font-size: 62.5%;")
                } else {
                    setFontsize()
                }
            });
            window.addEventListener("resize", function() {
                window.debounce(setFontsizeOnResize)
            });
            for (var i = 0; i < visionInputs.length; i++) {
                var cls = visionInputs[i].dataset.theme;
                if (checkCookie("theme_" + cls)) {
                    body.classList.add(cls);
                    visionInputs[i].checked = true;
                    setFontsize()
                }
            }
            visionForm.addEventListener("change", function(evt) {
                var target = evt.target;
                var cls = target.dataset.theme;
                var date = void 0;
                if (target.getAttribute("type") === "checkbox") {
                    if (target.checked) {
                        body.classList.add(cls);
                        date = new Date((new Date).getTime() + 3600 * 24 * 1e3);
                        setCookie("theme_" + cls, cls, {
                            expires: date,
                            path: "/"
                        })
                    } else {
                        body.classList.remove(cls);
                        if (checkCookie("theme_" + cls)) {
                            deleteCookie("theme_" + cls)
                        }
                    }
                } else {
                    var radioBtns = visionForm.querySelectorAll("input[type=radio]");
                    for (var _i = 0; _i < radioBtns.length; _i++) {
                        if (!radioBtns[_i].checked) {
                            body.classList.remove(radioBtns[_i].dataset.theme);
                            deleteCookie("theme_" + radioBtns[_i].dataset.theme)
                        }
                    }
                    body.classList.add(cls);
                    if (cls === "font_default" || cls === "font_middle" || cls === "font_big") {
                        setFontsize()
                    }
                    date = new Date((new Date).getTime() + 3600 * 24 * 1e3);
                    setCookie("theme_" + cls, cls, {
                        expires: date,
                        path: "/"
                    })
                }
            });
            btnOpen.addEventListener("click", function(evt) {
                evt.preventDefault();
                if (container.classList.contains("js-vision-closed")) {
                    container.classList.remove("js-vision-closed");
                    document.body.classList.add("overflow");
                    overlay.classList.add("overlay--visible")
                }
            });
            btnClose.addEventListener("click", function(evt) {
                evt.preventDefault();
                if (!container.classList.contains("js-vision-closed")) {
                    container.classList.add("js-vision-closed");
                    document.body.classList.remove("overflow");
                    overlay.classList.remove("overlay--visible")
                }
            });
            document.addEventListener("keydown", function(evt) {
                if (evt.keyCode === ESC_KEYCODE) {
                    if (!container.classList.contains("js-vision-closed")) {
                        container.classList.add("js-vision-closed");
                        document.body.classList.remove("overflow");
                        overlay.classList.remove("overlay--visible")
                    }
                }
            });
            overlay.addEventListener("click", function(evt) {
                var target = evt.target;
                var menu = target == container;
                var openBtn = target == btnOpen || target == btnSvg;
                var isActive = !container.classList.contains("js-vision-closed");
                if (!menu && !openBtn && isActive) {
                    container.classList.add("js-vision-closed");
                    document.body.classList.remove("overflow");
                    overlay.classList.remove("overlay--visible")
                }
            })
        }
    }
)();

(function() {
        if (document.querySelector(".js-btn-menu")) {
            (function() {
                    var container = document.querySelector(".mobile-menu");
                    var containerMenu = container.querySelector(".mobile-menu__menu");
                    var containerSubMenu = container.querySelector(".mobile-menu__sub-menu");
                    var btnOpen = document.querySelector(".js-btn-menu");
                    var btnBack = container.querySelector(".js-btn-back");
                    var btnClose = container.querySelector(".js-btn-close");
                    var tabs = containerMenu.querySelectorAll(".js-tab");
                    var boxes = containerSubMenu.querySelectorAll(".js-box");
                    var currentTab = containerMenu.querySelector(".js-tab");
                    var currentBox = containerSubMenu.querySelector(".js-box");
                    var show = function show() {
                        if (currentBox.classList.contains("js-box-on")) {
                            currentBox.classList.remove("js-box-on")
                        }
                        for (var i = 0; i < tabs.length; i++) {
                            if (tabs[i].classList.contains("js-tab-on")) {
                                boxes[i].classList.add("js-box-on");
                                currentBox = boxes[i]
                            }
                        }
                        if (containerSubMenu.classList.contains("js-box-closed")) {
                            containerSubMenu.classList.remove("js-box-closed")
                        }
                    };
                    var onTabsClick = function onTabsClick(btn) {
                        if (!btn.classList.contains("js-tab-on")) {
                            currentTab.classList.remove("js-tab-on");
                            currentTab = btn;
                            currentTab.classList.add("js-tab-on");
                            show()
                        } else {
                            if (containerSubMenu.classList.contains("js-box-closed")) {
                                containerSubMenu.classList.remove("js-box-closed")
                            }
                        }
                    };
                    for (var i = 0; i < tabs.length; i++) {
                        tabs[i].addEventListener("click", function(evt) {
                            var btn = evt.target;
                            if (!btn.classList.contains("js-tab-on")) {
                                evt.preventDefault()
                            }
                            onTabsClick(btn)
                        })
                    }
                    btnOpen.addEventListener("click", function(evt) {
                        evt.preventDefault();
                        if (container.classList.contains("js-box-closed")) {
                            container.classList.remove("js-box-closed");
                            document.body.style.overflow = "hidden"
                        }
                    });
                    btnClose.addEventListener("click", function(evt) {
                        evt.preventDefault();
                        var tab = tabs[0];
                        onTabsClick(tab);
                        if (!container.classList.contains("js-box-closed")) {
                            container.classList.add("js-box-closed");
                            document.body.style.overflow = "auto"
                        }
                        if (!containerSubMenu.classList.contains("js-box-closed")) {
                            containerSubMenu.classList.add("js-box-closed")
                        }
                    });
                    btnBack.addEventListener("click", function(evt) {
                        evt.preventDefault();
                        if (!containerSubMenu.classList.contains("js-box-closed")) {
                            containerSubMenu.classList.add("js-box-closed")
                        }
                        for (var i = 0; i < tabs.length; i++) {
                            if (tabs[i].classList.contains("js-tab-on")) {
                                tabs[i].classList.remove("js-tab-on")
                            }
                        }
                    })
                }
            )()
        }
    }
)();

(function () {
    'use strict';

    function ownKeys(e, t) {
        var o = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            if (t) n = n.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
            });
            o.push.apply(o, n);
        }
        return o;
    }

    function _objectSpread(e) {
        for (var t = 1; t < arguments.length; t++) {
            var o = null != arguments[t] ? arguments[t] : {};
            if (t % 2) ownKeys(Object(o), true).forEach(function (t) {
                _defineProperty(e, t, o[t]);
            }); else if (Object.getOwnPropertyDescriptors) Object.defineProperties(e, Object.getOwnPropertyDescriptors(o)); else ownKeys(Object(o)).forEach(function (t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(o, t));
            });
        }
        return e;
    }

    function _defineProperty(e, t, o) {
        if (t in e) Object.defineProperty(e, t, {
            value       : o,
            enumerable  : true,
            configurable: true,
            writable    : true
        }); else e[t] = o;
        return e;
    }

    var POS_PREFIX_2 = '--pos-banner-fluid-2__', posOptionsInitial = {
        'grid-template-columns'  : '100%',
        'grid-template-rows'     : '310px auto',
        'decor-grid-column'      : 'initial',
        'decor-grid-row'         : 'initial',
        'decor-padding'          : '30px 30px 0 30px',
        'bg-url'                 : 'url(\'https://pos.gosuslugi.ru/bin/banner-fluid/2/banner-fluid-bg-2-small.svg\')',
        'bg-position'            : 'calc(10% + 64px) calc(100% - 20px)',
        'bg-size'                : 'cover',
        'content-padding'        : '0 30px 30px 30px',
        'slogan-font-size'       : '20px',
        'slogan-line-height'     : '32px',
        'logo-wrap-padding'      : '20px 30px 30px 40px',
        'logo-wrap-top'          : '0',
        'logo-wrap-bottom'       : 'initial',
        'logo-wrap-border-radius': '0 0 0 80px'
    }, setStyles     = function (e, t) {
        Object.keys(e).forEach(function (o) {
            t.style.setProperty(POS_PREFIX_2 + o, e[o]);
        });
    }, removeStyles  = function (e, t) {
        Object.keys(e).forEach(function (e) {
            t.style.removeProperty(POS_PREFIX_2 + e);
        });
    };

    function changePosBannerOnResize() {
        var e = document.documentElement, t = _objectSpread({}, posOptionsInitial),
            o = document.getElementById('js-show-iframe-wrapper'), n = o ? o.offsetWidth : document.body.offsetWidth;
        if (n > 405) t['slogan-font-size'] = '24px', t['logo-wrap-padding'] = '30px 50px 30px 70px';
        if (n > 500) t['grid-template-columns'] = 'min-content 1fr', t['grid-template-rows'] = '100%', t['decor-grid-column'] = '2', t['decor-grid-row'] = '1', t['decor-padding'] = '30px 30px 30px 0', t['content-padding'] = '30px', t['bg-position'] = '0% calc(100% - 70px)', t['logo-wrap-padding'] = '30px 30px 24px 40px', t['logo-wrap-top'] = 'initial', t['logo-wrap-bottom'] = '0', t['logo-wrap-border-radius'] = '80px 0 0 0';
        if (n > 585) t['bg-position'] = '0% calc(100% - 6px)';
        if (n > 800) t['bg-url'] = 'url(\'https://pos.gosuslugi.ru/bin/banner-fluid/2/banner-fluid-bg-2.svg\')', t['bg-position'] = '0% center';
        if (n > 1020) t['slogan-font-size'] = '32px', t['line-height'] = '40px', t['logo-wrap-padding'] = '30px 30px 24px 50px';
        setStyles(t, e);
    }

    changePosBannerOnResize(), window.addEventListener('resize', changePosBannerOnResize), window.onunload = function () {
        var e = document.documentElement;
        window.removeEventListener('resize', changePosBannerOnResize), removeStyles(posOptionsInitial, e);
    };
})();