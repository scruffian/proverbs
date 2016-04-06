/**
 * @param {string} searchTerm - Search term for Flickr search.
 * @param {function(string,number,number)} callback - Called when an image has
 *   been found. The callback gets the URL, width and height of the image.
 * @param {function(string)} errorCallback - Called when the image is not found.
 *   The callback gets a string that describes the failure reason.
 */
function getImageUrl(searchTerm, callback, errorCallback) {
  var searchUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=9f6e34f484297f22c46cb330d940c5f8&tags=' + searchTerm + '&sort=relevance&extras=url_h&format=json&nojsoncallback=1';

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
    renderStatus('Search term: ' + searchTerm + '\n' + 'Flickr search result: ' + photoArray[0]);
    var imageUrl = photoArray[0].url_h;
    var imagePage = 'https://www.flickr.com/photos/' + photoArray[0].owner + '/' + photoArray[0].id;
    callback( imageUrl, imagePage );
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
  var d = new Date();
  d.setHours(0,0,0,0);
  return proverbs[ d % proverbs.length ];
}

function showImage( imageUrl, credit ) {
    document.getElementById('background-item').style.backgroundImage = "url('" + imageUrl + "')";
    document.getElementById('preload-image').onload = function() {
      document.getElementById('background').className = 'fadein';
      document.getElementById('background-overlay').className = 'fadein';
      document.getElementById('photo-credit').href = credit;

    };
    document.getElementById('preload-image').src = imageUrl;

  }

document.addEventListener('DOMContentLoaded', function() {
  var proverb = getProverb();
  var searchTerms = proverb.text.replace(/:/g, '').replace(/\./g, '').replace(/;/g, '').split( ' ' ).filter( function( word ) {
    return word.length > 4;
  } )
  var searchQuery = searchTerms;

  // Put the image URL in Flickr search.
  renderStatus('Performing Flickr search for ' + searchQuery );
  document.getElementById('proverb').innerHTML = proverb.text + '<br/><a href="http://javascripture.org/#/Proverbs/' + proverb.chapter + '/' + proverb.verse + '" class="reference">Proverbs ' + proverb.chapter + ':' + proverb.verse + '</span>';

  if ( proverb.url ) {
    showImage( proverb.url, proverb.credit );
  } else { // Get from flickr
    getImageUrl( searchQuery, showImage, function(errorMessage) {
      renderStatus('Cannot display image. ' + errorMessage);
    });
  }
});
