var setGlobalId;

$(document).ready(function(){

    getHallList();

    function validateHallForm(data) {
        var isValidate = true;
        if(!data.name) {
            isValidate = false;
            $('#hall-name-input').parent('.form-group').addClass('has-error');
        }
        return isValidate;
    }

});
//获得影厅列表
function getHallList() {
    getRequest(
        '/hall/all',
        function (res) {
            renderHallList(res.content);
        },
        function (error) {
            alert(error);
        }
    );
}
function renderHallList(list) {
    var hallDomStr = "";
    for(var i=0;i<list.length;i++) {
        var hall = list[i];
        hallDomStr +=
            "<tr>"+
            "<th>"+hall.name+"</th>"+
            "<th>"+hall.row+"</th>"+
            "<th>"+hall.column+"</th>"+
            "<th>"+hall.size+"</th>"+
            "<th><button class='btn btn-primary' data-backdrop='static' data-toggle='modal' data-target='#hallSetModal' onclick='changeHall("+hall.id+")'>修改</button></th>"+
            "<th><button class='btn btn-danger' onclick='deleteHall("+hall.id+")'>删除</button></th>"+
            "</tr>"
    };
    $("#hall-list").html(hallDomStr);
}

function setHallID(id){

}
//删除影院
function deleteHall(id) {
    getRequest(
        '/hall/delete?id='+id,
        function (res) {
            alert("删除成功");
            getHallList();
        },
        function (error) {
            alert(error)
        }
    )
}
//增加影院
function addHall() {
    var hall = getHallForm();
    postRequest(
        '/hall/add',
        hall,
        function (res) {
            alert("添加成功");
            getHallList();
            $("#hallModal").modal('hide')
        },
        function (error) {
            alert(error)
        }
    )
}

function getHallForm() {
    return {
        name: $('#hall-name-input').val(),
        row: $('#hall-row-input').val(),
        column: $('#hall-column-input').val(),
        size: $('#hall-size-input').val(),
    };
}
//修改影院
function changeHall(id) {
    $("#hall-id").text(id);
    getRequest(
        '/hall/get?id='+id,
         function (res) {
             var hall = res.content;
             $('#hallset-name-input').val(hall.name);
             $('#hallset-row-input').val(hall.row);
             $('#hallset-column-input').val(hall.column);
             $('#hallset-size-input').val(hall.size);
         },
        function (error) {
            alert(error)
        }
    );
}
function ensureChange() {
    var hall = {
        id: $("#hall-id").text(),
        name: $('#hallset-name-input').val(),
        row: $('#hallset-row-input').val(),
        column: $('#hallset-column-input').val(),
        size: $('#hallset-size-input').val(),
    };
    postRequest(
        '/hall/set',
        hall,
        function (res) {
            alert("修改成功")
            getHallList();
            $("#hallSetModal").modal('hide')
        },
        function (error) {
            alert(error)
        }
    )
}
