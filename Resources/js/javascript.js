$(function () {

   if ( $("#formNome").length > 0 ){
        if (typeof(Storage) !== "undefined") {
            $("#nome").val(localStorage.nome)
        } else {
        // Acção ou aviso para o não suporte de persistência de dados
            $("#error").text( "Not valid!" ).show().fadeOut( 1000 );
            event.preventDefault();
        }

        $( "#formNome" ).submit(function( event ) {
            if (typeof(Storage) !== "undefined") {
            // Código com implementação do localStorage/sessionStorage.                
            
            var nomeform= document.getElementById("nome");
            localStorage.setItem("nome", nomeform.value);
            return;
            
            } else {
            // Acção ou aviso para o não suporte de persistência de dados
                $( "#error" ).text( "Not valid!" ).show().fadeOut( 1000 );
                event.preventDefault();
            }

        });

	} else if ( $("body#pesquisa").length > 0 ){
	
	console.log('to qui');
	var cloneMedia = $('.media').clone();

	var valuePesquisa = localStorage.nome;
	$('.panel-title').text('Search results for "'+ valuePesquisa+'"');

	$('.media-list').html('');

	$.ajax({
        	type : 'POST',
        	url : 'http://ws.audioscrobbler.com/2.0/',
        	data : 'method=track.search&' +
    				'track=' + valuePesquisa +'&' +
               		'api_key=57ee3318536b23ee81d6b27e36997cde&' +
               		'format=json',
        	dataType : 'jsonp',
        	success : function(data) {


				$.each(data.results.trackmatches, function(index, result){
				for (var i = 0; i <= 10; i++) {
					

					var liMedia=cloneMedia.clone();
					
					$('.title', liMedia).html(data.results.trackmatches.track[i].name);
					$('.artist', liMedia).html(data.results.trackmatches.track[i].artist);
					$('.media-list').append(liMedia);

					console.log('data');
					console.log(data);
					console.log(data.results.trackmatches.track[i].name);

				}
			});
		}
	});
}
});	
 
 $( document ).ready(function() {
    $.ajax({
            type : 'POST',
            url : 'http://ws.audioscrobbler.com/2.0/',
            data : 'method=geo.gettoptracks&' +
                    'country=portugal&' +
                    'api_key=57ee3318536b23ee81d6b27e36997cde&' +
                    'format=json',
            dataType : 'jsonp',
            success : function(data) {
             for (var i = 0; i <= 10; i++) {
                    
                    var liMedia;
                    var link = data.tracks.track[0].image[0]["#text"];

                    console.log(link);

                    $('#musicimage', liMedia).attr("src", link);
                    $('.title' + i, liMedia).html(data.tracks.track[i].name);
                    $('.artist' + i, liMedia).html(data.tracks.track[i].artist.name);
                    $('.music'+ i).append(liMedia);

                    console.log('data');
                    console.log(data);
            }
        }
    });

})