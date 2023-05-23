import dynamic from "next/dynamic";

import { AdminPage } from "@/features";
import { notifyError, notifySuccess } from "@/utils/helpers/notify.helper";
import { useLocalStorage } from "@/utils/hooks/local-storage.hooks";
import { OnMount } from "@monaco-editor/react";
import classNames from "classnames";
import copy from "copy-to-clipboard";
import { Heading, ToggleButton } from "mars-ds";
import { useEffect, useRef, useState } from "react";
import { isValidToJson, jsonToString } from "@/utils/helpers/json.helpers";
import { AUTO_SAVE_INTERVAL, jsonDefault } from "./playground.utils";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export const Playground = () => {
  const [showCode, setShowCode] = useState(true);
  const [value, setValue] = useLocalStorage("playground-trip-evolved", jsonToString(jsonDefault));
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(false);
  const editorRef = useRef<null | any>(null);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    if (!autoSaveEnabled) return;
    const autoSave = () => {
      const editorValue = editorRef.current?.getValue?.();
      if (value === editorValue) return;
      if (isValidToJson(editorValue)) setValue(editorValue || "{}");
    };

    const intervalId = setInterval(autoSave, AUTO_SAVE_INTERVAL);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoSaveEnabled]);

  const onCopy = () => {
    try {
      copy(value);
      notifySuccess("Código copiado para sua área de transferência!");
    } catch (error) {
      console.error(error);
      notifyError("Não foi possível copiar o código");
    }
  };

  const handleEnableAutoSave = () => {
    if (autoSaveEnabled) return;
    setAutoSaveEnabled(true);
  };

  return (
    <AdminPage className="playground">
      <nav className="playground__header">
        <div className="flex gap-lg align-items-center">
          <Heading size="xs">Playground</Heading>
        </div>
        <div>
          <OptionButton iconName="copy" onClick={onCopy} title="copy" />
          <OptionButton
            iconName="code"
            onClick={() => setShowCode((state) => !state)}
            title="edit"
            isActive={showCode}
          />
        </div>
      </nav>
      <main
        className={classNames("playground__content", {
          "playground__content--show-code": showCode,
        })}
      >
        <div
          className={classNames("playground__ribo", {
            "playground__ribo--show-code": showCode,
          })}
        >
          <iframe src="/admin/playground/canvas" />
        </div>
        {showCode && (
          <div className="playground__editor">
            <div className="playground__editor__code">
              <Editor
                value={value}
                language="json"
                theme="vs-dark"
                loading="Carregando editor..."
                options={{
                  lineNumbers: "off",
                  minimap: {
                    enabled: false,
                  },
                }}
                width="100%"
                height="calc(100vh - 64px)"
                onMount={handleEditorDidMount}
                onChange={handleEnableAutoSave}
              />
            </div>
          </div>
        )}
      </main>
    </AdminPage>
  );
};

interface OptionButtonProps {
  iconName: string;
  onClick: VoidFunction;
  isActive?: boolean;
  title: string;
}

const OptionButton = ({ iconName, onClick, isActive = true, title }: OptionButtonProps) => {
  return (
    <ToggleButton
      className={classNames("toggle-button", { "toggle-button--is-active": isActive })}
      iconName={iconName}
      variant="text"
      onClick={onClick}
      title={title}
    />
  );
};
