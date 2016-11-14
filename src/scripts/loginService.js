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
