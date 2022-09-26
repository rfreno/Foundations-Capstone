let poseList = []

module.exports = {
    getposes: (req, response) => {
        app.get(`https://lightning-yoga-api.herokuapp.com/yoga_poses`) 
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
                poseList.push(poseCopy)
            }})
            console.log(poseList)
        response.status(200).send(poseList)
    }
}

