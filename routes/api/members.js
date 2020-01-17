const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const members = require("../../Members");

// Get All Members
router.get("/", (req, res) => {
  res.json(members);
});

// Get Single Member
router.get("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `Member ${req.params.id} not found` });
  }
});

router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active"
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ mes: "Please include name and email" });
  }

  members.push(newMember);

  res.json(members);
  //res.redirect("/");
});

// Update member
router.put("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    const updMember = req.body;

    members.forEach(element => {
      if (element.id === parseInt(req.params.id)) {
        element.name = updMember.name ? updMember.name : element.name;
        element.email = updMember.email ? updMember.email : element.email;

        res.json({ msg: "Member updated", element });
      }
    });
  } else {
    res.status(400).json({ msg: `Member ${req.params.id} not found` });
  }
});

// Delete Member
router.delete("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: "Member deleted",
      members: members.filter(member => member.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `Member ${req.params.id} not found` });
  }
});

module.exports = router;
