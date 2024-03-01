exports.validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  return emailRegex.test(email);
};

exports.validatePhoneNumber = (phoneNumber) => {
  const germanNumberRegex =
    /(\(?([\d \-\)\–\+\/\(]+){6,}\)?([ .\-–\/]?)([\d]+))/;
  return germanNumberRegex.test(phoneNumber);
};

exports.validatePassword = (password) => {
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  return passwordRegex.test(password);
};
