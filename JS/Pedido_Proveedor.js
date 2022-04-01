var UrlPedidoProveedor = 'http://52.152.236.67:90/G4_19/controller/pedido_proveedor.php?op=GetPedidosProveedores';
var UrlPostPedido = 'http://52.152.236.67:90/G4_19/controller/pedido_proveedor.php?op=InsertPedido';
var UrlGetUno = 'http://52.152.236.67:90/G4_19/controller/pedido_proveedor.php?op=GetPedidoProveedor';
var UrlPutPedido = 'http://52.152.236.67:90/G4_19/controller/pedido_proveedor.php?op=UpdatePedidoProveedor';
var UrlDeletePedido = 'http://52.152.236.67:90/G4_19/controller/pedido_proveedor.php?op=DeletePedidoProveedor';

$(document).ready(function(){
CargarPedidos();
});

function CargarPedidos(){
    $.ajax({
        url: UrlPedidoProveedor,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MiItems = response;
            var Valores = '';

            for(i=0; i<MiItems.length; i++){
                Valores +=
                '<tr>'+
                    '<td>'+MiItems[i].ID+'</td>'+
                    '<td>'+MiItems[i].ID_SOCIO+'</td>'+
                    '<td>'+MiItems[i].FECHA_PEDIDO+'</td>'+
                    '<td>'+MiItems[i].DETALLE+'</td>'+
                    '<td>'+MiItems[i].SUB_TOTAL+'</td>'+
                    '<td>'+MiItems[i].TOTAL_ISV+'</td>'+
                    '<td>'+MiItems[i].TOTAL+'</td>'+
                    '<td>'+MiItems[i].FECHA_ENTREGA+'</td>'+
                    '<td>'+MiItems[i].ESTADO+'</td>'+
                    '<td>'+
                    '<button class="btn btn-outline-primary" onclick="CargarPedido(' + MiItems[i].ID +')">Editar</button>'+
                    '<button class="btn btn-outline-danger" onclick="EliminarPedido(' + MiItems[i].ID +')">Eliminar</button>'+
                    '</td>'
                '</tr>';
                $('.Pedidos').html(Valores); 
            }
        }
    });
}

function AgregarPedido(){
    var datospedido = {
        ID_SOCIO:$('#ID_SOCIO').val(),
        FECHA_PEDIDO:$('#FECHA_PEDIDO').val(),
        DETALLE:$('#DETALLE').val(),
        SUB_TOTAL:$('#SUB_TOTAL').val(),
        TOTAL_ISV:$('#TOTAL_ISV').val(),
        TOTAL:$('#TOTAL').val(),
        FECHA_ENTREGA:$('#FECHA_ENTREGA').val(),
        ESTADO:$('#ESTADO').val()
    };
    var datospedidojson = JSON.stringify(datospedido);
    $.ajax({
        url: UrlPostPedido,
        type: 'POST',
        data : datospedidojson,
        dataType: 'JSON',
        contenttype: 'application/json',
        success: function(response){
            console.log(response);
        },
        error: function(){
            alert('Error al crear el pedido');
        }
    });
    alert('Pedido Agregado');
}

function CargarPedido(idpedido){
    var datospedido = {
        ID : idpedido
    };
    var datospedidojson = JSON.stringify(datospedido);

    $.ajax({
        url: UrlGetUno,
        type: 'POST',
        data: datospedidojson,
        dataType: 'JSON',
        contentType: 'application/json',
        success: function (response){
            var MiItems = response;
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
            $('#FECHA_PEDIDO').val(MiItems[0].FECHA_PEDIDO);
            $('#DETALLE').val(MiItems[0].DETALLE);
            $('#SUB_TOTAL').val(MiItems[0].SUB_TOTAL);
            $('#TOTAL_ISV').val(MiItems[0].TOTAL_ISV);
            $('#TOTAL').val(MiItems[0].TOTAL);
            $('#FECHA_ENTREGA').val(MiItems[0].FECHA_ENTREGA);
            $('#ESTADO').val(MiItems[0].ESTADO);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarPedido(' + MiItems[0].ID + 
            ')" value="Actualizar Pedido" class="btn btn-primary"></input>';
            $('.btnpedido').html(btnactualizar);
            
        }
    });
}

function ActualizarPedido(idpedido){
    var datospedido = {
        ID: idpedido,
        ID_SOCIO:$('#ID_SOCIO').val(),
        FECHA_PEDIDO:$('#FECHA_PEDIDO').val(),
        DETALLE:$('#DETALLE').val(),
        SUB_TOTAL:$('#SUB_TOTAL').val(),
        TOTAL_ISV:$('#TOTAL_ISV').val(),
        TOTAL:$('#TOTAL').val(),
        FECHA_ENTREGA:$('#FECHA_ENTREGA').val(),
        ESTADO:$('#ESTADO').val()
    };
    
    var datospedidojson = JSON.stringify(datospedido);
    
    $.ajax({
        url: UrlPutPedido,
        type: 'PUT',
        data: datospedidojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response){
            console.log(response);
        }
    });
    alert("Pedido actualizado");
}

function EliminarPedido(idpedido){
    var datospedido = {
        ID: idpedido
    };
    var datospedidojson = JSON.stringify(datospedido);

    $.ajax({
        url: UrlDeletePedido,
        type: 'DELETE',
        data: datospedidojson,
        contentType: 'application/json',
        success: function (response){
            console.log(response);
        }
    });
    alert("Pedido eliminado");
}