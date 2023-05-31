import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyD1lQYDj7pGwkGljeZpw9RysQ2feqyJTNI",
    authDomain: "form-login-fc20d.firebaseapp.com",
    projectId: "form-login-fc20d",
    storageBucket: "form-login-fc20d.appspot.com",
    messagingSenderId: "552644705127",
    appId: "1:552644705127:web:ffdb87f5bad4bab7d20dc2",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// document.getElementById("autoris-btm").innerHTML = loginEmail || "Авторизація";

// натиск по кнопці авторизації на панале навігації
document.getElementById("autoris-btm").addEventListener("click", function () {
    document.getElementById("login-div").style.display = "inline";
});


// document.getElementById("close-btn").addEventListener("click", function () {
//     document.getElementById("login-div").style.display = "none";
// });



// REG, LOG DISPLAYS

document.getElementById("close-btn-log").addEventListener("click", function () {
    document.getElementById("login-div").style.display = "none";
});

document.getElementById("close-btn-reg").addEventListener("click", function () {
    document.getElementById("register-div").style.display = "none";
});

document.getElementById("close-btn-reslt").addEventListener("click", function () {
    document.getElementById("result-box").style.display = "none";
});




document.getElementById("reg-btn").addEventListener("click", function () {
    document.getElementById("register-div").style.display = "inline";
    document.getElementById("login-div").style.display = "none";
});

document.getElementById("log-btn").addEventListener("click", function () {
    document.getElementById("register-div").style.display = "none";
    document.getElementById("login-div").style.display = "inline";
});


// LOG-IN
document.getElementById("login-btn").addEventListener("click", function () {
    const loginEmail = document.getElementById("login-email").value;
    const loginPassword = document.getElementById("login-password").value;


    // document.getElementById("close-btn").addEventListener("click", function () {
    //     document.getElementById("login-div").style.display = "none";
    // });


    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            document.getElementById("result-box").style.display = "inline";
            document.getElementById("login-div").style.display = "none";
            document.getElementById("result").innerHTML =
                "З поверненням, <br>" + loginEmail + ", вхід успішний!";
            document.getElementById("autoris-btm").innerHTML = loginEmail;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // document.getElementById("result-box").style.display = "inline";
            // document.getElementById("login-div").style.display = "none";
            // document.getElementById("result").innerHTML =
            //     "Помилка ! <br>" + errorMessage;
            alert("Помилка ! <br>"+errorMessage)
        }
    );
});

// REGISTER
document.getElementById("register-btn").addEventListener("click", function () {
    const registerEmail = document.getElementById("register-email").value;
    const registerPassword = document.getElementById("register-password").value;


    // document.getElementById("close-btn").addEventListener("click", function () {
    //     document.getElementById("register-div").style.display = "none";
    // });

    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            document.getElementById("result-box").style.display = "inline";
            document.getElementById("register-div").style.display = "none";
            document.getElementById("result").innerHTML =
                "Ласкаво просимо, <br>" + registerEmail + ". Регістрація успішна!";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // document.getElementById("result-box").style.display = "inline";
            // document.getElementById("register-div").style.display = "none";
            // document.getElementById("result").innerHTML =
            //     "Помилка ! <br>" + errorMessage;
            alert("Помилка ! <br>"+errorMessage)
        });
});

// LOG-OUT
document.getElementById("log-out-btn").addEventListener("click", function () {
    signOut(auth)
        .then(() => {
            document.getElementById("result-box").style.display = "none";
            document.getElementById("login-div").style.display = "inline";
        })
        .catch((error) => {
            // document.getElementById("result").innerHTML =
            //     "Помилка ! <br>" + errorMessage;
            alert("Помилка ! <br>"+errorMessage)
        });
});



// -----------------------------------------------------------


// const userCardTemplate = document.querySelector("[data-user-template]");
// const userCardContainer = document.querySelector("[data-user-cards-container]");
// const searchInput = document.querySelector("[data-search]");

// let users = [];

// document.getElementById("search").addEventListener("focus", function () {
//     document.getElementById("user-c").style.display = "block";
//     document.getElementById("user-c").style.position = "absolute";
// });

// document.getElementById("search").addEventListener("blur", function () {
//     document.getElementById("user-c").style.display = "none";
// });

// searchInput.addEventListener("input", (e) => {
//     const value = e.target.value.toLowerCase();
//     users.forEach((user) => {
//         const isVisible = user.name.toLowerCase().includes(value);
//         user.element.classList.toggle("hide", !isVisible);
//     });
// });

// fetch("../json/filmbase.json")
//     .then((res) => res.json())
//     .then((data) => {
//         users = data.map((user) => {
//             const card = userCardTemplate.content.cloneNode(true).children[0];
//             const header = card.querySelector("[data-header]");

//             header.textContent = user.name;
//             userCardContainer.append(card);

//             return { name: user.name, element: card };
//         });
//     }
// );



const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[data-search]");

let users = [];

document.getElementById("search").addEventListener("focus", function () {
    document.getElementById("user-c").style.display = "flex";
    // document.getElementById("user-c").style.position = "absolute";
});

document.getElementById("search").addEventListener("blur", function () {
    document.getElementById("user-c").style.display = "none";
});

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    users.forEach((user) => {
        const isVisible = user.name.toLowerCase().includes(value);
        user.element.classList.toggle("hide", !isVisible);
    });
});

fetch("./database.json")
.then((res) => res.json())
.then((data) => {
    users = data.map((user) => {
        const card = userCardTemplate.content.cloneNode(true).children[0];
        const header = card.querySelector("[data-header]");

        header.textContent = user.name;

        userCardContainer.append(card);

        return { name: user.name, element: card};
    });
});

    
// fetch("./database.json")
// .then((res) => res.json())
// .then((data) => {
//     users = data.map((user) => {
//         const card = userCardTemplate.content.cloneNode(true).children[0];
//         const header = card.querySelector("[data-header]");
//         const link = card.querySelector("[data-link]");

//         header.textContent = user.name;
//         link.dataset.link = user.link || ""; // Устанавливаем значение атрибута data-link из JSON

//         // Добавляем слушатель события клика на элемент SEARCH-poisk-id
//         card.querySelector("card").addEventListener("click", function () {
//             if (user.link) {
//                 window.location.href = user.link; // Переход по ссылке из JSON
//             }
//         });

//         userCardContainer.append(card);

//         return { name: user.name, element: card };
//     });
// });





// ===== DET =====