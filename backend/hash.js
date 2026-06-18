const bcrypt = require("bcrypt");

async function generateHash() {
  const hash = await bcrypt.hash("vdaswas@2021", 10);

  console.log(hash);
}

generateHash();