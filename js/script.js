// IMPORT DOM ELEMENTS INCLUDING ARRAY OF CAT EMOTIONS FROM DATA.JS
import { catsData } from '/js/data.js'

// DOM ELEMENT REFERENCES FOR THE 'EMOTION-RADIOS'
const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')


// EVENT LISTENERS
emotionRadios.addEventListener('change', highlightCheckedOption)
memeModalCloseBtn.addEventListener('click', closeModal)
getImageBtn.addEventListener('click', renderCat)

// EVENT LISTENER FOR CLICKING OUTSIDE OF MODAL TO CLOSE
document.addEventListener('click', function (e) {
    if(e.target !== getImageBtn && e.target !== memeModal) {
        memeModal.style.display = 'none'
    }
})

// FUNCTIONS FOR highlightCheckedOption EVENT LISTENERS
function highlightCheckedOption(e){
    // clear selected element when another is chosen
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

// FUNCTIONS FOR closeModal EVENT LISTENERS
function closeModal() {
    memeModal.style.display = 'none'
}

// FUNCTIONS FOR renderCat EVENT LISTENERS
function renderCat() {
    const catObject = getSingleCatObject()
    memeModalInner.innerHTML = `
        <img class="cat-img"
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
        >
        `
    memeModal.style.display = 'flex'
}

function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()

    if (catsArray.length === 1){
        return catsArray[0]
    }
    else {
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }
}

function getMatchingCatsArray() {
    // Verifies is Animated GIFs only option is checked and outputs True or False
    const isGif = gifsOnlyOption.checked
    console.log(isGif)
    // If query selector finds an input with a type of radio checked it will run the lines of code below.
    if(document.querySelector('input[type="radio"]:checked')) {
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked

        const matchingCatsArray = catsData.filter(function(cat) {

            if (isGif){
                //includes method test to check if a selected emotion appears within an objects emotion array.
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else  {
                return cat.emotionTags.includes(selectedEmotion)
            }
        })
        return matchingCatsArray
    }
}

// Function to extract unique emotions from an array of cats' emotion tags.
function getEmotionsArray(cats){
    const emotionsArray = []
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            // Ensures only unique emotions are added to the array
            if(!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

// Function to render radio buttons for each unique emotion.
function renderEmotionsRadios(cats){
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
    // Setting the inner HTML of the 'emotionRadios' element
    emotionRadios.innerHTML = radioItems
}

// Rendering radio buttons based on the emotion tags in catsData
renderEmotionsRadios(catsData)

