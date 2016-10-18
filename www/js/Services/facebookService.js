angular.module('proto.facebookService', [])
  
  .service('proto.facebookService', function(){
    function Auth(rootRef, $firebaseAuth) {
      return $firebaseAuth(rootRef);
    }
  Auth.$inject = ['rootRef', '$firebaseAuth'];
  })