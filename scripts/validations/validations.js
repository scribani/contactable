export function nameValidation(name){
  if (name === "") return false;
  return true;
}

export function numberValidation(number){
  let numregex = /^\d+$/;
  if (number === "") return false;
  return numregex.test(number);
}

export function mailValidation(mail){
  let mailregex = /^\w*@\w*[.]\w*$/;
  if (mail === "") return false;
  return mailregex.test(mail);
}

export function relationValidation(relation){
  if (relation === "" || relation === "Relation") return false;
  return true;
}
