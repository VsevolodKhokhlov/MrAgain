export default {
  formatZipcodeString: str => {
    if (str.length > 0) {
      let result = str.replace(/\s/g, "");
      let firstChr = str.charAt(0);
      if (isNaN(firstChr) === false) {
        let rege = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i;
        if (rege.test(result) === true) {
          result = result.toUpperCase();
        } else {
          result = "zipcode-error";
        }
      } else {
        firstChr = firstChr.toUpperCase();
        result = result.toLowerCase();
        result = firstChr + result.slice(1, result.length);
      }
      return result;
    }
    return "";
  }
};

export function ValidateEmail(mail) {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

export function ValidatePhoneNumber(inputtxt) {
  var phoneno = /^((\+|00(\s|\s?-\s?)?)31(\s|\s?-\s?)?(\(0\)[-\s]?)?|0)[1-9]((\s|\s?-\s?)?[0-9])((\s|\s?-\s?)?[0-9])((\s|\s?-\s?)?[0-9])\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]$/;
  if (inputtxt.match(phoneno)) {
    return true;
  } else {
    return false;
  }
}
