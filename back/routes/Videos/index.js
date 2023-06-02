const router = require('express').Router()
const Videos = require('../../controllers/Videos/Videos.controller')
// router.post("/signup", user.signup);
router.post("/createVideos",Videos.createVideo);
router.get("/",Videos.getVideos);
router.delete("/delete/:id", Videos.delete_video);


module.exports = router