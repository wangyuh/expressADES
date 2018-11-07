$(function(){
    var baseUrl = "http://192.168.70.239:3000";
    $("#submit").unbind().on("click",function(){
        $(".error_info").html('');
        $.ajax({
            url:baseUrl + "/login",
            type:"post",
            data:{name:$(".name").val(),password:$(".password").val()},
            success:function(d){
                if(d.success){
                    window.location.href = baseUrl+"/index"
                }else{
                    $(".error_info").html(d.message)
                }
            }
        })
    })
})