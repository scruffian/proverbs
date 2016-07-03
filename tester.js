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


document.addEventListener('DOMContentLoaded', function() {
	var html = '';
	proverbsWithImages.forEach(function( proverb ) {
		html += '<a href="' + proverb.credit + '" title="' + proverb.chapter + ':' + proverb.verse + '"><img src="' + proverb.url + '" height="100"></a>';
	} );
	document.getElementById( 'tester' ).innerHTML = html;
});

