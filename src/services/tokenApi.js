const URL = 'https://opentdb.com/api_token.php?command=request';

const getTokenApi = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  return data.token;
};

export default getTokenApi;
