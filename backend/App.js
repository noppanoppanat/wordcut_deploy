// import logo from './logo.svg';
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const tones = {
  น: "แม่ กน",
  ม: "แม่ กม",
  บ: "แม่ กบ",
  ด: "แม่ กด",
  ก: "แม่ กก",
  ง: "แม่ กง",
  ว: "แม่ เกอว",
  ย: "แม่ เกย",
  อ: "แม่ ก กา",
};
let score = 0;
function App() {
  const [inputValue, setInputValue] = useState("");
  // const [result, setResult] = useState();
  // const [x, x.push] = useState("");
  const [randomword, setRandomWord] = useState("");
  const [random, setRandomTone] = useState("");
  const [randomCount, setRandomCount] = useState(1);
  const [resultwordcut, setResultWordCut] = useState("");
  // const [score, setScore] = useState(0);

  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    let interval;
    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn]);

  const startTimer = () => {
    setTimerOn(true);
  };

  const stopTimer = () => {
    setTimerOn(false);
  };

  // const handleInputChange = (event) => {
  //   setInputValue(event.target.value);
  // };
  const handleInputChange = (event) => {
    const thaiPattern = /^[ก-๛\s]*$/; // regular expression to match Thai characters and whitespace
    const inputValue = event.target.value;
    if (inputValue === "") {
      alert("กรุณาป้อนคำศัพท์ภาษาไทย");
    } else if (thaiPattern.test(inputValue)) {
      setInputValue(inputValue);
    } else {
      alert("กรุณากรอกภาษาไทยเท่านั้น");
    }
  };

  const handleRandomClick = () => {
    const randomTones = [];
    const randomword = [];
    for (let i = 0; i < randomCount; i++) {
      const randomTone =
        Object.keys(tones)[
          Math.floor(Math.random() * Object.keys(tones).length)
        ];
      randomTones.push(tones[randomTone]);
      randomword.push(randomTone);
    }
    setRandomTone(randomTones.join(" + "));
    setRandomWord(randomword);
    setInputValue("");
    setResultWordCut("");
  };

  const handleRandomCountChange = (event) => {
    const count = parseInt(event.target.value);
    if (count > 0) {
      setRandomCount(count);
    } else {
      setRandomCount(""); // set default value
    }
  };

  const handleKeyDown = (event) => {
    const thaiPattern = /^[ก-๛\s]*$/; // regular expression to match Thai characters and whitespace
    if (event.key === "Enter") {
      // handleRandomClick();
      checkwordcut();
      if (inputValue === "") {
        alert("กรุณาป้อนคำศัพท์ภาษาไทย");
        return;
      } else if (!thaiPattern.test(inputValue)) {
        alert("กรุณากรอกภาษาไทยเท่านั้น");
        return;
      }
      setInputValue("");
    }
  };

  const checkwordcut = () => {
    axios
      .get(`http://localhost:5000/cutwords/${inputValue}`)
      .then((response) => {
        const wordcut = response.data.words;

        axios.get("word.json").then((response) => {
          const datafile = response.data.words;
          const wordclean =
            wordcut.split(/[,./;()| ]+/) || inputValue.split(/[,./;()| ]+/);
          const checkedWordsfile = wordclean.map((word) => {
            const item = datafile.find((w) => w.word === word.trim());
            console.log("item: ", item);
            if (item) {
              const readingValue =
                item.pronunciation.split(" ")[
                  item.pronunciation.split(" ").length - 1
                ];
              console.log("readingValue: ", readingValue);
              return readingValue;
            } else {
              return "";
            }
          });
          let resultwordcut = [];

          for (let i = 0; i < checkedWordsfile.length; i++) {
            if (checkedWordsfile[i].includes("-")) {
              let words = checkedWordsfile[i].split("-");
              resultwordcut = resultwordcut.concat(words);
            } else {
              resultwordcut.push(checkedWordsfile[i]);
            }
          }
          console.log("returnword: ", resultwordcut);

          setResultWordCut(resultwordcut);
          // return resultwordcut;
          // checkTones();
        });
        // .catch((error) => {
        //   console.error(error);
        // });
      });
  };

  // .catch((error) => {
  //   console.error(error);
  // });
  let x = [];
  for (let i = 0; i < resultwordcut.length; i++) {
    if (resultwordcut.length === randomword.length) {
      // console.log(`จำนวนคำ'${resultwordcut[i]}'เท่ากับ'${randomword}'`);
      // result.push(`จำนวนคำ'${resultwordcut[i]}'เท่ากับ'${randomword}'`);

      const lastCharIndex = resultwordcut[i].length - 1; //ตำแหน่งสุดท้ายของคำ
      const firstChar = resultwordcut[i][0];
      const lastChar = resultwordcut[i][lastCharIndex]; //อักษรสุดท้ายของคำ
      const tone = randomword[i]; //ตัวสะกดที่สุ่ม
      // const tones = randomTones;
      const tonekorka = tone.includes(`อ`);
      const tonemarks =
        lastChar.includes("่") ||
        lastChar.includes("้") ||
        lastChar.includes("๊") ||
        lastChar.includes("๋");
      const lestvowels =
        lastChar.includes("ะ") ||
        lastChar.includes("า") ||
        lastChar.includes("ิ") ||
        lastChar.includes("ี") ||
        lastChar.includes("ึ") ||
        lastChar.includes("ื") ||
        lastChar.includes("ุ") ||
        lastChar.includes("ู") ||
        lastChar.includes("อ") ||
        lastChar.includes("ำ") ||
        resultwordcut.includes("ัว") ||
        resultwordcut[i].includes("ีย");
      const lastletter =
        lastChar.includes("ก") ||
        lastChar.includes("บ") ||
        lastChar.includes("น") ||
        lastChar.includes("ด") ||
        lastChar.includes("ง") ||
        lastChar.includes("ม") ||
        lastChar.includes("ย") ||
        lastChar.includes("ว");
      const leadletter =
        resultwordcut[i].includes(`หฺง`) ||
        resultwordcut[i].includes(`หง`) ||
        resultwordcut[i].includes(`หฺญ`) ||
        resultwordcut[i].includes(`หญ`) ||
        resultwordcut[i].includes(`หฺร`) ||
        resultwordcut[i].includes(`หร`) ||
        resultwordcut[i].includes(`หฺล`) ||
        resultwordcut[i].includes(`หล`) ||
        resultwordcut[i].includes(`หฺม`) ||
        resultwordcut[i].includes(`หม`) ||
        resultwordcut[i].includes(`หฺน`) ||
        resultwordcut[i].includes(`หน`) ||
        resultwordcut[i].includes(`หฺว`) ||
        resultwordcut[i].includes(`หว`) ||
        resultwordcut[i].includes(`หฺย`) ||
        resultwordcut[i].includes(`หย`);
      if (lastChar === tone && !tonekorka) {
        if (lastChar.includes("ว")) {
          if (
            resultwordcut[i][resultwordcut[i].length - 2] === `ั` ||
            ((firstChar.includes("ใ") || firstChar.includes("ไ")) &&
              resultwordcut[i].length === 3) ||
            ((resultwordcut[i][resultwordcut[i].length - 2] === `่` ||
              resultwordcut[i][resultwordcut[i].length - 2] === `้` ||
              resultwordcut[i][resultwordcut[i].length - 2] === `๊` ||
              resultwordcut[i][resultwordcut[i].length - 2] === `๋`) &&
              resultwordcut[i][resultwordcut[i].length - 3] === `ั`)
          ) {
            x.push(
              `ออกเสียงว่า '${resultwordcut[i]}' ไม่ใช่มาตราตัวสะกด แม่ เกอว `
            );
          } else {
            x.push(
              `ออกเสียงว่า '${resultwordcut[i]}' เป็นมาตราตัวสะกด แม่ เกอว`
            );
            score = score += 1;
            console.log("score: ", score);
            // console.log("แม่ เกอว");
          }
        }
        if (lastChar.includes("ย")) {
          if (
            resultwordcut[i][resultwordcut[i].length - 2] === `ี` ||
            ((resultwordcut[i][resultwordcut[i].length - 2] === `่` ||
              resultwordcut[i][resultwordcut[i].length - 2] === `้` ||
              resultwordcut[i][resultwordcut[i].length - 2] === `๊` ||
              resultwordcut[i][resultwordcut[i].length - 2] === `๋`) &&
              resultwordcut[i][resultwordcut[i].length - 3] === `ี`)
          ) {
            x.push(
              `ออกเสียงว่า '${resultwordcut[i]}' ไม่ใช่มาตราตัวสะกด แม่ เกย`
            );
          } else {
            x.push(
              `ออกเสียงว่า '${resultwordcut[i]}' เป็นมาตราตัวสะกด แม่ เกย`
            );
            // setScore(score + 1);
            // return 'correct';
          }
        } else if (
          lastChar.includes("ง") &&
          !(
            (firstChar.includes("ใ") || firstChar.includes("ไ")) &&
            resultwordcut[i].length === 3
          ) &&
          !tonemarks
        ) {
          x.push(`ออกเสียงว่า '${resultwordcut[i]}' เป็นมาตราตัวสะกด แม่ กง`);
        } else if (
          lastChar.includes("ม") &&
          !(
            (firstChar.includes("ใ") || firstChar.includes("ไ")) &&
            resultwordcut[i].length === 3
          ) &&
          !tonemarks
        ) {
          x.push(`ออกเสียงว่า '${resultwordcut[i]}' เป็นมาตราตัวสะกด แม่ กม`);
        } else if (
          lastChar.includes("น") &&
          !(
            (firstChar.includes("ใ") || firstChar.includes("ไ")) &&
            resultwordcut[i].length === 3
          ) &&
          !tonemarks
        ) {
          x.push(`ออกเสียงว่า '${resultwordcut[i]}' เป็นมาตราตัวสะกด แม่ กน`);
        } else if (
          lastChar.includes("ก") &&
          !(
            (firstChar.includes("ใ") || firstChar.includes("ไ")) &&
            resultwordcut[i].length === 3
          ) &&
          !tonemarks
        ) {
          x.push(`ออกเสียงว่า '${resultwordcut[i]}' เป็นมาตราตัวสะกด แม่ กก`);
        } else if (
          lastChar.includes("บ") &&
          !(
            (firstChar.includes("ใ") || firstChar.includes("ไ")) &&
            resultwordcut[i].length === 3
          ) &&
          !tonemarks
        ) {
          x.push(`ออกเสียงว่า '${resultwordcut[i]}' เป็นมาตราตัวสะกด แม่ กบ`);
        } else if (
          lastChar.includes("ด") &&
          !(
            (firstChar.includes("ใ") || firstChar.includes("ไ")) &&
            resultwordcut[i].length === 3
          ) &&
          !tonemarks
        ) {
          x.push(`ออกเสียงว่า '${resultwordcut[i]}' เป็นมาตราตัวสะกด แม่ กด`);
        }
        // } else {
        //   x.push(
        //     `ออกเสียงว่า '${resultwordcut[i]}' เป็นมาตราตัวสะกด '${random[i]}'`
        //   );
        // }

        // มาตราตัวสะกดแม่ ก กา
      } else if (tonekorka || lastChar === tone) {
        if (tonemarks || lestvowels) {
          // console.log(`แม่ ก กา`);
          x.push(`ออกเสียงว่า '${resultwordcut[i]}' เป็นมาตราตัวสะกด แม่ ก กา`);
          // setScore(score + 1);
        } else if (firstChar.includes("ไ") || firstChar.includes("ใ")) {
          x.push(`ออกเสียงว่า '${resultwordcut[i]}' เป็นมาตราตัวสะกด แม่ ก กา`);
          // setScore(score + 1);
        } else if (
          firstChar.includes("เ") ||
          firstChar.includes("แ") ||
          firstChar.includes("โ")
        ) {
          if (resultwordcut[i].length <= 2) {
            x.push(
              `ออกเสียงว่า '${resultwordcut[i]}' เป็นมาตราตัวสะกด แม่ ก กา`
            );
            // setScore(score + 1);
          } else if (
            (resultwordcut[i].length === 3 && leadletter) ||
            (resultwordcut[i].length === 4 && leadletter)
          ) {
            x.push(
              `ออกเสียงว่า '${resultwordcut[i]}' เป็นมาตราตัวสะกด แม่ ก กา`
            );
            // setScore(score + 1);
          } else if (resultwordcut[i].length > 3 && !lastletter) {
            x.push(
              `ออกเสียงว่า '${resultwordcut[i]}' เป็นมาตราตัวสะกด แม่ ก กา`
            );
            // setScore(score + 1);
          } else {
            x.push(
              `ออกเสียงว่า '${resultwordcut[i]}' ไม่ใช่มาตราตัวสะกด แม่ ก กา`
            );
          }
        } else {
          x.push(
            `ออกเสียงว่า '${resultwordcut[i]}' ไม่ใช่มาตราตัวสะกด แม่ ก กา`
          );
        }
      } else {
        x.push(
          `ออกเสียงว่า '${resultwordcut[i]}' ไม่ใช่มาตราตัวสะกด '${tone}'`
        );
      }
    } else if (resultwordcut.length > randomword.length) {
      x.push(`จำนวนคำน้อยกว่ามาตราตัวสะกด`);
    } else if (resultwordcut.length < randomword.length) {
      x.push(`จำนวนคำน้อยกว่ามาตราตัวสะกด`);
    }
  }
  // x.push(x)
  // return x ;

  const answers = () => {
    // console.log(x,'x')
    let result = [];
    for (let i = 0; i < resultwordcut.length; i++) {
      result.push(
        <tr>
          <td>{inputValue}</td>
          <td>{resultwordcut[i]}</td>
          <td>{x[i]}</td>
        </tr>
      );
    }
    return result;
  };

  return (
    <div className="body">
      <header className="top-header">
        <div className="text-header">SaKodKum</div>
      </header>
      <div className="second-background">
        <div className="container">
          <p className="text-1">THAI WORD FORMATION</p>
          <p className="text-2">แบบฝึกหัดตัวสะกดภาษาไทย</p>
          <h2 className="timer">Timer: {time}</h2>
          <button onClick={() => startTimer()}>Start</button>
          <button onClick={() => stopTimer()}>Stop</button>

          <div className="text-score">Score: {score} </div>
          <label className="text-tone">
            กรุณาเลือกจำนวนมาตราตัวสะกด
            <input
              className="input-text"
              type="number"
              value={randomCount}
              onChange={() => handleRandomCountChange()}
            />
          </label>
          <button className="button-random" onClick={() => handleRandomClick()}>
            สุ่ม{" "}
          </button>
          <div className="text-random">มาตราตัวสะกด : {random}</div>
          {/* <div className="text">Random tones 555 : {randomword}</div> */}
          <div>
            <label className="text-inputwords">
              กรุณาใส่คำในช่องว่าง
              <input
                className="input-value"
                type="text"
                value={inputValue}
                onChange={(e) => handleInputChange(e)}
                onKeyDown={(e) => handleKeyDown(e)}
              />
            </label>
            {/* <button className="button-check" onClick={checkwordcut}>
              ตรวจสอบ
            </button> */}
            <button
              className="button-check"
              onClick={() => {
                checkwordcut();
              }}
            >
              ตรวจสอบ
            </button>
          </div>

          {/* <div className="text">คำศัพท์ : {inputValue} </div> */}
          <table className="word-value">
            <tbody>
              {resultwordcut.length !== 0 ? (
                x.length === 0 ? (
                  <>ไม่พบคำในฐานข้อมูล</>
                ) : (
                  answers()
                  // x
                )
              ) : (
                <></>
              )}
            </tbody>
          </table>
          {/* <div className="text" >result : {result.map(r=>{return<div>{r}</div>})}</div> */}
        </div>
      </div>
    </div>
  );
}

export default App;
