const checkKon = (word) => {
  if (checkKorKa(word)) {
    return false;
  } else {
    if (word.endsWith("น")) {
      return true;
    } else return false;
  }
};

const checkKom = (word) => {
  if (checkKorKa(word)) {
    return false;
  } else {
    if (word.endsWith("ม")) {
      return true;
    } else return false;
  }
};

const checkKob = (word) => {
  if (checkKorKa(word)) {
    return false;
  } else {
    if (word.endsWith("บ")) {
      return true;
    } else return false;
  }
};

const checkKod = (word) => {
  if (checkKorKa(word)) {
    return false;
  } else {
    if (word.endsWith("ด")) {
      return true;
    } else return false;
  }
};

const checkKok = (word) => {
  if (checkKorKa(word)) {
    return false;
  } else {
    if (word.endsWith("ก")) {
      return true;
    } else return false;
  }
};

const checkKong = (word) => {
  if (checkKorKa(word)) {
    return false;
  } else {
    if (word.endsWith("ง")) {
      return true;
    } else return false;
  }
};

const checkKerw = (word) => {
  if (checkKorKa(word)) {
    return false;
  } else {
    if (word.endsWith("ว")) {
      return true;
    } else return false;
  }
};

const checkKoei = (word) => {
  if (checkKorKa(word)) {
    return false;
  } else {
    if (word.endsWith("ย")) {
      return true;
    } else return false;
  }
};

const checkKorKa = (word) => {
  if (
    word.endsWith("่") ||
    word.endsWith("้") ||
    word.endsWith("๊") ||
    word.endsWith("๋")
  ) {
    return true;
  }

  // สระ
  else if (
    word.endsWith("ะ") ||
    word.endsWith("า") ||
    word.endsWith("ิ") ||
    word.endsWith("ี") ||
    word.endsWith("ึ") ||
    word.endsWith("ื") ||
    word.endsWith("ุ") ||
    word.endsWith("ู") ||
    word.endsWith("อ") ||
    word.endsWith("ำ") ||
    word.endsWith("ัว") ||
    word.endsWith("ีย") ||
    word.endsWith("ี่ย") ||
    word.endsWith("ี้ย") ||
    word.endsWith("ี๊ย") ||
    word.endsWith("ี๋ย") ||
    word.endsWith("ั่ว") ||
    word.endsWith("ั้ว") ||
    word.endsWith("ั๊ว") ||
    word.endsWith("ั๋ว")
  ) {
    return true;
  } else if (word[0] === "เ" && word.length <= 2) {
    return true;
  } else if (word[0] === "แ" && word.length <= 2) {
    return true;
  } else if (
    word.startsWith("เห") &&
    word.length <= 3 &&
    !word.endsWith("ว") &&
    !word.endsWith("ย") &&
    !word.endsWith("ม") &&
    !word.endsWith("ง") &&
    !word.endsWith("น") &&
    !word.endsWith("ก") &&
    !word.endsWith("บ") &&
    !word.endsWith("ด")
  ) {
    return true;
  } else if (
    word.startsWith("แห") &&
    word.length <= 3 &&
    !word.endsWith("ก") &&
    !word.endsWith("ด") &&
    !word.endsWith("บ") &&
    !word.endsWith("น") &&
    !word.endsWith("ง")
  ) {
    return true;
  } else if (
    word.startsWith("โห") &&
    word.length <= 3 &&
    !word.endsWith("ง") &&
    !word.endsWith("ม") &&
    !word.endsWith("ย") &&
    !word.endsWith("น") &&
    !word.endsWith("ก") &&
    !word.endsWith("บ") &&
    !word.endsWith("ด")
  ) {
    return true;
  } else if (
    (word.startsWith("เกร") ||
      word.startsWith("เขร") ||
      word.startsWith("เคร") ||
      word.startsWith("เตร") ||
      word.startsWith("เปร") ||
      word.startsWith("เพร") ||
      word.startsWith("เกล") ||
      word.startsWith("เขล") ||
      word.startsWith("เคล") ||
      word.startsWith("เปล") ||
      word.startsWith("เพล") ||
      word.startsWith("เผล") ||
      word.startsWith("เกว") ||
      word.startsWith("เขว") ||
      word.startsWith("เคว")) &&
    word.length <= 3
  ) {
    return true;
  } else if (
    (word.startsWith("แกร") ||
      word.startsWith("แขร") ||
      word.startsWith("แคร") ||
      word.startsWith("แตร") ||
      word.startsWith("แปร") ||
      word.startsWith("แพร") ||
      word.startsWith("แกล") ||
      word.startsWith("แขล") ||
      word.startsWith("แคล") ||
      word.startsWith("แปล") ||
      word.startsWith("แพล") ||
      word.startsWith("แผล") ||
      word.startsWith("แกว") ||
      word.startsWith("แขว") ||
      word.startsWith("แคว")) &&
    word.length <= 3
  ) {
    return true;
  } else if (
    (word.startsWith("โกร") ||
      word.startsWith("โขร") ||
      word.startsWith("โคร") ||
      word.startsWith("โตร") ||
      word.startsWith("โปร") ||
      word.startsWith("โพร") ||
      word.startsWith("โกล") ||
      word.startsWith("โขล") ||
      word.startsWith("โคล") ||
      word.startsWith("โปล") ||
      word.startsWith("โพล") ||
      word.startsWith("โผล") ||
      word.startsWith("โกว") ||
      word.startsWith("โขว") ||
      word.startsWith("โคว")) &&
    word.length <= 3
  ) {
    return true;
  } else if (
    (word.startsWith("ใกร") ||
      word.startsWith("ใขร") ||
      word.startsWith("ใคร") ||
      word.startsWith("ใตร") ||
      word.startsWith("ใปร") ||
      word.startsWith("ใพร") ||
      word.startsWith("ใกล") ||
      word.startsWith("ใขล") ||
      word.startsWith("ใคล") ||
      word.startsWith("ใปล") ||
      word.startsWith("ใพล") ||
      word.startsWith("ใผล") ||
      word.startsWith("ใกว") ||
      word.startsWith("ใขว") ||
      word.startsWith("ใคว")) &&
    word.length <= 3
  ) {
    return true;
  } else if (
    (word.startsWith("ไกร") ||
      word.startsWith("ไขร") ||
      word.startsWith("ไคร") ||
      word.startsWith("ไตร") ||
      word.startsWith("ไปร") ||
      word.startsWith("ไพร") ||
      word.startsWith("ไกล") ||
      word.startsWith("ไขล") ||
      word.startsWith("ไคล") ||
      word.startsWith("ไปล") ||
      word.startsWith("ไพล") ||
      word.startsWith("ไผล") ||
      word.startsWith("ไกว") ||
      word.startsWith("ไขว") ||
      word.startsWith("ไคว")) &&
    word.length <= 3
  ) {
    return true;
  } else if (word.startsWith("ไ") || word.startsWith("ใ")) {
    return true;
  } else if (
    word[word.length + 0] === "เ" &&
    word.length > 2 &&
    (word[word.length - 1] !== "ง" ||
      word[word.length - 1] !== "ม" ||
      word[word.length - 1] !== "ย" ||
      word[word.length - 1] !== "ว" ||
      word[word.length - 1] !== "ก" ||
      word[word.length - 1] !== "บ" ||
      word[word.length - 1] !== "น" ||
      word[word.length - 1] !== "ด")
  ) {
    return true;
  } else if (
    word[word.length + 0] === "แ" &&
    word.length >= 2 &&
    (word[word.length - 1] !== "ง" ||
      word[word.length - 1] !== "ม" ||
      word[word.length - 1] !== "ย" ||
      word[word.length - 1] !== "ว" ||
      word[word.length - 1] !== "ก" ||
      word[word.length - 1] !== "บ" ||
      word[word.length - 1] !== "น" ||
      word[word.length - 1] !== "ด")
  ) {
    return true;
  } else if (
    word[0] === "โ" &&
    word.length >= 2 &&
    word[word.length - 1] !== "ง" &&
    word[word.length - 1] !== "ม" &&
    word[word.length - 1] !== "ย" &&
    word[word.length - 1] !== "ว" &&
    word[word.length - 1] !== "ก" &&
    word[word.length - 1] !== "บ" &&
    word[word.length - 1] !== "น" &&
    word[word.length - 1] !== "ด"
  ) {
    return true;
  } else {
    return false;
  }
};
export {
  checkKon,
  checkKorKa,
  checkKoei,
  checkKerw,
  checkKong,
  checkKok,
  checkKod,
  checkKob,
  checkKom,
};
