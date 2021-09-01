import { mount } from '@vue/test-utils';
import { expect } from '@jest/globals';
import CartItem from '@/components/CartItem';
import { makeServer } from '@/miragejs/server';
import { CartManager } from '@/managers/CartManager';

describe('CartItem - Unit', () => {
  let server;

  const mountCartItem = () => {
    const cartManager = new CartManager();
    const product = server.create('product', {
      title: 'Lindo relógio',
      price: '22.00',
    });

    const wrapper = mount(CartItem, {
      propsData: {
        product,
      },
      mocks: {
        $cart: cartManager,
      },
    });

    return { wrapper, product, cartManager };
  };

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  it('should mount the component', () => {
    const { wrapper } = mountCartItem();

    expect(wrapper.vm).toBeDefined();
  });

  it('should display product info', () => {
    const {
      wrapper,
      product: { title, price },
    } = mountCartItem();

    const content = wrapper.text();

    expect(content).toContain(title);
    expect(content).toContain(price);
  });

  it('should display quantity 1 when product is first displayed', () => {
    const { wrapper } = mountCartItem();
    const quantity = wrapper.find('[data-testid=quantity]');

    expect(quantity.text()).toContain('1');
  });

  it('should increase quantity when + button gets clicked', async () => {
    const { wrapper } = mountCartItem();
    const quantity = wrapper.find('[data-testid=quantity]');
    const button = wrapper.find('[data-testid=button-plus]');

    await button.trigger('click');
    expect(quantity.text()).toContain('2');
    await button.trigger('click');
    expect(quantity.text()).toContain('3');
    await button.trigger('click');
    expect(quantity.text()).toContain('4');
  });

  it('should decrease quantity when - button gets clicked', async () => {
    const { wrapper } = mountCartItem();
    const quantity = wrapper.find('[data-testid=quantity]');
    const button = wrapper.find('[data-testid=button-minus]');

    await button.trigger('click');
    expect(quantity.text()).toContain('0');
  });

  it('should not go below zero when button - is repeatedly clicked', async () => {
    const { wrapper } = mountCartItem();
    const quantity = wrapper.find('[data-testid=quantity]');
    const button = wrapper.find('[data-testid=button-minus]');

    await button.trigger('click');
    await button.trigger('click');
    expect(quantity.text()).toContain('0');
  });

  it('should display a button to remove item from cart', () => {
    const { wrapper } = mountCartItem();
    const button = wrapper.find('[data-testid=remove-button]');

    expect(button.exists()).toBe(true);
  });

  it('should call cart manager removeProduct() when button gets clicked', async () => {
    const { wrapper, cartManager, product } = mountCartItem();
    const spy = jest.spyOn(cartManager, 'removeProduct');
    await wrapper.find('[data-testid=remove-button]').trigger('click');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(product.id);
  });
});
