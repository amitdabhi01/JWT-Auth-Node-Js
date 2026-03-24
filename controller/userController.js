import HttpsError from "../middleware/HttpError.js";

import User from "../model/User.js";

const addUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = await user.generateAuthToken();

    res.status(201).json({ success: true, user, token });
  } catch (error) {
    next(new HttpsError(error.message));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByCredentials(email, password);

    if (!user) {
      next(new HttpsError("Unable To Login"));
    }

    const token = await user.generateAuthToken();

    res.status(200).json({ success: true, user, token });
  } catch (error) {
    next(new HttpsError(error.message));
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find({});

    if (users.length === 0) {
      next(new HttpsError("User not found"));
    }

    res.status(200).json({ success: true, users });
  } catch (error) {
    next(new HttpsError(error.message, 500));
  }
};

const authLogin = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return next(new HttpsError("Unable to login"));
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(new HttpsError(error.message, 500));
  }
};

const logOut = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter((t) => t.token != req.token);

    req.user.save();

    res.status(200).json({ message: "user log out successfully" });
  } catch (error) {
    next(new HttpsError(error.message, 500));
  }
};

export default { addUser, login, getAllUser, authLogin, logOut };
