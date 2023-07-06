// ["มก", "กะ", "รา", "คม"] => ["ก", "กา", "กา", "กา", "ม"]
import * as tones from "../utils/tones";

const createTones = (splitWordList) => {
  let result = [];
  splitWordList.map((item) => {
    if (tones.checkKorKa(item)) {
      result.push("กา");
    } else if (tones.checkKon(item)) {
      result.push("น");
    } else if (tones.checkKom(item)) {
      result.push("ม");
    } else if (tones.checkKob(item)) {
      result.push("บ");
    } else if (tones.checkKod(item)) {
      result.push("ด");
    } else if (tones.checkKok(item)) {
      result.push("ก");
    } else if (tones.checkKong(item)) {
      result.push("ง");
    } else if (tones.checkKerw(item)) {
      result.push("ว");
    } else if (tones.checkKoei(item)) {
      result.push("ย");
    } else {
      result.push("");
    }
  });
  return result;
  // console.log("result: ", result);
};

export default createTones;
