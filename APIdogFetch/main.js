//NOTES: fetch("https://dog.ceo/api/breeds/list/all") inside fetch paranthesis is argument, fetch doesn't onlyreturn data that lives in the URL but also the prompts\\

//TRADITIONAL PROMISES//

// fetch("https://dog.ceo/api/breeds/list/all").then(function(response) {
//     return response.json()//deals with actual data sent, return another promise in itself//
// }).then(function(data){
//     console.log(data)
// })  

//the next .then this only runs after first promise is completed 

//.then is the promise, calls a promise, gives a function as an argument
//then calls it at appropriate time//


//MODERN PROMISES //
//await is going to make it so JS wont run other lines of codes until promise runs or resolves

//.message property contains the list of dog breeds

//backticks are template literals 

//   ${Object.keys()} returns an array, all arrays have access to method called map
//map will run the function in the () through each array in the breedList


//join joins a string of texts into one 

//message in slideshow function is what containers the images, just as it did for the list of dog breeds before 

let timer
let deleteFirstPhotoDelay

async function start () {
    const response = await fetch("https://dog.ceo/api/breeds/list/all")
    const data = await response.json()
    createBreedList(data.message) //CALLS FUNCTION AND GIVES IT ARGUMENT the () OF DATA
}


start()//calls function 

function createBreedList (breedList) {
    document.getElementById("breed").innerHTML = `
    <select onchange="loadByBreed(this.value)">
         <option>Choose a Dog Breed</option>
         ${Object.keys(breedList).map(function (breed) {
            return `<option>${breed}</option>`
         }).join('')}
    </select>
    `
}

async function loadByBreed(breed) { //it says breed but not connected to other breeds, this can be any name 
    if (breed != "Choose a Dog Breed") {
        const response = await fetch (`https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json()
        createSlideshow(data.message) 

    }
}

function createSlideshow(images) {
    let currentPosition = 0
    clearInterval(timer)
    clearTimeout(deleteFirstPhotoDelay)
    
  if (images.length > 1) {
    document.getElementById("slideshow").innerHTML= `
    <div class="slide" style="background-image: url('${images[0]}')"></div>
    <div class="slide" style="background-image: url('${images[1]}')"></div>
    `
    currentPosition  += 2 
    if (images.length == 2) currentPosition = 0
    timer = setInterval(nextSlide, 3000) 
  } else {
    document.getElementById("slideshow").innerHTML= `
    <div class="slide" style="background-image: url('${images[0]}')"></div>
    <div class="slide"></div>
    `
  }

    function nextSlide() {
        document.getElementById("slideshow").insertAdjacentHTML("beforeend",`<div class="slide" style="background-image: url('${images[currentPosition]}')"></div>`)
        deleteFirstPhotosDelay = setTimeout(function (){
            document.querySelector(".slide").remove()
        }, 2000)
        if (currentPosition + 1 >= images.length) {
            currentPosition = 0
        } else {
            currentPosition++
        }
    
    }
}






















