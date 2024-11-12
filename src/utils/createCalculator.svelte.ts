import { Parser } from "expr-eval";

const parser = new Parser();

export const KEYS = [
  {
    label: "7",
    code: "7",
  },
  {
    label: "8",
    code: "8",
  },
  {
    label: "9",
    code: "9",
  },
  {
    label: "DEL",
    code: "Delete",
  },
  {
    label: "4",
    code: "4",
  },
  {
    label: "5",
    code: "5",
  },
  {
    label: "6",
    code: "6",
  },
  {
    label: "+",
    code: "+",
  },
  {
    label: "1",
    code: "1",
  },
  {
    label: "2",
    code: "2",
  },
  {
    label: "3",
    code: "3",
  },
  {
    label: "-",
    code: "-",
  },
  {
    label: ".",
    code: ".",
  },
  {
    label: "0",
    code: "0",
  },
  {
    label: "/",
    code: "/",
  },
  {
    label: "x",
    code: "*",
  },
  {
    label: "RESET",
    code: "Reset",
  },
  {
    label: "=",
    code: "=",
  },
] as const;

function isValidStart(key: string) {
  return /^[0-9.]$/.test(key);
}

function isAllowedCharacter(key: string) {
  return /[0-9]|\.|\+|-|\/|\*|=/.test(key);
}

function isSpecialCharacter(key: string) {
  return /[.\-+/*xX]/.test(key);
}

function isFinish(key: string) {
  return /Enter|\=/.test(key);
}

function isReset(key: string) {
  return /Reset/.test(key);
}

function isDelete(key: string) {
  return /Backspace|Delete/.test(key);
}

export function createCalculator() {
  let input = $state<string>("");
  let result = $state<number | null>(null);

  function setResult() {
    if (input.length > 0) {
      result = parser.evaluate(input);
      input = result ? result.toString() : "";
    }
  }

  function reset() {
    input = "";
    result = null;
  }

  function onKeyDown(e: KeyboardEvent) {
    const key = e.key;
    onButtonClick(key);
  }

  function onButtonClick(key: string) {
    if (isReset(key)) {
      reset();
      return;
    }

    if (input.length === 0) {
      if (isValidStart(key)) {
        input += key;
        return;
      }
    }

    if (isDelete(key)) {
      input = input.slice(0, -1);
      return;
    }

    if (isFinish(key)) {
      setResult();
      return;
    }

    console.log("key", key);

    if (isAllowedCharacter(key)) {
      const lastChar = input[input.length - 1];

      if (!(isSpecialCharacter(key) && isSpecialCharacter(lastChar))) {
        input += key;
      }
    }
  }

  return {
    get input() {
      return input;
    },
    get result() {
      return result;
    },
    reset,
    onKeyClick: (key: string) => onButtonClick(key),
    onKeyDown,
  };
}
