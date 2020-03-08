let kittens = []


loadKittens()

/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target

  let kitten = {
    id: generateId(),
    name: form.name.value,
    mood: "Tolerant",
    affection: 5
  }
kittens.push(kitten)
console.log(kittens)
saveKittens()
drawKittens()
form.reset()
}

function removeHidden(){
  document.getElementById("addKittenForm").classList.remove("hidden")
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
    https://robohash.org/${kitten.name}?set=set4
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
          <button onclick="pet('${kitten.id}')" id = "petButton" class = "">Pet</button>
            <button onclick="catnip('${kitten.id}')" id = "catnipButton" class = "">Give Catnip</button>
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
  }else if(kitten.affection = 0){
    runAway(kitten)
  }
}

function runAway(kitten){
  let catnipButton = document.getElementById("catnipButton")
  let petButton = document.getElementById("petButton")

  catnipButton.setAttribute("disabled", "true")
  petButton.setAttribute("disabled", "true")
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
