
import './newsStyle.css'
import {articlesType} from "../../redux/news-reducer";
import {Component} from "react";
import Preloader from "../Preloader/Preloader";


type newsType = {
    news: Array<articlesType>
    getNewsThunk: () => void
    isLoading: boolean
}


export class News extends Component<newsType> {

    componentDidMount() {
        this.props.getNewsThunk()
    }


    render() {

        return this.props.isLoading? <Preloader/> :
            <div className={'news_page'}>{this.props.news.map((news, i)=>{
            return <a href={news.url} target={'_blank'} key={news.source.id + i} className={'wrapper_link_news'}>
                <div className={'title_news'}>
                <h3>{news.title}</h3>
                </div>
                <div className={'wrapper_content'}>
                <span>{news.description}</span>
                </div>
                <div className={'wrapper_photo'}>
                <img alt={'photo'} src={news.urlToImage}/>
                </div>
            </a>


        })}</div>
    }
}