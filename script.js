let container = document.getElementById("container")
// let loading = document.getElementById("loadingIndicator")

function showLoadingIndicator() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'block';
}

// Function to hide loading indicator
function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'none';
}

let url ="https://json-server-ew0w.onrender.com/products"
async function fetchData(Url,queryParams=""){
    try {
        showLoadingIndicator();
        let res = await fetch(`${Url}?${queryParams}`)
        let count= res.headers.get("X-Total-Count")
        console.log(count)
        // console.log(res)
        let data = await res.json()
        console.log(data)

        renderProducts(data)
        hideLoadingIndicator();
        pagination(count,5,queryParams)

    } catch (error) {
        console.log(error)
    }
   
}

fetchData(`${url}?_page=1&_limit=5`)

function renderProducts(data){
    if(!Array.isArray(data)){
        console.error('data is not array')
        return;
    }
    let cardList = document.createElement('div')
    cardList.className = "card-list";

    data.forEach((item)=>{
        const card = document.createElement('div')
        card.className = 'card';
        card.productId = item.id;

        const name = document.createElement('h3')
        const price = document.createElement('p')
        const category = document.createElement('p')
        const description = document.createElement('p')
        
        const button = document.createElement('button')


    const image = document.createElement('img')
    image.className  = "image"
    image.src = item.images[0]
        

        name.className = 'product-name';
        price.className = 'procduct-price';
        category.className = 'procduct-category';
        description.className = 'procduct-description';
        button.className ='details-button'

        name.innerHTML = item.name;
        // console.log(name)
        price.innerHTML = `Price : ${item.price}`
        // console.log(price)
        category.innerHTML = `Category : ${item.category}`;
        description.innerHTML = item.description;
        button.textContent = "Details"

        card.appendChild(image)
        card.appendChild(name)
        card.appendChild(price)
        card.appendChild(category)
        card.appendChild(button)

        // card.appendChild(description)
        cardList.appendChild(card)
        container.append(cardList)

        button.addEventListener('click', (e) => {
            const productId = card.productId;
            const productUrl = `product.html?id=${productId}`;
            window.open(productUrl, '_blank');
            button.disabled = true; 
        });

    })

}



let sort = document.getElementById('sortBy')


sort.addEventListener('change', (e) => {
    const selectedValue = sort.value;
    if (selectedValue === 'asc') {
        container.innerHTML = "";
        fetchData(`${url}`,`_sort=price&_order=asc`);
    } else if (selectedValue === 'desc') {
        container.innerHTML = "";
        fetchData(`${url}`,`_sort=price&_order=desc`);
    }
});


let filter = document.getElementById('filter')

filter.addEventListener('change',(e)=>{
    
    const selectValue = filter.value;
    if (selectValue === '1') {
        container.innerHTML = "";
        fetchData(`${url}`,`category=cat1`)
    } else if (selectValue === '2') {
        container.innerHTML = "";
        fetchData(`${url}`,`category=cat2`)
    }
    else if (selectValue === '3') {
        container.innerHTML = "";
        fetchData(`${url}`,`category=cat3`)
    }
    else if (selectValue === '4') {
        container.innerHTML = "";
        fetchData(`${url}`,`_category=cat4`)
    }
})

// #pagnation
let paginationWrapper = document.getElementById("pagination-wrapper")


function pagination(total, limit, queryParams) {
    let totalButtons = Math.ceil(total / limit);
    paginationWrapper.innerHTML = "";
    for (let i = 1; i <= totalButtons; i++) {
        let button = document.createElement('button');
        button.innerText = i;
        button.className="page-btn"

        button.addEventListener('click', (e) => {
            container.innerHTML=""
            fetchData(`${url}?_page=${i}&_limit=5`, queryParams);
        });

        paginationWrapper.append(button);
    }
}

// #theme

const theme = document.getElementById('theme')

theme.addEventListener('click',(e)=>{
    if(theme.innerHTML==='Dark'){
        theme.innerHTML='Light'
        document.body.style.background=('black')
        document.body.style.color=('white')
    }
    else{
        theme.innerHTML='Dark'
        document.body.style.background=('white')
        document.body.style.color=('black')
    }
    
    
})

// #menu
let navMenu = document.getElementById('nav-menu')
let navList = document.getElementById('navlist');

navMenu.addEventListener('click',(e)=>{
    if(navList.style.display==='none'){
        navList.style.display='flex';
    }
    else{
        navList.style.display='none';
    }
})