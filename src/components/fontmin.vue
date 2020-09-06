<template>
  <div class="font-compress">
    <header>
      <span>FONT COMPRESS</span>
      <div class="action">
        <select name="fonts" v-model="font" @change="compress">
          <option v-for="afont in fonts" :key="afont">{{ afont }}</option>
        </select>
        <button @click="show">Export</button>
      </div>
    </header>
    <main class="edit-wrap">
      <div class="input-wrap">
        <textarea v-model="text" cols="30" rows="10" @change="compress"></textarea>
      </div>
      <div class="preview-wrap" :style="{ fontFamily: font }">{{ text }}</div>
    </main>
    <footer>Copyright © {{year}} Lorry</footer>
    <div v-show="isShow" class="font-face-wrap" @click.self="hide">
      <div class="font-face">
        <div class="copy" data-clipboard-target=".font-face-text" @click="copy">
          <span>copy</span>
        </div>
        <div class="font-face-text">{{ fontFace }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const baseUrl = 'http://29397479-1732053286884989.test.functioncompute.com';
let ClipboardJS = null;

export default {
  data() {
    return {
      fonts: [],
      font: '',
      text: '输入文本进行字体子集化，输出字体只包含所选字型',
      fontFace: '',
      isShow: false,
      year: new Date().getFullYear(),
    };
  },
  mounted() {
    (async () => {
      await this.getFontList();
      await this.compress();
    })();
  },
  methods: {
    async compress() {
      const query = {
        fontName: this.font,
        text: this.text,
      };
      try {
        const res = await axios.post(`${baseUrl}/fontmin/compress`, query);
        if (res.data.data.code === 0) {
          this.fontFace = res.data.data.data;
          this.createFontStyle(this.fontFace);
        }
      } catch (err) {
        console.error('字体压缩服务异常！');
      }
    },
    async getFontList() {
      const res = await axios.get(`${baseUrl}/fontmin/list`);
      if (res.data.data.code === 0) {
        this.fonts = res.data.data.data;
        this.font = '七岁半';
      } else {
        console.error('获取字体列表失败！');
      }
    },
    createFontStyle(fontFace) {
      const style = document.createElement('style');
      style.innerHTML = fontFace;
      document.head.appendChild(style);
    },
    show() {
      this.isShow = true;
      this.compress();
    },
    hide() {
      this.isShow = false;
    },
    async copy() {
      if (!ClipboardJS) {
        const d = await import(/* webpackChunkName: "clipboard" */ 'clipboard');
        ClipboardJS = d.default;
      }

      const clipboard = new ClipboardJS('.copy');
      console.log(clipboard);
    },
  },
};
</script>

<style lang="scss">
$btnh: 40px;
.font-compress {
  padding: 0 100px;
  .font-face-wrap {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .font-face {
      background: rgb(40, 44, 52);
      color: #fff;
      width: 80vw;
      height: 80vh;
      padding: 20px;
      box-sizing: border-box;
      border-radius: 10px;
      box-shadow: 0 0 5px #000;
      white-space: pre-wrap;
      overflow-wrap: break-word;
      overflow-y: scroll;
      position: relative;
      .copy {
        position: absolute;
        right: 10px;
        top: 10px;
        background: #000;
        color: #fff;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
        text-align: center;
      }
    }
  }
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    line-height: 70px;
    span {
      font-weight: bold;
    }
    select {
      border: 1px solid #e2e2e2;
      border-radius: 3px;
      outline: none;
      width: 200px;
      padding-left: 20px;
      height: $btnh;
      line-height: $btnh;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      margin-right: 30px;
      font-size: 16px;
    }
    button {
      width: 90px;
      height: $btnh;
      line-height: $btnh;
      cursor: pointer;
      border-width: 0px;
      border-radius: 3px;
      background: #1e90ff;
      outline: none;
      color: white;
      font-size: 16px;
    }
  }
  footer {
    text-align: center;
    line-height: 80px;
    color: #c7c7c7;
  }
  .edit-wrap {
    display: flex;
    align-items: center;
    text-align: center;
    // max-width: 1800px;
    height: 80vh;
    margin: 0 auto;
    font-size: 28px;
    .input-wrap {
      background: #f8f8f8;
      flex: 1;
      height: 100%;
      padding: 20px;
      box-sizing: border-box;
      textarea {
        font-size: 28px;
        width: 100%;
        height: 100%;
        color: #666;
        background: #f8f8f8;
        border: none;
        resize: none;
        outline: none;
      }
    }
    .preview-wrap {
      flex: 1;
      padding: 20px;
      box-sizing: border-box;
      height: 100%;
      text-align: left;
      border: 1px solid #e2e2e2;
    }
  }
}
</style>
