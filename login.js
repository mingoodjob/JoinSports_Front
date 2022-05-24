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

        
    if (response['result'] == "success") {
        alert="로그인 성공!"
        window.location.href = "메인 이동";
    }

}

// async function getName(){

//     const response = await fetch(`${backend_base_url}/getuserinfo`,{
//         headers:{
//             'Authorization':localStorage.getItem("token")
//         }
//         // #headers의 authorization에서 저장된 토큰 값을 받고
//     }
//     )
//     response_json = await response.json()
//     console.log(response_json)

//     const username = document.getElementById("username")
//     username.innerText = response_json.email}

//     // return response_json.email


