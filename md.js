fs = require('fs');
path = require('path');
prompt = require('prompt-sync')({ sigint: true });
process = require('process');
const { exec } = require('child_process');

console.log(process.argv);
const op = process.argv[2];

var con = true;

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

var extract_using_awk = function(file, pattern, cb) {
	var p2 = "/" + pattern.replaceAll('“', '.').replaceAll('”', '.').replaceAll(".* ", "/,/") + "/";
	console.log(p2);
		
	var cmd = `awk '${p2}' ${file}`;
	console.log("cmd: " + cmd);
	exec(cmd, function(error, stdout, stderr) {
		if (error) {
			console.log(`error: ${error.messsage}`);
			return;
		}
		if (stdout) {
			//console.log(`${stdout}`);
			cb(stdout);
		}
	});
}

var replace_text = function(file, regex, new_text) {
}
	
var pdf_extract = function(file) {
	var ex = detect_pdf_ex(file);

	
	if(!ex) {
		return;
	}

	const txt_file = "city_of_bones.txt"; //prompt("please enter book txt filename: ");
	var book_text = fs.readFileSync("data/" + txt_file, {encoding: 'utf-8' });
	console.log("book length: ", book_text.length);

	md_text = fs.readFileSync(file, {encoding: 'utf-8' });
	var regex_ex = /\(extract\: (.*)\)/m;
	var m = md_text.match(regex_ex);
	console.log(m);

	var s = m[1];
	var ex_text = "";
	var cb = function(text) {
		ex_text = text;
	}
	var extracted_text = extract_using_awk("data/" + txt_file, s, cb);


	var new_md = md_text.replace(regex_ex, "bq.\n" + ex_text);
	console.log(new_md);
	return;
	s = s.replaceAll('“', '.').replaceAll('”', '.').replaceAll(".*", "(\n|.)*?");
	var regex_ex2 = `/${s}/gm`; 
	console.log(regex_ex2);
	debugger;
	var e = book_text.match(regex_ex2);
	console.log(e);
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
