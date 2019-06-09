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
                "<span>I d : "+hall.id+"</span>"+
                "</div>" +
                "<div>"+
                "<span>影 厅 名 称 : "+hall.name+"</span>"+
                "</div>"+
                "<div>" +
                "<span>座 位 总 数 : " + hall.column + "行" + "</span>" +
                "<span>" + hall.row + "列" +"</span>" +
                "</div>" +
                "<div>" +
                "<span>" +"影 厅 大 小 : "+ hall.size + "</span>" +
                "</div>" +
                "<div><button class='btn btn-primary' onclick='setHall()'>编辑</button>"+"<span> </span>"+
                "<button class='btn btn-danger' onclick='deleteHall()'>删除</button></div>" +
                "</li>";
        });
        $('.hall-on-list').append(hallDomStr);
    }
});

function setHall(){

}

function deleteHall() {

}