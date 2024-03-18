import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import {getParam} from './utils.mjs'
const category = getParam('category');

const search = getParam('search');
const selectElement = document.querySelector('.sProd');
let sort = selectElement.value;
let dataSource = new ExternalServices();
let element = document.querySelector('.product-list');
let productList;
if(search){
    productList = new ProductList(search, dataSource, element);
}else if(category){
    productList = new ProductList(category, dataSource, element);
}

productList.init();

document.querySelector('.sProd').addEventListener('change', (event) => {
    // console.log(event.target.value);
    sort = event.target.value;
    dataSource = new ExternalServices();
    element = document.querySelector('.product-list');
    productList = new ProductList(category, dataSource, element, sort);
    document.querySelector('.product-list').innerHTML = '';
    productList.init();
});

