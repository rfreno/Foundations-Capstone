let poseList = []
let routines = [
    {
        id: 1,
        name: "For the Dogs",
        creator: "Bek Reno-Winters",
        difficulty: "Beginner",
        description: "A simple flow to mimic dog stretches",
        poses: ["Downward-Facing Dog", "Upward-Facing Dog"]
    },
    {
        id:2,
        name: "STRETCH",
        creator: "Karen Reno",
        difficulty: "Beginner",
        description: "Loosen up!",
        poses:["Butterfly", "Cat","Cow","Child's Pose","Corpse","Downward-Facing Dog","Pigeon","Seated Forward Bend","Squat","Standing Forward Bend"]
    },
    {
        id:3,
        name: "The Zoo",
        creator: "Old McDonald",
        difficulty: "Intermediate",
        description: "You want an animal? We got 'em!",
        poses:["Butterfly","Camel","Cat","Cow","Crow","Dolphin","Downward-Facing Dog","Eagle","Pigeon","King Pigeon","Half Lord of the Fishes","Sphinx","Upward-Facing Dog","Wild Thing"]
    }
]

let archives = []

module.exports = {
    addposes: (req, res) => {
        poseList.push(req.body)
        res.status(200).send()
    },
    getposes: (req, res) => {
        poseList = Array.from(new Set(poseList.map(a => a.id))).map(id => {return poseList.find(a => a.id === id)})

        res.status(200).send(poseList)
    },
    togglefav: (req, res) => {
        let index = poseList.findIndex(elem => elem.id === req.body.id)

        if ( poseList[index].fav === false ) {
            poseList[index].fav = true
        } else {
            poseList[index].fav = false
        }
        res.status(200).send()
    },
    getfavs: (req,res) => {
        let favorites = poseList.filter((pose) => pose.fav === true)
        favorites = Array.from(new Set(favorites.map(a=>a.id))).map(id=> {return favorites.find(a=>a.id === id)})
        res.status(200).send(favorites)
    },
    addroutine: (req, res) => {
        routines.push(req.body)
        res.status(200).send('Routine added!')
    },
    getroutines: (req, res) => {
        res.status(200).send(routines)
    },
    arcroutine: (req, res) => {
        let ind = routines.findIndex(elem => elem.id === parseInt(req.params.id))
        archives.push(routines[ind])
        routines.splice(ind,1)
        res.status(200).send()
    },  
    getarchives: (req, res) => {
        res.status(200).send(archives)
    }
}

