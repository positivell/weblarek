import './scss/styles.scss';
import { API_URL } from './utils/constants';
import { Api } from './components/base/Api';
import { ProductsModel } from './components/Models/ProductsModel';
import { BasketModel } from './components/Models/BasketModel';
import { BuyerModel } from './components/Models/BuyerModel';
import { LarekApi } from './components/Models/LarekApi';
import { GalleryView } from './components/Views/galleryView';
import { cloneTemplate, ensureElement } from "./utils/utils";
import { EventEmitter } from './components/base/Events';
import { TPayment } from './types';
import { CardCatalog } from "./components/Views/cardCatalogView";
import { CardPreview } from "./components/Views/cardPreview";
import { Modal } from "./components/Views/modalView";
import { Basket } from './components/Views/basketView';
import { CardBasket } from './components/Views/cardBasket';
import { Header } from './components/Views/header';
import { Order } from './components/Views/order';
import { Contact } from './components/Views/contact';
import { OrderSuccess } from './components/Views/orderSucces';
import { IOrder } from './types';

const events = new EventEmitter();
const productsModel = new ProductsModel(events);
const basketModel = new BasketModel(events);
const buyerModel = new BuyerModel(events);
const galleryView = new GalleryView(
  ensureElement('.gallery')
);

const api = new Api(API_URL);
const larekApi = new LarekApi(api);
const previewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const preview = new CardPreview(
  cloneTemplate(previewTemplate),
  events
);

const modal = new Modal(
  ensureElement<HTMLElement>('#modal-container'),
  events
);

const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');

const basketView = new Basket(
    cloneTemplate(basketTemplate),
    events
);

const header = new Header(
  ensureElement<HTMLElement>('.header'),
  events
);

const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const successView = new OrderSuccess(
    cloneTemplate(successTemplate)
);

successView.onClose = () => {
    modal.close();
};

const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const orderView = new Order(
    cloneTemplate(orderTemplate),
    {
        onInput: (name, value) => {
            events.emit('order:input', { name, value });
        },
        onPayment: (method: TPayment) => {
            events.emit('order:payment', { method });
        },
        onSubmit: () => {
            events.emit('order:next');
        }
    }
);

const contactTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const contactView = new Contact(
    cloneTemplate(contactTemplate),
    {
        onInput: (name, value) => {
            events.emit('contacts:input', { name, value });
        },
        onSubmit: () => {
            events.emit('order:submit');
        }
    }
);

events.on('order:input', ({ name, value }: { name: string; value: string }) => {
    if (name === 'address') {
        buyerModel.setAddress(value);
    }
    
    const buyer = buyerModel.getAll();
    const errors = buyerModel.validate();

    orderView.render({
        address: buyer.address,
        payment: buyer.payment,
        valid: !errors.address && !errors.payment,
        error: [errors.address, errors.payment].filter(Boolean).join(', ')
    });
});

events.on('order:payment', ({ method }: { method: TPayment }) => {
    buyerModel.setPayment(method);
    
    const buyer = buyerModel.getAll();
    const errors = buyerModel.validate();

    orderView.render({
        address: buyer.address,
        payment: buyer.payment,
        valid: !errors.address && !errors.payment,
        error: [errors.address, errors.payment].filter(Boolean).join(', ')
    });
});

events.on('contacts:input', ({ name, value }: { name: string; value: string }) => {
    if (name === 'email') {
        buyerModel.setEmail(value);
    }
    if (name === 'phone') {
        buyerModel.setPhone(value);
    }
    
    const buyer = buyerModel.getAll();
    const errors = buyerModel.validate();

    contactView.render({
        email: buyer.email,
        phone: buyer.phone,
        valid: !errors.email && !errors.phone,
        error: [errors.email, errors.phone].filter(Boolean).join(', ')
    });
});

events.on('products:changed', () => {
  const items = productsModel.getItems();
  const template = ensureElement<HTMLTemplateElement>('#card-catalog');

  const cards = items.map(item => {
      const card = new CardCatalog(
          cloneTemplate(template),
          {
              onClick: () => events.emit('product:select', { id: item.id })
          }
      );

      return card.render({
          title: item.title,
          price: item.price,
          image: item.image,
          category: item.category
      });
  });

  galleryView.render({ items: cards });
});

events.on('product:cartAction', () => {
  const product = productsModel.getPreview();
  if (!product) return;

  if (basketModel.contains(product.id)) {
      basketModel.removeItem(product.id);
  } else {
      basketModel.addItem(product);
  }

  modal.close();
});

events.on('product:select', ({ id }: { id: string }) => {
  productsModel.setPreview(id);
});

events.on('product:selected', () => {
  const product = productsModel.getPreview();
  if (!product) return;

  const isInCart = basketModel.contains(product.id);
  const buttonText = isInCart ? 'Удалить из корзины' : 'В корзину';
  const buttonDisabled = product.price === null;

  modal.setContent(
      preview.render({
          title: product.title,
          image: product.image,
          category: product.category,
          description: product.description,
          buttonText: buttonText,
          buttonDisabled: buttonDisabled,
          price: product.price
      })
  );

  modal.open();
});

events.on('cart:changed', () => {
    header.render({
        counter: basketModel.getCount()
    });
  
    const itemTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
  
    const items = basketModel.getItems().map((product, index) => {
        const item = new CardBasket(
            cloneTemplate(itemTemplate),
            {
                onClick: (id: string) => events.emit('basket:remove', { id })
            }
        );
  
        return item.render({
            id: product.id,
            index: index + 1,
            title: product.title,
            price: product.price ?? 0
        });
    });
  
    basketView.items = items;
    basketView.total = basketModel.getTotalPrice();
  });

events.on('basket:open', () => {
  modal.setContent( 
      basketView.render() 
  );

  modal.open();
});

events.on('basket:remove', ({ id }: { id: string }) => {
  basketModel.removeItem(id);
});

events.on('order:open', () => {
  const buyer = buyerModel.getAll();
  const errors = buyerModel.validate();

  orderView.render({
      address: buyer.address,
      payment: buyer.payment,
      valid: !errors.address && !errors.payment,
      error: [errors.address, errors.payment].filter(Boolean).join(', ')
  });

  modal.setContent(orderView.render());
  modal.open();
});

events.on('order:next', () => {
  const buyer = buyerModel.getAll();
  const errors = buyerModel.validate();

  contactView.render({
      email: buyer.email,
      phone: buyer.phone,
      valid: !errors.email && !errors.phone,
      error: [errors.email, errors.phone].filter(Boolean).join(', ')
  });

  modal.setContent(contactView.render());
});

events.on('order:submit', () => {
  const orderData: IOrder = {
      ...buyerModel.getAll(),
      total: basketModel.getTotalPrice(),
      items: basketModel.getItems().map(p => p.id)
  };
  
  larekApi.postOrder(orderData)
      .then((res) => {
          console.log('Ответ сервера:', res);

          basketModel.clear();
          buyerModel.clear();

          modal.setContent(
              successView.render({ total: res.total })
          );

          modal.open();
      })
      .catch((err) => {
          console.error('Ошибка запроса к серверу:', err);
      });
});

larekApi.getProducts()
    .then(response => {
        productsModel.setProducts(response.items);
    })
    .catch(error => {
        console.error('Ошибка запроса к серверу:', error);
    });