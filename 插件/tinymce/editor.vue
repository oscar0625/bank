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
import "tinymce/plugins/lists";
import "tinymce/plugins/image";
import "tinymce/plugins/table";
import "tinymce/plugins/paste";
import "tinymce/plugins/preview";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/wordcount";

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
          "code link lists image table paste preview fullscreen wordcount",
        toolbar:
          "code | fontsizeselect bold italic underline strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify | image table link unlink  | h1 h2 h3 | outdent indent bullist numlist | preview fullscreen wordcount |removeformat",
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
