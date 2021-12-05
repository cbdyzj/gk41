import { css } from './modules.js'

const _MessageBox = css`
  box-sizing: border-box;
  background-color: #ff8c00;
  color: #fff;
  text-align: center;
  line-height: 40px;
  height: 0;
  transition: height .2s ease;

  &.visible {
    height: 40px;
  }
`

export default {
    template: `
      <div class=${_MessageBox} :class="visible ? 'visible' : ''">
      {{ text }}
      </div>
    `,
    props: {
        visible: {
            type: Boolean,
            default: () => false,
        },
        text: {
            type: String,
            default: () => '',
        },
    },
}