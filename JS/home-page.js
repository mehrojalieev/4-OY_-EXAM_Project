const swiperSlide = document.querySelector(".swiper-slide");
const SwiperWrapper = document.querySelector(".swiper-wrapper")


async function renderPageData() {
    try {
        const response = await axios.get("http://localhost:3000/api/posts")
        console.log(response.data.data);
        const cardsFragment = document.createDocumentFragment()
        response.data.data.forEach((items, id) => {
            const AEl = document.createElement("a");
            AEl.href = `../pages/single-page.html?id=${items._id}`
            AEl.className = "swiper-slide"
            AEl.innerHTML = `
                 <img src="${items.image}">
            <div class="card-content">
                 <h3>${items.title.slice(0, 25)}</h3>
                 <p>${items.description.slice(0, 100)}</p>
                 <div class="item-profil">
                    <img src="../Images/uuu.svg" alt="">
                        <div>
                             <p>aliyev Mehrojbek</p>
                             <p>Author</p></div>
                        </div>
            </div>
            </div>
            `
            cardsFragment.appendChild(AEl)
        }); 
        SwiperWrapper.appendChild(cardsFragment)
        
    } 
    catch (err) {
        console.log(err);
    }
}
renderPageData()


SwiperWrapper.addEventListener("dblclick",() => {
    location.pathname = "../pages/single-page.html"
});