/**
 * @providesModule Api
 */
'use strict';

const API_ORIGIN = 'https://exponent-contest.herokuapp.com';

async function getVotesAsync(email) {
  let url = `${API_ORIGIN}/votes`;

  if (email) {
    url = `${url}?email=${encodeURIComponent(email)}`;
  }

  let response = await fetch(url);
  return await response.json();
}

async function submitVoteAsync(email, project) {
  let url = `${API_ORIGIN}/votes`;

  let response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      project,
    })
  });

  return await response.json();
}


export default {
  getVotesAsync,
  submitVoteAsync,
}
