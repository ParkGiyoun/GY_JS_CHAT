const express = require('express');
const app = express();
const ChatCompletion = require("./api_browse");

app.use(express.json());
app.use(express.urlencoded({ extended : true}));

app.get('/', async (req, res) => {
  const question = req.body.question;
  const chatCompletion = new ChatCompletion(
    "gpt-3.5-turbo", [
      { role: "system", content: "너는 내 SQL 공부를 도와주는 선생님이야. 내 질문에 대해 무조건 한글로 대답해 줘야 해." },
      { role: "user", content: "WHERE절, GROUP BY와 HAVING절 에 대해 예시를 들어서 설명해줘" },      
    ]);
  const answer = await chatCompletion.ask();
  res.send(answer.content);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
