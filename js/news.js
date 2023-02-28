const fetchNewsData = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsData(data.data.news_category);
}

const displayNewsData = news => {
    // console.log(news);
    const newsCategory = document.getElementById('news__category');
    news.forEach(singleNews => {
        newsCategory.innerHTML += ` 
        <p onclick="fetchCategoryData('${singleNews.category_id}','${singleNews.category_name}')" >${singleNews.category_name}</p>
        `
    })
}
fetchNewsData()


const fetchCategoryData = async (id, name) => {
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    // console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    displayCategoryData(data.data, name);
}

const displayCategoryData = (categoryData, name) => {
    // console.log(categoryData, name);
    document.getElementById('category__items').innerHTML = categoryData.length;
    document.getElementById('category__name').innerHTML = name;
}