const backend_base_url = "http://127.0.0.1:5001"
const frontend_base_url = "http://127.0.0.1:5501"

$(document).ready(function() {
    $('#choosephoto').hide();
    $('#submitphoto').hide();
    $('#preview').hide();
    $('#x1').hide()
    $('#x2').hide()
    $('#x3').hide()
    $('#good1').hide()
    $('#good2').hide()
    $('#good3').hide()
  
    
    $('#choosephoto').click(function () {
        $('#choosephoto').hide();

    });


    $("#pr_photo").change(function () {
        // pr_photo가 값이 바뀌면 아래와 같이 체인지
        console.log("prchange")
        readURL(this);
        $("#preview").show();
        $("#submitphoto").show();


    });

//     $('#checkbutton').click(function () {
//     if ($('#good1, #good2, #good3').show) {
//         // #여러 id한번에 부르기
//         $('#choosephoto').show();
//     }
//     else {
//         $('#choosephoto').hide();
//     }
// });




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
}


function check_email() {

    let email = $('#email').val()

    $.ajax({
        type: 'POST',
        url: `${backend_base_url}/join/check_email`,
        data: {email_give: email},
        success: function (response) {
            if (response['result'] == "success") {
                $("#good1").show();
                $("#x1").hide();
            }
            else{
                $("#x1").show();
                $('#email').val('');
            }
            console.log(response['result'])
    }
})
};

function check_nick() {

    let nick = $('#nick').val()

    $.ajax({
        type: 'POST',
        url: `${backend_base_url}/join/check_nick`,
        data: {nick_give:nick},
        success: function (response) {
            if (response['result'] == "success") {
                $("#good2").show();
                $("#x2").hide();
            }
            else{
                $("#x2").show();
                $('#nick').val('');
            }
            
    }
})
};

// 비밀번호 일치확인 - 일치하지 않거나 6자리 미만 입력시 입력칸 비워지게
function test() {
    var p1 = document.getElementById('pwd').value;
    var p2 = document.getElementById('pwd_check').value;
    if( p1 == p2) {
        $("#good3").show();
        $("#x3").hide();
        if (($('#good1, #good2').show) && (p1 == p2) && (p1.length > 5) ) {
            // #여러 id한번에 부르기
            $('#choosephoto').show();
        }
        else {
            $('#choosephoto').hide();
        }
    if (p1.length < 6){
        alert("비밀번호는 6자리 이상이어야 합니다");
        $("#good3").hide();
        $("#x3").show();
        $('#pwd').val('');
        $('#pwd_check').val('');
    }}
     else {
        $("#x3").show();
        $('#pwd').val('');
        $('#pwd_check').val('');
    }

      
    }

    // good이 3개 다 나와야 사진입력버튼이 나오도록
    // if (($("#good1").show)&&($("#good2").show)&&($("#good3").show)) {
    //     $('#choosephoto').show();
    // }



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




