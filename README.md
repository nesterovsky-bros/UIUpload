# UIUpload
ui-upload.js defines <b>ui-upload</b> AngularJS module.
The module defines <b>upload-link</b> directive and <b>uiUploader</b> service that simplify file uploading tasks.
They allow:
<ul>
  <li>
  convert any link or button to a uploading control that opens select file dialog and performs multipart-data uploading
  to the specified location;
  </li>
  <li>
  open file select dialog from script and upload/load as dataURI the selected file;
  </li>
  <li>
  upload File or Blob to server using uiUploader service (w/o dialog).
  </li>
</ul>

This is pure HTML5 and AngularJS solution.

Try the <a href="http://www.nesterovsky-bros.com/Demos/ui-upload/index.html">demo</a>.

<h2>Compatibility.</h2>
Because of this project uses <a href="http://caniuse.com/#search=File%20API">File API</a> and 
<a href="http://caniuse.com/#search=FormData">FormData</a>, it will work on Chrome, Mozilla, Opera, 
latest versions of Android browsers and IE10+.

<h2>Requirements</h2>
AngularJS.

<h2>Usage</h2>
In order to start using <b>upload-link</b> directive and <b>uiUploader</b> service you have to include ui-upload.js script.
For example:

<pre>
 &lt;script src="Scripts/angular.min.js"&gt;&lt;/script&gt;
 &lt;script src="Scripts/ui-upload.js"&gt;&lt;/script&gt;
</pre>

Then you may define a link that will open select file dialog and will upload the selected file to the server:

<pre>
      &lt;a upload-link
         class="btn btn-primary"
         accept=".*"
         server-url="api/upload"
         on-success="controller.uploadSucceed(data, file)"
         on-error="controller.uploadFailed(e)"&gt;Click here to upload an image&lt;/a&gt;
</pre>

Another option is to react on some UI event and then open select file dialog from script:

<pre>
      &lt;a class="btn btn-primary" ng-click="controller.loadImage()"&gt;Load an image&lt;/a&gt;
</pre>

Javascript:

<pre>
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
                    // result.data is a dataUri, see https://developer.mozilla.org/en-US/docs/Web/HTTP/data_URIs
                    src: result.data,
                    name: result.file.name,
                    selected: false
                  });

                controller.$invalidate();
              },
              $log.error);
        };
</pre>

Later on you may upload dataUri to the server using by uiUploader service:

<pre>
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
                  // TODO: upload succeed
                });
          }
        };
</pre>
