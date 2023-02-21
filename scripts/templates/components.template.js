function componentTemplate(name, pathName) {
  const typeName = `${name}Props`;
  return `import type { ${typeName} } from "./${pathName}.types";

import classNames from "classnames";

export const ${name} = ({ className, children, ...props }: ${typeName}) => {
  const cn = classNames("${pathName}", className);

  return (
    <div className={cn} {...props}>
      {children}
    </div>
  );
};
`;
}

function styleTemplate(_name, pathName) {
  return `.${pathName} {
  background-color: red;
  padding: 24px;
  color: white;
}
`;
}

function typesTemplate(name, _pathName) {
  const typeName = `${name}Props`;
  return `export type ${typeName} = React.HTMLProps<HTMLDivElement>;
`;
}

function testTemplate(name, pathName) {
  const typeName = `${name}Props`;
  return `import type { ${typeName} } from "./${pathName}.types";

import { render } from "@testing-library/react";

import { ${name} } from "./${pathName}.component";

const makeSut = (props?: ${typeName}) => render(<${name} {...props} />);

describe("<${name}>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
`;
}

module.exports = {
  componentTemplate,
  styleTemplate,
  typesTemplate,
  testTemplate,
};
