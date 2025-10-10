const RequestBuild = require("../models/RequestBuild");

exports.getAll = async (req, res) => {
  try {
    const requests = await RequestBuild.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.create = async (req, res) => {
  try {
    const reqBuild = new RequestBuild(req.body);
    await reqBuild.save();
    res.json(reqBuild);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const reqBuild = await RequestBuild.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(reqBuild);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    await RequestBuild.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
