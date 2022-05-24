const backend_base_url = "http://127.0.0.1:4000";
const frontend_base_url = "http://127.0.0.1:5500";

async function modal(idnumber) {
  const userdata = {
    idnumber: idnumber,
  };

  const response = await fetch(`${backend_base_url}/modal`, {
    method: "POST",
    body: JSON.stringify(userdata),
  });

  response_json = await response.json();
  const datas = response_json.datas;
  const comments = response_json.comments;

  if (response.status == 200) {
    let _id = datas._id;
    sessionStorage.setItem("_id", _id);
    let email = datas.email;
    let nick = datas.nick;
    let pr_photo = datas.pr_photo;
    let pr_desc = datas.pr_desc;

    let html = `<div class="modal_box">
    <!-- 수정 팝업 -->
    <div id="comment_edit_box" class="comment_edit_box">
      <div class="comment_edit_title">
        <div onclick="comment_edit_close()">
         취소
      </div>
    <div>
        댓글 수정
    </div>
      <div onclick="comment_edit_submit()">
        수정
      </div>
    </div>
    <div class="comment_edit_input">
        <textarea id="edit_input"></textarea>
    </div>
    </div>
    <!-- 수정 팝업끝 -->

    <!-- 삭제 팝업 -->
            <div class="comment_delete">
                <button onclick="comment_delete_submit()">삭제</button>
                <button>취소</button>
            </div>
    <!-- 삭제 팝업끝 -->


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
            <textarea id="pr_edit_input_text" placeholder="Sports TMI....."></textarea>
        </div>
    </div>
    <!-- 프로필 편집 END -->
    <div class="modal_title">
        멤버 카드
        <div onclick="modal_close()"><i class="fa-solid fa-x"></i></div>
        <div><i class="fa-regular fa-square-full"></i></div>
        <div><i class="fa-solid fa-minus"></i></div>
    </div>
    <div class="modal_pr_info">
        <div onclick=pr_img_edit(${email}) class="pr_photo">
            <img src="${pr_photo}">
        </div>
        <div class="pr_desc">
            <div>
                <div class="pr_desc_title">닉네임</div>
                <div id="pr_desc_content" class="pr_desc_content">${nick}</div>
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

</div>`;

    document.querySelector("#modal_body").innerHTML = html;

    comments.forEach((comment) => {
      let comment_content = `<div class="modal_comment">
      <div class="comment_pr_photo"><img src="2.jpeg"></div>
      <div class="comment_content_box">
          <div class="comment_content">
              ${comment.comment}
          </div>
          <div class="comment_bottom_info">
              <div class="comment_nick">${comment.nick}</div>
              <div class="comment_content_time">${comment.date}</div>
              <div onclick="comment_edit('${comment._id}')" class="comment_content_edit">수정</div>
              <div onclick="comment_delete('${comment._id}')" class="comment_content_delete">삭제</div>
          </div>
      </div>
  </div>`;
      document.querySelector("#comment_list").innerHTML += comment_content;
    });

    let modal = document.getElementById("modal_body");
    modal.style.display = "flex";

    document.querySelector("body").classList.add("hidden");

    // window.onscroll = function () { window.scrollTo(0, 0); };

    // $("body")
    //   .addClass("hidden")
    //   .on("scroll touchmove mousewheel", function (e) {
    //     e.preventDefault();
    //   });

    // $(document).mouseup(function (e) {
    //   if ($(".modal_body").has(e.target).length === 0) {
    //     $(".modal_body").css("display", "none");
    //     $("body").removeClass("hidden").off("scroll touchmove mousewheel");
    //   }
    // });

    document.querySelector("#comment_list").scrollTop =
      document.querySelector("#comment_list").scrollHeight;
  } else {
    alert(response.status);
  }
}

async function comment() {
  // async: 비동기 데이터 주고받기가 완료될때까지 기다린 후 다음 라인을 실행

  const comment_data = {
    text: document.getElementById("comment_text").value,
    nick: document.getElementById("pr_desc_content").innerText,
  };

  const response = await fetch(`${backend_base_url}/comment`, {
    method: "POST",
    body: JSON.stringify(comment_data),
  });

  response_json = await response.json();
  let nickname = response_json.nickname;
  let pr_photo = response_json.pr_photo;

  if (response.status == 200) {
    let comment_text = document.getElementById("comment_text");

    html = `<div class="modal_comment">
        <div class="comment_pr_photo"><img src="${pr_photo}"></div>
        <div class="comment_content_box">
            <div class="comment_content">
                ${comment_text.value}
            </div>
            <div class="comment_bottom_info">
            <div class="comment_nick">${nickname}</div>
            <div class="comment_content_time">방금</div>
            <div class="comment_content_edit">수정</div>
            <div class="comment_content_delete">삭제</div>
            </div>
        </div>
    </div>`;

    feed_number = sessionStorage.getItem('_id')
    modal(feed_number)
    document.querySelector("#comment_list").scrollTop =
      document.querySelector("#comment_list").scrollHeight;
  } else {
    alert(response.status);
  }

  return nickname;
}

function enter_submmit() {
  if (window.event.keyCode == 13) {
    let text = document.getElementById("comment_text");
    comment();
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

    document.querySelector("#member_list").innerHTML += html;
  });

  // return response_json.users;
}

function pr_edit() {
  document.getElementById("pr_edit_box").style.display = "block";
}

function pr_edit_close() {
  document.getElementById("pr_edit_box").style.display = "none";
}

function comment_edit_close() {
  document.querySelector(".comment_edit_box").style.display = "none";
}

async function pr_edit_submit(emailuid){
  value = document.getElementById('pr_edit_input_text').value
  const email = {
    email: emailuid,
    value : value,
  };

  const response = await fetch(`${backend_base_url}/pr_edit`, {
    method: "POST",
    body: JSON.stringify(email),
  });

  response_json = await response.json();
  document.getElementById('pr_edit_box').style.display = "none"
  feed_number = sessionStorage.getItem('_id')
  modal(feed_number)

  if (response.status == 200) {

  }else{

  }
}

async function comment_edit(cm_number) {
  const commentdata = {
    cm_number: cm_number,
  };

  const response = await fetch(`${backend_base_url}/comment_edit`, {
    method: "POST",
    body: JSON.stringify(commentdata),
  });

  // document.querySelector(".comment_edit_box").style.display = "block"

  response_json = await response.json();

  if (response.status == 200) {
    const cm_data = response_json.cm_data;

    document.querySelector("#edit_input").value = cm_data["comment"];
    html = `        <div class="comment_edit_title">
    <div onclick="comment_edit_close()">
        취소
    </div>
    <div>
        댓글 수정
    </div>
    <div onclick="comment_edit_submit('${cm_data._id}')">
        수정
    </div>
</div>
<div class="comment_edit_input">
    <textarea id="edit_input">${cm_data["comment"]}</textarea>
</div>`;
    document.querySelector("#comment_edit_box").innerHTML = html;
    document.querySelector("#comment_edit_box").style.display = "block";
  } else {
    alert(response.status);
  }
}

async function comment_edit_submit(cm_number) {
  value = document.querySelector("#edit_input").value;
  const commentdata = {
    cm_number: cm_number,
    value: value,
  };

  const response = await fetch(`${backend_base_url}/comment_edit_submit`, {
    method: "POST",
    body: JSON.stringify(commentdata),
  });

  document.querySelector("#comment_edit_box").style.display = "none";

  feed_number = sessionStorage.getItem('_id')
  modal(feed_number)

  response_json = await response.json();

  if (response.status == 200) {
  } else {
    alert(response.status);
  }
}

function comment_delete(cm_number) {
  let number = cm_number
  sessionStorage.setItem("cm_number", number);
  document.querySelector('.comment_delete').style.display = "flex"
}

async function comment_delete_submit(){
  cm_number = sessionStorage.getItem('cm_number')
  document.querySelector('.comment_delete').style.display = "none"
  
  const data = {
    cm_number: cm_number,
  };

  const response = await fetch(`${backend_base_url}/comment_delete`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  response_json = await response.json();

  if (response.status == 200) {
    feed_number = sessionStorage.getItem('_id')
    modal(feed_number)
  } else {
    alert(response.status);
  }

}

async function pr_img_edit(email) {
  console.log(email)
}

function modal_close() {
  document.getElementById('modal_body').style.display = 'none'
}

function slide() {
  img_list = [
    "./img/baseball/2.jpg",
    "./img/baseball/3.jpg",
    "./img/baseball/4.jpg",
    "./img/baseball/5.jpg",
  ];

  let count = 0;

  let i = setInterval(function () {
    // do your thing

    html = `<img src="${img_list[count]}" id="slide" class="fadein">`;
    document.getElementById("slide_main").innerHTML = html;
    count++;
    if (count === 4) {
      count = 0;
    }
  }, 4000);

  // setInterval(() => document.getElementById('slide').src = img_list[2], 2000);
}

user_load();
slide();
