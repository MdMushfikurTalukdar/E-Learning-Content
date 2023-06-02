const db = require('../../db/db');
const Videos = db.Video

module.exports.createVideo = async (req, res) => {

  try {
      const VideoInfo = req.body;
      const result = await Videos.create(VideoInfo)
      if (!result) {
          return res.send('Result not found')

      }

      res.status(200).send({
          status: "Success",
          message: "Successfully video information insert",
          data: result
      })
  } catch (error) {

      res.status(400).send({
          status: "Fail",
          message: "Video not found",
          error: error.message
      })
  }

}

module.exports.getVideos  = async (req, res) => {
  try {
      const result = await Videos.findAll();

      if (!result) {
          return res.send('Result not found')

      }
      res.status(200).send({
          status: "Success",
          message: "All Videos",
          data: result,
      });
  } catch (error) {
      res.status(400).send({
          status: "fail",
          message: "Video not found",
          error: error.message,
      });
  }
};

//for deleting video
module.exports.delete_video= async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.send('video not found')

        }
        const result = await Videos.destroy({ where: { Video_Id: id } })

        console.log("video deleted", req.body)
        if (!result) {
            return res.send('Result not found')

        }

        res.status(200).send({
            status: "Success",
            message: "Successfully video information delete",
            data: result
        })
    } catch (error) {

        res.status(400).send({
            status: "fail",
            message: "No Video found",
            error: error.message
        })
    }
}