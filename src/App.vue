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

      <v-menu v-model="menu" :close-on-content-click="false" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-action>
                <v-switch v-model="darkMode" hide-details></v-switch>
              </v-list-item-action>
              <v-list-item-title>Dark mode</v-list-item-title>
            </v-list-item>

            <v-divider></v-divider>

            <v-subheader>Name format</v-subheader>
            <v-list-item>
              <v-radio-group hide-details class="mt-0" v-model="format">
                <v-radio label="account-circle" value="basic"></v-radio>
                <v-radio label="mdi-account-circle" value="prefixed"></v-radio>
                <v-radio label="accountCircle" value="camelCase"></v-radio>
                <v-radio
                  label="mdiAccountCircle"
                  value="camelCasePrefixed"
                ></v-radio>
              </v-radio-group>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>

      <v-btn href="https://github.com/ThomasKientz/mdi" icon>
        <v-icon>mdi-github</v-icon>
      </v-btn>

      <a
        class="ml-3"
        style="color: inherit;"
        href="https://materialdesignicons.com/"
        target="blank"
        >MDI 5.0.45</a
      >
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
                    @click="copy(item.name)"
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
    toastMessage: null,
    menu: false,
    format: localStorage.getItem("format") || "basic"
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
        localStorage.setItem("darkMode", v);
        this.$vuetify.theme.dark = v;
      }
    }
  },

  watch: {
    format(v) {
      localStorage.setItem("format", v);
    }
  },

  methods: {
    copy(name) {
      const formated =
        this.format == "prefixed"
          ? "mdi-" + name
          : this.format == "camelCase"
          ? toCamelCase(name)
          : this.format == "camelCasePrefixed"
          ? toCamelCase("mdi-" + name)
          : name;

      this.$copyText(formated).then(() => {
        this.toastMessage = formated;
      });
    }
  }
};

const toCamelCase = str => {
  return str.split("-").reduce((res, string, index) => {
    const text =
      index > 0 ? string.charAt(0).toUpperCase() + string.slice(1) : string;
    return res + text;
  });
};
</script>

<style lang="scss" scoped>
.algolia {
  width: 24px;
  height: 24px;
  background: url("./assets/algolia.svg");
}
</style>
