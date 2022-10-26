document.addEventListener('play', function(e) {
    var audios = document.getElementsByTagName('audio');

    for (var i = 0, len = audios.length; i < len; i++) {
        if (audios[i] != e.target) {
            audios[i].pause();
        }
    }
}, true);
$(document).ready(function() {
    var url = "https://api-alquranid.herokuapp.com/surah/";
    tampildataall(url);
     $("#search-button").on("click",function(){
        clearForm()
        var namasurah =  $("#search-input").val()
    
        if (namasurah == "") {
            url = "https://api-alquranid.herokuapp.com/surah";
            tampildataall(url);
        }else{
            url = "https://api-alquranid.herokuapp.com/surah/search/"+namasurah;
            tampildataall(url);
        }
    })
});




function tampildataall(url="") {
    clearForm()
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        beforeSend: function() {
            $('#spinner-id').removeClass('collapse')
            $('#search-button').html(` <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...`)
            $('#search-button').attr('disable')
        },
        success: function(data) {
            $('#spinner-id').addClass('collapse')
            $('#search-button').html(`Search <i class="fa fa-search"></i>`)
            $('#search-button').removeAttr('disable')
         if (data.data.length >0) {
            let quran = data.data;
            $.each(quran,function (i,data) {
                $("#quran-list").append(`
                <div class="col-md-4">
                <div class="card" style="box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;">
                <div class="card-body">
               
                <div class="accordion accordion-flush" id="accordionFlushExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne-`+data.nomor+`" aria-expanded="false" aria-controls="flush-collapseOne">
                           <h4> `+data.nama+` &nbsp; `+data.asma+` </h4>
                        </button>
                        </h2>
                        <div id="flush-collapseOne-`+data.nomor+`" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body"> `+data.keterangan+`</div>
                        </div>
                    </div>
                    
                    </div>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">&nbsp;&nbsp;&nbsp;&nbsp;`+data.arti+`</li>
                  <li class="list-group-item" id="detail-`+data.nomor+`"><div class="accordion accordion-flush" id="accordionFlushExampleDet">
                  <div class="accordion-item">
                      <h2 class="accordion-header" id="flush-headingOne">
                      <button onClick="detail(`+data.nomor+`)" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOneDet-`+data.nomor+`" aria-expanded="false" aria-controls="flush-collapseOne">
                        `+data.ayat+` &nbsp;ayat 
                      </button>
                      </h2>
                      <div id="flush-collapseOneDet-`+data.nomor+`" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExampleDet">
                      <div id="detlis-`+data.nomor+`" class="accordion-body"><div id="spinner-`+data.nomor+`" class="col text-center">
                      <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                          <span class="sr-only">Loading...</span>
                      </div>
                  </div></div>
                      </div>
                  </div>
                  
                  </div></li>
                  <li class="list-group-item text-center"><audio controls width="100%" style="max-width:350px;">
                  <source src="`+data.audio+`" type="audio/ogg">
                  <source src="`+data.audio+`" type="audio/mpeg">
                  Your browser does not support the audio element.
              </audio></li>
                </ul>
              </div>
            </div>
                `)
            })
           
         }else{
            $("#quran-list").html(`
                <div class="col">
                    <h3 class="text-center"> Tidak ada data </h3>
                </div>
            `)
         }

        },
        error: function(err) {
            $('#spinner-id').addClass('collapse')
            $('#search-button').html(`Search <i class="fa fa-search"></i>`)
            $('#search-button').removeAttr('disable')
        }


});
}

function detail(params) {
    var nomor = params
    $.ajax({
     type: "GET",
     url: "https://api-alquranid.herokuapp.com/surah/"+nomor,
     dataType: 'json',
     success: function(data) {
        $('#spinner-'+nomor).addClass('collapse')
         if (data.data.length >0) {
             let det = data.data;
             $.each(det,function (i,data) {
                 console.log(data.ar)
                 $("#detlis-"+nomor).append(`
                     <ul class="list-group">
                        <li class="list-group-item"> <p>`+data.ar+` <p> `+data.id+` <p>`+data.tr+` </li>
                     </ul>
                 `)
             })
            
          }
 
     },
     error: function(err) {
        $('#spinner-'+nomor).addClass('collapse')
     }
 });
 }

 function clearForm() {
    $('#quran-list').html("")    
}
