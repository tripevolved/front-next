import { TextField, Card, Link } from "mars-ds";
import type { AutoCompleteTextFieldProps, HintData } from "./auto-complete-text-field.types";

import { useState, useEffect } from "react";

export function AutoCompleteTextField({
  className,
  name,
  label,
  required,
  getData,
  onSet,
  disabled
}: AutoCompleteTextFieldProps) {
  const [hintData, setHintData] = useState<HintData[] | null>(null);
  const [text, setText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [shouldSetSearchQuery, setShouldSetSearchQuery] = useState(true);

  const handleTextChange = (event: any) => {
    setShouldSetSearchQuery(true);
    setText(event.target.value);
  }

  const handleGetData = async () => {
    var values = await getData(text);
    setHintData(values);
  };

  const handleClick = (event: any, index: number) => {
    if (hintData !== null) {
      onSet?.(hintData[index]?.internalValue);
      setText(hintData[index]?.shownValue.split(',')[0]);
      setSearchQuery('');
      setHintData(null);
      setShouldSetSearchQuery(false);
    }
  };

  useEffect(() => {
    if (text.length < 3) {
      setHintData(null);
      return;
    }

    const timeOutId = setTimeout(() => setSearchQuery(text), 2000);
    return () => {
      clearTimeout(timeOutId);
    }
  }, [text]);

  useEffect(() => {
    if (searchQuery.length >= 3 && shouldSetSearchQuery) handleGetData();
  }, [searchQuery]);

  return (
    <>
      <TextField
        className={className}
        type="text"
        name={name}
        label={label}
        required={required}
        disabled={disabled}
        value={text}
        onChange={handleTextChange}
      />
      <Card elevation="md" hidden={!hintData}>
        {hintData?.map(({ internalValue, shownValue = [] }, index) => (
          <div key={index}>
            <Link className="auto-complete-text-field__link" onClick={e => handleClick(e, index)}>
              {shownValue}
            </Link>
          </div>
        ))}
      </Card>
    </>
  );
}
