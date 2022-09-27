// const baseURL = `http://localhost:9256`

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
    mainCont.classList.add('hide')
    displayPoses.innerHTML = ``
    displayCat.innerHTML = ``
    displayFavs.innerHTML = ``
}

const getAllPoses = () => {
    axios.get(`https://lightning-yoga-api.herokuapp.com/yoga_poses`) 
        .then(res => {
            // console.log("front end", res.data.items)
            for (let i = 0; i < res.data.items.length; i++) {
                const id = res.data.items[i].id
                const name = (res.data.items[i].english_name)
                const sanskrit =(res.data.items[i].sanskrit_name)
                const img = (res.data.items[i].img_url)
                const cats = res.data.items[i].yoga_categories

                const poseCopy = {
                    id,
                    name,
                    sanskrit,
                    img,
                    cats,
                    fav: false
                }
                axios.post(`/poses`, poseCopy).then()
}})}

const showPoses = () => {
    clearList()
    axios.get(`/poses`)
        .then(res => {
            // console.log(res)
            for (let i = 0; i < res.data.length; i++) {
                const thisPose = document.createElement('div')
                thisPose.classList.add("poseContent")
                
                const poseHeader = document.createElement('div')
                poseHeader.classList.add('nameFav')
                
                const headerName = document.createElement('h3')
                headerName.textContent = `${res.data[i].name} (${res.data[i].sanskrit})`
                const favBtn = document.createElement('button')
                if (res.data[i].fav === false) {
                    favBtn.classList.add('favBtn')
                } else {
                    favBtn.classList.remove('favBtn')
                    favBtn.classList.add('favorited')
                }
                favBtn.addEventListener('click', () => favorited(favBtn, res.data[i], false))
                
                poseHeader.append(headerName,favBtn)
                thisPose.append(poseHeader)
                
                const image = document.createElement('img')
                image.src = res.data[i].img
                thisPose.append(image)
                
                const categories = document.createElement('p')
                // console.log(res.data)
                for (let j = 0; j < res.data[i].cats.length; j++) {
                    categories.textContent += res.data[i].cats[j].name 
                    
                    if (j + 1 != res.data[i].cats.length) {
                        categories.textContent += ', '
                    }
                }
                thisPose.append(categories)
                displayPoses.append(thisPose)
            }
    })
}

const getAllFavs = () => {
    clearList()
    axios.get(`/favorites`)
        .then(res => {
            // console.log(res)
            for (let i = 0; i < res.data.length; i++) {
                const thisPose = document.createElement('div')
                thisPose.classList.add("favContent")
                
                const poseHeader = document.createElement('div')
                poseHeader.classList.add('nameFav')
                
                const headerName = document.createElement('h3')
                headerName.textContent = `${res.data[i].name} (${res.data[i].sanskrit})`
                const favBtn = document.createElement('button')
                if (res.data[i].fav === false) {
                    favBtn.classList.add('favBtn')
                } else {
                    favBtn.classList.add('favorited')
                }
                favBtn.addEventListener('click', () => favorited(favBtn, res.data[i], true))
                // add functionality to this for fav list
                
                poseHeader.append(headerName,favBtn)
                thisPose.append(poseHeader)
                
                const image = document.createElement('img')
                image.src = res.data[i].img
                thisPose.append(image)
                
                displayFavs.append(thisPose)
            }

            if (res.data.length === 0) {
                displayFavs.innerHTML = `
                <p>No poses have been favorited yet! Click on 'Poses' to view the list and select your favorites.</p>
                `
            }
    })


}

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

const favorited = (button, pose, source) => {
    button.classList.toggle('favorited')
    button.classList.toggle('favBtn')
    axios.put(`/poses/${pose.id}`, pose).then()
    // console.log(source)
    if (source === true) {
        getAllFavs()
    }
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

getAllPoses()

// event listeners
allPoses.addEventListener('click', () => showPoses())
allCat.addEventListener('click', () => getAllCat())
allFavs.addEventListener('click', () => getAllFavs())
    // this function will need to 'get' the favs list from the backend

allPoses.addEventListener('mouseover', () => moused(1))
allCat.addEventListener('mouseover', () => moused(2))
allFavs.addEventListener('mouseover', () => moused(3))

allPoses.addEventListener('mouseout', () => mouseOff(1))
allCat.addEventListener('mouseout', () => mouseOff(2))
allFavs.addEventListener('mouseout', () => mouseOff(3))

