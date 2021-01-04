function changelanguage(str) {
	if (str == 'Language') str = '';
	var expd = new Date();
	expd.setTime(expd.getTime() + (2 * 60 * 60 * 1000));
	var expires = "expires=" + expd.toGMTString();
	document.cookie = 'language=' + str + '; path=/; ' + expires;
	location.href = location.href;
}
/*var root = '';
function path_format(path) {
	path = '/' + path + '/';
	while (path.indexOf('//') !== -1) {
		path = path.replace('//', '/')
	}
	return path
}
document.querySelectorAll('.table-header').forEach(function (e) {
	var path = e.innerText;
	if (path.substr(path.length-1)=='/') path = path.substr(0, path.length-1);
	var paths = path.split('/');
	e.innerHTML = '/ ';
	if (paths <= 2) return;
	for (var i = 1; i < paths.length - 1; i++) {
		var to = path_format(root + paths.slice(0, i + 1).join('/'));
		e.innerHTML += '<a href="' + to + '">' + paths[i] + '</a> / '
	}
	e.innerHTML += paths[paths.length - 1];
	e.innerHTML = e.innerHTML.replace(/\s\/\s$/, '')
});*/
var sort = 0;

function sortby(string) {
	if (string == 'a')
		if (sort != 0) {
			for (i = 1; i <= 4; i++) document.getElementById('tr' + i).parentNode.insertBefore(document.getElementById('tr' +
				i), document.getElementById('tr' + (i - 1)).nextSibling);
			sort = 0;
			return;
		} else return;
	sort1 = sort;
	sortby('a');
	sort = sort1;
	var a = [];
	for (i = 1; i <= 4; i++) {
		a[i] = i;
		if (!!document.getElementById('folder_' + string + i)) {
			var td1 = document.getElementById('folder_' + string + i);
			for (j = 1; j < i; j++) {
				if (!!document.getElementById('folder_' + string + a[j])) {
					var c = false;
					if (string == 'time')
						if (sort == -1) {
							c = (td1.innerText < document.getElementById('folder_' + string + a[j]).innerText);
						} else {
							c = (td1.innerText > document.getElementById('folder_' + string + a[j]).innerText);
						}
					if (string == 'size')
						if (sort == 2) {
							c = (size_reformat(td1.innerText) < size_reformat(document.getElementById('folder_' + string + a[j]).innerText));
						} else {
							c = (size_reformat(td1.innerText) > size_reformat(document.getElementById('folder_' + string + a[j]).innerText));
						}
					if (c) {
						document.getElementById('tr' + i).parentNode.insertBefore(document.getElementById('tr' + i), document.getElementById(
							'tr' + a[j]));
						for (k = i; k > j; k--) {
							a[k] = a[k - 1];
						}
						a[j] = i;
						break;
					}
				}
			}
		}
		if (!!document.getElementById('file_' + string + i)) {
			var td1 = document.getElementById('file_' + string + i);
			for (j = 1; j < i; j++) {
				if (!!document.getElementById('file_' + string + a[j])) {
					var c = false;
					if (string == 'time')
						if (sort == -1) {
							c = (td1.innerText < document.getElementById('file_' + string + a[j]).innerText);
						} else {
							c = (td1.innerText > document.getElementById('file_' + string + a[j]).innerText);
						}
					if (string == 'size')
						if (sort == 2) {
							c = (size_reformat(td1.innerText) < size_reformat(document.getElementById('file_' + string + a[j]).innerText));
						} else {
							c = (size_reformat(td1.innerText) > size_reformat(document.getElementById('file_' + string + a[j]).innerText));
						}
					if (c) {
						document.getElementById('tr' + i).parentNode.insertBefore(document.getElementById('tr' + i), document.getElementById(
							'tr' + a[j]));
						for (k = i; k > j; k--) {
							a[k] = a[k - 1];
						}
						a[j] = i;
						break;
					}
				}
			}
		}
	}
	if (string == 'time')
		if (sort == -1) {
			sort = 1;
		} else {
			sort = -1;
		}
	if (string == 'size')
		if (sort == 2) {
			sort = -2;
		} else {
			sort = 2;
		}
}

function size_reformat(str) {
	if (str.substr(-1) == ' ') str = str.substr(0, str.length - 1);
	if (str.substr(-2) == 'GB') num = str.substr(0, str.length - 3) * 1024 * 1024 * 1024;
	if (str.substr(-2) == 'MB') num = str.substr(0, str.length - 3) * 1024 * 1024;
	if (str.substr(-2) == 'KB') num = str.substr(0, str.length - 3) * 1024;
	if (str.substr(-2) == ' B') num = str.substr(0, str.length - 2);
	return num;
}

function CopyAllDownloadUrl(str) {
	var tmptextarea = document.createElement('textarea');
	document.body.appendChild(tmptextarea);
	tmptextarea.setAttribute('style', 'position:absolute;left:-100px;width:0px;height:0px;');
	document.querySelectorAll(str).forEach(function(e) {
		tmptextarea.innerHTML += e.href + "\r\n";
	});
	tmptextarea.select();
	tmptextarea.setSelectionRange(0, tmptextarea.value.length);
	document.execCommand("copy");
	alert(tmptextarea.innerHTML + "Success");
}

function operatediv_close(operate) {
	document.getElementById(operate + '_div').style.display = 'none';
	document.getElementById('mask').style.display = 'none';
}
