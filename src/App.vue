<template>
  <v-app>
    <v-snackbar top color="success" :timeout="2000" v-model="toast">
      <span class="font-weight-bold"> {{ toastMessage }}</span
      ><span class="ml-2">copied to clipboard !</span>
    </v-snackbar>

    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>MDI</span>
        <span class="font-weight-light">SEARCH</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-switch v-model="darkMode" hide-details label="Dark"></v-switch>
      <a class="ml-3" href="https://materialdesignicons.com/" target="blank"
        >v5.0.45</a
      >
      <v-btn href="https://github.com/ThomasKientz/mdi" icon>
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <ais-instant-search
          :index-name="indexName"
          :search-client="searchClient"
        >
          <ais-configure :hits-per-page.camel="100" />
          <ais-search-box>
            <div slot-scope="{ currentRefinement, isSearchStalled, refine }">
              <v-layout align-center>
                <v-text-field
                  prepend-inner-icon="mdi-magnify"
                  label="Search icon"
                  :value="currentRefinement"
                  @input="refine($event)"
                  :loading="isSearchStalled"
                  autofocus
                  clearable
                />
                <span class="mx-2 caption grey--text text--darken-1">
                  Search by Algolia
                </span>
                <div class="algolia"></div>
              </v-layout>
            </div>
          </ais-search-box>
          <ais-hits>
            <v-row justify="space-between" slot-scope="{ items }" wrap>
              <v-tooltip v-for="item in items" :key="item.objectID" bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-on="on"
                    v-clipboard="item.name"
                    v-clipboard:success="onCopy"
                    class="ma-4"
                    large
                    icon
                    text
                  >
                    <v-icon large>mdi-{{ item.name }}</v-icon>
                  </v-btn>
                </template>
                <span>{{ item.name }}</span>
              </v-tooltip>
              <v-btn
                disabled
                v-for="n in 50"
                :key="'placeholder-' + n"
                class="ma-4"
                large
                icon
                text
              >
                <v-icon class="ma-4" large></v-icon>
              </v-btn>
            </v-row>
          </ais-hits>
          <ais-refinement-list attribute="brand" />
        </ais-instant-search>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { AisInstantSearch, AisSearchBox } from "vue-instantsearch";
import algoliasearch from "algoliasearch";

export default {
  name: "App",

  components: {
    AisInstantSearch,
    AisSearchBox
  },

  data: () => ({
    searchClient: algoliasearch(
      process.env.VUE_APP_ALGOLIA_APP_ID,
      process.env.VUE_APP_ALGOLIA_API_KEY
    ),
    indexName: "MDI 5.0.45",
    toastMessage: null
  }),

  computed: {
    toast: {
      get() {
        return !!this.toastMessage;
      },
      set(v) {
        this.toastMessage = v;
      }
    },
    darkMode: {
      get() {
        return localStorage.getItem("darkMode") !== "false";
      },
      set(v) {
        console.log("set darkMode", v);
        localStorage.setItem("darkMode", v);
        this.$vuetify.theme.dark = v;
      }
    }
  },

  methods: {
    onCopy(e) {
      this.toastMessage = e.text;
    }
  }
};
</script>

<style lang="scss" scoped>
.algolia {
  width: 24px;
  height: 24px;
  background: url("./assets/algolia.svg");
}
</style>
