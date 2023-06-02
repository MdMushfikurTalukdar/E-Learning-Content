const db = require("../../db/db")
const Note = db.Note;


// insert Note informatio using post request

module.exports.insertNote = async (req, res) => {

    try {
        const NoteInfo = req.body;
        const result = await Note.create(NoteInfo)
        if (!result) {
            return res.send('Result not found')

        }

        res.status(200).send({
            status: "Success",
            message: "Successfully Note information insert",
            data: result
        })
    } catch (error) {

        res.status(400).send({
            status: "Fail",
            message: "Note information not found",
            error: error.message
        })
    }

}



//Get all Note information using get request
module.exports.getAllNote = async (req, res) => {
    try {
        const result = await Note.findAll();

        if (!result) {
            return res.send('Result not found')

        }
        res.status(200).send({
            status: "Success",
            message: "All Note information",
            data: result,
        });
    } catch (error) {
        res.status(400).send({
            status: "fail",
            message: "Note information not found",
            error: error.message,
        });
    }
};


//Note information delete
module.exports.delete_Note= async (req, res) => {
    try {
        const { id } = req.params;
       // const { educationId } = req.params;
        console.log('Note Id here', id)

        if (!id) {
            return res.send('Id not found')

        }
        const result = await Note.destroy({ where: { Note_Id: id } })

        console.log("Note_information_update", req.body)
        if (!result) {
            return res.send('Result not found')

        }

        res.status(200).send({
            status: "Success",
            message: "Successfully Note information delete",
            data: result
        })
    } catch (error) {

        res.status(400).send({
            status: "fail",
            message: "No Note found",
            error: error.message
        })
    }
}

// Search specific Note 

module.exports.getNote = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Note.findAll({ where:{ Note_Id: id }});

        if (!result) {
            return res.send('Result not found')

        }
        res.status(200).send({
            status: "Success",
            message: "All Note information",
            data: result,
        });
    } catch (error) {
        res.status(400).send({
            status: "fail",
            message: "Note information not found",
            error: error.message,
        });
    }
};