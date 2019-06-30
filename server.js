const liveServer = require('live-server')
const isSSR = !!process.env.SSR
const middleware = []

if (isSSR) {
  const Renderer = require('./packages/docsify-server-renderer/build.js')
  const renderer = new Renderer({
    template: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>OpenAuth.Net文档--最好用的.NET权限工作流框架</title>
    <meta name="Keywords" content="openauth.net如何部署,.net开源工作流,OpenAuth.Net文档">
<meta name="Description" content="OpenAuth.Net文档,最好用的.net开源工作流框架,最好用的.NET开源权限管理框架">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link rel="stylesheet" href="/themes/vue.css" title="vue">
  </head>
  <body>
    <!--inject-app-->
    <!--inject-config-->
  <script src="/lib/docsify.js"></script>
  <script>
  //百度统计
  var _hmt = _hmt || [];
  (function() {
      var hm = document.createElement("script");
      hm.src = "//hm.baidu.com/hm.js?0558502420ce5fee054b31425e77ffa6";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
  })();
</script>
  </body>
  </html>`,
    config: {
      name: 'OpenAuth.Core',
      repo: 'yubaolee/OpenAuth.Core',
    //  basePath: 'http://doc.openauth.me/',  //用gitee pages会有跨域的问题😰,已经把这个域名映射到主站了
     basePath: 'https://yubaolee.github.io/OpenAuth.Core/',
    //  basePath: 'https://docsify.js.org/',
      loadNavbar: false,
      loadSidebar: true,
      subMaxLevel: 4,
      auto2top: true
    },
    path: './'
  })

  middleware.push(function(req, res, next) {
    if (/\.(css|js)$/.test(req.url)) {
      return next()
    }
    renderer.renderToString(req.url).then(html => res.end(html))
  })

}

const params = {
  port: 3000,
  watch: ['lib', 'docs', 'themes'],
  middleware
}

liveServer.start(params)
