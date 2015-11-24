# Description:
#   Tools for interacting with the ThronesDB API.
#
# Commands:
#   <card name> - search for a card with that name in the ThronesDB API (braces necessary)

Fuse = require 'fuse.js'

FACTIONS = {
	'stark': { "name": 'House Stark', "color": '#b9b23a', "icon": "House Stark" },
	'targaryen': { "name": 'House Targaryen', "color": '#ff4500', "icon": "House Targaryen" },
	'baratheon': { "name": 'House Baratheon', "color": '#9e564e', "icon": "House Baratheon" },
	'greyjoy': { "name": 'House Greyjoy', "color": '#4169e1', "icon": "House Greyjoy" },
	'lannister': { "name": 'House Lannister', "color": '#32cd32', "icon": "House Lannister" },
	'martell': { "name": 'House Martell', "color": '#715778', "icon": "House Martell" },
	'nightswatch': { "name": 'The Night\'s Watch', "color": '#8a2be2', "icon": "The Night's Watch" },
	'tyrell': { "name": 'House Tyrell', "color": '#dc143c', "icon": "House Tyrell" },
	'neutral': { "name": 'Neutral', "color": '#808080', "icon": "Neutral" }
}

ABBREVIATIONS = {
}

formatCard = (card) ->
	name = card.name
	if card.uniqueness
		name = "◆ " + name

	attachment = {
		'fallback': name,
		'title': name,
		'name_link': card.url,
		'mrkdwn_in': [ 'text', 'author_name' ]
	}

	attachment['text'] = ''

	typeline = ''
	if card.traits? and card.traits != ''
		typeline += "*#{card.type_name}*: #{card.traits}"
	else
		typeline += "*#{card.type_name}*"

	attachment['text'] += typeline + "\n\n"
	if card.text?
		attachment['text'] += emojifyNRDBText card.text
	else
		attachment['text'] += ''

	faction = FACTIONS[card.faction_code]

	if faction?
    attachment['author_name'] = "#{card.setname} / #{faction.icon}"

	return attachment

emojifyNRDBText = (text) ->
	text = text.replace /\[military\]/g, "military"
	text = text.replace /\[power\]/g, "power"
	text = text.replace /\[intrigue\]/g, "intrigue"
	text = text.replace /<b>/g, "*"
	text = text.replace /<\/b>/g, "*"
	text = text.replace /&ndash/g, "–"
	text = text.replace /<strong>/g, "*"
	text = text.replace /<\/strong>/g, "*"
	text = text.replace /<abbr>/g, "_"
	text = text.replace /<\/abbr>/g, "_"
	text = text.replace /<i>/g, "_"
	text = text.replace /<\/i>/g, "_"

	return text

compareCards = (card1, card2) ->
	if card1.name < card2.name
		return -1
	else if card1.name > card2.name
		return 1
	else
		return 0

module.exports = (robot) ->
	robot.http("http://thronesdb.com/api/public/cards/")
		.get() (err, res, body) ->
			unsortedCards = JSON.parse body
			robot.brain.set 'thronescards', unsortedCards.sort(compareCards)

	robot.hear /\<([^\]]+)\>/, (res) ->
		query = res.match[1]
		cards = robot.brain.get('thronescards')

		query = query.toLowerCase()

		fuseOptions =
			caseSensitive: false
			includeScore: false
			shouldSort: true
			threshold: 0.6
			location: 0
			distance: 100
			maxPatternLength: 32
			keys: ['name']

		fuse = new Fuse cards, fuseOptions
		results = fuse.search(query)

		if results? and results.length > 0
			formattedCard = formatCard results[0]
			robot.emit 'slack.attachment',
				message: "Found card:"
				content: formattedCard
				channel: res.message.room
		else
			res.send "No card result found for \"" + res.match[1] + "\"."
