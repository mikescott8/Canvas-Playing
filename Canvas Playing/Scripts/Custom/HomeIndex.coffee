class drawnItem
	x = 0
	y = 0
	xDir = 1
	yDir = 1

	constructor: (@x, @y) ->

	drawItem: (ctxt) ->
		#console.log 'base drawItem at ' + @x.toString() + ',' + @y.toString()
		ctxt

	moveBy: (x,y) ->
		#console.log 'base moveBy ' + x + ',' + y
		@x = @x + (x * @xDir)
		@y = @y + (y * @yDir)
		@checkBounds()
		@

	checkBounds: ->
		#console.log 'checkBounds ' + @x + ',' + @y
		if !(0 < @x  < 500)
			@xDir * -1
			if @x < 0
				@x = 0
				@changeXDir()
			if @x > 500
				@x = 500
				@changeXDir()
		if !(0 < @y  < 500)
			@yDir * -1
			if @y < 0
				@y = 0
				@changeYDir()
			if @y > 500
				@y = 500
				@changeYDir()
		#console.log 'checkBounds ' + @x + ',' + @y
		@

	changeXDir: () ->
		@xDir = @xDir * -1
		@xDir

	changeYDir: () ->
		@yDir = @yDir * -1
		@yDir

class squareItem extends drawnItem
	width = 3
	height = 3
	fillStyle = 'rgb(500,0,0)'

	constructor: (@width, @height) ->
		super

	drawItem: (ctxt) ->
		#console.log 'drawItem'
		ctxt.fillStyle = @fillStyle
		ctxt.fillRect @x, @y, @width, @height
		super ctxt


class game
	constructor: (@ctxt) ->
		@moveMax=20
		@moveTime = 100

		@items = []
		@addBall()
		@addBall()
		@addBall()

	updateBoard: () =>
		#console.log 'updateBoard'
		@moveItem item for item in @items

		if @active 
			setTimeout @updateBoard, @moveTime
		@

	moveItem: (item) =>
		#console.log 'game moveItem'
		#console.log @moveMax

		xMove = Math.floor (Math.random() * @moveMax)
		yMove = Math.floor (Math.random() * @moveMax)

		item.moveBy xMove, yMove
		item.drawItem @ctxt
	
	toggleActive: =>
		@active = !@active
		if @active 
			@updateBoard()
		@

	clearScreen: =>
		@ctxt.clearRect 0, 0, 500, 500
		@

	addBall: =>
		width = (Math.floor (Math.random() * 12)) + 5
		height = (Math.floor (Math.random() * 12)) + 5
		
		item = new squareItem width, height

		r = Math.floor (Math.random() * 255)
		g = Math.floor (Math.random() * 255)
		b = Math.floor (Math.random() * 255)

		item.fillStyle = "rgb(#{r}, #{g}, #{b})"

		x = Math.floor (Math.random() * 500)
		y = Math.floor (Math.random() * 500)

		item.x = x
		item.y = y
		item.xDir = if (x % 2 == 0) then 1 else -1
		#console.log item.xDir
		item.yDir = if (y % 2 == 0) then 1 else -1
		#console.log item.yDir

		#console.log item
		@items.push item
		@items

	removeBall: =>
		@items.pop()

	removeAll: =>
		@items.pop() while @items.length != 0

@game = window.game ? {}

jQuery ->
	canvas = $("#myCanvas").get 0
	context = canvas.getContext('2d')

	@game = new game(context)

	$('#btnActive').on 'click', @game.toggleActive
	$('#btnClear').on 'click', @game.clearScreen
	$('#btnAdd').on 'click', @game.addBall
	$('#btnRemove').on 'click', @game.removeBall
	$('#btnRemoveAll').on 'click', @game.removeAll
