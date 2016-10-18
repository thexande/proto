angular.module('proto.profileController', [])
  .controller('profileController', function($scope, $firebaseObject, $firebaseArray) {
    console.log("profileController reached")
    var ref = firebase.database().ref()
    var list = $firebaseArray(ref);
    $scope.add = function() {
      console.log("adding")
      list.$add({
        foo: "bar"
      }).then(function(ref) {
        var id = ref.key;
        console.log("added record with id " + id);
        list.$indexFor(id); // returns location in the array
      });
    }
  })