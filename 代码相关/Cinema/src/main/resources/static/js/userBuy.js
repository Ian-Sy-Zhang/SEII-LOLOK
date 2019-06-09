$(document).ready(function () {
    getMovieList();

    function getMovieList() {
        getRequest(
            '/ticket/get/' + sessionStorage.getItem('id'),
            function (res) {
                renderTicketList(res.content);
            },
            function (error) {
                alert(error);
            });
    }

    // TODO:填空
    function renderTicketList(list) {
        $("#ticketTable").empty()
        for(var i=0;i<list.length;i++){
            addInfo(list[i])
        }
    }

    function addInfo(ticket) {
        getRequest(
            '/schedule/'+ticket.scheduleId,
            function (res) {
                var schedule = res.content;
                var movieName = schedule.movieName;
                var hallName = schedule.hallName;
                var startTime = schedule.startTime;
                var endTime = schedule.endTime;
                render(ticket,movieName,hallName,startTime,endTime)
            },
            function (error) {
                alert(error)
            }
        )
    }

    function render(ticket,movieName,hallName,startTime,endTime) {
        var ticketStr=
            "<tr>"+
            "<td>"+movieName+"</td>"+
            "<td>"+hallName+"</td>"+
            "<td>"+ticket.rowIndex+"排"+ticket.columnIndex+"座"+"</td>"+
            "<td>"+startTime+"</td>>"+//startTime.getMonth()+"月"+startTime.getDate()+"日 "+startTime.getHours+":"+startTime.getMinutes()+"</td>"+
            "<td>"+endTime+"</td>>"+//endTime.getMonth()+"月"+endTime.getDate()+"日 "+endTime.getHours+":"+endTime.getMinutes()+"</td>"+
            "<td>"+ticket.state+"</td>"+
            "<td><button onclick='cancelTicket("+ticket.id+")'>退票</button><td>"+
            "</tr>";
        $("#ticketTable").append(ticketStr)
    }

});

function cancelTicket(id) {
    getRequest(
        '/ticket/get/ticket?id='+id,
        function (res) {
            var ticket=res.content;
            if(ticket.state=="未完成"){
                alert("这张票未完成")
            }else if(ticket.state=="已失效"){
                alert("这张票已失效")
            }else if(ticket.state=="已退票"){
                alert("这张票已退票")
            }else{
                var ticketList = new Array();
                ticketList[0]=id;
                postRequest(
                    '/ticket/cancel?ticketId='+ticketList,
                    null,
                    function (res) {
                        alert("退票成功")
                    },
                    function (error) {
                        alert(error)
                    }
                )
            }
        },
        function (error) {
            alert(error)
        }
    )
}