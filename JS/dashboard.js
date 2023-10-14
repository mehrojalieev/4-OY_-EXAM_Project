const Dashboard = document.querySelector(".dashboard")
const CreatePost = document.querySelector(".create-post")
const createPostWrapper = document.querySelector(".create-post-wrapper");
const createPostText = document.querySelector(".create-post-text")
const ManagePost = document.querySelector(".manage-post");
const managePostWrapper = document.querySelector(".manage-post-wrapper");
const managePostContainer = document.querySelector(".manage-posts-container");
const managePostText = document.querySelector(".manage-post-text");

const createPostsForm = document.querySelector("#create-post-form")
const createPostTitle = document.querySelector("#post-title")
const createPostImage = document.querySelector("#post-image")
const createPostDescription = document.querySelector("#post-description");
const categoryTechnology = document.querySelector("#technology")
const createSelect = document.querySelector("#create-select")
// SignOut Modal
const signoutModalWrapper = document.querySelector(".modal-wrapper")
const asideSignOut = document.querySelector(".aside-signout")
const asideSignOutBtn = document.querySelector("#aside-signout-btn")
const SignoutModal = document.querySelector(".signout-modal")
const closeSignOutModal = document.querySelector(".close-signout")

const DeleteModal = document.querySelector(".class-modal")
const closeDeleteBtn = document.querySelector("#close-delete-btn")
const DeletePost = document.querySelector("#delete-post-btn")
// Update Modal
const UpdateModal = document.querySelector(".update-modal")
const closeUpdateModal = document.querySelector("#close-update-btn")
CreatePost.addEventListener("click", () => {
    CreatePost.style = "background-color: black;"
    createPostText.style = "color: #fff"
    ManagePost.style = "background-color: #fff;"
    managePostText.style = "color: #000"
    createPostWrapper.style = "display: block;"
    managePostWrapper.style = "display: none"
})


ManagePost.addEventListener("click", () => {
    createPostWrapper.style = "display: none"
    managePostWrapper.style = "display: block;"
    ManagePost.style = "background-color: black"
    managePostText.style = "color: #fff"
    CreatePost.style = "background-color: #fff;"
    createPostText.style = "color: #000"
})


managePostContainer.addEventListener("click",(e)=> {
    if(e.target.closest(".delete-post")){
        DeleteModal.style = "display: block;"
    }
})


async function renderPageData() {
    try {
        const response = await axios.get("http://localhost:3000/api/posts")
        // console.log(response.data.data);
        const cardsFragment = document.createDocumentFragment()
        response.data.data.forEach((items) => {
            const DivEl = document.createElement("div");
            DivEl.className = "manage-box"
            DivEl.dataset = "post._id"
            DivEl.innerHTML = `
           
           <img src="${items.image}">
           <div class="card-content">
           <h3>${items.title.slice(0, 25)}</h3>
           <p>${items.description.slice(0, 80)}</p>
           <div>
           <button class="edit-post">Edit</button>
           <button data-delete-id=${items._id} class="delete-post">Delete</button>
           </div>
           </div>
    
            `
            cardsFragment.appendChild(DivEl)
        }); 
        managePostContainer .appendChild(cardsFragment)

    } 
    catch (err) {
        console.log(err);
    }
}
renderPageData();

// CREATE POST

createPostsForm.addEventListener("submit", createNewPosts)

 function createNewPosts(e){
    e.preventDefault();
    fetch("http://localhost:3000/api/posts", {
        method: "POST",
        body: JSON.stringify({
            title:createPostTitle.value,
            image: createPostImage.value,
            description: createPostDescription.value,
            category: createSelect.value,
        }),
        headers: {
            "Content-Type": "application/json",
             'Authorization': "Bearer " + localStorage.getItem("user-token")
        }
    })
    .then(response => response.json())
    .then(data => console.log(data))
}

// DELETE POSTS
managePostContainer.addEventListener("click", (e)=> {
    if(e.target.closest(".delete-post")){
      const DelId = e.target.closest(".delete-post").dataset.deleteId
      console.log(DelId);
        fetch(`http://localhost:3000/api/posts/${DelId}`,{
            method: "DELETE",
            headers: {
             'Authorization': "Bearer " + localStorage.getItem("user-token"),
            }
        })
    }
    
})




// SIGNOUT MODAL
asideSignOut.addEventListener("click", () => {
    SignoutModal.style = "display: block;"
    SignoutModal.style = "display: flex;"
    signoutModalWrapper.style = "display: block"
});

closeSignOutModal.addEventListener("click",()=>{
    SignoutModal.style = "display:none"
    signoutModalWrapper.style = "display: none"
})
asideSignOutBtn.addEventListener("click",()=> {
    location.replace(location.origin + "/index.html")
})



managePostContainer.addEventListener("click", (e) => {
    if(e.target.closest(".edit-post")){
        signoutModalWrapper.style = "display: block";
        UpdateModal.style = "display: block;"
        UpdateModal.style = "display: flex; justify-content: space-evenly"
    }
});


closeUpdateModal.addEventListener("click", ()=>{
    UpdateModal.style = "display: none";
    signoutModalWrapper.style = "display: none"
})


fetch(`http://localhost:3000/api/categories`)
.then(res => res.json())
.then(data => {
    // console.log(data.data);
    const selectionFragment = document.createDocumentFragment();
    data.data.forEach(elId => {
        console.log(elId);
        const option = document.createElement("option");
        option.innerHTML = elId._id;
        console.log(option);
        selectionFragment.appendChild(option)
        
    })
    createSelect.appendChild(selectionFragment)
    console.log(createSelect);
})



//////////////////////////
fetch(`http://localhost:3000/api/categories`)
.then(res => res.json())
.then(data => {
    // console.log(data.data);
    const selectionFragment = document.createDocumentFragment();
    data.data.forEach(elId => {
        console.log(elId);
        const option = document.createElement("option");
        option.innerHTML = elId.title;
        console.log(option);
        selectionFragment.appendChild(option)
    })
    createSelect.appendChild(selectionFragment)
    console.log(createSelect);
})
/////////////////////////

