angular.module('youTubeListApp')
.directive("embedVideo",function(){
    return {

        link: function (scope, iElement, iAttrs) {
            var elem = '<iframe id="player" type="text/html" frameBorder="0" src="http://www.youtube.com/embed/'+iAttrs.embedVideo+'"></iframe>';
            var videoElem = angular.element(elem);
            iElement.append(videoElem);
        }
    }
});