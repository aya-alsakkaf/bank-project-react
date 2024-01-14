import instance from ".";
import { storeToken, deleteToken } from "./storage/token";

const login = async (userInfo) => {
  const { data } = await instance.post(
    "/mini-project/api/auth/login",
    userInfo
  );

  const token = data.token;
  if (token) {
    storeToken(token);
  }
  return data;
};

const register = async (userInfo) => {
  const formData = new FormData();
  for (const key in userInfo) {
    formData.append(key, userInfo[key]);
  }
  const { data } = await instance.post(
    "/mini-project/api/auth/register",
    formData
  );

  const token = data.token;
  if (token) {
    storeToken(token);
  }
  return data;
};

const logout = () => {
  deleteToken();
};

const profile = async () => {
  const { data } = await instance.get("/mini-project/api/auth/me");
  return data;
};

const getTransactions = async () => {
  const { data } = await instance.get("/mini-project/api/transactions/my");
  return data;
};

const deposit = async (amount) => {
  const { data } = await instance.put(
    "/mini-project/api/transactions/deposit",
    {
      amount,
    }
  );
  return data;
};

const withdraw = async (amount) => {
  const { data } = await instance.put(
    "/mini-project/api/transactions/withdraw",
    { amount }
  );
  return data;
};

const getAllUsers = async () => {
  const { data } = await instance.get("/mini-project/api/auth/users");
  return data;
};

const transferMoney = async (userInfo) => {
  const { data } = await instance.put(
    `/mini-project/api/transactions/transfer/${userInfo.username}`,
    userInfo
  );
  return data;
};

const profilePicture = async (userInfo) => {
  const formData = new FormData();
  for (const key in userInfo) {
    formData.append(key, userInfo[key]);
  }
  const { data } = await instance.put(
    "/mini-project/api/auth/profile",
    formData
  );
  return data;
};
export {
  login,
  register,
  logout,
  profile,
  getTransactions,
  deposit,
  withdraw,
  getAllUsers,
  transferMoney,
  profilePicture,
};
