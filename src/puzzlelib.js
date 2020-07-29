/* eslint-disable */
!(function (t) {
  var e = {};
  function i(s) {
    if (e[s]) return e[s].exports;
    var n = (e[s] = { i: s, l: !1, exports: {} });
    return t[s].call(n.exports, n, n.exports, i), (n.l = !0), n.exports;
  }
  (i.m = t),
    (i.c = e),
    (i.d = function (t, e, s) {
      i.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: s });
    }),
    (i.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (i.t = function (t, e) {
      if ((1 & e && (t = i(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var s = Object.create(null);
      if (
        (i.r(s),
        Object.defineProperty(s, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var n in t)
          i.d(
            s,
            n,
            function (e) {
              return t[e];
            }.bind(null, n)
          );
      return s;
    }),
    (i.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return i.d(e, "a", e), e;
    }),
    (i.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (i.p = ""),
    i((i.s = 0));
})([
  function (t, e, i) {
    "use strict";
    i.r(e);
    class s {
      constructor(t, e) {
        (this.isEmpty = !1),
          (this.index = e),
          (this.puzzle = t),
          (this.width = this.puzzle.width / this.puzzle.dimmension),
          (this.height = this.puzzle.height / this.puzzle.dimmension),
          (this.el = this.createDiv()),
          t.el.appendChild(this.el),
          this.index !== this.puzzle.dimmension * this.puzzle.dimmension - 1
            ? (this.setImage(), this.setPosition(this.index))
            : (this.isEmpty = !0);
      }
      createDiv() {
        const t = document.createElement("div");
        return (
          (t.style.backgroundSize = `${this.puzzle.width}px ${this.puzzle.height}px`),
          (t.style.border = "1px solid #FFF"),
          (t.style.position = "absolute"),
          (t.onclick = () => {
            const t = this.puzzle.findPosition(this.index),
              e = this.puzzle.findEmpty(),
              { x: i, y: s } = this.getXY(t),
              { x: n, y: h } = this.getXY(e);
            (i !== n && s !== h) ||
              (1 !== Math.abs(i - n) && 1 !== Math.abs(s - h)) ||
              (this.puzzle.numberOfMovements++,
              this.puzzle.onSwap &&
                "function" == typeof this.puzzle.onSwap &&
                this.puzzle.onSwap(this.puzzle.numberOfMovements),
              this.puzzle.swapCells(t, e, !0));
          }),
          t
        );
      }
      setImage() {
        const { x: t, y: e } = this.getXY(this.index),
          i = this.width * t,
          s = this.height * e;
        (this.el.style.width = `${this.width}px`),
          (this.el.style.height = `${this.height}px`),
          (this.el.style.backgroundImage = `url(${this.puzzle.imageSrc})`),
          (this.el.style.backgroundPosition = `-${i}px -${s}px`);
      }
      setPosition(t, e, i) {
        const { left: s, top: n } = this.getPositionFromIndex(t),
          { left: h, top: l } = this.getPositionFromIndex(i);
        e
          ? s !== h
            ? this.animate("left", h, s)
            : n !== l && this.animate("top", l, n)
          : ((this.el.style.left = `${s}px`), (this.el.style.top = `${n}px`));
      }
      animate(t, e, i) {
        let s = (10 * Math.abs(i - e)) / 200,
          n = setInterval(() => {
            e < i
              ? (e = Math.min(i, e + s)) >= i && clearInterval(n)
              : (e = Math.max(i, e - s)) <= i && clearInterval(n),
              (this.el.style[t] = e + "px");
          }, 10);
      }
      getPositionFromIndex(t) {
        const { x: e, y: i } = this.getXY(t);
        return { left: this.width * e, top: this.height * i };
      }
      getXY(t) {
        return {
          x: t % this.puzzle.dimmension,
          y: Math.floor(t / this.puzzle.dimmension),
        };
      }
    }
    i.d(e, "default", function () {
      return n;
    });
    class n {
      constructor(t, e, i, s = 3) {
        (this.parentEl = t),
          (this.dimmension = s),
          (this.imageSrc = e),
          (this.width = i),
          (this.cells = []),
          (this.shuffling = !1),
          (this.numberOfMovements = 0),
          (this.onFinished = () => {}),
          (this.onSwap = () => {}),
          this.init();
        const n = new Image();
        (n.onload = () => {
          console.log(n.width, n.height),
            (this.height = (n.height * this.width) / n.width),
            (this.el.style.width = `${this.width}px`),
            (this.el.style.height = `${this.height}px`),
            this.setup();
        }),
          (n.src = this.imageSrc);
      }
      init() {
        (this.el = this.createWrapper()), this.parentEl.appendChild(this.el);
      }
      createWrapper() {
        const t = document.createElement("div");
        return (t.style.position = "relative"), (t.style.margin = " 0 auto"), t;
      }
      setup() {
        for (let t = 0; t < this.dimmension * this.dimmension; t++)
          this.cells.push(new s(this, t));
        this.shuffle();
      }
      shuffle() {
        this.shuffling = !0;
        for (let t = this.cells.length - 1; t > 0; t--) {
          const e = Math.floor(Math.random() * (t + 1));
          this.swapCells(t, e);
        }
        this.shuffling = !1;
      }
      swapCells(t, e, i) {
        this.cells[t].setPosition(e, i, t),
          this.cells[e].setPosition(t),
          ([this.cells[t], this.cells[e]] = [this.cells[e], this.cells[t]]),
          !this.shuffling &&
            this.isAssembled() &&
            this.onFinished &&
            "function" == typeof this.onFinished &&
            this.onFinished.call(this);
      }
      isAssembled() {
        for (let t = 0; t < this.cells.length; t++)
          if (t !== this.cells[t].index)
            return (
              6 === t &&
              8 === this.cells[t].index &&
              this.cells[t + 1].index === t + 1
            );
        return !0;
      }
      findPosition(t) {
        return this.cells.findIndex((e) => e.index === t);
      }
      findEmpty() {
        return this.cells.findIndex((t) => t.isEmpty);
      }
    }
    window.PicturePuzzle = window.PicturePuzzle || n;
  },
]);
