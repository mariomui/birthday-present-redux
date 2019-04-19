import React from "react"
import Layout from './Layout'
import assets from '../../assets'
require('../../global.css')

export default () => {
  const hartToken = assets.playerOneIcons.normalToken;
  return(
    <Layout>
      <div>Hello world!</div>
      <img className='.test' src={hartToken} alt="playerone"/>
    </Layout>
  )
}

