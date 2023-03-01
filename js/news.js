
let trendingData = [];
// load news data 
const fetchNewsData = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const res = await fetch(url);
  const data = await res.json();
  displayNewsData(data.data.news_category);
}

// display news data 
const displayNewsData = news => {
  const newsCategory = document.getElementById('news__category');
  news.forEach(singleNews => {
    newsCategory.innerHTML += ` 
        <p onclick="fetchCategoryData('${singleNews.category_id}','${singleNews.category_name}')" >${singleNews.category_name}</p>
        `
  })
}
fetchNewsData()

// fetch category 
const fetchCategoryData = async (id, name) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`
  const res = await fetch(url);
  const data = await res.json();
  trendingData = data.data;
  displayCategoryData(data.data, name);
}

// display category 
const displayCategoryData = (categoryData, name) => {
  document.getElementById('category__items').innerHTML = categoryData.length;
  document.getElementById('category__name').innerHTML = name;
  const cardContainer = document.getElementById("card__container")
  cardContainer.innerHTML = '';
  categoryData.forEach(singleData => {

    const { image_url, title, details, author, total_view, _id, others_info } = singleData
    const card = document.createElement('div');
    card.classList.add('card', 'card-side', 'bg-base-100', 'shadow-xl', 'my-8')
    card.innerHTML = `
        <figure class="w-full"><img class="w-96 " src="${image_url}"/></figure>
        <div class="card-body">
        <div class="">
         <h2 class="text-2xl font-medium">${title}.. <span class="badge badge-warning py-3 px-2 gap-2 ">
          ${others_info.is_trending ? "Trending" : 'Not Trending'
      }
        </span ></h2 >
        </div > 
       
         
          <p>${details.slice(0, 200)}</p>
          <div class="flex justify-between items-center">
            <div class="flex items-center">
               <div>
                   <img class="w-14 rounded-full" src="${author.img}"/>
               </div>
               <div class="ml-2">
                    <h6>${author.name ? author.name : 'unknown'}</h6>
                    <p>${author.published_date ? author.published_date : "Date not available"}</p>
               </div>
            </div>

            <div class="flex items-center">
            <i class="fa-solid fa-eye text-blue-600 mr-2"></i>
            <p>${total_view ? total_view : 'viewers not available'}</p>
            </div>

            <div>
        <label for="my-modal-3" class="btn"><i onclick="loadFullCardDetails('${_id}')" class="fa-solid fa-arrow-right btn text-blue-600"></i></label>
            </div>
          </div>
        </div >


        
        <input type="checkbox" id="my-modal-3" class="modal-toggle" />
        <div class="modal">
          <div class="modal-box relative">
            <label
              for="my-modal-3"
              class="btn btn-sm btn-circle absolute right-2 top-2"
              >✕</label
            >
            <img src="${image_url}"/>
            <h3 class="text-lg font-bold">
             ${title}
            </h3>
            <p class="py-4">
           ${details}
            </p>
          </div>
        </div>
`
    cardContainer.appendChild(card);
  })
}

//load full card details
/*  const loadFullCardDetails = async (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`
const res = await fetch(url);
const data = await res.json();
displayFullCardDetails(data)
}  */

// display full card details 
/* const displayFullCardDetails = details => {
} */
const count = [];

const displayTrendingData = () => {
  const trendingName = document.getElementById('trending__btn').innerText;
  document.getElementById('category__name').innerHTML = trendingName;

  console.log(count);
  console.log(count.length);

  const cardContainer = document.getElementById("card__container")
  cardContainer.innerHTML = ''
  trendingData.forEach(trending => {
    if (trending.others_info.is_trending === true) {
      count.push(trending)
      const card = document.createElement('div');
      card.classList.add('card', 'card-side', 'bg-base-100', 'shadow-xl', 'my-8')
      card.innerHTML = `
          <figure class="w-full"><img class="w-96 " src="${trending.image_url}"/></figure>
          <div class="card-body">
       
          <div class="">
          <h2 class="text-2xl font-medium">${trending.title}.. <span class="badge badge-warning py-3 px-2 gap-2 ">
           ${trending.others_info.is_trending ? "Trending" : 'Not Trending'
        }
         </span ></h2 >
         </div > 
            <p>${trending.details.slice(0, 200)}</p>
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                 <div>
                     <img class="w-14 rounded-full" src="${trending.author.img}"/>
                 </div>
                 <div class="ml-2">
                      <h6>${trending.author.name ? trending.author.name : 'unknown'}</h6>
                      <p>${trending.author.published_date ? trending.author.published_date : "Date not available"}</p>
                 </div>
              </div>
  
              <div class="flex items-center">
              <i class="fa-solid fa-eye text-blue-600 mr-2"></i>
              <p>${trending.total_view ? trending.total_view : 'viewers not available'}</p>
              </div>
              
              <div>
              <label for="my-modal-3" class="btn"><i onclick="loadFullCardDetails('${trending._id}')" class="fa-solid fa-arrow-right btn text-blue-600"></i></label>
              </div>
            </div>
          </div>
  
  
          <!--modal -->
          <input type="checkbox" id="my-modal-3" class="modal-toggle" />
          <div class="modal">
            <div class="modal-box relative">
              <label
                for="my-modal-3"
                class="btn btn-sm btn-circle absolute right-2 top-2"
                >✕</label
              >
              <img src="${trending.image_url}"/>
              <h3 class="text-lg font-bold">
               ${trending.title}
              </h3>
              <p class="py-4">
             ${trending.details}
              </p>
            </div>
          </div>
          `
      cardContainer.appendChild(card);
    }
  })
}
