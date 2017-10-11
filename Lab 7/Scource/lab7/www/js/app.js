// Ionic Starter App
//import { Http } from @angular/http;

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('todo', ['ionic'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
         
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
        window.plugins.flashlight.available(function(isAvailable) {
  if (isAvailable) {

    // switch on
    window.plugins.flashlight.switchOn(
      function() {}, // optional success callback
      function() {}, // optional error callback
      {intensity: 0.3} // optional as well
    );

    // switch off after 3 seconds
    setTimeout(function() {
      window.plugins.flashlight.switchOff(); // success/error callbacks may be passed
    }, 3000);

  } else {
    alert("Flashlight not available on this device");
  }

   
});
        
    });
  })

  .controller('TodoCtrl', function ($scope,$http,$ionicModal) {
    $scope.tasks = [{title:'world news'}  
                   
    ];

   
           var url="https://www.reddit.com/r/worldnews/.json";
  //  console.log(url);
    $http.get(url).success(function (response){
       //var obj1=JSON.parse(response[2])
  console.log(response.data.children[0].data.title)
       var i=0;
        while(i<response.data.children.length){
          $scope.tasks.push({title:response.data.children[i].data.title});
        i=i+1;
        } 
    });
    
    
    // Create and load the Modal
    $ionicModal.fromTemplateUrl('views/newtask.html', function (modal) {
      $scope.taskModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
      });
      
      $ionicModal.fromTemplateUrl('views/demo.html', function (modal) {
      $scope.taskModal1 = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
      });
      
    // Called when the form is submitted
    $scope.createTask = function (task) {
        
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        console.log('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        if( window.plugins && window.plugins.NativeAudio ) {

        window.plugins.NativeAudio.preloadSimple( 'click', 'song.mp3', function(msg){
	}, function(msg){
		console.log( 'error: ' + msg );
	});
            window.plugins.NativeAudio.play( 'click' );
        }

    }



};
        
  
          window.plugins.flashlight.switchOn(
      function() {}, // optional success callback
      function() {}, // optional error callback
      {intensity: 0.3} // optional as well
    );
        setTimeout(function() {
      window.plugins.flashlight.switchOff(); // success/error callbacks may be passed
    }, 5000);
        $scope.tasks=[];
           var url="https://kgsearch.googleapis.com/v1/entities:search?query=" + task.title + "&key=AIzaSyDzvCzyfdZSAjj1yE9t5FxF7JwpGM_qgA0&limit=10&indent=True";
    console.log(url);
    $http.get(url).success(function (response){
       //var obj1=JSON.parse(response[2])
//  console.log(response.itemListElement[0].result.description)
        var i=0;
        while(i<response.itemListElement.length){
          $scope.tasks.push({title:response.itemListElement[i].result.detailedDescription.articleBody});
        i=i+1;
        }
    });
        
        
   //   $scope.tasks.push({
     //   title: task.title
//      });
        
    
        
      // $scope.taskModal.hide();
      task.title = "";
    };
    
    // Open our new task modal
    $scope.newTask = function () {
      $scope.taskModal.show();
    };
  $scope.migrate = function () {
      $scope.taskModal1.show();
    };

    // Close the new task modal
    $scope.closeNewTask = function () {
      $scope.taskModal.hide();
        $scope.taskModal1.hide();
  


   /* 
     
      var url="https://kgsearch.googleapis.com/v1/entities:search?query=taylor+swift&key=AIzaSyDzvCzyfdZSAjj1yE9t5FxF7JwpGM_qgA0&limit=1&indent=True";
              $scope.tasks.push({title:'harshil1'});
           $http.get(url).success(function (response){
                     $scope.tasks.push({title:'harshil'});
           var obj = JSON.parse(response.json());
consol.log(obj)
//alert(obj.count);
  //             var ans=String(response[1]);
             $scope.tasks.push({title:String(obj.count)});
                 
          /*  $scope.farm_ids = [];
            $scope.server_ids = [];
            $scope.ids = [];
            $scope.secrets = [];
            $scope.images = [];
            var i = 0;
            while (i < response.photos.photo.length) {
                $scope.farm_ids[i] = response.photos.photo[i].farm;
                $scope.server_ids[i] = response.photos.photo[i].server;
                $scope.ids[i] = response.photos.photo[i].id;
                $scope.secrets[i] = response.photos.photo[i].secret;
                $scope.images[i] = $scope.imageUrlBuilder($scope.farm_ids[i], $scope.server_ids[i], $scope.ids[i], $scope.secrets[i]);
                 i += 1; 
                 
           }
        
        
               <ion-content>
        
        <script type="text/javascript">
    var service_url = 'https://kgsearch.googleapis.com/v1/entities:search';
    var params = {
        'query': 'trump',
        'limit': 10,
        'indent': true,
        'key' : 'AIzaSyDzvCzyfdZSAjj1yE9t5FxF7JwpGM_qgA0',
    };
    $.getJSON(service_url + '?callback=?', params, function(response) {
        $.each(response.itemListElement, function(i, element) {
            $('<div>', {text:element['result']['name']}).appendTo(document.body);
        });
    });
</script>
        
        </ion-content>
        
        
        
        
        
                             
        });
       */ 
        
    };
    
  
    
    
  });
 