import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { push, replace, goBack, goForward, prefetch } from 'connected-next-router'
import { useDispatch } from 'react-redux'

/*
 Different kind of navigation are available here :
 https://raw.githubusercontent.com/danielr18/connected-next-router/master/examples/basic/components/navigation.js
*/
const Navigation = props => {
  const dispatch = useDispatch()
  return (
    <div>
      <h2>Navigation</h2>
      <ul>
        <li>
          <a href="recherche-apprentissage" onClick={e => {e.preventDefault();Router.push('/recherche-apprentissage');}}>
            /recherche-apprentissage
          </a>
        </li>
        <li>
          <a href="recherche-apprentissage-formation" onClick={e => {e.preventDefault();Router.push('/recherche-apprentissage-formation');}}>
            /recherche-apprentissage-formation
          </a>
        </li>
        <li>
          <Link href={{ pathname: '/styleguide' }}>
            <a>/styleguide</a>
          </Link>
        </li>
      </ul>
    </div>
                          )
}

export default Navigation
