import { shallowMount } from '@vue/test-utils';
import ScoreButton from '../../src/components/scores/ScoreButton.vue';

describe('ScoreButton.vue', () => {
  it('renders passed number name', () => {
    const wrapper = shallowMount(ScoreButton, {
      propsData: { 
        number: {
          name: '1',
          value: 1,
        },
        scoreMultiplier: 1,
       },
    });

    expect(
      wrapper.find('button').text(),
    ).toBe('1');
  });
});
