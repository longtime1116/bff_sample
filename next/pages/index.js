import React, { Component } from 'react';
import Link from 'next/link';
import axios from 'axios';
import 'babel-polyfill';

export default class Index extends Component {
  static async getInitialProps({ req }) {
    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        'content-type': 'application/json',
        accept: 'application/json'
      }
    };
    const res = await axios.post('http://localhost:4000/graphql',
     {query: "query { top(id: 1) { user { id name } } }"},
      options)
    return { statusCode: res.status, statusText: res.statusText, data: JSON.stringify(res.data.data), isServer: !!req };
  }

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div>
          <Link href="/about">
            <a>About Page</a>
          </Link>
          <p>Hello Next.js</p>
        </div>
        API status code: {this.props.statusCode}<br />
        API status text: {this.props.statusText}<br />
        isServer: {String(this.props.isServer)}<br />
        data: {this.props.data}
      </div>
    );
  }
}
