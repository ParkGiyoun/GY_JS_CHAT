const express = require('express');
const app = express();
const fs = require("fs"); // fs 모듈을 불러온다
const ChatCompletion = require("./api_browse");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  // res.send("Welcome to the chat completion website!");
  fs.readFile(".\\HTML\\index.html", (err, data) => { // form.html 파일을 읽는다
  if (err) { // 에러가 발생하면
    res.status(404).send("404 File not found"); // 404 상태 코드와 에러 메시지를 보낸다
  } else { // 에러가 없으면
    res.type("html").send(data); // html 타입과 form.html 파일의 내용을 보낸다
  }});
});

app.post('/ask', async (req, res) => {
  const question = req.body.question;
  const chatCompletion = new ChatCompletion(
    "gpt-3.5-turbo", [
      { role: "system", content: "너는 내 SQL 공부를 도와주는 선생님이야. 내 질문에 대해 무조건 한글로 대답해 줘야 해." },
      { role: "user", content: question },      
    ]);
  const answer = await chatCompletion.ask();
  res.send(answer.content);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
