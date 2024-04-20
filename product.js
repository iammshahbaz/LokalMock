let homepage = document.getElementById("navlogo")

homepage.addEventListener('click', () => {
    window.location.href = "index.html"
})

let loading = document.getElementById("loadingIndicator")
function showLoadingIndicator() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'block';
}

// Function to hide loading indicator
function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'none';
}


let currentUrl = new URL(window.location.href)

let params = currentUrl.searchParams;
const productId = params.get('id')


if (productId) {
    console.log(`ProductId : ${productId}`);
    fetchProductDetails(productId);
} else {
    console.log("Product not found");
}


async function fetchProductDetails(productId) {
    try {
        showLoadingIndicator()
        const res = await fetch(`https://json-server-ew0w.onrender.com/products/${productId}`);
        const productDetails = await res.json()
        console.log(productDetails)
        singlerenderProducts(productDetails);
        hideLoadingIndicator()

    } catch (error) {
        console.log(error)
    }
}



let singleContainer = document.getElementById('single-container')

function singlerenderProducts(item) {
    if (typeof item !== 'object' || item === null) {
        console.error('Expected data to be an object, but received:', item);
        return;
    }
    const card = document.createElement('div')
    card.className = 'Scard';


    const name = document.createElement('h3')
    const price = document.createElement('p')
    const category = document.createElement('p')
    const description = document.createElement('p')
    const image = document.createElement('img')

    // image.src = item.image;
    // image.className = 'image'
    // image.alt = 'img'

    name.className = 'Sproduct-name';
    price.className = 'Sproduct-price';
    category.className = 'Sproduct-category';
    description.className = 'Sproduct-description';

    const carousel = document.querySelector('.carousel-inner')
    item.images.map((imgUrl, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (index === 0) {
            carouselItem.classList.add('active');
        }
        const image = document.createElement('img')
        image.src = imgUrl
        image.classList.add('d-block', 'w-100'); // Bootstrap classes for image responsiveness
        image.alt = 'Slide Image';
        carouselItem.appendChild(image)
        carousel.append(carouselItem)
    })


    name.innerHTML = item.name;
    price.innerHTML = `Price : ${item.price}`

    category.innerHTML = `Category : ${item.category}`;


    const words = item.description.split(' ');
    let limitDescription = '';
    for (let i = 0; i < Math.min(words.length, 10); i++) {
        limitDescription += words[i] + ' ';
    }
    description.innerHTML = limitDescription + "...";




    // card.appendChild(image)
    card.appendChild(name)
    card.appendChild(price)
    card.appendChild(category)
    card.appendChild(description)

    singleContainer.append(card)

}