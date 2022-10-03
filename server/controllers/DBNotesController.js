const Notes = require('../models/notes')

exports.getAll =  async (req, res, next) => {
  try {
    const notes = await Notes.findAll()
    return res.status(200).json({status: 'ok', notes})
  } catch (err) {
    return res.status(500).json({status: 'Error', err})
  }
}

exports.getOne = async (req, res, next) => {
  try {
    const note = await Notes.findByPk(req.params.id)
    return res.status(200).json({ status: "ok", note })
  } catch (err) {
    return res.status(500).json({ status: "Error", err })
  }
}

exports.createOne = async (req, res, next) => {
  try {
    const NOTE_MODEL = {
      name: req.body.name,
      category: req.body.category,
      content: req.body.content
    }
    const note = await Notes.create(NOTE_MODEL)
    return res.status(200).json({ status: "ok", note })
  } catch (err) {
    return res.status(500).json({ status: "Error", err })
  }
};

exports.updateOne = async (req, res, next) => {
  try {
    const NOTE_MODEL = {
      name: req.body.name,
      category: req.body.category,
      content: req.body.content,
    }
    const note = await Notes.update(NOTE_MODEL, { where: {id: req.params.id } })
    return res.status(200).json({ status: "ok", note })
  } catch (err) {
    return res.status(500).json({ status: "Error", err })
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const note = await Notes.destroy({ where: { id: req.params.id } })
     return res.status(200).json({ status: "ok", note });
  } catch (err) {
    return res.status(500).json({ status: "Error", err });
  }
};