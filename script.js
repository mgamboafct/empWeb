function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var day = now.getDate();
    var month = now.getMonth() + 1;
    var year = now.getFullYear();

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    month = month < 10 ? "0" + month : month;

    var timeString = hours + ":" + minutes + ":" + seconds;
    var dateString = day + "/" + month + "/" + year;

    document.getElementById("clock").innerHTML = timeString + "<br>" + dateString;
  }

function handlePageLoad() {
    updateClock();

    const urlParams = new URLSearchParams(window.location.search)
    const pageName = urlParams.get('page_name');
    const userPage = urlParams.get('user_page');
    const user = document.cookie.split('=')[1];

    console.log(user);
    console.log(pageName, userPage);

    if(user) {
        document.querySelector('.login-btn').innerHTML = user;

        if(user === 'André') {
            document.querySelector('.login-btn').style.background = '#FFBF00';
        }
        else if(user === 'Constança') {
            document.querySelector('.login-btn').style.background = '#FFA07A';
        }
        else if(user === 'Helena') {
            document.querySelector('.login-btn').style.background = '#DF73FF';
        }
        else if(user === 'Maria') {
            document.querySelector('.login-btn').style.background = '#E0B0FF';
        }
        else if(user === 'Martim') {
            document.querySelector('.login-btn').style.background = '#6050DC';
        }
    }

    if (pageName) {
        document.title = document.title  + ` ${pageName}`;
        document.querySelector('.name').textContent = pageName;
    }

    if(userPage === 'true') {
        document.getElementById('create_btn').style.display = 'none';

        if(pageName === 'André') {
            document.querySelector('.name').style.color = '#FFBF00';
        }
        else if(pageName === 'Constança') {
            document.querySelector('.name').style.color = '#FFA07A';
        }
        else if(pageName === 'Helena') {
            document.querySelector('.name').style.color = '#DF73FF';
        }
        else if(pageName === 'Maria') {
            document.querySelector('.name').style.color = '#E0B0FF';
        }
        else if(pageName === 'Martim') {
            document.querySelector('.name').style.color = '#6050DC';
        }
    }
}

function openPopup() {
    document.getElementById('loginPopup').style.display = 'block';
}

function closePopup() {
    document.getElementById('loginPopup').style.display = 'none';
}

function openPostPopup() {
    document.getElementById('postPopup').style.display = 'block';
}

function closePostPopup() {
    document.getElementById('postPopup').style.display = 'none';
}

function selectUser(user) {
    document.cookie = 'user=' + user + '; path=/';
    closePopup();

    console.log(document.cookie);

    document.querySelector('.login-btn').innerHTML = user;

    if(user === 'André') {
        document.querySelector('.login-btn').style.background = '#FFBF00';
    }
    else if(user === 'Constança') {
        document.querySelector('.login-btn').style.background = '#FFA07A';
    }
    else if(user === 'Helena') {
        document.querySelector('.login-btn').style.background = '#DF73FF';
    }
    else if(user === 'Maria') {
        document.querySelector('.login-btn').style.background = '#E0B0FF';
    }
    else if(user === 'Martim') {
        document.querySelector('.login-btn').style.background = '#6050DC';
    }

}

window.addEventListener('load', handlePageLoad);

document.addEventListener('click', function(event) {
    var loginPopup = document.getElementById('loginPopup');
    var postPopup = document.getElementById('postPopup');
    var loginBtn = document.querySelector('.login-btn');
    var postBtn = document.querySelector('.create');
    
    if (event.target !== loginBtn && !loginPopup.contains(event.target)) {
        closePopup();
    }
    if (event.target !== postBtn && !postPopup.contains(event.target)) {
        closePostPopup();
    }
});

setInterval(updateClock, 1000);