const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

const tokenCookie = {
  maxAge: 1800000,
  sameSite: true
};
const signatureCookie = {
  maxAge: 86400000,
  httpOnly: true,
  sameSite: true
};

exports.login = async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send({error: 'We hebben je email of wachtwoord nodig'});
  }
  try {
    const user = await User.findOne({email});
    if (!user) {
      res.status(401).send({error: 'Er bestaat geen account met deze email'});
    } else {
      const isPasswordCorrect = await user.validPassword(password);
      if (isPasswordCorrect) {
        const {_id, name, roles} = user;
        const token = jwt.sign({_id, name, roles}, process.env.SECRET, {
          expiresIn: '24h'
        });
        const parts = token.split('.');
        const signature = parts.splice(2);
        res
          .cookie('token', parts.join('.'), tokenCookie)
          .cookie('signature', signature, signatureCookie)
          .status(200)
          .send({
            success: true,
            message: 'Succesvol ingelogd'
          });
      } else {
        res.status(401).send({
          success: false,
          message: 'Email of wachtwoord is niet juist'
        });
      }
    }
  } catch (error) {
    res
      .status(500)
      .send({message: 'Internal error, please try again', error});
  }
};

exports.logout = (req, res) => {
  res
    .clearCookie('token', tokenCookie)
    .clearCookie('signature', signatureCookie)
    .sendStatus(200);
};

exports.register = (req, res) => {
  const {email, password, name} = req.body;
  const user = new User({email, password, name});
  user.save(err => {
    if (err) {
      res.status(500).send({
        succes: false,
        message: 'Ai! iemand was sneller, gebruik een ander emailadres'
      });
    } else {
      res.status(200).send({
        succes: true,
        message: 'Welcome to the club!'
      });
    }
  });
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send({err: err.note || 'Error'});
  }
};
