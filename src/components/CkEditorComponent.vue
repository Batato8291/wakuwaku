<template>
  <ckeditor
    @ready="onReady"
    :editor="editor"
    v-model="editorData"
    @input="emitEditorData"
  ></ckeditor>
  <code>{{ editorData }}</code>
</template>
<style>
/* 提高ckeditor Url視窗的高度 */
:root {
  --ck-z-default: 100;
  --ck-z-modal: calc(var(--ck-z-default) + 999);
}
</style>
<script>
import CustomEditor from 'ckeditor5-custom-build/build/ckeditor';
import 'ckeditor5-custom-build/build/translations/zh-cn';
import MyUploadAdapter from '@/methods/uploadAdapter';

function imgUploader(editor) {
  const plugins = Object.prototype.hasOwnProperty.call(editor, 'plugins')
    ? editor.plugins
    : console.error('editor has not plugins');

  plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

export default {
  props: {
    content: {
      type: String,
      default() {
        return {};
      },
    },
  },
  emits: ['editor-content'],
  watch: {
    content() {
      this.editorData = this.content;
    },
  },

  data() {
    return {
      editor: CustomEditor,
      editorData: '',
    };
  },
  methods: {
    onReady(editor) {
      // 在準備好editor後,自訂圖片上傳插件
      const plugins = Object.prototype.hasOwnProperty.call(editor, 'plugins')
        ? editor.plugins
        : console.error('editor has not plugins');

      plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new MyUploadAdapter(loader);
      };
    },

    emitEditorData() {
      this.$emit('editor-content', this.editorData);
    },
  },
};
</script>
