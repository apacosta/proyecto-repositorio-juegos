
app.controller("logoutController", function ($rootScope, $location, userService) {
    var user = this;
    
    user.logout = function () {
        userService.logout();
    };
    
    user.logout();
});
