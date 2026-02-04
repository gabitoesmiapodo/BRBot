const BRB_REGEX = /(\bbrb\b)/i;

function containsBRB(text = "") {
  return BRB_REGEX.test(text);
}

module.exports = { containsBRB };
