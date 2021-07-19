import {newsAPI} from "../requestAPI/requestAPI";
import {Dispatch} from "redux";

type getNewsACType = {
    type: 'NEWS/GET-NEWS'
    article: Array<articlesType>
}

type handlerLoadingNewsACType = {
    type: 'NEWS/LOADING-STATUS'
    loadingStatus: boolean
}


type actionType = getNewsACType | handlerLoadingNewsACType

export type articlesType = {
    author: string
    content: string
    description: string
    publishedAt: string
    source: {
        id: string
        name: string
    }
    title: string
    url: string
    urlToImage: string
}


export type newsType = {
    title: string
    description: string
    urlToImage: string
    url: string
    id: number
}

const news1:newsType = {
    title: 'Dodge Challenges: Can the automaker bring muscle into the electric future?',
    description: 'The term muscle car has always been a euphemism for concessions. Want the most power for the money? Forget about a sports car from Porsche or Lotus. Buy a muscle car and just take corners a bit slower. Today Dodge announced it’s making an electric muscle car …',
    urlToImage: 'https://techcrunch.com/wp-content/uploads/2021/07/Screen-Shot-2021-07-08-at-12.50.39-PM.png?w=764',
    url: "https://techcrunch.com/2021/07/08/dodge-challenges-can-the-automaker-bring-muscle-into-the-future/",
    id: 1
}
const news2:newsType = {
    title: "Auto giant Stellantis to invest €30B in electrification through 2025",
    description: "Stellantis, the global automaker born out of a merger between Fiat Chrysler Automobiles and French automaker Groupe PSA, will invest €30 billion ($35.5 billion) in electric vehicles and new software over the next four years as part of a major push to transiti…",
    urlToImage: "https://techcrunch.com/wp-content/uploads/2021/07/Screen-Shot-2021-07-08-at-11.13.00.png?w=753",
    url: "https://techcrunch.com/2021/07/08/auto-giant-stellantis-to-invest-e30b-in-electrification-through-2025/",
    id: 2
}
const news3:newsType = {
    title: "Achieving digital transformation through RPA and process mining",
    description: "For your transformation journey to be successful, you need to develop a deep understanding of your goals, people and the process.",
    urlToImage: "https://techcrunch.com/wp-content/uploads/2021/07/GettyImages-1282119894.jpg?w=640",
    url: "https://techcrunch.com/2021/07/08/achieving-digital-transformation-through-rpa-and-process-mining/",
    id: 3
}
const news4:newsType = {
    title: "The Accellion data breach continues to get messier",
    description: "The Accellion attack claims a new victim, Morgan Stanley, six months after the security breach was discovered.",
    urlToImage: "https://techcrunch.com/wp-content/uploads/2021/07/GettyImages-1257690910.jpg?w=644",
    url: "https://techcrunch.com/2021/07/08/the-accellion-data-breach-continues-to-get-messier/",
    id: 4
}
const news5:newsType = {
    title: "PowerZ raises $8.3 million for its video game focused on education",
    description: "French startup PowerZ has raised another $8.3 million (€7 million at today’s exchange rate) including $1.2 million (€1 million) in debt — the rest is a traditional equity round. The company is both an edtech startup and a video game studio with an ambitious g…",
    urlToImage: "https://techcrunch.com/wp-content/uploads/2021/07/PowerZ.jpg?w=744",
    url: "https://techcrunch.com/2021/07/08/powerz-raises-8-3-million-for-its-video-game-focused-on-education/",
    id: 5
}
const news6:newsType = {
    title: "Robotic funding doesn’t grow on trees",
    description: "As I mentioned at the close of last week’s roundup, the biggest issue in writing this roundup on Wednesday is that sometimes news breaks on Thursday morning. Again, I’m asking the robotics community to try not make any big headlines on Thursdays. That would r…",
    urlToImage: "https://techcrunch.com/wp-content/uploads/2021/07/guardian-xt-social.jpg?w=710",
    url: "https://techcrunch.com/2021/07/08/robotics-roundup-19/",
    id: 6
}
const news7:newsType = {
    title: "Circle is a good example of why SPACs can be useful",
    description: "Circle is the sort of business that is correct for a SPAC-led debut. It could not go public in a traditional manner in its current state of maturity.",
    urlToImage: "https://techcrunch.com/wp-content/uploads/2020/05/NSussman_Techcrunch_Exchange_v3-GRY2.jpg?w=533",
    url: "https://techcrunch.com/2021/07/08/circle-is-a-good-example-of-why-spacs-can-be-useful/",
    id: 7
}
const news8:newsType = {
    title: "Rootly nabs $3.2M seed to build SRE incident management solution inside Slack",
    description: "As companies look for ways to respond to incidents in their complex micro services-driven software stacks, SREs or site reliability engineers are left to deal with the issues involved in making everything work and keeping the application up and running. Rootl…",
    urlToImage: "https://techcrunch.com/wp-content/uploads/2021/07/GettyImages-1322316337.jpg?w=600",
    url: "https://techcrunch.com/2021/07/08/rootly-nabs-3-2m-seed-to-build-sre-incident-management-solution-inside-slack/",
    id: 8
}
const news9:newsType = {
    title: "Peter Boyce II has left General Catalyst to start his own $40M fund",
    description: "Peter Boyce II has left General Catalyst to start his own firm, a little over a year after the venture capital firm promoted him to partner. His new firm is called Stellation Capital, and filings indicate that he is looking to raise up to $40 million for the …",
    urlToImage: "https://techcrunch.com/wp-content/uploads/2019/08/hands-signing-check.png?w=753",
    url: "https://techcrunch.com/2021/07/08/peter-boyce-stellation-capital/",
    id: 9
}
const news10:newsType = {
    title: "Instacart hires Facebook executive as new CEO ahead of expected IPO",
    description: "Instacart has appointed Facebook executive Fidji Simo as its new CEO, just seven months after she joined the grocery delivery company’s board of directors. Simo, formerly the vice president and head of the Facebook app, will replace Instacart founder and curr…",
    urlToImage: "https://techcrunch.com/wp-content/uploads/2021/07/Fidji-Simo-For-Newswire.jpg?w=711",
    url: "https://techcrunch.com/2021/07/08/instacart-hires-facebook-executive-as-new-ceo-ahead-of-expected-ipo/",
    id: 10
}

const arrNews = [news1, news2, news3, news4, news5, news6, news7, news8, news9, news10]

export type newsPageType = {
    articles: Array<articlesType>
    news: Array<newsType>
    loadingStatus: boolean
}

const initialState: newsPageType = {
    articles: [],
    news: arrNews,
    loadingStatus: false
}

export const newsReducer = (state = initialState, action: actionType) => {
    switch (action.type) {
        case "NEWS/GET-NEWS": {
            console.log(action.article)
            return {...state, articles: [...action.article]}
        }
        case "NEWS/LOADING-STATUS": {
            return {...state, loadingStatus: action.loadingStatus}
        }
        default :
            return state
    }
}


const getNewsAC = (article: Array<articlesType>): getNewsACType => {
    return {type: 'NEWS/GET-NEWS', article}
}
const handlerLoadingNewsAC = (loadingStatus: boolean): handlerLoadingNewsACType => {
    return {type: 'NEWS/LOADING-STATUS', loadingStatus}
}


export const getNewsThunk = () => {

    return async (Dispatch: Dispatch) => {
        Dispatch(handlerLoadingNewsAC(true))
        const promise = await newsAPI.getNews()
        try {
            Dispatch(getNewsAC(promise.data.articles))
            Dispatch(handlerLoadingNewsAC(false))
        } catch {

        }
    }
}








