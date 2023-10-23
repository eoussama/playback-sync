<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<template>
  <div class="foot">
    <a
      target="_blank"
      class="foot__content"
      href="https://github.com/EOussama/playback-sync"
    >
      <span class="foot__github">
        <font-awesome-icon icon="fa-brands fa-github" />
      </span>

      <span class="foot__text">
        Playback Sync
      </span>
    </a>
  </div>
</template>

<style scoped lang="scss">
.foot {
  padding: 2px 10px;

  box-sizing: border-box;
  background-color: hsl(var(--color-secondary-hsl), 94%);

  &__content {
    text-align: center;
    text-decoration: none;

    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {

      .foot__text,
      .foot__github {
        color: hsl(var(--color-secondary-hsl), 50%);
        color: hsl(var(--color-secondary-hsl), 50%);
      }
    }
  }

  &__text,
  &__github {
    color: hsl(var(--color-secondary-hsl), 65%);

    transition-duration: 0.2s;
    transition-property: color;
  }

  &__github {
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 14px;
    margin-right: 5px;
  }

  &__text {
    font-size: 12px;
    font-family: var(--font-family-primary);
  }
}
</style>