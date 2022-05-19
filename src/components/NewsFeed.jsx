import React, { useEffect, useState } from 'react'
import axios from 'axios'

const NewsFeed = () => {

    const [articles, setArticles] = useState(null)

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://crypto-news-live3.p.rapidapi.com/news?limit=10',
            headers: {
                'X-RapidAPI-Host': 'crypto-news-live3.p.rapidapi.com',
                'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY
            }
        };

        axios.request(options).then(function (response) {
            setArticles(response.data)
        }).catch(function (error) {
            console.error(error);
        });

    }, [])

    const first7Articles = articles?.slice(0, 7)

    return (
        <div className='news-feed'>
            <h2>News Feed</h2>
            <div className='news-container'>
                {first7Articles?.map((article, index) => (
                    <div className='news-item' key={index}>
                        <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <p>{article.title}</p>
                        </a>
                    </div>
                )
                )}
            </div>
        </div>
    )
}

export default NewsFeed