// const baseURL = `http://localhost:9256`

// document selectors
const allPoses = document.querySelector('#allPoses')
const allCat = document.querySelector('#allCat')
const allFavs = document.querySelector('#allFavs')
const allRoutines = document.querySelector('#allRoutines')
const displayPoses = document.querySelector('#displayPoses')
const displayCat = document.querySelector('#displayCat')
const displayFavs = document.querySelector('#displayFavs')
const mainCont = document.querySelector('#main')
const routineAdder = document.querySelector('#addButton')
const displayRoutines = document.querySelector('#displayRoutines')
const checkboxes = document.getElementsByClassName('checkboxes')

let routinePoses = []

// front-end functions
const clearList = () => {
    mainCont.classList.add('hide')
    displayPoses.innerHTML = ``
    displayCat.innerHTML = ``
    displayFavs.innerHTML = ``
    displayRoutines.innerHTML = ``
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
    } else if (num === 4) {
        routineAdder.classList.add('moused')
    } else if (num === 5) {
        allRoutines.classList.add('moused')
    }
}

const mouseOff = num => {
    if (num === 1) {
        allPoses.classList.remove('moused')
    } else if (num === 2) {
        allCat.classList.remove('moused')
    } else if (num === 3) {
        allFavs.classList.remove('moused')
    } else if (num === 4) {
        routineAdder.classList.remove('moused')
    } else if (num === 5) {
        allRoutines.classList.remove('moused')
    }
}



const addRoutine = (e) => {
    e.preventDefault()
    const poseChecks = document.querySelectorAll('.checkboxes')

    poseChecks.forEach((checkbox) => {
        if (checkbox.checked === true) {
            routinePoses.push(checkbox.value)
        }
    })

    const rName = document.querySelector('#rname')
    const creator = document.querySelector('#creator')
    const beg = document.querySelector('#beg').checked
    const int = document.querySelector('#int').checked
    const adv = document.querySelector('#adv').checked

    // set var to equal beg, int, or adv - which one is true?
    let difficulty = ''
    if (beg === true) {
        difficulty = 'Beginner'
    } else if (int === true) {
        difficulty = 'Intermediate'
    } else if (adv === true) {
        difficulty = 'Advanced'
    }

    let body = {
        name:  rName.value,
        creator: creator.value,
        difficulty,
        poses: routinePoses
    }

    axios.post('/routines', body).then(res => {
        alert(res.data)
    })
    routineSetUp()
}

// const addPosetoRoutine = poseName => {
//     console.log('adding pose!', poseName)
//     routinePoses.push(poseName)
// }

const routineSetUp = () => {
    clearList()

    displayRoutines.innerHTML = `
    <h2>Fill out the form below to create a routine.</h2>
    <form id='createRoutine'>
    <label for="rname">Routine title:</label><br>
    <input type="text" id="rname" name="rname"><br>
    <label for="creator">Creator name:</label><br>
    <input type="text" id="creator" name="creator">
    <p>Choose the routine difficulty level below:</p>
    <input type="radio" id="beg" name="difficulty" value="Beginner">
    <label for="beg">Beginner</label><br>
    <input type="radio" id="int" name="difficulty" value="Intermediate">
    <label for="int">Intermediate</label><br>
    <input type="radio" id="adv" name="difficulty" value="Advanced">
    <label for="adv">Advanced</label>
    <p></p>
    <label for="poses">Select poses to include:</label>
    <div id="poseCheck"></div>
    <input type="submit" value="Submit" onclick="addRoutine">
    </form>
    `
    const poseCheckboxes = document.querySelector('#poseCheck')
    
    axios.get(`/poses`)
    .then(res => {
        for (let i = 0; i < res.data.length; i++) {
            let poseCheck = document.createElement('input')
            // poseCheck.innerHTML = `<button onclick="addPosetoRoutine(${res.data[i].name})">${res.data[i].name}</button`
            poseCheck.type = "checkbox"
            poseCheck.id = res.data[i].id
            poseCheck.value = res.data[i].name
            poseCheck.name = res.data[i].name
            poseCheck.classList.add('checkboxes')
            poseCheck.textContent = res.data[i].name
            let poseLabel = document.createElement('label')
            poseLabel.for = res.data[i].name
            poseLabel.textContent = res.data[i].name
            poseCheckboxes.append(poseCheck,poseLabel)
            // create document selector for checkbox
            // let selectedPose = document.querySelector(`${res.data[i].id}`)
            // push to poseSelectorList
            // selectedPose.addEventListener('click', addPosetoRoutine(selectedPose.value))
        }
    })

    const form = document.querySelector('form')
    form.addEventListener('submit', addRoutine)

}

const showRoutines = () => {
    clearList()

    axios.get('/routines').then(res => {
        for (let i = 0; i < res.data.length; i++) {
            const thisRoutine = document.createElement('div')
            const routineName = document.createElement('h2')
            routineName.textContent= res.data[i].name
            const creatorName = document.createElement('h3')
            creatorName.textContent= res.data[i].creator
            const difficulty = document.createElement('p')
            difficulty.textContent= res.data[i].difficulty
            const poseList = document.createElement('div')
            
            poseList.innerHTML = `<p>Pose list:</p>`
            console.log(res.data[i].poses)

            res.data[i].poses.forEach((one) => {
                const thisone = document.querySelector('p')
                thisone.textContent = one
                poseList.append(thisone)
            })

            // for (let j = 0; j < res.data[i].poses.length; j++) {
                
            // }

            thisRoutine.append(routineName, creatorName, difficulty,poseList)
            displayRoutines.append(thisRoutine)
        }
    }
    )
}

getAllPoses()

// event listeners
allPoses.addEventListener('click', () => showPoses())
allCat.addEventListener('click', () => getAllCat())
allFavs.addEventListener('click', () => getAllFavs())
routineAdder.addEventListener('click', () => routineSetUp())
allRoutines.addEventListener('click', () => showRoutines())

allPoses.addEventListener('mouseover', () => moused(1))
allCat.addEventListener('mouseover', () => moused(2))
allFavs.addEventListener('mouseover', () => moused(3))
routineAdder.addEventListener('mouseover', () => moused(4))
allRoutines.addEventListener('mouseover', () => moused(5))

allPoses.addEventListener('mouseout', () => mouseOff(1))
allCat.addEventListener('mouseout', () => mouseOff(2))
allFavs.addEventListener('mouseout', () => mouseOff(3))
routineAdder.addEventListener('mouseout', () => mouseOff(4))
allRoutines.addEventListener('mouseout', () => mouseOff(5))

