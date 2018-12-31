import Vue from 'vue';
import Vuetify from 'vuetify';
import moxios from 'moxios';

describe('Planets', () => {
  let wrapper;

  beforeEach(() => {
    Vue.use(Vuetify);
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('retreives information from the planets API', () => {
    moxios.stubRequest('https://findfalcone.herokuapp.com/planets', {
      status: 200,
      response: {
        name: 'Donlon',
        distance: 100
      }
    });
    moxios.wait(function() {
      expect(wrapper.data().items.length).toBe(1);
    });
  });
});
