import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import router from '@/router';
import Header from '@/components/Header.vue';

describe('Header.vue', () => {
  let wrapper;

  beforeEach(() => {
    Vue.use(Vuetify);
    wrapper = mount(Header, { router });
  });

  it('has a title in heading', () => {
    const msg = 'Finding Falcone';
    expect(wrapper.text()).toMatch(msg);
  });

  it('has a home button', () => {
    expect(wrapper.contains('button')).toBe(true);
  });

  it('on clicking home button it leads to home', () => {
    const button = wrapper.find('button');
    button.trigger('click');
  });
});
