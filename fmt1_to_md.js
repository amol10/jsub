fs = require('fs');
path = require('path');
prompt = require('prompt-sync')({ sigint: true });

var process = function(file) {
	detect_fmt1(file);
}

var detect_fmt1 = function(file) {
	data = fs.readFileSync(file, {encoding: 'utf-8' });
	console.log(data);
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
						console.log(file);
						var ch = prompt("Process this file?(y/n/q): ");
						if (ch == 'y') {
							process(file);
						} else if (ch == 'q') {
							return new Error("Exiting...");
						}

					}
				}
			});

		});
	});
}

root = "/home/amol/Documents/code/kn/keepnotes2"

walk(root, function(err, suc) {
	console.log(err);
	
});

