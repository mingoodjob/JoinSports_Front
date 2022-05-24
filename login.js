const backend_base_url = "http://127.0.0.1:5001"
const frontend_base_url = "http://127.0.0.1:5501"

$(document).ready(function() {
    $('#x1').hide()
    $('#x2').hide()
    $('#good1').hide()
    $('#good2').hide()


    $('#joinbutton').click(function(){
        window.location.href=(`${frontend_base_url}/join.html`);
    });
    


});

async function login(){
    // 로그인 버튼 클릭했을 시
    console.log("handlelogin")

    const loginData = {
        email : document.getElementById("email").value,
        password : document.getElementById("pwd").value
    }


    const response = await fetch(`${backend_base_url}/login`,{
        
        method:'POST',
        body:JSON.stringify(loginData)
        
    }
    )

    console.log(response)

    response_json = await response.json()
    console.log(response_json)
    localStorage.setItem("token", response_json.token)

        // #로그인 성공하면 alert띄우고 화면이동
    if(response_json.result == 'success') {
        alert(response_json.message)
        location.href=  "메인페이지" 
    }
    
     


}

