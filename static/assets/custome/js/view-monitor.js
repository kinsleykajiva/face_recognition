const modalTagNewFaceDialogDialog = $("#TagNewFaceDialog");

modalTagNewFaceDialogDialog.iziModal ({
    width: 700,
    radius: 5,
    padding: 0
});

function openNewFace() {
    modalTagNewFaceDialogDialog.iziModal('open');
}

function onSaveNewFace() {
    let faceName = $('#faceName').val();
    let faceSurname = $('#faceSurname').val();
    let faceSex = $('#faceSex').val();
    let faceNotes = $('#faceNotes').val();
    let  faceAlias = $('#faceAlias').val();

    let dataa = new FormData();
    dataa.append('faceName' ,faceName );
    dataa.append('faceSurname' ,faceSurname );
    dataa.append('faceSex' ,faceSex );
    dataa.append('faceNotes' ,faceNotes );
    dataa.append('faceAlias' , faceAlias);

    axios({
        url:'/saveTaggedFace' , method:'post',data:dataa
    });
}

//            let socket = io.connect('http://' + document.domain + ':' + location.port)
//            socket.on('connect', function() {
//               // console.log('connected');-->
//           });
//            socket.on('message', function(data) {
//               //  console.log(data);-->
//         });


// showSuccessMessage('Msessss',4);

function getDefault(){
    axios.get('/getview-data',{params:{
    def_get:378}}).then(res=>{
        if(res.statusText === 'OK' ){
        const j = res.data

            renderTaggedTable(j)
        }
    }).catch(err=>{
    showErrorMessage('Failed to get  Default data' ,4);
    });
}

$(()=>getDefault());

function renderTaggedTable(data){


    let row = ``;
    _.forEach(data , (valls,inx)=>{

    console.log(valls)
    let name = valls.name ? valls.name + ' ' + valls.surname : 'Alias :' +valls.alias_nickname
        row += `


                <tr>
                    <th scope="row"> ${inx +1} </th>
                    <th scope="row"> ${name} </th>
                    <td>${valls.date_created}</td>

                    <td>
                        <a href='javascript:void(0)' > <i class="icofont icofont-file-psd"></i> </a>
                    </td>
                    <td>
                        ---
                    </td>
                </tr>


        `;
    });
    $('#tbody_data').html(row);

}

$(".image-checkbox").each(function () {
                    if ($(this).find('input[type="checkbox"]').first().attr("checked")) {
                        $(this).addClass('image-checkbox-checked');
                    } else {
                        $(this).removeClass('image-checkbox-checked');
                    }
                });
    
                // sync the state to the input
                $(".image-checkbox").on("click", function (e) {
                    $(this).toggleClass('image-checkbox-checked');
                    var $checkbox = $(this).find('input[type="checkbox"]');
                    $checkbox.prop("checked", !$checkbox.prop("checked"))
    
                    e.preventDefault();
                });