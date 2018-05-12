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
  const url = utils.getURL(`testDetails?testId=${testId}`);
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
  const url = utils.getURL(`tests`);
  const res = await axios.get(url, config);
  return res.data;
}

export async function getTestById(testId) {
  const url = utils.getURL(`tests/${testId}`);
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

// candidates Api

export async function getCandidates() {
  const url = utils.getURL(`candidates`);
  const res = await axios.get(url, config);
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

export async function inviteCandidateForTest(data) {
  const url = utils.getURL('invitedCandidates');
  const res = await axios.post(url, data, config);
  return res.data;
}

export async function getCandidateInvitation(examId) {
  const url = utils.getURL(`invitedCandidates?examId=${examId}`);
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
  const url = utils.getURL(`candidateAnswers?${examId}`);
  const res = await axios.get(url, config);
  return res.data;
}