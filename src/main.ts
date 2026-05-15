import './scss/styles.scss';
import { apiProducts } from './utils/data';
import { API_URL } from './utils/constants';
import { Api } from './components/base/Api';
import { ProductsModel } from './components/Models/ProductsModel';
import { BasketModel } from './components/Models/BasketModel';
import { BuyerModel } from './components/Models/BuyerModel';
import { LarekApi } from './components/Models/LarekApi';


const productsModel = new ProductsModel();
const basketModel = new BasketModel();
const buyerModel = new BuyerModel();

productsModel.setItems(apiProducts.items);
console.log('массив товаров:', productsModel.getItems());
const foundProduct = productsModel.getProductById(apiProducts.items[0].id);
console.log('найденный товар:', foundProduct);
productsModel.setPreview(foundProduct);
console.log('товар для предпросмотра:', productsModel.getPreview());

console.log('предметы в корзине:', basketModel.getItems());
basketModel.addItem(apiProducts.items[0]);
basketModel.addItem(apiProducts.items[1]);
console.log('предметы в корзине:', basketModel.getItems());
console.log('количество:', basketModel.getCount());
console.log('общая стоимость:', basketModel.getTotalPrice());
console.log('есть ли товар с id 1:', basketModel.contains(apiProducts.items[0].id));
basketModel.removeItem(apiProducts.items[0].id);
console.log('после удаления:', basketModel.getItems());
basketModel.clear();
console.log('после очистки:', basketModel.getItems());

buyerModel.setPayment('card');
buyerModel.setAddress('ул. Тестовая, д. 1');
buyerModel.setEmail('test@example.com');
buyerModel.setPhone('+79991234567');
console.log('данные покупателя:', buyerModel.getAll());
console.log('валидация:', buyerModel.validate());
buyerModel.clear();
console.log('после очистки:', buyerModel.getAll());
console.log('валидация:', buyerModel.validate());

const api = new Api(API_URL);
const larekApi = new LarekApi(api);

larekApi.getProducts()
  .then(response => {
    console.log('Ответ от сервера получен:', response);
    productsModel.setItems(response.items);
    console.log('Массив товаров сохранён в модели каталога:', productsModel.getItems());
  })
  .catch(error => {
    console.error('Ошибка при запросе к серверу:', error);
  });

  
buyerModel.setPayment('card');
buyerModel.setAddress('ул. Тестовая, д. 1');
buyerModel.setEmail('test@example.com');
buyerModel.setPhone('+79991234567');
basketModel.addItem(apiProducts.items[0]);
basketModel.addItem(apiProducts.items[1]);
  
const orderData = {
  payment: buyerModel.getAll().payment,
  address: buyerModel.getAll().address,
  email: buyerModel.getAll().email,
  phone: buyerModel.getAll().phone,
  items: basketModel.getItems().map(item => item.id),
  total: basketModel.getTotalPrice()
};

larekApi.postOrder(orderData)
  .then(result => {
      console.log('Заказ оформлен', result);
      basketModel.clear();
      buyerModel.clear();
  })
  .catch(error => {
      console.error('Ошибка:', error);
  });