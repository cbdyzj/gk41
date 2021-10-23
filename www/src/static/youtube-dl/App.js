import { css } from './modules.js'

const _App = css`
  box-sizing: border-box;
  width: 100vw;
  min-height: 100vh;
  background-color: #fafafa;
  padding: .5rem;

  & nav {
    display: flex;
    justify-content: space-between;
  }

  & .container {
    text-align: center;
    margin-top: 25vh;
  }

  & input.input-url {
    padding: .375rem .75rem;
    box-sizing: border-box;
    border: 1px solid #ced4da;
    width: 60%;
    height: 2.5rem;
    font-size: 1rem;
  }

  & .container-button {
    margin-top: 1rem;

    & > *:not(:first-child) {
      margin-left: 8px;
    }
  }

  & input.input-proxy {
    width: 1rem;
    height: 1rem;
  }

  & button.button-start {
    border: 1px solid #007bff;
    font-size: 1rem;
    cursor: pointer;
    color: #fff;
    background-color: #007bff;
    padding: .375rem .75rem;
    border-radius: .25rem;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;

    &:hover {
      color: #fff;
      background-color: #0069d9;
      border-color: #0062cc
    }
  }

  & a.a-public {
    box-sizing: border-box;
    color: #007bff;
    text-decoration: none;
    font-size: 1rem;
    border-bottom: .25rem solid transparent;

    &:hover {
      border-bottom: .25rem solid #60a5fa;
    }
  }
`

export default {
    template: `
      <div class="${_App}">
      <nav>
        <a class="a-public" :href="'/'">gk41</a>
        <a class="a-public" :href="'/public'">公共文件</a>
      </nav>
      <div class="container">
        <input class="input-url" placeholder="粘贴视频URL..." v-model="url" type="text">
        <br>
        <div class="container-button">
          <button class="button-start" @click="handleClickStartDownload" :disabled="buttonDisabled">
            开始下载
          </button>
          <label>
            <input class="input-proxy" type="checkbox" v-model="proxy"><span>使用代理</span>
          </label>
        </div>
      </div>
      </div>
    `,
    data() {
        return {
            url: '',
            proxy: false,
            buttonDisabled: false,
        }
    },
    methods: {
        async handleClickStartDownload() {
            try {
                this.buttonDisabled = true
                const payload = {
                    url: this.url,
                    proxy: this.proxy,
                }
                const response = await fetch('/api/youtube-dl', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', },
                    body: JSON.stringify(payload),
                })
                const result = await response.json()
                if (result.error) {
                    alert(result.error)
                } else {
                    this.url = ''
                    alert('开始下载了')
                }
            } catch (err) {
                alert(err.message)
            } finally {
                this.buttonDisabled = false
            }
        },
    },
}