;(function(global) {

	var PREFIX = 'hl-';

	var GRAMMAR = {
		"in-quotes": "(\"[^\"].*?\")",
		"in-parentheses": "(\\(.*\\))",
		"in-single-quotes": "('[^\'].*?')",
		"common-word": {
			"regexp": "(\\b(?:akasema|alikuwa|alisema|baada|basi|bila|cha|chini|hadi|hapo|hata|hivyo|hiyo|huku|huo|ili|ilikuwa|juu|kama|karibu|katika|kila|kima|kisha|kubwa|kutoka|kuwa|kwa|kwamba|kwenda|kwenye|la|lakini|mara|mdogo|mimi|mkubwa|mmoja|moja|muda|mwenye|na|naye|ndani|ng|ni|nini|nonkungu|pamoja|pia|sana|sasa|sauti|tafadhali|tena|tu|vile|wa|wakati|wake|walikuwa|wao|watu|wengine|wote|ya|yake|yangu|yao|yeye|yule|za|zaidi|zake)\\b)",
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
