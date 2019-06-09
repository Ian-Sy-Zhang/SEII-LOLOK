/**$(document).ready(function(){

    getCardList();

    $("#card-form-btn").click(function () {
        var formData = getCardForm();
        if(!validateCardForm(formData)) {
            return;
        }
        postRequest(
            '/card/add',
            formData,
            function (res) {
                getCardList();
                $("#cardModal").modal('hide');
            },
            function (error) {
                alert(error);
            });
    });

    function getCardForm() {
        return {
            id: $('#card-id-input').val(),
            name: $('#card-name-input').val(),
            description: $('#card-description-input').val(),
            numRequest: $('#num-request-input').val(),
            numMinus: $('#num-minus-input').val(),
            startDate: $('#card-date-start-input').val(),
            endDate: $('#card-date-end-input').val(),
        };
    }

    function validateCardForm(data) {
        var isValidate = true;
        if(!data.name) {
            isValidate = false;
            $('#card-name-input').parent('.form-group').addClass('has-error');
        }
        return isValidate;
    }

    function getCardList() {
        getRequest(
            '/card/all',
            function (res) {
                renderCardList(res.content);
            },
            function (error) {
                alert(error);
            }
        );
    }

    function renderCardList(list) {
        $('.card-on-list').empty();
        var cardDomStr = '';
        list.forEach(function (card) {
            card.description = card.description || '';
            cardDomStr +=
                "<li class='card-item card'>" +
                "<div class='card-title'>" +
                "<span class='primary-text'>" + card.name + "</span>" +
                "</div>" +
                "<div class='movie-description dark-text'>" +
                "<span>" + card.id + "</span>" +
                "<span>" + card.name + "</span>" +
                "<span>" + card.description + "</span>" +
                "</div>" +
                "<div class='movie-description dark-text'>" +
                "<span>" + card.targetAmount + "</span>" +
                "<span>" + card.discountAmount + "</span>" +
                "<span>" + card.discountRate + "</span>" +
                "<span>" + card.state + "</span>" +
                "</div>" +
                "<div class='movie-operation'><button onclick='setVIPCard()'>编辑</button></div>" +
                "<div class='movie-operation'><button onclick='deleteVIPCard()'>删除</button></div>" +
                "</li>";
        });
        $('.card-on-list').append(cardDomStr);
    }
});

function deleteVIPCard() {

}

function setVIPCard() {

}