<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>百度浏览器吐槽开放平台</title>
  <link rel="stylesheet" href="{%$resourceloc%}/vip/css/jquery-ui.min.css">
  <link rel="stylesheet" href="{%$resourceloc%}/vip/css/bootstrap.min.css">
  <link rel="stylesheet" href="{%$resourceloc%}/vip/css/font-awesome.min.css">
  <link rel="stylesheet" href="{%$resourceloc%}/vip/css/default.css">
  <link rel="stylesheet" href="{%$resourceloc%}/vip/css/editor.css"/>
  <link rel="stylesheet" href="{%$resourceloc%}/vip/css/jquery.datetimepicker.css">
  <link rel="stylesheet" href="{%$resourceloc%}/vip/css/mock.css">
  <script type='text/javascript' src='http://passport.baidu.com/passApi/js/wrapper.js?cdnversion={%$smarty.now%}'></script>
  <script type="text/javascript ">
    var $userinfo ={%$userinfo%};
    if ($userinfo && $userinfo.bduss) {
      if(window.location.hash == '#login' || !window.location.hash)
        window.location.hash = '#msg';
    }
    else{
      window.location.hash = "#login";
    }
  </script>
  <style>
  </style>
</head>

<body>

  <div id="login" class="hide"></div>
  <div id="mock-pages" class="hide">
  <div class="mock-header"><a href="#msg"><div class="mock-logo"></div></a><div class="mock-headerTitle">百度浏览器<span></span><a href="#msg">吐槽开放平台</a></div></a></div>
    <div class="mock-body">
      <div class="mock-content">
        <div id="nav" class="mock-nav">
        </div>
        <div id="main-content" class="main-content">
          <div id="homepage" class="hide"></div>
          <div id="mockme" class="hide"></div>
          <div id="mocksquare" class="hide"></div>
          <div id="msg" class="hide"></div>
          <div id="msgs" class="hide"></div>
          <div id="fans" class="hide"></div>
          <div id="rawedit" class="hide"></div>
          <div id="raws" class="hide"></div>
          <div id="ad" class="hide"></div>
          <div id="ads" class="hide"></div>
          <div id="mockme" class="hide"></div>
          <div id="mockquare" class="hide"></div>
          <div id="trafuser" class="hide"></div>
          <div id="trafad" class="hide"></div>
        </div>
      </div>
    </div>
  </div>
  <script data-main="{%$resourceloc%}/vip/js/app/main" src="{%$resourceloc%}/vip/js/lib/require-2.1.11.min.js"></script>
  <script type="text/javascript">
    if (location.search.substring(1)) {
      var queryStr = location.search.substring(1).split('&'),oneQueryStr,callbackStr,config = {};

      for (var i in queryStr) {
        oneQueryStr = queryStr[i].split('=');
        if (!callbackStr && oneQueryStr[0] == 'callback') {
          callbackStr = oneQueryStr[1];
        };
        config[oneQueryStr[0]] = oneQueryStr[1];
      }
      if(callbackStr){
        var cbSegs = callbackStr.split('.');
        if (cbSegs[0] == "parent" && parent[cbSegs[1]]) {
          parent[cbSegs[1]](config);
        }
      }
    }
  </script>
</body>
</html>
