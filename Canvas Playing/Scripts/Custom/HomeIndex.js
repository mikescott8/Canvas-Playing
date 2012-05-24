(function() {
  var drawnItem, game, squareItem, _ref,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  drawnItem = (function() {
    var x, xDir, y, yDir;

    x = 0;

    y = 0;

    xDir = 1;

    yDir = 1;

    function drawnItem(x, y) {
      this.x = x;
      this.y = y;
    }

    drawnItem.prototype.drawItem = function(ctxt) {
      return ctxt;
    };

    drawnItem.prototype.moveBy = function(x, y) {
      this.x = this.x + (x * this.xDir);
      this.y = this.y + (y * this.yDir);
      this.checkBounds();
      return this;
    };

    drawnItem.prototype.checkBounds = function() {
      var _ref, _ref2;
      if (!((0 < (_ref = this.x) && _ref < 500))) {
        this.xDir * -1;
        if (this.x < 0) {
          this.x = 0;
          this.changeXDir();
        }
        if (this.x > 500) {
          this.x = 500;
          this.changeXDir();
        }
      }
      if (!((0 < (_ref2 = this.y) && _ref2 < 500))) {
        this.yDir * -1;
        if (this.y < 0) {
          this.y = 0;
          this.changeYDir();
        }
        if (this.y > 500) {
          this.y = 500;
          this.changeYDir();
        }
      }
      return this;
    };

    drawnItem.prototype.changeXDir = function() {
      this.xDir = this.xDir * -1;
      return this.xDir;
    };

    drawnItem.prototype.changeYDir = function() {
      this.yDir = this.yDir * -1;
      return this.yDir;
    };

    return drawnItem;

  })();

  squareItem = (function(_super) {
    var fillStyle, height, width;

    __extends(squareItem, _super);

    width = 3;

    height = 3;

    fillStyle = 'rgb(500,0,0)';

    function squareItem(width, height) {
      this.width = width;
      this.height = height;
      squareItem.__super__.constructor.apply(this, arguments);
    }

    squareItem.prototype.drawItem = function(ctxt) {
      ctxt.fillStyle = this.fillStyle;
      ctxt.fillRect(this.x, this.y, this.width, this.height);
      return squareItem.__super__.drawItem.call(this, ctxt);
    };

    return squareItem;

  })(drawnItem);

  game = (function() {

    function game(ctxt) {
      this.ctxt = ctxt;
      this.removeAll = __bind(this.removeAll, this);
      this.removeBall = __bind(this.removeBall, this);
      this.addBall = __bind(this.addBall, this);
      this.clearScreen = __bind(this.clearScreen, this);
      this.toggleActive = __bind(this.toggleActive, this);
      this.moveItem = __bind(this.moveItem, this);
      this.updateBoard = __bind(this.updateBoard, this);
      this.moveMax = 20;
      this.moveTime = 100;
      this.items = [];
      this.addBall();
      this.addBall();
      this.addBall();
    }

    game.prototype.updateBoard = function() {
      var item, _i, _len, _ref;
      _ref = this.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        this.moveItem(item);
      }
      if (this.active) setTimeout(this.updateBoard, this.moveTime);
      return this;
    };

    game.prototype.moveItem = function(item) {
      var xMove, yMove;
      xMove = Math.floor(Math.random() * this.moveMax);
      yMove = Math.floor(Math.random() * this.moveMax);
      item.moveBy(xMove, yMove);
      return item.drawItem(this.ctxt);
    };

    game.prototype.toggleActive = function() {
      this.active = !this.active;
      if (this.active) this.updateBoard();
      return this;
    };

    game.prototype.clearScreen = function() {
      this.ctxt.clearRect(0, 0, 500, 500);
      return this;
    };

    game.prototype.addBall = function() {
      var b, g, height, item, r, width, x, y;
      width = (Math.floor(Math.random() * 12)) + 5;
      height = (Math.floor(Math.random() * 12)) + 5;
      item = new squareItem(width, height);
      r = Math.floor(Math.random() * 255);
      g = Math.floor(Math.random() * 255);
      b = Math.floor(Math.random() * 255);
      item.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
      x = Math.floor(Math.random() * 500);
      y = Math.floor(Math.random() * 500);
      item.x = x;
      item.y = y;
      item.xDir = x % 2 === 0 ? 1 : -1;
      item.yDir = y % 2 === 0 ? 1 : -1;
      this.items.push(item);
      return this.items;
    };

    game.prototype.removeBall = function() {
      return this.items.pop();
    };

    game.prototype.removeAll = function() {
      var _results;
      _results = [];
      while (this.items.length !== 0) {
        _results.push(this.items.pop());
      }
      return _results;
    };

    return game;

  })();

  this.game = (_ref = window.game) != null ? _ref : {};

  jQuery(function() {
    var canvas, context;
    canvas = $("#myCanvas").get(0);
    context = canvas.getContext('2d');
    this.game = new game(context);
    $('#btnActive').on('click', this.game.toggleActive);
    $('#btnClear').on('click', this.game.clearScreen);
    $('#btnAdd').on('click', this.game.addBall);
    $('#btnRemove').on('click', this.game.removeBall);
    return $('#btnRemoveAll').on('click', this.game.removeAll);
  });

}).call(this);
