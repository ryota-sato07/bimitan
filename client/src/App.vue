<script setup lang="ts">
import AppHeader from './components/common/AppHeader.vue'
import AppFooter from './components/common/AppFooter.vue'
import { RouterView } from 'vue-router'

import "@aws-amplify/ui-vue/styles.css";
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';

import { Authenticator, translations } from "@aws-amplify/ui-vue";
import { I18n } from 'aws-amplify/utils';
I18n.putVocabularies(translations);
I18n.setLanguage("ja");
I18n.putVocabularies({
  ja: {
    "Sign In": "ログイン",
    "Create Account": "アカウント作成",
    Username: "Eメールアドレス",
    "Enter your Username": "Eメールアドレスを入力",
    Password: "ログインパスワード",
    "Enter your Password": "ログインパスワードを入力",
    "Sign in": "ログイン",
    "Forgot your password?": "パスワードを再設定する",
  },
});
Amplify.configure(awsconfig);
</script>

<template>
  <authenticator>
    <template v-slot="{ user, signOut }">
      <q-layout view="lHh lpr lFf" container style="height: 100vh" class="shadow-2 rounded-borders">
        <AppHeader/>
        <AppFooter/>
        <RouterView />

        <h1>Hello {{ user.username }}!</h1>
        <button @click="signOut">Sign Out</button>
      </q-layout>
    </template>
  </authenticator>
</template>
