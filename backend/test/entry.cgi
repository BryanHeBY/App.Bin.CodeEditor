#!/bin/bash

echo "Content-Type: text/html; charset=utf-8"
echo ""

cat <<EOF 
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <script>
    window.onload = function () {
      const form = document.getElementById('form');
      form.action = 'http://localhost:17746/login';
      form.submit();
    };
  </script>
</head>
<body>
  <form id="form" method="POST">
    <input type="hidden" name="cookie" value="$HTTP_COOKIE" />
    <input type="hidden" name="query" value="$QUERY_STRING" />
  </form>
</body>
</html>
EOF