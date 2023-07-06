const wordcut = require("wordcut");
const cors = require("cors");
const worddb = require("./words.json");
const bodyParser = require("body-parser");
// ตั้งค่าคำตัดคำ
wordcut.init();

// สร้าง function สำหรับตัดคำ
// function cutWords(text) {
//   return wordcut.cut(text);
// }

// สร้าง API endpoint ด้วย Express.js
const express = require("express");
const app = express();

// Allow CORS
app.use(cors());

app.use(bodyParser.json());

//ฟังชันก์ตัดคำ
function cutWord(answer) {
  let result = wordcut.cut(answer.replace(" ", ""));
  try {
    result = result.split("|");
    console.log("คำที่ตัด: ",result)
    return result;
  } catch (e) {
    console.log("err : ", e.message);
    return result;
  }
}

function checkWord(answer) {
  let wordCut = cutWord(answer);
  // console.log("wordCut", wordCut);
  let data = [];
  let combinepronunciation = [];
  wordCut.map((item) => {
    try {
      var result = worddb.words.filter(function (value) {
        return value.word == item;
      });
      //เช็คว่ามีใน word.json หรือไม่
      if (result.length === 0) {
        data.push({ word: item, pronunciation: "" });
        combinepronunciation.push("");
      } else {
        let temp = result[0].pronunciation.split(",");
        data.push({
          word: item,
          pronunciation: temp[0],
        });
        combinepronunciation.push(temp[0]);
      }
    } catch (e) {
      console.log("err :", item, e.message);
      data.push({ word: item, pronunciation: "" });
      combinepronunciation.push("");
    }
  });
  // console.log("result : ", data, combinepronunciation);
  return { data, combinepronunciation };
}

app.post("/getcutwords", (req, res) => {
  try {
    const answer = req.body.answer;

    const data = checkWord(answer);
    // console.log(data);
    res.status(200).send({
      status: "ok",
      combineWord: data.combinepronunciation,
      data: data.data,
    });
  } catch (e) {
    res.send({ status: "error", msg: e.message });
  }
});

// รัน server ที่ port 5000
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
