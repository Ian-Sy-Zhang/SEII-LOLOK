$(document).ready(function(){

    getHallList();

    $("#hall-form-btn").click(function () {
        var formData = getHallForm();
        if(!validateHallForm(formData)) {
            return;
        }
        postRequest(
            '/hall/add',
            formData,
            function (res) {
                getHallList();
                $("#hallModal").modal('hide');
            },
            function (error) {
                alert(error);
            });
    });

    function getHallForm() {
        return {
            id: $('#hall-id-input').val(),
            name: $('#hall-name-input').val(),
            row: $('#hall-row-input').val(),
            column: $('#hall-column-input').val(),
            size: $('#hall-size-input').val(),
        };
    }

    function validateHallForm(data) {
        var isValidate = true;
        if(!data.name) {
            isValidate = false;
            $('#hall-name-input').parent('.form-group').addClass('has-error');
        }
        return isValidate;
    }

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
        $('.hall-on-list').empty();
        var hallDomStr = '';
        list.forEach(function (hall) {
            hall.description = hall.description || '';
            hallDomStr +=
                "<li class='content-card card'>" +
                "<div>" +
                "<span>Id:"+hall.id+"</span>"+
                "</div>" +
                "<div>"+
                "<span>影厅名称:"+hall.name+"</span>"+
                "</div>"+
                "<div>" +
                "<span>座位总数:  " + hall.column + "行" + "</span>" +
                "<span>" + hall.row + "列" +"</span>" +
                "</div>" +
                "<div>" +
                "<span>" +"影厅大小:"+ hall.size + "</span>" +
                "</div>" +
                "<div><button onclick='setHall()'>编辑</button>" +"  "+
                "<button onclick='deleteHall()'>删除</button></div>" +
                "</li>";
        });
        $('.hall-on-list').append(hallDomStr);
    }
});

function setHall(){

}

function deleteHall() {

}