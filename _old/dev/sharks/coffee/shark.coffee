log = (x) -> console.log x

class Main extends Backbone.View

	data: []
	headers: []

	initialize: () ->
		@setupViews()
		@fetchData()

	setupViews: () ->
		chart  = $('#chart')
		output = $('table#output')
		output_head = output.find "thead tr"
		output_body = output.find "tbody tr"

		hours = (num for num in [1..24])

		_.each hours, (hour) ->
			chart.append ich.bar_graph_item({ hour: hour })
			# output_head.append '<th>'+hour+'</th>'
			# output_body.append "<td data-hour='"+hour+"'>0</td>"

	fetchData: () ->
		$.get 'data/shark-attacks-pipe-delimited.txt', (data) => @parseData(data)

	parseData: (data) ->
		lines   = data.split(/\n/);
		headers = _.first(lines).split '|'
		lines   = _.rest lines
		_.each lines, (line) =>
			row = {}
			cells = line.split '|'
			_.each cells, (cell, x) ->
				if x? and x < cells.length then row[headers[x]] = cells[x]
			@data.push row
		@postProcess(@data)

	sanitizeText: (text) -> text

	postProcess: () ->
		# times = _.pluck @data, 'Time'
		# dates = _.pluck @data, 'Dates'

		hours = (num for num in [1..24])

		_.each times, (time) ->
			if (time.indexOf 'h' is 2) and (time.length is 5)
				hour = time.substr(0,2)
				min = time.substr(3)

		# Charts.drawChart(data, $('#d3'))

		data  = [3,7,9,1,4,6,8,2,5]
		w = 700
		h = 300
		max = d3.max(data)

		x  = d3.scale.linear().domain([0, data.length - 1]).range [0, w]
		y  = d3.scale.linear().domain([0, max]).range [h, 0]

		vis = d3.select('#d3')
			.append('svg:svg')
				.attr('width', w)
				.attr('height', h)

		# Add path layer
		vis.selectAll('path.line')
			.data([data])
				.enter()
					.append("svg:path")
						.attr("d", d3.svg.line()
						.x((d,i) -> x(i))
						.y(y))


$ ->
	main = new Main