import {connect} from "react-redux";
import {News} from "./News";
import {stateType} from "../../redux/store";
import {getNewsThunk} from "../../redux/news-reducer";


const mapStateToProps = (state:stateType)=>{
    return {news: state.news.news, isLoading: state.news.loadingStatus}
}


export const NewsContainer = connect(mapStateToProps,{getNewsThunk})(News)