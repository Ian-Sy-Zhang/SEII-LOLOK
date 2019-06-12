$(document).ready(function(){
    getUserRecordList()
});


function getUserRecordList() {
    getRequest(
        '/userRecord/getAll?id='+sessionStorage.getItem('id'),
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
        var userRecord = list[i];
        hallDomStr +=
            "<tr>"+
            "<th>"+userRecord.expensesId+"</th>"+
            "<th>"+userRecord.amount+"</th>"+
            "<th><button class='btn btn-primary' data-backdrop='static' data-toggle='modal' data-target='#recordDetailModal' onclick='showDetail("+userRecord.expensesId+")'>详情</button></th>"+
            "<th><button class='btn btn-danger' onclick='refund("+userRecord.expensesId+")'>退票</button></th>"+
            "</tr>"

    };
    $("#recordTable").html(hallDomStr);
}

function showDetail(id) {
    getRequest(
        '/userRecord/get?id='+id,
        function (res) {
            var record = res.content;
            $("#record-detail-description").text(record.description)
            $("#record-detail-date").text(record.time)
        },
        function (error) {
            alert(error)
        }
    )
}
function refund(expensesId) {
    getRequest(
        '/ticket/refund?expenseId='+expensesId,
        function (res) {
            alert("退票成功");
            getUserRecordList();
        },
        function (error) {
            alert(error)
        }
    )
}
