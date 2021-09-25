function validateEmpty(value) {
  if (value === "") return false;
  return true;
}

function addStyleOnValidationStatus(valid, input, errormsg) {
  errormsg = errormsg || input.nextElementSibling;

  if (valid) {
    input.className = "";
    errormsg.style.display = "none";
    return true;
  } else {
    input.className = "input-error";
    errormsg.style.display = "block";
    return false;
  }
}

export function nameValidation(nameInput) {
  const validName = validateEmpty(nameInput.value);
  return addStyleOnValidationStatus(validName, nameInput);
}

export function numberValidation(numberInput) {
  const numRegex = /^\d+$/;
  const validNumber =
    validateEmpty(numberInput.value) && numRegex.test(numberInput.value);
  return addStyleOnValidationStatus(validNumber, numberInput);
}

export function emailValidation(emailInput) {
  const emailRegex = /^\w+@\w+\.\w+$/;
  const validEmail =
    validateEmpty(emailInput.value) && emailRegex.test(emailInput.value);
  return addStyleOnValidationStatus(validEmail, emailInput);
}

export function relationValidation(relationInput) {
  const validRelation = validateEmpty(relationInput.value);
  const errormsg = relationInput.nextElementSibling.nextElementSibling;
  return addStyleOnValidationStatus(validRelation, relationInput, errormsg);
}
