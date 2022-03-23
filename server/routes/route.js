const express = require("express")
const router = express.Router()

const { register, login, postTodo, getTodo, getSingleTodo, updateTodo, deleteTodo } = require("../controllers/functions")

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/todo").get(getTodo).post(postTodo)
router.route("/update").get(getSingleTodo).put(updateTodo)
router.route("/delete").delete(deleteTodo)

module.exports = router
