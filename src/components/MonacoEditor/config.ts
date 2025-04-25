import '@codingame/monaco-vscode-python-default-extension';

import { LogLevel } from '@codingame/monaco-vscode-api';
import getKeybindingsServiceOverride from '@codingame/monaco-vscode-keybindings-service-override';
import { MonacoEditorLanguageClientWrapper, type WrapperConfig } from 'monaco-editor-wrapper';
import { configureDefaultWorkerFactory } from 'monaco-editor-wrapper/workers/workerLoaders';
import * as vscode from 'vscode';

import { themeExtension } from './vscode-themes/themes';
import { EditorOptions } from './type';

// 新增类型定义
export interface CompletionKeywords {
  keywords: string[];
  documentation?: string;
}

/**
 * 构建编辑器配置
 * @param htmlContainer 编辑器dom节点
 * @param url 编辑器ws地址
 * @param editorOptions 编辑器选项
 * @returns 编辑器配置
 */
export const buildWrapperStartConfig = (
  htmlContainer: HTMLElement,
  url: string,
  editorOptions: EditorOptions
): WrapperConfig => {
  const config: WrapperConfig = {
    $type: 'extended',
    htmlContainer,

    logLevel: LogLevel.Off,
    vscodeApiConfig: {
      serviceOverrides: {
        ...getKeybindingsServiceOverride(),
      },
    },
    extensions: [{ config: themeExtension }],
    editorAppConfig: {
      /** 编辑器选项 */
      editorOptions: editorOptions,
      monacoWorkerFactory: configureDefaultWorkerFactory,
    },
    languageClientConfigs: {
      configs: {
        python: {
          clientOptions: {
            documentSelector: ['python'],
          },
          connection: {
            options: {
              $type: 'WebSocketUrl',
              url: url,
              startOptions: {
                onCall: () => {
                  console.log('Connected to socket.');
                },
                reportStatus: true,
              },
              stopOptions: {
                onCall: () => {
                  console.log('Disconnected from socket.');
                },
                reportStatus: true,
              },
            },
          },
        },
      }
    },
  };
  return config;
};

/**
 * 使用Monaco编辑器
 * @param url 编辑器ws地址
 * @returns 编辑器实例
 */
export const useMonacoEditor = (url: string) => {

  // 编辑器实例
  const wrapper = ref<MonacoEditorLanguageClientWrapper>();

  // 初始化编辑器参数
  let initArguments: {
    dom: HTMLElement;
    editorOptions: EditorOptions;
    cb: (val: string) => void
  }

  /**
   * 初始化编辑器
   * @param dom 编辑器dom节点
   * @param cb 编辑器初始化完成回调
   */
  const initClientsEdit = async (
    dom: HTMLElement,
    editorOptions: EditorOptions,
    cb: (val: string) => void,
  ) => {
    if (wrapper.value) {
      await toRaw(wrapper.value).dispose()
    }
    initArguments = { dom, editorOptions, cb }
    wrapper.value = new MonacoEditorLanguageClientWrapper();
    const config = buildWrapperStartConfig(dom, url, editorOptions);
    try {
      await toRaw(wrapper.value).initAndStart(config);
      const editor = toRaw(wrapper.value).getEditor()
      if (!editor) return

      // 注册自定义补全提供者
      if (editorOptions.completionKeywords) {
        registerCustomCompletion(editorOptions.language || 'python', editorOptions.completionKeywords);
      }

      // 编辑器内容变化时回调
      editor.onDidChangeModelContent(() => {
        cb(editor.getValue())
      })
    } catch (error) {
      console.error(error);
      throw new Error('连接ws失败');
    }
  };

  /**
   * 设置输入值
   * @param val 输入值
   */
  const setValue = (val: string) => {
    if (!wrapper.value) return
    const editor = toRaw(wrapper.value).getEditor()
    if (!editor) return

    // 获取当前模型和光标位置
    const model = editor.getModel()
    const selections = editor.getSelections()

    if (model) {
      // 使用编辑操作保留光标位置
      model.pushEditOperations(
        [],
        [
          {
            range: model.getFullModelRange(),
            text: val
          }
        ],
        () => selections // 保持原有选择状态
      )
    }
  }

  /**
   * 设置主Options 属性
   * @param editorOptions 属性
   */
  const setOptions = (editorOptions: EditorOptions) => {
    if (!wrapper.value) return
    const editor = toRaw(wrapper.value).getEditor()
    if (!editor || !initArguments) return


    initClientsEdit(
      initArguments.dom,
      {
        ...initArguments.editorOptions,
        ...editorOptions,
        value: editor.getValue()
      },
      initArguments.cb
    )
  }

  /**
   * 注册自定义代码补全提供者
   * @param {string} language - 目标编程语言标识符
   * @param {string[]} keywords - 自定义补全关键词列表
   * @returns {vscode.Disposable} 可释放的订阅对象
   */
  const registerCustomCompletion = (language: string, keywordsConfig: CompletionKeywords) => {
    return vscode.languages.registerCompletionItemProvider(language, {
      provideCompletionItems: () => {
        return keywordsConfig.keywords.map(keyword => {
          const item = new vscode.CompletionItem(
            keyword,
            vscode.CompletionItemKind.Variable
          );
          item.documentation = keywordsConfig.documentation || '自定义变量提示';
          return item;
        });
      }
    });
  };

  return { wrapper, initClientsEdit, setValue, setOptions }
}