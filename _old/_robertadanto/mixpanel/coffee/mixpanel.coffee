log = (x) -> console.log x

class Main extends Backbone.View

	ids: []

	initialize: ->
		id_nums = (num for num in [1..300])
		_.each id_nums, (id) => 
			@ids.push (id + 10000)

		user = @createRandomUser()
		mixpanel.people.set(user)
		mixpanel.people.identify(user.id)

	registerUsers: ->
		users = []
		_.each @ids, (id) =>
			users.push @createRandomUser(id)
		
		_.each users, (user) ->
			mixpanel.register(user)

		_.each users, (user) ->
			mixpanel.people.identify(user.id)


	createRandomUser: (id) ->
		user = { "id" : String(id) }
		user.name = @randomName()
		user.age = @randomNum( 10, 50 )
		user.country = @randomItem( Data.props.country )
		user.device = @randomItem( Data.devices )
		return user

	randomName: ->
		first = @randomItem Data.first_names
		last = @randomItem Data.last_names
		return first + " " + last

	randomNum: (min = 0, max = 100) ->
		Math.floor(Math.random() * (max - min + 1)) + min

	randomItem: (list) ->
		list[ Math.floor(Math.random() * list.length) ]

	sendEvent: (args) ->

		#mixpanel.identify("10001");
		#mixpanel.track("Video Play", {"age": 13, "gender": "male"});



main = {}

$ ->
	main = new Main()