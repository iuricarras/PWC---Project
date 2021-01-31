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

	} 
    if ( $("body#pesquisa").length > 0 ){
	
	/*console.log('to qui');*/
	var cloneMedia = $('.media').clone();
    if(localStorage.getItem("nome") != null){
        localStorage.setItem("pesquisa", localStorage.nome);
        localStorage.removeItem("nome");
    }
	var valuePesquisa = localStorage.pesquisa;
	$('.panel-title').text('Resultado da Pesquisa - "'+ valuePesquisa+'"');

	$('.media-list').html('');

	$.ajax({
        	type : 'GET',
        	url : 'http://ws.audioscrobbler.com/2.0/',
        	data : 'method=track.search&' +
    				'track=' + valuePesquisa +'&' +
               		'api_key=57ee3318536b23ee81d6b27e36997cde&' +
               		'format=json',
        	dataType : 'jsonp',
        	success : function(data) {


				$.each(data.results.trackmatches, function(index, result){
				for (var i = 0; i <= 9; i++) {
					
                    var liMedia=cloneMedia.clone();
					$('.title', liMedia).html(data.results.trackmatches.track[i].name);
					$('.artist', liMedia).html(data.results.trackmatches.track[i].artist);
					$('.media-list').append(liMedia);
                    $('#mdetalhes').attr("id","mdetalhes" + i);
                    $('#adetalhes').attr("id","adetalhes" + i);
                    $('#favButton').attr("id","favButton" + i);
                    $("#alertamusica").attr("id", "alertamusica" + i);
                    $("#alertamusica" + i).hide();

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

                    $('.title' + i, liMedia).html(data.tracks.track[i].name);
                    $('.artist' + i, liMedia).html(data.tracks.track[i].artist.name);
                    $('.music'+ i).append(liMedia);

                    /*console.log('data');
                    console.log(data);*/
                    localStorage.removeItem("nome");
            }
        }
    });

})

 $(function () {
        $(document).on("click", ".title", function(event){
            
            console.log("hello");
            
        
            if (typeof(Storage) !== "undefined") {
            // Código com implementação do localStorage/sessionStorage.                
            var bid = $(this).attr('id');
            var lastChar = bid.substr(bid.length - 1);
            console.log("Why am i here, again?");
            var nomedetalhes = document.getElementById(bid);
            var artistdetalhes = document.getElementById("adetalhes" + lastChar);
            console.log(nomedetalhes);
            localStorage.setItem("nomedetalhes", nomedetalhes.innerHTML);
            localStorage.setItem("artistadetalhes", artistdetalhes.innerHTML);

            return;
            
            } else {
            // Acção ou aviso para o não suporte de persistência de dadosd
                $( "#error" ).text( "Not valid!" ).show().fadeOut( 1000 );
                console.log("Why am i here?");
                event.preventDefault();
            }
        });

    
     if ( $("body#detalhes").length > 0 ){

            console.log("Estou aqui");
            var resultadonomedetalhes = localStorage.nomedetalhes;
            var resultadoartistadetalhes = localStorage.artistadetalhes;

            $(".detalhesmusica").text(resultadonomedetalhes);

            $.ajax({
                type : 'POST',
                url : 'http://ws.audioscrobbler.com/2.0/',
                data : 'method=track.getInfo&' +
                        'api_key=57ee3318536b23ee81d6b27e36997cde&' +
                        'artist=' + resultadoartistadetalhes + '&' +
                        'track=' + resultadonomedetalhes + '&' +
                        'format=json',
                dataType : 'jsonp',
                success : function(music) {
                
                $.ajax({
                    type : 'POST',
                    url : 'http://ws.audioscrobbler.com/2.0/',
                    data : 'method=artist.getinfo&' +
                            'artist=' + resultadoartistadetalhes + '&' +
                            'api_key=57ee3318536b23ee81d6b27e36997cde&' +
                            'format=json',
                    dataType : 'jsonp',
                    success : function(artist) {
                        console.log(music);
                        console.log(artist);

                        var linkartist = artist.artist.image[3]["#text"];
                        var linkalbum = music.track.album.image[3]["#text"];

                        if (linkalbum === ""){
                            linkalbum = "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png";
                        }
                        $('#nomeartista').html(music.track.artist.name);
                        $('.fotoartista').attr("src", linkartist);
                        $('#nomemusica').html(music.track.name);
                        $('#nomealbum').html(music.track.album.title);
                        $('.fotoalbum').attr("src", linkalbum);
                        $('#info').html(music.track.wiki.summary);
                        $("#alertamusica").hide();


            }
        });
        }

}); 
}
}); 
$( document ).ready(function () {
    $(document).on("click", ".fav", function(event){
            var favid = $(this).attr('id');
            var musicnumber = favid.substr(favid.length - 1);

            var favnome = document.getElementById("mdetalhes" + musicnumber);
            var favartista = document.getElementById("adetalhes" + musicnumber);

            console.log("localStorage.favnome0");
            console.log(localStorage.favnome0);
            
            var slotmusica = verificacaofavoritos();


            console.log("slotmusica - ");
            console.log(slotmusica);

            if(slotmusica < 10){
                localStorage.setItem("favnome" + slotmusica, favnome.innerHTML);
                localStorage.setItem("favartista" + slotmusica, favartista.innerHTML);
                $("#alertamusica" + musicnumber).show(300);
                setTimeout(function(){
                $("#alertamusica" + musicnumber).hide(300);  
                }, 3000);
            }
            else{
                alert("Número máximo de musicas atingido");
            }
            console.log(localStorage.favnome0);

        });

});  

$( document ).ready(function () {
     $(document).on("click", "#favButton", function(event){

            var favnome = localStorage.nomedetalhes;
            var favartista = localStorage.artistadetalhes;


            var slotmusica = verificacaofavoritos();

            if(slotmusica < 10){
                localStorage.setItem("favnome" + slotmusica, favnome);
                localStorage.setItem("favartista" + slotmusica, favartista);
                $("#alertamusica").show(300);
                setTimeout(function(){
                $("#alertamusica").hide(300);  
                }, 3000);
            }
            else{
                alert("Número máximo de musicas atingido");
            }
    });
});

function verificacaofavoritos(){
    for(var i = 0; i < 10; i++){
        if(localStorage.getItem("favnome" + i) == null){
            console.log("I");
            console.log(i);
            return i;
    }
}

};
$( document ).ready(function () {
    var cloneMedia = $('.media').clone();
    $('.media-list').html('');
    for (var i = 0; i < 10 ; i++) {
        if(localStorage.getItem("favnome" + i) == null){
           continue;
        }
        else{
        
        var liMedia=cloneMedia.clone();
        var displayfavnome = localStorage.getItem("favnome" + i);
        var displayfavartista = localStorage.getItem("favartista" + i);

        console.log("displayfavnome");
        console.log(displayfavnome);
        console.log(i);
        
        $('.title', liMedia).text(displayfavnome);
        $('.artist', liMedia).text(displayfavartista);
        $('.media-list').append(liMedia);
        $('#removefavButton').attr("id","removefavButton" + i);
        $('#mdetalhes').attr("id","mdetalhes" + i);
        $('#adetalhes').attr("id","adetalhes" + i);
        }
    }
});   

$( document ).ready(function () {
     $(document).on("click", ".removefav", function(event){
        var removfavid = $(this).attr('id');
        var removmusicnumber = removfavid.substr(removfavid.length - 1);

        console.log(removmusicnumber);
        if (confirm("Deseja mesmo apagar esta música?")){
            localStorage.removeItem("favnome" + removmusicnumber);
            localStorage.removeItem("favartista" + removmusicnumber);
            alert("Música removida dos favoritos");
            window.location.reload(true);   
        }
        else{   
            alert("Okei");
        }
     });
});   