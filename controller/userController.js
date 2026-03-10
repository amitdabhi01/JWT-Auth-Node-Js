const addUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = 

  } catch (error) {
    next(error);
  }
};

export default addUser;
