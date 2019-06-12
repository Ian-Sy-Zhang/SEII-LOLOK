var setGlobalId;
var GlobalState = 0;
$(document).ready(function(){

    getCardList();

    $("#card-form-btn").click(function () {
        var formData = getCardForm();
        postRequest(
            '/ca/add',
            formData,
            function (res) {
                $("#card-name-input").val(null);
                $("#card-description-input").val(null);
                $("#num-price-input").val(null);
                $("#num-request-input").val(null);
                $("#num-minus-input").val(null);
                $("#num-discountrate-input").val(null);
                getCardList();
                $("#vipCardModal").modal('hide');
            },
            function (error) {
                alert(error);
            });
    });

    $("#cardset-form-btn").click(function () {
        var formData = getCardSetForm();
        postRequest(
            '/ca/amend',
            formData,
            function (res) {
                getCardList();
                $("#vipCardSetModal").modal('hide');
            },
            function (error) {
                alert(error);
            });
    });

    $("#carddelete-form-btn").click(function () {
        getRequest(
            '/ca/delete?id='+setGlobalId,
            function (res) {
                alert("删除成功");
                getCardList();
                $("#vipCardDeleteModal").modal('hide');
            },
            function (error) {
                alert(error)
            }
        )
    });

    function getCardForm() {
        return {
            id: 1,
            name: $('#card-name-input').val(),
            description: $('#card-description-input').val(),
            price: $('#num-price-input').val(),
            targetAmount: $('#num-request-input').val(),
            discountAmount: $('#num-minus-input').val(),
            discountRate: $('#num-discountrate-input').val(),
            state: GlobalState
        };
    }

    function getCardSetForm() {
        return {
            id: setGlobalId,
            name: $('#cardset-name-input').val(),
            description: $('#cardset-description-input').val(),
            price: $('#numset-price-input').val(),
            targetAmount: $('#numset-request-input').val(),
            discountAmount: $('#numset-minus-input').val(),
            discountRate: $('#numset-discountrate-input').val(),
            state: GlobalState
        };
    }


});





function deleteVIPCard(id) {
    setGlobalId = id;
}

function setVIPCard(id) {
    setGlobalId = id;
    getRequest(
        '/ca/get?id='+id,
        function (res) {
            var vipcard = res.content;
            $("#cardset-name-input").val(vipcard.name);
            $("#cardset-description-input").val(vipcard.description);
            $("#numset-price-input").val(vipcard.price);
            $("#numset-request-input").val(vipcard.targetAmount);
            $("#numset-minus-input").val(vipcard.discountAmount);
            $("#numset-discountrate-input").val(vipcard.discountRate);
        },
        function (error) {
            alert(error)
        }
    )
}


function getCardList() {
    getRequest(
        '/ca/getAll',
        function (res) {
            renderCardList(res.content);
        },
        function (error) {
            alert(error);
        }
    );
}

function renderCardList(list) {
    var hallDomStr = "";
    for(var i=0;i<list.length;i++) {
        var vipCard = list[i];
        hallDomStr +=
            "<tr>"+
            "<th>"+vipCard.name+"</th>"+
            "<th>"+vipCard.description+"</th>"+
            "<th>"+vipCard.price+"</th>"+
            "<th>"+vipCard.targetAmount+"</th>"+
            "<th>"+vipCard.discountAmount+"</th>"+
            "<th>"+vipCard.discountRate+"</th>"+
            "<th>"+buyAble(vipCard.state)+"</th>"+
            "<th><button class='btn btn-primary' data-backdrop='static' data-toggle='modal' data-target='#vipCardSetModal' onclick='setVIPCard("+vipCard.id+")'>修改</button></th>"+
            "<th><button class='btn btn-danger' data-backdrop='static' data-toggle='modal' data-target='#vipCardDeleteModal' onclick='deleteVIPCard("+vipCard.id+")'>删除</button></th>"+
            "</tr>"
    };
    $("#vipCard-list").html(hallDomStr);
}

function buyAble(state) {
    if(state == 1){
        return "可购买"
    }else{
        return "不可购买"
    }
}

function setStateYes() {
    GlobalState = 1;
}

function setStateNo() {
    GlobalState = 0;
}
