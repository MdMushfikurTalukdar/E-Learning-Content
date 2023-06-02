const db = require("../../db/db")
const Intake = db.Intake;


// insert Intake informatio using post request

module.exports.insertIntake = async (req, res) => {

    try {
        const IntakeInfo = req.body;
        const result = await Intake.create(IntakeInfo)
        if (!result) {
            return res.send('Result not found')

        }

        res.status(200).send({
            status: "Success",
            message: "Successfully Intake information insert",
            data: result
        })
    } catch (error) {

        res.status(400).send({
            status: "Fail",
            message: "Intake information not found",
            error: error.message
        })
    }

}



//Get all Intake information using get request
module.exports.getAllIntake = async (req, res) => {
    try {
        const result = await Intake.findAll();

        if (!result) {
            return res.send('Result not found')

        }
        res.status(200).send({
            status: "Success",
            message: "All Intake information",
            data: result,
        });
    } catch (error) {
        res.status(400).send({
            status: "fail",
            message: "Intake information not found",
            error: error.message,
        });
    }
};


//Intake information delete
module.exports.delete_Intake= async (req, res) => {
    try {
        const { id } = req.params;
       // const { educationId } = req.params;
        console.log('Intake Id here', id)

        if (!id) {
            return res.send('Id not found')

        }
        const result = await Intake.destroy({ where: { Intake_Id: id } })

        console.log("Intake_information_update", req.body)
        if (!result) {
            return res.send('Result not found')

        }

        res.status(200).send({
            status: "Success",
            message: "Successfully Intake information delete",
            data: result
        })
    } catch (error) {

        res.status(400).send({
            status: "fail",
            message: "No Intake found",
            error: error.message
        })
    }
}

// Search specific Intake by intake id

module.exports.getIntake = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Intake.findAll({ where:{ Intake_Id: id }});

        if (!result) {
            return res.send('Result not found')

        }
        res.status(200).send({
            status: "Success",
            message: "All Intake information",
            data: result,
        });
    } catch (error) {
        res.status(400).send({
            status: "fail",
            message: "Intake information not found",
            error: error.message,
        });
    }
};

// Search specific Intake by Student id

module.exports.getIntakeStudent = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Intake.findAll({ where:{ Student_Id: id }});

        if (!result) {
            return res.send('Result not found')

        }
        res.status(200).send({
            status: "Success",
            message: "All Intake information",
            data: result,
        });
    } catch (error) {
        res.status(400).send({
            status: "fail",
            message: "Intake information not found",
            error: error.message,
        });
    }
};

// Search specific Intake by Course id

module.exports.getIntakeCourse = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Intake.findAll({ where:{ Course_Id: id }});

        if (!result) {
            return res.send('Result not found')

        }
        res.status(200).send({
            status: "Success",
            message: "All Intake information",
            data: result,
        });
    } catch (error) {
        res.status(400).send({
            status: "fail",
            message: "Intake information not found",
            error: error.message,
        });
    }
};

// Search specific Intake by Teacher id

module.exports.getIntakeTeacher = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Intake.findAll({ where:{ Teacher_Id: id }});

        if (!result) {
            return res.send('Result not found')

        }
        res.status(200).send({
            status: "Success",
            message: "All Intake information",
            data: result,
        });
    } catch (error) {
        res.status(400).send({
            status: "fail",
            message: "Intake information not found",
            error: error.message,
        });
    }
};