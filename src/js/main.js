import Alert from './Alert';
import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';



const alert = new Alert();
const dataSource = new ExternalServices('tents');
const element = document.querySelector('.product-list');
const productList = new ProductList('tents', dataSource, element);

//productList.init();

