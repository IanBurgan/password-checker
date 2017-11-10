const alphabetLower = 'abcdefghijklmnopqrstuvwxyz'.split('');
const alphabetUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const numbers = '1234567890'.split('');
const symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'.split('');
// 100 random words to choose from
const words = [
  "toys","friction","gleaming","glue","spiky","attract","daily","own","ski",
  "unit","trade","bee","lovely","skirt","wandering","queue","drab","drawer",
  "vegetable","squeamish","axiomatic","painful","needy","shock","battle",
  "clip","better","juice","exuberant","equable","flashy","skinny","glorious",
  "decisive","nation","historical","magenta","belief","bake","quiver",
  "worried","rustic","laughable","push","flock","ablaze","impossible","nice",
  "sink","pipe","spotty","jumbled","jump","perfect","match","internal",
  "psychedelic","mushy","shelter","jaded","sky","rhyme","enjoy","receptive",
  "thunder","naive","null","elite","fragile","balance","walk","doubt",
  "future","knock","delirious","learn","exciting","acceptable","lying",
  "important","aberrant","cheer","order","breakable","lettuce","division",
  "sneeze","moaning","paste","notebook","versed","same","swanky","wink",
  "heartbreaking","puzzled","business","loving","private","field"
];

function populateSelects() {
  let select = document.getElementById('length');

  let weak = document.createElement('optgroup');
  weak.label = 'Weak';
  let strong = document.createElement('optgroup');
  strong.label = 'Stong';

  for (let i = 4; i < 16; i++) {
    let opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    weak.appendChild(opt);
  }

  for (let i = 16; i <= 50; i++) {
    let opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    strong.appendChild(opt);
  }

  select.appendChild(weak);
  select.appendChild(strong);
  select.value = 16;

  let randomWord = document.getElementById('randNum');
  for (let i = 1; i < 25; i++) {
    let opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    randomWord.appendChild(opt);
  }
}

function passwordChanged() {
  pw = document.getElementById('input').value;
  check(pw);
}

function generate() {
  let validSet = new Array();
  let pass = new Array();

  let excluded = excludedChars();
  fltrNumbers = numbers.filter(x => !excluded.has(x));
  fltrSymbols = symbols.filter(x => !excluded.has(x));
  fltrAlphabetUpper = alphabetUpper.filter(x => !excluded.has(x));
  fltrAlphabetLower = alphabetLower.filter(x => !excluded.has(x));
  console.log(excluded);
  console.log(fltrNumbers, fltrSymbols, fltrAlphabetUpper, fltrAlphabetLower);

  if (includeNum()) {
    pass.push(fltrNumbers[Math.floor(Math.random()*fltrNumbers.length)])
    validSet = validSet.concat(fltrNumbers);
  }

  if (includeSym()) {
    pass.push(fltrSymbols[Math.floor(Math.random()*fltrSymbols.length)])
    validSet = validSet.concat(fltrSymbols);
  }

  if (includeUpper()) {
    pass.push(fltrAlphabetUpper[Math.floor(Math.random()*fltrAlphabetUpper.length)])
    validSet = validSet.concat(fltrAlphabetUpper);
  }

  if (includeLower()) {
    pass.push(fltrAlphabetLower[Math.floor(Math.random()*fltrAlphabetLower.length)])
    validSet = validSet.concat(fltrAlphabetLower);
  }

  let length = getLength();
  for (let i = pass.length; i < length; i++) {
    let item = validSet[Math.floor(Math.random()*validSet.length)];

    pass.push(item);
  }

  shuffle(pass);
  displayPass(pass.join(''));
}

function includeNum() {
  return document.getElementById('numbers').checked;
}

function includeSym() {
  return document.getElementById('symbols').checked;
}

function includeUpper() {
  return document.getElementById('uppers').checked;
}

function includeLower() {
  return document.getElementById('lowers').checked;
}

function excludedChars() {
  let excluded = new Set(document.getElementById('excluded').value.split(''));
  return excluded;
}

function getLength() {
  return document.getElementById('length').value;
}

function displayPass(pass) {
  let dispBox = document.getElementById('output');
  dispBox.value = pass;
}

// Fisher-Yates Shuffle
function shuffle(array) {
  let i = array.length;

  while (i > 0) {
    let rand = Math.floor(Math.random() * i);
    i--;

    let temp = array[i];
    array[i] = array[rand];
    array[rand] = temp;
  }

  return array;
}

function check(pw) {
  console.log(pw);
}

function generate() {
  let validSet = new Array();

  if (includeNum()) {
    validSet = validSet.concat(numbers);
  }

  if (includeSym()) {
    validSet = validSet.concat(symbols);
  }

  if (includeUpper()) {
    validSet = validSet.concat(alphabetUpper);
  }

  if (includeLower()) {
    validSet = validSet.concat(alphabetLower);
  }

  let excluded = excludedChars();
  validSet = validSet.filter(x => excluded.indexOf(x) < 0 );

  let pass = new Array();

  let length = getLength();
  for (let i = 0; i < length; i++) {
    let item = validSet[Math.floor(Math.random()*validSet.length)];

    pass.push(item);
  }

  displayPass(pass.join(''));
}

function includeNum() {
  return document.getElementById('numbers').checked;
}

function includeSym() {
  return document.getElementById('symbols').checked;
}

function includeUpper() {
  return document.getElementById('uppers').checked;
}

function includeLower() {
  return document.getElementById('lowers').checked;
}

function excludedChars() {
  return document.getElementById('excluded').value.split();
}

function getLength() {
  return document.getElementById('length').value;
}

function displayPass(pass) {
  let dispBox = document.getElementById('output');
  dispBox.value = pass;
}

function randomWord() {
  var num = document.getElementById('randNum').value;
  var newHTML = '';
  var array = [];

  while (array.length < num) {
    var temp = words[Math.floor(Math.random() * words.length)];
    if (array.indexOf(temp) < 0) {
      newHTML += temp + ' ';
      array.push(temp);
    }
  }

  document.getElementById('randomwords').innerHTML = '<p>' + newHTML +'</p>';
}

/*
SOURCE: http://passrequirements.com/list.php
Instagram, ESPN, Amazon, Dropbox, hulu, linkedin: length >= 6
Craigslist, google: length >= 8
Github: at least 1 lowercase letter, 1 number, and 7 characters
Ebay: 6 <= length <= 64, includes at least 1 number or symbol
Facebook: length >= 6, includes at least 1 letter and symbol
iTunes: length >= 8, at least 1 number, uppercase, lowercase letter, no spaces, cannot have same character 3 times in a row
Microsoft: length >= 8, at least 2 uppercase, lowercase letters, numbers and symbols
Netflix: 4 <= length <= 60
NYTimes: 5 <= length <= 15
*/
function checkPassRequirements() {
  var insta, espn, amazon, craigslist, dropbox, google, hulu, linkedin, github, ebay, facebook, itunes, microsoft, netflix, nytimes = false;
  pw = document.getElementById('input').value;
  
  //TODO: github, ebay, facebook, itunes, microsoft
  
  if (pw.length >= 6) {
    insta = true;
    espn = true;
    amazon = true;
    dropbox = true;
    hulu = true;
    linkedin = true;
  }
  if (pw.length >= 8) {
    craigslist = true;
    google = true;
  }
  if (pw.length >= 4 && pw.length <= 60) {
    netflix = true;
  }
  if (pw.length >= 5 && pw.length <= nytimes) {
    nytimes = true;
  }
}
