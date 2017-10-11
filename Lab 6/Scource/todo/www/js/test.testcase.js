describe('testcase', function() {
    beforeEach(module('starter.controllers'));
  
    var $controller;
  
    beforeEach(inject(function(_$controller_){
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $controller = _$controller_;
    }));
  
    describe('$scope.status', function() {
      it('check url builder for worldnews', function() {
        var $scope = {};
        var controller = $controller('TodoCtrl', { $scope: $scope });
        var result = $scope.urlBuilder('cat');
        expect(result).toEqual('https://www.reddit.com/r/worldnews/.json');
      });
      it('check url builder for knowledge graph', function() {
        var $scope = {};
        var controller = $controller('TodoCtrl', { $scope: $scope });
        var result ="harshil";
          
            var url="https://kgsearch.googleapis.com/v1/entities:search?query=" + result + "&key=AIzaSyDzvCzyfdZSAjj1yE9t5FxF7JwpGM_qgA0&limit=10&indent=True";
        expect(url).toEqual('"https://kgsearch.googleapis.com/v1/entities:search?query=harshil&key=AIzaSyDzvCzyfdZSAjj1yE9t5FxF7JwpGM_qgA0&limit=10&indent=True"');
      });
    });
  });