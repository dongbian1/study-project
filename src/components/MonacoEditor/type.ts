import * as monaco from 'monaco-editor';
import { CompletionKeywords } from './config';

export type EditorOptions = Omit<monaco.editor.IStandaloneEditorConstructionOptions, 'theme'> & {
    theme: 'Dark' | 'Light';
    completionKeywords?: CompletionKeywords;
}

/** 编辑器props类型 */
export interface MonacoEditorProps {
    /** 输入值 */
    modelValue: string;
    /** 编辑器宽度 */
    width?: number | string;
    /** 编辑器高度 */
    height?: number | string;
    /** 编辑器配置 */
    options?: EditorOptions;
}