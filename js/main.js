const backend_base_url = "http://127.0.0.1:4000"
const frontend_base_url = "http://127.0.0.1:5500"

async function Send() {  // async: 비동기 데이터 주고받기가 완료될때까지 기다린 후 다음 라인을 실행

    const comment_data = {
        text: document.getElementById("comment_text").value
    }

    const response = await fetch(`${backend_base_url}/comment`, {
        method: 'POST',
        body: JSON.stringify(comment_data)
    })

    response_json = await response.json()

    if (response.status == 200) {
        let comment_text = document.getElementById("comment_text")
        let name = response_json.message
        comment_text.value = null
        console.log(name)
    } else {
        alert(response.status)
    }
}

function enter_submmit() {
    if (window.event.keyCode == 13) {
        let text = document.getElementById("comment_text")
        console.log(text)
        comment()
        document.getElementById("comment_text").value = '';
    }
}

function modal() {
    let modal = document.getElementById('modal_body')
    modal.style.display = "flex"

    $('.feed_modal').css('display', 'flex')
    $('body').addClass('hidden').on('scroll touchmove mousewheel', function (e) {
        e.preventDefault();
    });

    $(document).mouseup(function (e) {
        if ($(".modal_body").has(e.target).length === 0) {
            $(".modal_body").css('display', 'none');
            $('body').removeClass('hidden').off('scroll touchmove mousewheel');
        }
    });
}

function comment() {
    let text = document.getElementById("comment_text")
    let comment_list = document.getElementById("comment_list")
    let name = ['건빵먹고싶다', '핫도그먹고싶다', '햄버거먹고싶다']
    let pr_photo = ['1.jpeg', '2.jpeg', '3.jpeg']
    let namepick = Math.floor(Math.random() * name.length);
    console.log(pr_photo[namepick])

    Send()

    html = `<div class="modal_comment">
        <div class="comment_pr_photo"><img src="./img/${pr_photo[namepick]}"></div>
        <div class="comment_content_box">
            <div class="comment_content">
                ${text.value}
            </div>
            <div class="comment_bottom_info">
            <div class="comment_nick">${name[namepick]}</div>
            <div class="comment_content_time">방금</div>
            <div class="comment_content_edit">수정</div>
            <div class="comment_content_delete">삭제</div>
            </div>
        </div>
    </div>`

    $('#comment_list').prepend(html)
    text.value = null
}