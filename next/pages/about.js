import React, { Component } from 'react';
import Link from 'next/link'

export default function About() {
  return (
    <div>
      <p>This is the about page</p>
      <Link href="/index">
        <a>Top</a>
      </Link>
    </div>
  )
}
