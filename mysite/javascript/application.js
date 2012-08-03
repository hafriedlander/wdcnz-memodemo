
var memo = memo || {};

(function($){

	$('body').entwine({
		onclick: function(e){
			if (!$(e.target).parents().andSelf().filter('.memo.active').length) {
				$('#panel').removeClass('active');
				$('#panel > .active').remove();
			}
		}
	});

	$('#panel *').entwine({
		getPanel: function() {
			return this.parents('#panel:first');
		}
	})

	$('#memos').entwine({
		Memos: null,

		setMemos: function(val){
			this._super(val);

			val.on('reset', function(){ this.render(); }, this);
			val.on('add', function(){ this.memoAdded(); }, this);
		},

		onadd: function(){
			this.setMemos(new memo.Memos());
			this.getMemos().fetch();
		},

		render: function(){
			this.empty();
			var list = this;

			var els = this.getMemos().each(function(memo){
				var li = $('<li class="'+memo.classAttr()+'"></li>').appendTo(list).setMemo(memo);
			});
		},

		onmousewheel: function(e) {
			var listheight = this.height(), panelheight = this.parent().height();

			var top = Math.max(panelheight - listheight, Math.min(0, parseInt(this.css('top')) + e.originalEvent.wheelDeltaY));
			this.css({top: top});

			return false;
		}
	});

	$('.memo').entwine({
		Memo: null,

		setMemo: function(memo){
			this._super(memo);
			memo.on('change', function(){ this.render(); }, this);

			this.render();
		},

		Template: '<h1 data-attr="Title"><%= get("Title") %></h1>',

		render: function(){
			this.html(_.template(this.getTemplate(), this.getMemo()));
		}
	});

	$('.memo *').entwine({
		getMemo: function() {
			return this.parents('.memo').getMemo();
		}
	});

	$('.textmemo').entwine({
		Template: '<h1 data-attr="Title"><%= get("Title") %></h1><div class="note" data-attr="Note"><%= getNoteHtml() %></div>'
	});

	$('.imagememo').entwine({
		Template: '<h1><%= get("Title") %></h1><img src="<%= ">'
	});

	$('#memos .memo').entwine({
		onclick: function(){
			this.getPanel().children('.active').remove();

			var memo = this.getMemo();
			var clone = $('<div class="'+memo.classAttr()+'"></div>'); clone.setMemo(memo);

			var left = this[0].offsetLeft + 10;
			var top = this[0].offsetTop + parseInt(this.parent().css('top'));

			clone.css({left: left, top: top});
			clone.appendTo(this.getPanel());

			setTimeout(function(){
				clone.addClass('active').css({height: clone.parent().height() - 24});
				clone.getPanel().addClass('active');
			},0);
		}
	})

	$('.memo.active > *').entwine({
		onclick: function(){
			var input = this.getInput();
			if (input) {
				this.css({display: 'none'});
				input.insertAfter(this);
			}
		}
	});

	$('.memo.active > [data-attr]').entwine({
		getInput: function(){
			var input = $('<input type="text" />');
			return input;
		}
	});

	$('.memo.active > .note').entwine({
		getInput: function(){
			var textarea = $('<textarea></textarea>');
			textarea.css({width: this.innerWidth(), height: this.innerHeight()});
			return textarea;
		}
	});

	$('.textmemo.active input, .textmemo.active textarea').entwine({
		getRelatedElement: function() {
			return this.prev();
		},

		getProperty: function() {
			return this.getRelatedElement().attr('data-attr');
		},

		inputValue: function(v) {
			return v ? this.val(v) : this.val();
		},

		onadd: function() {
			this.inputValue(this.getMemo().get(this.getProperty()));
			this.focus();
		},

		finishEdit: function(){
			var memo = this.getMemo();
			memo.set(this.getProperty(), this.inputValue());
			memo.save();

			this.prev().css({display: 'block'});
			this.remove();
		},

		onfocusout: function(){
			this.finishEdit();
		}
	});

	$('#memos .textmemo.active textarea').entwine({
		inputValue: function(v) {
			return v ? this.text(v) : this.text();
		}
	});

})(jQuery);