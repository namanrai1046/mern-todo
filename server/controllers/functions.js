const User = require("../models/model")
const bcrypt = require("bcrypt")

const register = async (req, res) => {
    try {
        const { name, email, password, confirmpassword } = await req.body
        const findUser = await User.findOne({ email: email })
        if (findUser) {
            return res.status(400).json({ status: "no", msg: "Email is already registered" })
        }
        if (password === confirmpassword) {
            const hashPassword = await bcrypt.hash(password, 10)
            if (!hashPassword) return res.status(403).json({ msg: "Server Error" })
            const user = await User({
                name: name,
                email: email,
                password: hashPassword
            })
            const result = await User.create(user)
            res.status(200).json({ status: "ok", msg: "user created" })
        }
        else {
            res.status("400").json({ status: "no", msg: "Password doesn't match" })
        }
    }
    catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = await req.body
        const user = await User.findOne({ email: email })
        if (user) {
            const checkPassword = await bcrypt.compare(password, user.password)
            if (!checkPassword) return res.status(400).json({ msg: "Wrong Password" })
            return res.status(200).json({ status: "ok", msg: "Access Granted", id: user._id })
        }
        else {
            return res.status(400).json({ status: "no", msg: "Invalid email or password" })
        }
    }
    catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const getTodo = async (req, res) => {
    try {
        const id = await req.headers["x-access-token"];
        if (id) {
            const todos = await User.findOne({ _id: id })
            if (todos) {
                return res.status(200).json({ msg: todos })
            }
            else {
                return res.status(400).json({ msg: "Invalid UserId" })
            }
        }
        else {
            return res.status(404).json({ msg: "Invalid UserId" })
        }
    }
    catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const postTodo = async (req, res) => {
    try {
        const { todo, id } = await req.body
        if (todo && id) {
            const newTodo = await User.findOneAndUpdate({ _id: id }, {
                $push: {
                    todo
                }
            })
            return await res.status(200).json({ status: "ok", msg: todo })
        } else {
            return await res.status(400).json({ msg: "Invalid UserId" })
        }
    }
    catch (error) {
        return res.status(400).json({ msg: "Error" })
    }
}

const getSingleTodo = async (req, res) => {
    try {
        const header = await req.headers["x-access-token"]
        const each = header.split(",")
        const id = each[0]
        const taskId = each[1]
        if (id) {
            const getData = await User.findOne({ _id: id })
            if (!getData) return res.status(400).json({ msg: "Wrong UserId" })

            const singleTask = await getData.todo[taskId]
            return res.status(200).json({ msg: singleTask })
        }
        else {
            res.status(400).json({ msg: "Invalid UserId" })
        }
    }
    catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const updateTodo = async (req, res) => {
    try {
        const { id, updateTask, taskId } = await req.body
        const get = await User.findOne({ _id: id })
        if (!get) return res.status(400).json({ msg: "Invalid UserId" })

        get.todo[taskId] = updateTask
        get.save()
        return res.status(200).json({ status: "ok", msg: "Todo Updated Succesfully" })
    }
    catch (error) {
        res.status(400).json({ msg: error })
    }
}

const deleteTodo = async (req, res) => {
    try {
        const { id, taskId } = await req.body
        const get = await User.findOne({ _id: id })
        if (!get) return res.status(400).json({ msg: "Invalid Username" })

        const temp = await get.todo
        const result = temp.filter((singleTask, index) => index != taskId)
        get.todo = result
        get.save()
        return res.status(200).json({ msg: "Ho gya" })
    }
    catch (error) {
        res.status(401).json({ msg: error })
    }
}

module.exports = { register, login, postTodo, getTodo, getSingleTodo, updateTodo, deleteTodo }