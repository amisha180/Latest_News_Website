import React, {useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



const News = (props)=> {

const [articles,setArticles] = useState([])
const [loading,setLoading] = useState(false)
const [page,setPage] = useState(1)
const [totalResults,setTotalResults] = useState(0)
// document.title = `News India - ${props.category}`

  
  const updateNews = async()=>{
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=da08f380aff746a0a655a0fd75d16b6f&page=${page}&pageSize=${props.pageSize}`;
   setLoading(true)
    let data = await fetch(url);
    
    let paresedData = await data.json();
    setArticles( paresedData.articles);
    setTotalResults(paresedData.totalResults)
    setLoading(false)
    
  }
  useEffect(()=>{
   updateNews();
  },[])

  // async componentDidMount(){
  //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=da08f380aff746a0a655a0fd75d16b6f&pageSize=${props.pageSize}`;
  //  setState({loading:true});
  //   let data = await fetch(url);
    
  //   let paresedData = await data.json();
  //   setState({articles: paresedData.articles,totalResults: paresedData.totalResults,loading:false})
  // }

  const handlePrevClick =async ()=>{
console.log('prev');
// let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=da08f380aff746a0a655a0fd75d16b6f&page=${this.state.page-1}&pageSize=${props.pageSize}`;
// this.setState({loading:true});
// let data = await fetch(url);
   
//     let paresedData = await data.json();
//     this.setState({page : this.state.page - 1,
//       articles: paresedData.articles,
//     loading:false})
setPage(page-1)
updateNews();
  }

 const handleNextClick=  async ()=> {
  console.log('next');
  // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=da08f380aff746a0a655a0fd75d16b6f&page=${this.state.page+1}&pageSize=${props.pageSize}`;
  // this.setState({loading:true}); 
  // let data = await fetch(url);
   
  //   let paresedData = await data.json();
  //   this.setState({page : this.state.page + 1,
  //     articles: paresedData.articles,
  //     loading:false})
  setPage(page+1)
  updateNews();

 }

const fetchMoreData = async () => {
  setPage(page+1)
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=da08f380aff746a0a655a0fd75d16b6f&page=${page}&pageSize=${props.pageSize}`;
   setLoading(true)
    let data = await fetch(url);
    
    let paresedData = await data.json();
    // setState({
    //   articles: state.,
    //   totalResults: ,
    //   loading:true
    // })
    setArticles(articles.concat(paresedData.articles))
    setTotalResults(paresedData.totalResults)
    setLoading(true)
  
};

 
  
    return (
      <>
     
        <h3 className="text-center"><i>Top {props.category} Headlines  </i></h3>
        

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length != totalResults}
          loader={<Spinner/>} >
        {/* {this.state.loading && <Spinner/>} */}

        <div className="container">

       
        <div className="row">
        {articles.map((element)=>{
          return <div className="col-md-3" key={element.url}>
          <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""}
           imageUrl={element.urlToImage}
          newsUrl={element.url} source={element.source.name} author={element.author?element.author:"unknown"} date={element.publishedAt}/>
          </div>
       
        })}
          
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
<button disabled={this.state.page<=1} type="button" class="btn btn-info"  onClick={this.handlePrevClick}> &larr; Previous</button>
<button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" class="btn btn-info" onClick={this.handleNextClick}>Next &rarr;</button>
</div> */}
        </>
    )
  }

News.defaultProps = {
  pageSize : 8,
  country: 'in',
  category:'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize : PropTypes.number,
  category: PropTypes.string
}
export default News
//da08f380aff746a0a655a0fd75d16b6f