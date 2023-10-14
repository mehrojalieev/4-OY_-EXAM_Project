
const aboutCardImg = document.querySelector("#about-card-img")
const aboutCardText = document.querySelector("#about-card-text")
const AboutWrapper = document.querySelector(".about-wrapper")
const Id = new URLSearchParams(location.search).get("id")
console.log(Id)
axios.get(`http://localhost:3000/api/posts/${Id}`)
    .then(response => singlePageData(response.data))

async function singlePageData(response) {
    console.log(response);
    AboutWrapper.innerHTML = `
            <div class="about-category">
            <h3>${response.title}</h3>
            <p>#technology</p>
            </div>
            <img src=${response.image} alt="About-Img" id="about-card-img">
            <p id="about-card-text">${response.description}</p>
    `
}
singlePageData()