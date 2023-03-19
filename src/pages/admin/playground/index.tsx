import dynamic from "next/dynamic";

import { AdaptedRibo, AdminPage } from "@/components";
import { notifyError, notifySuccess } from "@/helpers/notify.helper";
import { useLocalStorage } from "@/hooks/local-storage.hooks";
import { OnMount } from "@monaco-editor/react";
import classNames from "classnames";
import copy from "copy-to-clipboard";
import { Heading, ToggleButton } from "mars-ds";
import { useEffect, useRef, useState } from "react";

const preventRecognizedError = (obj: any) => {
  if (typeof obj !== "object") return obj;
  const children = obj["children"];
  const isChildrenValid = typeof children == "string" || Array.isArray(children);
  if (!isChildrenValid) delete obj["children"];

  const style = obj["style"];
  const isStyleValid = typeof style === "object" && !Array.isArray(style);
  if (!isStyleValid) delete obj["style"];

  if (typeof obj !== "object") return obj;

  if (Array.isArray(obj["children"])) obj["children"] = obj["children"].map(preventRecognizedError);

  return obj;
};

const jsonDefault = [
  {
    component: "SectionBase",
    children: [
      {
        component: "Heading",
        children: "Bem-vindo ao Playground!",
      },
      {
        component: "Text",
        children:
          "Use o editor à direita para começar a escrever o json! Essa edição funciona em tempo real, ou seja, caso algum erro de sintaxe seja encontrado, você verá um erro aparecer, mas não se preocupe, continue a edição que logo as coisas voltam a aparecer ;)",
      },
    ],
  },
];

const AUTO_SAVE_INTERVAL = 2000;

const toJson = (value?: string) => {
  if (typeof value !== "string")
    return [{ component: "div", children: "O json precisa ser válido" }];
  try {
    const obj = JSON.parse(value);
    return preventRecognizedError(obj);
  } catch (error) {
    return undefined;
  }
};

const toString = (value?: Record<string, any>) => JSON.stringify(value, null, 2);

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const Playground = () => {
  const [showCode, setShowCode] = useState(true);
  const [json, setJson] = useLocalStorage("playground-trip-evolved", toString(jsonDefault));
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(false);
  const editorRef = useRef<null | any>(null);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    if (!autoSaveEnabled) return;
    const autoSave = () => {
      const value = editorRef.current?.getValue?.();
      const newJson = toJson(value);
      if (typeof newJson === "object") setJson(value || "{}");
    };

    const intervalId = setInterval(autoSave, AUTO_SAVE_INTERVAL);
    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoSaveEnabled]);

  const onCopy = () => {
    try {
      copy(json);
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
          <Ribo json={toJson(json)} />
        </div>
        {showCode && (
          <div className="playground__editor">
            <div className="playground__editor__code">
              <Editor
                value={json}
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

const RiboMessageError = () => (
  <div>
    O json precisa ser um objeto válido. Veja o exemplo: <code>{String(jsonDefault)}</code>
  </div>
);

const Ribo = ({ json }: { json: any; }) => {
  if (typeof json !== "object") return <RiboMessageError />;
  try {
    return <AdaptedRibo>{json}</AdaptedRibo>;
  } catch (error) {
    return <RiboMessageError />;
  }
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

export default Playground;
