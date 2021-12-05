import { css } from './modules.js'
import MessageBox from './MessageBox.js'

const _App = css`
  box-sizing: border-box;
  width: 100vw;
  min-height: 100vh;
  background-color: #fafafa;

  & nav {
    font-size: 0;
    padding: .5rem 1rem;

    & a:not(:first-child) {
      font-size: 1rem;
      margin-left: .5rem;
    }
  }

  & .container {
    padding: .5rem 1rem;
    text-align: center;
    margin-top: 25vh;
  }

  & input.input-url {
    padding: .375rem .75rem;
    box-sizing: border-box;
    border: 1px solid #ced4da;
    width: 90%;
    max-width: 800px;
    height: 2.5rem;
    font-size: 1rem;
  }

  & .container-button {
    margin-top: 1.5rem;

    & > *:not(:first-child) {
      margin-left: 8px;
    }
  }

  & label.input-proxy-label {
    cursor: pointer;
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
    border-radius: .125rem;
    user-select: none;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;

    &:hover {
      color: #fff;
      background-color: #0069d9;
      border-color: #0062cc
    }

    &:disabled {
      cursor: not-allowed;
      color: #fff;
      background-color: #ccc;
      border-color: #eee;
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

  input:disabled {
    cursor: not-allowed;
  }
`

export default {
    template: `
      <div class="${_App}">
      <MessageBox :visible="messageVisible" :text="message"/>
      <nav>
        <a class="a-public" :href="'/'">gk41</a>
        <a class="a-public" :href="'/public'">公共文件</a>
      </nav>
      <div class="container">
        <input class="input-url" placeholder="粘贴视频URL..." v-model="url" type="text" :disabled="loading">
        <br>
        <div class="container-button">
          <button class="button-start" @click="handleClickStartDownload" :disabled="loading">
            开始下载
          </button>
          <label class="input-proxy-label">
            <input class="input-proxy" type="checkbox" v-model="proxy" :disabled="loading">
            <span>使用代理</span>
          </label>
        </div>
      </div>
      </div>
    `,
    data() {
        return {
            url: '',
            proxy: false,
            loading: false,
            message: '',
        }
    },
    computed: {
        messageVisible() {
            return !!this.message
        },
    },
    components: { MessageBox, },
    methods: {
        async requestDownload() {
            this.loading = true
            const payload = {
                url: this.url,
                proxy: this.proxy,
            }
            const response = await fetch('/api/youtube-dl', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(payload),
            })
            return await response.json()
        },
        async handleClickStartDownload() {
            try {
                const result = await this.requestDownload()
                if (result.error) {
                    await this.showMessage(result.error)
                } else {
                    await this.showMessage('下载已经开始，请在"公共文件"查看下载进度')
                    this.url = ''
                }
            } catch (err) {
                await this.showMessage(err.message)
            } finally {
                this.loading = false
            }
        },
        showMessage(message) {
            return new Promise((resolve) => {
                this.message = message
                setTimeout(() => {
                    this.message = ''
                    resolve()
                }, 2000)
            })

        }
    },
}