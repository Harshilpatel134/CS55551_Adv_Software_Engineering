/**
 * Created by user on 23/10/2016.
 */
var myapp = angular.module('demoMongo',[]);
myapp.run(function ($http) {
    // Sends this header with any AJAX request

    // Send this header only in post requests. Specifies you are sending a JSON object

});
myapp.controller('MongoRestController',function($scope,$http){

    $scope.insertData = function(){
        $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        $http.defaults.headers.post['dataType'] = 'json';
       /* console.log($scope.formData.lname);
        console.log($scope.formData.fname);
        console.log($scope.formData.email);
        console.log($scope.formData.password);
        console.log($scope.formData.cpassword);
        */
        var dataParams = {
            'fname' : $scope.fname,
            'lname' : $scope.lname,
            'email' : $scope.email,
            'pw' : $scope.pw
        };
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        var req = $http.post('http://127.0.0.1:8081/register',$scope.formData);
        req.success(function(data, status, headers, config) {
            $scope.message = data;
            console.log(data);
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    };

    $scope.callapi = function(){

       // $scope.tasks=[];
        var url="https://kgsearch.googleapis.com/v1/entities:search?query=" + $scope.formData.search + "&key=AIzaSyDzvCzyfdZSAjj1yE9t5FxF7JwpGM_qgA0&limit=5&indent=True";
        console.log(url);
var t1,t2,t3,t4,t5;
       $scope.search='harshil';
        $http.get(url).success(function (response){
            //var obj1=JSON.parse(response[2])
  console.log(response)
            var i=0;

                console.log(response.itemListElement[0].result.name);
                t1=String(response.itemListElement[0].result.name);
            t2=String(response.itemListElement[1].result.name);
            t3=String(response.itemListElement[2].result.name);
            t4=String(response.itemListElement[3].result.name);
            t5=String(response.itemListElement[4].result.name);

                console.log(t1);
               // $scope.formData.search=response.itemListElement[i].result.name;

           // document.getElementsByName('search').value="harshil";
        //    document.getElementById("t1").innerHTML=response.itemListElement[0].result.name.toString();
         //   $scope.fromdata.search=response.itemListElement[0].result.name.toString();
            console.log(t1);
            $scope.formData.t1= '' + t1;
            $scope.formData.t2= '' + t2;
            $scope.formData.t3= '' + t3;
            $scope.formData.t4= '' + t4;
            $scope.formData.t5= '' + t5;

           // insertData();
         //   $scope.fromdata.search='harshil';
          //  $scope.fromdata.search=" " + t1;
        });
    //    console.log(t1);
       // $scope.fromdata.search="harshil";
       // $scope.formData.search=String(t1[0]);
    //   console.log($scope.tasks[1].title);
       /*
        console.log($scope.formData.lname);
        console.log($scope.formData.fname);
        console.log($scope.formData.email);
        console.log($scope.formData.password);
        console.log($scope.formData.cpassword);
        var dataParams = {
            'fname' : $scope.fname,
            'lname' : $scope.lname,
            'email' : $scope.email,
            'pw' : $scope.pw
        };
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        var req = $http.post('http://127.0.0.1:8081/register',$scope.formData);
        req.success(function(data, status, headers, config) {
            $scope.message = data;
            console.log(data);
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    */
    };

});