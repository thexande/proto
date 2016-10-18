angular.module('proto.loginController', [])

.controller('loginController', ['$scope', '$firebaseArray', 'CONFIG', '$document', '$state', function($scope, $firebaseArray, CONFIG, $document, $state) {

    $scope.loginClicked = function() {
        console.log('clicked')
        $location.path('/signup')
    }

    // Perform the login action when the user submits the login form
    $scope.doLogin = function(userLogin) {



        console.log(userLogin);

        if ($document[0].getElementById("user_name").value != "" && $document[0].getElementById("user_pass").value != "") {


            firebase.auth().signInWithEmailAndPassword(userLogin.username, userLogin.password).then(function() {
                // Sign-In successful.
                //console.log("Login successful");




                var user = firebase.auth().currentUser;

                var name, email, photoUrl, uid;

                if (user.emailVerified) { //check for verification email confirmed by user from the inbox

                    console.log("email verified");
                    $state.go("app.dashboard");

                    name = user.displayName;
                    email = user.email;
                    photoUrl = user.photoURL;
                    uid = user.uid;

                    //console.log(name + "<>" + email + "<>" +  photoUrl + "<>" +  uid);

                    localStorage.setItem("photo", photoUrl);

                } else {

                    alert("Email not verified, please check your inbox or spam messages")
                    return false;

                } // end check verification email


            }, function(error) {
                // An error happened.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                if (errorCode === 'auth/invalid-email') {
                    alert('Enter a valid email.');
                    return false;
                } else if (errorCode === 'auth/wrong-password') {
                    alert('Incorrect password.');
                    return false;
                } else if (errorCode === 'auth/argument-error') {
                    alert('Password must be string.');
                    return false;
                } else if (errorCode === 'auth/user-not-found') {
                    alert('No such user found.');
                    return false;
                } else if (errorCode === 'auth/too-many-requests') {
                    alert('Too many failed login attempts, please try after sometime.');
                    return false;
                } else if (errorCode === 'auth/network-request-failed') {
                    alert('Request timed out, please try again.');
                    return false;
                } else {
                    alert(errorMessage);
                    return false;
                }
            });



        } else {

            alert('Please enter email and password');
            return false;

        } //end check client username password


    }; // end $scope.doLogin()

}])