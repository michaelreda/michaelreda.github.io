angular.module('app.controllers', ['ionic'])
        .controller('LoadingCtrl', function ($rootScope, $ionicLoading) {
            $rootScope.show = function ($ionicLoading) {
                $ionicLoading.show({
                    template: 'Loading...'
                }).then(function () {
                    console.log("The loading indicator is now displayed");
                });
            };
            $rootScope.hide = function ($ionicLoading) {
                $ionicLoading.hide().then(function () {
                    console.log("The loading indicator is now hidden");
                });
            };
        })

        //testing if this is the first time to run the app
        .factory('App', function ($window) {
            return{
                setInitialRun: function (initial) {
                    $window.localStorage["initialRun"] = (initial ? "true" : "false");
                },
                isInitialRun: function () {
                    var value = $window.localStorage["initialRun"] || "true";
                    return value == "true";
                }
            };
        })

        .run(function ($timeout, $state, $rootScope, $window, App) {
            var state = "menu.home";  // whatever, the main page of your app

            if (App.isInitialRun() || $window.localStorage.getItem('user_id') == "") {
                App.setInitialRun(false);
                state = "menu.joinOurFamily";

            } else {
                $rootScope.user_id = $window.localStorage.getItem('user_id');

            }

            $timeout(function () {
                $state.go(state);
            });

        })

        .controller('homeCtrl', function ($scope, $http, $state, $rootScope, $window) {
            var init = function () {
               
               if (typeof $window.localStorage.getItem('user_id') == undefined || $window.localStorage.getItem('user_id') == null || $window.localStorage.getItem('user_id')=="") //if first time
                    $state.go('menu.joinOurFamily'); //go to sign up view.
                else {
                    $rootScope.user_id = $window.localStorage.getItem('user_id');
                }
            };
            init();
            /*
             
             $rootScope.user_id = $window.localStorage.getItem('user_id');
             $http.get("js/storage_file.txt").then(function (response) {
             $user_id = response.data;
             //console.log($user_id);
             
             if ($user_id == "") {
             $state.go("menu.joinOurFamily");
             } else {
             // $rootScope.user_id = $user_id;
             $http.post("js/get_user_details.php", {'id': $user_id})
             .then(function (response) {
             $rootScope.user_data = response.data.records;
             });
             //console.log($rootScope.user_data);
             }
             
             })
             };
             init();  */
            // $window.location.reload();
        })

        .controller('upcomingEventsCtrl', function ($scope) {

        })

        .controller('onWingsMeetingCtrl', function ($scope) {

        })

        .controller('weeklySummaryCtrl', function ($scope, $http, $rootScope, $state, $ionicLoading) {
            $http.get("js/get_summaries.php")
                    .then(function (response) {
                        $scope.summaries = response.data.records;
                    });
            $scope.open_summary = function (summary_id) {
                $ionicLoading.show({
                    template: 'Loading...'

                });
                $rootScope.summary_id = summary_id;
                $state.go("menu.summaryDetails");
            }

        })

        .controller('summaryDetailsCtrl', function ($scope, $http, $rootScope, $state, $ionicLoading) {

            $http.post("js/get_summary_by_id.php", {'id': $rootScope.summary_id})
                    .then(function (response) {
                        $scope.summary = response.data.records;
                    });
            $ionicLoading.hide();
        })

        .controller('joinOurFamilyCtrl', function ($scope, $rootScope, $ionicPopup, $timeout, $ionicHistory, $http, $state, $window) {
            
            
          //  $('#side-menu21').hide();
            // Triggered on a button click, or some other target
            $scope.Join = function (first_name, last_name, age, homeCity, mobile, church, faculty, dash) {
                $http.get("js/insert.php");
                if (first_name == undefined || last_name == undefined || age == undefined || homeCity == undefined || mobile == undefined || church == undefined || faculty == undefined || dash == undefined) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Please complete all empty fields :)',
                    });
                    alertPopup.then(function (res) {

                    });
                } else {


                    //$http.post("192.168.1.10:8080/insert.php",{'name' : name, 'age': age, 'homeCity' : homeCity, 'mobile' : mobile, 'church': church,'faculty' : faculty,'dash': dash})
                    $http.post("js/insert.php", {'first_name': first_name, 'last_name': last_name, 'age': age, 'homeCity': homeCity, 'mobile': mobile, 'church': church, 'faculty': faculty, 'dash': dash})
                            .error(function (err) {
                                var alertPopup = $ionicPopup.alert({
                                    title: err,
                                });
                                alertPopup.then(function (res) {

                                });
                            })

                            .success(function (data) {
                                $user_id = data;
                                console.log($user_id);
                                $window.localStorage.setItem("user_id", $user_id);
                                // $http.post("js/edit_storage_file.php", {'id': $user_id + ""}); //save id in a text file
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Welcome ' + first_name, //'a new family member',
                                    template: 'You are now a Parthenian :)'
                                });
                                alertPopup.then(function (res) {
                                    $state.go("menu.home");
                                });
                            });
                }


            };
        })

        .controller('pyfMembersCtrl', function ($scope, $http, $ionicPopup, $ionicLoading) {

            var init = function () {
                $ionicLoading.show({
                    template: 'Loading...'

                });
                $('#spinner').show();
                $http.get("php/get_members.php")
                        .then(function (response) {
                            $scope.members = response.data.records;
                        });
            };
            init();
            $ionicLoading.hide();
            // $('#spinner').hide();
            $scope.member_info = function (member_id) {
                $http.post("js/get_user_details.php", {'id': member_id})
                        .then(function (response) {
                            member = response.data.records;
                            var alertPopup = $ionicPopup.alert({
                                title: member.first_name + " " + member.last_name,
                                template: "Age: " + member.age + "<br>Home City: " + member.home_city + "<br>Mobile Number: " + member.mobile_number
                                        + "<br>Church: " + member.church + "<br>Faculty: " + member.faculty + "<br>Class: " + member.class
                            });
                            alertPopup.then(function (res) {
                                // $state.go("menu.home");
                            });
                        });
            };
            $scope.delete_member = function (member_id, name) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Deleting member',
                    template: 'Are you sure you want to delete ' + name + '?'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        $http.post("php/delete_data_by_id.php", {'table': "members", 'id': member_id})
                                .success(function () {

                                    var alertPopup = $ionicPopup.alert({
                                        title: "member deleted",
                                    });
                                    alertPopup.then(function (res) {
                                        init();
                                        $ionicLoading.hide();
                                    });
                                });
                    } else {

                    }
                });
            };
        })



 
