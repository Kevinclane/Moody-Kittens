let kittens = []


loadKittens()

function addKitten(event) {
  event.preventDefault()
  let form = event.target

  let kitten = {
    id: generateId(),
    name: form.name.value,
    mood: "Tolerant",
    affection: 5,
    color: "kitten Tolerant",
    off: "",
    button:""
  }
kittens.push(kitten)
console.log(kittens)
saveKittens()
drawKittens()
form.reset()
}

function removeHidden(){
  document.getElementById("addKittenForm").classList.remove("hidden")
  document.getElementById("123").classList.remove("hidden")
}

function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

function loadKittens() {
  let savedKittens = JSON.parse(window.localStorage.getItem("kittens"))
  if(savedKittens){
    kittens = savedKittens
    }
  }

function drawKittens() {
  let kittenListElem = document.getElementById("kittens")
  let template=""
  kittens.forEach(kitten => {
    template+=`
    <div id = "${kitten.id}" class = "kitten ${kitten.mood}">
    <img src="https://robohash.org/${kitten.name}?set=set4" alt="Error">
    </div>
    <small>
          <div>
            <h3>Name: ${kitten.name}</h3>
          </div>
          <div>
          <h3>Mood: ${kitten.mood}</h3>
          </div>
          <div>
          <h3>Affection: ${kitten.affection}</h3>
          </div>
          <div>
          <button onclick="pet('${kitten.id}')" id = "petButton" class = "${kitten.button}" ${kitten.off}>Pet</button>
            <button onclick="catnip('${kitten.id}')" id = "catnipButton" class = "${kitten.button}" ${kitten.off}>Give Catnip</button>
            <button onclick="deleteKitten('${kitten.id}')">Delete Kitten</button>
          </div>
    </small>
    `
  })
  kittenListElem.innerHTML = template
}

function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

function deleteKitten(id) {
  let index = kittens.findIndex(kitten => kitten.id == id)
  kittens.splice(index, 1)
saveKittens()
}

function catnip(id) {
  let index = kittens.findIndex(kitten => kitten.id == id)
  kittens[index].affection = 5
  setKittenMood(kittens[index])
  saveKittens()
}

function pet(id) {
  let index = kittens.findIndex(kitten => kitten.id == id)
  let rng = Math.floor(Math.random() * 10)

  if(rng > 7){
    kittens[index].affection++
  }else{
    kittens[index].affection--
  }
  setKittenMood(kittens[index])
  saveKittens()
}


function setKittenMood(kitten) {
  if(kitten.affection >= 6){
    kitten.mood = "Happy"
  }else if(kitten.affection <= 5 && kitten.affection >3){
    kitten.mood = "Tolerant"
  }else if(kitten.affection <= 3 && kitten.affection >0){
    kitten.mood = "Angry"
  }else{
    kitten.off = "disabled='true'"
    kitten.mood = "Gone"
    kitten.button = "kitten Gone"
  }
}

function getStarted() {
  document.getElementById("welcome").remove()
  removeHidden()
  drawKittens()
}

function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}
