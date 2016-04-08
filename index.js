function getProverb() {
	var d = new Date();
	d.setHours(0,0,0,0);
	return proverbsWithImages[ d % proverbsWithImages.length ];
}

function getRandomProverb() {
	return proverbsWithImages[ Math.floor(Math.random() * proverbsWithImages.length) ];
}

function showProverb( proverb ) {
	document.getElementById('proverb').innerHTML = proverb.text + '<br/><span class="reference"><a href="http://javascripture.org/#/Proverbs/' + proverb.chapter + '/' + proverb.verse + '">Proverbs ' + proverb.chapter + ':' + proverb.verse + '</a></span>';
	document.getElementById('background-item').style.backgroundImage = "url('" + proverb.url + "')";
	document.getElementById('preload-image').onload = function() {
		document.getElementById('background').className = 'fadein';
		document.getElementById('background-overlay').className = 'fadein';
		document.getElementById('photo-credit').href = proverb.credit;
	};
	document.getElementById('preload-image').src = proverb.url;
}

function hideProverb() {
	document.getElementById('background').className = '';
	document.getElementById('background-overlay').className = '';
}

document.addEventListener('DOMContentLoaded', function() {
	var proverb = getProverb();
	showProverb( proverb );
});

document.getElementById('random').addEventListener('click', function() {
	var proverb = getRandomProverb();
	hideProverb();
	showProverb( proverb );
});
