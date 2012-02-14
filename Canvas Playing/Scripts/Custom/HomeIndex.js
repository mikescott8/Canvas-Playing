(function() {
  var circleItem, drawnItem, game, _ref,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  drawnItem = (function() {

    function drawnItem() {
      this.x = 5;
      this.y = 5;
    }

    drawnItem.prototype.drawItem = function(ctxt) {
      console.log('base drawItem at ' + this.x.toString() + ',' + this.y.toString());
      return ctxt;
    };

    drawnItem.prototype.moveBy = function(x, y) {
      this.x = this.x + x;
      this.y = this.y + y;
      this.checkBounds();
      return this;
    };

    drawnItem.prototype.checkBounds = function() {
      if (!(this.x < 500)) this.x = 0;
      if (!(this.y < 500)) this.y = 0;
      return this;
    };

    return drawnItem;

  })();

  circleItem = (function(_super) {

    __extends(circleItem, _super);

    function circleItem() {
      circleItem.__super__.constructor.apply(this, arguments);
    }

    circleItem.prototype.drawItem = function(ctxt) {
      console.log('circleItem.drawItem');
      ctxt.fillStyle = "rgb(500,0,0)";
      ctxt.fillRect(this.x, this.y, 5, 5);
      return circleItem.__super__.drawItem.call(this, ctxt);
    };

    return circleItem;

  })(drawnItem);

  game = (function() {

    game.ball;

    function game(ctxt) {
      this.ctxt = ctxt;
      this.moveBall = __bind(this.moveBall, this);
      this.ball = new circleItem();
      this.ball.moveBy(20, 20);
      this.ball.drawItem(this.ctxt);
    }

    game.prototype.moveBall = function() {
      console.log('game moveBall');
      this.ball.moveBy(13, 9);
      this.ball.drawItem(this.ctxt);
      setTimeout(this.moveBall, 1000);
      return this;
    };

    return game;

  })();

  this.game = (_ref = window.game) != null ? _ref : {};

  jQuery(function() {
    var canvas, context;
    canvas = $("#myCanvas").get(0);
    context = canvas.getContext('2d');
    this.game = new game(context);
    return this.game.moveBall();
  });

}).call(this);
