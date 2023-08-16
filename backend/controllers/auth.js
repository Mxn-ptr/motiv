const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { signUpErrors, signInErrors } = require('../utils/error');
const { sendConfirmationMail } = require('../utils/generateMail');

// Sign Up and send a email confirmation
module.exports.signUp = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const user = await User.create({ email, username, password });
    sendConfirmationMail(subject = 'creation', user);
    res.status(201).json({ user: user._id });
  } catch (error) {
    let errors = signUpErrors(error);
    res.status(200).json({errors});
  }
};

// Sign In
module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    res.status(200).json({ user: user._id });
  } catch (error) {
    let errors = signInErrors(error);
    res.status(200).json({errors});
  }
}

// Send a email with a 4 digits code
module.exports.sendConfirmationCode = async (req, res) => {
  const user = await User.findOne({_id: req.params.id});
  if (user) {
    try {
      sendConfirmationMail(subject = 'resend', user);
      res.status(200).json('Envoi du nouveau code!');
    } catch (error) {
      res.status(200).json(error);
    }
  } else {
    return res.status(200).json({ error: 'Utilisateur introuvable'});
  }
}

// Confirm the email of the user
module.exports.confirmEmail = async (req, res) => {
  const { tmp_code } = req.body;
  const user = await User.findOne({ _id: req.params.id});
  if (user) {
    try {
      const currentTime = new Date();
      if (currentTime > user.tmp_code_expiration) {
        res.status(200).json('Code de confirmation expiré');
      } else if (user.tmp_code != tmp_code) {
        res.status(200).json('Code de confirmation incorrect')
      } else {
        await User.updateOne(
          { _id: req.params.id },
          { emailConfirm: true, tmp_code: null, tmp_code_expiration: null },
          { new: true }
        );
        res.status(200).json('Email confirmé');
      }
    } catch (error) {
      res.status(200).json({ error });
    }
  } else {
    res.status(200).json({ errors: "Email inconnue" });
  }
  
}

// Send an email with a new password generated randomly and
// pass hasToUpdatePasdword to true
module.exports.sendResetPassword = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (user) {
    try {
      sendConfirmationMail(subject = 'password', user);
      res.status(201).json({ user: user._id });
    } catch (error) {
      res.status(200).json({ error });
    }
  } else {
    res.status(200).json({ errors: "Email inconnue" });
  }
};

// Reset the password and pass hasToUpdatePasdword to false
module.exports.resetPassword = async (req, res) => {
  const { password, confirmPassword } = req.body;
  const user = await User.findOne({ _id: req.params.id });
  if (user) {
    try {
        if (password == confirmPassword) {
          const newPassword = await bcrypt.hash(password, 10);
          await User.updateOne(
            { _id: req.params.id },
            { password: newPassword, hasToUpdatePassword: false },
            { new: true }
            );
            res.status(200).json('Réinitialisation du mot passe réussie');
        }
        else {
          res.status(200).json({errors: "Les deux mots de passe ne correspondent pas"})
        }
    } catch (error) {
      res.status(200).json({ error });
    }
  } else {
    res.status(200).json({ errors: "Email inconnue" });
  }
};

// Log out function
module.exports.logout = (req, res) => {
  res.redirect('/');
}
