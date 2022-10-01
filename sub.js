$("#input_form").submit(function(event) {
    console.log("input form submitted");
    event.preventDefault();
    var input_text = $("#input_text").val();
    console.log(input_text);
    var output_text = input_text;

    var do_subscript = $("#subscript").prop("checked");
    console.log("subscript: " + do_subscript);

    var do_table = $("#table").prop("checked");
    console.log("table: " + do_table);

    var do_sq_brackets = $("#sq_brackets").prop("checked");
    console.log("sq_brackets: " + do_sq_brackets);

    if (do_subscript) {
        const subscripts = [ "\u2080", "\u2081", "\u2082", "\u2083", "\u2084",
		            "\u2085", "\u2086", "\u2087", "\u2088", "\u2089" ];

        console.log(subscripts);

        for (let i = 0; i < 10; i++) {
            console.log(i);
            var regex = new RegExp(`([a-zA-Z\)])${i}`, 'g');
            var output_text = output_text.replace(regex, "$1" + subscripts[i]);
        }
    }

    if (do_table) {
	var regex_t1 = new RegExp(`^`, 'gm');
	var output_text = output_text.replace(regex_t1, "| ");
	var regex_t2 = new RegExp(`$`, 'gm');
	var output_text = output_text.replace(regex_t2, " |");
	var regex_t3 = new RegExp(`:`, 'gm');
	var output_text = output_text.replace(regex_t3, " | ");
	var regex_t4 = /\|\s+(.*?)\s+\|\s+(.*?)\s+\|/gm;
	var output_text = output_text.replace(regex_t4, "| $1 | $2 |");
	var output_text = "|-----|-----|\n" + output_text;	
    }

	if (do_sq_brackets) {
		//var regex_sqb = new RegExp(`\[\d+\]`, 'gm');
		var output_text = output_text.replace(/\[\d+\]/g, "");
	}	
    
    $("#output_text").val(output_text);

    var converter = new showdown.Converter();
    //text      = '# hello, markdown!',
    var html = converter.makeHtml(output_text);
    $("#markdown").html(html);

    /*
    //marked.setOptions({ breaks: true});
    const regex_m = /\n/gm;
    var md_text = output_text.replace(regex_m, "\n\n");
    var md = marked.parse(md_text);
    //var md = marked.parse("# test\n test");
    $("#markdown").html(md);
    
    var md2 = $("#markdown").text();
    var md3 = marked.parse(md2);
    $("#markdown").html(md3);
    */
});

function copyToClipboard(text) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(text).select();
    document.execCommand("copy");
    $temp.remove();
    console.log("copied to clipboard");
}

$("#copy").click(function () {
    copyToClipboard($('#output_text').val());
});


