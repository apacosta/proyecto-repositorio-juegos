var app = angular.module("MyLogin", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/login", {
            controller: "loginController",
            controllerAs: "user",
            templateUrl: "pages/login.html"
        })
        .when("/main", {
            templateUrl: "pages/main.html"
        })
        .when("/logout", {
            controller: "logoutController",
            templateUrl: "pages/logout.html"
        })
        .otherwise({
            redirectTo: "/main"
        });
});

app.run(function ($rootScope, $location) {
    $rootScope.$on("$routeChangeStart", function (event, next) {
        if (!$rootScope.loggedIn && next.originalPath !== "/login") {
            $location.url("/login?back=" + $location.url());
        }
    });
});
/*

$rootScope
Every application has a single root scope. All other scopes are descendant 
scopes of the root scope. Scopes provide separation between the model and 
the view, via a mechanism for watching the model for changes. They also provide 
event emission/broadcast and subscription facility.


$routeChangeStart
Broadcasted before a route change. At this point the route services starts 
resolving all of the dependencies needed for the route change to occur. 
Typically this involves fetching the view template as well as any dependencies
defined in resolve route property. Once all of the dependencies are resolved 
$routeChangeSuccess is fired.
The route change (and the $location change that triggered it) 
can be prevented by calling preventDefault method of the event. 
*/
app.service("userService", function ($http) {
    return {
        checkLogin: function () {
            return $http.get("/me").then(function (response) {
                return response.data;
            });
        },
        logout: function () {
            return $http.get("/logout").then(function (response) {
                return response.data;
            });
        },
        login: function (user, pass) {
            return $http.post("/login", {
                user: user,
                pass: pass
            }).then(function (response) {
                return response.data;
            }, function (response) {
                var err = new Error(response.statusText);
                err.code = response.status;
                throw err;
            });
        }
    };
});


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


app.controller("logoutController", function ($rootScope, $location, userService) {
    var user = this;
    
    user.logout = function () {
        userService.logout();
    };
    
    user.logout();
});
