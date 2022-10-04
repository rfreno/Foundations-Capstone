// const baseURL = `http://localhost:9256`

// document selectors
const allPoses = document.querySelector('#allPoses')
const sortBox = document.getElementById('sortdropdown')
const allCat = document.querySelector('#allCat')
const allFavs = document.querySelector('#allFavs')
const allRoutines = document.querySelector('#allRoutines')
const displayPoses = document.querySelector('#displayPoses')
const displayCat = document.querySelector('#displayCat')
const displayFavs = document.querySelector('#displayFavs')
const mainCont = document.querySelector('#main')
const routineAdder = document.querySelector('#addButton')
const displayRoutines = document.querySelector('#displayRoutines')
const routineForm  = document.querySelector('#routineForm')
const checkboxes = document.getElementsByClassName('checkboxes')

let routinePoses = []
let globalID = 4

// front-end functions
const clearList = () => {
    mainCont.classList.add('hide')
    displayPoses.innerHTML = ``
    sortBox.innerHTML = ``
    displayCat.innerHTML = ``
    displayFavs.innerHTML = ``
    routineForm.innerHTML = ``
    displayRoutines.innerHTML = ``
}

const getAllPoses = () => {
    axios.get(`https://lightning-yoga-api.herokuapp.com/yoga_poses`) 
        .then(res => {
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
    getAllPoses()
    // clearList()

    // sortBox.innerHTML = `
    //     <label>Sort By:</label>
    //     <select id="sort" onchange="showPoses()">
    //         <option value="eaz">English - A to Z</option>
    //         <option value="eza">English - Z to A</option>
    //         <option value="saz">Sanskrit - A to Z</option>
    //         <option value="sza">Sanskrit - Z to A</option>
    //     </select>
    // `
    // const order = document.getElementById('sort').value
    // console.log("doc", document.getElementById('sort'))
    // // if (order === null) {
    // //     order = 'eaz'
    // // }
    // console.log('order',order)

    axios.get(`/poses`)//,{params:{order}})
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
                
                poseHeader.append(headerName)
                thisPose.append(poseHeader, favBtn)
                
                const image = document.createElement('img')
                image.src = res.data[i].img
                thisPose.append(image)
                
                const categories = document.createElement('p')
                categories.classList.add('padded')
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
    // clearList()
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
                <p class="small">No poses have been favorited yet! Click on 'Poses' to view the list and select your favorites.</p>
                `
            }
    })


}

const getAllCat = () => {
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

const routineSetUp = () => {
    // clearList()

    routineForm.innerHTML = `
    <h2 class='formheading'>Fill out the form below to create a routine.</h2>
    <p class='small formheading'>Fields marked with a * are required.</p><br>
    <form id='createRoutine'>
    <label for="rname" class="formlabel" required>*Routine title:</label>
    <input type="text" id="rname" name="rname"><br>
    <label for="creator" class="formlabel" required>*Creator name:</label>
    <input type="text" id="creator" name="creator"><br><br>
    <label class="formlabel" required>*Routine Difficulty:</label>
    <input type="radio" id="beg" name="difficulty" value="Beginner">
    <label for="beg">Beginner</label>
    <input type="radio" id="int" name="difficulty" value="Intermediate">
    <label for="int">Intermediate</label>
    <input type="radio" id="adv" name="difficulty" value="Advanced">
    <label for="adv">Advanced</label><br><br>
    <label for="description" class="formlabel">Description:</label>
    <input type="text" id="description" name="description">
    <label for="poseCheck" class="formlabel"><br><br>Select poses to include:</label>
    <ul id="poseCheck" class="allthecheckboxes"></ul>
    <input type="submit" value="Submit" onclick="addRoutine" class="routineSubmit">
    </form>
    `
    const poseCheckboxes = document.querySelector('#poseCheck')
    
    axios.get(`/poses`)
    .then(res => {
        for (let i = 0; i < res.data.length; i++) {
            let list = document.createElement('li')
            let poseCheck = document.createElement('label')
            poseCheck.classList.add('container')
            poseCheck.innerHTML = `
            ${res.data[i].name}
            <input type="checkbox" name="${res.data[i].name}" class="checkboxes">
            <span class="checkmark"></span>
            `
            poseCheckboxes.append(poseCheck)
        }
    })

    const form = document.querySelector('form')
    form.addEventListener('submit', addRoutine)

}

const addRoutine = (e) => {
    e.preventDefault()
    const poseChecks = document.querySelectorAll('.checkboxes')

    poseChecks.forEach((checkbox) => {
        if (checkbox.checked === true) {
            routinePoses.push(checkbox.name)
        }
    })

    const rName = document.querySelector('#rname')
    const creator = document.querySelector('#creator')
    const beg = document.querySelector('#beg').checked
    const int = document.querySelector('#int').checked
    const adv = document.querySelector('#adv').checked
    const desc = document.querySelector('#description')

    // set var to equal beg, int, or adv - which one is true?
    let difficulty = ''
    if (beg === true) {
        difficulty = 'Beginner'
    } else if (int === true) {
        difficulty = 'Intermediate'
    } else if (adv === true) {
        difficulty = 'Advanced'
    } else {
        difficulty = ''
    }

    let body = {
        id:globalID,
        name:  rName.value,
        creator: creator.value,
        difficulty,
        description: desc.value,
        poses: routinePoses
    }
    globalID++

    if (body.name === '' || body.creator === '' || difficulty === '') {
        alert('Required fields must be filled to submit routine.')
        return
    }

    axios.post('/routines', body).then(res => {
        alert(res.data)
    })
    routineSetUp()

    routinePoses = []
}

function slist (target) {
    // (A) SET CSS + GET ALL LIST ITEMS
    target.classList.add("slist");
    let items = target.getElementsByTagName("li"), current = null;
  
    // (B) MAKE ITEMS DRAGGABLE + SORTABLE
    for (let i of items) {
      // (B1) ATTACH DRAGGABLE
      i.draggable = true;
  
      // (B2) DRAG START - YELLOW HIGHLIGHT DROPZONES
      i.ondragstart = (ev) => {
        current = i;
        for (let it of items) {
          if (it != current) { it.classList.add("hint"); }
        }
      };
  
      // (B3) DRAG ENTER - RED HIGHLIGHT DROPZONE
      i.ondragenter = (ev) => {
        if (i != current) { i.classList.add("active"); }
      };
  
      // (B4) DRAG LEAVE - REMOVE RED HIGHLIGHT
      i.ondragleave = () => {
        i.classList.remove("active");
      };
  
      // (B5) DRAG END - REMOVE ALL HIGHLIGHTS
      i.ondragend = () => { for (let it of items) {
        it.classList.remove("hint");
        it.classList.remove("active");
      }};
  
      // (B6) DRAG OVER - PREVENT THE DEFAULT "DROP", SO WE CAN DO OUR OWN
      i.ondragover = (evt) => { evt.preventDefault(); };
  
      // (B7) ON DROP - DO SOMETHING
      i.ondrop = (evt) => {
        evt.preventDefault();
        if (i != current) {
          let currentpos = 0, droppedpos = 0;
          for (let it=0; it<items.length; it++) {
            if (current == items[it]) { currentpos = it; }
            if (i == items[it]) { droppedpos = it; }
          }
          if (currentpos < droppedpos) {
            i.parentNode.insertBefore(current, i.nextSibling);
          } else {
            i.parentNode.insertBefore(current, i);
          }
        }
      };
    }
  }

const showRoutines = () => {

    axios.get('/routines').then(res => {
        if (res.data.length === 0) {
            displayRoutines.innerHTML = `<p class="small">There are no routines to display</p>`
        }
        else {
            for (let i = 0; i < res.data.length; i++) {
                const thisRoutine = document.createElement('div')
                thisRoutine.classList.add('routineContent')

                const routineName = document.createElement('h2')
                routineName.textContent= res.data[i].name

                const archive = document.createElement('div')
                archive.innerHTML = `<button class="archive" onclick="arcRoutine('${res.data[i].id}')">Archive</button>`

                const creatorName = document.createElement('h4')
                creatorName.textContent = 'Created by ' + res.data[i].creator

                const desc = document.createElement('h5')
                desc.textContent= res.data[i].description

                const level = document.createElement('h4')
                level.textContent = 'Difficulty: ' + res.data[i].difficulty

                const poseList = document.createElement('div')
                const title = document.createElement('p')
                title.textContent = 'Pose List:'
                poseList.append(title)
                const orderlist = document.createElement('ul')
                orderlist.id ='sortlist'
                orderlist.classList.add('slist')
                
                res.data[i].poses.forEach(item => {
                    const newItem = document.createElement('li')
                    newItem.draggable = true
                    newItem.classList.add('poselist')
                    newItem.textContent = item
                    orderlist.append(newItem)
                })
                poseList.append(orderlist)

                thisRoutine.append(routineName, archive, creatorName, level, desc, poseList)
                displayRoutines.append(thisRoutine)
                slist(orderlist)

            }
    }}
    )
}

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

const arcRoutine = (routName) => {
    console.log(routName)
    axios.put(`/routines/${routName}`).then(showRoutines())
}


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