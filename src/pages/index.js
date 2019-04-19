import React from "react"
import {Layout} from './Layout'
import assets from '../../assets'
const hartToken = assets.playerOneIcons.normalToken;

export default (props) => {
  return(
    <Layout>
      <div>Hello world!</div>
      <img src={hartToken} alt="playerone"/>

    </Layout>
  )
}

