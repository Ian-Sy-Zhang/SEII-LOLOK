$(document).ready(function(){
    getUserVipRecordList()
});


function getUserVipRecordList() {
    getRequest(
        '/userVipRecord/getAll?id='+sessionStorage.getItem('id'),
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
        var userVipRecord = list[i];
        hallDomStr +=
            "<tr>"+
            "<th>"+userVipRecord.expensesId+"</th>"+
            "<th>"+userVipRecord.amount+"</th>"+
            "<th><button class='btn btn-primary' data-backdrop='static' data-toggle='modal' data-target='#vipRecordDetailModal' onclick='showDetail("+userVipRecord.expensesId+")'>详情</button></th>"+
            "</tr>"

    };
    $("#vipRecordTable").html(hallDomStr);
}

function showDetail(id) {
    getRequest(
        '/userVipRecord/get?id='+id,
        function (res) {
            var vipRecord = res.content;
            $("#vipRecord-detail-description").text(vipRecord.description)
            $("#vipRecord-detail-date").text(vipRecord.time)
        },
        function (error) {
            alert(error)
        }
    )
}
