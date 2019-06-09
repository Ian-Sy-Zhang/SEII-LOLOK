$(document).ready(function () {
    var cancelTime = 0;
    var cancelLeastMoney = 0;
    var cancelMostMoney = 0;
    var cancelReturnMoney = 0;
    getCancelTime();
    getCancelLeastMoney();
    getCancelMostMoney();
    getCancelReturnMoney();
    getMovieList();
    //获得可退票提前时间
    function getCancelTime(){
        $("#cancel-time").text(cancelTime);
    }
    
    $('#cancelTime-modify-btn').click(function () {
        $("#cancelTime-modify-btn").hide();
        $("#cancelTime-set-input").val(cancelTime);
        $("#cancelTime-set-input").show();
        $("#cancelTime-confirm-btn").show();
    });
    
    $("#cancelTime-confirm-btn").click(function () {
        cancelTime = $("#cancelTime-set-input").val();
        $("#cancel-time").text(cancelTime);
        $("#cancelTime-set-input").hide();
        $("#cancelTime-confirm-btn").hide();
        $("#cancelTime-modify-btn").show();
    })
    //获得可退票最小金额
    function getCancelLeastMoney(){
        $("#cancel-least-money").text(cancelLeastMoney);
    }

    $('#cancelLeastMoney-modify-btn').click(function () {
        $("#cancelLeastMoney-modify-btn").hide();
        $("#cancelLeastMoney-set-input").val(cancelLeastMoney);
        $("#cancelLeastMoney-set-input").show();
        $("#cancelLeastMoney-confirm-btn").show();
    });

    $("#cancelLeastMoney-confirm-btn").click(function () {
        cancelLeastMoney = $("#cancelLeastMoney-set-input").val();
        $("#cancel-least-money").text(cancelLeastMoney);
        $("#cancelLeastMoney-set-input").hide();
        $("#cancelLeastMoney-confirm-btn").hide();
        $("#cancelLeastMoney-modify-btn").show();
    })
    //获得可退票最大金额
    function getCancelMostMoney(){
        $("#cancel-most-money").text(cancelMostMoney);
    }

    $('#cancelMostMoney-modify-btn').click(function () {
        $("#cancelMostMoney-modify-btn").hide();
        $("#cancelMostMoney-set-input").val(cancelMostMoney);
        $("#cancelMostMoney-set-input").show();
        $("#cancelMostMoney-confirm-btn").show();
    });

    $("#cancelMostMoney-confirm-btn").click(function () {
        cancelMostMoney = $("#cancelMostMoney-set-input").val();
        $("#cancel-most-money").text(cancelMostMoney);
        $("#cancelMostMoney-set-input").hide();
        $("#cancelMostMoney-confirm-btn").hide();
        $("#cancelMostMoney-modify-btn").show();
    })
    //获得可退票返还金额比例
    function getCancelReturnMoney(){
        $("#cancel-return-money").text(cancelReturnMoney);
    }

    $('#cancelReturnMoney-modify-btn').click(function () {
        $("#cancelReturnMoney-modify-btn").hide();
        $("#cancelReturnMoney-set-input").val(cancelReturnMoney);
        $("#cancelReturnMoney-set-input").show();
        $("#cancelReturnMoney-confirm-btn").show();
    });

    $("#cancelReturnMoney-confirm-btn").click(function () {
        cancelReturnMoney = $("#cancelReturnMoney-set-input").val();
        $("#cancel-return-money").text(cancelReturnMoney);
        $("#cancelReturnMoney-set-input").hide();
        $("#cancelReturnMoney-confirm-btn").hide();
        $("#cancelReturnMoney-modify-btn").show();
    })
    //获得电影列表
    function getMovieList() {
        getRequest(
            '/movie/all/exclude/off',
            function (res) {
                var movieList=res.content;
                var movieListStr = "";
                for(var i=0;i<movieList.length;i++){
                    movieListStr+=
                        "<p>"+
                        "<input type='checkbox' name='movie' value='"+movieList[i].id+"'>"+movieList[i].name+
                        "</p>"
                }
                $("#movie-list").append(movieListStr)
            },
            function (error) {
                alert(error)
            }
        )
    }
})
function choose(){
    document.getElementById("btnOperate").onclick = function () {
        var arr = new Array();
        var items = document.getElementsByName("movie");
        for (i = 0; i < items.length; i++) {
            if (items[i].checked) {
                arr.push(items[i].value);
            }
        }
        alert(arr.length)
    }
}