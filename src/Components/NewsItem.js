import React from 'react'

const NewsItem =(props)=> {
  
    return (
      <div className="my-3">
       <div className="card" >
       
  <img src={props.imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{props.title}</h5>
    <p className="card-text">{props.description}</p>
    <p className="card-text"><small className="text-muted">{props.source} : By {props.author} on {new Date(props.date).toGMTString()}</small></p>
    <a rel="noreferrer" href={props.newsUrl}  target = "_blank"className="btn btn-link">Read More</a>
  
  </div>
</div>

      </div>
    )
  
}

export default NewsItem
