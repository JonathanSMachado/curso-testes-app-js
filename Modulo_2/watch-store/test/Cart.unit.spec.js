import { mount } from '@vue/test-utils';
import { expect } from '@jest/globals';
import Cart from '@/components/Cart';

describe('Cart', () => {
  // eslint-disable-next-line require-await
  it('should mount the component', async () => {
    const wrapper = mount(Cart);

    expect(wrapper.vm).toBeDefined();
  });

  it('should emit close event when button gets clicked', async () => {
    const wrapper = mount(Cart);
    const button = wrapper.find('[data-testid=close-button]');

    await button.trigger('click');

    expect(wrapper.emitted().close).toBeTruthy();
    expect(wrapper.emitted().close).toHaveLength(1);
  });

  // eslint-disable-next-line require-await
  it('should hide the cart when no prop isOpen is passed', async () => {
    const wrapper = mount(Cart);

    expect(wrapper.classes()).toContain('hidden');
  });

  // eslint-disable-next-line require-await
  it('should display the cart when prop isOpen is passed', async () => {
    const wrapper = mount(Cart, {
      propsData: {
        isOpen: true,
      },
    });

    expect(wrapper.classes()).not.toContain('hidden');
  });

  // eslint-disable-next-line require-await
  it('should display "Cart is empty" when there are no products', async () => {
    const wrapper = mount(Cart);

    expect(wrapper.text()).toContain('Cart is empty');
  });
});