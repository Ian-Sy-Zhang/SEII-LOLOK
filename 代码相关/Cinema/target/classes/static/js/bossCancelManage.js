var cancelTime = 0;
var cancelReturnMoney = 0;
var canRefund = true;
var scheduleList;
$(document).ready(function () {
    getRefund();
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
//获得可退票返还金额比例

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
});
function getRefund(){
    getRequest(
        '/refund/get',
        function (res) {
            if(res.success) {
                var refundPolicy = res.content;
                cancelTime = refundPolicy.advancedMinute;
                cancelReturnMoney = refundPolicy.refundRate;
                if(refundPolicy.canRefund==0){
                    canRefund=false;
                }
                $("#cancel-time").text(refundPolicy.advancedMinute);
                $("#cancel-return-money").text(refundPolicy.refundRate);
                var canRefundStr="";
                if(canRefund==true){
                    canRefundStr=
                        "<input type='radio' name='ifUse' value='yes' checked='checked'>是" +
                        "<br>" +
                        "<input type='radio' name='ifUse' value='no'>否"
                }else{
                    canRefundStr=
                        "<input type='radio' name='ifUse' value='yes'>是" +
                        "<br>" +
                        "<input type='radio' name='ifUse' value='no' checked='checked'>否"
                }
                $("#if-use").html(canRefundStr);
                scheduleList = refundPolicy.scheduleList;
                getScheduleList(scheduleList);
            }else{
                alert("失败")
            }
        },
        function (error) {
            alert(error)
        }
    )
}


//获得电影列表
function getScheduleList(scheduleList) {
    $("#schedule-list").empty();
    getRequest(
        '/movie/all/exclude/off',
        function (res) {
            var movieList = res.content;
            for(var i=0;i<movieList.length;i++) {
                var movie = movieList[i];
                var movieId = movie.id;
                getRequest(
                    '/schedule/search/audience?movieId='+movieId,
                    function (res) {
                        var scheduleListStr = "";
                        var scheduleVOList = res.content;
                        for(var j=0;j<scheduleVOList.length;j++){
                            var scheduleVO = scheduleVOList[j];
                            var date =scheduleVO.date;
                            var scheduleItemList = scheduleVO.scheduleItemList;
                            for(var k=0;k<scheduleItemList.length;k++){
                                var scheduleItemVO = scheduleItemList[k];
                                if(scheduleList.indexOf(scheduleItemVO.id)!=-1) {
                                    scheduleListStr +=
                                        "<tr>" +
                                        "<td>" + scheduleItemVO.movieName + "</td>" +
                                        "<td>" + date.substring(5, 7) + "月" + date.substring(8, 10) + "日" + "</td>" +
                                        "<td>" + scheduleItemVO.startTime.substring(11, 16) + "</td>" +
                                        "<td>" + scheduleItemVO.endTime.substring(11, 16) + "</td>" +
                                        "<td>" + scheduleItemVO.hallName + "</td>" +
                                        "<td>" + scheduleItemVO.fare + "</td>" +
                                        "<td><input type='checkbox' name='schedule' checked='checked' value=" + scheduleItemVO.id + "></td>" +
                                        "</tr>"
                                }else{
                                    scheduleListStr +=
                                        "<tr>" +
                                        "<td>" + scheduleItemVO.movieName + "</td>" +
                                        "<td>" + date.substring(5, 7) + "月" + date.substring(8, 10) + "日" + "</td>" +
                                        "<td>" + scheduleItemVO.startTime.substring(11, 16) + "</td>" +
                                        "<td>" + scheduleItemVO.endTime.substring(11, 16) + "</td>" +
                                        "<td>" + scheduleItemVO.hallName + "</td>" +
                                        "<td>" + scheduleItemVO.fare + "</td>" +
                                        "<td><input type='checkbox' name='schedule' value=" + scheduleItemVO.id + "></td>" +
                                        "</tr>"
                                }
                            }
                        }
                        $("#schedule-list").append(scheduleListStr);
                    },
                    function (error) {
                        alert(error);
                    }
                )
            }
        },
        function (error) {
            alert(error)
        }
    )
}
function choose(){
    var arr = new Array();
    var items = document.getElementsByName("schedule");
    for (var j = 0; j < items.length; j++) {
        if (items[j].checked) {
            arr.push(items[j].value);
        }
    }
    var ifUse = document.getElementsByName("ifUse");
    var value;
    for(var i =0;i<ifUse.length;i++){
        if(ifUse[i].checked){
            value=ifUse[i].value;
            break;
        }
    }
    var refundType;
    if (value=="yes"){
        refundType=1;
    }else{
        refundType=0;
    }
    var refundPolicy ={
        refundType:refundType,
        advancedMinute:cancelTime,
        refundRate:cancelReturnMoney,
    }
    postRequest(
        '/refund/set',
        refundPolicy,
        function (res) {
            postRequest(
                '/refund/set/list',
                arr,
                function (res) {
                    alert("修改成功");
                    location.reload();
                },
                function (error) {
                    alert(error)
                }
            )
        },
        function (error) {
            alert(error)
        }
    )
}