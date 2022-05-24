const backend_base_url = "http://127.0.0.1:5001"
const frontend_base_url = "http://127.0.0.1:5500"

// async function event_page() {
//     const response = await fetch(`${backend_base_url}/event_page`, {
//         method: "GET",
//     });
//     response_json = await response.json();
//     const result = response_json.category;


const main = document.querySelector(".img");
main.addEventListener('click', (event) => {
    window.location.href = "main.html";


});

event_page();