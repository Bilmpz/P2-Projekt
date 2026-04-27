import { getAllGroups } from "./groupController.js";

const getGroups = async (req, res) => {
  try {
    const groups = await getAllGroups()

    res.render("main", {
      groups
      //somethingElse
    });

  } catch (err) {
    res.status(500).send(err.message);
  }
};

export { getDashboard };