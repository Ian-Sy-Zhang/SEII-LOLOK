$(document).ready(function () {
    setCouponList();
});

function setUserList() {
    var aimMoney = $("#amount-request").val();
    $("#user-list").empty();
    getRequest(
        '/userRecord/get/rich?aimMoney='+aimMoney,
        function (res) {
            if(res.success){
                var userList = res.content;
                for(var i=0;i<userList.length;i++){
                    var userId = userList[i];
                    var userListStr = "";
                    getRequest(
                        '/get/account?id='+userId,
                        function (res) {
                            if(res.success){
                                var user = res.content;
                                userListStr=
                                    "<tr>"+
                                    "<td>"+userId+"</td>" +
                                    "<td>"+user.username+"</td>" +
                                    "<td>"+user.password+"</td>" +
                                    "<td><input type='checkbox' name='user' value="+userId+"></td>"+
                                    "</tr>"
                                $("#user-list").append(userListStr)
                            }
                        },
                        function (error) {
                            alert(error)
                        }
                    )
                }
            }
        },
        function (error) {
            alert(error)
        }
    )
}

function setCouponList() {
    $("#coupon-list").empty();
    getRequest(
        '/coupon/get/all',
        function (res) {
            if(res.success){
                var couponList=res.content;
                var couponListStr ="";
                for(var i=0;i<couponList.length;i++){
                    var coupon = couponList[i];
                    couponListStr+=
                        "<tr>"+
                        "<td>"+coupon.name+"</td>"+
                        "<td>"+coupon.targetAmount+"</td>"+
                        "<td>"+coupon.discountAmount+"</td>"+
                        "<td>"+coupon.startTime.substring(0,4)+"年"+coupon.startTime.substring(5,7)+"月"+coupon.startTime.substring(8,10)+"日"+coupon.startTime.substring(11,16)+"</td>"+
                        "<td>"+coupon.endTime.substring(0,4)+"年"+coupon.endTime.substring(5,7)+"月"+coupon.endTime.substring(8,10)+"日"+coupon.endTime.substring(11,16)+"</td>"+
                        "<td>"+coupon.description+"</td>"+
                        "<td><input type='checkbox' name='coupon' value="+coupon.id+"></td>"+
                        "</tr>"
                }
                $("#coupon-list").html(couponListStr);
            }
        },
        function (error) {
            alert(error)
        }
    )
}

function addCoupon() {
    var couponForm ={
        description:$("#couponSet-description-input").val(),
        name:$("#couponSet-name-input").val(),
        targetAmount:$("#couponSet-targetAmount-input").val(),
        discountAmount:$("#couponSet-discountAmount-input").val(),
        startTime:$("#couponSet-startTime-input").val(),
        endTime:$("#couponSet-endTime-input").val()
    }
    postRequest(
        '/coupon/add',
        couponForm,
        function (res) {
            alert("增加成功");
            setCouponList();
            $("#couponSetModal").modal('hide')
        },
        function (error) {
            alert(error)
        }
    )
}

function sendCoupon() {
    var userArr = new Array();
    var userList = document.getElementsByName("user");
    for(var i=0; i<userList.length;i++){
        if(userList[i].checked){
            userArr.push(userList[i].value);
        }
    }
    var couponArr = new Array();
    var couponList = document.getElementsByName("coupon");
    for(var j=0; j<couponList.length;j++){
        if(couponList[j].checked){
            couponArr.push(couponList[j].value);
        }
    }
    for(var k=0;k<couponArr.length;k++){
        var couponId = Number(couponArr[k]);
        postRequest(
            '/coupon/issue',
            {
                couponId:couponId,
                userId:userArr
            },
            function (res) {
                if(res.success){
                }
            },
            function (error) {
                alert(error)
            }
        )
    }
    alert("赠送成功")
}