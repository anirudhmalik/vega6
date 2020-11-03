'use strict'
import axios from 'axios';
class ApiService {
  constructor(props) {
    this._httpObj = axios;
    this._url = '';
    this._body = {};
    this._methodType = '';    
  }
  /**Create URL, Method, Body To Send Request */
  async _doHttpRequest(url, method = 'GET', body = {}) {
    this._methodType = method.toUpperCase();
    this._url = url;
    if (body) {
      this._body = body;
    }
    let response = await this._internetGateway();
    let responseCode = response.data.statusCode;
    if (response) {
      if (responseCode === 401) {
          console.log("oops ! must logout")
      }
      return response;
    }
  }
   _config = {
    headers: { Authorization: `Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2MDAyNTUxOTIsImp0aSI6IkNmc0lJRmYxWm43TUNJdUJrS2pKVVEiLCJpc3MiOiJodHRwczpcL1wvcmVzb3VyY2VzLnZlZ2E2LmluZm9cLyIsIm5iZiI6MTYwMDI1NTIwMiwiZGF0YSI6eyJ1c2VyX2lkIjoiMSIsImFwcF91cmwiOiJOVWxsIn19.Y4UpB0--8kQWHFHrONhyJy_jGl3VmDZ93Y-qn7yD6tLZRmzktXeIf4YTdraNIMrYTucuVYLB6VrWVhN4TrZpaA"}` }
   };

  /**Channel For All Type Of Request And Return Response From Server */
  _internetGateway() {
    switch (this._methodType) {
      case 'GET':
        return this._httpObj.get(this._url);
      case 'POST':
        return this._httpObj.post(this._url, this._body,this._config);
      case 'DELETE':
        return this._httpObj.delete(this._url);
      case 'PUT':
        return this._httpObj.put(this._url, this._body);
      case 'PATCH':
        return this._httpObj.patch(this._url, this._body);
      default:
        return 'Invalid Method Request : 400 Method (' + this._methodType + ') not allowed ';
    }
  }
}

export default ApiService;