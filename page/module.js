import {initializeApp} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import {getDatabase, onValue, push, ref} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyDPiJvwzjFL-q3vFjavLF0BZhXrlBjssnE",
    authDomain: "empweb2324.firebaseapp.com",
    databaseURL: "https://empweb2324-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "empweb2324",
    storageBucket: "empweb2324.appspot.com",
    messagingSenderId: "465054098390",
    appId: "1:465054098390:web:91dacda80c331e3d0c7a77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", async function () {
    const text = document.getElementById("postTextArea").value;
    const user = document.cookie.split('=')[1];
    const time = new Date().getTime();

    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page_name');

    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (file) {
        const storageRefPath = `media/${time}_${file.name}`;
        const fileRef = storageRef(storage, storageRefPath);

        await uploadBytes(fileRef, file);

        push(ref(database, page), {
            text: text,
            user: user,
            time: time,
            fileURL: `${time}_${file.name}`
        });

        push(ref(database, user), {
            text: text,
            page: page,
            time: time,
            fileURL: `${time}_${file.name}`
        });
    } else {
        push(ref(database, page), {
            text: text,
            user: user,
            time: time
        });

        push(ref(database, user), {
            text: text,
            page: page,
            time: time
        });
    }
    alert("Submetido com sucesso.");
});

function readData() {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page_name');

    onValue(ref(database, page), (snapshot) => {
        const data = snapshot.val();

        const postsArray = Object.values(data);

        postsArray.sort((a, b) => b.time - a.time);

        const postsContainer = document.getElementById('postsContainer');
        postsContainer.innerHTML = '';
        for (const postId in postsArray) {
            const post = postsArray[postId];
            appendPostToContainer(post);
            console.log(post);
        }
    });
}

function appendPostToContainer(post) {
    const urlParams = new URLSearchParams(window.location.search);
    const userPage = urlParams.get('user_page');
    const page = urlParams.get('page_name');
    const posts = document.getElementById('postsContainer');
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    const userSpan = document.createElement('span');
    userSpan.classList.add('user');
    if(userPage !== 'true') {
        userSpan.textContent = post.user;
    } else {
        userSpan.textContent = page;
    }

    if(userSpan.textContent === 'André') {
        userSpan.style.color = '#FFBF00';
    }
    else if(userSpan.textContent === 'Constança') {
        userSpan.style.color = '#FFA07A';
    }
    else if(userSpan.textContent === 'Helena') {
        userSpan.style.color = '#DF73FF';
    }
    else if(userSpan.textContent === 'Maria') {
        userSpan.style.color = '#E0B0FF';
    }
    else if(userSpan.textContent === 'Martim') {
        userSpan.style.color = '#6050DC';
    }

    const timeSpan = document.createElement('span');
    timeSpan.classList.add('time');
    timeSpan.textContent = calculateTimeDifference(post.time);

    if(userPage === 'true') {
        timeSpan.textContent = post.page + " - " + timeSpan.textContent;
    }

    const textP = document.createElement('p');
    textP.classList.add('text');
    textP.textContent = post.text;

    postDiv.appendChild(userSpan);
    postDiv.appendChild(document.createTextNode(' - '));
    postDiv.appendChild(timeSpan);
    postDiv.appendChild(document.createTextNode(' '));
    postDiv.appendChild(textP);

    if (post.fileURL) {
        const fileContainer = document.createElement('div');
        fileContainer.classList.add('file-container');

        const downloadLink = document.createElement('a');

        const fileRef = storageRef(storage, "media/" + post.fileURL);

        getDownloadURL(fileRef)
            .then((downloadURL) => {
                downloadLink.href = downloadURL;

                downloadLink.textContent = post.fileURL.split('_')[1];

                fileContainer.appendChild(downloadLink);

                postDiv.appendChild(fileContainer);
            })
            .catch((error) => {
                console.error('Error getting download URL:', error);
            });
    }

    posts.appendChild(postDiv);
}

function calculateTimeDifference(postTime) {
    const currentTime = new Date().getTime();
    const difference = currentTime - postTime;

    const minutesDifference = Math.floor(difference / (1000 * 60));

    if (minutesDifference < 60 * 24) {
        return minutesDifference + 'min';
    } else {
        const postDate = new Date(postTime);
        return `${formatTwoDigits(postDate.getHours())}:${formatTwoDigits(postDate.getMinutes())} ${formatDate(postDate)}`;
    }
}

function formatTwoDigits(value) {
    return value < 10 ? '0' + value : value;
}

function formatDate(date) {
    const day = formatTwoDigits(date.getDate());
    const month = formatTwoDigits(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

readData();