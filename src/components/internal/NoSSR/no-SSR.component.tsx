import { Component } from "react";
import type { NoSSRProps } from "./no-SSR.types";

export class NoSSR extends Component<NoSSRProps> {
  state = {
    canRender: false,
  };

  componentDidMount() {
    this.setState({ canRender: true });
  }

  render() {
    const { children } = this.props;
    const { canRender } = this.state;

    return canRender ? children : <span>Loading</span>;
  }
}
