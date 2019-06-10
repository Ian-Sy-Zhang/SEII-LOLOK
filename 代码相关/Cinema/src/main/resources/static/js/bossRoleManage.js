$(document).ready(function () {
    getAccountlist();
})

function deleteAccount(id){
    getRequest(
        '/delete/account?id='+id,
        function (res) {
            alert("删除成功")
            getAccountlist()
        },
        function (error) {
            alert(error)
        }
    )
}
function getAccountlist() {
    getRequest(
        '/all/account',
        function (res) {
            var accountList = res.content;
            var accountListStr = "";
            for(var i=0;i<accountList.length;i++){
                var user =accountList[i];
                var role = "";
                if(user.role=="manager"){
                    role="经理"
                }else{
                    role="员工"
                }
                accountListStr +=
                    "<tr>"+
                    "<th>"+role+"</th>"+
                    "<th>"+user.username+"</th>"+
                    "<th>"+user.password+"</th>"+
                    "<th><button class='btn btn-primary' data-backdrop='static' data-toggle='modal' data-target='#roleModal2' onclick='changeAccount("+user.id+")'>修改</button></th>"+
                    "<th><button class='btn btn-danger' onclick='deleteAccount("+user.id+")'>删除</button></th>"+
                    "</tr>"
            }
            $("#account-list").html(accountListStr)
        },
        function (error) {
            alert(error)
        }
    )
}

function addAccount() {
    var user = getUser();
    postRequest(
        '/add/account',
        user,
        function (res) {
            alert("添加成功");
            getAccountlist();
            $("#roleModal").modal('hide')
        },
        function (error) {
            alert(error)
        }
    )
};

function getUser() {
    var role = $("#user-role-input").val();
    if(role=="员工") {
        return {
            username: $("#user-name-input").val(),
            password: $("#user-password-input").val(),
            role: "staff"
        }
    }else{
        return {
            username: $("#user-name-input").val(),
            password: $("#user-password-input").val(),
            role: "manager"
        }
    }
}
function changeAccount(id) {
    getRequest(
        '/get/account?id='+id,
        function (res) {
            var user = res.content;
            $("#user-id-input2").text(user.id)
            $("#user-name-input2").val(user.username)
            $("#user-password-input2").val(user.password)
            if(user.role=="staff") {
                $("#user-role-input2").val("员工")
            }else{
                $("#user-role-input2").val("经理")
            }
        },
        function (error) {
            alert(error)
        }
    )
}
function ensureChange() {
    var role =$("#user-role-input2").val()
    var user;
    if(role=="员工") {
        user = {
            id: $("#user-id-input2").val(),
            username: $("#user-name-input2").val(),
            password: $("#user-password-input2").val(),
            role:"staff"
        }
    }else{
        user = {
            id: $("#user-id-input2").val(),
            username: $("#user-name-input2").val(),
            password: $("#user-password-input2").val(),
            role:"boss"
        }
    }
    postRequest(
        '/change/account',
        user,
        function (res) {
            if(res.success) {
                alert("修改成功")
                getAccountlist();
                $("#roleModal2").modal('hide')
            }
        },
        function (error) {
            alert(error)
        }
    )
}

    
