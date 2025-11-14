<template>
  <MonacoEditor
    v-if="defInfo.path"
    :key="defInfo.path"
    :path="defInfo.path"
    :like="like"
    @like="open = !open"
    @reset="inputPath"
  />

  <el-dialog v-model="open" title="偏好设置" width="300">
    <div class="like-dialog">
      <div class="item">
        <div class="label">保存确认</div>
        <div class="value">
          <el-switch v-model="like.confirm" inline-prompt />
        </div>
      </div>

      <div class="item">
        <div class="label">主题样式</div>
        <div class="value">
          <el-select v-model="like.theme" style="width: 150px" size="small">
            <el-option
              v-for="item in THEME_OPTIONS"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>

      <div class="item">
        <div class="label">字体大小</div>
        <div class="value">
          <el-input-number v-model="like.fontSize" :min="8" :max="100" />
        </div>
      </div>
    </div>

    <template #footer>
      <div style="display: flex; align-items: center; margin-top: 32px">
        <el-button size="small" type="danger" @click="resetLike()">恢复默认</el-button>

        <div style="flex: 1"></div>

        <div style="font-size: 12px; color: #999">修改实时生效，且进行缓存</div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue'
import { ElMessageBox } from 'element-plus'

import MonacoEditor from './components/MonacoEditor.vue'

import { THEME_OPTIONS } from '@/utils/option'

import useLike from '@/hooks/useLike'

const { open, like, resetLike } = useLike()

const defInfo = reactive({ path: '' })

onBeforeMount(() => {
  const query = new URLSearchParams(window.location.search).get('path') || ''
  if (query) {
    defInfo.path = query
  } else {
    inputPath(true)
  }
})

const inputPath = async (force?: boolean) => {
  return await ElMessageBox.prompt(
    '部分文件可在文件管理中双击文件进行编辑，详见应用介绍',
    '请输入文件路径',
    {
      showClose: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      closeOnHashChange: false,
      showCancelButton: !force,
      confirmButtonText: '确认',
      cancelButtonText: '取消',
    },
  ).then(({ value }) => {
    if (value) {
      defInfo.path = value
    }
  })
}
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
}

html {
  &.dark {
    #app {
      > .header,
      > .footer {
        background-color: #1c1c1c;
      }
    }
  }
}

#app {
  height: 100%;
  display: flex;
  flex-direction: column;

  > .header,
  > .footer {
    height: 32px;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 0 12px;

    > * {
      margin: 0;
    }
  }

  > .header {
    border-bottom: solid 1px var(--el-border-color);

    > .title {
      font-size: 14px;
      line-height: 32px;
      color: var(--el-text-color-primary);
    }
  }

  > .footer {
    border-top: solid 1px var(--el-border-color);

    > .developed {
      font-size: 12px;
      line-height: 32px;
      color: var(--el-text-color-placeholder);
    }
  }

  > .editor {
    position: relative;
    flex: 1;

    > .content {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
    }
  }
}

.like-dialog {
  display: flex;
  flex-direction: column;
  gap: 12px;

  > .item {
    display: flex;
    align-items: center;
    gap: 12px;

    > .label {
      font-size: 14px;
      line-height: 24px;
      width: 100px;
    }

    > .value {
      flex: 1;
    }
  }
}
</style>
