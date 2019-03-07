var today = new Date();

function getProverb() {
	today.setHours(0,0,0,0);
	var key = ( today.getTime() - ( today.getTimezoneOffset() * 60 * 1000 ) ) / 1000 / 60 / 60 / 24 % proverbs.length;
	return key;
}

function getNextProverb() {
	today = new Date(today.getTime() + 24 * 60 * 60 * 1000)
	
	var key = today.getTime() / 1000/ 60 / 60 / 24 % proverbs.length;
	console.log( key );
	return key;
}

function getRandomProverb() {
	var key = Math.floor(Math.random() * proverbs.length);
	console.log( key );
	return key;
}

function showProverb( key ) {
	var proverb = proverbs[ key ];
	var image = imagesObject[proverb.image];
	if ( ! image ) {
		image = images[ key ];
	}
	document.getElementById('proverb').innerHTML = proverb.text + '<br/><span class="reference"><a href="http://javascripture.org/#/Proverbs/' + proverb.chapter + '/' + proverb.verse + '">Proverbs ' + proverb.chapter + ':' + proverb.verse + '</a></span>';
	document.getElementById('background-item').style.backgroundImage = "url('" + image.url + "?utm_source=Daily Proverb&utm_medium=referral')";
	document.getElementById('preload-image').onload = function() {
		document.getElementById('background').className = 'fadein';
		document.getElementById('background-overlay').className = 'fadein';
		document.getElementById('photo-credit').href = image.credit + '?utm_source=Daily Proverb&utm_medium=referral';
		document.getElementById('photo-credit').innerHTML = 'Photo credit';
		if ( image.name ) {
			document.getElementById('photo-credit').innerHTML = 'Photo by ' + image.name;
		}
	};
	document.getElementById('preload-image').src = image.url;
}

function hideProverb() {
	document.getElementById('background').className = '';
	document.getElementById('background-overlay').className = '';
	document.getElementById('photo-credit').innerHTML = '';
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

document.getElementById('next').addEventListener('click', function() {
	var proverb = getNextProverb();
	hideProverb();
	showProverb( proverb );
});

function httpGet(query){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'https://api.unsplash.com/photos/random?client_id=79692a96c43ed9472a62af85f726834cc45155d735105890740b0bf726a1141d&count=30&query='+query, false ); // false for synchronous request
    xmlHttp.send( null );
    return JSON.parse( xmlHttp.responseText );
}

function getUnsplashImage( index ) {
	var unsplashImage = httpGet( proverbs[index].text )[ Math.floor( Math.random()*30 ) ];
	var image = {};
	image.url = unsplashImage.urls.full;
	image.credit = unsplashImage.user.links.html;
	image.name = unsplashImage.user.name;
	imagesObject[unsplashImage.id] = image;
	proverbs[index].image = unsplashImage.id;
}

function outputData() {
	document.write( 'var proverbs = ' + JSON.stringify( proverbs ) + '; var images = ' + JSON.stringify( images ) + '; var imagesObject = ' + JSON.stringify( imagesObject ) + ';' );
}

function getNewUnspalashImages(index) {
	for( i = 0; i < 40; i++ ) {
		getUnsplashImage( index + i );
	}
	outputData();
}
