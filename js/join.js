const backend_base_url = "http://127.0.0.1:5001"
const frontend_base_url = "http://127.0.0.1:5500"

$(document).ready(function() {
    $('#submitphoto').hide();
    $('#preview').hide();



    $("#pr_photo").change(function () {
        // pr_photo가 값이 바뀌면 아래와 같이 체인지
        readURL(this);
        $("#preview").show();
        $("#submitphoto").show();


    });


});


async function join(){
    
    let pr_photo = document.getElementById("pr_photo").files[0]
    let email = document.getElementById("email").value
    let nick = document.getElementById("nick").value
    let pwd = document.getElementById("pwd").value
    let formdata = new FormData()
    
    formdata.append('filegive', pr_photo)
    formdata.append('email', email)
    formdata.append('nick', nick)
    formdata.append('pwd', pwd)
    console.log(formdata)

    const response = await fetch(`${backend_base_url}/join`,{
        method:'POST',
        body : formdata
        }
    )
    console.log(response)

    response_json = await response.json()
    console.log(response_json)

    if (response.status ==200){
        window.location.href=(`${frontend_base_url}/login.html`);
    }else{
        alert(response.status)
    }
};

// #이메일 중복체크
function emailcheck() {

    let email = $('#email').val()

    $.ajax({
        type: 'POST',
        url: `${backend_base_url}/join/check_email`,
        data: {email_give: email},
        success: function (response) {
            if (response['result'] == "success") {
                nickcheck();
            }
            else{
                $('#email').val('');
                alert("🙅 : 이메일 중복!")
            }
    }
})
}

// #닉네임 중복체크
function nickcheck() {

    let nick = $('#nick').val()

    $.ajax({
        type: 'POST',
        url: `${backend_base_url}/join/check_nick`,
        data: {nick_give:nick},
        success: function (response) {
            if (response['result'] == "success") {
                test();
            }
            else{   
                $('#nick').val('');
                alert("🙅 : 닉네임 중복!");
            }
            
    }
})
}

// 비밀번호 일치확인 - 일치하지 않거나 6자리 미만 입력시 입력칸 비워지게
function test() {
    var p1 = document.getElementById('pwd').value;
    var p2 = document.getElementById('pwd_check').value;
    if( p1 == p2) {
        if (p1.length > 5) {
            alert("🙆 : 좋아하는 운동 사진을 선택해주세요!");   
                }
        else {
            alert("비밀번호는 6자리 이상이어야 합니다");
            $('#pwd').val('');
            $('#pwd_check').val('');
        }}
         else {
        alert("🙅 : 비밀번호 미일치!");
        $('#pwd').val('');
        $('#pwd_check').val('');
    }

      
    }


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('preview').src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        document.getElementById('preview').src = "";
    }
}




