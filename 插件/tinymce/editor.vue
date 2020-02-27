<template>
  <div>
    <editor
      id="tinymceEditor"
      :init="tinymceInit"
      :value="value"
      @input="updateValue"
    ></editor>
  </div>
</template>
<script>
import myAxios from "../../../utils/request";
import tinymce from "tinymce/tinymce";
import "tinymce/themes/silver/theme";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/plugins/code";
import "tinymce/plugins/link";
import "tinymce/plugins/advlist";
import "tinymce/plugins/lists";
import "tinymce/plugins/image";
import "tinymce/plugins/table";
import "tinymce/plugins/paste";
import "tinymce/plugins/preview";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/lineheight";

export default {
  name: "tinymceEditor",
  props: ["value"],
  data() {
    let handleImgUpload = (blobInfo, success, failure) => {
      let formData = new FormData();
      formData.append("File", blobInfo.blob());
      myAxios
        .post("/api/activity/uploadimg", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          if (res.Code === 0) {
            success(process.env.VUE_APP_DEV_IMGUPLOADDOMAIN + res.UrlList[0]);
          } else {
            this.$message.error(res.Message);
            failure("error");
          }
        })
        .catch(res => {
          failure("error");
        });
    };
    return {
      content: "",
      tinymceInit: {
        height: 300,
        language_url: "/tinymce/langs/zh_CN.js",
        language: "zh_CN",
        skin_url: `/tinymce/skins/ui/oxide`,
        content_css: `/tinymce/skins/content/default`,

        browser_spellcheck: true, // 拼写检查
        branding: false, // 去水印
        elementpath: false, //禁用编辑器底部的状态栏
        statusbar: false, // 隐藏编辑器底部的状态栏
        paste_data_images: false, // 允许粘贴图像

        menubar: true, // 隐藏最上方menu
        plugins:
          "code link advlist lists image table paste preview fullscreen wordcount lineheight",
        toolbar: [
          "code undo redo restoredraft | bold italic underline strikethrough forecolor backcolor | lineheight alignleft aligncenter alignright alignjustify | bullist numlist blockquote subscript superscript removeformat",
          " formatselect fontselect fontsizeselect | image table link unlink | outdent indent| preview fullscreen wordcount "
        ],
        fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
        font_formats:
          "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats;知乎配置=BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;小米配置=Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei,sans-serif",
        //上传图片 有2种方式
        images_upload_handler: function(blobInfo, success, failure) {
          //1.接上传base64
          let base64 = "data:image/jpeg;base64," + blobInfo.base64();
          success(base64);
          //2.先上传到服务器 然后服务器返回路径做保存
          // handleImgUpload(blobInfo, success, failure);
        }
      }
    };
  },
  methods: {
    updateValue: function(value) {
      this.$emit("input", value);
    }
  },
  components: {
    editor: Editor
  }
};
</script>
