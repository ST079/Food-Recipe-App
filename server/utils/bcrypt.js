require("dotenv").config();
const bcrypt = require("bcrypt");

const hashedPassword = async (password)=>{
    return await bcrypt.hashSync(password,Number(process.env.SALT_ROUND));
};

const comparePassword = async(password, hashedPassword)=>{
    return await bcrypt.compareSync(password, hashedPassword);
};

module.exports = {
    hashedPassword,
    comparePassword
};