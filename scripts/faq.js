// Description:
//   Get FAQ information on a card.
//
// Commands:
//   FAQ card> - Output the rules for a card.
//
// Author:
//   yeoda87

module.exports = function (robot) {
	// Index of card names and FAQ values.
	var cards = {
		'noise': '• Cards trashed by Noise’s ability are placed facedown in Archives.',
		'demolition run': '• The Runner can trash an agenda accessed with Demolition Run, instead of stealing it.',
		'djinn': '• The Runner cannot move other installed programs to Djinn when it is installed.\n• When the Runner installs a program, he has the choice of installing it directly into his rig or on Djinn. He cannot moveprograms onto Djinn at a later point.',
		'medium': '•	Before accessing cards from R&D at step 4.5 of a run, the Runner chooses how many cards he wants to access when using Medium.',		
		'parasite': '•	Parasite cannot be hosted on Djinn. A card or counter can only be hosted in one place at a time, and Parasite has the restriction that it must be installed on a piece of ice.\n•	If a piece of ice hosting Parasite is derezzed, the Parasite continues to collect virus tokens, but the hosting ice has no strength while derezzed and therefore cannot be trashed by Parasite unless it is rezzed again.',
		'wyrm': '• The Runner can only use Wyrm to lower the strength of acurrently encountered piece of ice, and only if Wyrm is of equal or higher strength than that ice.',
		'account siphon': '• The Runner can choose to not use the ability on Account Siphon when the run is successful. If he does, he does not take any tags.\n• If the Runner ends up running successfully on another server than HQ, the “If successful...” effect on Account Siphon cannot be triggered.',
		'forged activation orders': '• The Corp cannot rez Akitaro Watanabe in response to a Forged Activation Orders being played. The effect of Forged Activation Orders is immediately resolved unless prevented or avoided.',
		'femme fatale': '•	Femme Fatale does not need to match the strength of a piece of ice in order to bypass it.\n•	The Runner can spend the credit from Cyberfeeder to pay for the bypass ability.\n• If Femme Fatale is uninstalled, the Runner cannot bypass the ice chosen by the Femme Fatale when it was installed; the ability is no longer active since the card is no longer active. Even if that copy of Femme Fatale is re-installed, it is treated as a ‘new’ copy and cannot bypass anything other than the ice chosen when it was just installed.',
		'sneakdoor beta': '•	If Sneakdoor Beta is trashed during a run it initiated, the run is still treated as a run on HQ if it is successful.',
		'bank job': '•	The Runner can take credits from Bank Job if he made a successful run on an empty server.',
		'net shield': '•	 Net Shield can prevent a single point of net damage each turn. It does not prevent all net damage from a single source.\n•	 Multiple Net Shields cannot prevent more damage.',
		"aesop's pawnshop": '•	 Aesop’s Pawnshop can only trash a single card each turn.',
		'aggressive secrertary': '•	 The programs are trashed at the same time.\n•	 The Corporation cannot choose to trash the same program more than once.',
		'chum': '•	 If the Runner jacks out immediately after encountering a Chum and not breaking its subroutine, the Runner does not take any damage.\n•	 Chum deals its net damage the first time either of the following occur during an encounter with the next piece of ice:\n 1) step 3.1 of a run closes and there is an unbroken subroutine on the piece of ice.\n2) step 3.1 of a run was skipped or did not resolve because the encounter/run ends (if 3.1 does not happen, no subroutines can be broken). This applies even if the piece of ice has 0 subroutines.',
		'tollbooth': '•	 If the Runner cannot pay 3:credits: when encountering Tollbooth, then the run ends without the Runner paying any credits.\n•	 The Runner must pay 3:credits: if he is able to do so, even by spending temporary credits (such as bad publicity credits)',
		'red herrings': '•	 If the Runner accesses an agenda from R&D and does not pay the additional cost to steal it, he does not reveal it to the Corp.',
		'aggressive negotiation': '•	 Aggressive Negotiation can be played if the Corp scores an agenda during step 1.1 of his draw phase.',
		'archer': '•	 If the Corp has an overadvanced Braintrust scored and rezzes Archer, forfeiting Braintrust, Archer gains the discounted rez cost.',
	
//Genesis Cycle

		'mandatory upgrades': '•	 If Mandatory Upgrades is forfeited, the Corp loses the additional click immediately. The Corp cannot choose to spend the additional click before the forfeit, except as part of his last action (at which point it has already been spent, and there is nothing left for the Corp to lose). Each player spends clicks from a pool of available clicks, and does not spend each click individually.',
		'tmi': '•	 TMI can be rezzed multiple times while the Runner approaches it. Timing structure of a run 2.3 is a window that allows the approached piece of ice to be rezzed. There is no limit to the number of times a Corp can rez an approached piece of ice if it is derezzed during this window.',
		'e3 feedback implants': '•	 e3 Feedback Implants triggers itself, so the Runner can break all subroutines on a bioroid ice by paying credits after spending a single click.\n•	 If multiple subroutines are broken at the same time, e3 Feedback Implants triggers once for each subroutine.',
		'fetal ai': '•	 The Runner must pay the 2:credits: to steal Fetal AI from Archives.',
		'trick of light': '•	 Trick of Light can only be used to move advancement tokens from an installed card to another installed card.',
		'sensei': '•	 Sensei only adds a single “End the run.” subroutine after all of the other subroutines on the next piece of ice, not a subroutine after each subroutine on the ice.',
		'nerve agent': '•	 Before accessing cards from HQ at step 4.5 of a run, the Runner chooses how many cards he wants to access when using Nerve Agent.',
		'snitch': '•	 If the outermost piece of ice on a server is unrezzed, the Runner can use Snitch to look at it and then decide to jack out before encountering it.\n•	 If the expose effect is prevented, the Runner can still jack out.',
		'dinosaurus': '•	 If there is an icebreaker already installed on Dinosaurus, the Runner can install a different icebreaker onto Dinosaurus, trashing the previously installed icebreaker.\n•	 If the Runner has no free MU but a Dinosaurus that is not currently hosting an icebreaker, he can install an icebreaker on Dinosaurus without trashing a program. Declaring where a program is hosted is part of the install action, and so the memory cost of the program does not need to be taken into account.',
		'personal workshop': '•	 The Runner may use the first ability on Personal Workshop to host a program or a piece of hardware on it. Cards hosted by this ability are not installed, and therefore are inactive.\n•	 The Runner can pay to remove a power counter from a card hosted on Personal Workshop as a paid ability. A program installed from Personal Workshop follows all the normal install rules; you must trash already installed programs to make room for the new one, if necessary.\n•	 When there are no power counters on a program or a piece of hardware that has a play restriction on it that cannot be met (such as a Parasite with no rezzed ice to be hosted on or a console when there is already a console installed), that program or piece of hardware is trashed instead of being installed.\n•	 If Personal Workshop is uninstalled, all cards hosted on it are trashed and all counters on those cards are removed.',
		'sunset': '•	 When resolving Sunset, the ice must be rearranged in such a way that the Runner knows which pieces of ice moved where. The Corp cannot conceal the rearrangement of the ice.',
		'oversight ai': '• Playing Oversight AI does not give Haas-Bioroid: Engineering the Future 1:credit: for an install.\n• Oversight AI is treated as a condition counter, and is no longer an operation, while it is active.\n• Oversight AI is trashed to the Archives if the host ice is uninstalled.',
		'false lead': '•	 If False Lead is forfeited and the Runner cannot lose 2 clicks, then he loses no clicks.\n•	The Corp can forfeit 2 copies of False Lead at 1.1 to force the Runner to lose 4 clicks. The turn immediately advances to the Runner’s discard phase.',
		'disrupter': '•	 Disrupter cannot be used once the Corp has bid during a trace attempt. It must be used when the trace is being initiated, and it prevents the entire trace before re-initiating it with a base trace strength of 0.',
		'andromeda': '•	 When the Runner mulligans with Andromeda, he draws another starting hand of 9 cards.',
		'midori': '•	 Ice that is swapped is installed, but the install cost of the ice being swapped does not have to be paid.\n•	 If the Runner exposes an ice with Snitch, Midori can still swap the ice unless the Runner jacks out with Snitch.\n•	 Midori must already be rezzed before the run in order to use her on the first piece of ice protecting the server.\n•	 Ice installed with Midori can be rezzed with the Amazon Industrial Zone.',
		
// Creation and Control

		'awakening center': '•	 Ice hosted on Awakening Center can be rezzed through other card effects, but a rezzed piece of ice cannot be encountered unless it was rezzed by Awakening Center.\n•	 Only one piece of hosted ice on Awakening Center can be encountered per run.\n•	 Ice on Awakening Center are in the server and do not count as ice protecting the server.',
		'scavenge': '•	 The Runner can trash a program as an additional cost, and then reinstall that same program.\n•	 As part of the install action, the Runner can trash installed programs.',
		'same old thing': '•	 The Runner cannot use Same Old Thing to play priority events.',
		
//Spin Cycle

		'pawn': '•	 Pawn can move onto a piece of ice hosting another caïssa, but other caïssa programs cannot move onto a piece of ice hosting Pawn.\n•	 The Runner cannot choose the Pawn that is being trashed as the program to install with Pawn because the trash and install are part of the same effect. ',
		'rook': '•	 Rook can only move to another server if there is another piece of ice in the same “row” as the ice Rook is hosted on, counting up from the innermost piece of ice protecting each server.\n•	 Rook cannot be hosted on a piece of ice if it is already hosted on another non-ice card.',
		'bishop': '•	 Bishop only moves from a piece of ice protecting a central server to a piece of ice protecting a remote server, and vice versa.\n•	 Bishop cannot be hosted on a piece of ice if it is already hosted on another non-ice card.',
		'recon': '•	 The Runner can jack out the first time he encounters a piece of ice with Recon, even if it was not the outermost piece of ice protecting the server.',
		'copycat': '•	 If a piece of ice is bypassed, Copycat still triggers since the ice is also passed.',
		'the cleaners': '•	 The Cleaners adds an additional point of damage to the source of the damage before any damage is prevented.\n•	 The Cleaners can add unpreventable meat damage if the source is also unpreventable.',
		'knight': '•	 Knight cannot move to a piece of ice that is vertically adjacent to the ice that it is hosted on. Knight can move to a piece of ice protecting any other server without restriction\n•	 Knight cannot be hosted on a piece of ice if it is already hosted on another non-ice card.',
		'accelerated diagnostics': '•	 Looking at the top 3 cards of R&D does not remove the cards from R&D. The cards are still in R&D and able to be affected by operations played with Accelerated Diagnostics.\n•	 Each operation the Corp looks at can be played in any order. The Corp does not have to play the topmost operation first.\n•	 When the Corp plays an operation, he fully resolves it before playing another one or trashing the rest of the cards.\n•	 If any of the 3 cards looked at are no longer in the top 3 positions of R&D (as determined when Accelerated Diagnostics was played), then those cards cannot be played.\n•	 The Corp can only play and look at the top 3 cards (as determined when Accelerated Diagnostic was played). Even if other cards are moved into the top 3, those cards are not eligible to be played/looked at by the Accelerated Diagnostics.\n•	 If one of the operations played shuffles R&D, the remainder of Accelerated Diagnostics’ effect is ignored.',
		'sundew': '•	 The credits are gained when the Runner spends a click to initiate an action that does not make a run on the server Sundew is installed in, before the click is resolved.\n•	 If the Runner plays a run event to initiate a run on the server Sundew is installed in, the Corp does not gain 2 credits.',
		'power shutdown': '•	 The Corp must choose X before trashing cards from R&D.\n•	 The Corp cannot choose a number that is greater than the number of cards in R&D.',
		'keyhole': '•	 The card trashed by Keyhole is trashed faceup.\n•	 If Keyhole is trashed during a run it initiated, the replacement effect is still resolved.',
		'rsvp': '•	 The Runner can spend zero credits after the subroutine on RSVP resolves to trash cards or trigger paid abilities.',
		'toshiyuki sakai': '•	 The card that is swapped with Toshiyuki Sakai is installed.',
		'restoring face': '•	 The Corp can trash a facedown card, but must reveal it to the Runner. The card is still trashed facedown.',
		'subliminal messaging': '•	 When adding a facedown Subliminal Messaging in Archives to HQ, the Corp must reveal it to the Runner.',
		'paintbrush': '•	 If the Runner does not make a run during the turn he uses Paintbrush, then the condition no longer applies and the ice loses any subtypes gained from Paintbrush.',
		'caprice nisei': '•	 Caprice Nisei’s ability triggers at step 4 of a run.\n•	 If there is no ice protecting the server, Caprice Nisei’s ability still triggers if she was rezzed before the run was initiated.',
		'napd contract': '•	 If the Runner accesses NAPD Contract from R&D and does not pay the additional cost to steal it, the NAPD Contract is not revealed.',
		
//Honor and Profit
		
		'tennin institute': '•	 The Tennin Institute cannot place advancement tokens on itself, since ID cards are not installed.\n•	 The Tennin Institute can place advancement tokens on Runner cards.',
		'tori hanzō': '•	 The first net damage can be prevented/avoided before Tori Hanzō’s replacement ability resolves.\n•	 If the first point of net damage is prevented by another effect or replaced with Tori Hanzō’s own effect, Tori Hanzō cannot trigger for the remainder of the run.',
		'ian stirling': '•	 If Iain Stirling has a negative :agenda: point total, then he has fewer :agenda: points than a Corp with 0 or more :agenda: points.',
		'security testing': '•	 If Security Testing is uninstalled after a server is chosen, its ability cannot replace accessing cards if the first run on the chosen server is successful; the ability is no longer active since the card is no longer active.',
		'q-coherence chip': '•	 Q-Coherence Chip is trashed whenever a program is trashed, even if the program was not installed.',
		'overmind': '•	 Overmind is installed, and its MU counts against your memory limit, when it gains power counters.',

//Lunar Cycle
		
		'taurus': '• If the Corp’s trace strength is 5 or greater, Taurus trashes a piece of hardware even if the trace was unsuccessful. This also applies to Gemini, Sagittarius, and Virgo.',
		'mother goddess': '• Mother Goddess only gains the subtypes of other ice while it is rezzed.',
		'bad times': '• The Runner can choose which memory to lose (e.g., memory from Deep Red).',
		'nasir meidan': '• Nasir loses any bad publicity credits he has when his ability resolves.\n• An ice is considered “just rezzed” for Nasir’s ability if it is rezzed at any time during timing structure 2 of a run.\n• Abilities which increase the rez cost of ice give Nasir more credits when his ability resolves. Likewise, abilities which reduce the rez cost of ice give Nasir fewer credits.\n• Abilities which require the Corp to pay an additional cost to rez ice do not give Nasir more credits when his ability resolves.',
		'the foundry': '• The Corp must find a piece of ice searched for, if able.',
		'targeted marketing': '• The Corp can choose to gain 10 credits when the Runner plays a current that trashes Targeted Marketing (if the current was named when Targeted Marketing was played).',
		'crisium grid': '• The run is considered neither successful nor unsuccessful for the purpose of future card abilities, even if Crisium Grid is later trashed. (e.g., Tennin Institute will trigger if the only successful run the Runner made was against a server with a rezzed Crisium Grid).\n• Restrictions which require a successful run (e.g. Emergency Shutdown, Data Leak Reversal) cannot be used if the successful run was against a server with a rezzed Crisium Grid.',
		'the supplier': '• The Runner cannot use any “when your turn begins” abilities on cards that are installed by The Supplier until his next turn.',
		'order of sol': '• The Runner gains 1 :credit: even during the resolution of another ability (e.g., paying the cost to play a Sure Gamble with 5 :credits: in the credit pool).',
		'hostile infrastructure': '• Hostile Infrastructure does not resolve when the Corp trashes his or her cards, even as a result of a Runner ability (e.g. Noise forcing the Corp to trash the top card of R&D).',
		'daily business show': '• If the Corp has multiple copies of Daily Business Show installed, the abilities stack on top of each other (e.g. two copies result in the Corp drawing 3 cards and adding 2 to the bottom of R&D)\n• The Corp does not have to tell the Runner whether he or she kept the first or second card drawn. The Corp must keep the two cards discrete from the rest of his or her hand, though, when deciding; the Corp can shuffle the two cards together to obscure which card was taken.',
		'ekomind': '• The memory limit from Ekomind is modified by other card abilities (e.g. a Runner with 5 cards in his or her grip and an Akamtasu Mem Chip installed has 6 :mu:).',
		'leela patel': '• If Leela steals an agenda while accessing multiple cards from HQ, she adds a card to HQ before continuing to access more cards.',
		'it department': '• Once triggered, IT Department results in a constant ability that continually tracks how many power counters are on the card.\n• IT Department always gives a piece of ice +1 strength due to the token spent to activate the card ability, even if there are no other counters left on the card or IT Department is no longer installed.\nExample: There are 5 tokens on IT Department. If the Corp spends 1 token, the ice has +5 strength (1 for the initial token + 4 for the token still on IT Department). If the Corp spends another token, now the ice has +8 strength (2 for the initial tokens + 3 for each of the two instances of the ability). If the Corp spent a third token, now the ice has only +9 strength (3 for the initial tokens + 2 for each of the three instances of the ability).',
		'self-destruct': '• Self-Destruct does not count itself as one of the cards trashed in order to establish the trace value.',
		
		//Order and Chaos
		
		'gagarin deep space': '• The Runner can decline to pay the 1 credit to access a card.',
		'glenn station': '• If Glenn Station is forfeited, any card hosted on it is trashed.\n• Glenn Station can only host a card through its click ability.',
		'mark yale': '• If the Corp spends an agenda counter for Mark Yale’s paid ability, he or she also gains 1 credit from his conditional ability.',
		'wormhole': '• The subroutine that resolves is not considered to be on Wormhole (e.g. when the Corp uses Wormhole with cards like Data Raven or Viktor 2.0, the power counters are placed on those cards and not Wormhole).',
		'housekeeping': '• If the Runner has 1 card in his or her grip and installs it, Housekeeping has no effect and does not prevent the install. (Only forced trashing through damage can result in a flatline.)',
		'the twins': '• The Runner cannot jack out before encountering the ice again.',
		'edward kim': '• If the first operation Edward Kim accesses is in Archives, then he cannot trash another operation with his ability that turn.',
		"i've had worse": '• The Runner trashes all cards from the damage before drawing for I’ve Had Worse.\n• I’ve Had Worse cannot prevent the Runner from being flatlined if the Runner takes more damage than the number of cards in his or her grip.',
		'itinerant protesters': '• The Corp does not lose the game if he or she has a negative hand size.',
		'eater': '• If the Runner access Archives after using Eater, all cards are turned faceup but no individual cards are accessed.',

//San San Cycle

		'enhanced vision': '• The revealed card is no longer revealed during the access phase; it immediately returns to its unrevealed state after the Corp shows the card to the Runner.',
		'turntable': '• Agendas switched with Turntable keep any hosted counters or cards on them, but their text is not active.',
		'allele repression': '• Allele Repression can add itself to HQ as part of the resolution of its effect.',
		'film critic': '• After Film Critic’s ‘when accessed’ ability resolves, any remaining ‘when accessed’ abilities are non-resolvable.\n• An agenda hosted on Film Critic is not considered to be stolen. An agenda added to the score area from Film Critic is not considered to be stolen.\n• The Runner cannot voluntarily trash an agenda hosted on Film Critic, even if the Runner accesses another agenda.\n• Film Critic can only host an agenda through its ‘when accessed’ ability.',
		'casting call': '• Agendas installed faceup with Casting Call are not active (unless those agendas can be installed faceup through their own abilities).\n• If the agenda hosting Casting Call is uninstalled, Casting Call is trashed.',
		'worlds plaza': '• Worlds Plaza may be accessed and trashed, thereby trashing all of its hosted cards, before the cards hosted on it are accessed.',
		
//Data and Destiny

		'archangel': '• When encountering an Archangel during access, the Runner follows timing step 3 of a run, ignoring the portions about approaching ice/the server.\n• If Archangel is encountered while accessed and it is moved from its position as determined when accessed (e.g., from R&D being shuffled during the encounter or from Archangel being trashed from HQ by Utopia Shard during the encounter), then the encounter immediately ends and any currently open paid ability windows close.\n• Archangel is not considered to be rezzed during its encounter, and cards that interact with rezzed cards, e.g., Datasucker, cannot affect it.',
		'ad blitz': '• The Corp must both install and rez any advertisements chosen by Ad Blitz.',
		'the all-seeing i': '• The Corp does not have to have a bad publicity in order to play The All-Seeing I.',
		'endless hunger': '• Endless Hunger can only break subroutines that read exactly “:subroutine: End the run.” It cannot break subroutines that use the words “end the run” as only part of its effect, e.g. on Tsurugi or Pop-up Window.',
		'hunting grounds': '• The prevent ability on Hunting Grounds is optional; because it can only be triggered “once per turn” it is the Runner’s choice as to when to trigger it.',
		'brain chip': '• If the Runner has negative :agenda points:, Brain Chip does not lower his or her hand size or :mu:: these cannot be increased by a negative number.',
		'always be running': '• Programs that make a run, such as Sneakdoor Beta, Keyhole, etc., fulfill the requirement to make a run on Always Be Running',
		
//Mumbad Cycle

	'test': 'waking up steve',

	};
	
	// Define the FAQ handler function.
	var listenForFAQ = robot.hear(/^FAQ (.*)$/i, function (res) {
		// The "query" is whatever text came after the "FAQ ".
		var query = res.match[1];
		
		// Trim any whitespace from the beginning and end of the query.
		query = query.trim();
		// Convert the query to lowercase.
		query = query.toLowerCase();
		// If an entry for `query` exists in the `cards` object, then output the
		// value for that entry.
		if (cards[query]) {
			// Send the value for the card.
			// * Note: We'll prefix every bullet point with "> " since Slack will
			//   then format it to like a quote (and it'll look a little
			//   fancier). *
			res.send(cards[query].replace(/•/g, '> •'));
		}
		// If no entry exists, send the "not found" message.
		else {
			res.send('Sorry, no entry for a card named “' + query + '” was found.');
		}
	});
	
	// Return the FAQ handler function.
	return listenForFAQ;
};
