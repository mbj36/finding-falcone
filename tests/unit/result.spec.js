import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Result from '@/components/Result.vue';

describe('Result.vue', () => {
  let wrapper;

  beforeEach(() => {
    Vue.use(Vuetify);
    wrapper = mount(Result);
  });

  it('has a start again button', () => {
    expect(wrapper.contains('button')).toBe(true);
  });
});
