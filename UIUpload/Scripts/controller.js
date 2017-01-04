(function ()
{
    "use strict";

    var module = angular.module("test", ["ui-upload"]);

    module.controller("UploaderTestController",
      ["$scope", "uiUploader", "$log", "$q",
      function($scope, $uiUploader, $log, $q)
      {
        var controller = this;

        controller.$invalidate = $scope.$applyAsync.bind($scope);
        controller.images = [];

        controller.uploadSucceed = function (data, file)
        {
          $log.info("Upload succeed: " + file.name);
        };

        controller.uploadFailed = function (e)
        {
          alert(e && e.toString ? e.toString() : "Unknown error.");
        };

        controller.uploadImage = function(serverUrl)
        {
          return $uiUploader.selectAndUploadFile(serverUrl, ".jpg,.png,.gif");
        };

        controller.loadImage = function()
        {
          // in case when the serverUrl (the first argument) is null,
          // the service doesn't upload file to server directly, but 
          // allows you to handle the content.
          return $uiUploader.selectAndUploadFile(null, ".jpg,.png,.gif").
            then(
              function(result)
              {
                controller.images.push(
                  {
                    src: result.data,
                    name: result.file.name,
                    selected: false
                  });

                controller.$invalidate();
              },
              $log.error);
        };

        controller.uploadSelectedImage = function(serverUrl)
        {
          var selected = controller.images.filter(
            function(item) { return item.selected; });

          if (selected.length)
          {
            var blob = dataURItoBlob(selected[0].src);

            return $uiUploader.
              uploadFile(serverUrl, blob, selected[0].name).then(
                function(result)
                {
                  var index = controller.images.indexOf(selected[0]);

                  controller.images.splice(index, 1);

                  controller.$invalidate();
                });
          }
        };

        controller.hasSelection = function()
        {
          var selected = controller.images.filter(
            function (image) { return image.selected; });

          return selected.length > 0;
        };

        // convert base64/URLEncoded data component to raw binary data held in a string
        // see: http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
        function dataURItoBlob(dataURI) 
        {
          var parts = dataURI.split(',');
          var prefix = parts[0];
          var data = parts[1];
          var byteString = 
            (prefix.indexOf('base64') >= 0) ? atob(data) : unescape(dataU);

          // separate out the mime component
          var mimeString = prefix.split(':')[1].split(';')[0];

          // write the bytes of the string to a typed array
          var ia = new Uint8Array(byteString.length);

          for (var i = 0; i < byteString.length; i++) 
          {
            ia[i] = byteString.charCodeAt(i);
          }

          return new Blob([ia], {type:mimeString});
        }
      }]);
  })();