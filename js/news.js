const fetchNewsData = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsData(data.data.news_category);
}

const displayNewsData = news => {
    const newsCategory = document.getElementById('news__category');
    news.forEach(singleNews => {
        console.log(singleNews.category_name);
        newsCategory.innerHTML += ` 
        <a href=''>${singleNews.category_name}</a>
        `
    })
}
fetchNewsData()
