namespace Test.Code
{
  using System;
  using System.Collections.Generic;
  using System.Collections.Concurrent;
  using System.Linq;
  using System.Threading;
  using System.Threading.Tasks;
  using System.Web.Http;
  using System.Net;
  using System.Net.Http;
  using System.Diagnostics;
  using System.Runtime.Serialization;
  using System.Xml;
  using System.Text;
  using System.IO;
  using System.Web.Hosting;

  using System.Text.RegularExpressions;

  /// <summary>
  /// Defines an example of upload controller.
  /// </summary>
  public class UploadController : ApiController
  {
    /// <summary>
    /// Accepts an uploaded image file.
    /// File is passed as mime/multipart.
    /// </summary>
    /// <returns>
    /// a string "Done" in case of success upload.
    /// </returns>
    [HttpPost]
    [ActionName("upload")]
    public async Task<string> Upload()
    {
      if (!Request.Content.IsMimeMultipartContent())
      {
        throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
      }

      var tempFolder = Path.GetTempPath();
      var uploadedFile = null as string;

      try
      {
        var provider = new MultipartFormDataStreamProvider(tempFolder);

        await Request.Content.ReadAsMultipartAsync(provider);

        var file = provider.FileData.FirstOrDefault();

        if (file == null)
        {
          throw new HttpResponseException(HttpStatusCode.BadRequest);
        }

        uploadedFile = file.LocalFileName;

        using (var reader = File.OpenText(uploadedFile))
        {
          // TODO: handle the file content here
        }
      }
      finally
      {
        File.Delete(uploadedFile);
      }

      return "Done";
    }
  }
}
