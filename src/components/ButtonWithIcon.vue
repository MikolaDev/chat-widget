<script setup lang="ts">
defineProps({
  icon: Object,
})
</script>

<template>
  <button class="button-with-icon">
    <transition mode="out-in" name="button-with-icon__transition">
      <component class="button-with-icon__icon" :is="icon" :key="icon" />
    </transition>
  </button>
</template>

<style lang="scss">
.button-with-icon {
  --_icon-size: var(--icon-size, 0.62em);
  transition:
    background var(--transition-default),
    transform var(--transition-default);
  cursor: pointer;
  width: 1em;
  height: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 50%;
  border: none;
  font-size: 1rem;
  background-color: var(--c-primary);
  color: var(--c-white);
  box-shadow:
    0 10px 30px rgba(#3b435c, 0.2),
    0 20px 60px rgba(#3b435c, 0.1);

  &__icon {
    font-size: var(--_icon-size);
  }

  &:hover {
    transform: scale(1.1);
    background-color: var(--c-primary-dark);
  }
  &:focus {
    background-color: var(--c-primary-dark);
  }
  &:active {
    transform: scale(0.9);
  }

  &__transition {
    &-enter-active,
    &-leave-active {
      transition:
        opacity 0.2s ease,
        transform 0.2s ease;
    }

    &-enter-from,
    &-leave-to {
      opacity: 0;
      transform: scale(0.5);
    }
  }
}
</style>
