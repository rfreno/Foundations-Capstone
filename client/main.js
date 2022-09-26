const baseURL = `http://localhost:5500/`

// document selectors
const allPoses = document.querySelector('#allPoses')
const allCat = document.querySelector('#allCat')
const allFavs = document.querySelector('#allFavs')
const displayPoses = document.querySelector('#displayPoses')
const displayCat = document.querySelector('#displayCat')
const displayFavs = document.querySelector('#displayFavs')
const mainCont = document.querySelector('#main')

let poselist = []
let favList = []

// front-end functions
const clearList = () => {
    displayPoses.innerHTML = ``
    displayCat.innerHTML = ``
}

const getAllPoses = () => {
    clearList()
    mainCont.classList.add('hide')

    axios.get(`${baseURL}/poses`) 
        .then(res => {
            console.log(res)
            // for (let i = 0; i < res.data.items.length; i++) {
            //     const id = res.data.items[i].id
            //     const name = (res.data.items[i].english_name)
            //     const sanskrit =(res.data.items[i].sanskrit_name)
            //     const img = (res.data.items[i].img_url)
            //     const cats = res.data.items[i].yoga_categories

            //     const poseCopy = {
            //         id,
            //         name,
            //         sanskrit,
            //         img,
            //         cats,
            //         fav: false
            //     }
            //     poselist.push(poseCopy)
                // add a post request to backend to save the list
            for (let i = 0; i < res.length; i++) {
                const thisPose = document.createElement('div')
                thisPose.classList.add("poseContent")

                const poseHeader = document.createElement('div')
                poseHeader.classList.add('nameFav')

                const headerName = document.createElement('h3')
                headerName.textContent = `${res[i].name} (${res[i].sanskrit})`
                const favBtn = document.createElement('button')
                favBtn.classList.add('favBtn')
                favBtn.addEventListener('click', () => favorited(favBtn))
                // add functionality to this for fav list

                poseHeader.append(headerName,favBtn)
                thisPose.append(poseHeader)
                
                const image = document.createElement('img')
                image.src = res[i].img
                thisPose.append(image)
                
                const categories = document.createElement('p')
                for (let j = 0; j < res[i].cats.length; j++) {
                    categories.textContent += res[i].cats[j].name 
                    
                    if (j + 1 != res[i].cats.length) {
                        categories.textContent += ', '
                    }
                }
                thisPose.append(categories)
                displayPoses.append(thisPose)
            }
            }
        )}

const getAllCat = () => {
    clearList()
    mainCont.classList.add('hide')
    
    axios.get(`https://lightning-yoga-api.herokuapp.com/yoga_categories`) 
    .then(res => {
        for (let i = 0; i < res.data.items.length; i++) {
            const {id, name, description, yoga_poses} = res.data.items[i]

            const catCopy = {
                id,
                name,
                description,
                yoga_poses
            }

            const thisCat = document.createElement('div')
            thisCat.classList.add("catContent")

                const nameDisplay = document.createElement('h3')
                nameDisplay.textContent = `${catCopy.name}`
                thisCat.append(nameDisplay)

                const catDescription = document.createElement('p')
                catDescription.textContent = catCopy.description
                thisCat.append(catDescription)

                const poses = document.createElement('p')
                poses.textContent = "Poses in this category include: "
                for (let j = 0; j < catCopy.yoga_poses.length; j++) {
                    poses.textContent += catCopy.yoga_poses[j].english_name + ' (' + catCopy.yoga_poses[j].sanskrit_name
                    if ( j + 1 != catCopy.yoga_poses.length) {
                        poses.textContent += '), '
                    } else {
                        poses.textContent += ')'
                    }
                }
                thisCat.append(poses)

            displayCat.append(thisCat)
        }
    })
}

const favorited = (button) => {
    button.classList.toggle('favorited')

    // another var needs to reference the backend list and add/remove the toggled pose to the favorites button
}

const moused = num => {
    if (num === 1) {
        allPoses.classList.add('moused')
    } else if (num === 2) {
        allCat.classList.add('moused')
    } else if (num === 3) {
        allFavs.classList.add('moused')
    }
}

const mouseOff = num => {
    if (num === 1) {
        allPoses.classList.remove('moused')
    } else if (num === 2) {
        allCat.classList.remove('moused')
    } else if (num === 3) {
        allFavs.classList.remove('moused')
    }
}

// event listeners
allPoses.addEventListener('click', () => getAllPoses())
allCat.addEventListener('click', () => getAllCat())
// allFavs.addEventListener('click', () => getAllFavs())
    // this function will need to 'get' the favs list from the backend

allPoses.addEventListener('mouseover', () => moused(1))
allCat.addEventListener('mouseover', () => moused(2))
allFavs.addEventListener('mouseover', () => moused(3))

allPoses.addEventListener('mouseout', () => mouseOff(1))
allCat.addEventListener('mouseout', () => mouseOff(2))
allFavs.addEventListener('mouseout', () => mouseOff(3))
