const express = require('express');
const newsRouter = express.Router();
const axios = require('axios');

newsRouter.get('', async(req, res) => {
    try {
        const newsAPI = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=${process.env.NEWS_API}`);
        res.render('news', {articles: newsAPI.data.articles})
        // console.log(newsAPI.data.articles)
    } catch (error) {
        console.log(error.response.data.message);   
    }
});

module.exports = newsRouter;