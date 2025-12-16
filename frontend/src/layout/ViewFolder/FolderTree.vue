<template>
  <el-tree
    :props="props"
    :load="loadNode"
    lazy
    @node-click="(v: { leaf: boolean; value: string }) => v.leaf && editor.view.add(v.value)"
  />
</template>

<script lang="ts" setup>
import axios from 'axios'

import { useEditorStore } from '@/store/editor'

import { HOST } from '@/utils/env'

import type { LoadFunction } from 'element-plus'

const editor = useEditorStore()

const props = { label: 'label', children: 'zones', isLeaf: 'leaf' }

const loadNode: LoadFunction = async (node, resolve) => {
  const root = node.data.value || '/Users/flex/Downloads'

  const { data } = await axios.get<{ data: { dirs: string[]; files: string[] } }>(HOST, {
    params: { _api: 'dir', path: root },
  })

  resolve([
    ...data.data.dirs.map((i) => ({ label: i, value: `${root}/${i}`, leaf: false })),
    ...data.data.files.map((i) => ({ label: i, value: `${root}/${i}`, leaf: true })),
  ])
}
</script>
