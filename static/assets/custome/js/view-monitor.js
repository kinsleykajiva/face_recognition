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
    _.foreach(data , (valls,inx)=>{
        row += `


                                                    <tr>
                                                        <th scope="row"> ${valls.name_alias} </th>
                                                        <td>Mark</td>
                                                        <td>Otto</td>
                                                        <td>@mdo</td>
                                                        <td>
                                                            ---
                                                        </td>
                                                    </tr>


        `;
    });
    $('#tbody_data').html(row);

}