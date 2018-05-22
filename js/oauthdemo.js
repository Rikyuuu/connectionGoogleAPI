hello.init({
    google: "" // Insert your Google API Key in ""
});

hello.on('auth.login', function (auth) {

    // add a greeting and access the thumbnail and name from
    // the authorized response

    hello(auth.network).api('/me').then(function (resp) {
    var lab = document.createElement("div");
    lab.id = "pic_and_greet";
    lab.innerHTML = '<img src="' + resp.thumbnail + '" /> Hey ' + resp.name;
    document.body.appendChild(lab);
    });
});

// remove the greeting when we log out

hello.on('auth.logout', function () {
    var lab = document.getElementById("pic_and_greet");
    if (lab != null) document.body.removeChild( lab );
});



var online = function(session) {
    var currentTime = (new Date()).getTime() / 1000;
    return session && session.access_token && session.expires > currentTime;
};

// variable for selected button for class "verifAndConnexionLogin" login 
var buttonVerifAndConnexionLogin = document.querySelector('.verifAndConnexionLogin');

// run the function verifAndConnexionLogin() when we click on the button class "verifAndConnexionLogin"
buttonVerifAndConnexionLogin.addEventListener('click', verifAndConnexionLogin);

function verifAndConnexionLogin() {
    var googleConnexion = hello('google').getAuthResponse(); // Nicolas and Julien - check Login status

    if (online(googleConnexion)) { // if user connected
        alert('Vous êtes déjà connecté');
    }
    else { // else user not connected
        console.log('Vous n\'êtes pas connecté');
        hello('google').login()
    }
}
