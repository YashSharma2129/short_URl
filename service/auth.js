const sessionIdtoUserMap = new Map();

async function setUser(id, user) {
  sessionIdtoUserMap.set(id, user);
}

async function getUser(id) {
  return sessionIdtoUserMap.get(id);
}

module.exports = {
  setUser,
  getUser,
};
