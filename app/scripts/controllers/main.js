'use strict';

/**
 * @ngdoc function
 * @name youTubeListApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the youTubeListApp
 */
angular.module('youTubeListApp')
  .controller('MainCtrl', ['$scope', 'VideoFactory', '$cacheFactory', '$interval', function ($scope, videoFactory, $cacheFactory, $interval) {
        $scope.userNamesList = 'tv9telugu';
        $scope.keys = videoFactory.videosList;
        var videosCache = $cacheFactory.get('videosCache');

        $scope.playListIds= ['UUeM2RFssU3973S7iswXvBfw', 'UU8jlKhHClMUO3kkL8ppK8Bw', 'UU_2irx_BQR7RsBKmUV9fePQ', 'UUAR3h_9fLV82N2FH4cE4RKw', 'UUumtYpCY26F6Jr3satUgMvA', 'UUzri6jz0udIiztKShcMO7dw', 'UU6RJ7-PaXg6TIH2BzZfTV7w', 'UUViLvZvgdut2iJiKU33NQrQ'];

        $scope.getVideoDetail= function(key){
            return videosCache.get(key);
        }

        var pollIntervalSeconds = 1800;
        var pollingInProgress = false;
        var pollInterval = null;

        function startPolling() {
            if (pollingInProgress) return false;
            pollingInProgress = true;
            pollInterval = $interval(poll, pollIntervalSeconds * 1000);
            return true;
        };

        function poll() {
            $scope.getVideos();
        };

        function stopPolling() {
            $interval.cancel(pollInterval);
            pollingInProgress = false;
        }

        $scope.init  = function(){
            startPolling();
        }
        $scope.init();

        $scope.getVideos = function(){
            angular.forEach($scope.playListIds, function(pid) {
                    var url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=' + pid + '&key=AIzaSyDRp_jSiwtw3x518rIbNxcYmnNLGFNgPwI';
                    videoFactory.getVideosFromPlayList(url);
                }
            );
        }


  }]);
