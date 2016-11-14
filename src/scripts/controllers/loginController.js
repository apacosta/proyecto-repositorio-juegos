
app.controller("loginController", function ($rootScope, $location, userService) {
    var user = this;

    function success() {
        $rootScope.loggedIn = true;

        var back = $location.search().back || "";
        $location.url(back !== "/login" ? back : "");
    }

    function failure() {
        $rootScope.loggedIn = false;
    }

    user.login = function  () {
        userService.login(user.user, user.pass).then(success, failure);
    };
    
    
    userService.checkLogin().then(success);
});
