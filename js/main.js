const backend_base_url = "http://127.0.0.1:4000";
const frontend_base_url = "http://127.0.0.1:5500";

async function Send() {
  // async: 비동기 데이터 주고받기가 완료될때까지 기다린 후 다음 라인을 실행

  const comment_data = {
    text: document.getElementById("comment_text").value,
  };

  const response = await fetch(`${backend_base_url}/comment`, {
    method: "POST",
    body: JSON.stringify(comment_data),
  });

  response_json = await response.json();

  if (response.status == 200) {
    let comment_text = document.getElementById("comment_text");
    let name = response_json.result;
    comment_text.value = null;
    console.log(name);
  } else {
    alert(response.status);
  }
}

function enter_submmit() {
  if (window.event.keyCode == 13) {
    let text = document.getElementById("comment_text");
    console.log(text);
    comment();
    document.getElementById("comment_text").value = "";
  }
}

async function user_load() {
  const response = await fetch(`${backend_base_url}/user_load`, {
    method: "GET",
  });

  response_json = await response.json();
  const users = response_json.users;
  users.forEach((user) => {
    html = `<div onclick="modal('${user._id}')">
          <img src="${user.pr_photo}">
      </div>`;

    $("#member_list").append(html);
  });

  return response_json.users;
}

async function modal(idnumber) {
    console.log(idnumber)
  const userdata = {
    idnumber: idnumber,
  };

  const response = await fetch(`${backend_base_url}/modal`, {
    method: "POST",
    body: JSON.stringify(userdata),
  });

  response_json = await response.json();
  const datas = response_json.datas;

  if (response.status == 200) {
    let _id = datas._id;
    let email = datas.email;
    let nick = datas.nick;
    let pr_photo = datas.pr_photo;
    let pr_desc = datas.pr_desc;

    let html = `<div class="modal_box">
    <!-- 프로필 편집 -->
    <div id="pr_edit_box" class="pr_edit_box">
        <div class="pr_edit_title">
            <div onclick="pr_edit_close()">
                취소
            </div>
            <div>
                프로필 편집
            </div>
            <div onclick="pr_edit_submit('${email}')">
                수정
            </div>
        </div>
        <div class="pr_edit_input">
            <textarea placeholder="Sports TMI....."></textarea>
        </div>
    </div>
    <!-- 프로필 편집 END -->
    <div class="modal_title">
        멤버 카드
    </div>
    <div class="modal_pr_info">
        <div class="pr_photo">
            <img src="${pr_photo}">
        </div>
        <div class="pr_desc">
            <div>
                <div class="pr_desc_title">닉네임</div>
                <div class="pr_desc_content">${nick}</div>
                <div onclick=pr_edit() class="pr_desc_edit">프로필편집</div>
            </div>
            <div>
                <div class="pr_desc_title">이메일</div>
                <div class="pr_desc_content">${email}</div>
            </div>
            <div>
                <div class="pr_desc_title_tmi">
                    <div>Sport TMI</div>
                </div>
                <div class="pr_desc_content">
                    ${pr_desc}
                </div>
            </div>
        </div>
    </div>

    <div id="comment_list" class="comment_content_box_list">

        <!-- 모달 코멘트 시작 -->
        <!-- <div class="modal_comment">
            <div class="comment_pr_photo"><img src="./img/1.jpeg"></div>
            <div class="comment_content_box">
                <div class="comment_content">
                    안치홍을 상대로는 볼넷을 내주며 3회 이후 처음으로 누상에 주자를 내보냈다. 팔의 힘이 빠진 듯 했다.
                </div>
                <div class="comment_bottom_info">
                    <div class="comment_nick">라면먹고싶다</div>
                    <div class="comment_content_time">방금</div>
                    <div class="comment_content_edit">수정</div>
                    <div class="comment_content_delete">삭제</div>
                </div>
            </div>
        </div> -->
        <!-- 모달 코멘트 끝 -->

    </div>

    <!-- 댓글 입력창 시작 -->
    <div class="modal_comment_input">
        <div>
            <textarea onkeypress="enter_submmit()" id="comment_text" placeholder="입력...."></textarea>
        </div>
        <button onclick="comment()" class="comment_button" type="button">전송</button>


    </div>
    <!-- 댓글 입력창 끝 -->

</div>`

    let comment1 = `<!-- 모달 코멘트 시작 -->
    <div class="modal_comment">
        <div class="comment_pr_photo"><img src="${pr_photo}"></div>
        <div class="comment_content_box">
            <div class="comment_content">
                안치홍을 상대로는 볼넷을 내주며 3회 이후 처음으로 누상에 주자를 내보냈다. 팔의 힘이 빠진 듯 했다.
            </div>
            <div class="comment_bottom_info">
                <div class="comment_nick">라면먹고싶다</div>
                <div class="comment_content_time">방금</div>
                <div class="comment_content_edit">수정</div>
                <div class="comment_content_delete">삭제</div>
            </div>
        </div>
    </div>
    <!-- 모달 코멘트 끝 -->`

    let comment2 = `<!-- 모달 코멘트 시작 -->
    <div class="modal_comment">
        <div class="comment_pr_photo"><img src="${pr_photo}"></div>
        <div class="comment_content_box">
            <div class="comment_content">
                안녕하세요 요즘 들어 자주 들러요 행복한 하루 보내세요!
            </div>
            <div class="comment_bottom_info">
                <div class="comment_nick">김밥먹고싶다</div>
                <div class="comment_content_time">1초전</div>
                <div class="comment_content_edit">수정</div>
                <div class="comment_content_delete">삭제</div>
            </div>
        </div>
    </div>
    <!-- 모달 코멘트 끝 -->`



    $('#modal_body').html(html)
    $('#comment_list').append(comment1)
    $('#comment_list').append(comment2)

    let modal = document.getElementById("modal_body");
    modal.style.display = "flex";

    $("body")
      .addClass("hidden")
      .on("scroll touchmove mousewheel", function (e) {
        e.preventDefault();
      });

    $(document).mouseup(function (e) {
      if ($(".modal_body").has(e.target).length === 0) {
        $(".modal_body").css("display", "none");
        $("body").removeClass("hidden").off("scroll touchmove mousewheel");
      }
    });


    
  } else {
    alert(response.status);
  }

   
}

function pr_edit() {
  document.getElementById("pr_edit_box").style.display = "block";
}

function pr_edit_close() {
  document.getElementById("pr_edit_box").style.display = "none";
}

function pr_edit_submit(email) {
  console.log(email);
}

function comment() {
  let text = document.getElementById("comment_text");
  let comment_list = document.getElementById("comment_list");
  let name = ["건빵먹고싶다", "핫도그먹고싶다", "햄버거먹고싶다"];
  let pr_photo = ["1.jpeg", "2.jpeg", "3.jpeg"];
  let namepick = Math.floor(Math.random() * name.length);
  console.log(pr_photo[namepick]);

  Send();

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
    </div>`;

  $("#comment_list").prepend(html);
  text.value = null;
}

user_load();
