import React from 'react'
import NextHead from 'next/head'
import { string, array } from 'prop-types'
const DEFAULT_TITLE = '视觉觅'
const DEFAULT_DESCRIPTION = '视觉觅-描述信息'
const DEFAULT_KEYWORDS = '视觉觅-网站关键词信息'

const Head = props => (
  <NextHead>
    <meta charSet='UTF-8'/>
    <title>{props.title || DEFAULT_TITLE}</title>
    <meta name='description' content={props.description || DEFAULT_DESCRIPTION}/>
    <meta name='keywords' content={props.keywords || DEFAULT_KEYWORDS}/>
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <meta httpEquiv='X-UA-Compatible' content='IE=edge,chrome=1'/>
    {
      props.meta && props.meta.length && props.meta.map((m, i) => <meta key={i} name={m.name} content={m.name} />)
    }
    <link rel='icon' href='/static/favicon.ico' />
    <link rel='stylesheet' href={`${ossBaseURL}/css/iconfont.css?dc=${new Date()}`}/>
    {props.children}
  </NextHead>
)

Head.propTypes = {
  title: string,
  description: string,
  keywords: string,
  meta: array
}

export default Head
