<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'pinia';

import { useSourcesStore } from '@/state/stores/sources.store';
import SourceDetail from '@/components/source/SourceDetail.vue';

import { PageType } from '@/utils/enums/pageType.enum';
import { ModalHelper } from '@/utils/helpers/modal.helper';
import { SourceHelper } from '@/utils/helpers/source.helper';

export default defineComponent({

  methods: {
    ...mapActions(useSourcesStore, ['addSource', 'resetSources']),

    /**
     * @description
     * Opens source addition modal
     */
    onAdd(): void {
      ModalHelper
        .open('Add Source', SourceDetail, { type: PageType.Creation })
        .then(modal => {
          if (modal.payload) {
            this.addSource(modal.payload);
          }
        });
    },
  },

  created() {
    this.resetSources();

    [
      { title: 'Futari no Yakusoku', url: 'https://v.animethemes.moe/Basquash-ED3.webm' },
      { title: 'Brave', url: 'https://v.animethemes.moe/Kindaichi-OP4.webm' }
    ].forEach(async e => {
      const source = await SourceHelper.create(e.title, e.url);
      this.addSource(source);
    });
  }
});
</script>

<template>
  <div class="head">
    <div class="head__left">
      <TooltipComp text="Add a new source">
        <ButtonComp
          icon="plus"
          @click="onAdd"
        />
      </TooltipComp>

      <TillingComp />
    </div>

    <div class="head__right"></div>
  </div>
</template>

<style scoped lang="scss">
.head {
  display: flex;
  align-items: center;
  flex-direction: row;

  padding: 10px;
  max-height: 50px;

  box-sizing: border-box;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  background-color: hsl(var(--color-secondary-hsl), 94%);

  &__left {
    display: flex;
    align-items: center;
    flex-direction: row;

    &>* {
      margin-right: 10px;
    }
  }
}
</style>