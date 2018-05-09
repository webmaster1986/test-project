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

// Test Details Api
export async function getTestDetailsById(testId) {
  const url = utils.getURL(`testDetails/${testId}`);
  const res = await axios.get(url, config);
  return res.data;
}


// Test Api
export async function deleteTest(testId) {
  const url = utils.getURL(`tests/${testId}`);
  const res = await axios.delete(url, config);
  return res.data;
}

export async function getTests() {
  const url = utils.getURL(`tests`);
  const res = await axios.get(url, config);
  return res.data;
}

// candidates Api

export async function getCandidates() {
  const url = utils.getURL(`candidates`);
  const res = await axios.get(url, config);
  return res.data;
}