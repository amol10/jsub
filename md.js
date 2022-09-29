fs = require('fs');
path = require('path');
prompt = require('prompt-sync')({ sigint: true });
process = require('process');

console.log(process.argv);
const op = process.argv[2];

var con = false;

var fmt1_to_md = function(file) {
	detect_fmt1(file);
}

var detect_fmt1 = function(file) {
	data = fs.readFileSync(file, {encoding: 'utf-8' });
	console.log(data);
}

var detect_pdf_ex = function(file) {
	regex_other = /other/g;
	if(regex_other.test(file)) {
		return false;
	}
	regex_extract = /\(extract\:/gm;
	md_text = fs.readFileSync(file, {encoding: 'utf-8' });
	if (regex_extract.test(md_text)) {
		console.log(file);
		return true;
	}
	return false;
}

var pdf_extract = function(file) {
	var ex = detect_pdf_ex(file);
	//md_text = fs.readFileSync(file, 

	if(ex) {
		const txt_file = prompt("please enter book txt filename: ");
	}
}

var process = function(file) {
	switch(op) {
		case 'pdf-extract':
			pdf_extract(file);
			break;

		case 'fmt1_to_md':
			fmt1_to_md(file);
			break;

		default:
			console.log("invalid option");
	}
}



var walk = function(dir) {
	fs.readdir(dir, function(err, list) {
		var pending = list.length;
		if (!pending) return;

		list.forEach(function (file) {
			file = path.resolve(dir, file);
			fs.stat(file, function (err, stat) {
				if(stat && stat.isDirectory()) {
					const regex_skip = /\.git/g
					if (!regex_skip.test(file)) {
						walk(file);
					}
				} else {
					const regex_md = /\.md$/g
					if(regex_md.test(file)) {
						//console.log(file);
						var ch = '';
						if (!con) {
							ch = prompt("Process this file?(y/n/c/q): ");
						}
						if (ch == 'y' || con == true) {
							process(file);
						} else if (ch == 'q') {
							return new Error("Exiting...");
						} else if (ch == 'c') {
							con = true;
						}

					}
				}
			});

		});
	});
}

const root = "/home/amol/Documents/code/kn/keepnotes2";

walk(root);
