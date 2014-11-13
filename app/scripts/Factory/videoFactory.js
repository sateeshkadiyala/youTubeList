angular
    .module('youTubeListApp').factory('VideoFactory', ['$http', '$cacheFactory', '$interval', function($http, $cacheFactory){

        var videoCache = $cacheFactory('videosCache');
        var videoDetail;
        var videosList = [];

        var getVideosFromPlayList = function (url) {
            $http.get(url).success(
                function (data, status) {
                    if(status!=200) return;
                    angular.forEach(data.items, function(item){
                       if(videoCache.get(item.snippet.publishedAt) == null){
                        videosList.push(item.snippet.publishedAt);
                        var videoDetail = {
                            title :item.snippet.title,
                            videoId : item.snippet.resourceId.videoId
                        }
                        videoCache.put(item.snippet.publishedAt, videoDetail);
                       }
                    });
                }
            ).error(function () {
                    console.log("error");
                })

            videosList.sort();
        }
         return {
             getVideosFromPlayList : getVideosFromPlayList,
             videoCache : videoCache,
             videosList : videosList
         }



    }]);