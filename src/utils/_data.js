import axios from 'axios'
import utils from './index'
const user =  localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
const config = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}

// Auth
export async function login(email, password) {
  const url = utils.getURL(`users?email=${email}&password=${password}`);
  const res = await axios.get(url, config)
  return res.data;
}

export async function logOut() {
  localStorage.removeItem('user');
  window.location.href = '/'
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
  const url = utils.getURL(`testDetails?testId=${testId}&companyId=${user.companyId}`);
  const res = await axios.get(url, config);
  return res.data;
}

// Test Api
/*export async function deleteTest(testId) {
  const url = utils.getURL(`tests/${testId}`);
  const res = await axios.delete(url, config);
  return res.data;
}*/

export async function getTests() {
  const url = utils.getURL(`tests?companyId=${user.companyId}`);
  const res = await axios.get(url, config);
  return res.data;
}

export async function getTestById(testId) {
  const url = utils.getURL(`tests/${testId}?companyId=${user.companyId}`);
  const res = await axios.get(url, config);
  return res.data;
}

export async function addTest(data) {
  const url = utils.getURL('tests');
  const res = await axios.post(url, data, config);
  return res.data;
}

export async function deleteTest(testId) {
  const url = utils.getURL(`tests/${testId}`);
  const res = await axios.delete(url, config);
  return res.data;
}

// Question

export async function addNewTestDetails(data) {
  const url = utils.getURL('testDetails');
  const res = await axios.post(url, data, config);
  return res.data;
}

export async function updateTestDetails(data) {
  const url = utils.getURL(`testDetails/${data.id}`);
  const res = await axios.put(url, data, config);
  return res.data;
}

// invite candidate


export async function getAllInvitedCandidates() {
  const url = utils.getURL(`invitedCandidates?companyId=${user.companyId}`);
  const res = await axios.get(url, config);
  return res.data;
}

export async function deleteInvitedCandidateById(id) {
  const url = utils.getURL(`invitedCandidates/${id}`);
  const res = await axios.delete(url, config);
  return res.data;
}

export async function inviteCandidateForTest(data) {
  const url = utils.getURL('invitedCandidates');
  const res = await axios.post(url, data, config);
  return res.data;
}

export async function getCandidateInvitation(examId) {
  const url = utils.getURL(`invitedCandidates?examId=${examId}&companyId=${user.companyId}`);
  const res = await axios.get(url, config);
  return res.data;
}

export async function getInvitedCandidates(testId) {
  const url = utils.getURL(`invitedCandidates?testId=${testId}&companyId=${user.companyId}`);
  const res = await axios.get(url, config);
  return res.data;
}

// candidate answer

export async function addCandidateAnswer(candidate) {
  const url = utils.getURL(`candidateAnswers`);
  const res = await axios.post(url, candidate, config);
  return res.data;
}

export async function updateCandidateAnswer(candidate) {
  const url = utils.getURL(`candidateAnswers/${candidate.id}`);
  const res = await axios.put(url, candidate, config);
  return res.data;
}

export async function getCandidateAnswer(examId) {
  const url = utils.getURL(`candidateAnswers?examId=${examId}&companyId=${user.companyId}`);
  const res = await axios.get(url, config);
  return res.data;
}

export async function getAllCandidateAnswer() {
  const url = utils.getURL(`candidateAnswers?companyId=${user.companyId}`);
  const res = await axios.get(url, config);
  return res.data;
}