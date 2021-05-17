import express from "express";
import { User } from "../models/user.js";
import { validateAndUpdateResponses } from "../middleware/validateAndUpdateResponses.js";
import { circleAlterations } from "../utils/circleModifiers.js";

// create express router
const router = new express.Router();

// get user by id
router.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
});

// create new user
router.post("/users/create", async (req, res) => {
  const newUser = await new User(req.body).save();
  res.send(newUser);
});

// update user
router.patch("/users/update", validateAndUpdateResponses, async (req, res) => {
  const { updateStep, user, centerPoint } = req.body;
  console.log(user);
  try {
    console.log("Beginning circle alterations");
    const alterations =
      updateStep > 2
        ? circleAlterations[updateStep](
            user.responses,
            user.circleData,
            centerPoint
          )
        : circleAlterations[updateStep](user.responses, centerPoint);
    user.circleData = alterations.circleData;
    console.log(user.circleData);
    if (alterations.initialCircleData) {
      user.initialCircleData = alterations.initialCircleData;
    }
    await user.save();
    console.log("Circle alterations complete");
    res.send({
      data: {
        circleData: user.circleData,
        initialCircleData: user.initialCircleData,
      },
    });
  } catch (e) {
    console.log(e);
    res.send({ error: { ...e } });
  }
});

// delete user
router.delete("/users/delete/:id", async (req, res) => {});

export { router as userRouter };
