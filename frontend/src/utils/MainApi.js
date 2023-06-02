class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }
  _processResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  _request(url, token, method) {
    return fetch(`${this._baseUrl}${url}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then(this._processResponse);
  }

  getUserInfo(token) {
  console.log('mainApi.js getUserInfo');
    return this._request('/users/me', token, 'GET');
  }

  getInitialCards(token) {
  console.log('mainApi.js getInitialCards');
    return this._request('/articles', token, 'GET');
  }

  deleteCard(id, token) {
  console.log('mainApi.js deleteCard');
    return this._request(`/articles/${id}`, token, 'DELETE');
  }

  createCard({ keyword, title, text, date, source, link, image }, token) {
  console.log('mainApi.js createCard');
    return fetch(`${this._baseUrl}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        keyword: keyword,
        title: title,
        text: text,
        date: date,
        source: source,
        link: link,
        image: image,
      }),
    }).then(this._processResponse);
  }
}

export const api = new MainApi({
  baseUrl: 'https://api.yonatanreed.mooo.com',
});

// http://localhost:3000
// https://api.yonatanreed.mooo.com
