var apply_css = function(element, name) {
	//jQuery("#" + element).addClass(name);
	jQuery("div").addClass(name);
};

$(document).ready(() => {
	console.log("document ready");
	apply_css('input_text', 'w-80 h-30');
});
