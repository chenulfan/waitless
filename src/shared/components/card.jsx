import React from 'react'
import Tag from './tag'

const Card = ({img, imgAlt, title, content, tags }) => {
  return (
<div className="max-w-sm rounded overflow-hidden shadow-lg">
  <img className="w-full" src={img} alt={imgAlt}/>
  
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{title}</div>
    <p className="text-gray-700 text-base">{content}</p>
  </div>

  <div className="px-6 pt-4 pb-2">
    {tags.map( (tagTitle,i) => <Tag key={i} title={tagTitle} />)}
  </div>
</div>
  )
}

export default Card