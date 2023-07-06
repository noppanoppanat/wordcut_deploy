import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

//utils
import splitComma from "../utils/splitComma";
import createTones from "../utils/createTones";

import { Modal, Button } from "react-bootstrap";

import GameDetails from "../components/GameDetails";

import "./Game.css";

function Game() {
  //เก็บค่า จำนวนที่ใช้ random ตัวสะกด
  const [toneAmount, setToneAmount] = useState(1);
  // console.log("tone amount : ", toneAmount);

  //ตัวแปรเก็บค่าที่สุ่มได้แต่ละรอบ
  const [toneArray, setToneArray] = useState([]);

  //ตัวแปรรอบ
  const [round, setRound] = useState(0);


  const tones = [
    { id: 1, tag: "น", tone: "แม่ กน" },
    { id: 2, tag: "ม", tone: "แม่ กม" },
    { id: 3, tag: "บ", tone: "แม่ กบ" },
    { id: 4, tag: "ด", tone: "แม่ กด" },
    { id: 5, tag: "ก", tone: "แม่ กก" },
    { id: 6, tag: "ง", tone: "แม่ กง" },
    { id: 7, tag: "ว", tone: "แม่ เกอว" },
    { id: 8, tag: "ย", tone: "แม่ เกย" },
    { id: 9, tag: "กา", tone: "แม่ ก กา" },
  ];

  //ตัวแปรคะแนน
  const [score, setScore] = useState(0);

  //เก็บค่าคำตอบ
  const [answer, setAnswer] = useState("");

  //เก็บค่าแสดงคำตอบ
  const [resultAnswer, setReultAnswer] = useState("");

  //เก็บIcon
  const [activeicon, setActiveIcon] = useState("");

  //เก็บค่าแสดงคำตอบทั้งหมด
  const [listResult, setListResult] = useState([]);
  useEffect(()=>{
    if (resultAnswer!== ""){
      setListResult(x =>[...x,resultAnswer]);
    }
    
  },[resultAnswer])

  function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  //กระบวนการตรวจ
  const checkProcess = async () => {
    let allWordToTones = [];
    let combineWord = [];

    //ขอคำที่ตัดเป็น obj
    let answerCutList = await getWordCut();

    combineWord = answerCutList["combineWord"];
    combineWord.map((item) => {
      let splitWord = splitComma(item);
      let convert2Tones = createTones(splitWord);
      allWordToTones = allWordToTones.concat(convert2Tones);
    });

    let answerTag = toneArray.map((toneId, idx) => {
      const data = tones.find((obj) => {
        return obj.id === toneId;
      });
      return (toneId = data.tag);
    });

    let answerTone = toneArray.map((toneId, idx) => {
      const data = tones.find((obj) => {
        return obj.id === toneId;
      });
      return (toneId = data.tone);
    });

    
    

    let isCorrect = arraysEqual(answerTag, allWordToTones);
    if (allWordToTones.length>answerTag.length){
      setReultAnswer(`คำว่า ${answer} มีจำนวนพยางค์มากกว่ามาตราตัวสะกด ${answerTone.join(' + ')}`)
    }else if (allWordToTones.length<answerTag.length){
      setReultAnswer(`คำว่า ${answer} มีจำนวนพยางค์น้อยกว่ามาตราตัวสะกด ${answerTone.join(' + ')}`)
    }else{
      if (isCorrect){
        setReultAnswer(`คำว่า ${answer} ตรงตามมาตราตัวสะกด ${answerTone.join(' + ')}`)
      }
      else{
       combineWord.includes("")? setReultAnswer(`คำว่า ${answer} ไม่พบในคลังคำศัพท์`):setReultAnswer(`คำว่า ${answer} ไม่ตรงตามมาตราตัวสะกด ${answerTone.join(' + ')}`)
      }
    }
    // setListResult(listResult.concat(resultAnswer));
    // setListResult(x =>[...x,resultAnswer]);
    // console.log("resultAnswer: ",resultAnswer)

    console.log(combineWord)
    console.log("answerCutList: ", answerCutList);
    console.log("answer:", answer);
    console.log("user answers : ", allWordToTones);
    console.log("true answers :", answerTag);
    console.log("isCorrect : ", isCorrect);
    
    return isCorrect;
  };

  //ฟังชันตรวจสอบคำตอบ
  const checkAnswer = async () => {
    //ส่งไปตรวจสอบแล้วส่งค่ากลับเป็น true false
    let isCorrect = await checkProcess();
    setActiveIcon(isCorrect)


    if (isCorrect) {
      if (score !== 10) {
        console.log("correct");
        setScore((prevScore) => prevScore + 1);
      }
    } else {
      console.log("incorrect");
    }
    setAnswer("");
    handleRound();
  };

  //ตัวแปรหยุดเวลาชั่วคราว
  const [isPauseModal, setIsPauseModal] = useState(false);

  //ตัวแปรเฉลย
  const [isSolveModal, setIsSolveModal] = useState(false);

  //ตัวแปรนับเวลา
  const [time, setTime] = useState(0);

  //ตัวแปรหยุดเวลา
  const [isPaused, setIsPaused] = useState(true);

  //ตัวแปรพร้อมเล่นเกมหรือไม่
  const [isStarted, setIsStarted] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  useEffect(() => {
    if (round === 10) {
      setIsPaused(true);
      setIsSolveModal(false);
      clearInterval(intervalRef.current);
    }
  }, [score]);

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  // เซ็ทค่าเริ่มเกมใหม่
  const handleReset = () => {
    setRound(0);
    setScore(0);
    setToneAmount(1);
    setAnswer("");
    setIsStarted(false);
    setIsPaused(true);
    setIsPauseModal(false);
    clearInterval(intervalRef.current);
    setIsSolveModal(false);
    setListResult([]);
    setReultAnswer("")
    setTime(0);
  };

  const handleStart = () => {
    setIsStarted(true);
    setIsPaused(false);
  };

  const handleRound = () => {
    setRound((prevRound) => prevRound + 1);
    if (round === 9) {
      setIsPaused(true);
      clearInterval(intervalRef.current);
    }
  };

  // ฟังก์ชันสุ่มคำจากจำนวนตัวสะกด;
  const randomToneByAmount = () => {
    let result = [];
    for (let i = 0; i < toneAmount; i++) {
      //สุ่มแล้วเก็บใน array
      let tone = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
      result.push(tone);
    }
    setToneArray(result);
  };

  //ใช้สุ่มคำในแต่ละรอบ
  useEffect(() => {
    randomToneByAmount();
  }, [isStarted, round]);

  //ยิง api ไปขอคำศัพท์ที่ตัดแล้ว
  const getWordCut = async () => {
    const response = await axios.post(
      // "http://localhost:5000/getcutwords",
      import.meta.env.VITE_END_POINT + "/getcutwords",
      {
        answer: answer,
      }
    );
    if (response["data"].status === "ok") {
      return response["data"];
    } else {
      console.log("เกิดข้อผิดพลาด : ", response["data"]);
    }
  };


  // console.log("เหลือเวลาอีก :", counter);
  // console.log("answer : ", answer);
  // console.log("time : ", time);
  // console.log("Round : ", round);

  return (
    <div className="grid-game">
      <header className="top-header">
        <div className="text-header">SaKodKum</div>
      </header>
      {isStarted ? (
        <div className="group-start-input">
          {/* ส่วนเล่นเกม */}
          <div className="game-title">
        <div className="text-title-1">Thai word spelling exercise</div>
        <div className="text-title-2">แบบฝึกหัดตัวสะกดภาษาไทย</ div>
           </div>
          <div id="game-ready">
            {/* ปุ่มหยุดเวลา */}
            <button
              className="button-pause"
              onClick={() => {
                handlePause();
                setIsPauseModal(true);
              }}
            >
              | |
            </button>
            {/* ปุ่มหยุดเวลา */}
            <Modal show={isPauseModal} centered>
              <Modal.Header>
                <Modal.Title className="modal-title-1">
                  หยุดเวลาชั่วคราว
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="modal-body-1">
                <p>เวลา : {time} S</p>
                <p>
                  🏆 คะแนน : {score} / {round}
                </p>
                <p>✎ จำนวนข้อ : {round}</p>
              </Modal.Body>
              <Modal.Footer>
                <button
                  className="modal-button-1"
                  variant="warning"
                  onClick={() => handleReset()}
                >
                  เริ่มต้นใหม่
                </button>
                <button
                  className="modal-button-2"
                  variant="primary"
                  onClick={() => {
                    handleResume();
                    setIsPauseModal(false);
                  }}
                >
                  ทำต่อ
                </button>
              </Modal.Footer>
            </Modal>
            {/* แสดงเฉลย */}
            <Modal show={isSolveModal} centered>
              <Modal.Header>
                <Modal.Title className="modal-title-1">
                  เฉลย
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="modal-body-1">
                {activeicon?<p>✅</p>:<p>❌</p>}
                {resultAnswer}
              </Modal.Body>
              <Modal.Footer>
                <button
                  className="modal-button-2"
                  variant="primary"
                  onClick={() => {
                    handleResume();
                    setIsSolveModal(false);
                  }}
                >
                  ตกลง
                </button>
              </Modal.Footer>
            </Modal>
            {round === 10 && (
              <Modal show={true} centered>
                <Modal.Header>
                  <Modal.Title className="modal-title-2">สรุปผล</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-2">
                  <p>⌛︎ เวลา : {time} S</p>
                  <p>
                    🏆 คะแนน : {score} / {round}
                  </p>
                  <p>✎ จำนวนข้อ : {round}</p>
                  <div className="modal-body-3" >
                  <p>-------------------------------------------------------------</p>
                  <p>
                     คำตอบทั้งหมด : 
                  </p>
                  {listResult.map((item,index) => {
                    return <p key = {index}>ข้อ : {index+1} {item}</p>

                  })}
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <button
                    className="modal-button-3"
                    variant="primary"
                    onClick={() => handleReset()}
                  >
                    ตกลง
                  </button>
                </Modal.Footer>
              </Modal>
            )}
            <div>
              <GameDetails time={time} score={score} round={round} />
              <p className="text-ramdom-tone"> มาตราสะกด :</p>
              <ul className="random-tone">
                {toneArray.map((toneId, idx) => {
                  const data = tones.find((obj) => {
                    return obj.id === toneId;
                  });
                  return <li key={idx}>{data.tone}</li>;
                })}
              </ul>
            </div>
            <div>
              <label>
                <p className="text-input">กรุณาเติมคำตอบในช่องว่าง</p>
                <input
                  className="input-text-1"
                  type="text"
                  value={answer}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value.replace(/^[A-Za-z]+$/, "");
                    setAnswer(value);
                  }}
                />
              </label>
              <button
                disabled={!answer}
                className="submit-answer-btn"
                onClick={() => 
                  {checkAnswer()
                  handlePause()
                  setIsSolveModal(true)
                  }
                }
              >
                ตรวจสอบ
              </button>
              
            </div>
          </div>
          {/* ส่วนเล่นเกม */}

          {/* ปุ่มเลิกเล่นเกม */}
          {/* <Button
            className="stop-btn"
            variant="danger"
            onClick={() => handleReset()}
          >
            เลิกเล่น
          </Button> */}
          {/* ปุ่มเลิกเล่นเกม */}
        </div>
      ) : (
        <div className="group-start-input">
          <div>
          <div className="game-title">
        <div className="text-title-1">Thai word spelling exercise</div>
        <div className="text-title-2">แบบฝึกหัดตัวสะกดภาษาไทย</div>
      </div>
            <label>
              <p className="text-random">จำนวนพยางค์</p>
              <input
                className="input-text"
                type="number"
                value={toneAmount}
                onChange={(e) => setToneAmount(e.target.value)}
              />
            </label>
          </div>
          <div className="group-btn">
            <button
              className="random-bottom"
              onClick={() => {
                handleStart();
                setIsStarted(true);
              }}
            >
              <div className="text-start">เริ่ม</div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
