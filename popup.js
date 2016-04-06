/**
 * @param {string} searchTerm - Search term for Flickr search.
 * @param {function(string,number,number)} callback - Called when an image has
 *   been found. The callback gets the URL, width and height of the image.
 * @param {function(string)} errorCallback - Called when the image is not found.
 *   The callback gets a string that describes the failure reason.
 */
function getImageUrl(searchTerm, callback, errorCallback) {
  var searchUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=9f6e34f484297f22c46cb330d940c5f8&tags=' + searchTerm + '&sort=relevance&extras=url_h%2Curl_o%2Co_dims&format=json&nojsoncallback=1';

  var x = new XMLHttpRequest();
  x.open('GET', searchUrl);
  // The Flickr API responds with JSON, so let Chrome parse it.
  x.responseType = 'json';
  x.onload = function() {
    // Parse and process the response from Flickr Search.
    var response = x.response;
    console.log( response );
    if (!response || !response.photos || !response.photos.photo ||
        response.photos.photo.length === 0) {
      errorCallback('No response from Flickr search!');
      return;
    }

    var photoArray = response.photos.photo.filter( function( photo ) {
      return typeof photo.url_h !== 'undefined';
    } );
    if ( photoArray.length < 1 ) {
      errorCallback('No pictures big enough!');
      return;
    }
    var firstResult = photoArray[0];
    callback(firstResult.url_h);

  };
  x.onerror = function() {
    errorCallback('Network error.');
  };
  x.send();
}

function renderStatus(statusText) {
  console.log( statusText );
}

function renderProverb(statusText) {
  document.getElementById('proverb').textContent = statusText;
}

function getProverb() {
  return {
    text: 'He that getteth wisdom loveth his own soul: he that keepeth understanding shall find good.',
    chapter: '19',
    verse: '8'
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var proverb = getProverb();
  var searchTerms = proverb.text.replace(/\:/g, '').replace(/\./g, '').split( ' ' ).filter( function( word ) {
    return word.length > 4;
  } )
  var searchQuery = searchTerms;

  // Put the image URL in Google search.
  renderStatus('Performing Flickr search for ' + searchQuery );

  getImageUrl( searchQuery, function(imageUrl) {
    renderStatus('Search term: ' + searchQuery + '\n' + 'Flickr search result: ' + imageUrl);
    document.getElementById('background-item').style.backgroundImage = "url('" + imageUrl + "')";
    document.getElementById('proverb').innerHTML = proverb.text + '<br/><em>Proverbs' + proverb.chapter + ':' + proverb.verse;
    document.getElementById('background').className = 'fadein';
    document.getElementById('background-overlay').className = 'fadein';
  }, function(errorMessage) {
    renderStatus('Cannot display image. ' + errorMessage);
  });
});
