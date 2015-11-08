using System.Web.Http;

namespace Test
{
  public static class WebApiConfig
  {
    public static void Register(HttpConfiguration config)
    {
      // Web API configuration and services
      config.Routes.MapHttpRoute(
          name: "DefaultApi",
          routeTemplate: "api/{controller}/{action}",
          defaults: new { action = RouteParameter.Optional });
    }
  }
}
