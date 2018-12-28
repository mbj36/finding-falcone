import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import router from '@/router';
import Footer from '@/components/Footer.vue';

describe('Footer.vue', () => {
  let wrapper;

  beforeEach(() => {
    Vue.use(Vuetify);
    wrapper = mount(Footer, { router });
  });

  it('has a div element', () => {
    expect(wrapper.contains('div')).toBe(true);
  });

  it('has correct data reflected', () => {
    const currentDate = new Date().getFullYear().toString();
    expect(wrapper.text()).toMatch(currentDate);
  });
});
