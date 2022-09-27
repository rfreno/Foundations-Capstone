let poseList = []

module.exports = {
    addposes: (req, res) => {
        poseList.push(req.body)
        res.status(200).send()
    },
    getposes: (req, res) => {
        poseList.sort((a,b) => a.id - b.id)
        res.status(200).send(poseList)
        // console.log('sent')
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
        res.status(200).send(favorites)
    }
}

