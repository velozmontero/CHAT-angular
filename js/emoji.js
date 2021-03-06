/*! Angular Emoji 1.1.0 2015-11-15 */
"use strict";

function cancelEvent(a) {
    return a = a || window.event, a && (a = a.originalEvent || a, a.stopPropagation && a.stopPropagation(), a.preventDefault && a.preventDefault()), !1
}
var emojiApp = angular.module("emojiApp", ["ngSanitize"]);
emojiApp.config(["$sceProvider", function(a) {
        a.enabled(!1);
        var b, c, d, e, f, g, h, i = {},
            j = {};
        for (c = 0; c < Config.EmojiCategories.length; c++)
            for (h = Config.EmojiCategorySpritesheetDimens[c][1], b = 0; b < Config.EmojiCategories[c].length; b++) e = Config.Emoji[Config.EmojiCategories[c][b]], d = e[1][0], f = Math.floor(b / h), g = b % h, i[":" + d + ":"] = [c, f, g, ":" + d + ":"], j[d] = e[0];
        $.emojiarea.spritesheetPath = "img/emojisprite_!.png", $.emojiarea.spritesheetDimens = Config.EmojiCategorySpritesheetDimens, $.emojiarea.iconSize = 20, $.emojiarea.icons = i, $.emojiarea.reverseIcons = j
    }]), emojiApp.directive("contenteditable", ["$sce", function(a) {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(a, b, c, d) {
                function e() {
                    var a = b.html();
                    c.stripBr && "<br>" == a && (a = ""), d.$setViewValue(a)
                }
                d && (d.$render = function() {
                    b.html(d.$viewValue || "")
                }, b.on("blur keyup change", function() {
                    a.$evalAsync(e)
                }), e())
            }
        }
    }]), emojiApp.directive("emojiForm", ["$timeout", "$http", "$interpolate", "$compile", function(a, b, c, d) {
        function e(b, e, f) {
            function g() {}

            function h() {
                q && ($(q).trigger("change"), i())
            }

            function i() {
                var a = q.offsetHeight;
                u != a && (u = a, b.$emit("ui_editor_resize"))
            }

            function j(a) {
                var c = (a.originalEvent || a).target,
                    d = (c || {}).src || "",
                    e = !1;
                if ("data:" == d.substr(0, 5)) {
                    e = !0;
                    var f = dataUrlToBlob(d);
                    ErrorService.confirm({
                        type: "FILE_CLIPBOARD_PASTE"
                    }).then(function() {
                        b.draftMessage.files = [f], b.draftMessage.isMedia = !0
                    }), setZeroTimeout(function() {
                        c.parentNode.removeChild(c)
                    })
                } else if (d && !d.match(/img\/blank\.gif/)) {
                    var g = document.createTextNode(" " + d + " ");
                    setTimeout(function() {
                        c.parentNode.replaceChild(g, c)
                    }, 100)
                }
            }

            function k(a) {
                console.log("onPasteEvent");
                var c, d, e = (a.originalEvent || a).clipboardData,
                    f = e && e.items || [],
                    g = [];
                for (d = 0; d < f.length; d++) "file" == f[d].kind && (c = f[d].getAsFile(), g.push(c));
                g.length > 0 && ErrorService.confirm({
                    type: "FILES_CLIPBOARD_PASTE",
                    files: g
                }).then(function() {
                    b.draftMessage.files = g, b.draftMessage.isMedia = !0
                })
            }

            function l(a) {
                return 9 != a.keyCode || a.shiftKey || a.ctrlKey || a.metaKey || $modalStack.getTop() ? void 0 : (p.focus(), cancelEvent(a))
            }
            var m = $("textarea", e)[0],
                n = $("input", e),
                o = $("#emojibtn", e)[0],
                p = m,
                q = ($(m).emojiarea({
                    button: o,
                    norealTime: !0
                }), $(".emoji-menu", e)[0], $(".emoji-wysiwyg-editor", e)[0]),
                r = d($("#messageDiv"));
            if ($("#messageDiv").replaceWith(r(b)), q) {
                p = q, $(q).addClass("form-control"), $(m).attr("placeholder") && $(q).attr("placeholder", c($(m).attr("placeholder"))(b));
                var s;
                $(q).on("DOMNodeInserted", j).on("keyup", function(c) {
                    i(), v || b.$apply(function() {
                        b.emojiMessage.messagetext = q.textContent
                    }), a.cancel(s), s = a(h, 1e3)
                })
            }
            var t = !0;
            $(p).on("keydown", function(c) {
                if (q && i(), 13 == c.keyCode) {
                    var d = !1;
                    if (t && !c.shiftKey ? d = !0 : t || !c.ctrlKey && !c.metaKey || (d = !0), d) return a.cancel(s), h(), b.emojiMessage.replyToUser(), g(), cancelEvent(c)
                }
            });
            var u = q.offsetHeight;
            $(document).on("keydown", l), $(document).on("paste", k);
            var v = !1;
            b.$on("$destroy", function() {
                $(document).off("paste", k), $(document).off("keydown", l), $(submitBtn).off("mousedown"), n.off("change"), q && $(q).off("DOMNodeInserted keyup", j), $(p).off("keydown")
            })
        }
        return {
            scope: {
                emojiMessage: "="
            },
            link: e
        }
    }]), emojiApp.directive("contenteditable", ["$sce", function(a) {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(a, b, c, d) {
                function e() {
                    var a = b.html();
                    c.stripBr && "<br>" == a && (a = ""), d.$setViewValue(a)
                }
                d && (d.$render = function() {
                    b.html(d.$viewValue || "")
                }, b.on("blur keyup change", function() {
                    a.$evalAsync(e)
                }), e())
            }
        }
    }]), emojiApp.filter("colonToCode", function() {
        return function(a) {
            return a ? (Config.rx_colons || Config.init_unified(), a.replace(Config.rx_colons, function(a) {
                var b = Config.mapcolon[a];
                return b ? b : ""
            })) : ""
        }
    }), emojiApp.filter("codeToSmiley", function() {
        return function(a) {
            return a ? (Config.rx_codes || Config.init_unified(), a.replace(Config.rx_codes, function(a) {
                var b = Config.reversemap[a];
                if (b) {
                    b = ":" + b + ":";
                    var c = $.emojiarea.createIcon($.emojiarea.icons[b]);
                    return c
                }
                return ""
            })) : ""
        }
    }), emojiApp.filter("colonToSmiley", function() {
        return function(a) {
            return a ? (Config.rx_colons || Config.init_unified(), a.replace(Config.rx_colons, function(a) {
                if (a) {
                    var b = $.emojiarea.createIcon($.emojiarea.icons[a]);
                    return b
                }
                return ""
            })) : ""
        }
    }),
    function(a) {
        function b(a) {
            h = a
        }

        function c() {
            i = !0
        }

        function d() {
            return i ? (i = !1, "") : h
        }

        function e() {
            var a, b, c, e = Array.prototype.slice.call(arguments),
                f = e.pop(),
                g = [],
                h = 1 == e.length,
                i = !0,
                m = d();
            for (b = 0; b < e.length; b++)
                if (c = e[b] = m + e[b], "xt_" != c.substr(0, 3) && void 0 !== j[c]) g.push(j[c]);
                else if (l) {
                try {
                    a = localStorage.getItem(c)
                } catch (n) {
                    l = !1
                }
                try {
                    a = void 0 === a || null === a ? !1 : JSON.parse(a)
                } catch (n) {
                    a = !1
                }
                g.push(j[c] = a)
            } else k ? i = !1 : g.push(j[c] = !1);
            return i ? f(h ? g[0] : g) : void chrome.storage.local.get(e, function(a) {
                var d;
                for (g = [], b = 0; b < e.length; b++) c = e[b], d = a[c], d = void 0 === d || null === d ? !1 : JSON.parse(d), g.push(j[c] = d);
                f(h ? g[0] : g)
            })
        }

        function f(a, b) {
            var c, e, f = {},
                g = d();
            for (c in a)
                if (a.hasOwnProperty(c))
                    if (e = a[c], c = g + c, j[c] = e, e = JSON.stringify(e), l) try {
                        localStorage.setItem(c, e)
                    } catch (h) {
                        l = !1
                    } else f[c] = e;
            return l || !k ? void(b && b()) : void chrome.storage.local.set(f, b)
        }

        function g() {
            var a, b, c, e = Array.prototype.slice.call(arguments),
                f = d();
            for ("function" == typeof e[e.length - 1] && (c = e.pop()), a = 0; a < e.length; a++)
                if (b = e[a] = f + e[a], delete j[b], l) try {
                    localStorage.removeItem(b)
                } catch (g) {
                    l = !1
                }
                k ? chrome.storage.local.remove(e, c): c && c()
        }
        var h = "",
            i = !1,
            j = {},
            k = !!(a.chrome && chrome.storage && chrome.storage.local),
            l = !k && !!a.localStorage;
        a.ConfigStorage = {
            prefix: b,
            noPrefix: c,
            get: e,
            set: f,
            remove: g
        }
    }(this),
    function(a, b, c) {
        var d = 1,
            e = 3,
            f = ["p", "div", "pre", "form"],
            g = 27,
            h = 9;
        a.emojiarea = {
            path: "",
            spritesheetPath: "",
            spritesheetDimens: [],
            iconSize: 20,
            icons: {},
            defaults: {
                button: null,
                buttonLabel: "Emojis",
                buttonPosition: "after"
            }
        };
        var i = ":joy:,:kissing_heart:,:heart:,:heart_eyes:,:blush:,:grin:,:+1:,:relaxed:,:pensive:,:smile:,:sob:,:kiss:,:unamused:,:flushed:,:stuck_out_tongue_winking_eye:,:see_no_evil:,:wink:,:smiley:,:cry:,:stuck_out_tongue_closed_eyes:,:scream:,:rage:,:smirk:,:disappointed:,:sweat_smile:,:kissing_closed_eyes:,:speak_no_evil:,:relieved:,:grinning:,:yum:,:laughing:,:ok_hand:,:neutral_face:,:confused:".split(",");
        a.fn.emojiarea = function(b) {
            return b = a.extend({}, a.emojiarea.defaults, b), this.each(function() {
                var d = a(this);
                "contentEditable" in c.body && b.wysiwyg !== !1 ? new m(d, b) : new l(d, b)
            })
        };
        var j = {};
        j.restoreSelection = function() {
            return b.getSelection ? function(a) {
                var c = b.getSelection();
                c.removeAllRanges();
                for (var d = 0, e = a.length; e > d; ++d) c.addRange(a[d])
            } : c.selection && c.selection.createRange ? function(a) {
                a && a.select()
            } : void 0
        }(), j.saveSelection = function() {
            return b.getSelection ? function() {
                var a = b.getSelection(),
                    c = [];
                if (a.rangeCount)
                    for (var d = 0, e = a.rangeCount; e > d; ++d) c.push(a.getRangeAt(d));
                return c
            } : c.selection && c.selection.createRange ? function() {
                var a = c.selection;
                return "none" !== a.type.toLowerCase() ? a.createRange() : null
            } : void 0
        }(), j.replaceSelection = function() {
            return b.getSelection ? function(a) {
                var d, e = b.getSelection(),
                    f = "string" == typeof a ? c.createTextNode(a) : a;
                e.getRangeAt && e.rangeCount && (d = e.getRangeAt(0), d.deleteContents(), d.insertNode(c.createTextNode(" ")), d.insertNode(f), d.setStart(f, 0), b.setTimeout(function() {
                    d = c.createRange(), d.setStartAfter(f), d.collapse(!0), e.removeAllRanges(), e.addRange(d)
                }, 0))
            } : c.selection && c.selection.createRange ? function(a) {
                var b = c.selection.createRange();
                "string" == typeof a ? b.text = a : b.pasteHTML(a.outerHTML)
            } : void 0
        }(), j.insertAtCursor = function(a, b) {
            a = " " + a;
            var d, e, f, g = b.value;
            "undefined" != typeof b.selectionStart && "undefined" != typeof b.selectionEnd ? (e = b.selectionStart, d = b.selectionEnd, b.value = g.substring(0, e) + a + g.substring(b.selectionEnd), b.selectionStart = b.selectionEnd = e + a.length) : "undefined" != typeof c.selection && "undefined" != typeof c.selection.createRange && (b.focus(), f = c.selection.createRange(), f.text = a, f.select())
        }, j.extend = function(a, b) {
            if ("undefined" != typeof a && a || (a = {}), "object" == typeof b)
                for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
            return a
        }, j.escapeRegex = function(a) {
            return (a + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
        }, j.htmlEntities = function(a) {
            return String(a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        }, j.emojiInserted = function(a, b) {
            ConfigStorage.get("emojis_recent", function(b) {
                b = b || i || [];
                var c = b.indexOf(a);
                return c ? (-1 != c && b.splice(c, 1), b.unshift(a), b.length > 42 && (b = b.slice(42)), void ConfigStorage.set({
                    emojis_recent: b
                })) : !1
            })
        };
        var k = function() {};
        k.prototype.setup = function() {
            var a = this;
            this.$editor.on("focus", function() {
                a.hasFocus = !0
            }), this.$editor.on("blur", function() {
                a.hasFocus = !1
            }), this.setupButton()
        }, k.prototype.setupButton = function() {
            var b, c = this;
            this.options.button ? b = a(this.options.button) : this.options.button !== !1 ? (b = a('<a href="javascript:void(0)">'), b.html(this.options.buttonLabel), b.addClass("emoji-button"), b.attr({
                title: this.options.buttonLabel
            }), this.$editor[this.options.buttonPosition](b)) : b = a(""), b.on("click", function(a) {
                n.show(c), a.stopPropagation()
            }), this.$button = b
        }, k.createIcon = function(b, c) {
            var d = b[0],
                e = b[1],
                f = b[2],
                g = b[3],
                h = a.emojiarea.spritesheetPath,
                i = c && Config.Mobile ? 26 : a.emojiarea.iconSize,
                k = -(i * f),
                l = -(i * e),
                m = a.emojiarea.spritesheetDimens[d][1] * i,
                n = a.emojiarea.spritesheetDimens[d][0] * i,
                o = "display:inline-block;";
            return o += "width:" + i + "px;", o += "height:" + i + "px;", o += "background:url('" + h.replace("!", d) + "') " + k + "px " + l + "px no-repeat;", o += "background-size:" + m + "px " + n + "px;", '<img src="img/blank.gif" class="img" style="' + o + '" alt="' + j.htmlEntities(g) + '">'
        }, a.emojiarea.createIcon = k.createIcon;
        var l = function(a, b) {
            this.options = b, this.$textarea = a, this.$editor = a, this.setup()
        };
        l.prototype.insert = function(b) {
            a.emojiarea.icons.hasOwnProperty(b) && (j.insertAtCursor(b, this.$textarea[0]), j.emojiInserted(b, this.menu), this.$textarea.trigger("change"))
        }, l.prototype.val = function() {
            return this.$textarea.val()
        }, j.extend(l.prototype, k.prototype);
        var m = function(b, d) {
            var e = this;
            this.options = d || {}, this.$textarea = b, this.$editor = a("<div>").addClass("emoji-wysiwyg-editor"), this.$editor.text(b.val()), this.$editor.attr({
                contenteditable: "true",
                id: "messageDiv",
                "ng-model": "emojiMessage.rawhtml"
            });
            var f = "blur change";
            this.options.norealTime || (f += " keyup"), this.$editor.on(f, function(a) {
                return e.onChange.apply(e, [a])
            }), this.$editor.on("paste", function(a) {
                return e.onPaste.apply(e, [a])
            }), this.$editor.on("mousedown focus", function() {
                c.execCommand("enableObjectResizing", !1, !1)
            }), this.$editor.on("blur", function() {
                c.execCommand("enableObjectResizing", !0, !0)
            });
            var g = this.$editor.text(),
                h = a.emojiarea.icons;
            for (var i in h) h.hasOwnProperty(i) && (g = g.replace(new RegExp(j.escapeRegex(i), "g"), k.createIcon(h[i])));
            this.$editor.html(g), b.hide().after(this.$editor), this.setup(), a(c.body).on("mousedown", function() {
                e.hasFocus && (e.selection = j.saveSelection())
            })
        };
        m.prototype.onPaste = function(a) {
            var b, d = (a.originalEvent || a).clipboardData,
                e = d && d.items || [];
            for (b = 0; b < e.length; b++)
                if ("file" == e[b].kind) return a.preventDefault(), !0;
            var f = (a.originalEvent || a).clipboardData.getData("text/plain"),
                g = this;
            return setTimeout(function() {
                g.onChange()
            }, 0), f.length ? (c.execCommand("insertText", !1, f), cancelEvent(a)) : !0
        }, m.prototype.onChange = function(a) {
            this.$textarea.val(this.val()).trigger("change")
        }, m.prototype.insert = function(b) {
            var c = a(k.createIcon(a.emojiarea.icons[b]));
            c[0].attachEvent && c[0].attachEvent("onresizestart", function(a) {
                a.returnValue = !1
            }, !1), this.$editor.trigger("focus"), this.selection && j.restoreSelection(this.selection);
            try {
                j.replaceSelection(c[0])
            } catch (d) {}
            j.emojiInserted(b, this.menu), this.onChange()
        }, m.prototype.val = function() {
            for (var a = [], b = [], c = function() {
                    a.push(b.join("")), b = []
                }, g = function(a) {
                    if (a.nodeType === e) b.push(a.nodeValue);
                    else if (a.nodeType === d) {
                        var h = a.tagName.toLowerCase(),
                            i = -1 !== f.indexOf(h);
                        if (i && b.length && c(), "img" === h) {
                            var j = a.getAttribute("alt") || "";
                            return void(j && b.push(j))
                        }
                        "br" === h && c();
                        for (var k = a.childNodes, l = 0; l < k.length; l++) g(k[l]);
                        i && b.length && c()
                    }
                }, h = this.$editor[0].childNodes, i = 0; i < h.length; i++) g(h[i]);
            return b.length && c(), a.join("\n")
        }, j.extend(m.prototype, k.prototype);
        var n = function() {
            var d = this,
                e = a(c.body),
                f = a(b);
            this.visible = !1, this.emojiarea = null, this.$menu = a("<div>"), this.$menu.addClass("emoji-menu"), this.$menu.hide(), this.$itemsTailWrap = a('<div class="emoji-items-wrap1"></div>').appendTo(this.$menu), this.$categoryTabs = a('<table class="emoji-menu-tabs"><tr><td><a class="emoji-menu-tab icon-recent" ></a></td><td><a class="emoji-menu-tab icon-smile" ></a></td><td><a class="emoji-menu-tab icon-flower"></a></td><td><a class="emoji-menu-tab icon-bell"></a></td><td><a class="emoji-menu-tab icon-car"></a></td><td><a class="emoji-menu-tab icon-grid"></a></td></tr></table>').appendTo(this.$itemsTailWrap), this.$itemsWrap = a('<div class="emoji-items-wrap nano mobile_scrollable_wrap"></div>').appendTo(this.$itemsTailWrap), this.$items = a('<div class="emoji-items nano-content">').appendTo(this.$itemsWrap), e.append(this.$menu), Config.Mobile || this.$itemsWrap.nanoScroller({
                preventPageScrolling: !0,
                tabIndex: -1
            }), e.on("keydown", function(a) {
                (a.keyCode === g || a.keyCode === h) && d.hide()
            }), e.on("message_send", function(a) {
                d.hide()
            }), e.on("mouseup", function(a) {
                a = a.originalEvent || a;
                for (var c = a.originalTarget || a.target || b; c && c != b;)
                    if (c = c.parentNode, c == d.$menu[0] || d.emojiarea && c == d.emojiarea.$button[0]) return;
                d.hide()
            }), f.on("resize", function() {
                d.visible && d.reposition()
            }), this.$menu.on("mouseup", "a", function(a) {
                return a.stopPropagation(), !1
            }), this.$menu.on("click", "a", function(c) {
                if (a(this).hasClass("emoji-menu-tab")) return d.getTabIndex(this) !== d.currentCategory && d.selectCategory(d.getTabIndex(this)), !1;
                var e = a(".label", a(this)).text();
                return b.setTimeout(function() {
                    d.onItemSelected(e), (c.ctrlKey || c.metaKey) && d.hide()
                }, 0), c.stopPropagation(), !1
            }), this.selectCategory(0)
        };
        n.prototype.getTabIndex = function(a) {
            return this.$categoryTabs.find(".emoji-menu-tab").index(a)
        }, n.prototype.selectCategory = function(a) {
            this.$categoryTabs.find(".emoji-menu-tab").each(function(b) {
                b === a ? this.className += "-selected" : this.className = this.className.replace("-selected", "")
            }), this.currentCategory = a, this.load(a), Config.Mobile || this.$itemsWrap.nanoScroller({
                scroll: "top"
            })
        }, n.prototype.onItemSelected = function(a) {
            this.emojiarea.insert(a)
        }, n.prototype.load = function(b) {
            var c = [],
                d = a.emojiarea.icons,
                e = a.emojiarea.path,
                f = this;
            e.length && "/" !== e.charAt(e.length - 1) && (e += "/");
            var g = function() {
                f.$items.html(c.join("")), Config.Mobile || setTimeout(function() {
                    f.$itemsWrap.nanoScroller()
                }, 100)
            };
            if (b > 0) {
                for (var h in d) d.hasOwnProperty(h) && d[h][0] === b - 1 && c.push('<a href="javascript:void(0)" title="' + j.htmlEntities(h) + '">' + k.createIcon(d[h], !0) + '<span class="label">' + j.htmlEntities(h) + "</span></a>");
                g()
            } else ConfigStorage.get("emojis_recent", function(a) {
                a = a || i || [];
                var b, e;
                for (e = 0; e < a.length; e++) b = a[e], d[b] && c.push('<a href="javascript:void(0)" title="' + j.htmlEntities(b) + '">' + k.createIcon(d[b], !0) + '<span class="label">' + j.htmlEntities(b) + "</span></a>");
                g()
            })
        }, n.prototype.reposition = function() {
            var a = this.emojiarea.$button,
                b = a.offset();
            b.top += a.outerHeight(), b.left += Math.round(a.outerWidth() / 2), this.$menu.css({
                top: b.top,
                left: b.left
            })
        }, n.prototype.hide = function(a) {
            this.emojiarea && (this.emojiarea.menu = null, this.emojiarea.$button.removeClass("on"), this.emojiarea = null), this.visible = !1, this.$menu.hide("fast")
        }, n.prototype.show = function(a) {
            return this.emojiarea && this.emojiarea === a ? this.hide() : (a.$button.addClass("on"), this.emojiarea = a, this.emojiarea.menu = this, this.reposition(), this.$menu.show("fast"), this.currentCategory || this.load(0), void(this.visible = !0))
        }, n.show = function() {
            var a = null;
            return function(b) {
                a = a || new n, a.show(b)
            }
        }()
    }(jQuery, window, document),
    function(a, b, c) {
        var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H;
        z = {
            paneClass: "nano-pane",
            sliderClass: "nano-slider",
            contentClass: "nano-content",
            iOSNativeScrolling: !1,
            preventPageScrolling: !1,
            disableResize: !1,
            alwaysVisible: !1,
            flashDelay: 1500,
            sliderMinHeight: 20,
            sliderMaxHeight: null,
            documentContext: null,
            windowContext: null
        }, u = "scrollbar", t = "scroll", l = "mousedown", m = "mouseenter", n = "mousemove", p = "mousewheel", o = "mouseup", s = "resize", h = "drag", i = "enter", w = "up", r = "panedown", f = "DOMMouseScroll", g = "down", x = "wheel", j = "keydown", k = "keyup", v = "touchmove", d = "Microsoft Internet Explorer" === b.navigator.appName && /msie 7./i.test(b.navigator.appVersion) && b.ActiveXObject, e = null, D = b.requestAnimationFrame, y = b.cancelAnimationFrame, F = c.createElement("div").style, H = function() {
            var a, b, c, d, e, f;
            for (d = ["t", "webkitT", "MozT", "msT", "OT"], a = e = 0, f = d.length; f > e; a = ++e)
                if (c = d[a], b = d[a] + "ransform", b in F) return d[a].substr(0, d[a].length - 1);
            return !1
        }(), G = function(a) {
            return H === !1 ? !1 : "" === H ? a : H + a.charAt(0).toUpperCase() + a.substr(1)
        }, E = G("transform"), B = E !== !1, A = function() {
            var a, b, d;
            return a = c.createElement("div"), b = a.style, b.position = "absolute", b.width = "100px", b.height = "100px", b.overflow = t, b.top = "-9999px", c.body.appendChild(a), d = a.offsetWidth - a.clientWidth, c.body.removeChild(a), d
        }, C = function() {
            var a, c, d;
            return c = b.navigator.userAgent, (a = /(?=.+Mac OS X)(?=.+Firefox)/.test(c)) ? (d = /Firefox\/\d{2}\./.exec(c), d && (d = d[0].replace(/\D+/g, "")), a && +d > 23) : !1
        }, q = function() {
            function j(d, f) {
                this.el = d, this.options = f, e || (e = A()), this.$el = a(this.el), this.doc = a(this.options.documentContext || c), this.win = a(this.options.windowContext || b), this.body = this.doc.find("body"), this.$content = this.$el.children("." + f.contentClass), this.$content.attr("tabindex", this.options.tabIndex || 0), this.content = this.$content[0], this.previousPosition = 0, this.options.iOSNativeScrolling && (null != this.el.style.WebkitOverflowScrolling || navigator.userAgent.match(/mobi.+Gecko/i)) ? this.nativeScrolling() : this.generate(), this.createEvents(), this.addEvents(), this.reset()
            }
            return j.prototype.preventScrolling = function(a, b) {
                if (this.isActive)
                    if (a.type === f)(b === g && a.originalEvent.detail > 0 || b === w && a.originalEvent.detail < 0) && a.preventDefault();
                    else if (a.type === p) {
                    if (!a.originalEvent || !a.originalEvent.wheelDelta) return;
                    (b === g && a.originalEvent.wheelDelta < 0 || b === w && a.originalEvent.wheelDelta > 0) && a.preventDefault()
                }
            }, j.prototype.nativeScrolling = function() {
                this.$content.css({
                    WebkitOverflowScrolling: "touch"
                }), this.iOSNativeScrolling = !0, this.isActive = !0
            }, j.prototype.updateScrollValues = function() {
                var a, b;
                a = this.content, this.maxScrollTop = a.scrollHeight - a.clientHeight, this.prevScrollTop = this.contentScrollTop || 0, this.contentScrollTop = a.scrollTop, b = this.contentScrollTop > this.previousPosition ? "down" : this.contentScrollTop < this.previousPosition ? "up" : "same", this.previousPosition = this.contentScrollTop, "same" !== b && this.$el.trigger("update", {
                    position: this.contentScrollTop,
                    maximum: this.maxScrollTop,
                    direction: b
                }), this.iOSNativeScrolling || (this.maxSliderTop = this.paneHeight - this.sliderHeight, this.sliderTop = 0 === this.maxScrollTop ? 0 : this.contentScrollTop * this.maxSliderTop / this.maxScrollTop)
            }, j.prototype.setOnScrollStyles = function() {
                var a;
                B ? (a = {}, a[E] = "translate(0, " + this.sliderTop + "px)") : a = {
                    top: this.sliderTop
                }, D ? (y && this.scrollRAF && y(this.scrollRAF), this.scrollRAF = D(function(b) {
                    return function() {
                        return b.scrollRAF = null, b.slider.css(a)
                    }
                }(this))) : this.slider.css(a)
            }, j.prototype.createEvents = function() {
                this.events = {
                    down: function(a) {
                        return function(b) {
                            return a.isBeingDragged = !0, a.offsetY = b.pageY - a.slider.offset().top, a.slider.is(b.target) || (a.offsetY = 0), a.pane.addClass("active"), a.doc.bind(n, a.events[h]).bind(o, a.events[w]), a.body.bind(m, a.events[i]), !1
                        }
                    }(this),
                    drag: function(a) {
                        return function(b) {
                            return a.sliderY = b.pageY - a.$el.offset().top - a.paneTop - (a.offsetY || .5 * a.sliderHeight), a.scroll(), a.contentScrollTop >= a.maxScrollTop && a.prevScrollTop !== a.maxScrollTop ? a.$el.trigger("scrollend") : 0 === a.contentScrollTop && 0 !== a.prevScrollTop && a.$el.trigger("scrolltop"), !1
                        }
                    }(this),
                    up: function(a) {
                        return function(b) {
                            return a.isBeingDragged = !1, a.pane.removeClass("active"), a.doc.unbind(n, a.events[h]).unbind(o, a.events[w]), a.body.unbind(m, a.events[i]), !1
                        }
                    }(this),
                    resize: function(a) {
                        return function(b) {
                            a.reset()
                        }
                    }(this),
                    panedown: function(a) {
                        return function(b) {
                            return a.sliderY = (b.offsetY || b.originalEvent.layerY) - .5 * a.sliderHeight, a.scroll(), a.events.down(b), !1
                        }
                    }(this),
                    scroll: function(a) {
                        return function(b) {
                            a.updateScrollValues(), a.isBeingDragged || (a.iOSNativeScrolling || (a.sliderY = a.sliderTop, a.setOnScrollStyles()), null != b && (a.contentScrollTop >= a.maxScrollTop ? (a.options.preventPageScrolling && a.preventScrolling(b, g), a.prevScrollTop !== a.maxScrollTop && a.$el.trigger("scrollend")) : 0 === a.contentScrollTop && (a.options.preventPageScrolling && a.preventScrolling(b, w), 0 !== a.prevScrollTop && a.$el.trigger("scrolltop"))))
                        }
                    }(this),
                    wheel: function(a) {
                        return function(b) {
                            var c;
                            if (null != b) return c = b.delta || b.wheelDelta || b.originalEvent && b.originalEvent.wheelDelta || -b.detail || b.originalEvent && -b.originalEvent.detail, c && (a.sliderY += -c / 3), a.scroll(), !1
                        }
                    }(this),
                    enter: function(a) {
                        return function(b) {
                            var c;
                            if (a.isBeingDragged) return 1 !== (b.buttons || b.which) ? (c = a.events)[w].apply(c, arguments) : void 0
                        }
                    }(this)
                }
            }, j.prototype.addEvents = function() {
                var a;
                this.removeEvents(), a = this.events, this.options.disableResize || this.win.bind(s, a[s]), this.iOSNativeScrolling || (this.slider.bind(l, a[g]), this.pane.bind(l, a[r]).bind("" + p + " " + f, a[x])), this.$content.bind("" + t + " " + p + " " + f + " " + v, a[t])
            }, j.prototype.removeEvents = function() {
                var a;
                a = this.events, this.win.unbind(s, a[s]), this.iOSNativeScrolling || (this.slider.unbind(), this.pane.unbind()), this.$content.unbind("" + t + " " + p + " " + f + " " + v, a[t])
            }, j.prototype.generate = function() {
                var a, c, d, f, g, h, i;
                return f = this.options, h = f.paneClass, i = f.sliderClass, a = f.contentClass, (g = this.$el.children("." + h)).length || g.children("." + i).length || this.$el.append('<div class="' + h + '"><div class="' + i + '" /></div>'), this.pane = this.$el.children("." + h), this.slider = this.pane.find("." + i), 0 === e && C() ? (d = b.getComputedStyle(this.content, null).getPropertyValue("padding-right").replace(/[^0-9.]+/g, ""), c = {
                    right: -14,
                    paddingRight: +d + 14
                }) : e && (c = {
                    right: -e
                }, this.$el.addClass("has-scrollbar")), null != c && this.$content.css(c), this
            }, j.prototype.restore = function() {
                this.stopped = !1, this.iOSNativeScrolling || this.pane.show(), this.addEvents()
            }, j.prototype.reset = function() {
                var a, b, c, f, g, h, i, j, k, l, m, n;
                return this.iOSNativeScrolling ? void(this.contentHeight = this.content.scrollHeight) : (this.$el.find("." + this.options.paneClass).length || this.generate().stop(), this.stopped && this.restore(), a = this.content, f = a.style, g = f.overflowY, d && this.$content.css({
                    height: this.$content.height()
                }), b = a.scrollHeight + e, l = parseInt(this.$el.css("max-height"), 10), l > 0 && (this.$el.height(""), this.$el.height(a.scrollHeight > l ? l : a.scrollHeight)), i = this.pane.outerHeight(!1), k = parseInt(this.pane.css("top"), 10), h = parseInt(this.pane.css("bottom"), 10), j = i + k + h, n = Math.round(j / b * j), n < this.options.sliderMinHeight ? n = this.options.sliderMinHeight : null != this.options.sliderMaxHeight && n > this.options.sliderMaxHeight && (n = this.options.sliderMaxHeight), g === t && f.overflowX !== t && (n += e), this.maxSliderTop = j - n, this.contentHeight = b, this.paneHeight = i, this.paneOuterHeight = j, this.sliderHeight = n, this.paneTop = k, this.slider.height(n), this.events.scroll(), this.pane.show(), this.isActive = !0, a.scrollHeight === a.clientHeight || this.pane.outerHeight(!0) >= a.scrollHeight && g !== t ? (this.pane.hide(), this.isActive = !1) : this.el.clientHeight === a.scrollHeight && g === t ? this.slider.hide() : this.slider.show(), this.pane.css({
                    opacity: this.options.alwaysVisible ? 1 : "",
                    visibility: this.options.alwaysVisible ? "visible" : ""
                }), c = this.$content.css("position"), ("static" === c || "relative" === c) && (m = parseInt(this.$content.css("right"), 10), m && this.$content.css({
                    right: "",
                    marginRight: m
                })), this)
            }, j.prototype.scroll = function() {
                return this.isActive ? (this.sliderY = Math.max(0, this.sliderY), this.sliderY = Math.min(this.maxSliderTop, this.sliderY), this.$content.scrollTop(this.maxScrollTop * this.sliderY / this.maxSliderTop), this.iOSNativeScrolling || (this.updateScrollValues(), this.setOnScrollStyles()), this) : void 0
            }, j.prototype.scrollBottom = function(a) {
                return this.isActive ? (this.$content.scrollTop(this.contentHeight - this.$content.height() - a).trigger(p), this.stop().restore(), this) : void 0
            }, j.prototype.scrollTop = function(a) {
                return this.isActive ? (this.$content.scrollTop(+a).trigger(p), this.stop().restore(), this) : void 0
            }, j.prototype.scrollTo = function(a) {
                return this.isActive ? (this.scrollTop(this.$el.find(a).get(0).offsetTop), this) : void 0
            }, j.prototype.stop = function() {
                return y && this.scrollRAF && (y(this.scrollRAF), this.scrollRAF = null), this.stopped = !0, this.removeEvents(), this.iOSNativeScrolling || this.pane.hide(), this
            }, j.prototype.destroy = function() {
                return this.stopped || this.stop(), !this.iOSNativeScrolling && this.pane.length && this.pane.remove(), d && this.$content.height(""), this.$content.removeAttr("tabindex"), this.$el.hasClass("has-scrollbar") && (this.$el.removeClass("has-scrollbar"), this.$content.css({
                    right: ""
                })), this
            }, j.prototype.flash = function() {
                return !this.iOSNativeScrolling && this.isActive ? (this.reset(), this.pane.addClass("flashed"), setTimeout(function(a) {
                    return function() {
                        a.pane.removeClass("flashed")
                    }
                }(this), this.options.flashDelay), this) : void 0
            }, j
        }(), a.fn.nanoScroller = function(b) {
            return this.each(function() {
                var c, d;
                if ((d = this.nanoscroller) || (c = a.extend({}, z, b), this.nanoscroller = d = new q(this, c)), b && "object" == typeof b) {
                    if (a.extend(d.options, b), null != b.scrollBottom) return d.scrollBottom(b.scrollBottom);
                    if (null != b.scrollTop) return d.scrollTop(b.scrollTop);
                    if (b.scrollTo) return d.scrollTo(b.scrollTo);
                    if ("bottom" === b.scroll) return d.scrollBottom(0);
                    if ("top" === b.scroll) return d.scrollTop(0);
                    if (b.scroll && b.scroll instanceof a) return d.scrollTo(b.scroll);
                    if (b.stop) return d.stop();
                    if (b.destroy) return d.destroy();
                    if (b.flash) return d.flash()
                }
                return d.reset()
            })
        }, a.fn.nanoScroller.Constructor = q
    }(jQuery, window, document);