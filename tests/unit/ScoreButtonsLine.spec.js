import { shallowMount } from '@vue/test-utils';
import ScoreButtonsLine from '../../src/components/scores/ScoreButtonsLine.vue';
import ScoreButton from '../../src/components/scores/ScoreButton';

describe('ScoreButtonsLine.vue', () => {
  it('renders passed number name', () => {
    const wrapper = shallowMount(ScoreButtonsLine, {
      propsData: { 
        scoreButtonNumbers: [
          {
            name: '1',
            value: 1,
          },
          {
            name: '2',
            value: 2,
          },
          {
            name: '3',
            value: 3,
          },
        ],
        scoreMultiplier: 1,
      },
    });

    expect(
      wrapper.findAll(ScoreButton).length,
    ).toBe(3);
  });
});
