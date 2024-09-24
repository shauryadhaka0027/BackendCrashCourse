import express from 'express';
import User from '../model/user.js';

const router=express.Router();

router.post('/',async(req, res) => {
    try {
       const response= new User (req.body)
       await response.save()
       res.status(201).json({message: 'User created successfully', data: response})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})


router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// PUT: Update user by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

// DELETE: Remove user by ID
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});



export default router;