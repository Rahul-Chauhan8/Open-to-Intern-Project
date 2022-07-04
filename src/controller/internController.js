const { find } = require("../models/internModel");
const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel")
const mongoose = require("mongoose")
const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false
  if (typeof value === String && value.trim().length === 0) return false
  return true;
}



let createInterns = async function (req, res) {
  try {

    let bodyData = req.body


    let { name, email, mobile, collegeName } = bodyData

    if (!name) {
      return res.status(400).send({ status: false, msg: "please provide name " })
    }

    if (Object.keys(bodyData).length === 0) {
      return res.status(400).send({ status: false, msg: "please provide data" })
    }


    if (!/^([A-Za-z ]){1,100}$/.test(name)) {
      return res.status(400).send({ status: false, msg: "please enter valid name" })
    }
    if (!name.trim() || !email.trim()) {
      return res.status(400).send({ status: false, msg: "please dont give space " })
    }


    let checkemail = await internModel.findOne({ email: email })

    if (checkemail) {
      return res.status(400).send({ status: false, msg: "email is already exist enter a unique email id" })
    }

    if (!email || email.trim() == undefined) {
      return res.status(400).send({ status: false, msg: "email is required" })
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email)) {
      return res.status(400).send({ status: false, msg: "write a valid email id" })
    }

    let checkmobile = await internModel.findOne({ mobile: mobile })
    if (!mobile) {
      return res.status(400).send({ status: false, msg: "mobile number is missing" })
    }
    if (checkmobile) {
      return res.status(400).send({ status: false, msg: "mobile number is already exist enter a unique mobile number" })
    }

    if (!/^([0-9]){10}$/.test(mobile)) {
      return res.status(400).send({ status: false, msg: " please provide valid mobile number" })
    }

    let checkCollegeName = await collegeModel.findOne({ name: collegeName })



    if (!collegeName) {
      return res.status(400).send({ status: false, msg: "please provide college name" })
    }

    if (!/^([A-Za-z ]){1,100}$/.test(collegeName)) {
      return res.status(400).send({ status: false, msg: "please enter valid  collegeName" })
    }

    if (!checkCollegeName) {
      return res.status(404).send({ status: false, msg: "college name doesnot exists" })
    }
let collegeId = checkCollegeName._id
let data = {}
data.name = name
data.email = email
data.mobile = mobile
data.collegeId = collegeId
    let data1 = await internModel.create(data)

    return res.status(201).send({ status: true, data: data1 })

  }
  catch (error) {
    res.status(500).send({ status: false, msg: error.message })
  }
}




module.exports.createInterns = createInterns
