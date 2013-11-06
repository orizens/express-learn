function FormHandler(selector) {
	var _selector = selector || '.form-handler';
	this.forms = document.querySelectorAll(_selector);
	this.attach();
}
FormHandler.prototype = {
	attach: function() {
		for (var i = 0; i < this.forms.length; i++) {
			this.addSubmit(this.forms[i])
		};
	},

	addSubmit: function(form) {
		form.addEventListener('submit', function(ev){
			location.assign(form.getAttribute('action') + form.elements['query'].value);
			ev.preventDefault();
		});
	}
};
FormHandler.init = function () {
	new FormHandler();
};
FormHandler.init();