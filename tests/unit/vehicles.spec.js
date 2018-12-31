import Vue from 'vue';
import Vuetify from 'vuetify';
import moxios from 'moxios';

describe('Vehicles', () => {
  let wrapper;

  beforeEach(() => {
    Vue.use(Vuetify);
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('retreives information from the vehicles API', () => {
    moxios.stubRequest('https://findfalcone.herokuapp.com/vehicles', {
      status: 200,
      response: {
        name: 'Space pod',
        max_distance: 100,
        speed: 2,
        total_no: 2
      }
    });
    moxios.wait(function() {
      expect(wrapper.data().vehicles.length).toBe(1);
    });
  });
});
