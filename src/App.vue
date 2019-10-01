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
              <v-layout align-center>
                <v-text-field
                  prepend-inner-icon="mdi-magnify"
                  label="Search icon"
                  :value="currentRefinement"
                  @input="refine($event)"
                  :loading="isSearchStalled"
                  clearable
                />
                <span class="mx-2">
                  Search by Algolia
                </span>
                <div class="algolia"></div>
              </v-layout>
            </div>
          </ais-search-box>
          <ais-hits>
            <v-row justify="space-between" slot-scope="{ items }" wrap>
              <v-icon
                style="cursor: pointer;"
                v-tooltip.bottom="item.name"
                @click="
                  {
                  }
                "
                v-clipboard="item.name"
                v-clipboard:success="onCopy"
                class="ma-4"
                v-for="item in items"
                :key="item.objectID"
                large
                >mdi-{{ item.name }}</v-icon
              >
              <v-icon
                class="ma-4"
                v-for="n in 50"
                :key="'placeholder-' + n"
                large
              ></v-icon>
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
    indexName: process.env.VUE_APP_ALGOLIA_INDEX
  }),

  methods: {
    onCopy(e) {
      this.$toasted.show(e.text + " copied to clipboard !", {
        duration: 1500,
        type: "success"
      });
    }
  }
};
</script>

<style lang="scss">
.toasted {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}

.tooltip {
  display: block !important;
  z-index: 10000;
  font-family: Roboto, Helvetica, Arial, sans-serif;

  .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
    z-index: 1;
  }

  &[x-placement^="top"] {
    margin-bottom: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="bottom"] {
    margin-top: 5px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="right"] {
    margin-left: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^="left"] {
    margin-right: 5px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &.popover {
    $color: #f9f9f9;

    .popover-inner {
      background: $color;
      color: black;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, 0.1);
    }

    .popover-arrow {
      border-color: $color;
    }
  }

  &[aria-hidden="true"] {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s, visibility 0.15s;
  }

  &[aria-hidden="false"] {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.15s;
  }
}
</style>

<style lang="scss" scoped>
.algolia {
  width: 24px;
  height: 24px;
  background: url("./assets/algolia.svg");
}
</style>
