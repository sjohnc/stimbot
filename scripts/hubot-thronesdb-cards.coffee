# Description:
#   Tools for interacting with the ThronesDB API.
#
# Commands:
#   <card name> - search for a card with that name in the ThronesDB API (braces necessary)

Fuse = require 'fuse.js'

FACTIONS = {
	'adam': { "name": 'Adam', "color": '#b9b23a', "icon": "Adam" },
	'anarch': { "name": 'Anarch', "color": '#ff4500', "icon": "Anarch" },
	'apex': { "name": 'Apex', "color": '#9e564e', "icon": "Apex" },
	'criminal': { "name": 'Criminal', "color": '#4169e1', "icon": "Criminal" },
	'shaper': { "name": 'Shaper', "color": '#32cd32', "icon": "Shaper" },
	'sunny-lebeau': { "name": 'Sunny Lebeau', "color": '#715778', "icon": "Sunny LeBeau" },
	'neutral': { "name": 'Neutral (runner)', "color": '#808080', "icon": "Neutral" },
	'haas-bioroid': { "name": 'Haas-Bioroid', "color": '#8a2be2', "icon": "Haas-Bioroid" },
	'jinteki': { "name": 'Jinteki', "color": '#dc143c', "icon": "Jinteki" },
	'nbn': { "name": 'NBN', "color": '#ff8c00', "icon": "NBN" },
	'weyland-consortium': { "name": 'Weyland Consortium', "color": '#326b5b', "icon": "Weyland" },
	'neutral': { "name": 'Neutral (corp)', "color": '#808080', "icon": "Neutral" }
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
		if card.factioncost?
			influencepips = ""
			i = card.factioncost
			while i--
				influencepips += '●'
			attachment['author_name'] = "#{card.setname} / #{faction.icon} #{influencepips}"
		else
			attachment['author_name'] = "#{card.setname} / #{faction.icon}"

		attachment['color'] = faction.color

	return attachment

emojifyNRDBText = (text) ->
	text = text.replace /\[military\]/g, ":credit:"
	text = text.replace /\[power\]/g, ":click:"
	text = text.replace /\[intrigue\]/g, ":trash:"
	text = text.replace /&ndash/g, "–"
	text = text.replace /<strong>/g, "*"
	text = text.replace /<\/strong>/g, "*"

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
			robot.brain.set 'cards', unsortedCards.sort(compareCards)

	robot.hear /\<([^\]]+)\>/, (res) ->
		query = res.match[1]
		cards = robot.brain.get('cards')

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
