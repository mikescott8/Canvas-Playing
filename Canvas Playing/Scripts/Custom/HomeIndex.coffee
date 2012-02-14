class drawnItem
	constructor: () ->
		@x = 5
		@y = 5

	drawItem: (ctxt) ->
		console.log 'base drawItem at ' + @x.toString() + ',' + @y.toString()
		ctxt

	moveBy: (x,y) ->
		#console.log 'base moveBy ' + @x + ',' + @y
		@x = @x + x
		@y = @y + y
		@checkBounds()
		@

	checkBounds: ->
		#console.log 'checkBounds ' + @x + ',' + @y
		unless @x < 500 then @x = 0
		unless @y < 500 then @y = 0
		#console.log 'checkBounds ' + @x + ',' + @y
		@

class circleItem extends drawnItem
	constructor: () ->
		super

	drawItem: (ctxt) ->
		console.log 'circleItem.drawItem'

		ctxt.fillStyle = "rgb(500,0,0)"
		ctxt.fillRect @x, @y, 5, 5
		super ctxt

class game
	@ball

	constructor: (@ctxt) ->
		@ball = new circleItem()
		@ball.moveBy 20,20
		@ball.drawItem @ctxt

	moveBall: () =>
		console.log 'game moveBall'
		@ball.moveBy 13, 9
		@ball.drawItem @ctxt
		setTimeout @moveBall, 1000
		@
	
@game = window.game ? {}

jQuery ->
	canvas = $("#myCanvas").get 0
	context = canvas.getContext('2d')

	@game = new game(context)
	@game.moveBall()
	#setInterval "window.game.moveBall()", 1000
