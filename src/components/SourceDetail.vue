<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

});
</script>

<template>
  <div class="source">
    <div class="source__form">
      <div class="input">
        <label class="input__wrapper">
          <div class="input__label">Source Title</div>
          <div class="input__input">
            <input
              type="text"
              placeholder="Enter a title for the source"
            >
          </div>
        </label>
      </div>
      
      <div class="input">
        <label class="input__wrapper">
          <div class="input__label">Source URL</div>
          <div class="input__input">
            <input
              type="url"
              placeholder="Enter the URL of the source"
            >
          </div>
        </label>
      </div>
    </div>

    <div class="source__control">
      <button class="button">
        Reset
      </button>
    
      <button class="button">
        Add
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>