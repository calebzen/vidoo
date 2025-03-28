<script setup lang="ts">
  import { computed, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue';


  const { modelValue, root } = defineProps<{
    modelValue: boolean;
    root?: HTMLElement | string;
  }>();
  const emit = defineEmits(['update:modelValue']);

  const dialogEl = useTemplateRef<HTMLDialogElement>('dialogRef');
  const isOpen = ref(modelValue);
  const overlayEl = ref<HTMLElement | null>(null);
  const rootEl = computed(() => {
    if (!root) return document.body;
    if (typeof root === 'string') {
      return document.querySelector(root) || document.body;
    }
    return root;
  });

  const overlay = {
    create: () => {
      if (!overlayEl.value) {
        overlayEl.value = document.createElement('div');
        overlayEl.value.classList.add('modal-overlay');
        overlayEl.value.addEventListener('click', modal.close);
        rootEl.value.appendChild(overlayEl.value);
      }
    },
    remove: () => {
      if (overlayEl.value && overlayEl.value.parentNode) {
        overlayEl.value.removeEventListener('click', modal.close);
        overlayEl.value.parentNode.removeChild(overlayEl.value);
        overlayEl.value = null;
      }
    },
  };

  const modal = {
    open: () => {
      dialogEl.value?.showModal();
      isOpen.value = true;
    },
    close: () => {
      dialogEl.value?.close();
      isOpen.value = false;
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    const path = e.composedPath() as HTMLElement[];

    if (dialogEl.value && !path.includes(dialogEl.value)) {
      if (path.some(el => el && el instanceof HTMLElement && el.closest('button'))) {
        return;
      }
      modal.close();
      overlay.remove();
    }
  };

  // Watch model value
  watch(() => modelValue, (newVal) => {
    isOpen.value = newVal;
  });

  // Watch open state
  watch(isOpen, (newVal) => {
    emit("update:modelValue", newVal);
    if (newVal) {
      modal.open();
      overlay.create();
    } else {
      modal.close();
      overlay.remove();
    }
  });

  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
  });

  onUnmounted(() => {
    overlay.remove();
    modal.close();
    document.removeEventListener('click', handleClickOutside);
  });

  defineExpose({
    overlay,
    modal
  });
</script>

<template>
  <dialog ref="dialogRef" class="dialog absolute absolute-center rounded">
    <div class="dialog-wrapper size-full p-4 flex flex-col gap-4">
      <div class="dialog-header w-full text-heading">
        <slot name="header"></slot>
      </div>
      <div class="dialog-body grow">
        <slot name="body"></slot>
      </div>
      <div class="dialog-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </dialog>
</template>

<style>
.modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 50;
}

.dialog::backdrop {
  display: none;
  pointer-events: none;
}
</style>