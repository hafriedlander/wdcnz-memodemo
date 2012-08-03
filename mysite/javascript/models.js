
var memo = memo || {};

(function(){
	memo.Memo = Backbone.Model.extend({
		idAttribute: 'ID',
		urlRoot: 'rest/Memo',
		defaults: {'$type': 'Memo'},

		classAttr: function(){
			var classes = [];

			var c = this.constructor;
			while (c && c.prototype && c.prototype.defaults && c.prototype.defaults['$type']) {
				classes[classes.length] = c.prototype.defaults['$type'];
				c = c.__super__.constructor;
			}

			return classes.join(' ').toLowerCase();
		}
	});

	memo.Memos = Backbone.Collection.extend({
		model: memo.Memo,
		url: 'rest/Memo',

		// Parse the response from the server
		parse: function(resp, xhr) {
			var res = [];
			$.each(resp.Items, function(){
				// Get the class type
				var type = this['$type']; delete this['$type'];
				// Create & store the new instance
				res.push(new memo[type](this));
			});

			return res;
		}
	});

	memo.ImageMemo = memo.Memo.extend({
		defaults: {'$type': 'ImageMemo'}
	});

	var converter = new Showdown.converter();

	memo.TextMemo = memo.Memo.extend({
		defaults: {'$type': 'TextMemo'},

		getNoteHtml: function(){
			return converter.makeHtml(this.get('Note'));
		}

	});
})()

