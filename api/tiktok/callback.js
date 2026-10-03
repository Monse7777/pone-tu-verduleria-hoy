module.exports = function handler(req, res) {
  const url = new URL(req.url, "https://" + (req.headers.host || "localhost"));
  const code = url.searchParams.get("auth_code") || url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const id = url.searchParams.get("id");

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.statusCode = code ? 200 : 400;
  res.end(`<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>TikTok · Acción Fruit</title>
<style>body{font-family:Arial,sans-serif;background:#f6f8f5;color:#172018;min-height:100vh;display:grid;place-items:center;margin:0;padding:24px}main{max-width:620px;background:#fff;border:1px solid #e5ebe6;border-radius:20px;padding:32px}h1{margin-top:0;color:#178447}p{line-height:1.55;color:#66736b}code{display:block;background:#f5f8f5;padding:12px;border-radius:10px;word-break:break-all}</style>
</head>
<body><main>
<h1>${code ? "Autorización recibida" : "Falta el código de autorización"}</h1>
<p>${code ? "TikTok volvió correctamente a Acción Fruit. Ya podemos continuar con la conexión desde el servidor." : "Volvé a iniciar la autorización desde TikTok."}</p>
${code ? `<code>received=true${id ? " · account_id=" + id : ""}${state ? " · state=" + state : ""}</code>` : ""}
</main></body></html>`);
};

