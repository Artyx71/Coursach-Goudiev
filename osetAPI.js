const dictionary = {
  hello: { osetin: "Салам", english: "hello" },
  goodbye: { osetin: "Фенынмæ", english: "goodbye" },
  friend: { osetin: "Æмбал", english: "friend" },
  // ...
};

// определяем эндпоинты для API
const endpoints = {
  "/words": getWords,
  "/translate": getTranslation,
  // ...
};

// функция для получения списка слов
function getWords() {
  return Object.keys(dictionary);
}

// функция для получения перевода слова
function getTranslation(word, lang) {
  if (word in dictionary && lang in dictionary[word]) {
    return dictionary[word][lang];
  } else {
    return "Translation not found.";
  }
}

// создаем сервер и обрабатываем запросы к API
const http = require("http");
const url = require("url");

const server = http.createServer(function (req, res) {
  const query = url.parse(req.url, true).query;
  const endpoint = url.parse(req.url).pathname;

  if (endpoints.hasOwnProperty(endpoint)) {
    const response = endpoints[endpoint](query.word, query.lang);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(response));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("Endpoint not found.");
  }

  res.end();
});

// запускаем сервер на порту 8080
server.listen(8080);
