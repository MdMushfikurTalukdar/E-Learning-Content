const db = require("../../db/db")
const Course = db.Course;
const sequelize = db.sequelize;


// insert Course informatio using post request

module.exports.insertCourse = async (req, res) => {

    try {
        const CourseInfo = req.body;
        const result = await Course.create(CourseInfo)
        if (!result) {
            return res.send('Result not found')

        }

        res.status(200).send({
            status: "Success",
            message: "Successfully Course information insert",
            data: result
        })
    } catch (error) {

        res.status(400).send({
            status: "Fail",
            message: "Course information not found",
            error: error.message
        })
    }

}



//Get all Course information using get request
module.exports.getAllCourse = async (req, res) => {
    try {
        const result = await Course.findAll();

        if (!result) {
            return res.send('Result not found')

        }
        res.status(200).send({
            status: "Success",
            message: "All Course information",
            data: result,
        });
    } catch (error) {
        res.status(400).send({
            status: "fail",
            message: "Course information not found",
            error: error.message,
        });
    }
};


//Course information delete
module.exports.delete_Course= async (req, res) => {
    try {
        const { id } = req.params;
       // const { educationId } = req.params;
        console.log('Course Id here', id)

        if (!id) {
            return res.send('Id not found')

        }
        const result = await Course.destroy({ where: { Course_Id: id } })

        console.log("Course_information_update", req.body)
        if (!result) {
            return res.send('Result not found')

        }

        res.status(200).send({
            status: "Success",
            message: "Successfully Course information delete",
            data: result
        })
    } catch (error) {

        res.status(400).send({
            status: "fail",
            message: "No Course found",
            error: error.message
        })
    }
}

// Search specific Course 

module.exports.getCourse = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Course.findAll({ where:{ Course_Id: id }});

        if (!result) {
            return res.send('Result not found')

        }
        res.status(200).send({
            status: "Success",
            message: "All Course information",
            data: result,
        });
    } catch (error) {
        res.status(400).send({
            status: "fail",
            message: "Course information not found",
            error: error.message,
        });
    }
};


//ALL in a Course 

module.exports.geteverything = async (req, res) => {
    try {
        const {id} = req.params;
        
        const result = await sequelize.query("SELECT * FROM courses LEFT JOIN notes ON courses.Course_Id = notes.courseCourseId LEFT JOIN videos ON courses.Course_Id = videos.courseCourseId where courses.Course_Id =? ;", {
            replacements: [id],
            type: sequelize.QueryTypes.SELECT
        })

        console.log("All at once", result);

        if (!result) {
            return res.send('Result not found')

        }
        res.status(200).send({
            status: "Success",
            message: "All Course information",
            data: result,
        });
    } catch (error) {
        res.status(400).send({
            status: "fail",
            message: "Course information not found",
            error: error.message,
        });
    }
};

