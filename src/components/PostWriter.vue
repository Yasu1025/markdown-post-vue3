<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { TimelinePost } from '@/types/posts'
import { marked } from 'marked'
import highlightjs from 'highlight.js'
import debounce from 'lodash/debounce'
import { usePosts } from '@/stores/posts'
import { useRouter } from 'vue-router'

const props = defineProps<{
  post: TimelinePost
}>()

// Data --------------------------------
const titleRef = ref(props.post.title)
const contentRef = ref(props.post.markdown)
const markedResult = ref('')
const contentEditable = ref<HTMLDivElement>()
const usePostsStore = usePosts()
const router = useRouter()

// Watch --------------------------------
watch(
  contentRef,
  debounce(newContent => {
    parseHtml(newContent)
  }, 250),
  {
    immediate: true,
  }
)

// onMounted --------------------------------
onMounted(() => {
  if (!contentEditable.value) {
    throw new Error('Content DOM was not found....')
  }
  contentEditable.value.innerText = contentRef.value
})

// Methods --------------------------------
const parseHtml = (markdown: string) => {
  marked.parse(
    markdown,
    {
      gfm: true,
      breaks: true,
      highlight: code => {
        return highlightjs.highlightAuto(code).value
      },
    },
    (_, parseResult) => {
      markedResult.value = parseResult
    }
  )
}

const handleInput = () => {
  if (!contentEditable.value) {
    throw new Error('Content DOM was not found....')
  }
  contentRef.value = contentEditable.value?.innerText
}

const onSave = () => {
  const newPost: TimelinePost = {
    ...props.post,
    title: titleRef.value,
    markdown: contentRef.value,
    html: markedResult.value,
  }

  usePostsStore.createPost(newPost)
  router.push('/')
}
</script>

<template>
  <div class="colums">
    <div class="column">
      <div class="field">
        <div class="label">Post Title</div>
        <input class="input" type="text" v-model="titleRef" />
      </div>

      <div class="columns">
        <div class="column">
          <div ref="contentEditable" contenteditable @input="handleInput" />
        </div>
        <div class="column">
          <div v-html="markedResult"></div>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <button class="button is-primary is-pulled-right" @click="onSave">
            Save Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
