import axios from 'axios'
import utils from './index'

const config = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}

// Common Api
export async function getUsersList() {
  const url = utils.getURL(`users`);
  const res = await axios.get(url, config)
  return res.data;
}

export async function addUser(data) {
  const url = utils.getURL('users');
  const res = await axios.post(url, data, config)
  return res.data;
}

export async function deleteUser(userId) {
  const url = utils.getURL(`users/${userId}`);
  const res = await axios.delete(url, config)
  return res.data;
}


export async function getOverviewText() {
  const url = utils.getURL(`overview`);
  const res = await axios.get(url, config)
  return res.data;
}