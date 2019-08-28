<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>MDI</span>
        <span class="font-weight-light">SEARCH</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container>
        <ais-instant-search
          :index-name="indexName"
          :search-client="searchClient"
        >
          <ais-configure :hits-per-page.camel="1000" />
          <ais-search-box>
            <div slot-scope="{ currentRefinement, isSearchStalled, refine }">
              <v-text-field
                prepend-inner-icon="mdi-magnify"
                label="Search icon"
                :value="currentRefinement"
                @input="refine($event)"
                :loading="isSearchStalled"
                clearable
              />
            </div>
          </ais-search-box>
          <ais-hits>
            <v-row justify="space-between" slot-scope="{ items }" wrap>
              <v-icon
                @click="
                  {
                  }
                "
                v-clipboard:copy="item.name"
                v-clipboard:success="onCopy"
                class="ma-4"
                v-for="item in items"
                :key="item.objectID"
                large
                >mdi-{{ item.name }}</v-icon
              >
            </v-row>
          </ais-hits>
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
    indexName: process.env.VUE_APP_ALGOLIA_INDEX
  }),

  methods: {
    onCopy() {
      this.$toasted.show("Copied !", { duration: 1000, type: "success" });
    }
  }
};
</script>

<style lang="scss">
.toasted {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
</style>
