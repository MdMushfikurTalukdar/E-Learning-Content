const router = require('express').Router()
const Note = require('../../controllers/Note/Note_controller')

router.post("/", Note.insertNote)
router.delete("/:id", Note.delete_Note)
router.get("/", Note.getAllNote)
router.get("/:id", Note.getNote)



module.exports = router