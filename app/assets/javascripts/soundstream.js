$(function() {
  	// Soome soundstream configuration
    $.client_id = "f9ff75bc0f32c5f581a5abe204de3555";

    function log( message ) {
      $( "<div>" ).text( message ).prependTo( "#log" );
      $( "#log" ).scrollTop( 0 );
    }

    function split( val ) {
    return val.split( /,\s*/ );
    }
    function extractLast( term ) {
    return split( term ).pop();
    }
    function reloadDancer( url , text , permalink_url ) {
      console.log(url);
    	auth_stream_url = url + "?client_id=" + $.client_id;
      dancer.pause();
      dancer.load({src: auth_stream_url});
      dancer.play();
      $("#now_playing").text(text).attr("href", permalink_url);
    }

    $( "#musix" ).autocomplete({
      minLength: 2,
      source: function( request, response ) {
        $.getJSON( "http://api.soundcloud.com/tracks.json", {q: request.term, client_id: $.client_id, limit: 10},
            function( data ) {
              console.log(data);
              response( $.map( data, function( item ) {
                    
                    return {
                          label: item.title,
                          url: item.stream_url,
                          value: item.title,
                          permalink_url: item.permalink_url
                    }
              }));
            }
        );
      },
      select: function( event, ui ) {
        log( ui.item ?
          reloadDancer(ui.item.url, ui.item.label, ui.item.permalink_url) :
          "Nothing selected, input was " + this.value );
      }
    });
  });