<template>
  <ckeditor
    :editor="editor"
    v-model="editorData"
    :config="editorConfig"
    @ready="onReady"
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
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
// Plugins
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat.js';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder.js';
import CKFinderUploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter.js';
import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor.js';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor.js';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline.js';
import Image from '@ckeditor/ckeditor5-image/src/image.js';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption.js';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert.js';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize.js';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle.js';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar.js';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload.js';
import Indent from '@ckeditor/ckeditor5-indent/src/indent.js';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import Link from '@ckeditor/ckeditor5-link/src/link.js';
import List from '@ckeditor/ckeditor5-list/src/list.js';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice.js';
import Table from '@ckeditor/ckeditor5-table/src/table.js';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar.js';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation.js';
import MyUploadAdapter from '@/methods/uploadAdapter';
import { string } from 'postcss-selector-parser';

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
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        plugins: [
          Alignment,
          Autoformat,
          BlockQuote,
          Bold,
          CKFinder,
          CKFinderUploadAdapter,
          CloudServices,
          Essentials,
          FontBackgroundColor,
          FontColor,
          FontSize,
          Heading,
          HorizontalLine,
          Image,
          ImageCaption,
          ImageInsert,
          ImageResize,
          ImageStyle,
          ImageToolbar,
          ImageUpload,
          Indent,
          Italic,
          Link,
          List,
          MediaEmbed,
          Paragraph,
          PasteFromOffice,
          Table,
          TableToolbar,
          TextTransformation,
        ],
        toolbar: {
          items: [
            'heading',
            '|',
            'fontColor',
            'fontBackgroundColor',
            'fontSize',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            'alignment',
            '|',
            'horizontalLine',
            'blockQuote',
            'imageUpload',
            'insertTable',
            'mediaEmbed',
            'undo',
            'redo',
          ],
        },
        language: 'en',
        image: {
          toolbar: [
            'imageTextAlternative',
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side',
            '|',
            'toggleImageCaption',
          ],
        },
        table: {
          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
        },
        fontSize: {
          options: [
            { title: 'Tiny', model: '0.7rem' },
            { title: 'Small', model: '0.85rem' },
            'default',
            { title: 'Big', model: '1.4rem' },
            { title: 'Huge', model: '1.8rem' },
          ],
        },
      },
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
