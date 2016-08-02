angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.home', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

  .state('menu.upcomingEvents', {
    url: '/page4',
    views: {
      'side-menu21': {
        templateUrl: 'templates/upcomingEvents.html',
        controller: 'upcomingEventsCtrl'
      }
    }
  })

  .state('menu.onWingsMeeting', {
    url: '/page7',
    views: {
      'side-menu21': {
        templateUrl: 'templates/onWingsMeeting.html',
        controller: 'onWingsMeetingCtrl'
      }
    }
  })

  .state('menu.weeklySummary', {
    url: '/page5',
    views: {
      'side-menu21': {
        templateUrl: 'templates/weeklySummary.html',
        controller: 'weeklySummaryCtrl'
      }
    }
  })

    .state('menu.summaryDetails', {
    url: '/page8',
    views: {
      'side-menu21': {
        templateUrl: 'templates/summaryDetails.html',
        controller: 'summaryDetailsCtrl'
      }
    }
  })

  .state('menu.joinOurFamily', {
    url: '/page6',
    views: {
      'side-menu21': {
        templateUrl: 'templates/joinOurFamily.html',
        controller: 'joinOurFamilyCtrl'
      }
    }
  })
  
  .state('menu.pyfMembers', {
    url: '/admin/pyfMembers',
    views: {
      'side-menu21': {
        templateUrl: 'templates/admin/pyfMembers.html',
        controller: 'pyfMembersCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/side-menu21/page1')

  

});

