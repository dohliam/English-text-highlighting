;(function(global) {

	var PREFIX = 'hl-';

	var GRAMMAR = {
		"in-quotes": "(\"[^\"].*?\")",
		"in-parentheses": "(\\(.*\\))",
		"in-single-quotes": "('[^\'].*?')",
		"common-word": {
			"regexp": "((?:^|\\s)(?:alle|at|av|bare|begge|ble|blei|bli|blir|blitt|både|båe|da|de|deg|dei|deim|deira|deires|dem|den|denne|der|dere|deres|det|dette|di|din|disse|ditt|du|dykk|dykkar|då|eg|ein|eit|eitt|eller|elles|en|enn|er|et|ett|etter|for|fordi|fra|før|ha|hadde|han|hans|har|hennar|henne|hennes|her|hjå|ho|hoe|honom|hoss|hossen|hun|hva|hvem|hver|hvilke|hvilken|hvis|hvor|hvordan|hvorfor|i|ikke|ikkje|ingen|ingi|inkje|inn|inni|ja|jeg|kan|kom|korleis|korso|kun|kunne|kva|kvar|kvarhelst|kven|kvi|kvifor|man|mange|me|med|medan|meg|meget|mellom|men|mi|min|mine|mitt|mot|mykje|ned|no|noe|noen|noka|noko|nokon|nokor|nokre|nå|når|og|også|om|opp|oss|over|på|samme|seg|selv|si|sia|sidan|siden|sin|sine|sitt|sjøl|skal|skulle|slik|so|som|somme|somt|så|sånn|til|um|upp|ut|uten|var|vart|varte|ved|vere|verte|vi|vil|ville|vore|vors|vort|vår|være|vært|å)(?=$|\\s))",
			"insensitive": true
		},
		"number": "(\\d+(?:\\.\\d+)?)",
		"period": "(\\.)",
		"comma": "(,)",
		"semicolon": "(;)",
		"question-mark": "(\\?)",
		"exclamation-point": "(!)",
		"dash": "(--)",
	};

	function highlight(text) {

		var result = text.
			replace('<', '&lt;').
			replace('>', '&gt;').
			replace('&', '&amp;');

		var keys = Object.keys(GRAMMAR);

		for (var i = 0, len = keys.length; i < len; i ++) {

			var name = keys[i];
			var regexp;
			if (GRAMMAR[name].big) {
				regexp = new RegExp(GRAMMAR[name], 'g');
			} else {
				var str = GRAMMAR[name]['regexp'];
				var insensitive = GRAMMAR[name]['insensitive'];
				var flags = 'g';
				if (insensitive)
					flags += 'i';
				regexp = new RegExp(str, flags);
			}

			var openTag = '<span class="' + PREFIX + name + '">';
			var closeTag = '</span>';
			result = result.replace(regexp, openTag + '$1' + closeTag);

		}

		return result;

	}

	if (global.module && module.exports)
		module.exports = highlight;
	else
		global.highlight = highlight;

})(this);
