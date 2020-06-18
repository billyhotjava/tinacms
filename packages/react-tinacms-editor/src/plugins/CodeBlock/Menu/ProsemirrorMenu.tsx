/**

Copyright 2019 Forestry.io Inc

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

import { setBlockType } from 'prosemirror-commands'
import { EditorState } from 'prosemirror-state'

import { CodeIcon } from '@tinacms/icons'

import { commandControl } from '../../../components/MenuHelpers'

function makeCodeBlock(state: EditorState, dispatch: any) {
  const { code_block, paragraph } = state.schema.nodes
  const { selection } = state
  const currentNode = selection.$to.node(selection.$to.depth)
  if (currentNode && currentNode.type === code_block && !dispatch) return true
  return currentNode.type === code_block
    ? setBlockType(paragraph)(state, dispatch)
    : setBlockType(code_block)(state, dispatch)
}

export const ProsemirrorMenu = commandControl(
  makeCodeBlock,
  CodeIcon,
  'Codeblock',
  'Codeblock',
  true
) //codeblock focusing messes with scroll
